export interface CalculationConfiguration {
  deviceCount: number
  userCount: number
  timeframe: 1 | 3 | 5
  industry: string
  deploymentModel: "cloud" | "hybrid" | "on-premise"
  hasExistingNAC: boolean
  currentVendor?: string
  includeCompliance: boolean
  includeRiskReduction: boolean
  includeHiddenCosts: boolean
}

export interface TCOBreakdown {
  vendor: string
  year1: number
  year3: number
  year5: number
  breakdown: {
    licensing: number
    hardware: number
    implementation: number
    support: number
    training: number
    maintenance: number
    hiddenCosts: number
    complianceSavings: number
    riskReduction: number
  }
  roi: {
    paybackPeriod: number
    totalSavings: number
    breachRiskReduction: number
    operationalSavings: number
    complianceSavings: number
  }
}

export interface ComplianceMapping {
  framework: string
  controls: {
    id: string
    name: string
    portnoxSupport: "full" | "partial" | "none"
    automationLevel: number
    evidenceCollection: boolean
    continuousMonitoring: boolean
  }[]
  overallCoverage: number
  automationLevel: number
  auditReadiness: number
}

// Complete vendor database with all 13 vendors
export const ENHANCED_VENDOR_DATABASE = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    type: "cloud-native",
    category: "Next-Gen Cloud NAC",
    marketPosition: "Visionary Leader",
    pricing: {
      model: "subscription",
      perDevice: { monthly: 4.0, annual: 48, triennial: 144 },
      volumeDiscounts: { 500: 0.9, 1000: 0.85, 2500: 0.8, 5000: 0.75, 10000: 0.7 },
      hardware: { required: false, cost: 0 },
      implementation: { cost: 0, complexity: "low", timeToValue: 7 },
      support: { included: true, cost: 0, sla: "99.99%" },
      training: { cost: 0, duration: "4 hours" },
      maintenance: { cost: 0, windows: 0 },
    },
    capabilities: {
      zeroTrust: true,
      aiPowered: true,
      cloudNative: true,
      agentless: true,
      continuousCompliance: true,
      riskBasedAccess: true,
      deviceTrust: true,
      iotProfiling: true,
      microsegmentation: true,
      behaviorAnalytics: true,
      automatedRemediation: true,
      apiFirst: true,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI DSS", "SOX", "NIST 800-53", "GDPR", "ISO 27001", "FedRAMP", "CMMC", "NERC CIP"],
      automationLevel: 95,
      auditReadiness: 98,
      continuousMonitoring: true,
    },
    security: {
      zeroTrustScore: 95,
      breachReduction: 85,
      mttrReduction: 90,
      riskScore: 1.2,
    },
    operational: {
      fteRequired: 0.25,
      deploymentTime: 7,
      maintenanceHours: 2,
      upgradeComplexity: "automatic",
    },
  },
  cisco_ise: {
    id: "cisco_ise",
    name: "Cisco ISE",
    type: "on-premise",
    category: "Traditional Enterprise NAC",
    marketPosition: "Legacy Leader",
    pricing: {
      model: "perpetual",
      perDevice: { annual: 125, triennial: 375 },
      volumeDiscounts: { 500: 0.95, 1000: 0.9, 2500: 0.85, 5000: 0.8, 10000: 0.75 },
      hardware: { required: true, cost: 65000 },
      implementation: { cost: 150000, complexity: "very-high", timeToValue: 180 },
      support: { included: false, cost: 25000, sla: "99.5%" },
      training: { cost: 25000, duration: "80 hours" },
      maintenance: { cost: 33000, windows: 8 },
    },
    capabilities: {
      zeroTrust: false,
      aiPowered: false,
      cloudNative: false,
      agentless: false,
      continuousCompliance: false,
      riskBasedAccess: true,
      deviceTrust: true,
      iotProfiling: true,
      microsegmentation: true,
      behaviorAnalytics: false,
      automatedRemediation: true,
      apiFirst: false,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI DSS", "SOX", "NIST 800-53", "ISO 27001"],
      automationLevel: 50,
      auditReadiness: 70,
      continuousMonitoring: false,
    },
    security: {
      zeroTrustScore: 65,
      breachReduction: 55,
      mttrReduction: 40,
      riskScore: 3.5,
    },
    operational: {
      fteRequired: 2.5,
      deploymentTime: 180,
      maintenanceHours: 20,
      upgradeComplexity: "very-high",
    },
  },
  aruba_clearpass: {
    id: "aruba_clearpass",
    name: "Aruba ClearPass",
    type: "hybrid",
    category: "Enterprise NAC",
    marketPosition: "Challenger",
    pricing: {
      model: "perpetual",
      perDevice: { annual: 95, triennial: 285 },
      volumeDiscounts: { 500: 0.95, 1000: 0.9, 2500: 0.85, 5000: 0.8, 10000: 0.75 },
      hardware: { required: true, cost: 45000 },
      implementation: { cost: 80000, complexity: "high", timeToValue: 120 },
      support: { included: false, cost: 18000, sla: "99.0%" },
      training: { cost: 15000, duration: "40 hours" },
      maintenance: { cost: 22000, windows: 6 },
    },
    capabilities: {
      zeroTrust: false,
      aiPowered: false,
      cloudNative: false,
      agentless: true,
      continuousCompliance: false,
      riskBasedAccess: true,
      deviceTrust: true,
      iotProfiling: true,
      microsegmentation: true,
      behaviorAnalytics: false,
      automatedRemediation: true,
      apiFirst: false,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI DSS", "ISO 27001"],
      automationLevel: 35,
      auditReadiness: 65,
      continuousMonitoring: false,
    },
    security: {
      zeroTrustScore: 60,
      breachReduction: 50,
      mttrReduction: 35,
      riskScore: 3.8,
    },
    operational: {
      fteRequired: 1.5,
      deploymentTime: 120,
      maintenanceHours: 15,
      upgradeComplexity: "high",
    },
  },
  juniper_mist: {
    id: "juniper_mist",
    name: "Juniper Mist Access Assurance",
    type: "cloud-native",
    category: "AI-Driven NAC",
    marketPosition: "Challenger",
    pricing: {
      model: "subscription",
      perDevice: { monthly: 6.0, annual: 72, triennial: 216 },
      volumeDiscounts: { 500: 0.9, 1000: 0.85, 2500: 0.8, 5000: 0.75, 10000: 0.7 },
      hardware: { required: false, cost: 0 },
      implementation: { cost: 15000, complexity: "medium", timeToValue: 30 },
      support: { included: true, cost: 8000, sla: "99.9%" },
      training: { cost: 8000, duration: "16 hours" },
      maintenance: { cost: 0, windows: 3 },
    },
    capabilities: {
      zeroTrust: true,
      aiPowered: true,
      cloudNative: true,
      agentless: true,
      continuousCompliance: true,
      riskBasedAccess: true,
      deviceTrust: true,
      iotProfiling: true,
      microsegmentation: true,
      behaviorAnalytics: true,
      automatedRemediation: true,
      apiFirst: true,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI DSS", "SOX", "ISO 27001"],
      automationLevel: 80,
      auditReadiness: 85,
      continuousMonitoring: true,
    },
    security: {
      zeroTrustScore: 88,
      breachReduction: 75,
      mttrReduction: 80,
      riskScore: 2.0,
    },
    operational: {
      fteRequired: 0.5,
      deploymentTime: 30,
      maintenanceHours: 5,
      upgradeComplexity: "medium",
    },
  },
  extreme: {
    id: "extreme",
    name: "Extreme Networks NAC",
    type: "on-premise",
    category: "Enterprise NAC",
    marketPosition: "Niche Player",
    pricing: {
      model: "perpetual",
      perDevice: { annual: 88, triennial: 264 },
      volumeDiscounts: { 500: 0.95, 1000: 0.9, 2500: 0.85, 5000: 0.8, 10000: 0.75 },
      hardware: { required: true, cost: 28000 },
      implementation: { cost: 50000, complexity: "medium", timeToValue: 90 },
      support: { included: false, cost: 12000, sla: "99.0%" },
      training: { cost: 10000, duration: "24 hours" },
      maintenance: { cost: 15000, windows: 5 },
    },
    capabilities: {
      zeroTrust: false,
      aiPowered: false,
      cloudNative: false,
      agentless: true,
      continuousCompliance: false,
      riskBasedAccess: false,
      deviceTrust: true,
      iotProfiling: true,
      microsegmentation: true,
      behaviorAnalytics: false,
      automatedRemediation: false,
      apiFirst: false,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI DSS", "ISO 27001"],
      automationLevel: 25,
      auditReadiness: 55,
      continuousMonitoring: false,
    },
    security: {
      zeroTrustScore: 45,
      breachReduction: 40,
      mttrReduction: 25,
      riskScore: 4.2,
    },
    operational: {
      fteRequired: 2.0,
      deploymentTime: 90,
      maintenanceHours: 12,
      upgradeComplexity: "medium",
    },
  },
  arista: {
    id: "arista",
    name: "Arista CloudVision CUE",
    type: "cloud-native",
    category: "Cloud-Managed NAC",
    marketPosition: "Niche Player",
    pricing: {
      model: "subscription",
      perDevice: { monthly: 6.5, annual: 78, triennial: 234 },
      volumeDiscounts: { 500: 0.9, 1000: 0.85, 2500: 0.8, 5000: 0.75, 10000: 0.7 },
      hardware: { required: false, cost: 0 },
      implementation: { cost: 20000, complexity: "medium", timeToValue: 45 },
      support: { included: true, cost: 10000, sla: "99.5%" },
      training: { cost: 12000, duration: "24 hours" },
      maintenance: { cost: 0, windows: 4 },
    },
    capabilities: {
      zeroTrust: true,
      aiPowered: false,
      cloudNative: true,
      agentless: true,
      continuousCompliance: false,
      riskBasedAccess: true,
      deviceTrust: true,
      iotProfiling: true,
      microsegmentation: true,
      behaviorAnalytics: true,
      automatedRemediation: true,
      apiFirst: true,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI DSS", "ISO 27001"],
      automationLevel: 60,
      auditReadiness: 70,
      continuousMonitoring: false,
    },
    security: {
      zeroTrustScore: 70,
      breachReduction: 60,
      mttrReduction: 55,
      riskScore: 2.8,
    },
    operational: {
      fteRequired: 1.0,
      deploymentTime: 45,
      maintenanceHours: 8,
      upgradeComplexity: "medium",
    },
  },
  pulse_secure: {
    id: "pulse_secure",
    name: "Pulse Secure NAC",
    type: "on-premise",
    category: "VPN-Integrated NAC",
    marketPosition: "Niche Player",
    pricing: {
      model: "perpetual",
      perDevice: { annual: 92, triennial: 276 },
      volumeDiscounts: { 500: 0.95, 1000: 0.9, 2500: 0.85, 5000: 0.8, 10000: 0.75 },
      hardware: { required: true, cost: 35000 },
      implementation: { cost: 85000, complexity: "high", timeToValue: 150 },
      support: { included: false, cost: 20000, sla: "99.0%" },
      training: { cost: 18000, duration: "32 hours" },
      maintenance: { cost: 25000, windows: 7 },
    },
    capabilities: {
      zeroTrust: false,
      aiPowered: false,
      cloudNative: false,
      agentless: false,
      continuousCompliance: false,
      riskBasedAccess: true,
      deviceTrust: true,
      iotProfiling: false,
      microsegmentation: true,
      behaviorAnalytics: false,
      automatedRemediation: true,
      apiFirst: false,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI DSS", "ISO 27001"],
      automationLevel: 30,
      auditReadiness: 60,
      continuousMonitoring: false,
    },
    security: {
      zeroTrustScore: 50,
      breachReduction: 45,
      mttrReduction: 30,
      riskScore: 4.0,
    },
    operational: {
      fteRequired: 2.0,
      deploymentTime: 150,
      maintenanceHours: 16,
      upgradeComplexity: "high",
    },
  },
  microsoft_nps: {
    id: "microsoft_nps",
    name: "Microsoft NPS/Intune",
    type: "hybrid",
    category: "MDM-Integrated NAC",
    marketPosition: "Niche Player",
    pricing: {
      model: "subscription",
      perDevice: { monthly: 2.0, annual: 24, triennial: 72 },
      volumeDiscounts: { 500: 1.0, 1000: 1.0, 2500: 1.0, 5000: 1.0, 10000: 1.0 },
      hardware: { required: true, cost: 15000 },
      implementation: { cost: 35000, complexity: "medium", timeToValue: 60 },
      support: { included: false, cost: 8000, sla: "99.0%" },
      training: { cost: 12000, duration: "20 hours" },
      maintenance: { cost: 8000, windows: 12 },
    },
    capabilities: {
      zeroTrust: true,
      aiPowered: false,
      cloudNative: false,
      agentless: false,
      continuousCompliance: true,
      riskBasedAccess: true,
      deviceTrust: true,
      iotProfiling: false,
      microsegmentation: false,
      behaviorAnalytics: false,
      automatedRemediation: false,
      apiFirst: true,
    },
    compliance: {
      frameworks: ["HIPAA", "SOX", "GDPR", "ISO 27001"],
      automationLevel: 70,
      auditReadiness: 75,
      continuousMonitoring: true,
    },
    security: {
      zeroTrustScore: 75,
      breachReduction: 50,
      mttrReduction: 40,
      riskScore: 3.0,
    },
    operational: {
      fteRequired: 1.5,
      deploymentTime: 60,
      maintenanceHours: 25,
      upgradeComplexity: "medium",
    },
  },
  foxpass: {
    id: "foxpass",
    name: "Foxpass",
    type: "cloud-radius",
    category: "Cloud RADIUS",
    marketPosition: "Niche Player",
    pricing: {
      model: "subscription",
      perDevice: { monthly: 1.5, annual: 18, triennial: 54 },
      volumeDiscounts: { 500: 0.9, 1000: 0.85, 2500: 0.8, 5000: 0.75, 10000: 0.7 },
      hardware: { required: false, cost: 0 },
      implementation: { cost: 5000, complexity: "low", timeToValue: 3 },
      support: { included: true, cost: 0, sla: "99.5%" },
      training: { cost: 2000, duration: "4 hours" },
      maintenance: { cost: 0, windows: 1 },
    },
    capabilities: {
      zeroTrust: false,
      aiPowered: false,
      cloudNative: true,
      agentless: true,
      continuousCompliance: false,
      riskBasedAccess: false,
      deviceTrust: false,
      iotProfiling: false,
      microsegmentation: false,
      behaviorAnalytics: false,
      automatedRemediation: false,
      apiFirst: true,
    },
    compliance: {
      frameworks: ["SOX", "GDPR"],
      automationLevel: 20,
      auditReadiness: 40,
      continuousMonitoring: false,
    },
    security: {
      zeroTrustScore: 30,
      breachReduction: 25,
      mttrReduction: 15,
      riskScore: 5.5,
    },
    operational: {
      fteRequired: 0.25,
      deploymentTime: 3,
      maintenanceHours: 1,
      upgradeComplexity: "low",
    },
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    type: "cloud-radius",
    category: "Cloud PKI & RADIUS",
    marketPosition: "Niche Player",
    pricing: {
      model: "subscription",
      perDevice: { monthly: 2.5, annual: 30, triennial: 90 },
      volumeDiscounts: { 500: 0.9, 1000: 0.85, 2500: 0.8, 5000: 0.75, 10000: 0.7 },
      hardware: { required: false, cost: 0 },
      implementation: { cost: 8000, complexity: "low", timeToValue: 7 },
      support: { included: true, cost: 0, sla: "99.5%" },
      training: { cost: 3000, duration: "8 hours" },
      maintenance: { cost: 0, windows: 2 },
    },
    capabilities: {
      zeroTrust: false,
      aiPowered: false,
      cloudNative: true,
      agentless: true,
      continuousCompliance: false,
      riskBasedAccess: false,
      deviceTrust: true,
      iotProfiling: false,
      microsegmentation: false,
      behaviorAnalytics: false,
      automatedRemediation: true,
      apiFirst: true,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI DSS", "SOX"],
      automationLevel: 40,
      auditReadiness: 50,
      continuousMonitoring: false,
    },
    security: {
      zeroTrustScore: 45,
      breachReduction: 35,
      mttrReduction: 25,
      riskScore: 4.5,
    },
    operational: {
      fteRequired: 0.5,
      deploymentTime: 7,
      maintenanceHours: 2,
      upgradeComplexity: "low",
    },
  },
  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    type: "open-source",
    category: "Open Source NAC",
    marketPosition: "Niche Player",
    pricing: {
      model: "open-source",
      perDevice: { annual: 0, triennial: 0 },
      volumeDiscounts: { 500: 1.0, 1000: 1.0, 2500: 1.0, 5000: 1.0, 10000: 1.0 },
      hardware: { required: true, cost: 25000 },
      implementation: { cost: 95000, complexity: "very-high", timeToValue: 120 },
      support: { included: false, cost: 25000, sla: "95.0%" },
      training: { cost: 20000, duration: "60 hours" },
      maintenance: { cost: 15000, windows: 8 },
    },
    capabilities: {
      zeroTrust: false,
      aiPowered: false,
      cloudNative: false,
      agentless: true,
      continuousCompliance: false,
      riskBasedAccess: false,
      deviceTrust: true,
      iotProfiling: true,
      microsegmentation: true,
      behaviorAnalytics: false,
      automatedRemediation: true,
      apiFirst: true,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI DSS"],
      automationLevel: 15,
      auditReadiness: 35,
      continuousMonitoring: false,
    },
    security: {
      zeroTrustScore: 40,
      breachReduction: 30,
      mttrReduction: 20,
      riskScore: 5.0,
    },
    operational: {
      fteRequired: 4.0,
      deploymentTime: 120,
      maintenanceHours: 30,
      upgradeComplexity: "very-high",
    },
  },
  forescout: {
    id: "forescout",
    name: "Forescout eyeSight",
    type: "hybrid",
    category: "Agentless NAC",
    marketPosition: "Challenger",
    pricing: {
      model: "subscription",
      perDevice: { monthly: 7.0, annual: 84, triennial: 252 },
      volumeDiscounts: { 500: 0.9, 1000: 0.85, 2500: 0.8, 5000: 0.75, 10000: 0.7 },
      hardware: { required: true, cost: 55000 },
      implementation: { cost: 80000, complexity: "high", timeToValue: 90 },
      support: { included: false, cost: 22000, sla: "99.0%" },
      training: { cost: 18000, duration: "32 hours" },
      maintenance: { cost: 20000, windows: 6 },
    },
    capabilities: {
      zeroTrust: true,
      aiPowered: false,
      cloudNative: false,
      agentless: true,
      continuousCompliance: true,
      riskBasedAccess: true,
      deviceTrust: true,
      iotProfiling: true,
      microsegmentation: true,
      behaviorAnalytics: true,
      automatedRemediation: true,
      apiFirst: true,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI DSS", "SOX", "NIST 800-53", "ISO 27001"],
      automationLevel: 70,
      auditReadiness: 80,
      continuousMonitoring: true,
    },
    security: {
      zeroTrustScore: 80,
      breachReduction: 70,
      mttrReduction: 65,
      riskScore: 2.5,
    },
    operational: {
      fteRequired: 1.5,
      deploymentTime: 90,
      maintenanceHours: 12,
      upgradeComplexity: "high",
    },
  },
  meraki: {
    id: "meraki",
    name: "Cisco Meraki Access Control",
    type: "cloud-managed",
    category: "Cloud-Managed NAC",
    marketPosition: "Challenger",
    pricing: {
      model: "subscription",
      perDevice: { monthly: 5.5, annual: 66, triennial: 198 },
      volumeDiscounts: { 500: 0.9, 1000: 0.85, 2500: 0.8, 5000: 0.75, 10000: 0.7 },
      hardware: { required: true, cost: 85000 },
      implementation: { cost: 25000, complexity: "medium", timeToValue: 45 },
      support: { included: true, cost: 0, sla: "99.9%" },
      training: { cost: 5000, duration: "16 hours" },
      maintenance: { cost: 0, windows: 3 },
    },
    capabilities: {
      zeroTrust: false,
      aiPowered: false,
      cloudNative: false,
      agentless: false,
      continuousCompliance: false,
      riskBasedAccess: false,
      deviceTrust: true,
      iotProfiling: true,
      microsegmentation: true,
      behaviorAnalytics: false,
      automatedRemediation: true,
      apiFirst: true,
    },
    compliance: {
      frameworks: ["HIPAA", "PCI DSS", "ISO 27001"],
      automationLevel: 40,
      auditReadiness: 60,
      continuousMonitoring: false,
    },
    security: {
      zeroTrustScore: 55,
      breachReduction: 45,
      mttrReduction: 35,
      riskScore: 3.5,
    },
    operational: {
      fteRequired: 1.0,
      deploymentTime: 45,
      maintenanceHours: 6,
      upgradeComplexity: "low",
    },
  },
}

// Complete industry database with all 8 industries
export const INDUSTRY_DATABASE = {
  healthcare: {
    name: "Healthcare",
    riskProfile: "critical",
    avgBreachCost: 10930000,
    breachProbability: 0.28,
    regulations: ["HIPAA", "HITECH", "GDPR", "SOX"],
    specificRequirements: {
      medicalDeviceManagement: true,
      patientDataProtection: true,
      byodManagement: true,
      guestAccess: true,
      iotSecurity: true,
      continuousCompliance: true,
    },
    complianceFrameworks: ["HIPAA", "GDPR", "ISO 27001", "SOC 2"],
    cyberInsurance: {
      minimumCoverage: 10000000,
      typicalPremium: 250000,
      nacDiscount: 30,
    },
  },
  financial: {
    name: "Financial Services",
    riskProfile: "critical",
    avgBreachCost: 5970000,
    breachProbability: 0.24,
    regulations: ["PCI DSS", "SOX", "GLBA", "GDPR"],
    specificRequirements: {
      paymentCardSecurity: true,
      fraudPrevention: true,
      riskBasedAccess: true,
      privilegedAccess: true,
      auditTrails: true,
      continuousCompliance: true,
    },
    complianceFrameworks: ["PCI DSS", "SOX", "GDPR", "ISO 27001"],
    cyberInsurance: {
      minimumCoverage: 25000000,
      typicalPremium: 400000,
      nacDiscount: 25,
    },
  },
  retail: {
    name: "Retail",
    riskProfile: "high",
    avgBreachCost: 3620000,
    breachProbability: 0.2,
    regulations: ["PCI DSS", "GDPR", "CCPA"],
    specificRequirements: {
      posSystemSecurity: true,
      guestWifiManagement: true,
      seasonalStaffing: true,
      multiLocationManagement: true,
      iotDevices: true,
      customerDataProtection: true,
    },
    complianceFrameworks: ["PCI DSS", "GDPR", "ISO 27001"],
    cyberInsurance: {
      minimumCoverage: 5000000,
      typicalPremium: 150000,
      nacDiscount: 20,
    },
  },
  manufacturing: {
    name: "Manufacturing",
    riskProfile: "high",
    avgBreachCost: 4470000,
    breachProbability: 0.22,
    regulations: ["ISO 27001", "NIST CSF", "IEC 62443"],
    specificRequirements: {
      otItConvergence: true,
      industrialIotSecurity: true,
      supplyChainSecurity: true,
      intellectualPropertyProtection: true,
      remoteAccess: true,
      safetySystemsProtection: true,
    },
    complianceFrameworks: ["ISO 27001", "NIST 800-53", "IEC 62443"],
    cyberInsurance: {
      minimumCoverage: 10000000,
      typicalPremium: 200000,
      nacDiscount: 22,
    },
  },
  education: {
    name: "Education",
    riskProfile: "medium",
    avgBreachCost: 3860000,
    breachProbability: 0.18,
    regulations: ["FERPA", "COPPA", "GDPR"],
    specificRequirements: {
      studentDataProtection: true,
      byodManagement: true,
      guestAccess: true,
      researchDataSecurity: true,
      campusWideAccess: true,
      budgetConstraints: true,
    },
    complianceFrameworks: ["FERPA", "GDPR", "ISO 27001"],
    cyberInsurance: {
      minimumCoverage: 5000000,
      typicalPremium: 100000,
      nacDiscount: 18,
    },
  },
  government: {
    name: "Government",
    riskProfile: "critical",
    avgBreachCost: 5240000,
    breachProbability: 0.26,
    regulations: ["FISMA", "FedRAMP", "NIST 800-53", "CMMC"],
    specificRequirements: {
      classifiedDataProtection: true,
      citizenDataSecurity: true,
      criticalInfrastructureProtection: true,
      interAgencyCollaboration: true,
      emergencyResponseSystems: true,
      publicWifiServices: true,
    },
    complianceFrameworks: ["NIST 800-53", "FedRAMP", "CMMC", "ISO 27001"],
    cyberInsurance: {
      minimumCoverage: 20000000,
      typicalPremium: 300000,
      nacDiscount: 28,
    },
  },
  technology: {
    name: "Technology",
    riskProfile: "high",
    avgBreachCost: 4880000,
    breachProbability: 0.16,
    regulations: ["SOX", "GDPR", "CCPA", "ISO 27001"],
    specificRequirements: {
      intellectualPropertyProtection: true,
      customerDataSecurity: true,
      devopsIntegration: true,
      apiSecurity: true,
      cloudNativeArchitecture: true,
      remoteWorkforce: true,
    },
    complianceFrameworks: ["SOX", "ISO 27001", "GDPR", "SOC 2"],
    cyberInsurance: {
      minimumCoverage: 15000000,
      typicalPremium: 180000,
      nacDiscount: 24,
    },
  },
  energy: {
    name: "Energy & Utilities",
    riskProfile: "critical",
    avgBreachCost: 5010000,
    breachProbability: 0.25,
    regulations: ["NERC CIP", "NIST CSF", "IEC 62443"],
    specificRequirements: {
      scadaSystemProtection: true,
      criticalInfrastructureSegmentation: true,
      fieldDeviceSecurity: true,
      vendorContractorAccess: true,
      smartGridSecurity: true,
      emergencyResponseSystems: true,
    },
    complianceFrameworks: ["NERC CIP", "NIST 800-53", "ISO 27001"],
    cyberInsurance: {
      minimumCoverage: 20000000,
      typicalPremium: 350000,
      nacDiscount: 26,
    },
  },
}

// Complete compliance framework mappings with Portnox control coverage
export const COMPLIANCE_FRAMEWORK_MAPPINGS: Record<string, ComplianceMapping> = {
  HIPAA: {
    framework: "HIPAA",
    controls: [
      {
        id: "164.308(a)(1)",
        name: "Security Management Process",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "164.308(a)(3)",
        name: "Workforce Security",
        portnoxSupport: "full",
        automationLevel: 90,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "164.308(a)(4)",
        name: "Information Access Management",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "164.310(a)",
        name: "Facility Access Controls",
        portnoxSupport: "full",
        automationLevel: 85,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "164.312(a)",
        name: "Access Control",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "164.312(b)",
        name: "Audit Controls",
        portnoxSupport: "full",
        automationLevel: 100,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
    ],
    overallCoverage: 95,
    automationLevel: 93,
    auditReadiness: 98,
  },
  "PCI DSS": {
    framework: "PCI DSS",
    controls: [
      {
        id: "1.1",
        name: "Network Segmentation",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "2.1",
        name: "Default Credentials",
        portnoxSupport: "full",
        automationLevel: 90,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "7.1",
        name: "Access Control",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "8.1",
        name: "User Identification",
        portnoxSupport: "full",
        automationLevel: 100,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "10.1",
        name: "Audit Trails",
        portnoxSupport: "full",
        automationLevel: 100,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "11.1",
        name: "Wireless Detection",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
    ],
    overallCoverage: 96,
    automationLevel: 96,
    auditReadiness: 98,
  },
  SOX: {
    framework: "SOX",
    controls: [
      {
        id: "Section 302",
        name: "Corporate Responsibility",
        portnoxSupport: "full",
        automationLevel: 90,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "Section 404",
        name: "Internal Controls",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "Section 802",
        name: "Records Retention",
        portnoxSupport: "full",
        automationLevel: 100,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
    ],
    overallCoverage: 95,
    automationLevel: 95,
    auditReadiness: 97,
  },
  "NIST 800-53": {
    framework: "NIST 800-53",
    controls: [
      {
        id: "AC-2",
        name: "Account Management",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "AC-3",
        name: "Access Enforcement",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "AC-4",
        name: "Information Flow Enforcement",
        portnoxSupport: "full",
        automationLevel: 90,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "IA-2",
        name: "Identification and Authentication",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "AU-2",
        name: "Audit Events",
        portnoxSupport: "full",
        automationLevel: 100,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
    ],
    overallCoverage: 95,
    automationLevel: 95,
    auditReadiness: 98,
  },
  GDPR: {
    framework: "GDPR",
    controls: [
      {
        id: "Article 25",
        name: "Data Protection by Design",
        portnoxSupport: "full",
        automationLevel: 90,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "Article 32",
        name: "Security of Processing",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "Article 33",
        name: "Breach Notification",
        portnoxSupport: "full",
        automationLevel: 100,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "Article 35",
        name: "Data Protection Impact Assessment",
        portnoxSupport: "full",
        automationLevel: 85,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
    ],
    overallCoverage: 93,
    automationLevel: 93,
    auditReadiness: 96,
  },
  "ISO 27001": {
    framework: "ISO 27001",
    controls: [
      {
        id: "A.9.1",
        name: "Access Control Policy",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "A.9.2",
        name: "User Access Management",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "A.9.4",
        name: "System and Application Access Control",
        portnoxSupport: "full",
        automationLevel: 90,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "A.12.4",
        name: "Logging and Monitoring",
        portnoxSupport: "full",
        automationLevel: 100,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
    ],
    overallCoverage: 95,
    automationLevel: 95,
    auditReadiness: 97,
  },
  FedRAMP: {
    framework: "FedRAMP",
    controls: [
      {
        id: "AC-2",
        name: "Account Management",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "AC-3",
        name: "Access Enforcement",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "IA-2",
        name: "Identification and Authentication",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "SC-7",
        name: "Boundary Protection",
        portnoxSupport: "full",
        automationLevel: 90,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
    ],
    overallCoverage: 94,
    automationLevel: 94,
    auditReadiness: 97,
  },
  CMMC: {
    framework: "CMMC",
    controls: [
      {
        id: "AC.1.001",
        name: "Access Control Policy",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "AC.2.016",
        name: "Privileged Functions",
        portnoxSupport: "full",
        automationLevel: 90,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "IA.1.076",
        name: "User Identification",
        portnoxSupport: "full",
        automationLevel: 95,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "AU.3.045",
        name: "Audit Review",
        portnoxSupport: "full",
        automationLevel: 100,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
    ],
    overallCoverage: 95,
    automationLevel: 95,
    auditReadiness: 98,
  },
  "NERC CIP": {
    framework: "NERC CIP",
    controls: [
      {
        id: "CIP-005",
        name: "Electronic Security Perimeters",
        portnoxSupport: "full",
        automationLevel: 90,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "CIP-007",
        name: "Cyber Security Systems Security Management",
        portnoxSupport: "full",
        automationLevel: 85,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
      {
        id: "CIP-008",
        name: "Incident Reporting and Response Planning",
        portnoxSupport: "full",
        automationLevel: 90,
        evidenceCollection: true,
        continuousMonitoring: true,
      },
    ],
    overallCoverage: 88,
    automationLevel: 88,
    auditReadiness: 92,
  },
}

// Main TCO calculation function
export function calculateTCO(config: CalculationConfiguration): Record<string, TCOBreakdown> {
  const results: Record<string, TCOBreakdown> = {}

  Object.entries(ENHANCED_VENDOR_DATABASE).forEach(([vendorId, vendor]) => {
    const breakdown = calculateVendorTCO(vendor, config)
    results[vendorId] = breakdown
  })

  return results
}

function calculateVendorTCO(vendor: any, config: CalculationConfiguration): TCOBreakdown {
  const { deviceCount, timeframe, industry } = config
  const industryData = INDUSTRY_DATABASE[industry]

  // Base pricing calculations
  const volumeDiscount = getVolumeDiscount(vendor.pricing.volumeDiscounts, deviceCount)
  const basePrice = vendor.pricing.perDevice.annual * volumeDiscount

  // Calculate costs by category
  const licensing = calculateLicensingCosts(vendor, deviceCount, timeframe, basePrice)
  const hardware = calculateHardwareCosts(vendor, deviceCount, timeframe)
  const implementation = calculateImplementationCosts(vendor, deviceCount, config)
  const support = calculateSupportCosts(vendor, deviceCount, timeframe)
  const training = calculateTrainingCosts(vendor, deviceCount, timeframe)
  const maintenance = calculateMaintenanceCosts(vendor, deviceCount, timeframe)
  const hiddenCosts = config.includeHiddenCosts ? calculateHiddenCosts(vendor, deviceCount, timeframe) : 0

  // Calculate benefits
  const complianceSavings = config.includeCompliance
    ? calculateComplianceSavings(vendor, industryData, deviceCount, timeframe)
    : 0
  const riskReduction = config.includeRiskReduction
    ? calculateRiskReduction(vendor, industryData, deviceCount, timeframe)
    : 0

  // Total calculations
  const totalCosts = licensing + hardware + implementation + support + training + maintenance + hiddenCosts
  const totalBenefits = complianceSavings + riskReduction
  const netCost = totalCosts - totalBenefits

  // ROI calculations
  const roi = calculateROI(vendor, industryData, deviceCount, timeframe, totalBenefits, totalCosts)

  return {
    vendor: vendor.name,
    year1: netCost / timeframe,
    year3: timeframe >= 3 ? netCost : netCost * 3,
    year5: timeframe >= 5 ? netCost : netCost * (5 / timeframe),
    breakdown: {
      licensing,
      hardware,
      implementation,
      support,
      training,
      maintenance,
      hiddenCosts,
      complianceSavings,
      riskReduction,
    },
    roi,
  }
}

function getVolumeDiscount(discounts: Record<number, number>, deviceCount: number): number {
  const thresholds = Object.keys(discounts)
    .map(Number)
    .sort((a, b) => b - a)
  for (const threshold of thresholds) {
    if (deviceCount >= threshold) {
      return discounts[threshold]
    }
  }
  return 1.0
}

function calculateLicensingCosts(vendor: any, deviceCount: number, timeframe: number, basePrice: number): number {
  if (vendor.pricing.model === "open-source") return 0
  return basePrice * deviceCount * timeframe
}

function calculateHardwareCosts(vendor: any, deviceCount: number, timeframe: number): number {
  if (!vendor.pricing.hardware.required) return 0

  let cost = vendor.pricing.hardware.cost

  // Scale hardware based on device count
  const scaleFactor = Math.ceil(deviceCount / 5000)
  cost *= scaleFactor

  // Add refresh costs for longer timeframes
  if (timeframe >= 5) {
    cost += cost * 0.5 // 50% refresh cost in year 5
  }

  return cost
}

function calculateImplementationCosts(vendor: any, deviceCount: number, config: CalculationConfiguration): number {
  let baseCost = vendor.pricing.implementation.cost

  // Scale based on device count
  const scaleFactor = Math.sqrt(deviceCount / 1000)
  baseCost *= scaleFactor

  // Add migration costs if replacing existing NAC
  if (config.hasExistingNAC && config.currentVendor) {
    const migrationMultiplier = vendor.id === "portnox" ? 0.2 : 1.5
    baseCost *= migrationMultiplier
  }

  // Industry complexity multiplier
  const industryData = INDUSTRY_DATABASE[config.industry]
  if (industryData.riskProfile === "critical") {
    baseCost *= 1.3
  }

  return baseCost
}

function calculateSupportCosts(vendor: any, deviceCount: number, timeframe: number): number {
  if (vendor.pricing.support.included) return 0
  return vendor.pricing.support.cost * timeframe
}

function calculateTrainingCosts(vendor: any, deviceCount: number, timeframe: number): number {
  let baseCost = vendor.pricing.training.cost

  // Scale training based on operational complexity
  const complexityMultiplier = vendor.operational.fteRequired
  baseCost *= complexityMultiplier

  // Add recurring training for complex systems
  if (vendor.operational.upgradeComplexity === "very-high") {
    baseCost *= timeframe * 0.5 // Additional training each year
  }

  return baseCost
}

function calculateMaintenanceCosts(vendor: any, deviceCount: number, timeframe: number): number {
  const maintenanceHours = vendor.operational.maintenanceHours * timeframe
  const hourlyCost = 150 // Average IT hourly rate
  return maintenanceHours * hourlyCost * Math.ceil(deviceCount / 1000)
}

function calculateHiddenCosts(vendor: any, deviceCount: number, timeframe: number): number {
  let hiddenCosts = 0

  // Downtime costs
  if (vendor.operational.maintenanceHours > 0) {
    const downtimeCost = vendor.operational.maintenanceHours * 5000 * timeframe // $5k per hour of downtime
    hiddenCosts += downtimeCost
  }

  // Complexity costs (additional FTE requirements)
  const additionalFTE = Math.max(0, vendor.operational.fteRequired - 0.5)
  hiddenCosts += additionalFTE * 120000 * timeframe // $120k per additional FTE

  // Vendor lock-in costs
  if (vendor.type === "on-premise") {
    hiddenCosts += 50000 * timeframe // Lock-in penalty
  }

  // Integration complexity
  if (vendor.operational.upgradeComplexity === "very-high") {
    hiddenCosts += 25000 * timeframe
  }

  return hiddenCosts
}

function calculateComplianceSavings(vendor: any, industryData: any, deviceCount: number, timeframe: number): number {
  let savings = 0

  // Audit cost reduction
  const auditSavings = vendor.compliance.automationLevel * 1000 * timeframe
  savings += auditSavings

  // Violation risk reduction
  const violationRisk = industryData.avgBreachCost * 0.1 // 10% chance of violation
  const riskReduction = (vendor.compliance.automationLevel / 100) * violationRisk
  savings += riskReduction

  // Insurance premium reduction
  const insuranceSavings =
    industryData.cyberInsurance.typicalPremium * (industryData.cyberInsurance.nacDiscount / 100) * timeframe
  savings += insuranceSavings

  return savings
}

function calculateRiskReduction(vendor: any, industryData: any, deviceCount: number, timeframe: number): number {
  let riskReduction = 0

  // Breach cost reduction
  const breachReduction =
    industryData.avgBreachCost * (vendor.security.breachReduction / 100) * industryData.breachProbability * timeframe
  riskReduction += breachReduction

  // Incident response cost reduction
  const incidentSavings = vendor.security.mttrReduction * 10000 * timeframe // $10k per % MTTR reduction
  riskReduction += incidentSavings

  // Operational efficiency gains
  const efficiencyGains = ((100 - vendor.operational.fteRequired * 20) * 1000 * deviceCount * timeframe) / 100
  riskReduction += efficiencyGains

  return riskReduction
}

function calculateROI(
  vendor: any,
  industryData: any,
  deviceCount: number,
  timeframe: number,
  totalBenefits: number,
  totalCosts: number,
) {
  const paybackPeriod = totalCosts > 0 ? totalCosts / (totalBenefits / timeframe) / 12 : 0 // months

  return {
    paybackPeriod: Math.round(paybackPeriod * 10) / 10,
    totalSavings: totalBenefits,
    breachRiskReduction: vendor.security.breachReduction,
    operationalSavings: ((100 - vendor.operational.fteRequired * 20) * 1000 * deviceCount * timeframe) / 100,
    complianceSavings: vendor.compliance.automationLevel * 1000 * timeframe,
  }
}

// Export utility functions
export function getVendorById(vendorId: string) {
  return ENHANCED_VENDOR_DATABASE[vendorId]
}

export function getIndustryData(industryId: string) {
  return INDUSTRY_DATABASE[industryId]
}

export function getComplianceMapping(frameworkId: string): ComplianceMapping | undefined {
  return COMPLIANCE_FRAMEWORK_MAPPINGS[frameworkId]
}

export function getAllVendors() {
  return Object.values(ENHANCED_VENDOR_DATABASE)
}

export function getAllIndustries() {
  return Object.values(INDUSTRY_DATABASE)
}

export function getAllComplianceFrameworks() {
  return Object.keys(COMPLIANCE_FRAMEWORK_MAPPINGS)
}

// Vendor comparison utilities
export function compareVendors(vendorIds: string[], config: CalculationConfiguration) {
  const results: Record<string, TCOBreakdown> = {}

  vendorIds.forEach((vendorId) => {
    const vendor = ENHANCED_VENDOR_DATABASE[vendorId]
    if (vendor) {
      results[vendorId] = calculateVendorTCO(vendor, config)
    }
  })

  return results
}

export function generateVendorRecommendations(config: CalculationConfiguration) {
  const allResults = calculateTCO(config)
  const industryData = INDUSTRY_DATABASE[config.industry]

  // Sort by net cost (lowest first)
  const sortedVendors = Object.entries(allResults).sort(
    ([, a], [, b]) =>
      a.year3 -
      a.breakdown.complianceSavings -
      a.breakdown.riskReduction -
      (b.year3 - b.breakdown.complianceSavings - b.breakdown.riskReduction),
  )

  const recommendations = []

  // Top cost-effective choice
  const topChoice = sortedVendors[0]
  recommendations.push({
    rank: 1,
    vendor: topChoice[1].vendor,
    reason: "Lowest total cost of ownership",
    savings: sortedVendors[1] ? sortedVendors[1][1].year3 - topChoice[1].year3 : 0,
  })

  // Best security choice
  const securityChoice = Object.entries(allResults).sort(
    ([, a], [, b]) =>
      ENHANCED_VENDOR_DATABASE[b.vendor.toLowerCase().replace(/\s+/g, "_")].security.zeroTrustScore -
      ENHANCED_VENDOR_DATABASE[a.vendor.toLowerCase().replace(/\s+/g, "_")].security.zeroTrustScore,
  )[0]

  if (securityChoice[0] !== topChoice[0]) {
    recommendations.push({
      rank: 2,
      vendor: securityChoice[1].vendor,
      reason: "Highest security posture",
      securityScore: ENHANCED_VENDOR_DATABASE[securityChoice[0]].security.zeroTrustScore,
    })
  }

  // Best compliance choice
  const complianceChoice = Object.entries(allResults).sort(
    ([, a], [, b]) =>
      ENHANCED_VENDOR_DATABASE[b.vendor.toLowerCase().replace(/\s+/g, "_")].compliance.automationLevel -
      ENHANCED_VENDOR_DATABASE[a.vendor.toLowerCase().replace(/\s+/g, "_")].compliance.automationLevel,
  )[0]

  if (complianceChoice[0] !== topChoice[0] && complianceChoice[0] !== securityChoice[0]) {
    recommendations.push({
      rank: 3,
      vendor: complianceChoice[1].vendor,
      reason: "Best compliance automation",
      automationLevel: ENHANCED_VENDOR_DATABASE[complianceChoice[0]].compliance.automationLevel,
    })
  }

  return recommendations
}
