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

// Enhanced vendor database
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
function calculateImplementationCosts(vendor: EnhancedVendorData, devices: number, industry: string): number {
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
  const implementationCost = calculateImplementationCosts(vendor, devices, industry)
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
export function calculateFullTCOForVendor(
  vendorId: string,
  orgSize: { devices: number; users: number; sites: number },
  industry = "technology",
  years = 3,
) {
  const vendor = enhancedVendorDatabase[vendorId]
  if (!vendor) {
    throw new Error(`Missing data for vendor '${vendorId}' or org size '${JSON.stringify(orgSize)}'`)
  }

  return calculateTotalCostOfOwnership(vendor, orgSize.devices, years, true, industry)
}

// Compare multiple vendors
export function compareMultipleVendorsTCO(
  vendorIds: string[],
  orgSize: { devices: number; users: number; sites: number },
  industry = "technology",
  years = 3,
) {
  const results = {}

  vendorIds.forEach((vendorId) => {
    try {
      results[vendorId] = calculateFullTCOForVendor(vendorId, orgSize, industry, years)
    } catch (error) {
      console.error(`Error calculating TCO for vendor ${vendorId}:`, error)
      // Provide fallback data
      results[vendorId] = {
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
      }
    }
  })

  return results
}

// Get vendor recommendations based on organization profile
export function getVendorRecommendations(
  orgSize: { devices: number; users: number; sites: number },
  industry: string,
  priorities: string[] = ["cost", "security", "compliance"],
): string[] {
  const vendorScores = {}

  Object.entries(enhancedVendorDatabase).forEach(([vendorId, vendor]) => {
    let score = 0

    // Cost efficiency (lower is better)
    const tco = calculateFullTCOForVendor(vendorId, orgSize, industry, 3)
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
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([vendorId]) => vendorId)
}
