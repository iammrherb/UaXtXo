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
    name: "Portnox CLEAR",
    category: "Cloud-Native NAC",
    architecture: "Pure SaaS",
    vendorLockIn: "NONE",

    deploymentModels: {
      CLOUD: {
        available: true,
        description: "Pure cloud-native SaaS, no infrastructure required",
        deploymentTime: "30 minutes to 7 days",
        complexity: "SIMPLE",
      },
      HYBRID: {
        available: false,
        description: "Not applicable - pure cloud solution",
      },
      ON_PREMISE: {
        available: false,
        description: "Not available - cloud-only solution",
      },
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
      realTimeAlerts: true,
    },

    costs: {
      [PROJECTIONS.ONE_YEAR]: {
        software: {
          base: 36000, // $60/device/year for 500 devices
          additionalModules: 0, // Everything included
          support: 0, // Included
          training: 0, // Free online training
        },
        hardware: {
          appliances: 0,
          infrastructure: 0,
          networking: 0,
        },
        implementation: {
          professionalServices: 0, // Self-service possible
          deployment: 2000, // Optional QuickStart
          migration: 0, // Free migration tools
        },
        operational: {
          fteRequired: 0.1, // 0.1 FTE for 500 devices
          avgSalary: 120000,
          trainingDays: 1,
          certificationCost: 0,
        },
        hidden: {
          downtime: 0,
          integrationCosts: 0,
          scalingCosts: 0,
        },
        total: 50000,
      },
      [PROJECTIONS.THREE_YEAR]: {
        software: {
          base: 108000,
          additionalModules: 0,
          support: 0,
          training: 0,
        },
        hardware: {
          appliances: 0,
          infrastructure: 0,
          networking: 0,
        },
        implementation: {
          professionalServices: 0,
          deployment: 2000, // One-time
          migration: 0,
        },
        operational: {
          fteRequired: 0.1,
          totalFteCost: 36000,
          trainingCost: 0,
          certificationCost: 0,
        },
        hidden: {
          downtime: 0,
          integrationCosts: 0,
          scalingCosts: 0,
        },
        total: 146000,
      },
      [PROJECTIONS.FIVE_YEAR]: {
        software: {
          base: 180000,
          additionalModules: 0,
          support: 0,
          training: 0,
        },
        hardware: {
          appliances: 0,
          infrastructure: 0,
          networking: 0,
          refresh: 0,
        },
        implementation: {
          professionalServices: 0,
          deployment: 2000,
          migration: 0,
        },
        operational: {
          fteRequired: 0.1,
          totalFteCost: 60000,
          trainingCost: 0,
          certificationCost: 0,
        },
        hidden: {
          downtime: 0,
          integrationCosts: 0,
          scalingCosts: 0,
        },
        total: 242000,
      },
    },

    complianceSupport: {
      HIPAA: {
        supported: true,
        coverage: 98,
        features: ["Access Controls", "Audit Logs", "Encryption", "Automatic Logoff"],
      },
      PCI_DSS: {
        supported: true,
        coverage: 96,
        features: ["Network Segmentation", "Access Control", "Monitoring", "Strong Auth"],
      },
      SOX: {
        supported: true,
        coverage: 95,
        features: ["Audit Trails", "Access Management", "Change Control"],
      },
      NIST_800_53: {
        supported: true,
        coverage: 94,
        features: ["Continuous Monitoring", "Risk Assessment", "Incident Response"],
      },
      GDPR: {
        supported: true,
        coverage: 97,
        features: ["Data Protection", "Access Rights", "Privacy by Design"],
      },
    },

    breachPrevention: {
      effectiveness: 92,
      riskReduction: 89,
      mttrReduction: 85,
      specificScenarios: [
        "Lateral movement prevention through micro-segmentation",
        "Compromised credential detection via risk scoring",
        "IoT device isolation and profiling",
        "Zero Trust continuous verification",
        "API-based threat response automation",
      ],
    },
  },

  // CISCO ISE - Enterprise Leader
  CISCO_ISE: {
    name: "Cisco Identity Services Engine",
    category: "Enterprise NAC",
    architecture: "On-Premise/Hybrid",
    vendorLockIn: "EXTREME - Best with full Cisco stack",

    deploymentModels: {
      ON_PREMISE: {
        available: true,
        description: "Traditional appliance-based deployment",
        deploymentTime: "6-9 months",
        complexity: "VERY COMPLEX",
        requirements: {
          appliances: ["SNS-3515", "SNS-3595", "SNS-3615"],
          infrastructure: ["Load Balancers", "Oracle DB", "SPAN/TAP"],
          networking: ["Cisco Switches recommended", "DNA Center for full features"],
        },
      },
      HYBRID: {
        available: true,
        description: "On-prem with cloud pxGrid",
        deploymentTime: "9-12 months",
        complexity: "EXTREMELY COMPLEX",
      },
      CLOUD: {
        available: false,
        description: "Limited cloud options, not true cloud NAC",
      },
    },

    capabilities: {
      wirelessNAC: true,
      wiredNAC: true,
      dot1x: true,
      macAuth: true,
      webAuth: true,
      certificateAuth: true,

      riskBasedAccess: false,
      zeroTrust: false, // Retrofitted, not native
      continuousCompliance: true,
      deviceTrust: true,
      iotProfiling: true,
      iotFingerprinting: true,
      guestAccess: true,
      byodOnboarding: true,

      cloudPKI: false,
      tacacs: true, // Requires Device Admin license
      conditionalAppAccess: false,
      apiAccess: true, // Requires pxGrid/Apex license
      multiTenant: false, // Very limited

      mfa: true,
      behaviorAnalytics: false,
      microSegmentation: true, // Via TrustSec
      dynamicVlan: true,
    },

    costs: {
      [PROJECTIONS.ONE_YEAR]: {
        software: {
          base: 50000, // Essentials tier
          plusLicense: 25000, // Required for profiling
          apexLicense: 37500, // Required for pxGrid
          deviceAdmin: 17500, // TACACS+
          support: 26000, // 20% annual
        },
        hardware: {
          appliances: 95000, // 2x SNS-3595 for HA
          infrastructure: 25000, // Load balancers
          networking: 15000, // SPAN/TAP infrastructure
        },
        implementation: {
          professionalServices: 125000,
          deployment: 50000,
          migration: 75000,
          training: 25000,
        },
        operational: {
          fteRequired: 2.5,
          avgSalary: 140000,
          trainingDays: 20,
          certificationCost: 15000,
        },
        hidden: {
          downtime: 25000,
          integrationCosts: 35000,
          scalingCosts: 20000,
          licensing_complexity: 15000, // Audit and true-up costs
        },
        total: 751000,
      },
      [PROJECTIONS.THREE_YEAR]: {
        software: {
          base: 150000,
          plusLicense: 75000,
          apexLicense: 112500,
          deviceAdmin: 52500,
          support: 78000,
        },
        hardware: {
          appliances: 95000,
          infrastructure: 25000,
          networking: 15000,
          refresh: 30000, // Year 3 refresh
        },
        implementation: {
          professionalServices: 125000,
          deployment: 50000,
          migration: 75000,
          training: 25000,
        },
        operational: {
          fteRequired: 2.5,
          totalFteCost: 1050000,
          trainingCost: 45000,
          certificationCost: 45000,
        },
        hidden: {
          downtime: 75000,
          integrationCosts: 35000,
          scalingCosts: 60000,
          licensing_complexity: 45000,
        },
        total: 2263000,
      },
      [PROJECTIONS.FIVE_YEAR]: {
        software: {
          base: 250000,
          plusLicense: 125000,
          apexLicense: 187500,
          deviceAdmin: 87500,
          support: 130000,
        },
        hardware: {
          appliances: 190000, // Full refresh in year 4
          infrastructure: 50000,
          networking: 30000,
          refresh: 60000,
        },
        implementation: {
          professionalServices: 125000,
          deployment: 50000,
          migration: 75000,
          training: 25000,
          upgrades: 50000, // Major version upgrades
        },
        operational: {
          fteRequired: 2.5,
          totalFteCost: 1750000,
          trainingCost: 75000,
          certificationCost: 75000,
        },
        hidden: {
          downtime: 125000,
          integrationCosts: 35000,
          scalingCosts: 100000,
          licensing_complexity: 75000,
        },
        total: 3670000,
      },
    },

    complianceSupport: {
      HIPAA: {
        supported: true,
        coverage: 85,
        features: ["Access Controls", "Audit Logs", "Complex Config Required"],
      },
      PCI_DSS: {
        supported: true,
        coverage: 88,
        features: ["TrustSec Segmentation", "Complex Implementation"],
      },
    },

    breachPrevention: {
      effectiveness: 75,
      riskReduction: 72,
      mttrReduction: 45,
      limitations: [
        "Complex to implement properly",
        "High false positive rate",
        "Requires extensive tuning",
        "Limited cloud visibility",
      ],
    },
  },

  // ARUBA CLEARPASS - Value Leader
  ARUBA_CLEARPASS: {
    name: "Aruba ClearPass",
    category: "Enterprise NAC",
    architecture: "On-Premise/Virtual",
    vendorLockIn: "MODERATE - Best with Aruba infrastructure",

    deploymentModels: {
      ON_PREMISE: {
        available: true,
        description: "Hardware appliances C1000/C2000/C3000",
        deploymentTime: "3-6 months",
        complexity: "COMPLEX",
      },
      VIRTUAL: {
        available: true,
        description: "Virtual appliances CPVM series",
        deploymentTime: "2-4 months",
        complexity: "MODERATE",
      },
      CLOUD: {
        available: false,
        description: "Device Insight cloud service only",
      },
    },

    capabilities: {
      wirelessNAC: true,
      wiredNAC: true,
      dot1x: true,
      macAuth: true,
      webAuth: true,
      certificateAuth: true,

      riskBasedAccess: false,
      zeroTrust: false,
      continuousCompliance: true,
      deviceTrust: true,
      iotProfiling: true,
      iotFingerprinting: true,
      guestAccess: true,
      byodOnboarding: true,

      cloudPKI: false,
      tacacs: true,
      conditionalAppAccess: false,
      apiAccess: true,
      multiTenant: true,

      mfa: true,
      behaviorAnalytics: false,
      microSegmentation: true,
      dynamicVlan: true,
    },

    costs: {
      [PROJECTIONS.ONE_YEAR]: {
        software: {
          base: 14000, // 500 endpoint license
          onguard: 12500, // Compliance module
          guest: 3000,
          onboard: 5000,
          support: 6900,
        },
        hardware: {
          appliances: 45000, // C2000 appliance
          infrastructure: 10000,
          networking: 8000,
        },
        implementation: {
          professionalServices: 35000,
          deployment: 15000,
          migration: 20000,
          training: 8000,
        },
        operational: {
          fteRequired: 1.5,
          avgSalary: 120000,
          trainingDays: 10,
          certificationCost: 8000,
        },
        hidden: {
          downtime: 10000,
          integrationCosts: 15000,
          scalingCosts: 5000,
        },
        total: 320400,
      },
      [PROJECTIONS.THREE_YEAR]: {
        software: {
          base: 42000,
          onguard: 37500,
          guest: 9000,
          onboard: 15000,
          support: 20700,
        },
        hardware: {
          appliances: 45000,
          infrastructure: 10000,
          networking: 8000,
          refresh: 0, // No refresh needed
        },
        implementation: {
          professionalServices: 35000,
          deployment: 15000,
          migration: 20000,
          training: 8000,
        },
        operational: {
          fteRequired: 1.5,
          totalFteCost: 540000,
          trainingCost: 24000,
          certificationCost: 24000,
        },
        hidden: {
          downtime: 30000,
          integrationCosts: 15000,
          scalingCosts: 15000,
        },
        total: 913200,
      },
      [PROJECTIONS.FIVE_YEAR]: {
        software: {
          base: 70000,
          onguard: 62500,
          guest: 15000,
          onboard: 25000,
          support: 34500,
        },
        hardware: {
          appliances: 90000, // Refresh in year 4
          infrastructure: 20000,
          networking: 16000,
          refresh: 45000,
        },
        implementation: {
          professionalServices: 35000,
          deployment: 15000,
          migration: 20000,
          training: 8000,
        },
        operational: {
          fteRequired: 1.5,
          totalFteCost: 900000,
          trainingCost: 40000,
          certificationCost: 40000,
        },
        hidden: {
          downtime: 50000,
          integrationCosts: 15000,
          scalingCosts: 25000,
        },
        total: 1515000,
      },
    },
  },
}

// Migration cost calculations
export const MIGRATION_COSTS = {
  FROM_NO_NAC: {
    description: "Implementing NAC from scratch",
    factors: {
      certificateInfrastructure: 25000,
      networkReadiness: 15000,
      switchUpgrades: 30000,
      wirelessUpgrades: 20000,
      processDocumentation: 10000,
      pilotTesting: 15000,
      userTraining: 20000,
      helpDeskPrep: 10000,
    },
    portnoxAdvantage: {
      eliminated: ["certificateInfrastructure", "switchUpgrades"],
      reduced: {
        networkReadiness: 5000,
        pilotTesting: 2000,
        userTraining: 5000,
      },
      totalSavings: 93000,
    },
  },
  FROM_EXISTING_NAC: {
    description: "Migrating from legacy NAC",
    factors: {
      parallelOperation: 50000,
      policyMigration: 30000,
      deviceReEnrollment: 25000,
      integrationRework: 20000,
      testingValidation: 15000,
      rollbackPlanning: 10000,
    },
    portnoxAdvantage: {
      automated: ["policyMigration", "deviceReEnrollment"],
      reduced: {
        parallelOperation: 10000,
        integrationRework: 5000,
        testingValidation: 5000,
      },
      migrationTools: "FREE",
      totalSavings: 95000,
    },
  },
}

// Industry-specific ROI calculations
export const INDUSTRY_ROI = {
  HEALTHCARE: {
    portnoxBenefits: {
      complianceAutomation: 150000, // Annual savings
      breachPrevention: 4090000, // Based on avg breach cost
      operationalEfficiency: 75000,
      auditPreparation: 50000,
      medicalDeviceManagement: 100000,
    },
    totalAnnualBenefit: 4465000,
    threeYearROI: 8956, // Percent
  },
  FINANCIAL: {
    portnoxBenefits: {
      complianceAutomation: 200000,
      breachPrevention: 2750000,
      operationalEfficiency: 100000,
      auditPreparation: 75000,
      tradingFloorSecurity: 150000,
    },
    totalAnnualBenefit: 3275000,
    threeYearROI: 6742, // Percent
  },
  MANUFACTURING: {
    portnoxBenefits: {
      otSecurity: 250000,
      breachPrevention: 2200000,
      productionUptime: 300000,
      ipProtection: 150000,
      supplierAccess: 50000,
    },
    totalAnnualBenefit: 2950000,
    threeYearROI: 6082, // Percent
  },
  RETAIL: {
    portnoxBenefits: {
      pciCompliance: 100000,
      breachPrevention: 1500000,
      posProtection: 75000,
      guestWifiSecurity: 25000,
      multiSiteManagement: 50000,
    },
    totalAnnualBenefit: 1750000,
    threeYearROI: 3608, // Percent
  },
  EDUCATION: {
    portnoxBenefits: {
      byodManagement: 50000,
      breachPrevention: 1775000,
      complianceAutomation: 30000,
      operationalSavings: 100000,
      scalability: 45000,
    },
    totalAnnualBenefit: 2000000,
    threeYearROI: 4123, // Percent
  },
  GOVERNMENT: {
    portnoxBenefits: {
      securityPosture: 300000,
      breachPrevention: 4000000,
      complianceAutomation: 250000,
      citizenDataProtection: 200000,
      operationalEfficiency: 150000,
    },
    totalAnnualBenefit: 4900000,
    threeYearROI: 10103, // Percent
  },
}

// Portnox unique differentiators
export const PORTNOX_DIFFERENTIATORS = {
  technicalAdvantages: [
    "True cloud-native architecture - no infrastructure",
    "API-first design enabling automation",
    "Risk-based continuous authentication",
    "Vendor-agnostic - works with any infrastructure",
    "Zero CVEs since inception",
    "Sub-5ms authentication latency",
    "Global redundancy and 99.99% uptime",
    "Automatic scaling without hardware",
  ],
  businessAdvantages: [
    "Single license includes all features",
    "No professional services required",
    "Self-service deployment possible",
    "Predictable OpEx model",
    "No vendor lock-in",
    "Immediate ROI - days not months",
    "Free migration tools and support",
    "Reduced cyber insurance premiums",
  ],
  operationalAdvantages: [
    "90% reduction in admin time",
    "No maintenance windows",
    "Automated compliance reporting",
    "Real-time threat response",
    "Intuitive management interface",
    "No specialized training required",
    "Built-in best practices",
    "Proactive support included",
  ],
}

// Deployment timeline comparisons
export const DEPLOYMENT_TIMELINES = {
  portnox: {
    planning: "1-2 days",
    poc: "1 hour",
    pilot: "1-3 days",
    production: "3-7 days",
    total: "1-2 weeks",
    riskLevel: "MINIMAL",
  },
  ciscoISE: {
    planning: "4-8 weeks",
    poc: "4-6 weeks",
    pilot: "8-12 weeks",
    production: "12-16 weeks",
    total: "6-9 months",
    riskLevel: "HIGH",
  },
  arubaClearPass: {
    planning: "2-4 weeks",
    poc: "2-3 weeks",
    pilot: "4-6 weeks",
    production: "6-8 weeks",
    total: "3-6 months",
    riskLevel: "MODERATE",
  },
  traditionalAverage: {
    planning: "3-6 weeks",
    poc: "3-4 weeks",
    pilot: "6-8 weeks",
    production: "8-12 weeks",
    total: "4-7 months",
    riskLevel: "MODERATE-HIGH",
  },
}

// Support and training comparisons
export const SUPPORT_TRAINING_COMPARISON = {
  portnox: {
    training: {
      cost: 0,
      duration: "2 hours",
      certification: "Not required",
      ongoing: "Included webinars",
    },
    support: {
      included: true,
      responseTime: "< 1 hour",
      availability: "24/7",
      dedicatedTam: true,
    },
  },
  ciscoISE: {
    training: {
      cost: 25000,
      duration: "5 days",
      certification: 15000,
      ongoing: 10000, // Annual
    },
    support: {
      included: false,
      cost: 78000, // Annual
      responseTime: "4-24 hours",
      availability: "Business hours",
    },
  },
  industryAverage: {
    training: {
      cost: 12000,
      duration: "3 days",
      certification: 8000,
      ongoing: 5000,
    },
    support: {
      included: false,
      cost: 35000, // Annual
      responseTime: "4-8 hours",
      availability: "Business hours",
    },
  },
}
