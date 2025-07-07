// lib/vendors/comprehensive-vendor-data.ts

import type { VendorData } from "@/types/vendor-analysis"

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
    riskProfile: "CRITICAL" as const,
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
    riskProfile: "CRITICAL" as const,
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
    riskProfile: "HIGH" as const,
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
    riskProfile: "HIGH" as const,
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
    riskProfile: "MEDIUM" as const,
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
    riskProfile: "CRITICAL" as const,
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
export const COMPREHENSIVE_VENDOR_DATA: Record<string, VendorData> = {
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
          deployment: 2000,
          migration: 0,
        },
        operational: {
          fteRequired: 0.1,
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
          deployment: 2000,
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
    },

    breachPrevention: {
      effectiveness: 92,
      riskReduction: 89,
      mttrReduction: 85,
    },
  },

  // CISCO ISE - Enterprise Leader
  CISCO_ISE: {
    name: "Cisco Identity Services Engine",
    category: "Enterprise NAC",
    architecture: "On-Premise/Hybrid",
    vendorLockIn: "EXTREME",

    deploymentModels: {
      ON_PREMISE: {
        available: true,
        description: "Traditional appliance-based deployment",
        deploymentTime: "6-9 months",
        complexity: "VERY COMPLEX",
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
      multiTenant: false,

      mfa: true,
      behaviorAnalytics: false,
      microSegmentation: true,
      dynamicVlan: true,
    },

    costs: {
      [PROJECTIONS.ONE_YEAR]: {
        software: {
          base: 50000,
          plusLicense: 25000,
          apexLicense: 37500,
          deviceAdmin: 17500,
          support: 26000,
        },
        hardware: {
          appliances: 95000,
          infrastructure: 25000,
          networking: 15000,
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
          licensing_complexity: 15000,
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
          refresh: 30000,
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
          appliances: 190000,
          infrastructure: 50000,
          networking: 30000,
          refresh: 60000,
        },
        implementation: {
          professionalServices: 125000,
          deployment: 50000,
          migration: 75000,
          training: 25000,
          upgrades: 50000,
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
  },

  // ARUBA CLEARPASS - Value Leader
  ARUBA_CLEARPASS: {
    name: "Aruba ClearPass",
    category: "Enterprise NAC",
    architecture: "On-Premise/Virtual",
    vendorLockIn: "MODERATE",

    deploymentModels: {
      ON_PREMISE: {
        available: true,
        description: "Hardware appliances C1000/C2000/C3000",
        deploymentTime: "3-6 months",
        complexity: "COMPLEX",
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
          refresh: 0,
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
    },
  },

  // FORESCOUT - IoT/OT Specialist
  FORESCOUT: {
    name: "Forescout Platform",
    category: "Agentless NAC",
    architecture: "Hybrid",
    vendorLockIn: "LOW",

    deploymentModels: {
      ON_PREMISE: {
        available: true,
        description: "Physical/virtual appliances",
        deploymentTime: "2-4 months",
        complexity: "COMPLEX",
      },
      CLOUD: {
        available: true,
        description: "Forescout Cloud (limited regions)",
        deploymentTime: "1-2 months",
        complexity: "MODERATE",
      },
    },

    capabilities: {
      wirelessNAC: true,
      wiredNAC: true,
      dot1x: true,
      macAuth: true,
      webAuth: false,
      certificateAuth: false,

      riskBasedAccess: true,
      zeroTrust: true,
      continuousCompliance: true,
      deviceTrust: true,
      iotProfiling: true,
      iotFingerprinting: true,
      guestAccess: false,
      byodOnboarding: false,

      cloudPKI: false,
      tacacs: false,
      conditionalAppAccess: false,
      apiAccess: true,
      multiTenant: true,

      mfa: false,
      behaviorAnalytics: true,
      microSegmentation: true,
      dynamicVlan: true,
    },

    costs: {
      [PROJECTIONS.THREE_YEAR]: {
        software: {
          base: 105000,
          eyeExtend: 31500,
          eyeSegment: 42000,
          support: 35700,
        },
        hardware: {
          appliances: 25000,
          infrastructure: 15000,
          networking: 10000,
        },
        implementation: {
          professionalServices: 45000,
          deployment: 20000,
          migration: 15000,
          training: 10000,
        },
        operational: {
          fteRequired: 2,
          totalFteCost: 780000,
          trainingCost: 45000,
          certificationCost: 30000,
        },
        hidden: {
          complexity: 60000,
          integrationCosts: 75000,
          scalingCosts: 30000,
        },
        total: 1329200,
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
      complianceAutomation: 150000,
      breachPrevention: 4090000,
      operationalEfficiency: 75000,
      auditPreparation: 50000,
      medicalDeviceManagement: 100000,
    },
    totalAnnualBenefit: 4465000,
    threeYearROI: 8956,
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
    threeYearROI: 6742,
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
    threeYearROI: 6082,
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
    threeYearROI: 3608,
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
    threeYearROI: 4123,
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
    threeYearROI: 10103,
  },
}

// Executive decision matrix
export const EXECUTIVE_DECISION_MATRIX = {
  portnoxAdvantages: {
    timeToValue: {
      portnox: "1-7 days",
      traditional: "3-9 months",
      advantage: "95% faster",
    },
    totalCost: {
      portnox: 146000,
      ciscoISE: 2263000,
      arubaClearPass: 913200,
      savings: "84-94%",
    },
    operationalEffort: {
      portnox: 0.1,
      traditional: 2.5,
      reduction: "96%",
    },
    securityPosture: {
      portnox: 95,
      traditional: 75,
      improvement: "27%",
    },
    scalability: {
      portnox: "Infinite - cloud native",
      traditional: "Hardware limited",
      advantage: "No infrastructure scaling",
    },
    innovation: {
      portnox: "Continuous updates",
      traditional: "Annual releases",
      advantage: "Always current",
    },
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
