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

  operationalMetrics: {
    adminEffort: number // hours per week per 1000 devices
    automationLevel: number // 0-100
    reportingCapabilities: "basic" | "advanced" | "enterprise"
    apiAvailability: boolean
    cloudManagement: boolean
  }

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
    id: 'portnox',
    name: 'Portnox CLEAR',
    category: 'cloud-native',
    marketPosition: 'visionary',
    deploymentModels: ['cloud'],
    
    pricing: {
      perDevice: {
        base: 60,
        volumeDiscounts: {
          500: 54,
          1000: 48,
          5000: 42,
          10000: 36
        }
      },
      licensing: {
        model: 'subscription',
        subscriptionTiers: {
          basic: 45,
          professional: 60,
          enterprise: 75
        }
      },
      addOns: [
        {
          name: 'Risk-Based Access Control',
          description: 'Advanced risk scoring and adaptive authentication',
          cost: 12,
          required: false
        },
        {
          name: 'Advanced Threat Detection',
          description: 'ML-based anomaly detection',
          cost: 15,
          required: false
        }
      ],
      integrations: [
        {
          name: 'SIEM Integration',
          type: 'native',
          cost: 0,
          complexity: 'low'
        },
        {
          name: 'MDM Integration',
          type: 'api',
          cost: 0,
          complexity: 'low'
        }
      ],
      support: {
        basic: {
          included: true,
          cost: 0,
          coverage: '8x5 Email/Chat'
        },
        premium: {
          cost: 5000,
          coverage: '24x7 Phone/Email',
          sla: '4 hour response'
        },
        enterprise: {
          cost: 15000,
          coverage: '24x7 All channels',
          sla: '1 hour response',
          dedicatedTAM: true
        }
      },
      professionalServices: {
        implementation: {
          small: 0,
          medium: 5000,
          large: 15000
        },
        training: {
          onsite: 2500,
          virtual: 1500,
          certification: 500
        },
        customization: 250
      },
      hardware: {
        required: false
      },
      infrastructure: {
        serverRequirements: {
          cpu: 'N/A - Cloud Native',
          ram: 'N/A - Cloud Native',
          storage: 'N/A - Cloud Native',
          cost: 0
        }
      }
    },
    
    security: {
      zeroTrustScore: 95,
      riskReduction: {
        unauthorized_access: 92,
        lateral_movement: 89,
        data_breach: 87,
        insider_threat: 85,
        compliance_violation: 90
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 85,
        insurance_discount: 25
      },
      securityFeatures: {
        mfa: true,
        continuous_verification: true,
        micro_segmentation: true,
        behavior_analytics: true,
        threat_intelligence: true,
        automated_response: true
      },
      complianceMapping: [
        {
          framework: 'NIST 800-53',
          controls: ['AC-2', 'AC-3', 'AC-4', 'AC-17', 'IA-2', 'IA-5'],
          coverage: 92
        },
        {
          framework: 'ISO 27001',
          controls: ['A.9.1', 'A.9.2', 'A.9.4', 'A.13.1'],
          coverage: 88
        },
        {
          framework: 'PCI-DSS',
          controls: ['1.1', '1.2', '2.1', '7.1', '8.1'],
          coverage: 90
        }
      ]
    },
    
    scalability: {
      maxDevices: 100000,
      performanceAtScale: 'excellent',
      clusteringSupport: true,
      multiSiteSupport: true
    },
    
    implementation: {
      timeToValue: {
        poc: 1,
        small: 7,
        medium: 14,
        large: 30
      },
      complexity: 'low',
      requiredExpertise: ['Basic networking', 'Cloud services'],
      migrationFromExisting: {
        effort: 'low',
        downtime: 0,
        dataLoss: false
      }
    },
    
    operationalMetrics: {
      adminEffort: 5,
      automationLevel: 90,
      reportingCapabilities: 'enterprise',
      apiAvailability: true,
      cloudManagement: true
    },
    
    vendorStability: {
      yearsInBusiness: 15,
      financialHealth: 'excellent',
      marketShare: 8,
      customerBase: 5000,
      acquisitionRisk: 'low'
    }
  },
  
  cisco_ise: {
    id: 'cisco_ise',
    name: 'Cisco ISE',
    category: 'on-premise',
    marketPosition: 'leader',
    deploymentModels: ['on-premise', 'hybrid'],
    
    pricing: {
      perDevice: {
        base: 125,
        volumeDiscounts: {
          500: 118,
          1000: 110,
          5000: 98,
          10000: 85
        }
      },
      licensing: {
        model: 'perpetual',
        perpetualCost: 125,
        annualMaintenance: 22
      },
      addOns: [
        {
          name: 'Plus License',
          description: 'Profiling, BYOD, Guest',
          cost: 50,
          required: true
        },
        {
          name: 'Apex License',
          description: 'pxGrid, TC-NAC, Device Admin',
          cost: 75,
          required: false
        },
        {
          name: 'Device Admin License',
          description: 'TACACS+ functionality',
          cost: 35,
          required: false
        }
      ],
      integrations: [
        {
          name: 'Cisco DNA Center',
          type: 'native',
          cost: 25000,
          complexity: 'high'
        },
        {
          name: 'StealthWatch',
          type: 'native',
          cost: 0,
          complexity: 'medium'
        }
      ],
      support: {
        basic: {
          included: false,
          cost: 12000,
          coverage: '8x5 TAC'
        },
        premium: {
          cost: 25000,
          coverage: '24x7 TAC',
          sla: '2 hour response'
        },
        enterprise: {
          cost: 50000,
          coverage: '24x7 Priority TAC',
          sla: '30 min response',
          dedicatedTAM: true
        }
      },
      professionalServices: {
        implementation: {
          small: 25000,
          medium: 50000,
          large: 150000
        },
        training: {
          onsite: 5000,
          virtual: 3000,
          certification: 1500
        },
        customization: 350
      },
      hardware: {
        required: true,
        appliances: [
          {
            name: 'ISE-3515',
            capacity: 2000,
            cost: 35000,
            redundancy: true
          },
          {
            name: 'ISE-3595',
            capacity: 10000,
            cost: 95000,
            redundancy: true
          },
          {
            name: 'ISE-3695',
            capacity: 30000,
            cost: 195000,
            redundancy: true
          }
        ],
        virtualAppliance: {
          cost: 0,
          requirements: '16 vCPU, 64GB RAM, 600GB SSD'
        }
      },
      infrastructure: {
        serverRequirements: {
          cpu: '16+ cores',
          ram: '64GB minimum',
          storage: '600GB SSD',
          cost: 15000
        },
        databaseLicense: 0,
        loadBalancer: 25000,
        backup: 10000
      }
    },
    
    security: {
      zeroTrustScore: 85,
      riskReduction: {
        unauthorized_access: 88,
        lateral_movement: 85,
        data_breach: 82,
        insider_threat: 80,
        compliance_violation: 87
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 75,
        insurance_discount: 20
      },
      securityFeatures: {
        mfa: true,
        continuous_verification: true,
        micro_segmentation: true,
        behavior_analytics: false,
        threat_intelligence: true,
        automated_response: true
      },
      complianceMapping: [
        {
          framework: 'NIST 800-53',
          controls: ['AC-2', 'AC-3', 'AC-4', 'AC-17', 'IA-2', 'IA-5'],
          coverage: 88
        },
        {
          framework: 'ISO 27001',
          controls: ['A.9.1', 'A.9.2', 'A.9.4', 'A.13.1'],
          coverage: 85
        },
        {
          framework: 'PCI-DSS',
          controls: ['1.1', '1.2', '2.1', '7.1', '8.1'],
          coverage: 87
        }
      ]
    },
    
    scalability: {
      maxDevices: 500000,
      performanceAtScale: 'good',
      clusteringSupport: true,
      multiSiteSupport: true
    },
    
    implementation: {
      timeToValue: {
        poc: 30,
        small: 60,
        medium: 90,
        large: 180
      },
      complexity: 'very high',
      requiredExpertise: ['Cisco networking', 'ISE certification', 'PKI', 'RADIUS/TACACS+'],
      migrationFromExisting: {
        effort: 'high',
        downtime: 8,
        dataLoss: false
      }
    },
    
    operationalMetrics: {
      adminEffort: 20,
      automationLevel: 60,
      reportingCapabilities: 'enterprise',
      apiAvailability: true,
      cloudManagement: false
    },
    
    vendorStability: {
      yearsInBusiness: 40,
      financialHealth: 'excellent',
      marketShare: 35,
      customerBase: 50000,
      acquisitionRisk: 'low'
    }
  },
  
  aruba_clearpass: {
    id: 'aruba_clearpass',
    name: 'Aruba ClearPass',
    category: 'hybrid',
    marketPosition: 'leader',
    deploymentModels: ['on-premise', 'hybrid'],
    
    pricing: {
      perDevice: {
        base: 95,
        volumeDiscounts: {
          500: 89,
          1000: 82,
          5000: 75,
          10000: 68
        }
      },
      licensing: {
        model: 'perpetual',
        perpetualCost: 95,
        annualMaintenance: 19
      },
      addOns: [
        {
          name: 'OnGuard',
          description: 'Endpoint compliance',
          cost: 25,
          required: false
        },
        {
          name: 'Guest Module',
          description: 'Guest management',
          cost: 15,
          required: false
        },
        {
          name: 'OnBoard',
          description: 'Device onboarding',
          cost: 20,
          required: false
        }
      ],
      integrations: [
        {
          name: 'Aruba Central',
          type: 'native',
          cost: 0,
          complexity: 'low'
        },
        {
          name: 'Microsoft Intune',
          type: 'api',
          cost: 0,
          complexity: 'medium'
        }
      ],
      support: {
        basic: {
          included: false,
          cost: 8000,
          coverage: '8x5 Support'
        },
        premium: {
          cost: 18000,
          coverage: '24x7 Support',
          sla: '4 hour response'
        },
        enterprise: {
          cost: 35000,
          coverage: '24x7 Priority',
          sla: '1 hour response',
          dedicatedTAM: true
        }
      },
      professionalServices: {
        implementation: {
          small: 15000,
          medium: 35000,
          large: 100000
        },
        training: {
          onsite: 4000,
          virtual: 2500,
          certification: 1200
        },
        customization: 300
      },
      hardware: {
        required: true,
        appliances: [
          {
            name: 'C1000',
            capacity: 1000,
            cost: 15000,
            redundancy: true
          },
          {
            name: 'C2000',
            capacity: 5000,
            cost: 45000,
            redundancy: true
          },
          {
            name: 'C3000',
            capacity: 25000,
            cost: 95000,
            redundancy: true
          }
        ],
        virtualAppliance: {
          cost: 0,
          requirements: '8 vCPU, 32GB RAM, 500GB Storage'
        }
      },
      infrastructure: {
        serverRequirements: {
          cpu: '8+ cores',
          ram: '32GB minimum',
          storage: '500GB SSD',
          cost: 10000
        },
        databaseLicense: 0,
        loadBalancer: 15000,
        backup: 8000
      }
    },
    
    security: {
      zeroTrustScore: 82,
      riskReduction: {
        unauthorized_access: 85,
        lateral_movement: 82,
        data_breach: 80,
        insider_threat: 78,
        compliance_violation: 84
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 72,
        insurance_discount: 18
      },
      securityFeatures: {
        mfa: true,
        continuous_verification: true,
        micro_segmentation: true,
        behavior_analytics: false,
        threat_intelligence: false,
        automated_response: true
      },
      complianceMapping: [
        {
          framework: 'NIST 800-53',
          controls: ['AC-2', 'AC-3', 'AC-4', 'AC-17', 'IA-2'],
          coverage: 85
        },
        {
          framework: 'ISO 27001',
          controls: ['A.9.1', 'A.9.2', 'A.9.4'],
          coverage: 82
        },
        {
          framework: 'HIPAA',
          controls: ['164.308', '164.310', '164.312'],
          coverage: 83
        }
      ]
    },
    
    scalability: {
      maxDevices: 100000,
      performanceAtScale: 'good',
      clusteringSupport: true,
      multiSiteSupport: true
    },
    
    implementation: {
      timeToValue: {
        poc: 21,
        small: 45,
        medium: 75,
        large: 150
      },
      complexity: 'high',
      requiredExpertise: ['Aruba networking', 'RADIUS', 'PKI basics'],
      migrationFromExisting: {
        effort: 'medium',
        downtime: 4,
        dataLoss: false
      }
    },
    
    operationalMetrics: {
      adminEffort: 15,
      automationLevel: 65,
      reportingCapabilities: 'advanced',
      apiAvailability: true,
      cloudManagement: false
    },
    
    vendorStability: {
      yearsInBusiness: 20,
      financialHealth: 'excellent',
      marketShare: 22,
      customerBase: 30000,
      acquisitionRisk: 'low'
    }
  },
  
  juniper_mist: {
    id: 'juniper_mist',
    name: 'Juniper Mist Access Assurance',
    category: 'cloud-native',
    marketPosition: 'challenger',
    deploymentModels: ['cloud'],
    
    pricing: {
      perDevice: {
        base: 72,
        volumeDiscounts: {
          500: 68,
          1000: 62,
          5000: 56,
          10000: 48
        }
      },
      licensing: {
        model: 'subscription',
        subscriptionTiers: {
          basic: 60,
          professional: 72,
          enterprise: 84
        }
      },
      addOns: [
        {
          name: 'AI-Driven Insights',
          description: 'Advanced AI/ML analytics',
          cost: 18,
          required: false
        },
        {
          name: 'Premium Analytics',
          description: 'Enhanced reporting and analytics',
          cost: 12,
          required: false
        }
      ],
      integrations: [
        {
          name: 'Marvis AI',
          type: 'native',
          cost: 0,
          complexity: 'low'
        },
        {
          name: 'ServiceNow',
          type: 'api',
          cost: 0,
          complexity: 'medium'
        }
      ],
      support: {
        basic: {
          included: true,
          cost: 0,
          coverage: '8x5 Support'
        },
        premium: {
          cost: 8000,
          coverage: '24x7 Support',
          sla: '2 hour response'
        },
        enterprise: {
          cost: 20000,
          coverage: '24x7 Priority',
          sla: '1 hour response',
          dedicatedTAM: true
        }
      },
      professionalServices: {
        implementation: {
          small: 5000,
          medium: 15000,
          large: 40000
        },
        training: {
          onsite: 3500,
          virtual: 2000,
          certification: 800
        },
        customization: 275
      },
      hardware: {
        required: false
      },
      infrastructure: {
        serverRequirements: {
          cpu: 'N/A - Cloud Native',
          ram: 'N/A - Cloud Native',
          storage: 'N/A - Cloud Native',
          cost: 0
        }
      }
    },
    
    security: {
      zeroTrustScore: 88,
      riskReduction: {
        unauthorized_access: 87,
        lateral_movement: 85,
        data_breach: 83,
        insider_threat: 82,
        compliance_violation: 86
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 78,
        insurance_discount: 20
      },
      securityFeatures: {
        mfa: true,
        continuous_verification: true,
        micro_segmentation: true,
        behavior_analytics: true,
        threat_intelligence: true,
        automated_response: true
      },
      complianceMapping: [
        {
          framework: 'SOC 2',
          controls: ['CC6.1', 'CC6.6', 'CC6.7', 'CC7.2'],
          coverage: 87
        },
        {
          framework: 'ISO 27001',
          controls: ['A.9.1', 'A.9.2', 'A.9.4', 'A.12.4'],
          coverage: 85
        }
      ]
    },
    
    scalability: {
      maxDevices: 50000,
      performanceAtScale: 'excellent',
      clusteringSupport: true,
      multiSiteSupport: true
    },
    
    implementation: {
      timeToValue: {
        poc: 3,
        small: 14,
        medium: 30,
        large: 60
      },
      complexity: 'medium',
      requiredExpertise: ['Cloud networking', 'AI/ML basics'],
      migrationFromExisting: {
        effort: 'medium',
        downtime: 0,
        dataLoss: false
      }
    },
    
    operationalMetrics: {
      adminEffort: 8,
      automationLevel: 85,
      reportingCapabilities: 'enterprise',
      apiAvailability: true,
      cloudManagement: true
    },
    
    vendorStability: {
      yearsInBusiness: 25,
      financialHealth: 'excellent',
      marketShare: 12,
      customerBase: 15000,
      acquisitionRisk: 'low'
    }
  },
  
  forescout: {
    id: 'forescout',
    name: 'Forescout',
    category: 'hybrid',
    marketPosition: 'leader',
    deploymentModels: ['on-premise', 'cloud', 'hybrid'],
    
    pricing: {
      perDevice: {
        base: 85,
        volumeDiscounts: {
          500: 80,
          1000: 74,
          5000: 68,
          10000: 60
        }
      },
      licensing: {
        model: 'subscription',
        subscriptionTiers: {
          basic: 70,
          professional: 85,
          enterprise: 100
        }
      },
      addOns: [
        {
          name: 'eyeExtend',
          description: 'OT/IoT visibility',
          cost: 20,
          required: false
        },
        {
          name: 'eyeInspect',
          description: 'OT security',
          cost: 30,
          required: false
        },
        {
          name: 'eyeSight',
          description: 'Asset inventory',
          cost: 15,
          required: false
        }
      ],
      integrations: [
        {
          name: 'ServiceNow',
          type: 'native',
          cost: 0,
          complexity: 'low'
        },
        {
          name: 'Splunk',
          type: 'api',
          cost: 0,
          complexity: 'medium'
        }
      ],
      support: {
        basic: {
          included: false,
          cost: 10000,
          coverage: '8x5 Support'
        },
        premium: {
          cost: 22000,
          coverage: '24x7 Support',
          sla: '4 hour response'
        },
        enterprise: {
          cost: 40000,
          coverage: '24x7 Priority',
          sla: '1 hour response',
          dedicatedTAM: true
        }
      },
      professionalServices: {
        implementation: {
          small: 20000,
          medium: 45000,
          large: 120000
        },
        training: {
          onsite: 4500,
          virtual: 2500,
          certification: 1000
        },
        customization: 325
      },
      hardware: {
        required: true,
        appliances: [
          {
            name: 'CT-R',
            capacity: 5000,
            cost: 25000,
            redundancy: true
          },
          {
            name: 'CT-1000',
            capacity: 25000,
            cost: 75000,
            redundancy: true
          },
          {
            name: 'CT-5000',
            capacity: 100000,
            cost: 150000,
            redundancy: true
          }
        ],
        virtualAppliance: {
          cost: 0,
          requirements: '16 vCPU, 64GB RAM, 1TB Storage'
        }
      },
      infrastructure: {
        serverRequirements: {
          cpu: '16+ cores',
          ram: '64GB minimum',
          storage: '1TB SSD',
          cost: 20000
        },
        databaseLicense: 15000,
        loadBalancer: 20000,
        backup: 12000
      }
    },
    
    security: {
      zeroTrustScore: 80,
      riskReduction: {
        unauthorized_access: 82,
        lateral_movement: 80,
        data_breach: 78,
        insider_threat: 75,
        compliance_violation: 82
      },
      breachCostSavings: {
        average_breach_cost: 4450000,
        reduction_percentage: 70,
        insurance_discount: 15
      },
      securityFeatures: {
        mfa: false,
        continuous_verification: true,
        micro_segmentation: true,
        behavior_analytics: false,
        threat_intelligence: true,
        automated_response: true
      },
      complianceMapping: [
        {
          framework: 'NIST CSF',
          controls: ['ID.AM', 'PR.AC', 'DE.CM'],
          coverage: 82
        },
        {
          framework: 'IEC 62443',
          controls: ['SR-1', 'SR-2', 'SR-3'],
          coverage: 85
        }
      ]
    },
    
    scalability: {
      maxDevices: 1000000,
      performanceAtScale: 'good',
      clusteringSupport: true,
      multiSiteSupport: true
    },
    
    implementation: {
      timeToValue: {
        poc: 14,
        small: 45,
        medium: 90,
        large: 180
      },
      complexity: 'high',
      requiredExpertise: ['Network architecture', 'Security operations', 'OT/IoT'],
      migrationFromExisting: {
        effort: 'high',
        downtime: 2,
        dataLoss: false
      }
    },
    
    operationalMetrics: {
      adminEffort: 18,
      automationLevel: 70,
      reportingCapabilities: 'advanced',
      apiAvailability: true,
      cloudManagement: true
    },
    
    vendorStability: {
      yearsInBusiness: 20,
      financialHealth: 'good',
      marketShare: 15,
      customerBase: 20000,
      acquisitionRisk
