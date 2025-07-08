// lib/vendors/comprehensive-vendor-data.ts

export interface VendorData {
  name: string
  category: string
  architecture: string
  vendorLockIn: "NONE" | "LOW" | "MODERATE" | "HIGH" | "EXTREME"
  deploymentModels: {
    CLOUD?: DeploymentModel
    HYBRID?: DeploymentModel
    ON_PREMISE?: DeploymentModel
  }
  capabilities: VendorCapabilities
  costs: {
    1: CostStructure
    3: CostStructure
    5: CostStructure
  }
  complianceSupport?: ComplianceSupport
  breachPrevention?: BreachPreventionMetrics
  securityConcerns?: SecurityConcerns
}

export interface DeploymentModel {
  available: boolean
  description: string
  deploymentTime?: string
  complexity?: "SIMPLE" | "MODERATE" | "COMPLEX" | "VERY COMPLEX" | "EXTREMELY COMPLEX"
  requirements?: {
    appliances?: string[]
    infrastructure?: string[]
    networking?: string[]
    subscriptions?: string[]
    expertise?: string
    support?: string
  }
  limitations?: string[]
  criticalNote?: string
}

export interface VendorCapabilities {
  // Core NAC Features
  wirelessNAC: boolean
  wiredNAC: boolean
  dot1x: boolean
  macAuth: boolean
  webAuth: boolean
  certificateAuth: boolean

  // Advanced Features
  riskBasedAccess: boolean
  zeroTrust: boolean
  continuousCompliance: boolean
  deviceTrust: boolean
  iotProfiling: boolean
  iotFingerprinting: boolean
  guestAccess: boolean
  byodOnboarding: boolean

  // Cloud & Modern Features
  cloudPKI: boolean
  tacacs: boolean
  conditionalAppAccess: boolean
  apiAccess: boolean
  multiTenant: boolean

  // Security Features
  mfa: boolean
  behaviorAnalytics: boolean
  microSegmentation: boolean
  dynamicVlan: boolean

  // Compliance & Reporting
  complianceReporting?: boolean
  auditLogging?: boolean
  realTimeAlerts?: boolean
}

export interface CostStructure {
  software: {
    base: number
    additionalModules?: number
    support?: number
    training?: number
    plusLicense?: number
    apexLicense?: number
    deviceAdmin?: number
    onguard?: number
    guest?: number
    onboard?: number
    accessAssurance?: number
    wifiAssurance?: number
    marvisVNA?: number
    eyeExtend?: number
    eyeSegment?: number
    windowsServer?: number
    cals?: number
    azureADPremium?: number
    intune?: number
    pki?: number
    licenses?: number
    perpetual?: number
    subscription?: number
    cloudManagement?: number
    cloudvision?: number
  }
  hardware: {
    appliances: number
    infrastructure?: number
    networking?: number
    servers?: number
    mistAPs?: number
    mistSwitches?: number
    merakiAPs?: number
    merakiSwitches?: number
    aristaSwitches?: number
    refresh?: number
  }
  implementation: {
    professionalServices: number
    deployment?: number
    migration?: number
    training?: number
    upgrades?: number
  }
  operational: {
    fteRequired: number
    avgSalary?: number
    totalFteCost?: number
    trainingDays?: number
    trainingCost?: number
    certificationCost?: number
  }
  hidden?: {
    downtime?: number
    integrationCosts?: number
    scalingCosts?: number
    licensing_complexity?: number
    limitations?: number
    complexity?: number
    scalingIssues?: number
    missingFeatures?: number
    premiumPricing?: number
    limitedFeatures?: number
    vendorLockIn?: number
    communitySupport?: number
    customization?: number
    migrationRisk?: number
    securityConcerns?: number
  }
  total: number
}

export interface ComplianceSupport {
  HIPAA?: ComplianceFramework
  PCI_DSS?: ComplianceFramework
  SOX?: ComplianceFramework
  NIST_800_53?: ComplianceFramework
  GDPR?: ComplianceFramework
  FERPA?: ComplianceFramework
  ISO_27001?: ComplianceFramework
}

export interface ComplianceFramework {
  supported: boolean
  coverage: number // Percentage
  features: string[]
  certifications?: string[]
  automationLevel?: number
}

export interface BreachPreventionMetrics {
  effectiveness: number // Percentage
  riskReduction: number // Percentage
  mttrReduction: number // Percentage
  specificScenarios?: string[]
  limitations?: string[]
}

export interface SecurityConcerns {
  critical: boolean
  recentBreaches: string[]
  recommendation: string
  cveCount?: number
  activeltyExploited?: boolean
}

// Enhanced vendor database with ALL vendors
export const enhancedVendorDatabase: Record<string, VendorData> = {
  PORTNOX: {
    name: "Portnox CLEAR",
    category: "Cloud-Native Zero Trust NAC",
    architecture: "Pure SaaS",
    vendorLockIn: "NONE",
    deploymentModels: {
      CLOUD: {
        available: true,
        description: "Pure cloud-native SaaS deployment",
        deploymentTime: "30 minutes to production",
        complexity: "SIMPLE",
        requirements: {
          subscriptions: ["Portnox CLEAR subscription"],
          expertise: "Basic network knowledge",
          support: "24/7 included",
        },
      },
    },
    capabilities: {
      wirelessNAC: true,
      wiredNAC: true,
      dot1x: true,
      macAuth: true,
      webAuth: true,
      certificateAuth: true,
      riskBasedAccess: true,
      zeroTrust: true,
      continuousCompliance: true,
      deviceTrust: true,
      iotProfiling: true,
      iotFingerprinting: true,
      guestAccess: true,
      byodOnboarding: true,
      cloudPKI: true,
      tacacs: true,
      conditionalAppAccess: true,
      apiAccess: true,
      multiTenant: true,
      mfa: true,
      behaviorAnalytics: true,
      microSegmentation: true,
      dynamicVlan: true,
      complianceReporting: true,
      auditLogging: true,
      realTimeAlerts: true,
    },
    costs: {
      1: {
        software: { base: 45000 },
        hardware: { appliances: 0 },
        implementation: { professionalServices: 15000 },
        operational: { fteRequired: 0.25, avgSalary: 120000, totalFteCost: 30000 },
        hidden: { downtime: 2000, integrationCosts: 5000 },
        total: 97000,
      },
      3: {
        software: { base: 135000 },
        hardware: { appliances: 0 },
        implementation: { professionalServices: 25000 },
        operational: { fteRequired: 0.25, avgSalary: 120000, totalFteCost: 90000 },
        hidden: { downtime: 5000, integrationCosts: 10000 },
        total: 265000,
      },
      5: {
        software: { base: 225000 },
        hardware: { appliances: 0 },
        implementation: { professionalServices: 35000 },
        operational: { fteRequired: 0.25, avgSalary: 120000, totalFteCost: 150000 },
        hidden: { downtime: 8000, integrationCosts: 15000 },
        total: 433000,
      },
    },
    complianceSupport: {
      HIPAA: {
        supported: true,
        coverage: 95,
        features: ["Automated compliance reporting", "Audit trails"],
        automationLevel: 90,
      },
      PCI_DSS: {
        supported: true,
        coverage: 92,
        features: ["Network segmentation", "Access controls"],
        automationLevel: 88,
      },
      SOX: { supported: true, coverage: 90, features: ["Financial controls", "Audit logging"], automationLevel: 85 },
      GDPR: { supported: true, coverage: 88, features: ["Data protection", "Privacy controls"], automationLevel: 82 },
      ISO_27001: {
        supported: true,
        coverage: 93,
        features: ["Security management", "Risk assessment"],
        automationLevel: 90,
      },
      NIST_800_53: {
        supported: true,
        coverage: 91,
        features: ["Security controls", "Continuous monitoring"],
        automationLevel: 87,
      },
    },
    breachPrevention: {
      effectiveness: 94,
      riskReduction: 87,
      mttrReduction: 85,
      specificScenarios: ["Lateral movement prevention", "Rogue device detection", "Insider threat mitigation"],
    },
  },
  CISCO_ISE: {
    name: "Cisco Identity Services Engine",
    category: "Traditional Enterprise NAC",
    architecture: "On-Premise/Hybrid",
    vendorLockIn: "HIGH",
    deploymentModels: {
      ON_PREMISE: {
        available: true,
        description: "Traditional on-premise deployment with dedicated appliances",
        deploymentTime: "6-9 months",
        complexity: "EXTREMELY COMPLEX",
        requirements: {
          appliances: ["ISE Primary", "ISE Secondary", "ISE Policy Service Nodes"],
          infrastructure: ["VMware vSphere", "High-availability storage"],
          networking: ["Cisco switches with RADIUS support"],
          expertise: "Cisco certified engineers required",
          support: "SmartNet required",
        },
        limitations: ["Complex licensing", "Hardware dependencies", "Extensive training required"],
      },
      HYBRID: {
        available: true,
        description: "Hybrid cloud-on-premise deployment",
        deploymentTime: "4-6 months",
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
      continuousCompliance: false,
      deviceTrust: true,
      iotProfiling: true,
      iotFingerprinting: false,
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
      complianceReporting: true,
      auditLogging: true,
      realTimeAlerts: true,
    },
    costs: {
      1: {
        software: {
          base: 85000,
          plusLicense: 45000,
          apexLicense: 65000,
          deviceAdmin: 25000,
        },
        hardware: {
          appliances: 120000,
          infrastructure: 45000,
          networking: 25000,
        },
        implementation: {
          professionalServices: 150000,
          training: 35000,
        },
        operational: {
          fteRequired: 2.5,
          avgSalary: 120000,
          totalFteCost: 300000,
          trainingDays: 40,
          trainingCost: 25000,
        },
        hidden: {
          downtime: 45000,
          integrationCosts: 85000,
          complexity: 125000,
          vendorLockIn: 75000,
        },
        total: 1050000,
      },
      3: {
        software: {
          base: 255000,
          plusLicense: 135000,
          apexLicense: 195000,
          deviceAdmin: 75000,
        },
        hardware: {
          appliances: 180000,
          infrastructure: 85000,
          networking: 45000,
          refresh: 65000,
        },
        implementation: {
          professionalServices: 200000,
          training: 55000,
          upgrades: 35000,
        },
        operational: {
          fteRequired: 2.5,
          avgSalary: 120000,
          totalFteCost: 900000,
          trainingDays: 60,
          trainingCost: 45000,
        },
        hidden: {
          downtime: 125000,
          integrationCosts: 185000,
          complexity: 225000,
          vendorLockIn: 155000,
          scalingIssues: 85000,
        },
        total: 2670000,
      },
      5: {
        software: {
          base: 425000,
          plusLicense: 225000,
          apexLicense: 325000,
          deviceAdmin: 125000,
        },
        hardware: {
          appliances: 240000,
          infrastructure: 125000,
          networking: 75000,
          refresh: 145000,
        },
        implementation: {
          professionalServices: 275000,
          training: 85000,
          upgrades: 65000,
        },
        operational: {
          fteRequired: 2.5,
          avgSalary: 120000,
          totalFteCost: 1500000,
          trainingDays: 80,
          trainingCost: 75000,
        },
        hidden: {
          downtime: 185000,
          integrationCosts: 285000,
          complexity: 325000,
          vendorLockIn: 225000,
          scalingIssues: 145000,
          migrationRisk: 95000,
        },
        total: 4400000,
      },
    },
    complianceSupport: {
      HIPAA: { supported: true, coverage: 78, features: ["Basic compliance reporting"], automationLevel: 35 },
      PCI_DSS: { supported: true, coverage: 82, features: ["Network access controls"], automationLevel: 40 },
      SOX: { supported: true, coverage: 75, features: ["Audit trails"], automationLevel: 30 },
      ISO_27001: { supported: true, coverage: 80, features: ["Security controls"], automationLevel: 38 },
      NIST_800_53: { supported: true, coverage: 83, features: ["Access controls"], automationLevel: 42 },
    },
    breachPrevention: {
      effectiveness: 72,
      riskReduction: 65,
      mttrReduction: 45,
      limitations: ["Complex policy management", "Manual processes", "Limited automation"],
    },
    securityConcerns: {
      critical: false,
      recentBreaches: [],
      recommendation: "Acceptable with proper configuration",
      cveCount: 47,
    },
  },
  ARUBA_CLEARPASS: {
    name: "Aruba ClearPass Policy Manager",
    category: "Enterprise NAC Platform",
    architecture: "Hybrid/On-Premise",
    vendorLockIn: "MODERATE",
    deploymentModels: {
      ON_PREMISE: {
        available: true,
        description: "On-premise appliance-based deployment",
        deploymentTime: "3-6 months",
        complexity: "COMPLEX",
        requirements: {
          appliances: ["ClearPass Policy Manager", "ClearPass OnGuard"],
          infrastructure: ["VMware or physical servers"],
          networking: ["RADIUS-capable switches"],
          expertise: "Aruba certified professionals",
        },
      },
      HYBRID: {
        available: true,
        description: "Hybrid cloud-managed deployment",
        deploymentTime: "2-4 months",
        complexity: "MODERATE",
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
      continuousCompliance: false,
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
      complianceReporting: true,
      auditLogging: true,
      realTimeAlerts: true,
    },
    costs: {
      1: {
        software: {
          base: 65000,
          onguard: 25000,
          guest: 15000,
          onboard: 20000,
        },
        hardware: {
          appliances: 85000,
          infrastructure: 25000,
          networking: 15000,
        },
        implementation: {
          professionalServices: 95000,
          training: 25000,
        },
        operational: {
          fteRequired: 1.5,
          avgSalary: 120000,
          totalFteCost: 180000,
          trainingDays: 25,
          trainingCost: 18000,
        },
        hidden: {
          downtime: 25000,
          integrationCosts: 45000,
          complexity: 65000,
        },
        total: 683000,
      },
      3: {
        software: {
          base: 195000,
          onguard: 75000,
          guest: 45000,
          onboard: 60000,
        },
        hardware: {
          appliances: 125000,
          infrastructure: 45000,
          networking: 25000,
          refresh: 35000,
        },
        implementation: {
          professionalServices: 135000,
          training: 35000,
          upgrades: 25000,
        },
        operational: {
          fteRequired: 1.5,
          avgSalary: 120000,
          totalFteCost: 540000,
          trainingDays: 35,
          trainingCost: 28000,
        },
        hidden: {
          downtime: 65000,
          integrationCosts: 95000,
          complexity: 125000,
          scalingIssues: 45000,
        },
        total: 1558000,
      },
      5: {
        software: {
          base: 325000,
          onguard: 125000,
          guest: 75000,
          onboard: 100000,
        },
        hardware: {
          appliances: 165000,
          infrastructure: 75000,
          networking: 45000,
          refresh: 85000,
        },
        implementation: {
          professionalServices: 185000,
          training: 55000,
          upgrades: 45000,
        },
        operational: {
          fteRequired: 1.5,
          avgSalary: 120000,
          totalFteCost: 900000,
          trainingDays: 45,
          trainingCost: 45000,
        },
        hidden: {
          downtime: 95000,
          integrationCosts: 145000,
          complexity: 185000,
          scalingIssues: 75000,
          vendorLockIn: 55000,
        },
        total: 2580000,
      },
    },
    complianceSupport: {
      HIPAA: { supported: true, coverage: 82, features: ["Policy enforcement", "Audit trails"], automationLevel: 45 },
      PCI_DSS: { supported: true, coverage: 85, features: ["Network segmentation"], automationLevel: 50 },
      ISO_27001: { supported: true, coverage: 80, features: ["Access controls"], automationLevel: 48 },
      NIST_800_53: { supported: true, coverage: 83, features: ["Security controls"], automationLevel: 52 },
    },
    breachPrevention: {
      effectiveness: 75,
      riskReduction: 68,
      mttrReduction: 55,
    },
  },
  FORESCOUT: {
    name: "Forescout Platform",
    category: "Device Visibility & Control",
    architecture: "Agentless On-Premise",
    vendorLockIn: "MODERATE",
    deploymentModels: {
      ON_PREMISE: {
        available: true,
        description: "Agentless device visibility and control platform",
        deploymentTime: "4-8 months",
        complexity: "COMPLEX",
        requirements: {
          appliances: ["CounterACT appliances", "Enterprise Manager"],
          infrastructure: ["Network infrastructure access"],
          networking: ["SPAN ports", "Network taps"],
          expertise: "Forescout certified engineers",
        },
      },
    },
    capabilities: {
      wirelessNAC: true,
      wiredNAC: true,
      dot1x: false,
      macAuth: true,
      webAuth: false,
      certificateAuth: false,
      riskBasedAccess: true,
      zeroTrust: false,
      continuousCompliance: true,
      deviceTrust: true,
      iotProfiling: true,
      iotFingerprinting: true,
      guestAccess: false,
      byodOnboarding: false,
      cloudPKI: false,
      tacacs: false,
      conditionalAppAccess: true,
      apiAccess: true,
      multiTenant: false,
      mfa: false,
      behaviorAnalytics: true,
      microSegmentation: true,
      dynamicVlan: true,
      complianceReporting: true,
      auditLogging: true,
      realTimeAlerts: true,
    },
    costs: {
      1: {
        software: {
          base: 95000,
          eyeExtend: 35000,
          eyeSegment: 25000,
        },
        hardware: {
          appliances: 125000,
          infrastructure: 35000,
          networking: 25000,
        },
        implementation: {
          professionalServices: 145000,
          training: 35000,
        },
        operational: {
          fteRequired: 2.0,
          avgSalary: 120000,
          totalFteCost: 240000,
          trainingDays: 35,
          trainingCost: 28000,
        },
        hidden: {
          downtime: 35000,
          integrationCosts: 75000,
          complexity: 95000,
        },
        total: 958000,
      },
      3: {
        software: {
          base: 285000,
          eyeExtend: 105000,
          eyeSegment: 75000,
        },
        hardware: {
          appliances: 185000,
          infrastructure: 65000,
          networking: 45000,
          refresh: 55000,
        },
        implementation: {
          professionalServices: 195000,
          training: 55000,
          upgrades: 35000,
        },
        operational: {
          fteRequired: 2.0,
          avgSalary: 120000,
          totalFteCost: 720000,
          trainingDays: 50,
          trainingCost: 45000,
        },
        hidden: {
          downtime: 95000,
          integrationCosts: 155000,
          complexity: 185000,
          scalingIssues: 75000,
        },
        total: 2240000,
      },
      5: {
        software: {
          base: 475000,
          eyeExtend: 175000,
          eyeSegment: 125000,
        },
        hardware: {
          appliances: 245000,
          infrastructure: 95000,
          networking: 75000,
          refresh: 125000,
        },
        implementation: {
          professionalServices: 265000,
          training: 85000,
          upgrades: 65000,
        },
        operational: {
          fteRequired: 2.0,
          avgSalary: 120000,
          totalFteCost: 1200000,
          trainingDays: 65,
          trainingCost: 75000,
        },
        hidden: {
          downtime: 145000,
          integrationCosts: 225000,
          complexity: 285000,
          scalingIssues: 125000,
          vendorLockIn: 85000,
        },
        total: 3670000,
      },
    },
    complianceSupport: {
      HIPAA: { supported: true, coverage: 88, features: ["Device compliance monitoring"], automationLevel: 65 },
      PCI_DSS: {
        supported: true,
        coverage: 90,
        features: ["Network segmentation", "Device control"],
        automationLevel: 70,
      },
      GDPR: { supported: true, coverage: 85, features: ["Data protection controls"], automationLevel: 60 },
      ISO_27001: { supported: true, coverage: 87, features: ["Asset management"], automationLevel: 68 },
      NIST_800_53: { supported: true, coverage: 89, features: ["Continuous monitoring"], automationLevel: 72 },
    },
    breachPrevention: {
      effectiveness: 78,
      riskReduction: 70,
      mttrReduction: 65,
      specificScenarios: ["IoT device control", "Rogue device detection", "Compliance monitoring"],
    },
  },
  JUNIPER_MIST: {
    name: "Juniper Mist Access Assurance",
    category: "AI-Driven Cloud NAC",
    architecture: "Cloud-Native",
    vendorLockIn: "MODERATE",
    deploymentModels: {
      CLOUD: {
        available: true,
        description: "AI-driven cloud-native access assurance",
        deploymentTime: "1-3 months",
        complexity: "MODERATE",
        requirements: {
          subscriptions: ["Mist Access Assurance", "Mist WiFi Assurance"],
          infrastructure: ["Mist APs", "EX switches"],
          expertise: "Juniper Mist training recommended",
        },
        limitations: ["Requires Mist ecosystem"],
      },
    },
    capabilities: {
      wirelessNAC: true,
      wiredNAC: true,
      dot1x: true,
      macAuth: true,
      webAuth: true,
      certificateAuth: true,
      riskBasedAccess: true,
      zeroTrust: true,
      continuousCompliance: false,
      deviceTrust: true,
      iotProfiling: true,
      iotFingerprinting: true,
      guestAccess: true,
      byodOnboarding: true,
      cloudPKI: true,
      tacacs: false,
      conditionalAppAccess: true,
      apiAccess: true,
      multiTenant: true,
      mfa: true,
      behaviorAnalytics: true,
      microSegmentation: true,
      dynamicVlan: true,
      complianceReporting: true,
      auditLogging: true,
      realTimeAlerts: true,
    },
    costs: {
      1: {
        software: {
          base: 35000,
          accessAssurance: 25000,
          wifiAssurance: 20000,
          marvisVNA: 15000,
        },
        hardware: {
          mistAPs: 45000,
          mistSwitches: 35000,
        },
        implementation: {
          professionalServices: 45000,
          training: 15000,
        },
        operational: {
          fteRequired: 0.5,
          avgSalary: 120000,
          totalFteCost: 60000,
          trainingDays: 15,
          trainingCost: 12000,
        },
        hidden: {
          downtime: 8000,
          integrationCosts: 25000,
          vendorLockIn: 35000,
        },
        total: 380000,
      },
      3: {
        software: {
          base: 105000,
          accessAssurance: 75000,
          wifiAssurance: 60000,
          marvisVNA: 45000,
        },
        hardware: {
          mistAPs: 75000,
          mistSwitches: 65000,
          refresh: 25000,
        },
        implementation: {
          professionalServices: 65000,
          training: 25000,
          upgrades: 15000,
        },
        operational: {
          fteRequired: 0.5,
          avgSalary: 120000,
          totalFteCost: 180000,
          trainingDays: 25,
          trainingCost: 20000,
        },
        hidden: {
          downtime: 18000,
          integrationCosts: 45000,
          vendorLockIn: 65000,
          limitedFeatures: 25000,
        },
        total: 868000,
      },
      5: {
        software: {
          base: 175000,
          accessAssurance: 125000,
          wifiAssurance: 100000,
          marvisVNA: 75000,
        },
        hardware: {
          mistAPs: 125000,
          mistSwitches: 95000,
          refresh: 65000,
        },
        implementation: {
          professionalServices: 95000,
          training: 45000,
          upgrades: 35000,
        },
        operational: {
          fteRequired: 0.5,
          avgSalary: 120000,
          totalFteCost: 300000,
          trainingDays: 35,
          trainingCost: 35000,
        },
        hidden: {
          downtime: 28000,
          integrationCosts: 75000,
          vendorLockIn: 95000,
          limitedFeatures: 45000,
        },
        total: 1413000,
      },
    },
    complianceSupport: {
      HIPAA: { supported: true, coverage: 85, features: ["AI-driven compliance"], automationLevel: 75 },
      PCI_DSS: { supported: true, coverage: 88, features: ["Automated policy enforcement"], automationLevel: 80 },
      GDPR: { supported: true, coverage: 82, features: ["Privacy controls"], automationLevel: 72 },
      ISO_27001: { supported: true, coverage: 86, features: ["Security automation"], automationLevel: 78 },
      NIST_800_53: { supported: true, coverage: 89, features: ["Continuous monitoring"], automationLevel: 82 },
    },
    breachPrevention: {
      effectiveness: 82,
      riskReduction: 75,
      mttrReduction: 70,
      specificScenarios: ["AI-driven threat detection", "Automated response", "Behavioral analysis"],
    },
  },
  EXTREME_NAC: {
    name: "Extreme Networks ExtremeControl",
    category: "Network-Integrated NAC",
    architecture: "On-Premise/Cloud",
    vendorLockIn: "MODERATE",
    deploymentModels: {
      ON_PREMISE: {
        available: true,
        description: "Integrated with Extreme network infrastructure",
        deploymentTime: "2-4 months",
        complexity: "MODERATE",
        requirements: {
          infrastructure: ["Extreme switches", "ExtremeCloud IQ"],
          expertise: "Extreme certified professionals",
        },
      },
      CLOUD: {
        available: true,
        description: "Cloud-managed NAC solution",
        deploymentTime: "1-2 months",
        complexity: "SIMPLE",
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
      continuousCompliance: false,
      deviceTrust: true,
      iotProfiling: true,
      iotFingerprinting: false,
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
      complianceReporting: true,
      auditLogging: true,
      realTimeAlerts: true,
    },
    costs: {
      1: {
        software: {
          base: 35000,
          cloudManagement: 15000,
        },
        hardware: {
          networking: 25000,
        },
        implementation: {
          professionalServices: 35000,
          training: 12000,
        },
        operational: {
          fteRequired: 0.8,
          avgSalary: 120000,
          totalFteCost: 96000,
          trainingDays: 12,
          trainingCost: 8000,
        },
        hidden: {
          downtime: 12000,
          integrationCosts: 18000,
          limitedFeatures: 15000,
        },
        total: 271000,
      },
      3: {
        software: {
          base: 105000,
          cloudManagement: 45000,
        },
        hardware: {
          networking: 45000,
          refresh: 15000,
        },
        implementation: {
          professionalServices: 55000,
          training: 18000,
          upgrades: 12000,
        },
        operational: {
          fteRequired: 0.8,
          avgSalary: 120000,
          totalFteCost: 288000,
          trainingDays: 18,
          trainingCost: 15000,
        },
        hidden: {
          downtime: 25000,
          integrationCosts: 35000,
          limitedFeatures: 28000,
          scalingIssues: 18000,
        },
        total: 704000,
      },
      5: {
        software: {
          base: 175000,
          cloudManagement: 75000,
        },
        hardware: {
          networking: 75000,
          refresh: 35000,
        },
        implementation: {
          professionalServices: 85000,
          training: 28000,
          upgrades: 25000,
        },
        operational: {
          fteRequired: 0.8,
          avgSalary: 120000,
          totalFteCost: 480000,
          trainingDays: 25,
          trainingCost: 25000,
        },
        hidden: {
          downtime: 38000,
          integrationCosts: 55000,
          limitedFeatures: 45000,
          scalingIssues: 35000,
        },
        total: 1141000,
      },
    },
    complianceSupport: {
      HIPAA: { supported: true, coverage: 68, features: ["Basic compliance"], automationLevel: 25 },
      PCI_DSS: { supported: true, coverage: 72, features: ["Network controls"], automationLevel: 30 },
      ISO_27001: { supported: true, coverage: 70, features: ["Access controls"], automationLevel: 28 },
      NIST_800_53: { supported: true, coverage: 75, features: ["Security controls"], automationLevel: 32 },
    },
    breachPrevention: {
      effectiveness: 65,
      riskReduction: 55,
      mttrReduction: 40,
    },
  },
  CISCO_MERAKI: {
    name: "Cisco Meraki Systems Manager",
    category: "Cloud-Managed Security",
    architecture: "Cloud-Managed",
    vendorLockIn: "HIGH",
    deploymentModels: {
      CLOUD: {
        available: true,
        description: "Cloud-managed network security with integrated access control",
        deploymentTime: "1-3 months",
        complexity: "MODERATE",
        requirements: {
          infrastructure: ["Meraki APs", "Meraki switches", "Meraki security appliances"],
          subscriptions: ["Meraki licensing"],
          expertise: "Meraki training recommended",
        },
        limitations: ["Requires full Meraki ecosystem"],
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
      continuousCompliance: false,
      deviceTrust: true,
      iotProfiling: true,
      iotFingerprinting: false,
      guestAccess: true,
      byodOnboarding: true,
      cloudPKI: false,
      tacacs: false,
      conditionalAppAccess: false,
      apiAccess: true,
      multiTenant: true,
      mfa: true,
      behaviorAnalytics: false,
      microSegmentation: true,
      dynamicVlan: true,
      complianceReporting: true,
      auditLogging: true,
      realTimeAlerts: true,
    },
    costs: {
      1: {
        software: {
          base: 45000,
          licenses: 25000,
        },
        hardware: {
          merakiAPs: 35000,
          merakiSwitches: 45000,
        },
        implementation: {
          professionalServices: 25000,
          training: 8000,
        },
        operational: {
          fteRequired: 0.6,
          avgSalary: 120000,
          totalFteCost: 72000,
          trainingDays: 8,
          trainingCost: 6000,
        },
        hidden: {
          downtime: 8000,
          integrationCosts: 15000,
          vendorLockIn: 45000,
          premiumPricing: 25000,
        },
        total: 359000,
      },
      3: {
        software: {
          base: 135000,
          licenses: 75000,
        },
        hardware: {
          merakiAPs: 65000,
          merakiSwitches: 85000,
          refresh: 25000,
        },
        implementation: {
          professionalServices: 45000,
          training: 15000,
          upgrades: 12000,
        },
        operational: {
          fteRequired: 0.6,
          avgSalary: 120000,
          totalFteCost: 216000,
          trainingDays: 15,
          trainingCost: 12000,
        },
        hidden: {
          downtime: 18000,
          integrationCosts: 35000,
          vendorLockIn: 85000,
          premiumPricing: 55000,
          limitedFeatures: 25000,
        },
        total: 903000,
      },
      5: {
        software: {
          base: 225000,
          licenses: 125000,
        },
        hardware: {
          merakiAPs: 105000,
          merakiSwitches: 135000,
          refresh: 65000,
        },
        implementation: {
          professionalServices: 75000,
          training: 25000,
          upgrades: 25000,
        },
        operational: {
          fteRequired: 0.6,
          avgSalary: 120000,
          totalFteCost: 360000,
          trainingDays: 25,
          trainingCost: 20000,
        },
        hidden: {
          downtime: 28000,
          integrationCosts: 55000,
          vendorLockIn: 125000,
          premiumPricing: 85000,
          limitedFeatures: 45000,
        },
        total: 1498000,
      },
    },
    complianceSupport: {
      HIPAA: { supported: true, coverage: 65, features: ["Basic compliance"], automationLevel: 35 },
      PCI_DSS: { supported: true, coverage: 70, features: ["Network security"], automationLevel: 40 },
      GDPR: { supported: true, coverage: 68, features: ["Data protection"], automationLevel: 38 },
      ISO_27001: { supported: true, coverage: 72, features: ["Security management"], automationLevel: 42 },
    },
    breachPrevention: {
      effectiveness: 62,
      riskReduction: 58,
      mttrReduction: 45,
    },
  },
  MICROSOFT_NPS: {
    name: "Microsoft Network Policy Server",
    category: "Ecosystem Integration",
    architecture: "On-Premise/Hybrid",
    vendorLockIn: "MODERATE",
    deploymentModels: {
      ON_PREMISE: {
        available: true,
        description: "Windows Server-based RADIUS with Intune integration",
        deploymentTime: "2-4 months",
        complexity: "MODERATE",
        requirements: {
          infrastructure: ["Windows Server", "Active Directory"],
          subscriptions: ["Azure AD Premium", "Intune"],
          expertise: "Microsoft certified professionals",
        },
      },
      HYBRID: {
        available: true,
        description: "Hybrid Azure AD with conditional access",
        deploymentTime: "1-3 months",
        complexity: "MODERATE",
      },
    },
    capabilities: {
      wirelessNAC: true,
      wiredNAC: true,
      dot1x: true,
      macAuth: true,
      webAuth: false,
      certificateAuth: true,
      riskBasedAccess: true,
      zeroTrust: true,
      continuousCompliance: true,
      deviceTrust: true,
      iotProfiling: false,
      iotFingerprinting: false,
      guestAccess: false,
      byodOnboarding: true,
      cloudPKI: true,
      tacacs: false,
      conditionalAppAccess: true,
      apiAccess: true,
      multiTenant: true,
      mfa: true,
      behaviorAnalytics: true,
      microSegmentation: false,
      dynamicVlan: true,
      complianceReporting: true,
      auditLogging: true,
      realTimeAlerts: true,
    },
    costs: {
      1: {
        software: {
          windowsServer: 15000,
          cals: 8000,
          azureADPremium: 25000,
          intune: 18000,
        },
        hardware: {
          servers: 25000,
        },
        implementation: {
          professionalServices: 35000,
          training: 12000,
        },
        operational: {
          fteRequired: 1.0,
          avgSalary: 120000,
          totalFteCost: 120000,
          trainingDays: 15,
          trainingCost: 10000,
        },
        hidden: {
          downtime: 15000,
          integrationCosts: 25000,
          limitedFeatures: 35000,
        },
        total: 343000,
      },
      3: {
        software: {
          windowsServer: 25000,
          cals: 15000,
          azureADPremium: 75000,
          intune: 54000,
        },
        hardware: {
          servers: 35000,
          refresh: 15000,
        },
        implementation: {
          professionalServices: 55000,
          training: 18000,
          upgrades: 15000,
        },
        operational: {
          fteRequired: 1.0,
          avgSalary: 120000,
          totalFteCost: 360000,
          trainingDays: 25,
          trainingCost: 18000,
        },
        hidden: {
          downtime: 35000,
          integrationCosts: 55000,
          limitedFeatures: 65000,
          complexity: 25000,
        },
        total: 870000,
      },
      5: {
        software: {
          windowsServer: 35000,
          cals: 25000,
          azureADPremium: 125000,
          intune: 90000,
        },
        hardware: {
          servers: 55000,
          refresh: 35000,
        },
        implementation: {
          professionalServices: 85000,
          training: 28000,
          upgrades: 35000,
        },
        operational: {
          fteRequired: 1.0,
          avgSalary: 120000,
          totalFteCost: 600000,
          trainingDays: 35,
          trainingCost: 28000,
        },
        hidden: {
          downtime: 55000,
          integrationCosts: 85000,
          limitedFeatures: 95000,
          complexity: 45000,
        },
        total: 1421000,
      },
    },
    complianceSupport: {
      HIPAA: { supported: true, coverage: 78, features: ["Azure compliance"], automationLevel: 65 },
      SOX: { supported: true, coverage: 80, features: ["Financial controls"], automationLevel: 70 },
      GDPR: { supported: true, coverage: 82, features: ["Data protection"], automationLevel: 75 },
      ISO_27001: { supported: true, coverage: 79, features: ["Security management"], automationLevel: 68 },
    },
    breachPrevention: {
      effectiveness: 68,
      riskReduction: 62,
      mttrReduction: 55,
    },
  },
  PACKETFENCE: {
    name: "PacketFence Open Source NAC",
    category: "Open Source",
    architecture: "On-Premise",
    vendorLockIn: "NONE",
    deploymentModels: {
      ON_PREMISE: {
        available: true,
        description: "Open-source network access control with enterprise support options",
        deploymentTime: "3-8 months",
        complexity: "VERY COMPLEX",
        requirements: {
          infrastructure: ["Linux servers", "Database servers"],
          expertise: "Linux/networking expertise required",
          support: "Community or commercial support",
        },
        limitations: ["Requires significant technical expertise", "Limited commercial support"],
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
      continuousCompliance: false,
      deviceTrust: true,
      iotProfiling: false,
      iotFingerprinting: false,
      guestAccess: true,
      byodOnboarding: true,
      cloudPKI: false,
      tacacs: false,
      conditionalAppAccess: false,
      apiAccess: true,
      multiTenant: false,
      mfa: true,
      behaviorAnalytics: false,
      microSegmentation: true,
      dynamicVlan: true,
      complianceReporting: false,
      auditLogging: true,
      realTimeAlerts: true,
    },
    costs: {
      1: {
        software: {
          base: 0,
          support: 15000,
        },
        hardware: {
          servers: 25000,
          infrastructure: 15000,
        },
        implementation: {
          professionalServices: 85000,
          training: 25000,
        },
        operational: {
          fteRequired: 2.5,
          avgSalary: 120000,
          totalFteCost: 300000,
          trainingDays: 60,
          trainingCost: 35000,
        },
        hidden: {
          downtime: 45000,
          complexity: 125000,
          customization: 85000,
          communitySupport: 25000,
        },
        total: 780000,
      },
      3: {
        software: {
          base: 0,
          support: 45000,
        },
        hardware: {
          servers: 45000,
          infrastructure: 25000,
          refresh: 15000,
        },
        implementation: {
          professionalServices: 125000,
          training: 45000,
          upgrades: 35000,
        },
        operational: {
          fteRequired: 2.5,
          avgSalary: 120000,
          totalFteCost: 900000,
          trainingDays: 80,
          trainingCost: 55000,
        },
        hidden: {
          downtime: 95000,
          complexity: 225000,
          customization: 155000,
          communitySupport: 65000,
        },
        total: 1830000,
      },
      5: {
        software: {
          base: 0,
          support: 75000,
        },
        hardware: {
          servers: 75000,
          infrastructure: 45000,
          refresh: 35000,
        },
        implementation: {
          professionalServices: 185000,
          training: 75000,
          upgrades: 65000,
        },
        operational: {
          fteRequired: 2.5,
          avgSalary: 120000,
          totalFteCost: 1500000,
          trainingDays: 100,
          trainingCost: 85000,
        },
        hidden: {
          downtime: 145000,
          complexity: 325000,
          customization: 225000,
          communitySupport: 95000,
        },
        total: 2930000,
      },
    },
    complianceSupport: {
      HIPAA: { supported: false, coverage: 55, features: ["Basic logging"], automationLevel: 15 },
      PCI_DSS: { supported: false, coverage: 48, features: ["Network controls"], automationLevel: 20 },
      ISO_27001: { supported: false, coverage: 52, features: ["Access controls"], automationLevel: 18 },
    },
    breachPrevention: {
      effectiveness: 55,
      riskReduction: 45,
      mttrReduction: 35,
      limitations: ["Limited automation", "Manual processes", "Requires expertise"],
    },
  },
  FOXPASS: {
    name: "Foxpass Cloud RADIUS",
    category: "Cloud Authentication",
    architecture: "Pure SaaS",
    vendorLockIn: "LOW",
    deploymentModels: {
      CLOUD: {
        available: true,
        description: "Cloud-hosted RADIUS and LDAP service for Wi-Fi and VPN authentication",
        deploymentTime: "1-7 days",
        complexity: "SIMPLE",
        requirements: {
          subscriptions: ["Foxpass subscription"],
          expertise: "Basic networking knowledge",
        },
        limitations: ["Limited NAC features", "Basic functionality only"],
      },
    },
    capabilities: {
      wirelessNAC: true,
      wiredNAC: false,
      dot1x: true,
      macAuth: false,
      webAuth: false,
      certificateAuth: true,
      riskBasedAccess: false,
      zeroTrust: false,
      continuousCompliance: false,
      deviceTrust: false,
      iotProfiling: false,
      iotFingerprinting: false,
      guestAccess: false,
      byodOnboarding: false,
      cloudPKI: false,
      tacacs: false,
      conditionalAppAccess: false,
      apiAccess: true,
      multiTenant: false,
      mfa: true,
      behaviorAnalytics: false,
      microSegmentation: false,
      dynamicVlan: false,
      complianceReporting: false,
      auditLogging: true,
      realTimeAlerts: false,
    },
    costs: {
      1: {
        software: {
          base: 18000,
        },
        hardware: {
          appliances: 0,
        },
        implementation: {
          professionalServices: 5000,
          training: 2000,
        },
        operational: {
          fteRequired: 0.1,
          avgSalary: 120000,
          totalFteCost: 12000,
          trainingDays: 2,
          trainingCost: 1000,
        },
        hidden: {
          limitedFeatures: 15000,
          scalingIssues: 8000,
        },
        total: 61000,
      },
      3: {
        software: {
          base: 54000,
        },
        hardware: {
          appliances: 0,
        },
        implementation: {
          professionalServices: 8000,
          training: 3000,
          upgrades: 2000,
        },
        operational: {
          fteRequired: 0.1,
          avgSalary: 120000,
          totalFteCost: 36000,
          trainingDays: 3,
          trainingCost: 2000,
        },
        hidden: {
          limitedFeatures: 35000,
          scalingIssues: 18000,
        },
        total: 158000,
      },
      5: {
        software: {
          base: 90000,
        },
        hardware: {
          appliances: 0,
        },
        implementation: {
          professionalServices: 12000,
          training: 5000,
          upgrades: 5000,
        },
        operational: {
          fteRequired: 0.1,
          avgSalary: 120000,
          totalFteCost: 60000,
          trainingDays: 5,
          trainingCost: 3000,
        },
        hidden: {
          limitedFeatures: 55000,
          scalingIssues: 28000,
        },
        total: 258000,
      },
    },
    complianceSupport: {
      HIPAA: { supported: false, coverage: 35, features: ["Basic authentication"], automationLevel: 25 },
      GDPR: { supported: false, coverage: 40, features: ["User authentication"], automationLevel: 30 },
    },
    breachPrevention: {
      effectiveness: 42,
      riskReduction: 35,
      mttrReduction: 25,
      limitations: ["Limited scope", "Authentication only", "No device control"],
    },
  },
  SECUREW2: {
    name: "SecureW2 Cloud PKI",
    category: "Certificate Management",
    architecture: "Cloud PKI",
    vendorLockIn: "LOW",
    deploymentModels: {
      CLOUD: {
        available: true,
        description: "Cloud-based PKI and certificate management for secure wireless networks",
        deploymentTime: "2-4 weeks",
        complexity: "SIMPLE",
        requirements: {
          subscriptions: ["SecureW2 PKI subscription"],
          expertise: "PKI knowledge helpful",
        },
        limitations: ["Certificate management focus", "Limited NAC features"],
      },
    },
    capabilities: {
      wirelessNAC: true,
      wiredNAC: false,
      dot1x: true,
      macAuth: false,
      webAuth: false,
      certificateAuth: true,
      riskBasedAccess: false,
      zeroTrust: false,
      continuousCompliance: false,
      deviceTrust: true,
      iotProfiling: false,
      iotFingerprinting: false,
      guestAccess: true,
      byodOnboarding: true,
      cloudPKI: true,
      tacacs: false,
      conditionalAppAccess: false,
      apiAccess: true,
      multiTenant: false,
      mfa: true,
      behaviorAnalytics: false,
      microSegmentation: false,
      dynamicVlan: false,
      complianceReporting: false,
      auditLogging: true,
      realTimeAlerts: false,
    },
    costs: {
      1: {
        software: {
          base: 25000,
          pki: 15000,
        },
        hardware: {
          appliances: 0,
        },
        implementation: {
          professionalServices: 12000,
          training: 5000,
        },
        operational: {
          fteRequired: 0.2,
          avgSalary: 120000,
          totalFteCost: 24000,
          trainingDays: 5,
          trainingCost: 3000,
        },
        hidden: {
          limitedFeatures: 25000,
          premiumPricing: 15000,
        },
        total: 124000,
      },
      3: {
        software: {
          base: 75000,
          pki: 45000,
        },
        hardware: {
          appliances: 0,
        },
        implementation: {
          professionalServices: 18000,
          training: 8000,
          upgrades: 5000,
        },
        operational: {
          fteRequired: 0.2,
          avgSalary: 120000,
          totalFteCost: 72000,
          trainingDays: 8,
          trainingCost: 5000,
        },
        hidden: {
          limitedFeatures: 55000,
          premiumPricing: 35000,
        },
        total: 318000,
      },
      5: {
        software: {
          base: 125000,
          pki: 75000,
        },
        hardware: {
          appliances: 0,
        },
        implementation: {
          professionalServices: 28000,
          training: 12000,
          upgrades: 10000,
        },
        operational: {
          fteRequired: 0.2,
          avgSalary: 120000,
          totalFteCost: 120000,
          trainingDays: 12,
          trainingCost: 8000,
        },
        hidden: {
          limitedFeatures: 85000,
          premiumPricing: 55000,
        },
        total: 518000,
      },
    },
    complianceSupport: {
      HIPAA: { supported: true, coverage: 45, features: ["Certificate-based security"], automationLevel: 35 },
      PCI_DSS: { supported: true, coverage: 50, features: ["Strong authentication"], automationLevel: 40 },
      GDPR: { supported: true, coverage: 42, features: ["Identity protection"], automationLevel: 32 },
    },
    breachPrevention: {
      effectiveness: 48,
      riskReduction: 40,
      mttrReduction: 35,
      specificScenarios: ["Certificate-based authentication", "Wireless security"],
    },
  },
  ARISTA_AGNI: {
    name: "Arista AGNI",
    category: "Cloud-Native Platform",
    architecture: "Cloud-Native",
    vendorLockIn: "MODERATE",
    deploymentModels: {
      CLOUD: {
        available: true,
        description: "Cloud-native NAC service integrated with Arista CloudVision platform",
        deploymentTime: "2-6 weeks",
        complexity: "MODERATE",
        requirements: {
          infrastructure: ["Arista switches", "CloudVision platform"],
          subscriptions: ["AGNI subscription", "CloudVision"],
          expertise: "Arista networking knowledge",
        },
        limitations: ["Requires Arista infrastructure"],
      },
    },
    capabilities: {
      wirelessNAC: true,
      wiredNAC: true,
      dot1x: true,
      macAuth: true,
      webAuth: true,
      certificateAuth: true,
      riskBasedAccess: true,
      zeroTrust: true,
      continuousCompliance: true,
      deviceTrust: true,
      iotProfiling: true,
      iotFingerprinting: true,
      guestAccess: true,
      byodOnboarding: true,
      cloudPKI: false,
      tacacs: true,
      conditionalAppAccess: true,
      apiAccess: true,
      multiTenant: true,
      mfa: true,
      behaviorAnalytics: true,
      microSegmentation: true,
      dynamicVlan: true,
      complianceReporting: true,
      auditLogging: true,
      realTimeAlerts: true,
    },
    costs: {
      1: {
        software: {
          base: 45000,
          cloudvision: 25000,
        },
        hardware: {
          aristaSwitches: 55000,
        },
        implementation: {
          professionalServices: 35000,
          training: 15000,
        },
        operational: {
          fteRequired: 0.8,
          avgSalary: 120000,
          totalFteCost: 96000,
          trainingDays: 15,
          trainingCost: 12000,
        },
        hidden: {
          downtime: 12000,
          integrationCosts: 25000,
          vendorLockIn: 35000,
        },
        total: 355000,
      },
      3: {
        software: {
          base: 135000,
          cloudvision: 75000,
        },
        hardware: {
          aristaSwitches: 95000,
          refresh: 25000,
        },
        implementation: {
          professionalServices: 55000,
          training: 25000,
          upgrades: 15000,
        },
        operational: {
          fteRequired: 0.8,
          avgSalary: 120000,
          totalFteCost: 288000,
          trainingDays: 25,
          trainingCost: 20000,
        },
        hidden: {
          downtime: 25000,
          integrationCosts: 55000,
          vendorLockIn: 65000,
        },
        total: 878000,
      },
      5: {
        software: {
          base: 225000,
          cloudvision: 125000,
        },
        hardware: {
          aristaSwitches: 155000,
          refresh: 65000,
        },
        implementation: {
          professionalServices: 85000,
          training: 45000,
          upgrades: 35000,
        },
        operational: {
          fteRequired: 0.8,
          avgSalary: 120000,
          totalFteCost: 480000,
          trainingDays: 35,
          trainingCost: 35000,
        },
        hidden: {
          downtime: 38000,
          integrationCosts: 85000,
          vendorLockIn: 95000,
        },
        total: 1408000,
      },
    },
    complianceSupport: {
      HIPAA: { supported: true, coverage: 80, features: ["Network-based compliance"], automationLevel: 65 },
      PCI_DSS: { supported: true, coverage: 82, features: ["Segmentation controls"], automationLevel: 70 },
      GDPR: { supported: true, coverage: 78, features: ["Data protection"], automationLevel: 62 },
      ISO_27001: { supported: true, coverage: 81, features: ["Security management"], automationLevel: 68 },
      NIST_800_53: { supported: true, coverage: 84, features: ["Security controls"], automationLevel: 72 },
    },
    breachPrevention: {
      effectiveness: 76,
      riskReduction: 72,
      mttrReduction: 65,
      specificScenarios: ["Network segmentation", "Automated response", "Threat detection"],
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

// Calculate TCO for a specific vendor
export function calculateTCOAnalysis(
  vendorKey: string,
  orgConfig: {
    devices: number
    users: number
    industry: string
    region: string
  },
  analysisConfig: {
    years: 1 | 3 | 5
  },
) {
  const vendor = enhancedVendorDatabase[vendorKey]
  if (!vendor) {
    throw new Error(`Vendor '${vendorKey}' not found in database`)
  }

  const costs = vendor.costs[analysisConfig.years]
  const industryData = industryFactors[orgConfig.industry as keyof typeof industryFactors]

  // Apply industry multipliers
  const adjustedCosts = {
    ...costs,
    total: costs.total * (industryData?.complianceMultiplier || 1.0),
  }

  // Calculate ROI metrics
  const breachPrevention = vendor.breachPrevention
  const riskReduction = breachPrevention
    ? (industryData?.averageBreachCost || 0) * (breachPrevention.riskReduction / 100)
    : 0

  return {
    vendor: vendorKey,
    vendorName: vendor.name,
    costs: adjustedCosts,
    roi: {
      breachRiskReduction: riskReduction,
      operationalSavings: costs.operational.totalFteCost || 0,
      complianceSavings: costs.hidden?.compliance || 0,
      paybackPeriod: adjustedCosts.total > 0 ? adjustedCosts.total / (riskReduction / analysisConfig.years) : 0,
    },
    deployment: {
      complexity:
        vendor.deploymentModels.CLOUD?.complexity ||
        vendor.deploymentModels.HYBRID?.complexity ||
        vendor.deploymentModels.ON_PREMISE?.complexity ||
        "COMPLEX",
      timeToProduction:
        vendor.deploymentModels.CLOUD?.deploymentTime ||
        vendor.deploymentModels.HYBRID?.deploymentTime ||
        vendor.deploymentModels.ON_PREMISE?.deploymentTime ||
        "Unknown",
    },
    security: {
      zeroTrustScore: vendor.capabilities.zeroTrust ? 95 : vendor.capabilities.riskBasedAccess ? 75 : 45,
      complianceScore: vendor.complianceSupport
        ? Object.values(vendor.complianceSupport).reduce((acc, framework) => acc + (framework?.coverage || 0), 0) /
          Object.keys(vendor.complianceSupport).length
        : 0,
    },
  }
}

// Compare multiple vendors
export function compareVendorsTCO(
  vendorKeys: string[],
  orgConfig: {
    devices: number
    users: number
    industry: string
    region: string
  },
  analysisConfig: {
    years: 1 | 3 | 5
  },
) {
  return vendorKeys
    .map((vendorKey) => calculateTCOAnalysis(vendorKey, orgConfig, analysisConfig))
    .sort((a, b) => a.costs.total - b.costs.total)
}

// Get vendor recommendations
export function getVendorRecommendations(
  orgConfig: {
    devices: number
    users: number
    industry: string
    region: string
  },
  priorities: string[] = ["cost", "security", "compliance"],
): string[] {
  const vendorScores: Record<string, number> = {}

  Object.keys(enhancedVendorDatabase).forEach((vendorKey) => {
    const analysis = calculateTCOAnalysis(vendorKey, orgConfig, { years: 3 })
    let score = 0

    // Cost efficiency (lower is better)
    if (priorities.includes("cost")) {
      score += Math.max(0, 100 - analysis.costs.total / 10000)
    }

    // Security score
    if (priorities.includes("security")) {
      score += analysis.security.zeroTrustScore
    }

    // Compliance score
    if (priorities.includes("compliance")) {
      score += analysis.security.complianceScore
    }

    vendorScores[vendorKey] = score
  })

  return Object.entries(vendorScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([vendorKey]) => vendorKey)
}
