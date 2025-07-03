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
      certifications: [],
      vulnerabilityManagement: "Basic",
      incidentResponse: "Manual",
      forensicsCapability: false,
      dlpIntegration: false,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 65, controls: 60 },
        "pci-dss": { coverage: 62, controls: 8 },
        hipaa: { coverage: 60, controls: 32 },
        gdpr: { coverage: 68, controls: 20 },
        iso27001: { coverage: 64, controls: 70 },
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
      breachProbabilityReduction: 48,
      dataExfiltrationPrevention: 52,
      lateralMovementPrevention: 50,
      unauthorizedAccessPrevention: 60,
      malwareSpreadPrevention: 40,
      insiderThreatMitigation: 45,
      complianceViolationReduction: 50,
      shadowITDiscovery: 35,
      avgBreachCostReduction: 1000000,
      insurancePremiumReduction: 4,
      compliancePenaltyAvoidance: 55,
      operationalLossReduction: 30,
    },
  },
  pulse: {
    id: "pulse",
    name: "Pulse Secure (Ivanti)",
    category: "Secure Access",
    deploymentModel: "Hybrid",
    pricing: {
      model: "subscription",
      basePrice: 45,
      minimumDevices: 100,
      volumeDiscounts: [
        { min: 100, max: 500, discount: 0 },
        { min: 501, max: 1000, discount: 8 },
        { min: 1001, max: 5000, discount: 12 },
        { min: 5001, max: Number.POSITIVE_INFINITY, discount: 18 },
      ],
      includedFeatures: ["VPN Access", "NAC", "Device Compliance", "Basic Reporting", "Standard Support"],
      additionalCosts: ["Hardware appliances", "Professional services", "Advanced features", "Premium support"],
      hiddenCosts: "Hardware dependencies, complex licensing",
    },
    costs: {
      hardware: 80000,
      software: 0,
      implementation: 45000,
      training: 15000,
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
      disasterRecovery: 10000,
    },
    metrics: {
      deploymentTime: 60,
      timeToValue: 90,
      fteRequired: 1.2,
      mttr: 3,
      availability: 99.2,
      scalability: "Moderate",
      performanceImpact: "Moderate",
      userSatisfaction: 70,
      npsScore: 5,
      supportResponseTime: 45,
      updateFrequency: "Quarterly",
      patchingEffort: "Moderate",
      integrationEffort: "Moderate",
    },
    security: {
      zeroTrustScore: 72,
      deviceAuthMethods: 5,
      riskAssessmentReal: true,
      automatedRemediation: false,
      threatIntelligence: false,
      behavioralAnalytics: false,
      microsegmentation: true,
      encryptionStandards: ["TLS 1.2", "AES-256"],
      certifications: ["Common Criteria", "FIPS 140-2"],
      vulnerabilityManagement: "Semi-automated",
      incidentResponse: "Manual",
      forensicsCapability: false,
      dlpIntegration: false,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 78, controls: 75 },
        "pci-dss": { coverage: 80, controls: 10 },
        hipaa: { coverage: 75, controls: 40 },
        gdpr: { coverage: 72, controls: 25 },
        iso27001: { coverage: 76, controls: 85 },
      },
      reportingCapabilities: "Manual",
      auditTrail: "Basic",
      dataResidency: "On-premises/Cloud",
      dataRetention: "Configurable",
    },
    features: {
      deviceVisibility: true,
      deviceProfiling: true,
      networkAccessControl: true,
      guestAccess: true,
      byod: true,
      iotSupport: false,
      conditionalAccess: true,
      applicationControl: false,
      pkiServices: false,
      cloudRadius: false,
      tacacs: false,
      samlIntegration: true,
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
      breachProbabilityReduction: 68,
      dataExfiltrationPrevention: 72,
      lateralMovementPrevention: 75,
      unauthorizedAccessPrevention: 78,
      malwareSpreadPrevention: 65,
      insiderThreatMitigation: 70,
      complianceViolationReduction: 72,
      shadowITDiscovery: 60,
      avgBreachCostReduction: 1800000,
      insurancePremiumReduction: 12,
      compliancePenaltyAvoidance: 75,
      operationalLossReduction: 55,
    },
  },
}

export function getVendorLogoPath(vendorId: string): string {
  const logoMap: Record<string, string> = {
    portnox: "/portnox-logo.png",
    cisco: "/cisco-logo.png",
    aruba: "/aruba-logo.png",
    fortinet: "/fortinet-logo.png",
    microsoft: "/microsoft-logo.png",
    securew2: "/securew2-logo.png",
    foxpass: "/foxpass-logo.png",
    pulse: "/placeholder-logo.png",
  }
  return logoMap[vendorId] || "/placeholder-logo.png"
}

export function getVendorData(vendorId: string): VendorData | null {
  return vendorDatabase[vendorId] || null
}

export function getAllVendors(): VendorData[] {
  return Object.values(vendorDatabase)
}
