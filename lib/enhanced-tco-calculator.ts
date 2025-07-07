// Enhanced TCO Calculator with comprehensive vendor database and industry analysis
// Includes all 13 NAC vendors, 8 industries, and 9 compliance frameworks

export interface CalculationConfiguration {
  deviceCount: number
  userCount: number
  timeframe: number
  industry: string
  deploymentModel: "cloud" | "on-premise" | "hybrid"
  hasExistingNAC: boolean
  currentVendor?: string
  includeCompliance: boolean
  includeRiskReduction: boolean
  includeHiddenCosts: boolean
}

export interface VendorData {
  id: string
  name: string
  category: "leader" | "challenger" | "niche" | "visionary"
  deployment: ("cloud" | "on-premise" | "hybrid")[]
  pricing: {
    model: "per-device" | "per-user" | "subscription" | "perpetual"
    baseCost: number
    maintenanceCost: number
    implementationCost: number
    trainingCost: number
  }
  capabilities: {
    automation: number // 0-100
    scalability: number // 0-100
    integration: number // 0-100
    security: number // 0-100
    usability: number // 0-100
  }
  implementation: {
    timeToValue: number // days
    complexity: "low" | "medium" | "high" | "very-high"
    requiredSkills: string[]
    supportQuality: number // 0-100
  }
  compliance: {
    frameworks: string[]
    coverage: number // 0-100
    automation: number // 0-100
  }
}

export interface IndustryData {
  id: string
  name: string
  complianceRequirements: string[]
  securityPriority: "high" | "medium" | "low"
  budgetConstraints: "tight" | "moderate" | "flexible"
  riskTolerance: "low" | "medium" | "high"
  typicalDeviceCount: number
  averageBreachCost: number
  regulatoryFines: number
}

export interface ComplianceFramework {
  id: string
  name: string
  description: string
  industries: string[]
  controls: {
    total: number
    portnoxCoverage: number
    automationLevel: number
  }
  penalties: {
    financial: number
    operational: string
  }
}

export interface TCOResult {
  vendor: string
  vendorName: string
  year1: number
  year2: number
  year3: number
  year5: number
  totalCost: number
  roi: {
    percentage: number
    paybackPeriod: number
    breachRiskReduction: number
    operationalSavings: number
    complianceSavings: number
  }
  breakdown: {
    licensing: number
    implementation: number
    maintenance: number
    training: number
    infrastructure: number
    hiddenCosts: number
  }
}

// Comprehensive vendor database with all 13 NAC vendors
export const ENHANCED_VENDOR_DATABASE: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    category: "leader",
    deployment: ["cloud", "on-premise", "hybrid"],
    pricing: {
      model: "per-device",
      baseCost: 48,
      maintenanceCost: 9.6,
      implementationCost: 15000,
      trainingCost: 5000,
    },
    capabilities: {
      automation: 95,
      scalability: 98,
      integration: 92,
      security: 96,
      usability: 94,
    },
    implementation: {
      timeToValue: 7,
      complexity: "low",
      requiredSkills: ["Basic networking", "Cloud administration"],
      supportQuality: 95,
    },
    compliance: {
      frameworks: ["hipaa", "pci-dss", "sox", "nist-800-53", "gdpr", "iso-27001", "fedramp", "cmmc", "nerc-cip"],
      coverage: 95,
      automation: 95,
    },
  },
  cisco: {
    id: "cisco",
    name: "Cisco ISE",
    category: "leader",
    deployment: ["on-premise", "hybrid"],
    pricing: {
      model: "per-device",
      baseCost: 110,
      maintenanceCost: 22,
      implementationCost: 75000,
      trainingCost: 25000,
    },
    capabilities: {
      automation: 70,
      scalability: 85,
      integration: 88,
      security: 90,
      usability: 65,
    },
    implementation: {
      timeToValue: 90,
      complexity: "very-high",
      requiredSkills: ["Advanced networking", "Cisco expertise", "PKI", "RADIUS", "Active Directory"],
      supportQuality: 85,
    },
    compliance: {
      frameworks: ["hipaa", "pci-dss", "sox", "nist-800-53", "gdpr", "iso-27001", "fedramp", "cmmc"],
      coverage: 88,
      automation: 65,
    },
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    category: "challenger",
    deployment: ["on-premise", "cloud", "hybrid"],
    pricing: {
      model: "per-device",
      baseCost: 82,
      maintenanceCost: 16.4,
      implementationCost: 45000,
      trainingCost: 18000,
    },
    capabilities: {
      automation: 78,
      scalability: 88,
      integration: 85,
      security: 87,
      usability: 75,
    },
    implementation: {
      timeToValue: 45,
      complexity: "high",
      requiredSkills: ["Networking", "Aruba expertise", "Policy management"],
      supportQuality: 82,
    },
    compliance: {
      frameworks: ["hipaa", "pci-dss", "sox", "nist-800-53", "gdpr", "iso-27001"],
      coverage: 85,
      automation: 75,
    },
  },
  juniper: {
    id: "juniper",
    name: "Juniper Mist Access Assurance",
    category: "visionary",
    deployment: ["cloud", "hybrid"],
    pricing: {
      model: "per-device",
      baseCost: 65,
      maintenanceCost: 13,
      implementationCost: 35000,
      trainingCost: 12000,
    },
    capabilities: {
      automation: 88,
      scalability: 92,
      integration: 80,
      security: 85,
      usability: 85,
    },
    implementation: {
      timeToValue: 21,
      complexity: "medium",
      requiredSkills: ["Cloud networking", "AI/ML basics", "Juniper Mist"],
      supportQuality: 88,
    },
    compliance: {
      frameworks: ["hipaa", "pci-dss", "sox", "nist-800-53", "gdpr"],
      coverage: 82,
      automation: 85,
    },
  },
  extreme: {
    id: "extreme",
    name: "Extreme Networks NAC",
    category: "niche",
    deployment: ["on-premise", "hybrid"],
    pricing: {
      model: "per-device",
      baseCost: 75,
      maintenanceCost: 15,
      implementationCost: 40000,
      trainingCost: 15000,
    },
    capabilities: {
      automation: 72,
      scalability: 80,
      integration: 78,
      security: 82,
      usability: 70,
    },
    implementation: {
      timeToValue: 60,
      complexity: "high",
      requiredSkills: ["Networking", "Extreme expertise", "Policy management"],
      supportQuality: 75,
    },
    compliance: {
      frameworks: ["hipaa", "pci-dss", "sox", "nist-800-53"],
      coverage: 78,
      automation: 70,
    },
  },
  arista: {
    id: "arista",
    name: "Arista CloudVision CUE",
    category: "niche",
    deployment: ["cloud", "hybrid"],
    pricing: {
      model: "per-device",
      baseCost: 58,
      maintenanceCost: 11.6,
      implementationCost: 28000,
      trainingCost: 10000,
    },
    capabilities: {
      automation: 82,
      scalability: 88,
      integration: 75,
      security: 80,
      usability: 78,
    },
    implementation: {
      timeToValue: 30,
      complexity: "medium",
      requiredSkills: ["Cloud networking", "Arista expertise"],
      supportQuality: 80,
    },
    compliance: {
      frameworks: ["hipaa", "pci-dss", "sox", "nist-800-53"],
      coverage: 75,
      automation: 80,
    },
  },
  pulse: {
    id: "pulse",
    name: "Pulse Secure NAC",
    category: "niche",
    deployment: ["on-premise", "hybrid"],
    pricing: {
      model: "per-device",
      baseCost: 88,
      maintenanceCost: 17.6,
      implementationCost: 50000,
      trainingCost: 20000,
    },
    capabilities: {
      automation: 68,
      scalability: 75,
      integration: 82,
      security: 85,
      usability: 68,
    },
    implementation: {
      timeToValue: 75,
      complexity: "high",
      requiredSkills: ["VPN expertise", "Network security", "Pulse Secure"],
      supportQuality: 78,
    },
    compliance: {
      frameworks: ["hipaa", "pci-dss", "sox", "nist-800-53", "fedramp"],
      coverage: 80,
      automation: 65,
    },
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft NPS/Intune",
    category: "challenger",
    deployment: ["cloud", "hybrid"],
    pricing: {
      model: "per-user",
      baseCost: 12,
      maintenanceCost: 2.4,
      implementationCost: 25000,
      trainingCost: 8000,
    },
    capabilities: {
      automation: 75,
      scalability: 90,
      integration: 95,
      security: 78,
      usability: 82,
    },
    implementation: {
      timeToValue: 14,
      complexity: "medium",
      requiredSkills: ["Microsoft 365", "Azure AD", "Intune"],
      supportQuality: 85,
    },
    compliance: {
      frameworks: ["hipaa", "sox", "gdpr", "iso-27001", "fedramp"],
      coverage: 72,
      automation: 78,
    },
  },
  foxpass: {
    id: "foxpass",
    name: "Foxpass",
    category: "niche",
    deployment: ["cloud"],
    pricing: {
      model: "per-user",
      baseCost: 8,
      maintenanceCost: 1.6,
      implementationCost: 8000,
      trainingCost: 3000,
    },
    capabilities: {
      automation: 85,
      scalability: 92,
      integration: 70,
      security: 75,
      usability: 88,
    },
    implementation: {
      timeToValue: 3,
      complexity: "low",
      requiredSkills: ["Basic RADIUS", "Cloud services"],
      supportQuality: 82,
    },
    compliance: {
      frameworks: ["hipaa", "sox", "gdpr"],
      coverage: 65,
      automation: 85,
    },
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    category: "niche",
    deployment: ["cloud", "on-premise"],
    pricing: {
      model: "per-user",
      baseCost: 15,
      maintenanceCost: 3,
      implementationCost: 12000,
      trainingCost: 5000,
    },
    capabilities: {
      automation: 80,
      scalability: 85,
      integration: 72,
      security: 88,
      usability: 85,
    },
    implementation: {
      timeToValue: 10,
      complexity: "low",
      requiredSkills: ["PKI", "Certificate management", "RADIUS"],
      supportQuality: 85,
    },
    compliance: {
      frameworks: ["hipaa", "pci-dss", "sox", "nist-800-53"],
      coverage: 78,
      automation: 82,
    },
  },
  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    category: "niche",
    deployment: ["on-premise"],
    pricing: {
      model: "perpetual",
      baseCost: 25000,
      maintenanceCost: 5000,
      implementationCost: 35000,
      trainingCost: 15000,
    },
    capabilities: {
      automation: 60,
      scalability: 70,
      integration: 65,
      security: 75,
      usability: 55,
    },
    implementation: {
      timeToValue: 120,
      complexity: "very-high",
      requiredSkills: ["Linux", "Open source", "Advanced networking", "Perl/Python"],
      supportQuality: 65,
    },
    compliance: {
      frameworks: ["hipaa", "pci-dss", "sox"],
      coverage: 70,
      automation: 55,
    },
  },
  forescout: {
    id: "forescout",
    name: "Forescout eyeSight",
    category: "challenger",
    deployment: ["on-premise", "hybrid"],
    pricing: {
      model: "per-device",
      baseCost: 95,
      maintenanceCost: 19,
      implementationCost: 60000,
      trainingCost: 22000,
    },
    capabilities: {
      automation: 82,
      scalability: 88,
      integration: 90,
      security: 92,
      usability: 72,
    },
    implementation: {
      timeToValue: 60,
      complexity: "high",
      requiredSkills: ["Network security", "Device profiling", "Forescout expertise"],
      supportQuality: 82,
    },
    compliance: {
      frameworks: ["hipaa", "pci-dss", "sox", "nist-800-53", "gdpr", "iso-27001"],
      coverage: 88,
      automation: 80,
    },
  },
  meraki: {
    id: "meraki",
    name: "Cisco Meraki Access Control",
    category: "challenger",
    deployment: ["cloud"],
    pricing: {
      model: "per-device",
      baseCost: 72,
      maintenanceCost: 14.4,
      implementationCost: 20000,
      trainingCost: 8000,
    },
    capabilities: {
      automation: 85,
      scalability: 90,
      integration: 78,
      security: 82,
      usability: 90,
    },
    implementation: {
      timeToValue: 14,
      complexity: "low",
      requiredSkills: ["Meraki dashboard", "Cloud networking"],
      supportQuality: 88,
    },
    compliance: {
      frameworks: ["hipaa", "pci-dss", "sox", "gdpr"],
      coverage: 75,
      automation: 85,
    },
  },
}

// Industry database with 8 major industries
export const INDUSTRY_DATABASE: Record<string, IndustryData> = {
  healthcare: {
    id: "healthcare",
    name: "Healthcare",
    complianceRequirements: ["hipaa", "gdpr", "nist-800-53"],
    securityPriority: "high",
    budgetConstraints: "moderate",
    riskTolerance: "low",
    typicalDeviceCount: 2500,
    averageBreachCost: 10930000,
    regulatoryFines: 5000000,
  },
  financial: {
    id: "financial",
    name: "Financial Services",
    complianceRequirements: ["pci-dss", "sox", "gdpr", "nist-800-53"],
    securityPriority: "high",
    budgetConstraints: "flexible",
    riskTolerance: "low",
    typicalDeviceCount: 5000,
    averageBreachCost: 5850000,
    regulatoryFines: 10000000,
  },
  retail: {
    id: "retail",
    name: "Retail",
    complianceRequirements: ["pci-dss", "gdpr"],
    securityPriority: "medium",
    budgetConstraints: "tight",
    riskTolerance: "medium",
    typicalDeviceCount: 1500,
    averageBreachCost: 3270000,
    regulatoryFines: 2000000,
  },
  manufacturing: {
    id: "manufacturing",
    name: "Manufacturing",
    complianceRequirements: ["nist-800-53", "iso-27001"],
    securityPriority: "medium",
    budgetConstraints: "moderate",
    riskTolerance: "medium",
    typicalDeviceCount: 3000,
    averageBreachCost: 4450000,
    regulatoryFines: 1500000,
  },
  education: {
    id: "education",
    name: "Education",
    complianceRequirements: ["ferpa", "gdpr", "nist-800-53"],
    securityPriority: "medium",
    budgetConstraints: "tight",
    riskTolerance: "high",
    typicalDeviceCount: 2000,
    averageBreachCost: 3790000,
    regulatoryFines: 500000,
  },
  government: {
    id: "government",
    name: "Government",
    complianceRequirements: ["fedramp", "nist-800-53", "cmmc"],
    securityPriority: "high",
    budgetConstraints: "moderate",
    riskTolerance: "low",
    typicalDeviceCount: 4000,
    averageBreachCost: 4740000,
    regulatoryFines: 15000000,
  },
  technology: {
    id: "technology",
    name: "Technology",
    complianceRequirements: ["gdpr", "iso-27001", "sox"],
    securityPriority: "high",
    budgetConstraints: "flexible",
    riskTolerance: "medium",
    typicalDeviceCount: 1200,
    averageBreachCost: 5040000,
    regulatoryFines: 3000000,
  },
  energy: {
    id: "energy",
    name: "Energy & Utilities",
    complianceRequirements: ["nerc-cip", "nist-800-53", "iso-27001"],
    securityPriority: "high",
    budgetConstraints: "moderate",
    riskTolerance: "low",
    typicalDeviceCount: 6000,
    averageBreachCost: 6720000,
    regulatoryFines: 25000000,
  },
}

// Compliance framework mappings with detailed Portnox control coverage
export const COMPLIANCE_FRAMEWORK_MAPPINGS: Record<string, ComplianceFramework> = {
  hipaa: {
    id: "hipaa",
    name: "HIPAA (Health Insurance Portability and Accountability Act)",
    description: "US healthcare data protection regulation",
    industries: ["healthcare"],
    controls: {
      total: 78,
      portnoxCoverage: 74,
      automationLevel: 93,
    },
    penalties: {
      financial: 1800000,
      operational: "Business disruption, reputation damage",
    },
  },
  "pci-dss": {
    id: "pci-dss",
    name: "PCI DSS (Payment Card Industry Data Security Standard)",
    description: "Credit card data protection standard",
    industries: ["retail", "financial", "healthcare"],
    controls: {
      total: 375,
      portnoxCoverage: 360,
      automationLevel: 96,
    },
    penalties: {
      financial: 500000,
      operational: "Loss of payment processing privileges",
    },
  },
  sox: {
    id: "sox",
    name: "SOX (Sarbanes-Oxley Act)",
    description: "Financial reporting and corporate governance",
    industries: ["financial", "technology"],
    controls: {
      total: 45,
      portnoxCoverage: 43,
      automationLevel: 95,
    },
    penalties: {
      financial: 5000000,
      operational: "Executive liability, audit failures",
    },
  },
  "nist-800-53": {
    id: "nist-800-53",
    name: "NIST 800-53 (Security Controls for Federal Information Systems)",
    description: "Comprehensive security control framework",
    industries: ["government", "healthcare", "financial", "manufacturing", "education", "energy"],
    controls: {
      total: 1200,
      portnoxCoverage: 1140,
      automationLevel: 95,
    },
    penalties: {
      financial: 10000000,
      operational: "Loss of federal contracts, security clearances",
    },
  },
  gdpr: {
    id: "gdpr",
    name: "GDPR (General Data Protection Regulation)",
    description: "EU data protection regulation",
    industries: ["healthcare", "financial", "retail", "technology", "education"],
    controls: {
      total: 99,
      portnoxCoverage: 92,
      automationLevel: 93,
    },
    penalties: {
      financial: 20000000,
      operational: "Data processing restrictions, reputation damage",
    },
  },
  "iso-27001": {
    id: "iso-27001",
    name: "ISO 27001 (Information Security Management)",
    description: "International information security standard",
    industries: ["manufacturing", "technology", "energy", "financial"],
    controls: {
      total: 114,
      portnoxCoverage: 108,
      automationLevel: 95,
    },
    penalties: {
      financial: 2000000,
      operational: "Certification loss, customer trust issues",
    },
  },
  fedramp: {
    id: "fedramp",
    name: "FedRAMP (Federal Risk and Authorization Management Program)",
    description: "US government cloud security framework",
    industries: ["government", "technology"],
    controls: {
      total: 325,
      portnoxCoverage: 305,
      automationLevel: 94,
    },
    penalties: {
      financial: 50000000,
      operational: "Loss of government contracts, security clearances",
    },
  },
  cmmc: {
    id: "cmmc",
    name: "CMMC (Cybersecurity Maturity Model Certification)",
    description: "US defense contractor cybersecurity framework",
    industries: ["government", "manufacturing"],
    controls: {
      total: 171,
      portnoxCoverage: 162,
      automationLevel: 95,
    },
    penalties: {
      financial: 25000000,
      operational: "Loss of defense contracts, security clearances",
    },
  },
  "nerc-cip": {
    id: "nerc-cip",
    name: "NERC CIP (Critical Infrastructure Protection)",
    description: "North American electric grid cybersecurity standards",
    industries: ["energy"],
    controls: {
      total: 45,
      portnoxCoverage: 40,
      automationLevel: 88,
    },
    penalties: {
      financial: 1000000,
      operational: "Grid reliability issues, regulatory oversight",
    },
  },
}

// TCO calculation function
export function calculateTCO(config: CalculationConfiguration): Record<string, TCOResult> {
  const results: Record<string, TCOResult> = {}
  const industryData = INDUSTRY_DATABASE[config.industry]

  Object.entries(ENHANCED_VENDOR_DATABASE).forEach(([vendorId, vendor]) => {
    // Base calculations
    const deviceCost =
      vendor.pricing.model === "per-device"
        ? vendor.pricing.baseCost * config.deviceCount
        : vendor.pricing.model === "per-user"
          ? vendor.pricing.baseCost * config.userCount
          : vendor.pricing.baseCost

    const maintenanceCost =
      vendor.pricing.model === "per-device"
        ? vendor.pricing.maintenanceCost * config.deviceCount
        : vendor.pricing.model === "per-user"
          ? vendor.pricing.maintenanceCost * config.userCount
          : vendor.pricing.maintenanceCost

    const implementationCost = vendor.pricing.implementationCost
    const trainingCost = vendor.pricing.trainingCost

    // Infrastructure costs (higher for on-premise)
    const infrastructureCost = vendor.deployment.includes("on-premise")
      ? config.deviceCount * 15
      : config.deviceCount * 3

    // Hidden costs calculation
    const complexityMultiplier = {
      low: 1.1,
      medium: 1.3,
      high: 1.6,
      "very-high": 2.2,
    }[vendor.implementation.complexity]

    const hiddenCosts = (implementationCost + trainingCost) * (complexityMultiplier - 1)

    // Year-by-year costs
    const year1 = deviceCost + implementationCost + trainingCost + infrastructureCost + hiddenCosts
    const year2 = year1 + maintenanceCost
    const year3 = year2 + maintenanceCost
    const year5 = year3 + maintenanceCost * 2

    // ROI calculations
    const breachRiskReduction = Math.min(95, vendor.capabilities.security + vendor.capabilities.automation * 0.3)
    const operationalSavings = (vendor.capabilities.automation / 100) * config.deviceCount * 500 * config.timeframe
    const complianceSavings = config.includeCompliance
      ? (vendor.compliance.automation / 100) * 200000 * config.timeframe
      : 0

    const totalSavings =
      operationalSavings + complianceSavings + industryData.averageBreachCost * (breachRiskReduction / 100) * 0.1

    const roiPercentage = ((totalSavings - year3) / year3) * 100
    const paybackPeriod = year3 / (totalSavings / config.timeframe / 12)

    results[vendorId] = {
      vendor: vendorId,
      vendorName: vendor.name,
      year1,
      year2,
      year3,
      year5,
      totalCost: year3,
      roi: {
        percentage: roiPercentage,
        paybackPeriod: Math.max(1, Math.min(36, paybackPeriod)),
        breachRiskReduction,
        operationalSavings,
        complianceSavings,
      },
      breakdown: {
        licensing: deviceCost,
        implementation: implementationCost,
        maintenance: maintenanceCost * config.timeframe,
        training: trainingCost,
        infrastructure: infrastructureCost,
        hiddenCosts,
      },
    }
  })

  return results
}

// Utility functions
export function getAllVendors(): VendorData[] {
  return Object.values(ENHANCED_VENDOR_DATABASE)
}

export function getAllIndustries(): IndustryData[] {
  return Object.values(INDUSTRY_DATABASE)
}

export function getVendorById(id: string): VendorData | undefined {
  return ENHANCED_VENDOR_DATABASE[id]
}

export function getIndustryById(id: string): IndustryData | undefined {
  return INDUSTRY_DATABASE[id]
}

export function getComplianceFramework(id: string): ComplianceFramework | undefined {
  return COMPLIANCE_FRAMEWORK_MAPPINGS[id]
}

// Export types
export type { VendorData, IndustryData, ComplianceFramework, TCOResult }
