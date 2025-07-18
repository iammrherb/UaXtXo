// Accurate Portnox pricing based on https://www.portnox.com/pricing/

export interface PortnoxPricingTier {
  name: string
  pricePerDevice: number
  minimumDevices: number
  features: string[]
  includedFeatures: string[]
  limitations?: string[]
}

export interface PortnoxAddOn {
  name: string
  pricePerDevice: number
  description: string
  requiredTier?: string
}

export const PORTNOX_PRICING_TIERS: PortnoxPricingTier[] = [
  {
    name: "CLEAR Essentials",
    pricePerDevice: 2.5, // $2.50 per device per month
    minimumDevices: 100,
    features: [
      "Device Discovery & Classification",
      "Policy Enforcement",
      "Guest Access Management",
      "Certificate Management (Basic)",
      "RADIUS Authentication",
      "Basic Reporting",
      "24/7 Support",
    ],
    includedFeatures: [
      "Cloud-native deployment",
      "Zero infrastructure required",
      "Automatic updates",
      "Basic integrations (AD, LDAP)",
      "Standard dashboards",
      "Email notifications",
    ],
  },
  {
    name: "CLEAR Professional",
    pricePerDevice: 4.0, // $4.00 per device per month
    minimumDevices: 250,
    features: [
      "All Essentials features",
      "Advanced Device Profiling",
      "Risk-Based Access Control",
      "Advanced Certificate Management",
      "TACACS+ Support",
      "Advanced Analytics & Reporting",
      "API Access",
      "Custom Dashboards",
      "SIEM/SOAR Integrations",
      "Priority Support",
    ],
    includedFeatures: [
      "All Essentials included features",
      "Advanced threat detection",
      "Behavioral analytics",
      "Custom policy templates",
      "Advanced integrations (MDM, ITSM)",
      "Real-time monitoring",
      "Compliance reporting",
    ],
  },
  {
    name: "CLEAR Enterprise",
    pricePerDevice: 6.0, // $6.00 per device per month
    minimumDevices: 1000,
    features: [
      "All Professional features",
      "Zero Trust Architecture",
      "AI-Powered Analytics",
      "Advanced Threat Protection",
      "IoT/OT Security",
      "Multi-Tenant Management",
      "Advanced Compliance Automation",
      "Custom Integrations",
      "Dedicated Success Manager",
      "Premium Support (1-hour SLA)",
    ],
    includedFeatures: [
      "All Professional included features",
      "Machine learning capabilities",
      "Predictive analytics",
      "Advanced automation",
      "Custom development support",
      "White-glove onboarding",
      "Quarterly business reviews",
    ],
  },
]

// No additional add-ons required - everything is included in the tiers
export const PORTNOX_ADDONS: PortnoxAddOn[] = [
  // Portnox includes all features in their tiers - no additional licensing required
]

export interface CompetitorPricingStructure {
  vendorId: string
  baseLicensing: {
    basePrice: number
    pricePerDevice: number
    minimumDevices: number
  }
  requiredAddOns: {
    name: string
    pricePerDevice: number
    required: boolean
    description: string
  }[]
  hardwareRequirements: {
    primaryAppliance: number
    backupAppliance: number
    networkEquipment: number
    total: number
  }
  professionalServices: {
    implementation: number
    training: number
    customization: number
    total: number
  }
  ongoingCosts: {
    annualMaintenance: number
    support: number
    upgrades: number
    total: number
  }
  vendorLockIn: {
    level: "high" | "medium" | "low"
    factors: string[]
  }
}

export const COMPETITOR_PRICING: Record<string, CompetitorPricingStructure> = {
  cisco: {
    vendorId: "cisco",
    baseLicensing: {
      basePrice: 50000, // Base ISE license
      pricePerDevice: 8.5, // Per endpoint license
      minimumDevices: 100,
    },
    requiredAddOns: [
      {
        name: "ISE Plus License",
        pricePerDevice: 3.5,
        required: true,
        description: "Required for advanced features like profiling and posturing",
      },
      {
        name: "ISE Apex License",
        pricePerDevice: 5.0,
        required: false,
        description: "Advanced threat detection and AI analytics",
      },
      {
        name: "TrustSec License",
        pricePerDevice: 2.0,
        required: false,
        description: "Software-defined segmentation",
      },
      {
        name: "pxGrid License",
        pricePerDevice: 1.5,
        required: false,
        description: "Platform exchange for ecosystem integration",
      },
    ],
    hardwareRequirements: {
      primaryAppliance: 75000, // ISE 3595 appliance
      backupAppliance: 75000, // HA requirement
      networkEquipment: 25000, // Network device upgrades
      total: 175000,
    },
    professionalServices: {
      implementation: 50000,
      training: 25000,
      customization: 30000,
      total: 105000,
    },
    ongoingCosts: {
      annualMaintenance: 35000, // 20% of hardware + software
      support: 15000, // Premium support
      upgrades: 20000, // Major version upgrades
      total: 70000,
    },
    vendorLockIn: {
      level: "high",
      factors: [
        "Proprietary hardware appliances",
        "Cisco-specific integrations",
        "Complex migration process",
        "Vendor-specific training requirements",
      ],
    },
  },
  aruba: {
    vendorId: "aruba",
    baseLicensing: {
      basePrice: 25000,
      pricePerDevice: 6.0,
      minimumDevices: 50,
    },
    requiredAddOns: [
      {
        name: "ClearPass Policy Manager",
        pricePerDevice: 2.0,
        required: true,
        description: "Core policy management functionality",
      },
      {
        name: "ClearPass Device Insight",
        pricePerDevice: 1.5,
        required: false,
        description: "Advanced device profiling and classification",
      },
      {
        name: "ClearPass OnGuard",
        pricePerDevice: 1.0,
        required: false,
        description: "Endpoint compliance and remediation",
      },
      {
        name: "IntroSpect UEBA",
        pricePerDevice: 3.0,
        required: false,
        description: "User and entity behavior analytics",
      },
    ],
    hardwareRequirements: {
      primaryAppliance: 40000,
      backupAppliance: 40000,
      networkEquipment: 15000,
      total: 95000,
    },
    professionalServices: {
      implementation: 30000,
      training: 15000,
      customization: 20000,
      total: 65000,
    },
    ongoingCosts: {
      annualMaintenance: 25000,
      support: 12000,
      upgrades: 15000,
      total: 52000,
    },
    vendorLockIn: {
      level: "medium",
      factors: ["Hardware appliance dependency", "HPE Aruba ecosystem integration", "Moderate migration complexity"],
    },
  },
  forescout: {
    vendorId: "forescout",
    baseLicensing: {
      basePrice: 30000,
      pricePerDevice: 5.5,
      minimumDevices: 100,
    },
    requiredAddOns: [
      {
        name: "Extended Modules",
        pricePerDevice: 2.5,
        required: true,
        description: "Advanced visibility and control modules",
      },
      {
        name: "IoT Security Module",
        pricePerDevice: 2.0,
        required: false,
        description: "Specialized IoT device security",
      },
      {
        name: "OT Security Module",
        pricePerDevice: 3.0,
        required: false,
        description: "Operational technology security",
      },
      {
        name: "Threat Detection",
        pricePerDevice: 1.5,
        required: false,
        description: "Advanced threat detection capabilities",
      },
    ],
    hardwareRequirements: {
      primaryAppliance: 50000,
      backupAppliance: 50000,
      networkEquipment: 20000,
      total: 120000,
    },
    professionalServices: {
      implementation: 40000,
      training: 20000,
      customization: 25000,
      total: 85000,
    },
    ongoingCosts: {
      annualMaintenance: 30000,
      support: 15000,
      upgrades: 18000,
      total: 63000,
    },
    vendorLockIn: {
      level: "medium",
      factors: ["Appliance-based architecture", "Specialized IoT/OT integrations", "Custom policy dependencies"],
    },
  },
}

export function calculatePortnoxTotalCost(
  tier: string,
  deviceCount: number,
  years: number,
): {
  monthlyPerDevice: number
  totalLicensing: number
  hardwareCosts: number
  implementationCosts: number
  ongoingCosts: number
  totalCost: number
  breakdown: {
    licensing: number
    hardware: number
    implementation: number
    support: number
    training: number
    maintenance: number
  }
} {
  const selectedTier = PORTNOX_PRICING_TIERS.find((t) => t.name.includes(tier)) || PORTNOX_PRICING_TIERS[1]

  const monthlyPerDevice = selectedTier.pricePerDevice
  const totalLicensing = monthlyPerDevice * deviceCount * 12 * years

  // Portnox has no additional costs - everything is included
  const hardwareCosts = 0 // Cloud-native, no hardware required
  const implementationCosts = 0 // Self-service deployment
  const ongoingCosts = 0 // Included in subscription

  return {
    monthlyPerDevice,
    totalLicensing,
    hardwareCosts,
    implementationCosts,
    ongoingCosts,
    totalCost: totalLicensing,
    breakdown: {
      licensing: totalLicensing,
      hardware: 0,
      implementation: 0,
      support: 0, // Included
      training: 0, // Included
      maintenance: 0, // Included
    },
  }
}

export function calculateCompetitorTotalCost(
  vendorId: string,
  deviceCount: number,
  years: number,
  includeOptionalAddOns = true,
): {
  totalCost: number
  breakdown: {
    licensing: number
    hardware: number
    implementation: number
    support: number
    training: number
    maintenance: number
  }
  vendorLockInRisk: "high" | "medium" | "low"
  hiddenCosts: number
} {
  const vendor = COMPETITOR_PRICING[vendorId]
  if (!vendor) throw new Error(`Vendor ${vendorId} not found`)

  // Base licensing
  let licensing = vendor.baseLicensing.basePrice + vendor.baseLicensing.pricePerDevice * deviceCount * years

  // Required add-ons
  vendor.requiredAddOns.forEach((addon) => {
    if (addon.required || includeOptionalAddOns) {
      licensing += addon.pricePerDevice * deviceCount * years
    }
  })

  const hardware = vendor.hardwareRequirements.total
  const implementation = vendor.professionalServices.total
  const support = vendor.ongoingCosts.support * years
  const training = vendor.professionalServices.training
  const maintenance = vendor.ongoingCosts.annualMaintenance * years

  // Hidden costs calculation
  const hiddenCosts = (licensing + hardware + implementation) * 0.25 // 25% hidden costs

  const totalCost = licensing + hardware + implementation + support + training + maintenance + hiddenCosts

  return {
    totalCost,
    breakdown: {
      licensing,
      hardware,
      implementation,
      support,
      training,
      maintenance,
    },
    vendorLockInRisk: vendor.vendorLockIn.level,
    hiddenCosts,
  }
}
