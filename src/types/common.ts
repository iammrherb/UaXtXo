export interface OrgSize {
  devices: number
  users: number
  sites: number
}

export interface VendorData {
  id: string
  name: string
  category: "cloud_native" | "traditional" | "hybrid"
  pricing: {
    perDevice: number
    implementation: number
    annualSupport: number
  }
  security: {
    zeroTrustScore: number
    breachRiskReduction: number
  }
  operationalMetrics: {
    adminEffort: number
    automationLevel: number
    deploymentTime: number
  }
}

export interface IndustryData {
  complianceMultiplier: number
  riskMultiplier: number
  downtimeMultiplier: number
  averageBreachCost: number
  requiredFrameworks: string[]
}

export interface ComplianceFramework {
  id: string
  name: string
  description: string
  requirements: string[]
  portnoxCoverage: number
  competitorCoverage: Record<string, number>
}

export interface ThreatScenario {
  id: string
  name: string
  description: string
  probability: number
  impact: number
  mitigationLevel: Record<string, number>
}

export interface RiskAssessment {
  scenarios: ThreatScenario[]
  annualRiskExposure: number
  mitigatedRisk: number
  residualRisk: number
}

export interface TCOBreakdown {
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
}

export interface MigrationScenario {
  fromVendor: string
  toVendor: string
  devices: number
  users: number
  existingContractRemaining: number
  existingHardwareAge: number
  includeEarlyTermination: boolean
  includeTraining: boolean
  includeDataMigration: boolean
}

export interface ExecutiveSummary {
  totalSavings: number
  paybackPeriod: number
  roi: number
  riskReduction: number
  complianceImprovement: number
  operationalEfficiency: number
  recommendations: string[]
}
