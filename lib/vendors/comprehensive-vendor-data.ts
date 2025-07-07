// Baseline: 500 devices
const BASELINE_DEVICES = 500

// Time projections
const PROJECTIONS = {
  ONE_YEAR: 1,
  THREE_YEAR: 3,
  FIVE_YEAR: 5,
}

// Industry definitions with compliance requirements
export const INDUSTRIES = {
  HEALTHCARE: {
    name: "Healthcare",
    regulations: ["HIPAA", "HITECH", "FDA 21 CFR Part 11"],
    riskProfile: "CRITICAL",
    avgBreachCost: 10930000,
    specificRequirements: {
      medicalDeviceManagement: true,
      ePHIProtection: true,
      auditLogging: true,
      encryption: true,
      accessControls: true,
    },
  },
  FINANCIAL: {
    name: "Financial Services",
    regulations: ["PCI-DSS", "SOX", "GLBA", "BASEL III", "FINRA"],
    riskProfile: "CRITICAL",
    avgBreachCost: 5970000,
    specificRequirements: {
      transactionSecurity: true,
      segregationOfDuties: true,
      cryptographicControls: true,
      incidentResponse: true,
      dataRetention: true,
    },
  },
  MANUFACTURING: {
    name: "Manufacturing",
    regulations: ["NIST 800-171", "ISO 27001", "CIS Controls"],
    riskProfile: "HIGH",
    avgBreachCost: 4770000,
    specificRequirements: {
      otItConvergence: true,
      supplyChainSecurity: true,
      ipProtection: true,
      productionContinuity: true,
      iotManagement: true,
    },
  },
  RETAIL: {
    name: "Retail",
    regulations: ["PCI-DSS", "GDPR", "CCPA"],
    riskProfile: "HIGH",
    avgBreachCost: 3280000,
    specificRequirements: {
      posSystemSecurity: true,
      customerDataProtection: true,
      multiLocationManagement: true,
      guestWiFi: true,
      inventorySystemProtection: true,
    },
  },
  EDUCATION: {
    name: "Education",
    regulations: ["FERPA", "COPPA", "CIPA"],
    riskProfile: "MEDIUM",
    avgBreachCost: 3860000,
    specificRequirements: {
      byodManagement: true,
      studentPrivacy: true,
      contentFiltering: true,
      chromebookSupport: true,
      seasonalScaling: true,
    },
  },
  GOVERNMENT: {
    name: "Government",
    regulations: ["FISMA", "FedRAMP", "NIST 800-53", "CJIS"],
    riskProfile: "CRITICAL",
    avgBreachCost: 8730000,
    specificRequirements: {
      clearanceBasedAccess: true,
      airgappedNetworks: true,
      citizenDataProtection: true,
      continuityOfOperations: true,
      supplyChainVerification: true,
    },
  },
}

// Comprehensive breach incidents that NAC could have prevented
export const PREVENTABLE_BREACHES = {
  TARGET_2013: {
    name: "Target Corporation (2013)",
    impact: "110 million records",
    cost: 292000000,
    vector: "HVAC contractor credentials",
    preventable_by: ["Network Segmentation", "Vendor Access Control", "Device Profiling", "MFA"],
    description: "Attackers gained access through HVAC vendor, then moved laterally to POS systems",
  },
  EQUIFAX_2017: {
    name: "Equifax (2017)",
    impact: "147 million records",
    cost: 1400000000,
    vector: "Unpatched Apache Struts",
    preventable_by: ["Continuous Compliance", "Network Segmentation", "Device Trust", "Zero Trust"],
    description: "Unpatched vulnerability allowed access, proper NAC would have isolated vulnerable systems",
  },
  COLONIAL_PIPELINE_2021: {
    name: "Colonial Pipeline (2021)",
    impact: "Operations shutdown",
    cost: 4400000,
    vector: "Compromised VPN credentials",
    preventable_by: ["MFA", "Certificate-based Auth", "Risk-based Access", "Device Trust"],
    description: "Legacy VPN without MFA, NAC would have required device verification",
  },
  SOLARWINDS_2020: {
    name: "SolarWinds (2020)",
    impact: "18,000 organizations",
    cost: 90000000,
    vector: "Supply chain attack",
    preventable_by: ["Zero Trust", "Micro-segmentation", "Continuous Monitoring", "API Security"],
    description: "NAC micro-segmentation would have limited blast radius of compromise",
  },
}

// Comprehensive vendor data with all cost factors
export const COMPREHENSIVE_VENDOR_DATA = {
  // PORTNOX CLEAR - Cloud-Native Leader
  PORTNOX: {
    name: 'Portnox CLEAR',
    category: 'Cloud-Native NAC',
    architecture: 'Pure SaaS',
    vendorLockIn: 'NONE',
    
    deploymentModels: {
      CLOUD: {
        available: true,
        description: 'Pure cloud-native SaaS, no infrastructure required',
        deploymentTime: '30 minutes to 7 days',
        complexity: 'SIMPLE'
      },
      HYBRID: {
        available: false,
        description: 'Not applicable - pure cloud solution'
      },
      ON_PREMISE: {
        available: false,
        description: 'Not available - cloud-only solution'
      }
    },

    capabilities: {
      // Core NAC Features
      wirelessNAC: true,
      wiredNAC: true,
      dot1x: true,
      macAuth: true,
      webAuth: true,
      certificateAuth: true,
      
      // Advanced Features
      riskBasedAccess: true,
      zeroTrust: true,
      continuousCompliance: true,
      deviceTrust: true,
      iotProfiling: true,
      iotFingerprinting: true,
      guestAccess: true,
      byodOnboarding: true,
      
      // Cloud & Modern Features
      cloudPKI: true,
      tacacs: true,
      conditionalAppAccess: true,
      apiAccess: true,
      multiTenant: true,
      
      // Security Features
      mfa: true,
      behaviorAnalytics: true,
      microSegmentation: true,
      dynamicVlan: true,
      
      // Compliance & Reporting
      complianceReporting: true,
      auditLogging: true,
      realTimeAlerts: true
    },

    costs: {
      [PROJECTIONS.ONE_YEAR]: {
        software: {
          base: 36000, // $60/device/year for 500 devices
          additionalModules: 0, // Everything included
          support: 0, // Included
          training: 0 // Free online training
        },
        hardware: {
          appliances: 0,
          infrastructure: 0,
          networking: 0
        },
        implementation: {
          professionalServices: 0, // Self-service possible
          deployment: 2000, // Optional QuickStart
          migration: 0 // Free migration tools
        },
        operational: {
          fteRequired: 0.1, // 0.1 FTE for 500 devices
          avgSalary: 120000,
          trainingDays: 1,
          certificationCost: 0
        },
        hidden: {
          downtime: 0,
          integrationCosts: 0,
          scalingCosts: 0
        },
        total: 50000
      },
      [PROJECTIONS.THREE_YEAR]: {
        software: {
          base: 108000,
          additionalModules: 0,
          support: 0,
          training: 0
        },
        hardware: {
          appliances: 0,
          infrastructure: 0,
          networking: 0
        },
        implementation: {
          professionalServices: 0,
          deployment: 2000, // One-time
          migration: 0
        },
        operational: {
          fteRequired: 0.1,
          totalFteCost: 36000,
          trainingCost: 0,
          certificationCost: 0
        },
        hidden: {
          downtime: 0,
          integrationCosts: 0,
          scalingCosts: 0
        },
        total: 146000
      },
      [PROJECTIONS.FIVE_YEAR]: {
        software: {
          base: 180000,
          additionalModules: 0,
          support: 0,
          training: 0
        },
        hardware: {
          appliances: 0,
          infrastructure: 0,
          networking: 0,
          refresh: 0
        },
        implementation: {
          professionalServices: 0,
          deployment: 2000,
          migration: 0
        },
        operational: {
          fteRequired: 0.1,
          totalFteCost: 60000,
          trainingCost: 0,
          certificationCost: 0
        },
        hidden: {
          downtime: 0,
          integrationCosts: 0,
          scalingCosts: 0
        },
        total: 242000
      }
    },

    complianceSupport: {
      HIPAA: {
        supported: true,
        coverage: 98,
        features: ['Access Controls', 'Audit Logs', 'Encryption', 'Automatic Logoff']
      },
      PCI_DSS: {
        supported: true,
        coverage: 96,
        features: ['Network Segmentation', 'Access Control', 'Monitoring', 'Strong Auth']
      },
      SOX: {
        supported: true,
        coverage: 95,
        features: ['Audit Trails', 'Access Management', 'Change Control']
      },
      NIST_800_53: {
        supported: true,
        coverage: 94,
        features: ['Continuous Monitoring', 'Risk Assessment', 'Incident Response']
      },
      GDPR: {
        supported: true,
        coverage: 97,
        features: ['Data Protection', 'Access Rights', 'Privacy by Design']
      }
    },

    breachPrevention: {
      effectiveness: 92,
      riskReduction: 89,
      mttrReduction: 85,
      specificScenarios: [
        'Lateral movement prevention through micro-segmentation',
        'Compromised credential detection via risk scoring',
        'IoT device isolation and profiling',
        'Zero Trust continuous verification',
        'API-based threat response automation'
      ]
    }
  },

// CISCO\
