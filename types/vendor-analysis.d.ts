// types/vendor-analysis.d.ts

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

export interface Industry {
  name: string
  regulations: string[]
  riskProfile: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  avgBreachCost: number
  specificRequirements: {
    [key: string]: boolean
  }
}

export interface PreventableBreach {
  name: string
  impact: string
  cost: number
  vector: string
  preventable_by: string[]
  description: string
}

export interface MigrationCosts {
  description: string
  factors: {
    [key: string]: number
  }
  portnoxAdvantage?: {
    eliminated?: string[]
    reduced?: {
      [key: string]: number
    }
    automated?: string[]
    migrationTools?: string
    totalSavings: number
  }
}

export interface IndustryROI {
  portnoxBenefits: {
    [key: string]: number
  }
  totalAnnualBenefit: number
  threeYearROI: number
}

export interface DeploymentTimeline {
  planning: string
  poc: string
  pilot: string
  production: string
  total: string
  riskLevel: "MINIMAL" | "LOW" | "MODERATE" | "HIGH" | "VERY HIGH"
}

export interface SupportTraining {
  training: {
    cost: number
    duration: string
    certification: number | string
    ongoing: number | string
  }
  support: {
    included: boolean
    cost?: number
    responseTime: string
    availability: string
    dedicatedTam?: boolean
  }
}

export interface ExecutiveDecisionMatrix {
  timeToValue: {
    portnox: string
    traditional: string
    advantage: string
  }
  totalCost: {
    portnox: number
    ciscoISE: number
    arubaClearPass: number
    savings: string
  }
  operationalEffort: {
    portnox: number
    traditional: number
    reduction: string
  }
  securityPosture: {
    portnox: number
    traditional: number
    improvement: string
  }
  scalability: {
    portnox: string
    traditional: string
    advantage: string
  }
  innovation: {
    portnox: string
    traditional: string
    advantage: string
  }
}

export interface TCOCalculationParams {
  vendorKey: string
  deviceCount: number
  timeframe: 1 | 3 | 5
  industry: string
  deploymentModel: "CLOUD" | "HYBRID" | "ON_PREMISE"
  hasExistingNAC: boolean
  currentVendor?: string
  includeCompliance: boolean
  includeRiskReduction: boolean
}

export interface DetailedCostBreakdown {
  software: {
    base: number
    additionalModules: number
    support: number
    training: number
    total: number
  }
  hardware: {
    appliances: number
    infrastructure: number
    networking: number
    refresh: number
    total: number
  }
  implementation: {
    professionalServices: number
    deployment: number
    migration: number
    training: number
    total: number
  }
  operational: {
    fteRequired: number
    fteCost: number
    trainingCost: number
    certificationCost: number
    maintenanceWindows: number
    total: number
  }
  hidden: {
    downtime: number
    integrationCosts: number
    scalingCosts: number
    vendorLockIn: number
    complexity: number
    total: number
  }
  migration: {
    parallelOperation: number
    policyMigration: number
    deviceReEnrollment: number
    testingValidation: number
    total: number
  }
  compliance: {
    automationSavings: number
    auditCosts: number
    violationRisk: number
    certificationCosts: number
    total: number
  }
  riskReduction: {
    breachPrevention: number
    insuranceReduction: number
    incidentResponse: number
    reputationProtection: number
    total: number
  }
  totalCost: number
  totalBenefit: number
  netCost: number
  roi: number
  paybackPeriod: number
}
