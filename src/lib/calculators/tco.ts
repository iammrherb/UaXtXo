// Enhanced vendor data structure
export interface EnhancedVendorData {
  id: string
  name: string
  category: "cloud_native" | "traditional" | "hybrid"
  pricing: {
    perDevice: {
      base: number
      volume_discount: number
      enterprise_discount: number
    }
    implementation: {
      base_cost: number
      per_device: number
      consulting_days: number
      training_cost: number
    }
    annual_support: {
      percentage: number
      minimum: number
    }
    infrastructure: {
      hardware_required: boolean
      server_cost: number
      storage_cost: number
      network_cost: number
    }
  }
  security: {
    zeroTrustScore: number
    breachRiskReduction: number
    complianceScore: number
    breachCostSavings: {
      risk_reduction_percentage: number
      insurance_discount: number
      audit_cost_reduction: number
    }
  }
  operationalMetrics: {
    adminEffort: number // hours per week per 1000 devices
    automationLevel: number // percentage
    deploymentTime: number // days
    maintenanceOverhead: number // hours per month
  }
  compliance: {
    frameworks: string[]
    coverage_percentage: Record<string, number>
    automated_reporting: boolean
  }
}

// Enhanced vendor database with ALL vendors
export const enhancedVendorDatabase: Record<string, EnhancedVendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    category: "cloud_native",
    pricing: {
      perDevice: {
        base: 60,
        volume_discount: 0.15,
        enterprise_discount: 0.25,
      },
      implementation: {
        base_cost: 15000,
        per_device: 5,
        consulting_days: 10,
        training_cost: 2500,
      },
      annual_support: {
        percentage: 0.18,
        minimum: 5000,
      },
      infrastructure: {
        hardware_required: false,
        server_cost: 0,
        storage_cost: 0,
        network_cost: 0,
      },
    },
    security: {
      zeroTrustScore: 95,
      breachRiskReduction: 87,
      complianceScore: 92,
      breachCostSavings: {
        risk_reduction_percentage: 87,
        insurance_discount: 30,
        audit_cost_reduction: 65,
      },
    },
    operationalMetrics: {
      adminEffort: 5,
      automationLevel: 90,
      deploymentTime: 7,
      maintenanceOverhead: 8,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI-DSS", "SOX", "GDPR", "ISO27001", "NIST", "FedRAMP"],
      coverage_percentage: {
        HIPAA: 92,
        "PCI-DSS": 90,
        SOX: 88,
        GDPR: 85,
        ISO27001: 93,
        NIST: 91,
        FedRAMP: 89,
      },
      automated_reporting: true,
    },
  },
  cisco: {
    id: "cisco",
    name: "Cisco ISE",
    category: "traditional",
    pricing: {
      perDevice: {
        base: 125,
        volume_discount: 0.1,
        enterprise_discount: 0.2,
      },
      implementation: {
        base_cost: 75000,
        per_device: 25,
        consulting_days: 45,
        training_cost: 15000,
      },
      annual_support: {
        percentage: 0.22,
        minimum: 25000,
      },
      infrastructure: {
        hardware_required: true,
        server_cost: 85000,
        storage_cost: 25000,
        network_cost: 15000,
      },
    },
    security: {
      zeroTrustScore: 85,
      breachRiskReduction: 72,
      complianceScore: 78,
      breachCostSavings: {
        risk_reduction_percentage: 72,
        insurance_discount: 15,
        audit_cost_reduction: 35,
      },
    },
    operationalMetrics: {
      adminEffort: 25,
      automationLevel: 45,
      deploymentTime: 90,
      maintenanceOverhead: 40,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI-DSS", "SOX", "ISO27001", "NIST"],
      coverage_percentage: {
        HIPAA: 78,
        "PCI-DSS": 82,
        SOX: 75,
        ISO27001: 80,
        NIST: 83,
      },
      automated_reporting: false,
    },
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    category: "traditional",
    pricing: {
      perDevice: {
        base: 95,
        volume_discount: 0.12,
        enterprise_discount: 0.22,
      },
      implementation: {
        base_cost: 45000,
        per_device: 18,
        consulting_days: 30,
        training_cost: 10000,
      },
      annual_support: {
        percentage: 0.2,
        minimum: 18000,
      },
      infrastructure: {
        hardware_required: true,
        server_cost: 55000,
        storage_cost: 18000,
        network_cost: 12000,
      },
    },
    security: {
      zeroTrustScore: 82,
      breachRiskReduction: 68,
      complianceScore: 75,
      breachCostSavings: {
        risk_reduction_percentage: 68,
        insurance_discount: 12,
        audit_cost_reduction: 30,
      },
    },
    operationalMetrics: {
      adminEffort: 20,
      automationLevel: 50,
      deploymentTime: 60,
      maintenanceOverhead: 32,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI-DSS", "ISO27001", "NIST"],
      coverage_percentage: {
        HIPAA: 75,
        "PCI-DSS": 78,
        ISO27001: 76,
        NIST: 79,
      },
      automated_reporting: false,
    },
  },
  meraki: {
    id: "meraki",
    name: "Cisco Meraki",
    category: "hybrid",
    pricing: {
      perDevice: {
        base: 82,
        volume_discount: 0.1,
        enterprise_discount: 0.18,
      },
      implementation: {
        base_cost: 20000,
        per_device: 8,
        consulting_days: 15,
        training_cost: 5000,
      },
      annual_support: {
        percentage: 0.15,
        minimum: 8000,
      },
      infrastructure: {
        hardware_required: true,
        server_cost: 0,
        storage_cost: 0,
        network_cost: 25000, // Access points and switches
      },
    },
    security: {
      zeroTrustScore: 75,
      breachRiskReduction: 58,
      complianceScore: 68,
      breachCostSavings: {
        risk_reduction_percentage: 58,
        insurance_discount: 8,
        audit_cost_reduction: 20,
      },
    },
    operationalMetrics: {
      adminEffort: 10,
      automationLevel: 65,
      deploymentTime: 30,
      maintenanceOverhead: 15,
    },
    compliance: {
      frameworks: ["PCI-DSS", "ISO27001"],
      coverage_percentage: {
        "PCI-DSS": 70,
        ISO27001: 65,
      },
      automated_reporting: true,
    },
  },
  juniper: {
    id: "juniper",
    name: "Juniper Mist",
    category: "hybrid",
    pricing: {
      perDevice: {
        base: 85,
        volume_discount: 0.14,
        enterprise_discount: 0.24,
      },
      implementation: {
        base_cost: 25000,
        per_device: 12,
        consulting_days: 20,
        training_cost: 8000,
      },
      annual_support: {
        percentage: 0.19,
        minimum: 12000,
      },
      infrastructure: {
        hardware_required: false,
        server_cost: 0,
        storage_cost: 0,
        network_cost: 5000,
      },
    },
    security: {
      zeroTrustScore: 88,
      breachRiskReduction: 75,
      complianceScore: 82,
      breachCostSavings: {
        risk_reduction_percentage: 75,
        insurance_discount: 18,
        audit_cost_reduction: 45,
      },
    },
    operationalMetrics: {
      adminEffort: 12,
      automationLevel: 75,
      deploymentTime: 30,
      maintenanceOverhead: 18,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI-DSS", "SOX", "ISO27001", "NIST"],
      coverage_percentage: {
        HIPAA: 82,
        "PCI-DSS": 85,
        SOX: 80,
        ISO27001: 84,
        NIST: 86,
      },
      automated_reporting: true,
    },
  },
  forescout: {
    id: "forescout",
    name: "Forescout",
    category: "traditional",
    pricing: {
      perDevice: {
        base: 110,
        volume_discount: 0.11,
        enterprise_discount: 0.21,
      },
      implementation: {
        base_cost: 65000,
        per_device: 22,
        consulting_days: 40,
        training_cost: 12000,
      },
      annual_support: {
        percentage: 0.21,
        minimum: 22000,
      },
      infrastructure: {
        hardware_required: true,
        server_cost: 70000,
        storage_cost: 22000,
        network_cost: 18000,
      },
    },
    security: {
      zeroTrustScore: 80,
      breachRiskReduction: 70,
      complianceScore: 76,
      breachCostSavings: {
        risk_reduction_percentage: 70,
        insurance_discount: 14,
        audit_cost_reduction: 32,
      },
    },
    operationalMetrics: {
      adminEffort: 22,
      automationLevel: 48,
      deploymentTime: 75,
      maintenanceOverhead: 35,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI-DSS", "ISO27001", "NIST"],
      coverage_percentage: {
        HIPAA: 76,
        "PCI-DSS": 80,
        ISO27001: 78,
        NIST: 81,
      },
      automated_reporting: false,
    },
  },
  fortinet: {
    id: "fortinet",
    name: "FortiNAC",
    category: "traditional",
    pricing: {
      perDevice: {
        base: 78,
        volume_discount: 0.12,
        enterprise_discount: 0.2,
      },
      implementation: {
        base_cost: 35000,
        per_device: 15,
        consulting_days: 25,
        training_cost: 7000,
      },
      annual_support: {
        percentage: 0.18,
        minimum: 15000,
      },
      infrastructure: {
        hardware_required: true,
        server_cost: 45000,
        storage_cost: 15000,
        network_cost: 10000,
      },
    },
    security: {
      zeroTrustScore: 78,
      breachRiskReduction: 68,
      complianceScore: 72,
      breachCostSavings: {
        risk_reduction_percentage: 68,
        insurance_discount: 12,
        audit_cost_reduction: 28,
      },
    },
    operationalMetrics: {
      adminEffort: 18,
      automationLevel: 55,
      deploymentTime: 45,
      maintenanceOverhead: 25,
    },
    compliance: {
      frameworks: ["PCI-DSS", "ISO27001", "NIST"],
      coverage_percentage: {
        "PCI-DSS": 75,
        ISO27001: 72,
        NIST: 78,
      },
      automated_reporting: false,
    },
  },
  extreme: {
    id: "extreme",
    name: "ExtremeControl",
    category: "traditional",
    pricing: {
      perDevice: {
        base: 70,
        volume_discount: 0.1,
        enterprise_discount: 0.18,
      },
      implementation: {
        base_cost: 30000,
        per_device: 12,
        consulting_days: 20,
        training_cost: 6000,
      },
      annual_support: {
        percentage: 0.16,
        minimum: 12000,
      },
      infrastructure: {
        hardware_required: false,
        server_cost: 0,
        storage_cost: 0,
        network_cost: 8000,
      },
    },
    security: {
      zeroTrustScore: 72,
      breachRiskReduction: 55,
      complianceScore: 65,
      breachCostSavings: {
        risk_reduction_percentage: 55,
        insurance_discount: 8,
        audit_cost_reduction: 22,
      },
    },
    operationalMetrics: {
      adminEffort: 16,
      automationLevel: 50,
      deploymentTime: 45,
      maintenanceOverhead: 22,
    },
    compliance: {
      frameworks: ["ISO27001", "NIST"],
      coverage_percentage: {
        ISO27001: 65,
        NIST: 68,
      },
      automated_reporting: false,
    },
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft NPS/Intune",
    category: "hybrid",
    pricing: {
      perDevice: {
        base: 50,
        volume_discount: 0.08,
        enterprise_discount: 0.15,
      },
      implementation: {
        base_cost: 20000,
        per_device: 8,
        consulting_days: 15,
        training_cost: 3000,
      },
      annual_support: {
        percentage: 0.12,
        minimum: 5000,
      },
      infrastructure: {
        hardware_required: false,
        server_cost: 0,
        storage_cost: 0,
        network_cost: 0,
      },
    },
    security: {
      zeroTrustScore: 80,
      breachRiskReduction: 62,
      complianceScore: 75,
      breachCostSavings: {
        risk_reduction_percentage: 62,
        insurance_discount: 10,
        audit_cost_reduction: 25,
      },
    },
    operationalMetrics: {
      adminEffort: 14,
      automationLevel: 58,
      deploymentTime: 35,
      maintenanceOverhead: 20,
    },
    compliance: {
      frameworks: ["HIPAA", "SOX", "GDPR", "ISO27001"],
      coverage_percentage: {
        HIPAA: 75,
        SOX: 78,
        GDPR: 82,
        ISO27001: 76,
      },
      automated_reporting: true,
    },
  },
  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    category: "traditional",
    pricing: {
      perDevice: {
        base: 0, // Open source
        volume_discount: 0,
        enterprise_discount: 0,
      },
      implementation: {
        base_cost: 0,
        per_device: 0,
        consulting_days: 60, // High implementation effort
        training_cost: 2000,
      },
      annual_support: {
        percentage: 0,
        minimum: 0,
      },
      infrastructure: {
        hardware_required: true,
        server_cost: 25000,
        storage_cost: 8000,
        network_cost: 5000,
      },
    },
    security: {
      zeroTrustScore: 65,
      breachRiskReduction: 45,
      complianceScore: 55,
      breachCostSavings: {
        risk_reduction_percentage: 45,
        insurance_discount: 5,
        audit_cost_reduction: 15,
      },
    },
    operationalMetrics: {
      adminEffort: 35, // High maintenance
      automationLevel: 25,
      deploymentTime: 120,
      maintenanceOverhead: 50,
    },
    compliance: {
      frameworks: ["ISO27001"],
      coverage_percentage: {
        ISO27001: 55,
      },
      automated_reporting: false,
    },
  },
  foxpass: {
    id: "foxpass",
    name: "Foxpass",
    category: "cloud_native",
    pricing: {
      perDevice: {
        base: 30,
        volume_discount: 0.05,
        enterprise_discount: 0.1,
      },
      implementation: {
        base_cost: 2000,
        per_device: 1,
        consulting_days: 3,
        training_cost: 1000,
      },
      annual_support: {
        percentage: 0.1,
        minimum: 2000,
      },
      infrastructure: {
        hardware_required: false,
        server_cost: 0,
        storage_cost: 0,
        network_cost: 0,
      },
    },
    security: {
      zeroTrustScore: 60,
      breachRiskReduction: 35,
      complianceScore: 45,
      breachCostSavings: {
        risk_reduction_percentage: 35,
        insurance_discount: 3,
        audit_cost_reduction: 10,
      },
    },
    operationalMetrics: {
      adminEffort: 8,
      automationLevel: 40,
      deploymentTime: 5,
      maintenanceOverhead: 5,
    },
    compliance: {
      frameworks: ["HIPAA"],
      coverage_percentage: {
        HIPAA: 30,
      },
      automated_reporting: false,
    },
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    category: "cloud_native",
    pricing: {
      perDevice: {
        base: 45,
        volume_discount: 0.08,
        enterprise_discount: 0.15,
      },
      implementation: {
        base_cost: 5000,
        per_device: 2,
        consulting_days: 5,
        training_cost: 1500,
      },
      annual_support: {
        percentage: 0.12,
        minimum: 3000,
      },
      infrastructure: {
        hardware_required: false,
        server_cost: 0,
        storage_cost: 0,
        network_cost: 0,
      },
    },
    security: {
      zeroTrustScore: 68,
      breachRiskReduction: 40,
      complianceScore: 50,
      breachCostSavings: {
        risk_reduction_percentage: 40,
        insurance_discount: 5,
        audit_cost_reduction: 12,
      },
    },
    operationalMetrics: {
      adminEffort: 6,
      automationLevel: 45,
      deploymentTime: 10,
      maintenanceOverhead: 8,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI-DSS"],
      coverage_percentage: {
        HIPAA: 40,
        "PCI-DSS": 45,
      },
      automated_reporting: false,
    },
  },
  radiusaas: {
    id: "radiusaas",
    name: "RADIUS-as-a-Service",
    category: "cloud_native",
    pricing: {
      perDevice: {
        base: 22,
        volume_discount: 0.05,
        enterprise_discount: 0.1,
      },
      implementation: {
        base_cost: 1000,
        per_device: 0.5,
        consulting_days: 2,
        training_cost: 500,
      },
      annual_support: {
        percentage: 0.08,
        minimum: 1000,
      },
      infrastructure: {
        hardware_required: false,
        server_cost: 0,
        storage_cost: 0,
        network_cost: 0,
      },
    },
    security: {
      zeroTrustScore: 55,
      breachRiskReduction: 25,
      complianceScore: 35,
      breachCostSavings: {
        risk_reduction_percentage: 25,
        insurance_discount: 2,
        audit_cost_reduction: 5,
      },
    },
    operationalMetrics: {
      adminEffort: 4,
      automationLevel: 30,
      deploymentTime: 2,
      maintenanceOverhead: 3,
    },
    compliance: {
      frameworks: ["HIPAA"],
      coverage_percentage: {
        HIPAA: 20,
      },
      automated_reporting: false,
    },
  },
  arista: {
    id: "arista",
    name: "Arista AGNI",
    category: "cloud_native",
    pricing: {
      perDevice: {
        base: 90,
        volume_discount: 0.12,
        enterprise_discount: 0.2,
      },
      implementation: {
        base_cost: 30000,
        per_device: 10,
        consulting_days: 18,
        training_cost: 8000,
      },
      annual_support: {
        percentage: 0.18,
        minimum: 15000,
      },
      infrastructure: {
        hardware_required: false,
        server_cost: 0,
        storage_cost: 0,
        network_cost: 5000,
      },
    },
    security: {
      zeroTrustScore: 85,
      breachRiskReduction: 72,
      complianceScore: 78,
      breachCostSavings: {
        risk_reduction_percentage: 72,
        insurance_discount: 15,
        audit_cost_reduction: 35,
      },
    },
    operationalMetrics: {
      adminEffort: 10,
      automationLevel: 68,
      deploymentTime: 25,
      maintenanceOverhead: 12,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI-DSS", "ISO27001", "NIST"],
      coverage_percentage: {
        HIPAA: 78,
        "PCI-DSS": 80,
        ISO27001: 76,
        NIST: 82,
      },
      automated_reporting: true,
    },
  },
}

// Industry-specific factors
export const industryFactors = {
  healthcare: {
    complianceMultiplier: 1.5,
    riskMultiplier: 2.0,
    downtimeMultiplier: 3.0,
    regulatoryPressure: "high",
    averageBreachCost: 10930000,
    requiredFrameworks: ["HIPAA", "PCI-DSS", "ISO27001"],
  },
  financial_services: {
    complianceMultiplier: 1.8,
    riskMultiplier: 2.5,
    downtimeMultiplier: 4.0,
    regulatoryPressure: "very_high",
    averageBreachCost: 5850000,
    requiredFrameworks: ["PCI-DSS", "SOX", "GDPR", "ISO27001"],
  },
  retail: {
    complianceMultiplier: 1.2,
    riskMultiplier: 1.5,
    downtimeMultiplier: 2.0,
    regulatoryPressure: "medium",
    averageBreachCost: 3280000,
    requiredFrameworks: ["PCI-DSS", "GDPR"],
  },
  manufacturing: {
    complianceMultiplier: 1.0,
    riskMultiplier: 1.8,
    downtimeMultiplier: 2.5,
    regulatoryPressure: "medium",
    averageBreachCost: 4990000,
    requiredFrameworks: ["ISO27001", "NIST"],
  },
  education: {
    complianceMultiplier: 0.8,
    riskMultiplier: 1.2,
    downtimeMultiplier: 1.5,
    regulatoryPressure: "low",
    averageBreachCost: 3790000,
    requiredFrameworks: ["FERPA", "ISO27001"],
  },
  government: {
    complianceMultiplier: 2.0,
    riskMultiplier: 3.0,
    downtimeMultiplier: 5.0,
    regulatoryPressure: "critical",
    averageBreachCost: 4910000,
    requiredFrameworks: ["FedRAMP", "NIST", "ISO27001"],
  },
  technology: {
    complianceMultiplier: 1.1,
    riskMultiplier: 1.6,
    downtimeMultiplier: 2.2,
    regulatoryPressure: "medium",
    averageBreachCost: 5040000,
    requiredFrameworks: ["ISO27001", "SOC2"],
  },
  energy_utilities: {
    complianceMultiplier: 1.6,
    riskMultiplier: 2.2,
    downtimeMultiplier: 3.5,
    regulatoryPressure: "high",
    averageBreachCost: 6720000,
    requiredFrameworks: ["NERC-CIP", "ISO27001", "NIST"],
  },
}

// Organization size templates
export const organizationSizes = {
  small: { devices: [100, 500], users: [200, 1000], sites: [1, 3] },
  medium: { devices: [500, 2500], users: [1000, 5000], sites: [3, 10] },
  large: { devices: [2500, 10000], users: [5000, 20000], sites: [10, 50] },
  enterprise: { devices: [10000, 50000], users: [20000, 100000], sites: [50, 200] },
}

// Calculate device pricing with volume discounts
function calculateDevicePricing(vendor: EnhancedVendorData, devices: number): number {
  let basePrice = vendor.pricing.perDevice.base

  // Apply volume discounts
  if (devices >= 10000) {
    basePrice *= 1 - vendor.pricing.perDevice.enterprise_discount
  } else if (devices >= 2500) {
    basePrice *= 1 - vendor.pricing.perDevice.volume_discount
  }

  return basePrice * devices
}

// Calculate implementation costs
function calculateImplementationCostsLegacy(vendor: EnhancedVendorData, devices: number, industry: string): number {
  const industryFactor = industryFactors[industry]?.complianceMultiplier || 1.0

  const baseCost = vendor.pricing.implementation.base_cost
  const perDeviceCost = vendor.pricing.implementation.per_device * devices
  const consultingCost = vendor.pricing.implementation.consulting_days * 1500 * industryFactor
  const trainingCost = vendor.pricing.implementation.training_cost * industryFactor

  return baseCost + perDeviceCost + consultingCost + trainingCost
}

// Calculate infrastructure costs
function calculateInfrastructureCosts(vendor: EnhancedVendorData, devices: number): number {
  if (!vendor.pricing.infrastructure.hardware_required) {
    return vendor.pricing.infrastructure.network_cost
  }

  const serverCost = vendor.pricing.infrastructure.server_cost
  const storageCost = vendor.pricing.infrastructure.storage_cost
  const networkCost = vendor.pricing.infrastructure.network_cost

  // Scale infrastructure costs based on device count
  const scaleFactor = Math.max(1, Math.ceil(devices / 5000))

  return (serverCost + storageCost + networkCost) * scaleFactor
}

// Calculate annual operational costs
function calculateAnnualOperationalCosts(vendor: EnhancedVendorData, devices: number, industry: string): number {
  const devicePricing = calculateDevicePricing(vendor, devices)
  const supportCost = Math.max(
    devicePricing * vendor.pricing.annual_support.percentage,
    vendor.pricing.annual_support.minimum,
  )

  // Admin effort costs
  const adminHours = vendor.operationalMetrics.adminEffort * (devices / 1000) * 52 // weekly hours * weeks
  const adminCost = adminHours * 75 // $75/hour for admin time

  // Maintenance costs
  const maintenanceCost = vendor.operationalMetrics.maintenanceOverhead * 12 * 100 // monthly hours * hourly rate

  const industryFactor = industryFactors[industry]?.complianceMultiplier || 1.0

  return (supportCost + adminCost + maintenanceCost) * industryFactor
}

// Calculate risk reduction benefits
function calculateRiskReductionBenefits(vendor: EnhancedVendorData, devices: number, industry: string): number {
  const industryData = industryFactors[industry]
  if (!industryData) return 0

  const averageBreachCost = industryData.averageBreachCost
  const breachProbability = 0.28 // 28% annual probability without NAC
  const riskReduction = vendor.security.breachCostSavings.risk_reduction_percentage / 100

  return averageBreachCost * breachProbability * riskReduction
}

// Calculate compliance benefits
function calculateComplianceBenefits(vendor: EnhancedVendorData, devices: number, industry: string): number {
  const industryData = industryFactors[industry]
  if (!industryData) return 0

  // Audit cost reduction
  const baseAuditCost = devices * 50 // $50 per device for audit
  const auditReduction = vendor.security.breachCostSavings.audit_cost_reduction / 100
  const auditSavings = baseAuditCost * auditReduction

  // Insurance premium reduction
  const baseInsurancePremium = devices * 25 // $25 per device for cyber insurance
  const insuranceDiscount = vendor.security.breachCostSavings.insurance_discount / 100
  const insuranceSavings = baseInsurancePremium * insuranceDiscount

  return auditSavings + insuranceSavings
}

// Calculate operational efficiency benefits
function calculateOperationalBenefits(vendor: EnhancedVendorData, devices: number): number {
  // Automation savings
  const automationLevel = vendor.operationalMetrics.automationLevel / 100
  const manualTaskReduction = devices * 2 * automationLevel // $2 per device per % automation

  // Reduced admin effort (compared to 40 hours/week baseline)
  const baselineAdminHours = 40 * (devices / 1000) * 52
  const actualAdminHours = vendor.operationalMetrics.adminEffort * (devices / 1000) * 52
  const adminSavings = (baselineAdminHours - actualAdminHours) * 75

  return manualTaskReduction + Math.max(0, adminSavings)
}

// Main TCO calculation function
export function calculateTotalCostOfOwnership(
  vendor: EnhancedVendorData,
  devices: number,
  years = 3,
  includeInfrastructure = true,
  industry = "technology",
): {
  year1: number
  year2: number
  year3: number
  year5: number
  breakdown: {
    software: number[]
    implementation: number[]
    infrastructure: number[]
    operations: number[]
    support: number[]
  }
  benefits: {
    riskReduction: number[]
    compliance: number[]
    operational: number[]
    total: number[]
  }
  netTCO: number[]
} {
  // Calculate base costs
  const softwareCost = calculateDevicePricing(vendor, devices)
  const implementationCost = calculateImplementationCostsLegacy(vendor, devices, industry)
  const infrastructureCost = includeInfrastructure ? calculateInfrastructureCosts(vendor, devices) : 0
  const annualOperationalCost = calculateAnnualOperationalCosts(vendor, devices, industry)

  // Calculate annual benefits
  const annualRiskReduction = calculateRiskReductionBenefits(vendor, devices, industry)
  const annualComplianceBenefits = calculateComplianceBenefits(vendor, devices, industry)
  const annualOperationalBenefits = calculateOperationalBenefits(vendor, devices)

  // Build year-by-year breakdown
  const breakdown = {
    software: [softwareCost],
    implementation: [implementationCost],
    infrastructure: [infrastructureCost],
    operations: [annualOperationalCost],
    support: [annualOperationalCost * 0.3], // Support is part of operational
  }

  const benefits = {
    riskReduction: [annualRiskReduction],
    compliance: [annualComplianceBenefits],
    operational: [annualOperationalBenefits],
    total: [annualRiskReduction + annualComplianceBenefits + annualOperationalBenefits],
  }

  // Calculate costs for additional years
  for (let year = 2; year <= Math.max(years, 5); year++) {
    breakdown.software.push(softwareCost) // Annual software cost
    breakdown.implementation.push(0) // One-time cost
    breakdown.infrastructure.push(infrastructureCost * 0.1) // 10% annual infrastructure refresh
    breakdown.operations.push(annualOperationalCost)
    breakdown.support.push(annualOperationalCost * 0.3)

    benefits.riskReduction.push(annualRiskReduction)
    benefits.compliance.push(annualComplianceBenefits)
    benefits.operational.push(annualOperationalBenefits)
    benefits.total.push(annualRiskReduction + annualComplianceBenefits + annualOperationalBenefits)
  }

  // Calculate cumulative costs
  const year1Total = softwareCost + implementationCost + infrastructureCost + annualOperationalCost
  const year2Total = year1Total + softwareCost + annualOperationalCost + infrastructureCost * 0.1
  const year3Total = year2Total + softwareCost + annualOperationalCost + infrastructureCost * 0.1
  const year5Total = year3Total + (softwareCost + annualOperationalCost + infrastructureCost * 0.1) * 2

  // Calculate net TCO (costs minus benefits)
  const netTCO = [
    year1Total - benefits.total[0],
    year2Total - (benefits.total[0] + benefits.total[1]),
    year3Total - (benefits.total[0] + benefits.total[1] + benefits.total[2]),
    0, // Year 4 placeholder
    year5Total - benefits.total.slice(0, 5).reduce((sum, benefit) => sum + benefit, 0),
  ]

  return {
    year1: year1Total,
    year2: year2Total,
    year3: year3Total,
    year5: year5Total,
    breakdown,
    benefits,
    netTCO,
  }
}

// Calculate full TCO for a specific vendor
export function calculateFullTCOForVendorLegacy(
  vendorId: string,
  orgConfig: {
    devices: number
    users: number
    industry: string
    region: string
  },
  analysisConfig: {
    years: number
  },
  pricingConfig?: {
    portnoxBasePrice: number
    portnoxAddons: any
  },
) {
  const vendor = enhancedVendorDatabase[vendorId]
  if (!vendor) {
    console.warn(`Vendor '${vendorId}' not found in database. Available vendors:`, Object.keys(enhancedVendorDatabase))
    // Return fallback data structure
    return {
      vendor: vendorId,
      vendorName: `Unknown Vendor (${vendorId})`,
      total: 0,
      year1: 0,
      year2: 0,
      year3: 0,
      year5: 0,
      breakdown: {
        software: [0],
        implementation: [0],
        infrastructure: [0],
        operations: [0],
        support: [0],
      },
      benefits: {
        riskReduction: [0],
        compliance: [0],
        operational: [0],
        total: [0],
      },
      netTCO: [0, 0, 0, 0, 0],
      roi: {
        percentage: 0,
        paybackMonths: 0,
      },
      licensing: 0,
      implementation: 0,
      operations: 0,
    }
  }

  const tcoResult = calculateTotalCostOfOwnership(
    vendor,
    orgConfig.devices,
    analysisConfig.years,
    true,
    orgConfig.industry,
  )

  // Calculate ROI metrics
  const totalBenefits = tcoResult.benefits.total.reduce((sum, benefit) => sum + benefit, 0)
  const totalCosts = tcoResult.year3 // Use 3-year total as baseline
  const roiPercentage = totalCosts > 0 ? ((totalBenefits - totalCosts) / totalCosts) * 100 : 0
  const paybackMonths = totalBenefits > 0 ? Math.max(1, (totalCosts / totalBenefits) * 12) : 12

  return {
    vendor: vendorId,
    vendorName: vendor.name,
    total: tcoResult.year3,
    year1: tcoResult.year1,
    year2: tcoResult.year2,
    year3: tcoResult.year3,
    year5: tcoResult.year5,
    breakdown: tcoResult.breakdown,
    benefits: tcoResult.benefits,
    netTCO: tcoResult.netTCO,
    roi: {
      percentage: roiPercentage,
      paybackMonths: Math.round(paybackMonths),
    },
    licensing: tcoResult.breakdown.software[0],
    implementation: tcoResult.breakdown.implementation[0],
    operations: tcoResult.breakdown.operations[0],
  }
}

// Compare multiple vendors
export function compareMultipleVendorsTCOLegacy(
  vendorIds: string[],
  orgConfig: {
    devices: number
    users: number
    industry: string
    region: string
  },
  analysisConfig: {
    years: number
  },
  pricingConfig?: {
    portnoxBasePrice: number
    portnoxAddons: any
  },
) {
  const results = []

  vendorIds.forEach((vendorId) => {
    try {
      const result = calculateFullTCOForVendorLegacy(vendorId, orgConfig, analysisConfig, pricingConfig)
      results.push(result)
    } catch (error) {
      console.error(`Error calculating TCO for vendor ${vendorId}:`, error)
      // Add fallback result
      results.push({
        vendor: vendorId,
        vendorName: `Error: ${vendorId}`,
        total: 0,
        year1: 0,
        year2: 0,
        year3: 0,
        year5: 0,
        breakdown: {
          software: [0],
          implementation: [0],
          infrastructure: [0],
          operations: [0],
          support: [0],
        },
        benefits: {
          riskReduction: [0],
          compliance: [0],
          operational: [0],
          total: [0],
        },
        netTCO: [0, 0, 0, 0, 0],
        roi: {
          percentage: 0,
          paybackMonths: 0,
        },
        licensing: 0,
        implementation: 0,
        operations: 0,
      })
    }
  })

  return results
}

// Get vendor recommendations based on organization profile
export function getVendorRecommendations(
  orgConfig: {
    devices: number
    users: number
    industry: string
    region: string
  },
  priorities: string[] = ["cost", "security", "compliance"],
): string[] {
  const vendorScores = {}

  Object.entries(enhancedVendorDatabase).forEach(([vendorId, vendor]) => {
    let score = 0

    // Cost efficiency (lower is better)
    const tco = calculateFullTCOForVendorLegacy(vendorId, orgConfig, { years: 3 })
    const costScore = Math.max(0, 100 - tco.year3 / 1000) // Normalize cost score

    // Security score
    const securityScore = vendor.security.zeroTrustScore

    // Compliance score
    const complianceScore = vendor.security.complianceScore

    // Operational efficiency
    const operationalScore = vendor.operationalMetrics.automationLevel

    // Weight scores based on priorities
    if (priorities.includes("cost")) score += costScore * 0.3
    if (priorities.includes("security")) score += securityScore * 0.3
    if (priorities.includes("compliance")) score += complianceScore * 0.2
    if (priorities.includes("operational")) score += operationalScore * 0.2

    vendorScores[vendorId] = score
  })

  // Sort by score and return top recommendations
  return Object.entries(vendorScores)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(([vendorId]) => vendorId)
}

import type { VendorId, NewVendorData } from "@/lib/vendors/data"
import { getVendorDataById } from "@/lib/vendors/data"
import type { OrgSizeId, IndustryId } from "@/types/common"

// Organization size configurations
export const ORG_SIZE_CONFIGS = {
  small_business: { devices: 250, users: 150, sites: 2 },
  mid_market: { devices: 1500, users: 800, sites: 5 },
  enterprise: { devices: 7500, users: 4000, sites: 15 },
  global_enterprise: { devices: 25000, users: 15000, sites: 50 },
} as const

// Industry risk and compliance factors
export const INDUSTRY_FACTORS = {
  healthcare: {
    riskMultiplier: 2.2,
    complianceMultiplier: 1.8,
    breachCostAverage: 10930000,
    regulatoryPressure: "critical",
  },
  financial_services: {
    riskMultiplier: 2.5,
    complianceMultiplier: 2.0,
    breachCostAverage: 5850000,
    regulatoryPressure: "critical",
  },
  manufacturing: {
    riskMultiplier: 1.8,
    complianceMultiplier: 1.3,
    breachCostAverage: 4990000,
    regulatoryPressure: "high",
  },
  retail: {
    riskMultiplier: 1.5,
    complianceMultiplier: 1.2,
    breachCostAverage: 3280000,
    regulatoryPressure: "medium",
  },
  technology: {
    riskMultiplier: 1.6,
    complianceMultiplier: 1.1,
    breachCostAverage: 5040000,
    regulatoryPressure: "medium",
  },
  education: {
    riskMultiplier: 1.2,
    complianceMultiplier: 0.9,
    breachCostAverage: 3790000,
    regulatoryPressure: "low",
  },
  government: {
    riskMultiplier: 3.0,
    complianceMultiplier: 2.2,
    breachCostAverage: 4910000,
    regulatoryPressure: "critical",
  },
  energy_utilities: {
    riskMultiplier: 2.8,
    complianceMultiplier: 1.9,
    breachCostAverage: 6720000,
    regulatoryPressure: "critical",
  },
} as const

export interface TCOResultBreakdown {
  software: number
  hardware: number
  implementation: number
  operational: number
  support: number
  hidden: number
}

export interface ROIMetrics {
  paybackPeriodMonths: number
  netPresentValue: number
  internalRateOfReturn: number
  totalBenefits: number
  benefitCostRatio: number
}

export interface TCOResult {
  vendorId: VendorId
  vendorName: string
  totalTCO: number
  breakdown: TCOResultBreakdown
  roiMetrics: ROIMetrics
  riskReduction: {
    breachProbabilityReduction: number
    expectedAnnualLoss: number
    riskAdjustedSavings: number
  }
  complianceMetrics: {
    coverageScore: number
    automationLevel: number
    auditReadiness: number
  }
  operationalMetrics: {
    fteReduction: number
    efficiencyGains: number
    maintenanceReduction: number
  }
}

function calculateLicensingCosts(vendor: NewVendorData, orgSize: OrgSizeId, projectionYears: number): number {
  const orgConfig = ORG_SIZE_CONFIGS[orgSize]
  const devices = orgConfig.devices
  const users = orgConfig.users

  // Find appropriate pricing tier
  let monthlyPrice = 0
  let annualDiscount = 0

  if (vendor.pricingTiers) {
    for (const tier of vendor.pricingTiers) {
      if (tier.orgSizeTarget?.includes(orgSize)) {
        monthlyPrice = tier.pricePerDevicePerMonth || 0
        annualDiscount = tier.annualDiscountPercent || 0
        break
      }
      if (tier.userRange) {
        const [min, max] = tier.userRange
        if (users >= min && (max === null || users <= max)) {
          monthlyPrice = tier.pricePerUserPerMonth || 0
          annualDiscount = tier.annualDiscountPercent || 0
          break
        }
      }
    }
  }

  const annualCost = monthlyPrice * devices * 12 * (1 - annualDiscount / 100)
  return annualCost * projectionYears
}

function calculateImplementationCostsNew(vendor: NewVendorData, orgSize: OrgSizeId, industry: IndustryId): number {
  const orgConfig = ORG_SIZE_CONFIGS[orgSize]
  const industryFactor = INDUSTRY_FACTORS[industry]

  const baseCost = vendor.tcoFactors.licensingCostPerYear * 0.3 // 30% of annual licensing
  const professionalServices = baseCost * vendor.implementation.professionalServicesCostFactor
  const training = vendor.tcoFactors.trainingCostInitial * industryFactor.complianceMultiplier

  return baseCost + professionalServices + training
}

function calculateOperationalCosts(
  vendor: NewVendorData,
  orgSize: OrgSizeId,
  industry: IndustryId,
  projectionYears: number,
): number {
  const orgConfig = ORG_SIZE_CONFIGS[orgSize]
  const industryFactor = INDUSTRY_FACTORS[industry]

  // Personnel costs
  const avgSalary = 120000
  const fteRequired = vendor.tcoFactors.personnelCostFactor
  const annualPersonnelCost = fteRequired * avgSalary * industryFactor.complianceMultiplier

  // Support and maintenance
  const annualSupportCost = vendor.tcoFactors.licensingCostPerYear * vendor.tcoFactors.supportCostFactor

  // Hardware refresh and maintenance
  const annualHardwareCost = vendor.tcoFactors.hardwareCostPerYear

  return (annualPersonnelCost + annualSupportCost + annualHardwareCost) * projectionYears
}

function calculateHiddenCosts(
  vendor: NewVendorData,
  orgSize: OrgSizeId,
  industry: IndustryId,
  projectionYears: number,
): number {
  const orgConfig = ORG_SIZE_CONFIGS[orgSize]
  const industryFactor = INDUSTRY_FACTORS[industry]

  // Downtime costs during implementation
  const downtimeHours = vendor.implementation.averageDeploymentTimeDays * 0.5 // Half day downtime per deployment day
  const downtimeCostPerHour = 5000 * industryFactor.riskMultiplier
  const downtimeCost = downtimeHours * downtimeCostPerHour

  // Integration complexity costs
  const integrationCost = (vendor.tcoFactors.licensingCostPerYear * vendor.tcoFactors.hiddenCostFactor) / 100

  // Opportunity costs
  const opportunityCost = vendor.implementation.averageDeploymentTimeDays * 1000 // $1000 per day delay

  return (downtimeCost + integrationCost + opportunityCost) * (projectionYears / 3)
}

function calculateROIMetrics(
  vendor: NewVendorData,
  totalCosts: number,
  orgSize: OrgSizeId,
  industry: IndustryId,
  projectionYears: number,
): ROIMetrics {
  const orgConfig = ORG_SIZE_CONFIGS[orgSize]
  const industryFactor = INDUSTRY_FACTORS[industry]

  // Risk reduction benefits
  const breachProbabilityReduction = vendor.roiFactors.incidentReductionPercent / 100
  const expectedAnnualLoss = industryFactor.breachCostAverage * 0.28 // 28% annual breach probability
  const riskReductionBenefit = expectedAnnualLoss * breachProbabilityReduction * projectionYears

  // Operational efficiency benefits
  const operationalSavings =
    ((orgConfig.devices * 50 * vendor.roiFactors.operationalEfficiencyGainPercent) / 100) * projectionYears

  // Compliance automation benefits
  const complianceSavings =
    orgConfig.devices * 25 * vendor.roiFactors.complianceAutomationSavingsFactor * projectionYears

  const totalBenefits = riskReductionBenefit + operationalSavings + complianceSavings
  const netPresentValue = totalBenefits - totalCosts
  const benefitCostRatio = totalCosts > 0 ? totalBenefits / totalCosts : 0
  const paybackPeriodMonths =
    vendor.roiFactors.avgPaybackPeriodMonths ||
    (totalBenefits > 0 ? Math.max(1, (totalCosts / totalBenefits) * 12) : 36)

  return {
    paybackPeriodMonths,
    netPresentValue,
    internalRateOfReturn: benefitCostRatio > 1 ? (benefitCostRatio - 1) * 100 : 0,
    totalBenefits,
    benefitCostRatio,
  }
}

export function calculateFullTCOForVendorNew(
  vendorId: VendorId,
  orgSizeId: OrgSizeId,
  industryId: IndustryId,
  projectionYears: number,
): TCOResult | null {
  const vendor = getVendorDataById(vendorId)
  if (!vendor) {
    console.warn(`Vendor ${vendorId} not found`)
    return null
  }

  const orgConfig = ORG_SIZE_CONFIGS[orgSizeId]
  const industryFactor = INDUSTRY_FACTORS[industryId]

  // Calculate cost components
  const softwareCosts = calculateLicensingCosts(vendor, orgSizeId, projectionYears)
  const hardwareCosts = vendor.tcoFactors.hardwareCostPerYear * projectionYears
  const implementationCosts = calculateImplementationCostsNew(vendor, orgSizeId, industryId)
  const operationalCosts = calculateOperationalCosts(vendor, orgSizeId, industryId, projectionYears)
  const supportCosts = softwareCosts * vendor.tcoFactors.supportCostFactor
  const hiddenCosts = calculateHiddenCosts(vendor, orgSizeId, industryId, projectionYears)

  const breakdown: TCOResultBreakdown = {
    software: softwareCosts,
    hardware: hardwareCosts,
    implementation: implementationCosts,
    operational: operationalCosts,
    support: supportCosts,
    hidden: hiddenCosts,
  }

  const totalTCO = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0)

  // Calculate ROI metrics
  const roiMetrics = calculateROIMetrics(vendor, totalTCO, orgSizeId, industryId, projectionYears)

  // Risk reduction metrics
  const breachProbabilityReduction = vendor.roiFactors.incidentReductionPercent
  const expectedAnnualLoss = industryFactor.breachCostAverage * 0.28
  const riskAdjustedSavings = expectedAnnualLoss * (breachProbabilityReduction / 100) * projectionYears

  // Compliance metrics
  const avgComplianceCoverage =
    vendor.complianceSupport.reduce((sum, comp) => sum + comp.coveragePercent, 0) / vendor.complianceSupport.length

  // Operational metrics
  const fteReduction = 2.0 - vendor.tcoFactors.personnelCostFactor // Baseline 2.0 FTE
  const efficiencyGains = vendor.roiFactors.operationalEfficiencyGainPercent
  const maintenanceReduction =
    vendor.implementation.complexityLevel === "low" ? 80 : vendor.implementation.complexityLevel === "medium" ? 60 : 40

  return {
    vendorId,
    vendorName: vendor.name,
    totalTCO,
    breakdown,
    roiMetrics,
    riskReduction: {
      breachProbabilityReduction,
      expectedAnnualLoss,
      riskAdjustedSavings,
    },
    complianceMetrics: {
      coverageScore: avgComplianceCoverage,
      automationLevel: vendor.roiFactors.complianceAutomationSavingsFactor * 100,
      auditReadiness: avgComplianceCoverage * 0.9,
    },
    operationalMetrics: {
      fteReduction,
      efficiencyGains,
      maintenanceReduction,
    },
  }
}

export function compareMultipleVendorsTCO(
  vendorIds: VendorId[],
  orgSizeId: OrgSizeId,
  industryId: IndustryId,
  projectionYears: number,
): TCOResult[] {
  const results: TCOResult[] = []

  for (const vendorId of vendorIds) {
    const result = calculateFullTCOForVendorNew(vendorId, orgSizeId, industryId, projectionYears)
    if (result) {
      results.push(result)
    }
  }

  // Sort by total TCO (ascending)
  return results.sort((a, b) => a.totalTCO - b.totalTCO)
}
