// Updated to include all 13 vendors from the script and more details
export interface VendorFeature {
  available: boolean
  details?: string
  score?: number // 0-100
}

export interface VendorPricingTier {
  name: string
  minDevices?: number | null
  maxDevices?: number | null
  pricePerDevice?: number // monthly
  pricePerUser?: number // monthly
  featuresIncluded?: string[]
}

export interface VendorData {
  id: string
  name: string
  type: "cloud-native" | "on-premise" | "cloud-radius" | "open-source" | "hybrid"
  category: string
  logo: string
  description: string
  pricing: {
    model: string
    tiers?: VendorPricingTier[]
    perDevice?: { monthly: number; annual?: number; triennial?: number; fiveYear?: number }
    perUser?: { monthly: number }
    licenses?: { base?: number; device?: number; subscription?: number }
    hardware?: Record<string, { cost: number; capacity?: string }>
    maintenance?: number // percentage of license/hardware
    professionalServices?: { implementation?: number; training?: number; standard?: number }
    additionalCosts?: { implementation?: number; training?: number; support?: number }
    hiddenCosts?: { downtime?: number; complexity?: number; integration?: number; total?: number }
    volumeDiscounts?: Record<number, number> // device_threshold: discount_percentage
    addOns?: Record<string, { perDevice: number; features: string }>
  }
  implementation: {
    deploymentTime: { poc?: number; fullDeployment: number } // days or hours
    requiredResources: { internal?: number; vendor?: number; training?: number } // FTEs or hours
  }
  features: {
    core?: Record<string, VendorFeature | boolean | string | number>
    security?: Record<string, VendorFeature | boolean | string | number>
    compliance?: Record<string, VendorFeature | boolean | string | number> // e.g., frameworks: ['SOC 2', 'ISO 27001']
    operational?: Record<string, VendorFeature | boolean | string | number>
    integration?: Record<string, VendorFeature | boolean | string | number>
    [key: string]: any // For other specific features
  }
  roi: {
    paybackPeriod?: number // months
    laborSavings?: number // percentage or FTE
    incidentReduction?: number // percentage
    complianceSavings?: number // currency
    breachRiskReduction?: number // percentage (0-1)
    [key: string]: any
  }
  marketShare?: string
  scalability?: { maxDevices: string | number; notes?: string }
  [key: string]: any // For other top-level vendor-specific data
}

export const AllVendorData: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    type: "cloud-native",
    category: "Next-Gen Cloud NAC",
    logo: "/portnox-logo.png", // Updated to SVG
    description: "Cloud-native, agentless zero-trust NAC with AI-powered security",
    pricing: {
      model: "SaaS Subscription",
      perDevice: { monthly: 4.0 }, // Base price, will be adjusted by slider
      // Tiers can be used for volume discount representation if not using volumeDiscounts map
      tiers: [
        { name: "Essentials", minDevices: 1, maxDevices: 250, pricePerDevice: 5.0 },
        { name: "Professional", minDevices: 251, maxDevices: 1000, pricePerDevice: 4.0 },
        { name: "Enterprise", minDevices: 1001, maxDevices: 5000, pricePerDevice: 3.0 },
        { name: "Enterprise Plus", minDevices: 5001, pricePerDevice: 2.5 },
      ],
      volumeDiscounts: { 500: 5, 1000: 10, 2500: 15, 5000: 20, 10000: 25 }, // device_threshold: discount_percentage
      additionalCosts: { implementation: 0, training: 0, support: 0 }, // Typically included
      hiddenCosts: { total: 0 },
      addOns: {
        "Advanced Threat Protection": { perDevice: 1.5, features: "Enhanced threat detection, SOAR integration" },
        "Compliance Automation": { perDevice: 1.0, features: "Automated reporting, continuous monitoring" },
      },
    },
    implementation: {
      deploymentTime: { poc: 0.16, fullDeployment: 0.16 }, // 4 hours = 0.16 days
      requiredResources: { internal: 0.1, vendor: 0, training: 4 }, // Minimal internal, 4 hours training
    },
    features: {
      core: {
        deviceVisibility: true,
        deviceProfiling: true,
        networkAccessControl: true,
        agentless: true,
        cloudNative: true,
        zeroTrust: true,
        aiPowered: true,
        iotSecurity: true,
        deploymentModel: "Cloud SaaS",
        deploymentTime: 4,
        hardwareRequired: false,
        scalability: "Unlimited",
      },
      security: {
        zeroTrust: { score: 98, microsegmentation: true },
        aiThreatDetection: { mlPowered: true, realTime: true },
        incidentResponse: { mttr: 5 }, // minutes
        threatIntelligence: true,
      },
      compliance: {
        frameworks: ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "GDPR", "NIST"], // Supports all major
        automation: 95,
        reporting: "Real-time",
        evidenceCollection: "Automated",
        continuousMonitoring: true,
      },
      operational: {
        automation: 95,
        selfService: true,
        fteRequired: 0.1,
        trainingRequired: 2,
        updateProcess: "Zero-downtime",
      },
      integration: {
        methods: ["REST API", "SAML"],
        preBuiltIntegrations: 50,
        siemIntegration: ["Splunk", "QRadar"],
        identityProviders: ["Okta", "Azure AD"],
        cloudPlatforms: ["AWS", "Azure", "GCP"],
      },
    },
    roi: {
      paybackPeriod: 3,
      laborSavings: 0.9,
      incidentReduction: 0.9,
      complianceSavings: 150000,
      breachRiskReduction: 0.94,
    },
    marketShare: "Leader",
    scalability: { maxDevices: "Unlimited" },
  },
  cisco: {
    id: "cisco",
    name: "Cisco ISE",
    type: "on-premise",
    category: "Traditional Enterprise NAC",
    logo: "/cisco-logo.png",
    description: "Industry-leading on-premise NAC with extensive enterprise features",
    pricing: {
      model: "Perpetual + Subscription",
      licenses: { base: 125000, device: 150, subscription: 45 }, // Per device annual subscription
      hardware: { small: { cost: 45000 }, medium: { cost: 95000 }, large: { cost: 175000 } },
      maintenance: 0.22, // % of license + hardware
      professionalServices: { implementation: 85000, training: 15000 },
      hiddenCosts: { complexity: 50000, integration: 30000, total: 80000 },
    },
    implementation: {
      deploymentTime: { fullDeployment: 180 }, // days
      requiredResources: { internal: 3.5, vendor: 2, training: 80 }, // FTEs, hours
    },
    features: {
      core: {
        deviceVisibility: true,
        deviceProfiling: true,
        networkAccessControl: true,
        agentless: false,
        cloudNative: false,
        zeroTrust: false,
        deploymentModel: "On-Premise Appliance",
        deploymentTime: 180 * 24,
        hardwareRequired: true,
        scalability: "High",
      },
      security: { zeroTrust: { score: 65 }, threatDetection: { accuracy: 70 }, incidentResponse: { mttr: 240 } },
      compliance: { frameworks: ["ISO 27001", "NIST"], automation: 30, reporting: "Manual" },
    },
    roi: {
      paybackPeriod: 24,
      laborSavings: -2.5,
      incidentReduction: 0.7,
      complianceSavings: 75000,
      breachRiskReduction: 0.65,
    },
    marketShare: "High",
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    type: "on-premise",
    category: "Enterprise NAC",
    logo: "/aruba-logo.png",
    description: "HPE's comprehensive NAC with strong wireless integration",
    pricing: {
      model: "Perpetual + Support",
      licenses: { base: 95000, device: 72 },
      hardware: { c1000: { cost: 12995 }, c5000: { cost: 54995 } },
      maintenance: 0.2,
      professionalServices: { standard: 45000 },
      hiddenCosts: { complexity: 40000, integration: 25000, total: 65000 },
    },
    implementation: {
      deploymentTime: { fullDeployment: 120 },
      requiredResources: { internal: 3.0, vendor: 1.5, training: 40 },
    },
    features: {
      core: {
        deploymentModel: "On-Premise Appliance",
        deploymentTime: 120 * 24,
        hardwareRequired: true,
        scalability: "High",
      },
      security: { zeroTrust: { score: 60 }, incidentResponse: { mttr: 360 } },
      compliance: { frameworks: ["ISO 27001"], automation: 25 },
    },
    roi: { paybackPeriod: 18, laborSavings: -2.0, incidentReduction: 0.65, breachRiskReduction: 0.6 },
    marketShare: "Medium",
  },
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
        { name: "eyeSight", pricePerDevice: 13 }, // Assuming monthly, adjust if annual
        { name: "eyeControl", pricePerDevice: 25 },
        { name: "eyeExtend", pricePerDevice: 37 },
      ],
      hardware: { physical_small: { cost: 25000 }, physical_medium: { cost: 55000 } }, // Renamed for clarity
      professionalServices: { standard: 80000 },
      hiddenCosts: { complexity: 30000, total: 30000 },
    },
    implementation: {
      deploymentTime: { fullDeployment: 90 },
      requiredResources: { internal: 2.5, vendor: 1.0, training: 32 },
    },
    features: {
      core: {
        agentless: true,
        deploymentModel: "On-Premise/Virtual Appliance",
        deploymentTime: 90 * 24,
        hardwareRequired: true,
        scalability: "Medium",
      },
      security: { zeroTrust: { score: 50 } },
      compliance: { automation: 20 },
    },
    roi: { paybackPeriod: 15, laborSavings: -1.5, incidentReduction: 0.6, breachRiskReduction: 0.5 },
    marketShare: "Medium",
  },
  // Adding new vendors from the script
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
      hardware: { controller: { cost: 15000 } },
      professionalServices: { standard: 30000 },
    },
    implementation: { deploymentTime: { fullDeployment: 60 }, requiredResources: { internal: 2.0, training: 24 } },
    features: { core: { deploymentModel: "Hybrid", deploymentTime: 60 * 24, scalability: "Medium" } },
    roi: { paybackPeriod: 20, breachRiskReduction: 0.55 },
    marketShare: "Low",
  },
  arista: {
    id: "arista",
    name: "Arista CUE",
    type: "cloud-native",
    category: "Cloud-Managed NAC",
    logo: "/arista-logo.png",
    description: "Cloud-managed network services including NAC.",
    pricing: { model: "SaaS Subscription", perDevice: { monthly: 7 }, professionalServices: { implementation: 10000 } },
    implementation: { deploymentTime: { fullDeployment: 30 }, requiredResources: { internal: 1.0, training: 16 } },
    features: {
      core: { cloudNative: true, deploymentModel: "Cloud SaaS", deploymentTime: 30 * 24, scalability: "High" },
    },
    roi: { paybackPeriod: 12, breachRiskReduction: 0.7 },
    marketShare: "Low",
  },
  juniper: {
    id: "juniper",
    name: "Juniper Mist Access Assurance",
    type: "cloud-native",
    category: "AI-Driven NAC",
    logo: "/juniper-logo.png",
    description: "AI-driven cloud NAC for modern enterprises.",
    pricing: { model: "SaaS Subscription", perDevice: { monthly: 8 }, professionalServices: { implementation: 12000 } },
    implementation: { deploymentTime: { fullDeployment: 20 }, requiredResources: { internal: 0.5, training: 8 } },
    features: {
      core: {
        cloudNative: true,
        aiPowered: true,
        deploymentModel: "Cloud SaaS",
        deploymentTime: 20 * 24,
        scalability: "High",
      },
    },
    roi: { paybackPeriod: 10, breachRiskReduction: 0.75 },
    marketShare: "Emerging",
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
      hardware: { appliance: { cost: 20000 } },
      professionalServices: { standard: 40000 },
    },
    implementation: { deploymentTime: { fullDeployment: 90 }, requiredResources: { internal: 2.5, training: 32 } },
    features: { core: { deploymentModel: "On-Premise Appliance", deploymentTime: 90 * 24, scalability: "Medium" } },
    roi: { paybackPeriod: 22, breachRiskReduction: 0.6 },
    marketShare: "Medium",
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
    }, // Assuming E3/E5 component
    implementation: { deploymentTime: { fullDeployment: 45 }, requiredResources: { internal: 1.5, training: 20 } },
    features: { core: { deploymentModel: "Hybrid", deploymentTime: 45 * 24, scalability: "High (with Azure)" } },
    roi: { paybackPeriod: 18, breachRiskReduction: 0.5 },
    marketShare: "High (as part of M365)",
  },
  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    type: "open-source",
    category: "Open Source NAC",
    logo: "/packetfence-logo.png", // Assuming this exists from previous
    description: "Open source NAC solution requiring extensive customization",
    pricing: {
      model: "Open Source + Support",
      licenses: { base: 0 },
      professionalServices: { implementation: 95000 },
      additionalCosts: { support: 25000 },
    }, // Support cost
    implementation: { deploymentTime: { fullDeployment: 120 }, requiredResources: { internal: 4.0 } },
    features: {
      core: {
        customizable: true,
        complexSetup: true,
        requiresExpertise: true,
        deploymentModel: "Self-Hosted",
        deploymentTime: 120 * 24,
        scalability: "Varies",
      },
    },
    roi: { paybackPeriod: 30, breachRiskReduction: 0.4 },
    marketShare: "Low",
  },
  foxpass: {
    id: "foxpass",
    name: "Foxpass",
    type: "cloud-radius",
    category: "Cloud RADIUS",
    logo: "/foxpass-logo.png", // Assuming this exists
    description: "Simple cloud-hosted RADIUS for basic authentication",
    pricing: { model: "SaaS Subscription", perUser: { monthly: 1.5 } },
    implementation: { deploymentTime: { fullDeployment: 3 }, requiredResources: { internal: 0.25 } },
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
        deploymentTime: 3 * 24,
        scalability: "Medium",
      },
    },
    roi: { paybackPeriod: 6, breachRiskReduction: 0.3 },
    marketShare: "Low",
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    type: "cloud-radius",
    category: "Cloud PKI & RADIUS",
    logo: "/securew2-logo.png",
    description: "Cloud-based PKI and RADIUS for certificate-based authentication.",
    pricing: { model: "SaaS Subscription", perUser: { monthly: 2.5 }, professionalServices: { implementation: 5000 } },
    implementation: { deploymentTime: { fullDeployment: 7 }, requiredResources: { internal: 0.5, training: 8 } },
    features: {
      core: {
        pki: true,
        cloudRadius: true,
        deploymentModel: "Cloud SaaS",
        deploymentTime: 7 * 24,
        scalability: "Medium",
      },
    },
    roi: { paybackPeriod: 9, breachRiskReduction: 0.45 },
    marketShare: "Low",
  },
  radiusaas: {
    id: "radiusaas",
    name: "RADIUS-as-a-Service",
    type: "cloud-radius",
    category: "Managed RADIUS",
    logo: "/radiusaas-logo.png",
    description: "Managed RADIUS service for various authentication needs.",
    pricing: { model: "SaaS Subscription", perUser: { monthly: 1.0 }, professionalServices: { implementation: 2000 } },
    implementation: { deploymentTime: { fullDeployment: 5 }, requiredResources: { internal: 0.2, training: 4 } },
    features: {
      core: { managedRadius: true, deploymentModel: "Cloud SaaS", deploymentTime: 5 * 24, scalability: "Medium" },
    },
    roi: { paybackPeriod: 5, breachRiskReduction: 0.25 },
    marketShare: "Niche",
  },
}

// Function to get vendor logo path (as used in the script)
// This can be simplified in Next.js by directly using the logo path from AllVendorData
export const getVendorLogoPath = (vendorId: string): string => {
  return AllVendorData[vendorId]?.logo || "/default-logo.png"
}
