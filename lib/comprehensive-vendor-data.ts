export interface VendorPricingTier {
  name: string
  listPrice: number | string
  streetPrice?: string
  features: string[]
  unit: "endpoint" | "user" | "device" | "admin" | "port" | "AP"
  period: "year" | "month"
}

export interface VendorHardware {
  name: string
  listPrice: number
  streetPrice?: string
  capacity: string
  useCase: string
}

export interface VendorService {
  name: string
  cost: number | string
  description?: string
}

export interface VendorIntegration {
  name: string
  cost: number | string
  complexity?: "low" | "medium" | "high"
}

export interface VendorFeatureSupport {
  [key: string]: "✓✓✓" | "✓✓" | "✓" | "✗" | string
}

export interface VendorDetails {
  id: string
  name: string
  description: string
  category: "enterprise" | "mid-market" | "sme" | "cloud-native" | "open-source"
  marketPosition: "leader" | "challenger" | "visionary" | "niche"
  licensing: {
    base: VendorPricingTier[]
    modules: VendorPricingTier[]
    tacacs?: VendorPricingTier[]
  }
  hardware: {
    physical: VendorHardware[]
    virtual: VendorHardware[]
    cloud?: VendorHardware[]
  }
  highAvailability: {
    licensing: string
    cost: string
    failoverTime: string
  }
  integrations: {
    identity: VendorIntegration[]
    mdm: VendorIntegration[]
    siem: VendorIntegration[]
    security: VendorIntegration[]
  }
  featureSupport: {
    authentication: VendorFeatureSupport
    network: VendorFeatureSupport
    advanced: VendorFeatureSupport
    compliance: VendorFeatureSupport
  }
  professionalServices: {
    vendor: VendorService[]
    partner: VendorService[]
    training: VendorService[]
  }
  hiddenCosts: {
    licensingGotchas: string[]
    performanceLimitations: string[]
    operationalOverhead: string[]
    commonExpenses: VendorService[]
  }
  tcoFactors: {
    fteRequirement: number
    downtimeRisk: "low" | "medium" | "high"
    upgradeComplexity: "low" | "medium" | "high"
  }
}

export interface VendorData {
  id: string
  name: string
  category: string
  deploymentModel: string
  pricing: {
    model: "subscription" | "perpetual" | "hybrid"
    basePrice: number
    minimumDevices: number
    volumeDiscounts: Array<{
      min: number
      max: number
      discount: number
    }>
    includedFeatures: string[]
    additionalCosts: string[]
    hiddenCosts: string
  }
  costs: {
    hardware: number
    software: number
    implementation: number
    training: number
    support: number
    maintenance: number
    infrastructure: number
    personnelPerYear: number
    downtimePerYear: number
    patchingPerYear: number
    upgradesCycle: number
    energyCosts: number
    rackSpace: number
    networkBandwidth: number
    backupStorage: number
    disasterRecovery: number
  }
  metrics: {
    deploymentTime: number
    timeToValue: number
    fteRequired: number
    mttr: number
    availability: number
    scalability: string
    performanceImpact: string
    userSatisfaction: number
    npsScore: number
    supportResponseTime: number
    updateFrequency: string
    patchingEffort: string
    integrationEffort: string
  }
  security: {
    zeroTrustScore: number
    deviceAuthMethods: number
    riskAssessmentReal: boolean
    automatedRemediation: boolean
    threatIntelligence: boolean
    behavioralAnalytics: boolean
    microsegmentation: boolean
    encryptionStandards: string[]
    certifications: string[]
    vulnerabilityManagement: string
    incidentResponse: string
    forensicsCapability: boolean
    dlpIntegration: boolean
  }
  compliance: {
    frameworks: Record<string, { coverage: number; controls: number }>
    reportingCapabilities: string
    auditTrail: string
    dataResidency: string
    dataRetention: string
  }
  features: {
    deviceVisibility: boolean
    deviceProfiling: boolean
    networkAccessControl: boolean
    guestAccess: boolean
    byod: boolean
    iotSupport: boolean
    conditionalAccess: boolean
    applicationControl: boolean
    pkiServices: boolean
    cloudRadius: boolean
    tacacs: boolean
    samlIntegration: boolean
    mfaSupport: boolean
    centralizedManagement: boolean
    multiTenancy: boolean
    roleBasedAccess: boolean
    apiAvailable: boolean
    customIntegrations: boolean
    automatedOnboarding: boolean
    selfServicePortal: boolean
    automatedCompliance: boolean
    workflowAutomation: boolean
  }
  riskReduction: {
    breachProbabilityReduction: number
    dataExfiltrationPrevention: number
    lateralMovementPrevention: number
    unauthorizedAccessPrevention: number
    malwareSpreadPrevention: number
    insiderThreatMitigation: number
    complianceViolationReduction: number
    shadowITDiscovery: number
    avgBreachCostReduction: number
    insurancePremiumReduction: number
    compliancePenaltyAvoidance: number
    operationalLossReduction: number
  }
}

// New comprehensive vendor database
export const vendorDatabase: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox Cloud",
    category: "Cloud-Native Zero Trust NAC",
    deploymentModel: "SaaS",
    pricing: {
      model: "subscription",
      basePrice: 20,
      minimumDevices: 50,
      volumeDiscounts: [
        { min: 50, max: 250, discount: 0 },
        { min: 251, max: 500, discount: 10 },
        { min: 501, max: 1000, discount: 15 },
        { min: 1001, max: 5000, discount: 20 },
        { min: 5001, max: Number.POSITIVE_INFINITY, discount: 25 },
      ],
      includedFeatures: [
        "Zero Trust Network Access",
        "Conditional Access for Applications",
        "PKI Certificate Services",
        "IoT Device Profiling",
        "TACACS+ Authentication",
        "Cloud RADIUS",
        "Guest Access Management",
        "BYOD Support",
        "24/7 Support",
        "Onboarding Assistance",
        "Regular Updates",
        "API Access",
        "Multi-tenancy",
        "Compliance Reporting",
      ],
      additionalCosts: [],
      hiddenCosts: "None - All-inclusive pricing",
    },
    costs: {
      hardware: 0,
      software: 0,
      implementation: 5000,
      training: 0,
      support: 0,
      maintenance: 0,
      infrastructure: 0,
      personnelPerYear: 25000,
      downtimePerYear: 2000,
      patchingPerYear: 0,
      upgradesCycle: 0,
      energyCosts: 0,
      rackSpace: 0,
      networkBandwidth: 0,
      backupStorage: 0,
      disasterRecovery: 0,
    },
    metrics: {
      deploymentTime: 1,
      timeToValue: 7,
      fteRequired: 0.25,
      mttr: 0.5,
      availability: 99.99,
      scalability: "Unlimited",
      performanceImpact: "Minimal",
      userSatisfaction: 94,
      npsScore: 72,
      supportResponseTime: 15,
      updateFrequency: "Continuous",
      patchingEffort: "Zero",
      integrationEffort: "Low",
    },
    security: {
      zeroTrustScore: 98,
      deviceAuthMethods: 10,
      riskAssessmentReal: true,
      automatedRemediation: true,
      threatIntelligence: true,
      behavioralAnalytics: true,
      microsegmentation: true,
      encryptionStandards: ["TLS 1.3", "AES-256", "RSA-4096"],
      certifications: ["SOC 2", "ISO 27001", "CSA STAR"],
      vulnerabilityManagement: "Automated",
      incidentResponse: "Automated + Expert Support",
      forensicsCapability: true,
      dlpIntegration: true,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 94, controls: 98 },
        "pci-dss": { coverage: 91, controls: 12 },
        hipaa: { coverage: 89, controls: 54 },
        gdpr: { coverage: 93, controls: 35 },
        iso27001: { coverage: 90, controls: 114 },
        sox: { coverage: 88, controls: 20 },
        fedramp: { coverage: 85, controls: 325 },
        fisma: { coverage: 87, controls: 200 },
        ccpa: { coverage: 91, controls: 10 },
        cis: { coverage: 93, controls: 153 },
        cmmc: { coverage: 88, controls: 130 },
        "nerc-cip": { coverage: 82, controls: 45 },
      },
      reportingCapabilities: "Automated",
      auditTrail: "Complete",
      dataResidency: "Multi-region",
      dataRetention: "Configurable",
    },
    features: {
      deviceVisibility: true,
      deviceProfiling: true,
      networkAccessControl: true,
      guestAccess: true,
      byod: true,
      iotSupport: true,
      conditionalAccess: true,
      applicationControl: true,
      pkiServices: true,
      cloudRadius: true,
      tacacs: true,
      samlIntegration: true,
      mfaSupport: true,
      centralizedManagement: true,
      multiTenancy: true,
      roleBasedAccess: true,
      apiAvailable: true,
      customIntegrations: true,
      automatedOnboarding: true,
      selfServicePortal: true,
      automatedCompliance: true,
      workflowAutomation: true,
    },
    riskReduction: {
      breachProbabilityReduction: 85,
      dataExfiltrationPrevention: 92,
      lateralMovementPrevention: 95,
      unauthorizedAccessPrevention: 98,
      malwareSpreadPrevention: 90,
      insiderThreatMitigation: 88,
      complianceViolationReduction: 93,
      shadowITDiscovery: 96,
      avgBreachCostReduction: 3200000,
      insurancePremiumReduction: 25,
      compliancePenaltyAvoidance: 95,
      operationalLossReduction: 80,
    },
  },
  cisco: {
    id: "cisco",
    name: "Cisco Identity Services Engine (ISE)",
    category: "On-Premises NAC",
    deploymentModel: "Appliance/VM",
    pricing: {
      model: "perpetual",
      basePrice: 150,
      minimumDevices: 100,
      volumeDiscounts: [
        { min: 100, max: 500, discount: 0 },
        { min: 501, max: 1000, discount: 5 },
        { min: 1001, max: 5000, discount: 10 },
        { min: 5001, max: Number.POSITIVE_INFINITY, discount: 15 },
      ],
      includedFeatures: ["Basic NAC", "RADIUS Services", "Device Profiling", "Guest Access", "Basic Reporting"],
      additionalCosts: [
        "Hardware appliances",
        "Annual maintenance (20%)",
        "Professional services",
        "Training",
        "Upgrades",
        "Additional modules",
      ],
      hiddenCosts: "Hardware refresh, licensing complexity, professional services",
    },
    costs: {
      hardware: 120000,
      software: 75000,
      implementation: 75000,
      training: 25000,
      support: 24000,
      maintenance: 33000,
      infrastructure: 15000,
      personnelPerYear: 150000,
      downtimePerYear: 40000,
      patchingPerYear: 20000,
      upgradesCycle: 50000,
      energyCosts: 8000,
      rackSpace: 6000,
      networkBandwidth: 4000,
      backupStorage: 5000,
      disasterRecovery: 15000,
    },
    metrics: {
      deploymentTime: 90,
      timeToValue: 120,
      fteRequired: 1.5,
      mttr: 4,
      availability: 99.5,
      scalability: "Limited by hardware",
      performanceImpact: "Moderate",
      userSatisfaction: 72,
      npsScore: -5,
      supportResponseTime: 60,
      updateFrequency: "Quarterly",
      patchingEffort: "High",
      integrationEffort: "High",
    },
    security: {
      zeroTrustScore: 75,
      deviceAuthMethods: 6,
      riskAssessmentReal: false,
      automatedRemediation: false,
      threatIntelligence: false,
      behavioralAnalytics: false,
      microsegmentation: true,
      encryptionStandards: ["TLS 1.2", "AES-256"],
      certifications: ["Common Criteria"],
      vulnerabilityManagement: "Manual",
      incidentResponse: "Manual",
      forensicsCapability: false,
      dlpIntegration: false,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 85, controls: 85 },
        "pci-dss": { coverage: 88, controls: 12 },
        hipaa: { coverage: 82, controls: 45 },
        gdpr: { coverage: 75, controls: 25 },
        iso27001: { coverage: 85, controls: 100 },
        sox: { coverage: 80, controls: 18 },
        fedramp: { coverage: 90, controls: 300 },
        fisma: { coverage: 88, controls: 180 },
      },
      reportingCapabilities: "Manual",
      auditTrail: "Basic",
      dataResidency: "On-premises only",
      dataRetention: "Manual configuration",
    },
    features: {
      deviceVisibility: true,
      deviceProfiling: true,
      networkAccessControl: true,
      guestAccess: true,
      byod: true,
      iotSupport: false,
      conditionalAccess: false,
      applicationControl: false,
      pkiServices: true,
      cloudRadius: false,
      tacacs: true,
      samlIntegration: false,
      mfaSupport: true,
      centralizedManagement: true,
      multiTenancy: false,
      roleBasedAccess: true,
      apiAvailable: true,
      customIntegrations: false,
      automatedOnboarding: false,
      selfServicePortal: true,
      automatedCompliance: false,
      workflowAutomation: false,
    },
    riskReduction: {
      breachProbabilityReduction: 65,
      dataExfiltrationPrevention: 70,
      lateralMovementPrevention: 75,
      unauthorizedAccessPrevention: 80,
      malwareSpreadPrevention: 60,
      insiderThreatMitigation: 65,
      complianceViolationReduction: 70,
      shadowITDiscovery: 60,
      avgBreachCostReduction: 1800000,
      insurancePremiumReduction: 10,
      compliancePenaltyAvoidance: 75,
      operationalLossReduction: 50,
    },
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    category: "Cloud PKI & RADIUS",
    deploymentModel: "SaaS",
    pricing: {
      model: "subscription",
      basePrice: 15,
      minimumDevices: 25,
      volumeDiscounts: [
        { min: 25, max: 500, discount: 0 },
        { min: 501, max: 1000, discount: 10 },
        { min: 1001, max: Number.POSITIVE_INFINITY, discount: 15 },
      ],
      includedFeatures: [
        "Certificate-based Auth",
        "Cloud RADIUS",
        "PKI Services",
        "Device Onboarding",
        "Basic Reporting",
      ],
      additionalCosts: ["Advanced features", "Professional services", "Custom integrations"],
      hiddenCosts: "Limited advanced features without additional cost",
    },
    costs: {
      hardware: 0,
      software: 0,
      implementation: 8000,
      training: 3000,
      support: 0,
      maintenance: 0,
      infrastructure: 0,
      personnelPerYear: 40000,
      downtimePerYear: 5000,
      patchingPerYear: 0,
      upgradesCycle: 0,
      energyCosts: 0,
      rackSpace: 0,
      networkBandwidth: 0,
      backupStorage: 0,
      disasterRecovery: 0,
    },
    metrics: {
      deploymentTime: 14,
      timeToValue: 21,
      fteRequired: 0.4,
      mttr: 1,
      availability: 99.5,
      scalability: "Good",
      performanceImpact: "Minimal",
      userSatisfaction: 76,
      npsScore: 30,
      supportResponseTime: 30,
      updateFrequency: "Continuous",
      patchingEffort: "Zero",
      integrationEffort: "Low",
    },
    security: {
      zeroTrustScore: 65,
      deviceAuthMethods: 4,
      riskAssessmentReal: false,
      automatedRemediation: false,
      threatIntelligence: false,
      behavioralAnalytics: false,
      microsegmentation: false,
      encryptionStandards: ["TLS 1.3", "AES-256"],
      certifications: ["SOC 2"],
      vulnerabilityManagement: "Basic",
      incidentResponse: "Manual",
      forensicsCapability: false,
      dlpIntegration: false,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 70, controls: 68 },
        "pci-dss": { coverage: 72, controls: 9 },
        hipaa: { coverage: 68, controls: 35 },
        gdpr: { coverage: 74, controls: 22 },
        iso27001: { coverage: 71, controls: 78 },
      },
      reportingCapabilities: "Basic",
      auditTrail: "Basic",
      dataResidency: "Cloud",
      dataRetention: "Standard",
    },
    features: {
      deviceVisibility: false,
      deviceProfiling: false,
      networkAccessControl: true,
      guestAccess: true,
      byod: true,
      iotSupport: false,
      conditionalAccess: false,
      applicationControl: false,
      pkiServices: true,
      cloudRadius: true,
      tacacs: false,
      samlIntegration: true,
      mfaSupport: true,
      centralizedManagement: true,
      multiTenancy: true,
      roleBasedAccess: true,
      apiAvailable: true,
      customIntegrations: false,
      automatedOnboarding: true,
      selfServicePortal: true,
      automatedCompliance: false,
      workflowAutomation: false,
    },
    riskReduction: {
      breachProbabilityReduction: 55,
      dataExfiltrationPrevention: 60,
      lateralMovementPrevention: 58,
      unauthorizedAccessPrevention: 70,
      malwareSpreadPrevention: 45,
      insiderThreatMitigation: 50,
      complianceViolationReduction: 55,
      shadowITDiscovery: 40,
      avgBreachCostReduction: 1200000,
      insurancePremiumReduction: 5,
      compliancePenaltyAvoidance: 60,
      operationalLossReduction: 35,
    },
  },
  foxpass: {
    id: "foxpass",
    name: "Foxpass",
    category: "Cloud RADIUS & LDAP",
    deploymentModel: "SaaS",
    pricing: {
      model: "subscription",
      basePrice: 12,
      minimumDevices: 10,
      volumeDiscounts: [
        { min: 10, max: 100, discount: 0 },
        { min: 101, max: 500, discount: 10 },
        { min: 501, max: Number.POSITIVE_INFINITY, discount: 20 },
      ],
      includedFeatures: ["Cloud RADIUS", "LDAP", "Basic Auth", "API Access", "Basic Support"],
      additionalCosts: ["Enterprise features", "Premium support", "Custom development"],
      hiddenCosts: "Limited enterprise features",
    },
    costs: {
      hardware: 0,
      software: 0,
      implementation: 5000,
      training: 2000,
      support: 0,
      maintenance: 0,
      infrastructure: 0,
      personnelPerYear: 35000,
      downtimePerYear: 8000,
      patchingPerYear: 0,
      upgradesCycle: 0,
      energyCosts: 0,
      rackSpace: 0,
      networkBandwidth: 0,
      backupStorage: 0,
      disasterRecovery: 0,
    },
    metrics: {
      deploymentTime: 7,
      timeToValue: 14,
      fteRequired: 0.35,
      mttr: 2,
      availability: 99.0,
      scalability: "Good",
      performanceImpact: "Minimal",
      userSatisfaction: 73,
      npsScore: 25,
      supportResponseTime: 60,
      updateFrequency: "Weekly",
      patchingEffort: "Zero",
      integrationEffort: "Low",
    },
    security: {
      zeroTrustScore: 55,
      deviceAuthMethods: 3,
      riskAssessmentReal: false,
      automatedRemediation: false,
      threatIntelligence: false,
      behavioralAnalytics: false,
      microsegmentation: false,
      encryptionStandards: ["TLS 1.2", "AES-256"],
      certifications: ["SOC 2"],
      vulnerabilityManagement: "Basic",
      incidentResponse: "Manual",
      forensicsCapability: false,
      dlpIntegration: false,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 60, controls: 58 },
        "pci-dss": { coverage: 65, controls: 8 },
        hipaa: { coverage: 62, controls: 30 },
        gdpr: { coverage: 68, controls: 18 },
        iso27001: { coverage: 63, controls: 65 },
      },
      reportingCapabilities: "Basic",
      auditTrail: "Basic",
      dataResidency: "Cloud",
      dataRetention: "Standard",
    },
    features: {
      deviceVisibility: false,
      deviceProfiling: false,
      networkAccessControl: true,
      guestAccess: false,
      byod: true,
      iotSupport: false,
      conditionalAccess: false,
      applicationControl: false,
      pkiServices: false,
      cloudRadius: true,
      tacacs: false,
      samlIntegration: true,
      mfaSupport: true,
      centralizedManagement: true,
      multiTenancy: false,
      roleBasedAccess: true,
      apiAvailable: true,
      customIntegrations: false,
      automatedOnboarding: false,
      selfServicePortal: false,
      automatedCompliance: false,
      workflowAutomation: false,
    },
    riskReduction: {
      breachProbabilityReduction: 45,
      dataExfiltrationPrevention: 50,
      lateralMovementPrevention: 48,
      unauthorizedAccessPrevention: 60,
      malwareSpreadPrevention: 35,
      insiderThreatMitigation: 40,
      complianceViolationReduction: 45,
      shadowITDiscovery: 30,
      avgBreachCostReduction: 900000,
      insurancePremiumReduction: 3,
      compliancePenaltyAvoidance: 50,
      operationalLossReduction: 25,
    },
  },
  radiusaas: {
    id: "radiusaas",
    name: "RADIUS as a Service",
    category: "Cloud RADIUS",
    deploymentModel: "SaaS",
    pricing: {
      model: "subscription",
      basePrice: 8,
      minimumDevices: 50,
      volumeDiscounts: [
        { min: 50, max: 500, discount: 0 },
        { min: 501, max: 1000, discount: 15 },
        { min: 1001, max: Number.POSITIVE_INFINITY, discount: 25 },
      ],
      includedFeatures: ["Cloud RADIUS", "Basic Auth", "Standard Support", "API Access"],
      additionalCosts: ["Premium features", "Advanced support", "Custom integrations"],
      hiddenCosts: "Limited advanced features",
    },
    costs: {
      hardware: 0,
      software: 0,
      implementation: 3000,
      training: 1500,
      support: 0,
      maintenance: 0,
      infrastructure: 0,
      personnelPerYear: 30000,
      downtimePerYear: 10000,
      patchingPerYear: 0,
      upgradesCycle: 0,
      energyCosts: 0,
      rackSpace: 0,
      networkBandwidth: 0,
      backupStorage: 0,
      disasterRecovery: 0,
    },
    metrics: {
      deploymentTime: 3,
      timeToValue: 7,
      fteRequired: 0.3,
      mttr: 3,
      availability: 98.5,
      scalability: "Good",
      performanceImpact: "Minimal",
      userSatisfaction: 70,
      npsScore: 20,
      supportResponseTime: 90,
      updateFrequency: "Monthly",
      patchingEffort: "Zero",
      integrationEffort: "Low",
    },
    security: {
      zeroTrustScore: 50,
      deviceAuthMethods: 2,
      riskAssessmentReal: false,
      automatedRemediation: false,
      threatIntelligence: false,
      behavioralAnalytics: false,
      microsegmentation: false,
      encryptionStandards: ["TLS 1.2"],
      certifications: ["SOC 2"],
      vulnerabilityManagement: "Basic",
      incidentResponse: "Manual",
      forensicsCapability: false,
      dlpIntegration: false,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 55, controls: 50 },
        "pci-dss": { coverage: 60, controls: 7 },
        hipaa: { coverage: 58, controls: 25 },
        gdpr: { coverage: 62, controls: 15 },
        iso27001: { coverage: 57, controls: 55 },
      },
      reportingCapabilities: "Basic",
      auditTrail: "Basic",
      dataResidency: "Cloud",
      dataRetention: "Standard",
    },
    features: {
      deviceVisibility: false,
      deviceProfiling: false,
      networkAccessControl: true,
      guestAccess: false,
      byod: false,
      iotSupport: false,
      conditionalAccess: false,
      applicationControl: false,
      pkiServices: false,
      cloudRadius: true,
      tacacs: false,
      samlIntegration: false,
      mfaSupport: false,
      centralizedManagement: true,
      multiTenancy: false,
      roleBasedAccess: false,
      apiAvailable: true,
      customIntegrations: false,
      automatedOnboarding: false,
      selfServicePortal: false,
      automatedCompliance: false,
      workflowAutomation: false,
    },
    riskReduction: {
      breachProbabilityReduction: 35,
      dataExfiltrationPrevention: 40,
      lateralMovementPrevention: 38,
      unauthorizedAccessPrevention: 50,
      malwareSpreadPrevention: 25,
      insiderThreatMitigation: 30,
      complianceViolationReduction: 35,
      shadowITDiscovery: 20,
      avgBreachCostReduction: 600000,
      insurancePremiumReduction: 2,
      compliancePenaltyAvoidance: 40,
      operationalLossReduction: 15,
    },
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    category: "On-Premises NAC",
    deploymentModel: "Appliance/VM",
    pricing: {
      model: "perpetual",
      basePrice: 65,
      minimumDevices: 100,
      volumeDiscounts: [
        { min: 100, max: 500, discount: 0 },
        { min: 501, max: 1000, discount: 8 },
        { min: 1001, max: 5000, discount: 12 },
        { min: 5001, max: Number.POSITIVE_INFINITY, discount: 18 },
      ],
      includedFeatures: ["NAC", "Guest Access", "Device Profiling", "Policy Management", "Basic Reporting"],
      additionalCosts: [
        "Hardware appliances",
        "Annual maintenance",
        "Professional services",
        "Training",
        "Additional modules",
      ],
      hiddenCosts: "Hardware refresh, complex licensing, professional services",
    },
    costs: {
      hardware: 85000,
      software: 45000,
      implementation: 55000,
      training: 18000,
      support: 18000,
      maintenance: 22000,
      infrastructure: 12000,
      personnelPerYear: 120000,
      downtimePerYear: 25000,
      patchingPerYear: 15000,
      upgradesCycle: 35000,
      energyCosts: 6000,
      rackSpace: 4000,
      networkBandwidth: 3000,
      backupStorage: 4000,
      disasterRecovery: 12000,
    },
    metrics: {
      deploymentTime: 60,
      timeToValue: 90,
      fteRequired: 1.2,
      mttr: 3,
      availability: 99.2,
      scalability: "Limited by hardware",
      performanceImpact: "Moderate",
      userSatisfaction: 75,
      npsScore: 10,
      supportResponseTime: 45,
      updateFrequency: "Quarterly",
      patchingEffort: "Medium",
      integrationEffort: "Medium",
    },
    security: {
      zeroTrustScore: 70,
      deviceAuthMethods: 5,
      riskAssessmentReal: false,
      automatedRemediation: false,
      threatIntelligence: false,
      behavioralAnalytics: false,
      microsegmentation: true,
      encryptionStandards: ["TLS 1.2", "AES-256"],
      certifications: ["Common Criteria"],
      vulnerabilityManagement: "Manual",
      incidentResponse: "Manual",
      forensicsCapability: false,
      dlpIntegration: false,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 80, controls: 78 },
        "pci-dss": { coverage: 82, controls: 10 },
        hipaa: { coverage: 78, controls: 40 },
        gdpr: { coverage: 72, controls: 22 },
        iso27001: { coverage: 80, controls: 88 },
        sox: { coverage: 75, controls: 15 },
      },
      reportingCapabilities: "Manual",
      auditTrail: "Basic",
      dataResidency: "On-premises only",
      dataRetention: "Manual configuration",
    },
    features: {
      deviceVisibility: true,
      deviceProfiling: true,
      networkAccessControl: true,
      guestAccess: true,
      byod: true,
      iotSupport: false,
      conditionalAccess: false,
      applicationControl: false,
      pkiServices: true,
      cloudRadius: false,
      tacacs: true,
      samlIntegration: false,
      mfaSupport: true,
      centralizedManagement: true,
      multiTenancy: false,
      roleBasedAccess: true,
      apiAvailable: true,
      customIntegrations: false,
      automatedOnboarding: false,
      selfServicePortal: true,
      automatedCompliance: false,
      workflowAutomation: false,
    },
    riskReduction: {
      breachProbabilityReduction: 60,
      dataExfiltrationPrevention: 65,
      lateralMovementPrevention: 68,
      unauthorizedAccessPrevention: 75,
      malwareSpreadPrevention: 55,
      insiderThreatMitigation: 60,
      complianceViolationReduction: 65,
      shadowITDiscovery: 55,
      avgBreachCostReduction: 1500000,
      insurancePremiumReduction: 8,
      compliancePenaltyAvoidance: 70,
      operationalLossReduction: 45,
    },
  },
  fortinet: {
    id: "fortinet",
    name: "FortiNAC",
    category: "On-Premises NAC",
    deploymentModel: "Appliance/VM",
    pricing: {
      model: "perpetual",
      basePrice: 45,
      minimumDevices: 100,
      volumeDiscounts: [
        { min: 100, max: 500, discount: 0 },
        { min: 501, max: 1000, discount: 10 },
        { min: 1001, max: 5000, discount: 15 },
        { min: 5001, max: Number.POSITIVE_INFINITY, discount: 20 },
      ],
      includedFeatures: ["NAC", "Device Visibility", "Automated Response", "Basic Reporting"],
      additionalCosts: [
        "Hardware appliances",
        "Annual maintenance",
        "Professional services",
        "Training",
        "FortiGuard services",
      ],
      hiddenCosts: "Best with Fortinet ecosystem, complex without it",
    },
    costs: {
      hardware: 65000,
      software: 35000,
      implementation: 45000,
      training: 15000,
      support: 15000,
      maintenance: 18000,
      infrastructure: 10000,
      personnelPerYear: 100000,
      downtimePerYear: 20000,
      patchingPerYear: 12000,
      upgradesCycle: 25000,
      energyCosts: 5000,
      rackSpace: 3000,
      networkBandwidth: 2500,
      backupStorage: 3000,
      disasterRecovery: 8000,
    },
    metrics: {
      deploymentTime: 45,
      timeToValue: 75,
      fteRequired: 1.0,
      mttr: 2.5,
      availability: 99.0,
      scalability: "Good with Fortinet stack",
      performanceImpact: "Low",
      userSatisfaction: 78,
      npsScore: 15,
      supportResponseTime: 30,
      updateFrequency: "Monthly",
      patchingEffort: "Medium",
      integrationEffort: "Low (Fortinet), High (Others)",
    },
    security: {
      zeroTrustScore: 72,
      deviceAuthMethods: 5,
      riskAssessmentReal: false,
      automatedRemediation: true,
      threatIntelligence: true,
      behavioralAnalytics: false,
      microsegmentation: true,
      encryptionStandards: ["TLS 1.2", "AES-256"],
      certifications: ["Common Criteria"],
      vulnerabilityManagement: "Automated (with FortiGuard)",
      incidentResponse: "Automated",
      forensicsCapability: true,
      dlpIntegration: true,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 78, controls: 75 },
        "pci-dss": { coverage: 80, controls: 10 },
        hipaa: { coverage: 75, controls: 38 },
        gdpr: { coverage: 70, controls: 20 },
        iso27001: { coverage: 78, controls: 85 },
      },
      reportingCapabilities: "Good",
      auditTrail: "Good",
      dataResidency: "On-premises",
      dataRetention: "Configurable",
    },
    features: {
      deviceVisibility: true,
      deviceProfiling: true,
      networkAccessControl: true,
      guestAccess: true,
      byod: true,
      iotSupport: true,
      conditionalAccess: false,
      applicationControl: true,
      pkiServices: false,
      cloudRadius: false,
      tacacs: true,
      samlIntegration: false,
      mfaSupport: true,
      centralizedManagement: true,
      multiTenancy: false,
      roleBasedAccess: true,
      apiAvailable: true,
      customIntegrations: false,
      automatedOnboarding: false,
      selfServicePortal: true,
      automatedCompliance: false,
      workflowAutomation: true,
    },
    riskReduction: {
      breachProbabilityReduction: 68,
      dataExfiltrationPrevention: 72,
      lateralMovementPrevention: 75,
      unauthorizedAccessPrevention: 78,
      malwareSpreadPrevention: 80,
      insiderThreatMitigation: 65,
      complianceViolationReduction: 70,
      shadowITDiscovery: 85,
      avgBreachCostReduction: 1600000,
      insurancePremiumReduction: 12,
      compliancePenaltyAvoidance: 72,
      operationalLossReduction: 55,
    },
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft NPS/Intune",
    category: "Cloud-Integrated NAC",
    deploymentModel: "Hybrid",
    pricing: {
      model: "subscription",
      basePrice: 22,
      minimumDevices: 1,
      volumeDiscounts: [
        { min: 1, max: 300, discount: 0 },
        { min: 301, max: 2500, discount: 5 },
        { min: 2501, max: Number.POSITIVE_INFINITY, discount: 10 },
      ],
      includedFeatures: [
        "NPS RADIUS",
        "Conditional Access",
        "Device Management",
        "Azure AD Integration",
        "Basic Reporting",
      ],
      additionalCosts: ["Windows Server licenses", "Azure AD Premium", "Professional services"],
      hiddenCosts: "Requires Microsoft ecosystem, limited standalone functionality",
    },
    costs: {
      hardware: 15000,
      software: 25000,
      implementation: 35000,
      training: 12000,
      support: 8000,
      maintenance: 8000,
      infrastructure: 8000,
      personnelPerYear: 80000,
      downtimePerYear: 15000,
      patchingPerYear: 8000,
      upgradesCycle: 15000,
      energyCosts: 3000,
      rackSpace: 2000,
      networkBandwidth: 2000,
      backupStorage: 2500,
      disasterRecovery: 5000,
    },
    metrics: {
      deploymentTime: 30,
      timeToValue: 45,
      fteRequired: 0.8,
      mttr: 2,
      availability: 99.9,
      scalability: "Excellent",
      performanceImpact: "Low",
      userSatisfaction: 82,
      npsScore: 35,
      supportResponseTime: 20,
      updateFrequency: "Monthly",
      patchingEffort: "Low",
      integrationEffort: "Low (Microsoft), High (Others)",
    },
    security: {
      zeroTrustScore: 88,
      deviceAuthMethods: 8,
      riskAssessmentReal: true,
      automatedRemediation: true,
      threatIntelligence: true,
      behavioralAnalytics: true,
      microsegmentation: true,
      encryptionStandards: ["TLS 1.3", "AES-256"],
      certifications: ["SOC 2", "ISO 27001", "FedRAMP"],
      vulnerabilityManagement: "Automated",
      incidentResponse: "Automated",
      forensicsCapability: true,
      dlpIntegration: true,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 90, controls: 88 },
        "pci-dss": { coverage: 85, controls: 11 },
        hipaa: { coverage: 88, controls: 48 },
        gdpr: { coverage: 92, controls: 32 },
        iso27001: { coverage: 90, controls: 105 },
        sox: { coverage: 85, controls: 18 },
        fedramp: { coverage: 95, controls: 310 },
        fisma: { coverage: 92, controls: 185 },
      },
      reportingCapabilities: "Excellent",
      auditTrail: "Complete",
      dataResidency: "Configurable",
      dataRetention: "Configurable",
    },
    features: {
      deviceVisibility: true,
      deviceProfiling: true,
      networkAccessControl: true,
      guestAccess: true,
      byod: true,
      iotSupport: true,
      conditionalAccess: true,
      applicationControl: true,
      pkiServices: true,
      cloudRadius: false,
      tacacs: false,
      samlIntegration: true,
      mfaSupport: true,
      centralizedManagement: true,
      multiTenancy: true,
      roleBasedAccess: true,
      apiAvailable: true,
      customIntegrations: true,
      automatedOnboarding: true,
      selfServicePortal: true,
      automatedCompliance: true,
      workflowAutomation: true,
    },
    riskReduction: {
      breachProbabilityReduction: 78,
      dataExfiltrationPrevention: 85,
      lateralMovementPrevention: 82,
      unauthorizedAccessPrevention: 88,
      malwareSpreadPrevention: 80,
      insiderThreatMitigation: 85,
      complianceViolationReduction: 88,
      shadowITDiscovery: 90,
      avgBreachCostReduction: 2400000,
      insurancePremiumReduction: 18,
      compliancePenaltyAvoidance: 85,
      operationalLossReduction: 70,
    },
  },
  forescout: {
    id: "forescout",
    name: "Forescout Platform",
    category: "On-Premises NAC",
    deploymentModel: "Appliance/VM",
    pricing: {
      model: "perpetual",
      basePrice: 85,
      minimumDevices: 100,
      volumeDiscounts: [
        { min: 100, max: 500, discount: 0 },
        { min: 501, max: 1000, discount: 8 },
        { min: 1001, max: 5000, discount: 12 },
        { min: 5001, max: Number.POSITIVE_INFINITY, discount: 18 },
      ],
      includedFeatures: ["Device Visibility", "Automated Response", "Compliance", "Basic Reporting"],
      additionalCosts: [
        "Hardware appliances",
        "Annual maintenance",
        "Professional services",
        "Training",
        "Additional modules",
      ],
      hiddenCosts: "Complex licensing, high professional services costs",
    },
    costs: {
      hardware: 95000,
      software: 55000,
      implementation: 85000,
      training: 25000,
      support: 22000,
      maintenance: 28000,
      infrastructure: 15000,
      personnelPerYear: 140000,
      downtimePerYear: 30000,
      patchingPerYear: 18000,
      upgradesCycle: 40000,
      energyCosts: 7000,
      rackSpace: 5000,
      networkBandwidth: 4000,
      backupStorage: 5000,
      disasterRecovery: 15000,
    },
    metrics: {
      deploymentTime: 120,
      timeToValue: 150,
      fteRequired: 1.8,
      mttr: 3.5,
      availability: 99.3,
      scalability: "Good",
      performanceImpact: "Moderate",
      userSatisfaction: 68,
      npsScore: -10,
      supportResponseTime: 75,
      updateFrequency: "Quarterly",
      patchingEffort: "High",
      integrationEffort: "High",
    },
    security: {
      zeroTrustScore: 82,
      deviceAuthMethods: 7,
      riskAssessmentReal: true,
      automatedRemediation: true,
      threatIntelligence: true,
      behavioralAnalytics: true,
      microsegmentation: true,
      encryptionStandards: ["TLS 1.2", "AES-256"],
      certifications: ["Common Criteria"],
      vulnerabilityManagement: "Automated",
      incidentResponse: "Automated",
      forensicsCapability: true,
      dlpIntegration: true,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 88, controls: 85 },
        "pci-dss": { coverage: 90, controls: 12 },
        hipaa: { coverage: 85, controls: 45 },
        gdpr: { coverage: 80, controls: 25 },
        iso27001: { coverage: 88, controls: 95 },
        sox: { coverage: 82, controls: 18 },
      },
      reportingCapabilities: "Excellent",
      auditTrail: "Complete",
      dataResidency: "On-premises",
      dataRetention: "Configurable",
    },
    features: {
      deviceVisibility: true,
      deviceProfiling: true,
      networkAccessControl: true,
      guestAccess: true,
      byod: true,
      iotSupport: true,
      conditionalAccess: false,
      applicationControl: true,
      pkiServices: false,
      cloudRadius: false,
      tacacs: true,
      samlIntegration: false,
      mfaSupport: true,
      centralizedManagement: true,
      multiTenancy: false,
      roleBasedAccess: true,
      apiAvailable: true,
      customIntegrations: true,
      automatedOnboarding: false,
      selfServicePortal: false,
      automatedCompliance: true,
      workflowAutomation: true,
    },
    riskReduction: {
      breachProbabilityReduction: 75,
      dataExfiltrationPrevention: 80,
      lateralMovementPrevention: 85,
      unauthorizedAccessPrevention: 82,
      malwareSpreadPrevention: 88,
      insiderThreatMitigation: 78,
      complianceViolationReduction: 85,
      shadowITDiscovery: 95,
      avgBreachCostReduction: 2100000,
      insurancePremiumReduction: 15,
      compliancePenaltyAvoidance: 82,
      operationalLossReduction: 65,
    },
  },
  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    category: "Open Source NAC",
    deploymentModel: "Self-Hosted",
    pricing: {
      model: "subscription",
      basePrice: 15,
      minimumDevices: 100,
      volumeDiscounts: [
        { min: 100, max: 500, discount: 0 },
        { min: 501, max: 1000, discount: 20 },
        { min: 1001, max: Number.POSITIVE_INFINITY, discount: 30 },
      ],
      includedFeatures: ["Open Source NAC", "Community Support", "Basic Features"],
      additionalCosts: ["Commercial support", "Professional services", "Training", "Hardware"],
      hiddenCosts: "Requires significant internal expertise",
    },
    costs: {
      hardware: 25000,
      software: 0,
      implementation: 65000,
      training: 20000,
      support: 15000,
      maintenance: 12000,
      infrastructure: 8000,
      personnelPerYear: 120000,
      downtimePerYear: 35000,
      patchingPerYear: 15000,
      upgradesCycle: 25000,
      energyCosts: 4000,
      rackSpace: 3000,
      networkBandwidth: 2000,
      backupStorage: 3000,
      disasterRecovery: 8000,
    },
    metrics: {
      deploymentTime: 90,
      timeToValue: 120,
      fteRequired: 1.5,
      mttr: 4,
      availability: 98.5,
      scalability: "Good",
      performanceImpact: "Moderate",
      userSatisfaction: 65,
      npsScore: -5,
      supportResponseTime: 120,
      updateFrequency: "Variable",
      patchingEffort: "High",
      integrationEffort: "High",
    },
    security: {
      zeroTrustScore: 65,
      deviceAuthMethods: 5,
      riskAssessmentReal: false,
      automatedRemediation: true,
      threatIntelligence: false,
      behavioralAnalytics: false,
      microsegmentation: true,
      encryptionStandards: ["TLS 1.2", "AES-256"],
      certifications: [],
      vulnerabilityManagement: "Manual",
      incidentResponse: "Manual",
      forensicsCapability: false,
      dlpIntegration: false,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 70, controls: 65 },
        "pci-dss": { coverage: 75, controls: 9 },
        hipaa: { coverage: 70, controls: 35 },
        gdpr: { coverage: 65, controls: 18 },
        iso27001: { coverage: 70, controls: 75 },
      },
      reportingCapabilities: "Basic",
      auditTrail: "Basic",
      dataResidency: "On-premises",
      dataRetention: "Manual configuration",
    },
    features: {
      deviceVisibility: true,
      deviceProfiling: true,
      networkAccessControl: true,
      guestAccess: true,
      byod: true,
      iotSupport: false,
      conditionalAccess: false,
      applicationControl: false,
      pkiServices: false,
      cloudRadius: false,
      tacacs: false,
      samlIntegration: false,
      mfaSupport: true,
      centralizedManagement: true,
      multiTenancy: false,
      roleBasedAccess: true,
      apiAvailable: true,
      customIntegrations: true,
      automatedOnboarding: false,
      selfServicePortal: true,
      automatedCompliance: false,
      workflowAutomation: false,
    },
    riskReduction: {
      breachProbabilityReduction: 58,
      dataExfiltrationPrevention: 62,
      lateralMovementPrevention: 65,
      unauthorizedAccessPrevention: 70,
      malwareSpreadPrevention: 55,
      insiderThreatMitigation: 58,
      complianceViolationReduction: 60,
      shadowITDiscovery: 50,
      avgBreachCostReduction: 1300000,
      insurancePremiumReduction: 5,
      compliancePenaltyAvoidance: 65,
      operationalLossReduction: 40,
    },
  },
  "no-nac": {
    id: "no-nac",
    name: "No NAC Solution",
    category: "No Solution",
    deploymentModel: "None",
    pricing: {
      model: "subscription",
      basePrice: 0,
      minimumDevices: 0,
      volumeDiscounts: [],
      includedFeatures: [],
      additionalCosts: [],
      hiddenCosts: "High security risk, compliance violations, potential breaches",
    },
    costs: {
      hardware: 0,
      software: 0,
      implementation: 0,
      training: 0,
      support: 0,
      maintenance: 0,
      infrastructure: 0,
      personnelPerYear: 0,
      downtimePerYear: 100000,
      patchingPerYear: 0,
      upgradesCycle: 0,
      energyCosts: 0,
      rackSpace: 0,
      networkBandwidth: 0,
      backupStorage: 0,
      disasterRecovery: 0,
    },
    metrics: {
      deploymentTime: 0,
      timeToValue: 0,
      fteRequired: 0,
      mttr: 0,
      availability: 0,
      scalability: "N/A",
      performanceImpact: "N/A",
      userSatisfaction: 0,
      npsScore: -100,
      supportResponseTime: 0,
      updateFrequency: "Never",
      patchingEffort: "N/A",
      integrationEffort: "N/A",
    },
    security: {
      zeroTrustScore: 0,
      deviceAuthMethods: 0,
      riskAssessmentReal: false,
      automatedRemediation: false,
      threatIntelligence: false,
      behavioralAnalytics: false,
      microsegmentation: false,
      encryptionStandards: [],
      certifications: [],
      vulnerabilityManagement: "None",
      incidentResponse: "Manual",
      forensicsCapability: false,
      dlpIntegration: false,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 0, controls: 0 },
        "pci-dss": { coverage: 0, controls: 0 },
        hipaa: { coverage: 0, controls: 0 },
        gdpr: { coverage: 0, controls: 0 },
        iso27001: { coverage: 0, controls: 0 },
        sox: { coverage: 0, controls: 0 },
        fedramp: { coverage: 0, controls: 0 },
        fisma: { coverage: 0, controls: 0 },
      },
      reportingCapabilities: "None",
      auditTrail: "None",
      dataResidency: "N/A",
      dataRetention: "N/A",
    },
    features: {
      deviceVisibility: false,
      deviceProfiling: false,
      networkAccessControl: false,
      guestAccess: false,
      byod: false,
      iotSupport: false,
      conditionalAccess: false,
      applicationControl: false,
      pkiServices: false,
      cloudRadius: false,
      tacacs: false,
      samlIntegration: false,
      mfaSupport: false,
      centralizedManagement: false,
      multiTenancy: false,
      roleBasedAccess: false,
      apiAvailable: false,
      customIntegrations: false,
      automatedOnboarding: false,
      selfServicePortal: false,
      automatedCompliance: false,
      workflowAutomation: false,
    },
    riskReduction: {
      breachProbabilityReduction: 0,
      dataExfiltrationPrevention: 0,
      lateralMovementPrevention: 0,
      unauthorizedAccessPrevention: 0,
      malwareSpreadPrevention: 0,
      insiderThreatMitigation: 0,
      complianceViolationReduction: 0,
      shadowITDiscovery: 0,
      avgBreachCostReduction: 0,
      insurancePremiumReduction: 0,
      compliancePenaltyAvoidance: 0,
      operationalLossReduction: 0,
    },
  },
}

// Legacy database for backward compatibility
export const ComprehensiveVendorDatabase: Record<string, VendorDetails> = {
  portnox: {
    id: "portnox",
    name: "Portnox",
    description: "AI-powered cloud-native NAC delivering zero-trust security with unmatched simplicity.",
    category: "cloud-native",
    marketPosition: "visionary",
    licensing: {
      base: [
        { name: "Essentials", listPrice: 20, unit: "device", period: "year", features: ["Basic NAC", "Cloud RADIUS"] },
        {
          name: "Professional",
          listPrice: 30,
          features: ["Advanced NAC", "Risk Scoring"],
          unit: "device",
          period: "year",
        },
        { name: "Enterprise", listPrice: 40, features: ["Full platform, all modules"], unit: "device", period: "year" },
      ],
      modules: [
        { name: "Risk Analytics", listPrice: 10, features: ["ML-based risk scoring"], unit: "device", period: "year" },
        {
          name: "Privileged Access",
          listPrice: 1000,
          features: ["Password vault", "Session recording"],
          unit: "user",
          period: "year",
        },
      ],
      tacacs: [
        {
          name: "TACACS+ as a Service",
          listPrice: 2000,
          features: ["Unlimited devices"],
          unit: "admin",
          period: "year",
        },
      ],
    },
    hardware: {
      physical: [],
      virtual: [],
      cloud: [{ name: "Cloud Platform", listPrice: 0, capacity: "Elastic", useCase: "No hardware required" }],
    },
    highAvailability: {
      licensing: "Included in subscription",
      cost: "0",
      failoverTime: "Automatic (< 30s)",
    },
    integrations: {
      identity: [
        { name: "Azure AD", cost: 0 },
        { name: "Okta", cost: 0 },
        { name: "Google", cost: 0 },
      ],
      mdm: [
        { name: "Intune", cost: 0 },
        { name: "JAMF", cost: 0 },
        { name: "Workspace ONE", cost: 0 },
      ],
      siem: [
        { name: "Splunk", cost: 0 },
        { name: "Sentinel", cost: 0 },
        { name: "QRadar", cost: 0 },
      ],
      security: [
        { name: "CrowdStrike", cost: 0 },
        { name: "Microsoft Defender", cost: 0 },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        MAB: "✓✓✓",
        "Web Auth": "✓✓",
        "SAML 2.0": "✓✓✓",
        "OAuth 2.0": "✓✓✓",
        "TACACS+": "✓✓",
        "Cert-Based": "✓✓✓",
      },
      network: {
        Wired: "✓✓✓",
        Wireless: "✓✓✓",
        VPN: "✓✓",
        BYOD: "✓✓✓",
        IoT: "✓✓✓",
        OT: "✓",
        Guest: "✓✓",
        Mobile: "✓✓✓",
      },
      advanced: {
        "Zero Trust": "✓✓✓",
        "AI/ML": "✓✓✓",
        "Cloud Native": "✓✓✓",
        "HA/DR": "✓✓✓",
        API: "✓✓✓",
        Automation: "✓✓✓",
      },
      compliance: { "PCI DSS": "✓✓✓", HIPAA: "✓✓✓", SOC2: "✓✓✓", "ISO 27001": "✓✓✓", GDPR: "✓✓✓", Posture: "✓✓" },
    },
    professionalServices: {
      vendor: [
        { name: "QuickStart", cost: "5000-10000" },
        { name: "Advanced Config", cost: "10000-20000" },
      ],
      partner: [],
      training: [
        { name: "Online Training", cost: 0 },
        { name: "Certification", cost: 500 },
      ],
    },
    hiddenCosts: {
      licensingGotchas: ["User-based modules can add up", "No perpetual option"],
      performanceLimitations: ["Internet dependency for management plane"],
      operationalOverhead: ["Requires stable internet connection"],
      commonExpenses: [{ name: "Internet Redundancy", cost: "3000-6000" }],
    },
    tcoFactors: { fteRequirement: 0.25, downtimeRisk: "low", upgradeComplexity: "low" },
  },
}

// Helper functions
export function getVendorLogoPath(vendorId: string): string {
  const logoMap: Record<string, string> = {
    portnox: "/portnox-logo.png",
    cisco: "/cisco-logo.png",
    aruba: "/aruba-logo.png",
    fortinet: "/fortinet-logo.png",
    microsoft: "/microsoft-logo.png",
    securew2: "/securew2-logo.png",
    foxpass: "/foxpass-logo.png",
    radiusaas: "/radiusaas-logo.png",
    forescout: "/forescout-logo.png",
    packetfence: "/packetfence-logo.png",
    "no-nac": "/no-nac-logo.png",
  }
  return logoMap[vendorId] || "/placeholder-logo.png"
}

export function getVendorData(vendorId: string): VendorData | null {
  return vendorDatabase[vendorId] || null
}

export function getAllVendors(): VendorData[] {
  return Object.values(vendorDatabase)
}

// Export both for compatibility
export default vendorDatabase
