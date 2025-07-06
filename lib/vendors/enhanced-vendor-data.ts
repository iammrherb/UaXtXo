// lib/vendors/enhanced-vendor-data.ts

export interface VendorPricing {
  perDevice: {
    base: number
    volumeDiscounts: {
      500: number
      1000: number
      5000: number
      10000: number
    }
  }
  licensing: {
    model: "perpetual" | "subscription" | "hybrid" | "freemium"
    subscriptionTiers?: {
      basic: number
      professional: number
      enterprise: number
    }
    perpetualCost?: number
    annualMaintenance?: number
  }
  addOns: {
    name: string
    description: string
    cost: number
    required: boolean
  }[]
  integrations: {
    name: string
    type: "native" | "api" | "third-party"
    cost: number
    complexity: "low" | "medium" | "high"
  }[]
  support: {
    basic: {
      included: boolean
      cost: number
      coverage: string
    }
    premium: {
      cost: number
      coverage: string
      sla: string
    }
    enterprise: {
      cost: number
      coverage: string
      sla: string
      dedicatedTAM: boolean
    }
  }
  professionalServices: {
    implementation: {
      small: number // <1000 devices
      medium: number // 1000-5000 devices
      large: number // >5000 devices
    }
    training: {
      onsite: number
      virtual: number
      certification: number
    }
    customization: number // per hour
  }
  hardware: {
    required: boolean
    appliances?: {
      name: string
      capacity: number
      cost: number
      redundancy: boolean
    }[]
    virtualAppliance?: {
      cost: number
      requirements: string
    }
  }
  infrastructure: {
    serverRequirements: {
      cpu: string
      ram: string
      storage: string
      cost: number
    }
    databaseLicense?: number
    loadBalancer?: number
    backup?: number
  }
}

export interface SecurityMetrics {
  zeroTrustScore: number // 0-100
  riskReduction: {
    unauthorized_access: number
    lateral_movement: number
    data_breach: number
    insider_threat: number
    compliance_violation: number
  }
  breachCostSavings: {
    average_breach_cost: number
    reduction_percentage: number
    insurance_discount: number
  }
  securityFeatures: {
    mfa: boolean
    continuous_verification: boolean
    micro_segmentation: boolean
    behavior_analytics: boolean
    threat_intelligence: boolean
    automated_response: boolean
  }
  complianceMapping: {
    framework: string
    controls: string[]
    coverage: number
  }[]
}

export interface OperationalMetrics {
  adminEffort: number // hours per week per 1000 devices
  automationLevel: number // 0-100
  reportingCapabilities: "basic" | "advanced" | "enterprise"
  apiAvailability: boolean
  cloudManagement: boolean
  maintenanceWindows: number // hours per month
  upgradeComplexity: "low" | "medium" | "high" | "very high"
  troubleshootingTime: number // average hours to resolve issues
  staffingRequirements: {
    administrators: number // per 10k devices
    specialists: number // per 10k devices
    trainingDays: number // annual training days required
  }
  operationalCosts: {
    monthlyMaintenance: number // per device
    incidentResponse: number // cost per incident
    changeManagement: number // cost per change
    monitoring: number // monthly cost
  }
}

export interface EnhancedVendorData {
  id: string
  name: string
  category: "cloud-native" | "on-premise" | "hybrid" | "legacy"
  marketPosition: "leader" | "challenger" | "visionary" | "niche"
  deploymentModels: ("cloud" | "on-premise" | "hybrid")[]

  pricing: VendorPricing
  security: SecurityMetrics

  scalability: {
    maxDevices: number
    performanceAtScale: "excellent" | "good" | "fair" | "poor"
    clusteringSupport: boolean
    multiSiteSupport: boolean
  }

  implementation: {
    timeToValue: {
      poc: number // days
      small: number
      medium: number
      large: number
    }
    complexity: "low" | "medium" | "high" | "very high"
    requiredExpertise: string[]
    migrationFromExisting: {
      effort: "low" | "medium" | "high"
      downtime: number // hours
      dataLoss: boolean
    }
  }

  operationalMetrics: OperationalMetrics

  vendorStability: {
    yearsInBusiness: number
    financialHealth: "excellent" | "good" | "fair" | "uncertain"
    marketShare: number
    customerBase: number
    acquisitionRisk: "low" | "medium" | "high"
  }
}

// Enhanced vendor database with comprehensive data
export const enhancedVendorDatabase: Record<string, EnhancedVendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    category: "cloud-native",
    marketPosition: "visionary",
    deploymentModels: ["cloud"],

    pricing: {
      perDevice: {
        base: 60,
        volumeDiscounts: {
          500: 54,
          1000: 48,
          5000: 42,
          10000: 36,
        },
      },
      licensing: {
        model: "subscription",
        subscriptionTiers: {
          basic: 45,
          professional: 60,
          enterprise: 75,
        },
      },
      addOns: [
        {
          name: "Risk-Based Access Control",
          description: "Advanced risk scoring and adaptive authentication",
          cost: 12,
          required: false,
        },
        {
          name: "Advanced Threat Detection",
          description: "ML-based anomaly detection",
          cost: 15,
          required: false,
        },
      ],
      integrations: [
        {
          name: "SIEM Integration",
          type: "native",
          cost: 0,
          complexity: "low",
        },
        {
          name: "MDM Integration",
          type: "api",
          cost: 0,
          complexity: "low",
        },
      ],
      support: {
        basic: {
          included: true,
          cost: 0,
          coverage: "8x5 Email/Chat",
        },
        premium: {
          cost: 5000,
          coverage: "24x7 Phone/Email",
          sla: "4 hour response",
        },
        enterprise: {
          cost: 15000,
          coverage: "24x7 All channels",
          sla: "1 hour response",
          dedicatedTAM: true,
        },
      },
      professionalServices: {
        implementation: {
          small: 0,
          medium: 5000,
          large: 15000,
        },
        training: {
          onsite: 2500,
          virtual: 1500,
          certification: 500,
        },
        customization: 250,
      },
      hardware: {
        required: false,
      },
      infrastructure: {
        serverRequirements: {
          cpu: "N/A - Cloud Native",
          ram: "N/A - Cloud Native",
          storage: "N/A - Cloud Native",
          cost: 0,
        },
      },
    },

    security: {
      zeroTrustScore: 95,
      riskReduction: {
        unauthorized_access: 92,
        lateral_movement: 89,
        data_breach: 87,
        insider_threat: 85,
        compliance_violation: 90,
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 85,
        insurance_discount: 25,
      },
      securityFeatures: {
        mfa: true,
        continuous_verification: true,
        micro_segmentation: true,
        behavior_analytics: true,
        threat_intelligence: true,
        automated_response: true,
      },
      complianceMapping: [
        {
          framework: "NIST 800-53",
          controls: ["AC-2", "AC-3", "AC-4", "AC-17", "IA-2", "IA-5"],
          coverage: 92,
        },
        {
          framework: "ISO 27001",
          controls: ["A.9.1", "A.9.2", "A.9.4", "A.13.1"],
          coverage: 88,
        },
        {
          framework: "PCI-DSS",
          controls: ["1.1", "1.2", "2.1", "7.1", "8.1"],
          coverage: 90,
        },
      ],
    },

    scalability: {
      maxDevices: 100000,
      performanceAtScale: "excellent",
      clusteringSupport: true,
      multiSiteSupport: true,
    },

    implementation: {
      timeToValue: {
        poc: 1,
        small: 7,
        medium: 14,
        large: 30,
      },
      complexity: "low",
      requiredExpertise: ["Basic networking", "Cloud services"],
      migrationFromExisting: {
        effort: "low",
        downtime: 0,
        dataLoss: false,
      },
    },

    operationalMetrics: {
      adminEffort: 5,
      automationLevel: 90,
      reportingCapabilities: "enterprise",
      apiAvailability: true,
      cloudManagement: true,
      maintenanceWindows: 2,
      upgradeComplexity: "low",
      troubleshootingTime: 1,
      staffingRequirements: {
        administrators: 1,
        specialists: 0.5,
        trainingDays: 5,
      },
      operationalCosts: {
        monthlyMaintenance: 2,
        incidentResponse: 500,
        changeManagement: 200,
        monitoring: 1000,
      },
    },

    vendorStability: {
      yearsInBusiness: 15,
      financialHealth: "excellent",
      marketShare: 8,
      customerBase: 5000,
      acquisitionRisk: "low",
    },
  },

  cisco_ise: {
    id: "cisco_ise",
    name: "Cisco ISE",
    category: "on-premise",
    marketPosition: "leader",
    deploymentModels: ["on-premise", "hybrid"],

    pricing: {
      perDevice: {
        base: 125,
        volumeDiscounts: {
          500: 118,
          1000: 110,
          5000: 98,
          10000: 85,
        },
      },
      licensing: {
        model: "perpetual",
        perpetualCost: 125,
        annualMaintenance: 22,
      },
      addOns: [
        {
          name: "Plus License",
          description: "Profiling, BYOD, Guest",
          cost: 50,
          required: true,
        },
        {
          name: "Apex License",
          description: "pxGrid, TC-NAC, Device Admin",
          cost: 75,
          required: false,
        },
      ],
      integrations: [
        {
          name: "Cisco DNA Center",
          type: "native",
          cost: 25000,
          complexity: "high",
        },
      ],
      support: {
        basic: {
          included: false,
          cost: 12000,
          coverage: "8x5 TAC",
        },
        premium: {
          cost: 25000,
          coverage: "24x7 TAC",
          sla: "2 hour response",
        },
        enterprise: {
          cost: 50000,
          coverage: "24x7 Priority TAC",
          sla: "30 min response",
          dedicatedTAM: true,
        },
      },
      professionalServices: {
        implementation: {
          small: 25000,
          medium: 50000,
          large: 150000,
        },
        training: {
          onsite: 5000,
          virtual: 3000,
          certification: 1500,
        },
        customization: 350,
      },
      hardware: {
        required: true,
        appliances: [
          {
            name: "ISE-3515",
            capacity: 2000,
            cost: 35000,
            redundancy: true,
          },
          {
            name: "ISE-3595",
            capacity: 10000,
            cost: 95000,
            redundancy: true,
          },
        ],
      },
      infrastructure: {
        serverRequirements: {
          cpu: "16+ cores",
          ram: "64GB minimum",
          storage: "600GB SSD",
          cost: 15000,
        },
        loadBalancer: 25000,
        backup: 10000,
      },
    },

    security: {
      zeroTrustScore: 85,
      riskReduction: {
        unauthorized_access: 88,
        lateral_movement: 85,
        data_breach: 82,
        insider_threat: 80,
        compliance_violation: 87,
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 75,
        insurance_discount: 20,
      },
      securityFeatures: {
        mfa: true,
        continuous_verification: true,
        micro_segmentation: true,
        behavior_analytics: false,
        threat_intelligence: true,
        automated_response: true,
      },
      complianceMapping: [
        {
          framework: "NIST 800-53",
          controls: ["AC-2", "AC-3", "AC-4", "AC-17", "IA-2"],
          coverage: 88,
        },
        {
          framework: "ISO 27001",
          controls: ["A.9.1", "A.9.2", "A.9.4"],
          coverage: 85,
        },
      ],
    },

    scalability: {
      maxDevices: 500000,
      performanceAtScale: "good",
      clusteringSupport: true,
      multiSiteSupport: true,
    },

    implementation: {
      timeToValue: {
        poc: 30,
        small: 60,
        medium: 90,
        large: 180,
      },
      complexity: "very high",
      requiredExpertise: ["Cisco networking", "ISE certification", "PKI", "RADIUS/TACACS+"],
      migrationFromExisting: {
        effort: "high",
        downtime: 8,
        dataLoss: false,
      },
    },

    operationalMetrics: {
      adminEffort: 20,
      automationLevel: 60,
      reportingCapabilities: "enterprise",
      apiAvailability: true,
      cloudManagement: false,
      maintenanceWindows: 8,
      upgradeComplexity: "very high",
      troubleshootingTime: 6,
      staffingRequirements: {
        administrators: 3,
        specialists: 2,
        trainingDays: 20,
      },
      operationalCosts: {
        monthlyMaintenance: 8,
        incidentResponse: 2000,
        changeManagement: 1500,
        monitoring: 3000,
      },
    },

    vendorStability: {
      yearsInBusiness: 40,
      financialHealth: "excellent",
      marketShare: 35,
      customerBase: 50000,
      acquisitionRisk: "low",
    },
  },

  aruba_clearpass: {
    id: "aruba_clearpass",
    name: "Aruba ClearPass",
    category: "hybrid",
    marketPosition: "leader",
    deploymentModels: ["on-premise", "hybrid"],

    pricing: {
      perDevice: {
        base: 95,
        volumeDiscounts: {
          500: 89,
          1000: 82,
          5000: 75,
          10000: 68,
        },
      },
      licensing: {
        model: "perpetual",
        perpetualCost: 95,
        annualMaintenance: 19,
      },
      addOns: [
        {
          name: "OnGuard",
          description: "Endpoint compliance",
          cost: 25,
          required: false,
        },
        {
          name: "Guest Module",
          description: "Guest management",
          cost: 15,
          required: false,
        },
      ],
      integrations: [
        {
          name: "Aruba Central",
          type: "native",
          cost: 0,
          complexity: "low",
        },
      ],
      support: {
        basic: {
          included: false,
          cost: 8000,
          coverage: "8x5 Support",
        },
        premium: {
          cost: 18000,
          coverage: "24x7 Support",
          sla: "4 hour response",
        },
        enterprise: {
          cost: 35000,
          coverage: "24x7 Priority",
          sla: "1 hour response",
          dedicatedTAM: true,
        },
      },
      professionalServices: {
        implementation: {
          small: 15000,
          medium: 35000,
          large: 100000,
        },
        training: {
          onsite: 4000,
          virtual: 2500,
          certification: 1200,
        },
        customization: 300,
      },
      hardware: {
        required: true,
        appliances: [
          {
            name: "C1000",
            capacity: 1000,
            cost: 15000,
            redundancy: true,
          },
          {
            name: "C2000",
            capacity: 5000,
            cost: 45000,
            redundancy: true,
          },
        ],
      },
      infrastructure: {
        serverRequirements: {
          cpu: "8+ cores",
          ram: "32GB minimum",
          storage: "500GB SSD",
          cost: 10000,
        },
        loadBalancer: 15000,
        backup: 8000,
      },
    },

    security: {
      zeroTrustScore: 82,
      riskReduction: {
        unauthorized_access: 85,
        lateral_movement: 82,
        data_breach: 80,
        insider_threat: 78,
        compliance_violation: 84,
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 72,
        insurance_discount: 18,
      },
      securityFeatures: {
        mfa: true,
        continuous_verification: true,
        micro_segmentation: true,
        behavior_analytics: false,
        threat_intelligence: false,
        automated_response: true,
      },
      complianceMapping: [
        {
          framework: "NIST 800-53",
          controls: ["AC-2", "AC-3", "AC-4", "AC-17", "IA-2"],
          coverage: 85,
        },
        {
          framework: "ISO 27001",
          controls: ["A.9.1", "A.9.2", "A.9.4"],
          coverage: 82,
        },
      ],
    },

    scalability: {
      maxDevices: 100000,
      performanceAtScale: "good",
      clusteringSupport: true,
      multiSiteSupport: true,
    },

    implementation: {
      timeToValue: {
        poc: 21,
        small: 45,
        medium: 75,
        large: 150,
      },
      complexity: "high",
      requiredExpertise: ["Aruba networking", "RADIUS", "PKI basics"],
      migrationFromExisting: {
        effort: "medium",
        downtime: 4,
        dataLoss: false,
      },
    },

    operationalMetrics: {
      adminEffort: 15,
      automationLevel: 65,
      reportingCapabilities: "advanced",
      apiAvailability: true,
      cloudManagement: false,
      maintenanceWindows: 6,
      upgradeComplexity: "high",
      troubleshootingTime: 4,
      staffingRequirements: {
        administrators: 2,
        specialists: 1.5,
        trainingDays: 15,
      },
      operationalCosts: {
        monthlyMaintenance: 6,
        incidentResponse: 1500,
        changeManagement: 1000,
        monitoring: 2500,
      },
    },

    vendorStability: {
      yearsInBusiness: 20,
      financialHealth: "excellent",
      marketShare: 22,
      customerBase: 30000,
      acquisitionRisk: "low",
    },
  },

  juniper_mist: {
    id: "juniper_mist",
    name: "Juniper Mist Access Assurance",
    category: "cloud-native",
    marketPosition: "challenger",
    deploymentModels: ["cloud"],

    pricing: {
      perDevice: {
        base: 72,
        volumeDiscounts: {
          500: 68,
          1000: 62,
          5000: 56,
          10000: 48,
        },
      },
      licensing: {
        model: "subscription",
        subscriptionTiers: {
          basic: 60,
          professional: 72,
          enterprise: 84,
        },
      },
      addOns: [
        {
          name: "AI-Driven Insights",
          description: "Advanced AI/ML analytics",
          cost: 18,
          required: false,
        },
      ],
      integrations: [
        {
          name: "Marvis AI",
          type: "native",
          cost: 0,
          complexity: "low",
        },
      ],
      support: {
        basic: {
          included: true,
          cost: 0,
          coverage: "8x5 Support",
        },
        premium: {
          cost: 8000,
          coverage: "24x7 Support",
          sla: "2 hour response",
        },
        enterprise: {
          cost: 20000,
          coverage: "24x7 Priority",
          sla: "1 hour response",
          dedicatedTAM: true,
        },
      },
      professionalServices: {
        implementation: {
          small: 5000,
          medium: 15000,
          large: 40000,
        },
        training: {
          onsite: 3500,
          virtual: 2000,
          certification: 800,
        },
        customization: 275,
      },
      hardware: {
        required: false,
      },
      infrastructure: {
        serverRequirements: {
          cpu: "N/A - Cloud Native",
          ram: "N/A - Cloud Native",
          storage: "N/A - Cloud Native",
          cost: 0,
        },
      },
    },

    security: {
      zeroTrustScore: 88,
      riskReduction: {
        unauthorized_access: 87,
        lateral_movement: 85,
        data_breach: 83,
        insider_threat: 82,
        compliance_violation: 86,
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 78,
        insurance_discount: 20,
      },
      securityFeatures: {
        mfa: true,
        continuous_verification: true,
        micro_segmentation: true,
        behavior_analytics: true,
        threat_intelligence: true,
        automated_response: true,
      },
      complianceMapping: [
        {
          framework: "SOC 2",
          controls: ["CC6.1", "CC6.6", "CC6.7", "CC7.2"],
          coverage: 87,
        },
        {
          framework: "ISO 27001",
          controls: ["A.9.1", "A.9.2", "A.9.4", "A.12.4"],
          coverage: 85,
        },
      ],
    },

    scalability: {
      maxDevices: 50000,
      performanceAtScale: "excellent",
      clusteringSupport: true,
      multiSiteSupport: true,
    },

    implementation: {
      timeToValue: {
        poc: 3,
        small: 14,
        medium: 30,
        large: 60,
      },
      complexity: "medium",
      requiredExpertise: ["Cloud networking", "AI/ML basics"],
      migrationFromExisting: {
        effort: "medium",
        downtime: 0,
        dataLoss: false,
      },
    },

    operationalMetrics: {
      adminEffort: 8,
      automationLevel: 85,
      reportingCapabilities: "enterprise",
      apiAvailability: true,
      cloudManagement: true,
      maintenanceWindows: 3,
      upgradeComplexity: "medium",
      troubleshootingTime: 2,
      staffingRequirements: {
        administrators: 1.5,
        specialists: 1,
        trainingDays: 8,
      },
      operationalCosts: {
        monthlyMaintenance: 3,
        incidentResponse: 800,
        changeManagement: 400,
        monitoring: 1500,
      },
    },

    vendorStability: {
      yearsInBusiness: 25,
      financialHealth: "excellent",
      marketShare: 12,
      customerBase: 15000,
      acquisitionRisk: "low",
    },
  },

  extreme: {
    id: "extreme",
    name: "Extreme Networks NAC",
    category: "on-premise",
    marketPosition: "niche",
    deploymentModels: ["on-premise", "hybrid"],

    pricing: {
      perDevice: {
        base: 88,
        volumeDiscounts: {
          500: 82,
          1000: 76,
          5000: 70,
          10000: 62,
        },
      },
      licensing: {
        model: "perpetual",
        perpetualCost: 88,
        annualMaintenance: 18,
      },
      addOns: [
        {
          name: "Guest Access",
          description: "Guest management portal",
          cost: 20,
          required: false,
        },
      ],
      integrations: [
        {
          name: "ExtremeCloud IQ",
          type: "native",
          cost: 0,
          complexity: "medium",
        },
      ],
      support: {
        basic: {
          included: false,
          cost: 7000,
          coverage: "8x5 Support",
        },
        premium: {
          cost: 16000,
          coverage: "24x7 Support",
          sla: "4 hour response",
        },
        enterprise: {
          cost: 30000,
          coverage: "24x7 Priority",
          sla: "2 hour response",
          dedicatedTAM: false,
        },
      },
      professionalServices: {
        implementation: {
          small: 12000,
          medium: 28000,
          large: 75000,
        },
        training: {
          onsite: 3500,
          virtual: 2000,
          certification: 1000,
        },
        customization: 280,
      },
      hardware: {
        required: true,
        appliances: [
          {
            name: "NAC-1000",
            capacity: 1000,
            cost: 12000,
            redundancy: true,
          },
        ],
      },
      infrastructure: {
        serverRequirements: {
          cpu: "8+ cores",
          ram: "32GB minimum",
          storage: "400GB SSD",
          cost: 8000,
        },
        backup: 6000,
      },
    },

    security: {
      zeroTrustScore: 75,
      riskReduction: {
        unauthorized_access: 78,
        lateral_movement: 75,
        data_breach: 72,
        insider_threat: 70,
        compliance_violation: 76,
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 65,
        insurance_discount: 12,
      },
      securityFeatures: {
        mfa: true,
        continuous_verification: false,
        micro_segmentation: true,
        behavior_analytics: false,
        threat_intelligence: false,
        automated_response: false,
      },
      complianceMapping: [
        {
          framework: "NIST 800-53",
          controls: ["AC-2", "AC-3", "AC-4"],
          coverage: 75,
        },
      ],
    },

    scalability: {
      maxDevices: 25000,
      performanceAtScale: "fair",
      clusteringSupport: false,
      multiSiteSupport: true,
    },

    implementation: {
      timeToValue: {
        poc: 14,
        small: 30,
        medium: 60,
        large: 120,
      },
      complexity: "medium",
      requiredExpertise: ["Extreme networking", "RADIUS"],
      migrationFromExisting: {
        effort: "medium",
        downtime: 3,
        dataLoss: false,
      },
    },

    operationalMetrics: {
      adminEffort: 12,
      automationLevel: 55,
      reportingCapabilities: "basic",
      apiAvailability: true,
      cloudManagement: true,
      maintenanceWindows: 5,
      upgradeComplexity: "medium",
      troubleshootingTime: 3,
      staffingRequirements: {
        administrators: 2,
        specialists: 1,
        trainingDays: 10,
      },
      operationalCosts: {
        monthlyMaintenance: 5,
        incidentResponse: 1200,
        changeManagement: 800,
        monitoring: 2000,
      },
    },

    vendorStability: {
      yearsInBusiness: 35,
      financialHealth: "good",
      marketShare: 5,
      customerBase: 8000,
      acquisitionRisk: "medium",
    },
  },

  arista: {
    id: "arista",
    name: "Arista CloudVision CUE",
    category: "cloud-native",
    marketPosition: "niche",
    deploymentModels: ["cloud", "on-premise"],

    pricing: {
      perDevice: {
        base: 78,
        volumeDiscounts: {
          500: 72,
          1000: 66,
          5000: 58,
          10000: 50,
        },
      },
      licensing: {
        model: "subscription",
        subscriptionTiers: {
          basic: 65,
          professional: 78,
          enterprise: 92,
        },
      },
      addOns: [
        {
          name: "Advanced Analytics",
          description: "Enhanced network analytics",
          cost: 15,
          required: false,
        },
      ],
      integrations: [
        {
          name: "CloudVision",
          type: "native",
          cost: 0,
          complexity: "low",
        },
      ],
      support: {
        basic: {
          included: true,
          cost: 0,
          coverage: "8x5 Support",
        },
        premium: {
          cost: 10000,
          coverage: "24x7 Support",
          sla: "4 hour response",
        },
        enterprise: {
          cost: 25000,
          coverage: "24x7 Priority",
          sla: "2 hour response",
          dedicatedTAM: true,
        },
      },
      professionalServices: {
        implementation: {
          small: 8000,
          medium: 20000,
          large: 50000,
        },
        training: {
          onsite: 4000,
          virtual: 2500,
          certification: 1200,
        },
        customization: 300,
      },
      hardware: {
        required: false,
      },
      infrastructure: {
        serverRequirements: {
          cpu: "N/A - Cloud Native",
          ram: "N/A - Cloud Native",
          storage: "N/A - Cloud Native",
          cost: 0,
        },
      },
    },

    security: {
      zeroTrustScore: 80,
      riskReduction: {
        unauthorized_access: 82,
        lateral_movement: 78,
        data_breach: 75,
        insider_threat: 73,
        compliance_violation: 79,
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 68,
        insurance_discount: 15,
      },
      securityFeatures: {
        mfa: true,
        continuous_verification: true,
        micro_segmentation: true,
        behavior_analytics: true,
        threat_intelligence: false,
        automated_response: true,
      },
      complianceMapping: [
        {
          framework: "NIST CSF",
          controls: ["ID.AM", "PR.AC"],
          coverage: 80,
        },
      ],
    },

    scalability: {
      maxDevices: 75000,
      performanceAtScale: "good",
      clusteringSupport: true,
      multiSiteSupport: true,
    },

    implementation: {
      timeToValue: {
        poc: 7,
        small: 21,
        medium: 45,
        large: 90,
      },
      complexity: "medium",
      requiredExpertise: ["Arista networking", "Cloud platforms"],
      migrationFromExisting: {
        effort: "medium",
        downtime: 1,
        dataLoss: false,
      },
    },

    operationalMetrics: {
      adminEffort: 10,
      automationLevel: 75,
      reportingCapabilities: "advanced",
      apiAvailability: true,
      cloudManagement: true,
      maintenanceWindows: 4,
      upgradeComplexity: "medium",
      troubleshootingTime: 2.5,
      staffingRequirements: {
        administrators: 1.5,
        specialists: 1,
        trainingDays: 12,
      },
      operationalCosts: {
        monthlyMaintenance: 4,
        incidentResponse: 1000,
        changeManagement: 600,
        monitoring: 1800,
      },
    },

    vendorStability: {
      yearsInBusiness: 18,
      financialHealth: "excellent",
      marketShare: 3,
      customerBase: 4000,
      acquisitionRisk: "low",
    },
  },

  pulse_secure: {
    id: "pulse_secure",
    name: "Pulse Secure NAC",
    category: "on-premise",
    marketPosition: "niche",
    deploymentModels: ["on-premise", "hybrid"],

    pricing: {
      perDevice: {
        base: 92,
        volumeDiscounts: {
          500: 86,
          1000: 80,
          5000: 72,
          10000: 64,
        },
      },
      licensing: {
        model: "perpetual",
        perpetualCost: 92,
        annualMaintenance: 20,
      },
      addOns: [
        {
          name: "Mobile Device Management",
          description: "MDM integration",
          cost: 25,
          required: false,
        },
      ],
      integrations: [
        {
          name: "Pulse Connect Secure",
          type: "native",
          cost: 0,
          complexity: "medium",
        },
      ],
      support: {
        basic: {
          included: false,
          cost: 9000,
          coverage: "8x5 Support",
        },
        premium: {
          cost: 20000,
          coverage: "24x7 Support",
          sla: "4 hour response",
        },
        enterprise: {
          cost: 38000,
          coverage: "24x7 Priority",
          sla: "2 hour response",
          dedicatedTAM: false,
        },
      },
      professionalServices: {
        implementation: {
          small: 18000,
          medium: 40000,
          large: 95000,
        },
        training: {
          onsite: 4500,
          virtual: 2800,
          certification: 1300,
        },
        customization: 320,
      },
      hardware: {
        required: true,
        appliances: [
          {
            name: "PSA-5000",
            capacity: 2500,
            cost: 18000,
            redundancy: true,
          },
        ],
      },
      infrastructure: {
        serverRequirements: {
          cpu: "12+ cores",
          ram: "48GB minimum",
          storage: "500GB SSD",
          cost: 12000,
        },
        backup: 8000,
      },
    },

    security: {
      zeroTrustScore: 78,
      riskReduction: {
        unauthorized_access: 80,
        lateral_movement: 77,
        data_breach: 74,
        insider_threat: 72,
        compliance_violation: 78,
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 66,
        insurance_discount: 14,
      },
      securityFeatures: {
        mfa: true,
        continuous_verification: false,
        micro_segmentation: true,
        behavior_analytics: false,
        threat_intelligence: false,
        automated_response: true,
      },
      complianceMapping: [
        {
          framework: "NIST 800-53",
          controls: ["AC-2", "AC-3", "IA-2"],
          coverage: 78,
        },
      ],
    },

    scalability: {
      maxDevices: 50000,
      performanceAtScale: "fair",
      clusteringSupport: true,
      multiSiteSupport: true,
    },

    implementation: {
      timeToValue: {
        poc: 21,
        small: 45,
        medium: 75,
        large: 150,
      },
      complexity: "high",
      requiredExpertise: ["Pulse Secure", "VPN technologies", "PKI"],
      migrationFromExisting: {
        effort: "high",
        downtime: 6,
        dataLoss: false,
      },
    },

    operationalMetrics: {
      adminEffort: 16,
      automationLevel: 50,
      reportingCapabilities: "basic",
      apiAvailability: false,
      cloudManagement: false,
      maintenanceWindows: 7,
      upgradeComplexity: "high",
      troubleshootingTime: 5,
      staffingRequirements: {
        administrators: 2.5,
        specialists: 1.5,
        trainingDays: 18,
      },
      operationalCosts: {
        monthlyMaintenance: 7,
        incidentResponse: 1800,
        changeManagement: 1200,
        monitoring: 2800,
      },
    },

    vendorStability: {
      yearsInBusiness: 22,
      financialHealth: "fair",
      marketShare: 4,
      customerBase: 6000,
      acquisitionRisk: "high",
    },
  },

  microsoft_nps: {
    id: "microsoft_nps",
    name: "Microsoft NPS",
    category: "legacy",
    marketPosition: "niche",
    deploymentModels: ["on-premise"],

    pricing: {
      perDevice: {
        base: 25,
        volumeDiscounts: {
          500: 25,
          1000: 25,
          5000: 25,
          10000: 25,
        },
      },
      licensing: {
        model: "freemium",
        perpetualCost: 0,
      },
      addOns: [
        {
          name: "Windows Server CAL",
          description: "Client Access License",
          cost: 38,
          required: true,
        },
      ],
      integrations: [
        {
          name: "Active Directory",
          type: "native",
          cost: 0,
          complexity: "low",
        },
      ],
      support: {
        basic: {
          included: false,
          cost: 5000,
          coverage: "8x5 Support",
        },
        premium: {
          cost: 12000,
          coverage: "24x7 Support",
          sla: "8 hour response",
        },
        enterprise: {
          cost: 25000,
          coverage: "24x7 Priority",
          sla: "4 hour response",
          dedicatedTAM: false,
        },
      },
      professionalServices: {
        implementation: {
          small: 5000,
          medium: 15000,
          large: 35000,
        },
        training: {
          onsite: 2000,
          virtual: 1200,
          certification: 800,
        },
        customization: 150,
      },
      hardware: {
        required: true,
      },
      infrastructure: {
        serverRequirements: {
          cpu: "4+ cores",
          ram: "16GB minimum",
          storage: "200GB SSD",
          cost: 5000,
        },
        backup: 3000,
      },
    },

    security: {
      zeroTrustScore: 45,
      riskReduction: {
        unauthorized_access: 50,
        lateral_movement: 45,
        data_breach: 40,
        insider_threat: 35,
        compliance_violation: 48,
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 35,
        insurance_discount: 5,
      },
      securityFeatures: {
        mfa: false,
        continuous_verification: false,
        micro_segmentation: false,
        behavior_analytics: false,
        threat_intelligence: false,
        automated_response: false,
      },
      complianceMapping: [
        {
          framework: "NIST 800-53",
          controls: ["AC-2", "IA-2"],
          coverage: 45,
        },
      ],
    },

    scalability: {
      maxDevices: 10000,
      performanceAtScale: "poor",
      clusteringSupport: false,
      multiSiteSupport: false,
    },

    implementation: {
      timeToValue: {
        poc: 7,
        small: 14,
        medium: 30,
        large: 60,
      },
      complexity: "medium",
      requiredExpertise: ["Windows Server", "Active Directory", "RADIUS"],
      migrationFromExisting: {
        effort: "low",
        downtime: 2,
        dataLoss: false,
      },
    },

    operationalMetrics: {
      adminEffort: 25,
      automationLevel: 20,
      reportingCapabilities: "basic",
      apiAvailability: false,
      cloudManagement: false,
      maintenanceWindows: 12,
      upgradeComplexity: "medium",
      troubleshootingTime: 8,
      staffingRequirements: {
        administrators: 3,
        specialists: 2,
        trainingDays: 10,
      },
      operationalCosts: {
        monthlyMaintenance: 10,
        incidentResponse: 2500,
        changeManagement: 1800,
        monitoring: 3500,
      },
    },

    vendorStability: {
      yearsInBusiness: 48,
      financialHealth: "excellent",
      marketShare: 15,
      customerBase: 100000,
      acquisitionRisk: "low",
    },
  },

  foxpass: {
    id: "foxpass",
    name: "Foxpass",
    category: "cloud-native",
    marketPosition: "niche",
    deploymentModels: ["cloud"],

    pricing: {
      perDevice: {
        base: 45,
        volumeDiscounts: {
          500: 42,
          1000: 38,
          5000: 34,
          10000: 30,
        },
      },
      licensing: {
        model: "subscription",
        subscriptionTiers: {
          basic: 35,
          professional: 45,
          enterprise: 55,
        },
      },
      addOns: [
        {
          name: "LDAP Sync",
          description: "LDAP directory synchronization",
          cost: 8,
          required: false,
        },
      ],
      integrations: [
        {
          name: "Google Workspace",
          type: "native",
          cost: 0,
          complexity: "low",
        },
      ],
      support: {
        basic: {
          included: true,
          cost: 0,
          coverage: "8x5 Email",
        },
        premium: {
          cost: 3000,
          coverage: "24x7 Email",
          sla: "8 hour response",
        },
        enterprise: {
          cost: 8000,
          coverage: "24x7 Phone/Email",
          sla: "4 hour response",
          dedicatedTAM: false,
        },
      },
      professionalServices: {
        implementation: {
          small: 0,
          medium: 2000,
          large: 8000,
        },
        training: {
          onsite: 1500,
          virtual: 800,
          certification: 400,
        },
        customization: 200,
      },
      hardware: {
        required: false,
      },
      infrastructure: {
        serverRequirements: {
          cpu: "N/A - Cloud Native",
          ram: "N/A - Cloud Native",
          storage: "N/A - Cloud Native",
          cost: 0,
        },
      },
    },

    security: {
      zeroTrustScore: 70,
      riskReduction: {
        unauthorized_access: 72,
        lateral_movement: 68,
        data_breach: 65,
        insider_threat: 62,
        compliance_violation: 70,
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 55,
        insurance_discount: 10,
      },
      securityFeatures: {
        mfa: true,
        continuous_verification: false,
        micro_segmentation: false,
        behavior_analytics: false,
        threat_intelligence: false,
        automated_response: false,
      },
      complianceMapping: [
        {
          framework: "SOC 2",
          controls: ["CC6.1", "CC6.6"],
          coverage: 70,
        },
      ],
    },

    scalability: {
      maxDevices: 15000,
      performanceAtScale: "good",
      clusteringSupport: false,
      multiSiteSupport: true,
    },

    implementation: {
      timeToValue: {
        poc: 1,
        small: 3,
        medium: 7,
        large: 14,
      },
      complexity: "low",
      requiredExpertise: ["Basic networking", "Cloud services"],
      migrationFromExisting: {
        effort: "low",
        downtime: 0,
        dataLoss: false,
      },
    },

    operationalMetrics: {
      adminEffort: 6,
      automationLevel: 80,
      reportingCapabilities: "basic",
      apiAvailability: true,
      cloudManagement: true,
      maintenanceWindows: 1,
      upgradeComplexity: "low",
      troubleshootingTime: 1.5,
      staffingRequirements: {
        administrators: 1,
        specialists: 0.5,
        trainingDays: 3,
      },
      operationalCosts: {
        monthlyMaintenance: 1,
        incidentResponse: 400,
        changeManagement: 200,
        monitoring: 800,
      },
    },

    vendorStability: {
      yearsInBusiness: 8,
      financialHealth: "good",
      marketShare: 1,
      customerBase: 2000,
      acquisitionRisk: "medium",
    },
  },

  securew2: {
    id: "securew2",
    name: "SecureW2",
    category: "cloud-native",
    marketPosition: "niche",
    deploymentModels: ["cloud"],

    pricing: {
      perDevice: {
        base: 52,
        volumeDiscounts: {
          500: 48,
          1000: 44,
          5000: 38,
          10000: 32,
        },
      },
      licensing: {
        model: "subscription",
        subscriptionTiers: {
          basic: 40,
          professional: 52,
          enterprise: 64,
        },
      },
      addOns: [
        {
          name: "Certificate Management",
          description: "Advanced certificate lifecycle management",
          cost: 12,
          required: false,
        },
      ],
      integrations: [
        {
          name: "Microsoft AD",
          type: "native",
          cost: 0,
          complexity: "low",
        },
      ],
      support: {
        basic: {
          included: true,
          cost: 0,
          coverage: "8x5 Email/Chat",
        },
        premium: {
          cost: 4000,
          coverage: "24x7 Email",
          sla: "6 hour response",
        },
        enterprise: {
          cost: 12000,
          coverage: "24x7 Phone/Email",
          sla: "2 hour response",
          dedicatedTAM: false,
        },
      },
      professionalServices: {
        implementation: {
          small: 0,
          medium: 3000,
          large: 12000,
        },
        training: {
          onsite: 2000,
          virtual: 1200,
          certification: 600,
        },
        customization: 220,
      },
      hardware: {
        required: false,
      },
      infrastructure: {
        serverRequirements: {
          cpu: "N/A - Cloud Native",
          ram: "N/A - Cloud Native",
          storage: "N/A - Cloud Native",
          cost: 0,
        },
      },
    },

    security: {
      zeroTrustScore: 72,
      riskReduction: {
        unauthorized_access: 74,
        lateral_movement: 70,
        data_breach: 68,
        insider_threat: 65,
        compliance_violation: 72,
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 58,
        insurance_discount: 12,
      },
      securityFeatures: {
        mfa: true,
        continuous_verification: false,
        micro_segmentation: false,
        behavior_analytics: false,
        threat_intelligence: false,
        automated_response: true,
      },
      complianceMapping: [
        {
          framework: "NIST 800-53",
          controls: ["AC-2", "AC-3", "IA-5"],
          coverage: 72,
        },
      ],
    },

    scalability: {
      maxDevices: 20000,
      performanceAtScale: "good",
      clusteringSupport: false,
      multiSiteSupport: true,
    },

    implementation: {
      timeToValue: {
        poc: 2,
        small: 5,
        medium: 10,
        large: 21,
      },
      complexity: "low",
      requiredExpertise: ["PKI basics", "WiFi security"],
      migrationFromExisting: {
        effort: "low",
        downtime: 0,
        dataLoss: false,
      },
    },

    operationalMetrics: {
      adminEffort: 7,
      automationLevel: 75,
      reportingCapabilities: "basic",
      apiAvailability: true,
      cloudManagement: true,
      maintenanceWindows: 2,
      upgradeComplexity: "low",
      troubleshootingTime: 2,
      staffingRequirements: {
        administrators: 1,
        specialists: 0.5,
        trainingDays: 5,
      },
      operationalCosts: {
        monthlyMaintenance: 2,
        incidentResponse: 600,
        changeManagement: 300,
        monitoring: 1000,
      },
    },

    vendorStability: {
      yearsInBusiness: 12,
      financialHealth: "good",
      marketShare: 2,
      customerBase: 3000,
      acquisitionRisk: "medium",
    },
  },

  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    category: "on-premise",
    marketPosition: "niche",
    deploymentModels: ["on-premise"],

    pricing: {
      perDevice: {
        base: 35,
        volumeDiscounts: {
          500: 32,
          1000: 28,
          5000: 24,
          10000: 20,
        },
      },
      licensing: {
        model: "freemium",
        perpetualCost: 0,
        subscriptionTiers: {
          basic: 0,
          professional: 35,
          enterprise: 50,
        },
      },
      addOns: [
        {
          name: "Enterprise Support",
          description: "Commercial support package",
          cost: 15,
          required: false,
        },
      ],
      integrations: [
        {
          name: "LDAP/AD",
          type: "native",
          cost: 0,
          complexity: "medium",
        },
      ],
      support: {
        basic: {
          included: false,
          cost: 0,
          coverage: "Community",
        },
        premium: {
          cost: 8000,
          coverage: "8x5 Support",
          sla: "24 hour response",
        },
        enterprise: {
          cost: 18000,
          coverage: "24x7 Support",
          sla: "8 hour response",
          dedicatedTAM: false,
        },
      },
      professionalServices: {
        implementation: {
          small: 8000,
          medium: 20000,
          large: 50000,
        },
        training: {
          onsite: 3000,
          virtual: 1800,
          certification: 800,
        },
        customization: 180,
      },
      hardware: {
        required: true,
      },
      infrastructure: {
        serverRequirements: {
          cpu: "8+ cores",
          ram: "32GB minimum",
          storage: "500GB SSD",
          cost: 8000,
        },
        backup: 4000,
      },
    },

    security: {
      zeroTrustScore: 65,
      riskReduction: {
        unauthorized_access: 68,
        lateral_movement: 65,
        data_breach: 62,
        insider_threat: 58,
        compliance_violation: 66,
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 50,
        insurance_discount: 8,
      },
      securityFeatures: {
        mfa: false,
        continuous_verification: false,
        micro_segmentation: true,
        behavior_analytics: false,
        threat_intelligence: false,
        automated_response: true,
      },
      complianceMapping: [
        {
          framework: "NIST 800-53",
          controls: ["AC-2", "AC-3"],
          coverage: 65,
        },
      ],
    },

    scalability: {
      maxDevices: 30000,
      performanceAtScale: "fair",
      clusteringSupport: true,
      multiSiteSupport: true,
    },

    implementation: {
      timeToValue: {
        poc: 14,
        small: 30,
        medium: 60,
        large: 120,
      },
      complexity: "high",
      requiredExpertise: ["Linux administration", "Perl", "Network security"],
      migrationFromExisting: {
        effort: "high",
        downtime: 4,
        dataLoss: false,
      },
    },

    operationalMetrics: {
      adminEffort: 18,
      automationLevel: 45,
      reportingCapabilities: "basic",
      apiAvailability: true,
      cloudManagement: false,
      maintenanceWindows: 8,
      upgradeComplexity: "high",
      troubleshootingTime: 6,
      staffingRequirements: {
        administrators: 3,
        specialists: 2,
        trainingDays: 15,
      },
      operationalCosts: {
        monthlyMaintenance: 8,
        incidentResponse: 2000,
        changeManagement: 1500,
        monitoring: 2500,
      },
    },

    vendorStability: {
      yearsInBusiness: 18,
      financialHealth: "fair",
      marketShare: 2,
      customerBase: 5000,
      acquisitionRisk: "low",
    },
  },

  forescout: {
    id: "forescout",
    name: "Forescout",
    category: "hybrid",
    marketPosition: "leader",
    deploymentModels: ["on-premise", "cloud", "hybrid"],

    pricing: {
      perDevice: {
        base: 85,
        volumeDiscounts: {
          500: 80,
          1000: 74,
          5000: 68,
          10000: 60,
        },
      },
      licensing: {
        model: "subscription",
        subscriptionTiers: {
          basic: 70,
          professional: 85,
          enterprise: 100,
        },
      },
      addOns: [
        {
          name: "eyeExtend",
          description: "OT/IoT visibility",
          cost: 20,
          required: false,
        },
        {
          name: "eyeInspect",
          description: "OT security",
          cost: 30,
          required: false,
        },
      ],
      integrations: [
        {
          name: "ServiceNow",
          type: "native",
          cost: 0,
          complexity: "low",
        },
      ],
      support: {
        basic: {
          included: false,
          cost: 10000,
          coverage: "8x5 Support",
        },
        premium: {
          cost: 22000,
          coverage: "24x7 Support",
          sla: "4 hour response",
        },
        enterprise: {
          cost: 40000,
          coverage: "24x7 Priority",
          sla: "1 hour response",
          dedicatedTAM: true,
        },
      },
      professionalServices: {
        implementation: {
          small: 20000,
          medium: 45000,
          large: 120000,
        },
        training: {
          onsite: 4500,
          virtual: 2500,
          certification: 1000,
        },
        customization: 325,
      },
      hardware: {
        required: true,
        appliances: [
          {
            name: "CT-R",
            capacity: 5000,
            cost: 25000,
            redundancy: true,
          },
        ],
      },
      infrastructure: {
        serverRequirements: {
          cpu: "16+ cores",
          ram: "64GB minimum",
          storage: "1TB SSD",
          cost: 20000,
        },
        backup: 12000,
      },
    },

    security: {
      zeroTrustScore: 80,
      riskReduction: {
        unauthorized_access: 82,
        lateral_movement: 80,
        data_breach: 78,
        insider_threat: 75,
        compliance_violation: 82,
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 70,
        insurance_discount: 15,
      },
      securityFeatures: {
        mfa: false,
        continuous_verification: true,
        micro_segmentation: true,
        behavior_analytics: false,
        threat_intelligence: true,
        automated_response: true,
      },
      complianceMapping: [
        {
          framework: "NIST CSF",
          controls: ["ID.AM", "PR.AC", "DE.CM"],
          coverage: 82,
        },
      ],
    },

    scalability: {
      maxDevices: 1000000,
      performanceAtScale: "good",
      clusteringSupport: true,
      multiSiteSupport: true,
    },

    implementation: {
      timeToValue: {
        poc: 14,
        small: 45,
        medium: 90,
        large: 180,
      },
      complexity: "high",
      requiredExpertise: ["Network architecture", "Security operations", "OT/IoT"],
      migrationFromExisting: {
        effort: "high",
        downtime: 2,
        dataLoss: false,
      },
    },

    operationalMetrics: {
      adminEffort: 18,
      automationLevel: 70,
      reportingCapabilities: "advanced",
      apiAvailability: true,
      cloudManagement: true,
      maintenanceWindows: 6,
      upgradeComplexity: "high",
      troubleshootingTime: 4,
      staffingRequirements: {
        administrators: 2.5,
        specialists: 2,
        trainingDays: 16,
      },
      operationalCosts: {
        monthlyMaintenance: 7,
        incidentResponse: 1600,
        changeManagement: 1200,
        monitoring: 2800,
      },
    },

    vendorStability: {
      yearsInBusiness: 20,
      financialHealth: "good",
      marketShare: 15,
      customerBase: 20000,
      acquisitionRisk: "medium",
    },
  },

  meraki: {
    id: "meraki",
    name: "Cisco Meraki Access Control",
    category: "cloud-native",
    marketPosition: "challenger",
    deploymentModels: ["cloud"],

    pricing: {
      perDevice: {
        base: 68,
        volumeDiscounts: {
          500: 64,
          1000: 58,
          5000: 52,
          10000: 46,
        },
      },
      licensing: {
        model: "subscription",
        subscriptionTiers: {
          basic: 55,
          professional: 68,
          enterprise: 82,
        },
      },
      addOns: [
        {
          name: "Advanced Security",
          description: "Enhanced security features",
          cost: 15,
          required: false,
        },
      ],
      integrations: [
        {
          name: "Meraki Dashboard",
          type: "native",
          cost: 0,
          complexity: "low",
        },
      ],
      support: {
        basic: {
          included: true,
          cost: 0,
          coverage: "8x5 Support",
        },
        premium: {
          cost: 6000,
          coverage: "24x7 Support",
          sla: "4 hour response",
        },
        enterprise: {
          cost: 18000,
          coverage: "24x7 Priority",
          sla: "2 hour response",
          dedicatedTAM: true,
        },
      },
      professionalServices: {
        implementation: {
          small: 3000,
          medium: 10000,
          large: 25000,
        },
        training: {
          onsite: 3000,
          virtual: 1800,
          certification: 900,
        },
        customization: 260,
      },
      hardware: {
        required: false,
      },
      infrastructure: {
        serverRequirements: {
          cpu: "N/A - Cloud Native",
          ram: "N/A - Cloud Native",
          storage: "N/A - Cloud Native",
          cost: 0,
        },
      },
    },

    security: {
      zeroTrustScore: 76,
      riskReduction: {
        unauthorized_access: 78,
        lateral_movement: 75,
        data_breach: 72,
        insider_threat: 70,
        compliance_violation: 76,
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 62,
        insurance_discount: 13,
      },
      securityFeatures: {
        mfa: true,
        continuous_verification: false,
        micro_segmentation: true,
        behavior_analytics: false,
        threat_intelligence: false,
        automated_response: true,
      },
      complianceMapping: [
        {
          framework: "NIST 800-53",
          controls: ["AC-2", "AC-3", "AC-4"],
          coverage: 76,
        },
      ],
    },

    scalability: {
      maxDevices: 40000,
      performanceAtScale: "good",
      clusteringSupport: false,
      multiSiteSupport: true,
    },

    implementation: {
      timeToValue: {
        poc: 3,
        small: 10,
        medium: 21,
        large: 45,
      },
      complexity: "low",
      requiredExpertise: ["Meraki dashboard", "Cloud networking"],
      migrationFromExisting: {
        effort: "low",
        downtime: 0,
        dataLoss: false,
      },
    },

    operationalMetrics: {
      adminEffort: 9,
      automationLevel: 70,
      reportingCapabilities: "advanced",
      apiAvailability: true,
      cloudManagement: true,
      maintenanceWindows: 3,
      upgradeComplexity: "low",
      troubleshootingTime: 2,
      staffingRequirements: {
        administrators: 1.5,
        specialists: 0.5,
        trainingDays: 6,
      },
      operationalCosts: {
        monthlyMaintenance: 3,
        incidentResponse: 700,
        changeManagement: 400,
        monitoring: 1200,
      },
    },

    vendorStability: {
      yearsInBusiness: 18,
      financialHealth: "excellent",
      marketShare: 10,
      customerBase: 25000,
      acquisitionRisk: "low",
    },
  },
}

// TCO calculation functions
export function calculateTotalCostOfOwnership(
  vendor: EnhancedVendorData,
  devices: number,
  years: number,
  includeExistingMigration = false,
): {
  year1: number
  year2: number
  year3: number
  year5: number
  breakdown: {
    software: number[]
    hardware: number[]
    implementation: number[]
    operations: number[]
    support: number[]
    training: number[]
  }
} {
  const breakdown = {
    software: [] as number[],
    hardware: [] as number[],
    implementation: [] as number[],
    operations: [] as number[],
    support: [] as number[],
    training: [] as number[],
  }

  // Calculate per-year costs
  for (let year = 1; year <= years; year++) {
    // Software costs
    let softwareCost = 0
    if (vendor.pricing.licensing.model === "subscription") {
      const tierPrice = vendor.pricing.licensing.subscriptionTiers?.enterprise || vendor.pricing.perDevice.base
      softwareCost = getVolumePrice(vendor, devices) * devices
    } else if (year === 1) {
      softwareCost = getVolumePrice(vendor, devices) * devices
    } else {
      softwareCost = (vendor.pricing.licensing.annualMaintenance || 0) * devices
    }

    // Add required add-ons
    vendor.pricing.addOns
      .filter((addon) => addon.required)
      .forEach((addon) => {
        softwareCost += addon.cost * devices
      })

    breakdown.software.push(softwareCost)

    // Hardware costs (first year only)
    if (year === 1 && vendor.pricing.hardware.required) {
      const hardwareCost = calculateHardwareCost(vendor, devices)
      breakdown.hardware.push(hardwareCost)
    } else {
      breakdown.hardware.push(0)
    }

    // Implementation costs (first year only)
    if (year === 1) {
      const implCost = calculateImplementationCost(vendor, devices)
      breakdown.implementation.push(implCost)
    } else {
      breakdown.implementation.push(0)
    }

    // Operations costs
    const opsCost = calculateOperationalCost(vendor, devices)
    breakdown.operations.push(opsCost)

    // Support costs
    const supportCost = devices > 1000 ? vendor.pricing.support.enterprise.cost : vendor.pricing.support.premium.cost
    breakdown.support.push(supportCost)

    // Training costs (first year and every 2 years)
    if (year === 1 || year % 2 === 0) {
      const trainingCost = vendor.pricing.professionalServices.training.virtual * 5 // 5 people
      breakdown.training.push(trainingCost)
    } else {
      breakdown.training.push(0)
    }
  }

  // Calculate totals
  const calculateYearTotal = (upToYear: number) => {
    let total = 0
    for (let year = 1; year <= upToYear; year++) {
      if (year <= breakdown.software.length) {
        total += breakdown.software[year - 1]
        total += breakdown.hardware[year - 1]
        total += breakdown.implementation[year - 1]
        total += breakdown.operations[year - 1]
        total += breakdown.support[year - 1]
        total += breakdown.training[year - 1]
      }
    }
    return total
  }

  return {
    year1: calculateYearTotal(1),
    year2: calculateYearTotal(2),
    year3: calculateYearTotal(3),
    year5: calculateYearTotal(5),
    breakdown,
  }
}

function getVolumePrice(vendor: EnhancedVendorData, devices: number): number {
  const discounts = vendor.pricing.perDevice.volumeDiscounts
  if (devices >= 10000) return discounts[10000]
  if (devices >= 5000) return discounts[5000]
  if (devices >= 1000) return discounts[1000]
  if (devices >= 500) return discounts[500]
  return vendor.pricing.perDevice.base
}

function calculateHardwareCost(vendor: EnhancedVendorData, devices: number): number {
  if (!vendor.pricing.hardware.required) return 0

  if (vendor.pricing.hardware.appliances) {
    // Find appropriate appliance(s)
    let remainingDevices = devices
    let cost = 0

    // Sort appliances by capacity (descending)
    const sortedAppliances = [...vendor.pricing.hardware.appliances].sort((a, b) => b.capacity - a.capacity)

    for (const appliance of sortedAppliances) {
      if (remainingDevices >= appliance.capacity) {
        const count = Math.floor(remainingDevices / appliance.capacity)
        cost += count * appliance.cost
        // Add redundancy
        if (appliance.redundancy) {
          cost += count * appliance.cost
        }
        remainingDevices = remainingDevices % appliance.capacity
      }
    }

    // Handle remaining devices with smallest appliance
    if (remainingDevices > 0) {
      const smallestAppliance = sortedAppliances[sortedAppliances.length - 1]
      cost += smallestAppliance.cost
      if (smallestAppliance.redundancy) {
        cost += smallestAppliance.cost
      }
    }

    return cost
  }

  return vendor.pricing.infrastructure.serverRequirements.cost * Math.ceil(devices / 5000)
}

function calculateImplementationCost(vendor: EnhancedVendorData, devices: number): number {
  const { implementation } = vendor.pricing.professionalServices

  if (devices <= 1000) return implementation.small
  if (devices <= 5000) return implementation.medium
  return implementation.large
}

function calculateOperationalCost(vendor: EnhancedVendorData, devices: number): number {
  // Calculate admin hours per year
  const hoursPerWeek = vendor.operationalMetrics.adminEffort * (devices / 1000)
  const annualHours = hoursPerWeek * 52
  const hourlyRate = 75 // Average IT admin hourly rate

  return annualHours * hourlyRate
}

// Helper function to calculate ROI
export function calculateROI(
  vendor: EnhancedVendorData,
  tco: ReturnType<typeof calculateTotalCostOfOwnership>,
  devices: number,
): {
  breachRiskReduction: number
  operationalSavings: number
  complianceSavings: number
  totalSavings: number
  paybackPeriod: number
} {
  const annualBreachRiskReduction =
    ((vendor.security.breachCostSavings.average_breach_cost * vendor.security.breachCostSavings.reduction_percentage) /
      100) *
    0.1 // 10% annual breach probability

  const annualOperationalSavings = ((100 - vendor.operationalMetrics.adminEffort) * 1000 * devices) / 1000

  const annualComplianceSavings = vendor.security.breachCostSavings.insurance_discount * 10000

  const totalAnnualSavings = annualBreachRiskReduction + annualOperationalSavings + annualComplianceSavings

  const paybackPeriod = tco.year1 / totalAnnualSavings

  return {
    breachRiskReduction: annualBreachRiskReduction,
    operationalSavings: annualOperationalSavings,
    complianceSavings: annualComplianceSavings,
    totalSavings: totalAnnualSavings,
    paybackPeriod: Math.round(paybackPeriod * 10) / 10,
  }
}

// Export the comprehensive vendor database
export const ComprehensiveVendorDatabase = enhancedVendorDatabase
