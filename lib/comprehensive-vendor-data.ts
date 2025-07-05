export interface VendorData {
  id: string
  name: string
  category: "nac" | "certificate" | "vpn" | "endpoint" | "siem" | "firewall"
  logo: string
  description: string
  pricing: {
    model: "per_device" | "per_user" | "flat_rate" | "tiered"
    basePrice: number
    tiers?: Array<{
      min: number
      max: number
      price: number
    }>
  }
  features: string[]
  integrations: string[]
  supportCost: number
  implementationCost: number
  maintenanceCost: number
  trainingCost: number
  complianceFeatures: string[]
  securityFeatures: string[]
  scalability: "low" | "medium" | "high"
  complexity: "low" | "medium" | "high"
  marketShare: number
  customerSatisfaction: number
  riskScore: number
  complianceScore: number
}

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

export const vendorDatabase: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox",
    category: "nac",
    logo: "/portnox-logo.png",
    description: "Cloud-native Network Access Control solution",
    pricing: {
      model: "per_device",
      basePrice: 12,
      tiers: [
        { min: 1, max: 100, price: 12 },
        { min: 101, max: 500, price: 10 },
        { min: 501, max: 1000, price: 8 },
        { min: 1001, max: 5000, price: 6 },
      ],
    },
    features: [
      "Device Discovery & Classification",
      "Policy Enforcement",
      "Guest Access Management",
      "IoT Device Security",
      "Cloud-Native Architecture",
    ],
    integrations: ["Cisco", "Aruba", "Juniper", "Microsoft AD", "SIEM Solutions"],
    supportCost: 2400,
    implementationCost: 15000,
    maintenanceCost: 3600,
    trainingCost: 5000,
    complianceFeatures: ["SOC 2", "HIPAA", "PCI DSS", "GDPR"],
    securityFeatures: ["Zero Trust", "Behavioral Analytics", "Threat Detection"],
    scalability: "high",
    complexity: "medium",
    marketShare: 15,
    customerSatisfaction: 4.2,
    riskScore: 2.1,
    complianceScore: 8.5,
  },
  "cisco-ise": {
    id: "cisco-ise",
    name: "Cisco ISE",
    category: "nac",
    logo: "/cisco-logo.png",
    description: "Identity Services Engine for comprehensive network access control",
    pricing: {
      model: "per_device",
      basePrice: 18,
      tiers: [
        { min: 1, max: 100, price: 18 },
        { min: 101, max: 500, price: 15 },
        { min: 501, max: 1000, price: 12 },
        { min: 1001, max: 5000, price: 10 },
      ],
    },
    features: [
      "Identity-based Network Access",
      "Policy Management",
      "Guest Portal",
      "BYOD Support",
      "Threat Containment",
    ],
    integrations: ["Cisco Infrastructure", "Active Directory", "LDAP", "SIEM"],
    supportCost: 4800,
    implementationCost: 25000,
    maintenanceCost: 6000,
    trainingCost: 8000,
    complianceFeatures: ["FIPS 140-2", "Common Criteria", "SOC 2"],
    securityFeatures: ["TrustSec", "pxGrid", "Threat Intelligence"],
    scalability: "high",
    complexity: "high",
    marketShare: 35,
    customerSatisfaction: 3.8,
    riskScore: 1.8,
    complianceScore: 9.2,
  },
  forescout: {
    id: "forescout",
    name: "Forescout",
    category: "nac",
    logo: "/forescout-logo.png",
    description: "Device visibility and control platform",
    pricing: {
      model: "per_device",
      basePrice: 15,
      tiers: [
        { min: 1, max: 100, price: 15 },
        { min: 101, max: 500, price: 12 },
        { min: 501, max: 1000, price: 10 },
        { min: 1001, max: 5000, price: 8 },
      ],
    },
    features: ["Device Discovery", "Risk Assessment", "Automated Response", "Compliance Monitoring", "IoT Security"],
    integrations: ["Multi-vendor Network", "Security Tools", "ITSM"],
    supportCost: 3600,
    implementationCost: 20000,
    maintenanceCost: 4800,
    trainingCost: 6000,
    complianceFeatures: ["NIST", "ISO 27001", "HIPAA"],
    securityFeatures: ["Continuous Monitoring", "Automated Remediation"],
    scalability: "high",
    complexity: "medium",
    marketShare: 20,
    customerSatisfaction: 4.0,
    riskScore: 2.0,
    complianceScore: 8.8,
  },
  "aruba-clearpass": {
    id: "aruba-clearpass",
    name: "Aruba ClearPass",
    category: "nac",
    logo: "/aruba-logo.png",
    description: "Policy management platform for secure network access",
    pricing: {
      model: "per_device",
      basePrice: 16,
      tiers: [
        { min: 1, max: 100, price: 16 },
        { min: 101, max: 500, price: 13 },
        { min: 501, max: 1000, price: 11 },
        { min: 1001, max: 5000, price: 9 },
      ],
    },
    features: ["Policy Management", "Guest Access", "Device Profiling", "Certificate Management", "Network Visibility"],
    integrations: ["Aruba Infrastructure", "Microsoft", "VMware"],
    supportCost: 4200,
    implementationCost: 22000,
    maintenanceCost: 5400,
    trainingCost: 7000,
    complianceFeatures: ["FIPS", "Common Criteria", "SOC 2"],
    securityFeatures: ["Dynamic Segmentation", "Threat Detection"],
    scalability: "high",
    complexity: "medium",
    marketShare: 25,
    customerSatisfaction: 4.1,
    riskScore: 1.9,
    complianceScore: 8.7,
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    category: "certificate",
    logo: "/securew2-logo.png",
    description: "Cloud-based certificate management and secure Wi-Fi onboarding",
    pricing: {
      model: "per_user",
      basePrice: 8,
      tiers: [
        { min: 1, max: 100, price: 8 },
        { min: 101, max: 500, price: 6 },
        { min: 501, max: 1000, price: 5 },
        { min: 1001, max: 5000, price: 4 },
      ],
    },
    features: [
      "Certificate Management",
      "Secure Wi-Fi Onboarding",
      "BYOD Support",
      "Cloud-based PKI",
      "Multi-platform Support",
    ],
    integrations: ["Active Directory", "Google Workspace", "Azure AD"],
    supportCost: 1800,
    implementationCost: 8000,
    maintenanceCost: 2400,
    trainingCost: 3000,
    complianceFeatures: ["FIPS 140-2", "SOC 2", "HIPAA"],
    securityFeatures: ["EAP-TLS", "Certificate Lifecycle Management"],
    scalability: "high",
    complexity: "low",
    marketShare: 12,
    customerSatisfaction: 4.3,
    riskScore: 2.2,
    complianceScore: 8.3,
  },
  foxpass: {
    id: "foxpass",
    name: "Foxpass",
    category: "certificate",
    logo: "/foxpass-logo.png",
    description: "Cloud directory and certificate authority service",
    pricing: {
      model: "per_user",
      basePrice: 6,
      tiers: [
        { min: 1, max: 100, price: 6 },
        { min: 101, max: 500, price: 5 },
        { min: 501, max: 1000, price: 4 },
        { min: 1001, max: 5000, price: 3 },
      ],
    },
    features: [
      "Cloud Directory",
      "Certificate Authority",
      "LDAP/RADIUS",
      "SSH Key Management",
      "Multi-factor Authentication",
    ],
    integrations: ["AWS", "Google Cloud", "Azure", "Okta"],
    supportCost: 1200,
    implementationCost: 5000,
    maintenanceCost: 1800,
    trainingCost: 2000,
    complianceFeatures: ["SOC 2", "GDPR"],
    securityFeatures: ["Zero Trust", "Certificate Management"],
    scalability: "medium",
    complexity: "low",
    marketShare: 8,
    customerSatisfaction: 4.1,
    riskScore: 2.5,
    complianceScore: 7.8,
  },
  "pulse-secure": {
    id: "pulse-secure",
    name: "Pulse Secure",
    category: "vpn",
    logo: "/placeholder-logo.png",
    description: "Secure access solution for hybrid IT environments",
    pricing: {
      model: "per_user",
      basePrice: 25,
      tiers: [
        { min: 1, max: 100, price: 25 },
        { min: 101, max: 500, price: 20 },
        { min: 501, max: 1000, price: 18 },
        { min: 1001, max: 5000, price: 15 },
      ],
    },
    features: ["SSL VPN", "Network Access Control", "Application Delivery", "Mobile Security", "Cloud Integration"],
    integrations: ["Active Directory", "LDAP", "SAML", "Multi-vendor"],
    supportCost: 3000,
    implementationCost: 18000,
    maintenanceCost: 4500,
    trainingCost: 5500,
    complianceFeatures: ["FIPS", "Common Criteria", "SOC 2"],
    securityFeatures: ["Zero Trust", "Conditional Access"],
    scalability: "high",
    complexity: "medium",
    marketShare: 18,
    customerSatisfaction: 3.9,
    riskScore: 2.0,
    complianceScore: 8.5,
  },
  "no-nac": {
    id: "no-nac",
    name: "No NAC Solution",
    category: "nac",
    logo: "/no-nac-logo.png",
    description: "Baseline scenario without Network Access Control",
    pricing: {
      model: "flat_rate",
      basePrice: 0,
    },
    features: ["Basic Network Access", "Manual Security Processes", "Limited Visibility", "Reactive Security"],
    integrations: [],
    supportCost: 0,
    implementationCost: 0,
    maintenanceCost: 0,
    trainingCost: 0,
    complianceFeatures: [],
    securityFeatures: [],
    scalability: "low",
    complexity: "low",
    marketShare: 0,
    customerSatisfaction: 2.0,
    riskScore: 8.5,
    complianceScore: 3.0,
  },
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
}

// Helper functions
export function getVendorLogoPath(vendorId: string): string {
  const logoMap: Record<string, string> = {
    portnox: "/portnox-logo.png",
    "cisco-ise": "/cisco-logo.png",
    aruba: "/aruba-logo.png",
    fortinet: "/fortinet-logo.png",
    microsoft: "/microsoft-logo.png",
    securew2: "/securew2-logo.png",
    foxpass: "/foxpass-logo.png",
    radiusaas: "/radiusaas-logo.png",
    forescout: "/forescout-logo.png",
    packetfence: "/packetfence-logo.png",
    "no-nac": "/no-nac-logo.png",
  }
  return logoMap[vendorId] || "/placeholder-logo.png"
}

export function getVendorById(id: string): VendorData | undefined {
  return vendorDatabase[id]
}

export function getVendorsByCategory(category: VendorData["category"]): VendorData[] {
  return Object.values(vendorDatabase).filter((vendor) => vendor.category === category)
}

export function calculateVendorCost(vendor: VendorData, deviceCount: number, userCount: number, years = 3): number {
  let baseCost = 0

  if (vendor.pricing.model === "per_device") {
    if (vendor.pricing.tiers) {
      const tier = vendor.pricing.tiers.find((t) => deviceCount >= t.min && deviceCount <= t.max)
      baseCost = tier ? tier.price * deviceCount : vendor.pricing.basePrice * deviceCount
    } else {
      baseCost = vendor.pricing.basePrice * deviceCount
    }
  } else if (vendor.pricing.model === "per_user") {
    if (vendor.pricing.tiers) {
      const tier = vendor.pricing.tiers.find((t) => userCount >= t.min && userCount <= t.max)
      baseCost = tier ? tier.price * userCount : vendor.pricing.basePrice * userCount
    } else {
      baseCost = vendor.pricing.basePrice * userCount
    }
  } else if (vendor.pricing.model === "flat_rate") {
    baseCost = vendor.pricing.basePrice
  }

  const annualCost = baseCost * 12 // Convert monthly to annual
  const totalLicenseCost = annualCost * years
  const totalSupportCost = vendor.supportCost * years
  const totalMaintenanceCost = vendor.maintenanceCost * years

  return totalLicenseCost + vendor.implementationCost + totalSupportCost + totalMaintenanceCost + vendor.trainingCost
}

export const industryBenchmarks = {
  healthcare: {
    averageDevicesPerUser: 2.5,
    complianceRequirements: ["HIPAA", "SOC 2", "HITECH"],
    riskTolerance: "low",
    budgetMultiplier: 1.3,
  },
  finance: {
    averageDevicesPerUser: 2.0,
    complianceRequirements: ["PCI DSS", "SOX", "GLBA"],
    riskTolerance: "very_low",
    budgetMultiplier: 1.5,
  },
  education: {
    averageDevicesPerUser: 3.0,
    complianceRequirements: ["FERPA", "COPPA"],
    riskTolerance: "medium",
    budgetMultiplier: 0.8,
  },
  government: {
    averageDevicesPerUser: 1.8,
    complianceRequirements: ["FISMA", "FedRAMP", "NIST"],
    riskTolerance: "very_low",
    budgetMultiplier: 1.4,
  },
  manufacturing: {
    averageDevicesPerUser: 4.0,
    complianceRequirements: ["ISO 27001", "NIST"],
    riskTolerance: "medium",
    budgetMultiplier: 1.1,
  },
  retail: {
    averageDevicesPerUser: 2.2,
    complianceRequirements: ["PCI DSS", "GDPR"],
    riskTolerance: "medium",
    budgetMultiplier: 1.0,
  },
}

export function getVendorData(vendorId: string): VendorData | null {
  return vendorDatabase[vendorId] || null
}

export function getAllVendors(): VendorData[] {
  return Object.values(vendorDatabase)
}

// Export both for compatibility
export default vendorDatabase
