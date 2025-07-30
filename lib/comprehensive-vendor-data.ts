export interface VendorData {
  id: string
  name: string
  category: "leader" | "challenger" | "visionary" | "niche"
  marketShare: number
  deploymentType: "cloud" | "on-premise" | "hybrid"
  logo: string
  description: string
  website: string
  founded: number
  headquarters: string
  employees: number
  revenue: number
  stockSymbol?: string

  // Enhanced Pricing Model (2024 Market Data)
  pricing: {
    model: "per-device" | "per-user" | "flat-rate" | "quote-based" | "tiered"
    basePrice: number
    pricePerDevice: number
    pricePerUser?: number
    minimumDevices: number
    maximumDevices?: number
    volumeDiscounts: Record<string, number>
    contractTerms: {
      monthly: number
      annual: number
      triennial: number
      enterprise: number
    }
    // Real-time pricing factors
    marketAdjustments: {
      demandMultiplier: number
      competitionDiscount: number
      seasonalAdjustment: number
      lastUpdated: string
    }
    // Hidden costs and fees
    additionalCosts: {
      hardware: number
      professionalServices: number
      training: number
      maintenance: number
      support: number
      integration: number
      migration: number
      customization: number
      consulting: number
    }
    // Add-ons and modules
    addOns: Record<string, {
      perDevice: number
      perUser?: number
      flatRate?: number
      description: string
      required: boolean
      category: "security" | "compliance" | "analytics" | "integration" | "management"
    }>
  }

  // Comprehensive Implementation Analysis
  implementation: {
    timeToDeployDays: number
    complexity: "simple" | "moderate" | "complex" | "enterprise"
    phases: Array<{
      name: string
      duration: number
      dependencies: string[]
      risks: string[]
      deliverables: string[]
    }>
    professionalServicesRequired: boolean
    trainingHours: number
    certificationRequired: boolean
    onboardingComplexity: "simple" | "moderate" | "complex"
    migrationSupport: boolean
    rollbackCapability: boolean
    pilotProgramAvailable: boolean
    resourcesRequired: {
      technical: number
      administrative: number
      security: number
      ongoing: number
      peak: number
    }
    // Risk factors
    implementationRisks: {
      technical: number
      timeline: number
      budget: number
      adoption: number
      integration: number
    }
  }

  // Advanced Security Metrics
  security: {
    securityRating: number
    cveCount: number
    criticalCveCount: number
    lastSecurityIncident?: string
    securityIncidentCount: number
    complianceSupport: string[]
    zeroTrustMaturity: number
    certifications: string[]
    securityFeatures: {
      encryption: "basic" | "advanced" | "enterprise"
      authentication: "basic" | "mfa" | "advanced"
      authorization: "rbac" | "abac" | "zero-trust"
      monitoring: "basic" | "advanced" | "ai-powered"
      threatDetection: "signature" | "behavioral" | "ai-ml"
      incidentResponse: "manual" | "semi-automated" | "fully-automated"
    }
    // Security track record
    trackRecord: {
      yearsInOperation: number
      majorIncidents: number
      dataBreaches: number
      downtimeEvents: number
      securityAudits: number
      penetrationTests: number
    }
  }

  // Detailed Feature Matrix
  features: {
    core: string[]
    advanced: string[]
    enterprise: string[]
    integrations: string[]
    apis: string[]
    includedFeatures: string[]
    additionalLicenses: string[]
    // Feature scoring
    featureCompleteness: number
    innovationScore: number
    usabilityScore: number
    scalabilityScore: number
  }

  // Infrastructure and Scalability
  infrastructure: {
    hardwareRequired: boolean
    cloudNative: boolean
    multiTenant: boolean
    globalDeployment: boolean
    scalabilityScore: number
    highAvailability: number
    disasterRecovery: boolean
    backupStrategy: string
    maintenanceWindows: number
    upgradeComplexity: "automatic" | "simple" | "moderate" | "complex"
    infrastructureCosts: {
      servers: number
      storage: number
      networking: number
      virtualization: number
      cloudServices: number
      dataCenter: number
    }
    // Performance metrics
    performance: {
      maxDevices: number
      maxUsers: number
      throughput: number
      latency: number
      availability: number
      scalingTime: number
    }
  }

  // Support and Services
  support: {
    availability: string
    responseTime: {
      critical: string
      high: string
      medium: string
      low: string
    }
    customerSatisfaction: number
    supportChannels: string[]
    documentationQuality: number
    communitySupport: boolean
    professionalServices: {
      implementation: number
      training: number
      consulting: number
      customization: number
      ongoing: number
      emergency: number
    }
    // Support metrics
    metrics: {
      firstCallResolution: number
      escalationRate: number
      knowledgeBaseArticles: number
      trainingPrograms: number
      certificationPrograms: number
    }
  }

  // Operational Excellence
  operationalMetrics: {
    adminEffort: number
    automationLevel: number
    upgradeComplexity: "automatic" | "low" | "moderate" | "complex"
    reportingCapabilities: "basic" | "standard" | "advanced" | "enterprise"
    apiAvailability: boolean
    cloudManagement: boolean
    selfService: boolean
    userExperience: number
    staffingRequirements: {
      administrators: number
      specialists: number
      trainingDays: number
      ongoingEducation: number
    }
    operationalCosts: {
      monthlyMaintenance: number
      annualSupport: number
      staffCosts: number
      trainingCosts: number
      toolingCosts: number
    }
    // Efficiency metrics
    efficiency: {
      deploymentSpeed: number
      configurationTime: number
      troubleshootingTime: number
      reportingTime: number
      auditPreparation: number
    }
  }

  // ROI and Business Impact
  roi: {
    breachRiskReduction: number
    laborSavings: number
    complianceSavings: number
    downtimeReduction: number
    operationalEfficiency: number
    timeToValue: number
    yearlyBenefit: number
    // Advanced ROI metrics
    netPresentValue: number
    internalRateOfReturn: number
    paybackPeriod: number
    profitabilityIndex: number
    riskAdjustedReturn: number
  }

  // Risk Assessment
  riskMetrics: {
    securityPostureScore: number
    vendorStability: number
    technologyRisk: number
    complianceRisk: number
    operationalRisk: number
    financialRisk: number
    marketRisk: number
    // Risk mitigation
    riskMitigation: {
      securityControls: number
      businessContinuity: number
      vendorDiversification: number
      insuranceCoverage: number
    }
  }

  // Compliance and Governance
  complianceSummary: {
    automationLevel: number
    frameworksCovered: string[]
    auditReadiness: number
    automatedCompliance: boolean
    certifications: string[]
    // Compliance metrics
    complianceMetrics: {
      auditPassRate: number
      violationCount: number
      remediationTime: number
      reportingAccuracy: number
      controlEffectiveness: number
    }
  }

  // Market Position and Competitive Analysis
  marketPosition: {
    gartnerQuadrant: "leader" | "challenger" | "visionary" | "niche"
    forresterWave: "leader" | "strong-performer" | "contender" | "challenger"
    marketTrends: "growing" | "stable" | "declining"
    competitiveAdvantages: string[]
    marketChallenges: string[]
    futureOutlook: "positive" | "neutral" | "negative"
    // Market metrics
    marketMetrics: {
      customerGrowth: number
      marketShareTrend: number
      innovationIndex: number
      customerRetention: number
      partnerEcosystem: number
    }
  }

  // Financial Health and Stability
  financialHealth: {
    revenueGrowth: number
    profitability: number
    debtToEquity: number
    cashReserves: number
    rdInvestment: number
    marketCap?: number
    creditRating?: string
    // Financial stability indicators
    stabilityIndicators: {
      revenueStability: number
      customerConcentration: number
      geographicDiversification: number
      productDiversification: number
      financialResilience: number
    }
  }

  // Customer and Market Feedback
  customerFeedback: {
    overallSatisfaction: number
    recommendationScore: number
    renewalRate: number
    expansionRate: number
    supportSatisfaction: number
    implementationSatisfaction: number
    // Detailed feedback
    feedback: {
      easeOfUse: number
      reliability: number
      performance: number
      valueForMoney: number
      innovation: number
      support: number
    }
  }

  // Strategic Assessment
  strategicFit: {
    digitalTransformation: number
    cloudStrategy: number
    securityStrategy: number
    complianceStrategy: number
    costOptimization: number
    // Strategic alignment
    alignment: {
      businessObjectives: number
      technologyRoadmap: number
      securityRequirements: number
      complianceNeeds: number
      budgetConstraints: number
    }
  }

  // Vendor-specific strengths and challenges
  strengths: string[]
  weaknesses: string[]
  bestFor: string[]
  challenges: string[]
  advantages: string[]
  recommendations: string[]
}

// Enhanced Vendor Database with 2024 Market Data
export const ComprehensiveVendorDatabase: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    category: "visionary",
    marketShare: 12.8, // Growing rapidly
    deploymentType: "cloud",
    logo: "/portnox-logo.png",
    description: "Pure cloud-native NAC with zero infrastructure requirements, industry-leading security posture, and comprehensive all-in-one solution including RADIUS, NAC, PKI, IoT profiling, and AI-powered risk assessment.",
    website: "https://portnox.com",
    founded: 2014,
    headquarters: "New York, NY",
    employees: 180,
    revenue: 35000000,

    pricing: {
      model: "per-device",
      basePrice: 0,
      pricePerDevice: 4.0, // 2024 pricing from portnox.com
      minimumDevices: 100,
      volumeDiscounts: {
        "1000": 10,
        "2500": 15,
        "5000": 20,
        "10000": 25,
        "25000": 30,
        "50000": 35
      },
      contractTerms: {
        monthly: 4.0,
        annual: 3.4, // 15% discount
        triennial: 3.0, // 25% discount
        enterprise: 2.8 // 30% discount for enterprise
      },
      marketAdjustments: {
        demandMultiplier: 1.0,
        competitionDiscount: 0.95,
        seasonalAdjustment: 1.0,
        lastUpdated: "2024-01-15"
      },
      additionalCosts: {
        hardware: 0, // Zero infrastructure
        professionalServices: 0, // Self-service deployment
        training: 0, // Online training included
        maintenance: 0, // Included in subscription
        support: 0, // 24/7 support included
        integration: 0, // APIs included
        migration: 0, // Migration tools included
        customization: 0, // No customization needed
        consulting: 0 // Self-service platform
      },
      addOns: {
        "Advanced Threat Protection": {
          perDevice: 1.5,
          description: "ML-based threat detection, SOAR integration, threat intel feeds",
          required: false,
          category: "security"
        },
        "Compliance Automation": {
          perDevice: 1.0,
          description: "Automated reporting, continuous monitoring, evidence collection",
          required: false,
          category: "compliance"
        },
        "IoT/OT Security": {
          perDevice: 2.0,
          description: "OT protocol support, industrial device profiling, SCADA integration",
          required: false,
          category: "security"
        },
        "Risk Analytics": {
          perDevice: 1.5,
          description: "Device risk scoring, user behavior analytics, predictive insights",
          required: false,
          category: "analytics"
        }
      }
    },

    implementation: {
      timeToDeployDays: 1, // 30 minutes to production
      complexity: "simple",
      phases: [
        {
          name: "Account Setup & Discovery",
          duration: 0.25, // 6 hours
          dependencies: [],
          risks: ["Network access requirements"],
          deliverables: ["Account provisioned", "Network discovered", "Initial policies"]
        },
        {
          name: "Policy Configuration",
          duration: 0.25, // 6 hours
          dependencies: ["Account Setup"],
          risks: ["Policy complexity"],
          deliverables: ["User policies", "Device policies", "Enforcement rules"]
        },
        {
          name: "Production Rollout",
          duration: 0.5, // 12 hours
          dependencies: ["Policy Configuration"],
          risks: ["User adoption"],
          deliverables: ["Full production", "User training", "Documentation"]
        }
      ],
      professionalServicesRequired: false,
      trainingHours: 2,
      certificationRequired: false,
      onboardingComplexity: "simple",
      migrationSupport: true,
      rollbackCapability: true,
      pilotProgramAvailable: true,
      resourcesRequired: {
        technical: 0.1,
        administrative: 0.1,
        security: 0.05,
        ongoing: 0.1,
        peak: 0.2
      },
      implementationRisks: {
        technical: 10,
        timeline: 5,
        budget: 5,
        adoption: 15,
        integration: 10
      }
    },

    security: {
      securityRating: 98,
      cveCount: 0, // Zero CVE record
      criticalCveCount: 0,
      securityIncidentCount: 0,
      complianceSupport: [
        "HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST", "ISO27001", 
        "FedRAMP", "SOC2", "CMMC", "NERC-CIP", "FISMA", "CCPA"
      ],
      zeroTrustMaturity: 98,
      certifications: [
        "SOC2-Type2", "ISO27001", "FedRAMP-Moderate", "HIPAA-Compliant",
        "PCI-DSS-Compliant", "GDPR-Compliant"
      ],
      securityFeatures: {
        encryption: "enterprise",
        authentication: "advanced",
        authorization: "zero-trust",
        monitoring: "ai-powered",
        threatDetection: "ai-ml",
        incidentResponse: "fully-automated"
      },
      trackRecord: {
        yearsInOperation: 10,
        majorIncidents: 0,
        dataBreaches: 0,
        downtimeEvents: 0,
        securityAudits: 12,
        penetrationTests: 24
      }
    },

    features: {
      core: [
        "Device Discovery & Classification", "Policy Enforcement", "Guest Access",
        "Certificate Management", "BYOD Support", "Network Segmentation",
        "Real-time Monitoring", "Automated Remediation"
      ],
      advanced: [
        "AI-Powered Analytics", "Behavioral Analysis", "Risk Scoring",
        "Zero Trust Architecture", "Threat Intelligence", "SOAR Integration",
        "Advanced Reporting", "Custom Dashboards"
      ],
      enterprise: [
        "Multi-tenant Management", "Global Policy Management", "Advanced APIs",
        "Custom Integrations", "Enterprise SSO", "Advanced Analytics",
        "Compliance Automation", "Executive Reporting"
      ],
      integrations: [
        "Active Directory", "SIEM/SOAR", "ITSM", "MDM", "Cloud Platforms",
        "Threat Intelligence", "Identity Providers", "Security Tools"
      ],
      apis: [
        "REST API", "GraphQL", "Webhooks", "SCIM", "SAML", "OAuth",
        "Custom Integrations", "Real-time Events"
      ],
      includedFeatures: [
        "RADIUS Server", "NAC Engine", "PKI/Certificate Authority",
        "Agentless Discovery", "IoT Device Profiling", "Risk Assessment Engine",
        "Compliance Automation", "Guest Portal", "BYOD Onboarding",
        "API Gateway", "Real-time Analytics", "24/7 Support"
      ],
      additionalLicenses: [], // All features included
      featureCompleteness: 98,
      innovationScore: 95,
      usabilityScore: 96,
      scalabilityScore: 100
    },

    infrastructure: {
      hardwareRequired: false,
      cloudNative: true,
      multiTenant: true,
      globalDeployment: true,
      scalabilityScore: 100,
      highAvailability: 99.99,
      disasterRecovery: true,
      backupStrategy: "Multi-region automated backup",
      maintenanceWindows: 0,
      upgradeComplexity: "automatic",
      infrastructureCosts: {
        servers: 0,
        storage: 0,
        networking: 0,
        virtualization: 0,
        cloudServices: 0,
        dataCenter: 0
      },
      performance: {
        maxDevices: 1000000,
        maxUsers: 1000000,
        throughput: 100000,
        latency: 10,
        availability: 99.99,
        scalingTime: 0
      }
    },

    support: {
      availability: "24/7/365",
      responseTime: {
        critical: "< 15 minutes",
        high: "< 1 hour",
        medium: "< 4 hours",
        low: "< 24 hours"
      },
      customerSatisfaction: 96,
      supportChannels: ["Phone", "Email", "Chat", "Portal", "Slack"],
      documentationQuality: 95,
      communitySupport: true,
      professionalServices: {
        implementation: 0,
        training: 0,
        consulting: 0,
        customization: 0,
        ongoing: 0,
        emergency: 0
      },
      metrics: {
        firstCallResolution: 92,
        escalationRate: 3,
        knowledgeBaseArticles: 500,
        trainingPrograms: 15,
        certificationPrograms: 3
      }
    },

    operationalMetrics: {
      adminEffort: 1,
      automationLevel: 98,
      upgradeComplexity: "automatic",
      reportingCapabilities: "enterprise",
      apiAvailability: true,
      cloudManagement: true,
      selfService: true,
      userExperience: 96,
      staffingRequirements: {
        administrators: 0.1,
        specialists: 0,
        trainingDays: 0.25,
        ongoingEducation: 1
      },
      operationalCosts: {
        monthlyMaintenance: 0,
        annualSupport: 0,
        staffCosts: 12500, // 0.1 FTE * $125k
        trainingCosts: 500,
        toolingCosts: 0
      },
      efficiency: {
        deploymentSpeed: 98,
        configurationTime: 95,
        troubleshootingTime: 92,
        reportingTime: 98,
        auditPreparation: 95
      }
    },

    roi: {
      breachRiskReduction: 0.92,
      laborSavings: 2.5,
      complianceSavings: 250000,
      downtimeReduction: 0.98,
      operationalEfficiency: 0.95,
      timeToValue: 1,
      yearlyBenefit: 750000,
      netPresentValue: 2500000,
      internalRateOfReturn: 0.85,
      paybackPeriod: 6.5,
      profitabilityIndex: 8.5,
      riskAdjustedReturn: 0.78
    },

    riskMetrics: {
      securityPostureScore: 98,
      vendorStability: 92,
      technologyRisk: 8,
      complianceRisk: 5,
      operationalRisk: 10,
      financialRisk: 15,
      marketRisk: 12,
      riskMitigation: {
        securityControls: 95,
        businessContinuity: 98,
        vendorDiversification: 85,
        insuranceCoverage: 90
      }
    },

    complianceSummary: {
      automationLevel: 98,
      frameworksCovered: [
        "HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST", "ISO27001",
        "FedRAMP", "SOC2", "CMMC", "NERC-CIP"
      ],
      auditReadiness: 98,
      automatedCompliance: true,
      certifications: ["SOC2-Type2", "ISO27001", "FedRAMP-Moderate"],
      complianceMetrics: {
        auditPassRate: 100,
        violationCount: 0,
        remediationTime: 0.5,
        reportingAccuracy: 99,
        controlEffectiveness: 98
      }
    },

    marketPosition: {
      gartnerQuadrant: "visionary",
      forresterWave: "strong-performer",
      marketTrends: "growing",
      competitiveAdvantages: [
        "Zero infrastructure requirements",
        "Fastest deployment in market",
        "Zero CVE security record",
        "All-inclusive pricing",
        "AI-powered automation"
      ],
      marketChallenges: [
        "Newer market presence vs legacy vendors",
        "Cloud-only deployment model"
      ],
      futureOutlook: "positive",
      marketMetrics: {
        customerGrowth: 85,
        marketShareTrend: 25,
        innovationIndex: 95,
        customerRetention: 98,
        partnerEcosystem: 85
      }
    },

    financialHealth: {
      revenueGrowth: 85,
      profitability: 15,
      debtToEquity: 0.2,
      cashReserves: 25000000,
      rdInvestment: 35,
      stabilityIndicators: {
        revenueStability: 85,
        customerConcentration: 15,
        geographicDiversification: 75,
        productDiversification: 60,
        financialResilience: 88
      }
    },

    customerFeedback: {
      overallSatisfaction: 96,
      recommendationScore: 94,
      renewalRate: 98,
      expansionRate: 85,
      supportSatisfaction: 96,
      implementationSatisfaction: 98,
      feedback: {
        easeOfUse: 96,
        reliability: 98,
        performance: 95,
        valueForMoney: 98,
        innovation: 95,
        support: 96
      }
    },

    strategicFit: {
      digitalTransformation: 98,
      cloudStrategy: 100,
      securityStrategy: 98,
      complianceStrategy: 95,
      costOptimization: 98,
      alignment: {
        businessObjectives: 95,
        technologyRoadmap: 98,
        securityRequirements: 98,
        complianceNeeds: 95,
        budgetConstraints: 98
      }
    },

    strengths: [
      "Zero infrastructure requirements - pure SaaS",
      "30-minute deployment vs 6-9 months for competitors",
      "Zero CVE security record - industry leading",
      "All-inclusive pricing - no hidden costs",
      "98% automation level - 95% admin overhead reduction",
      "Infinite cloud scalability",
      "Built-in RADIUS, NAC, PKI, IoT profiling, risk assessment",
      "AI-powered threat detection and response",
      "Comprehensive compliance automation",
      "24/7 support included at no extra cost"
    ],
    weaknesses: [
      "Newer market presence compared to legacy vendors",
      "Cloud-only deployment (not suitable for air-gapped environments)"
    ],
    bestFor: [
      "Cloud-first organizations seeking rapid deployment",
      "Cost-conscious enterprises wanting predictable pricing",
      "Organizations prioritizing security and compliance",
      "Companies requiring zero maintenance solutions",
      "Zero Trust security initiatives",
      "Digital transformation projects",
      "Organizations with limited IT resources"
    ],
    challenges: [
      "Minimal - cloud adoption learning curve for traditional IT teams"
    ],
    advantages: [
      "75% lower TCO than traditional NAC solutions",
      "98% faster deployment than on-premise alternatives",
      "Zero hardware, maintenance, or upgrade costs",
      "Comprehensive feature set included in base price",
      "Industry-leading security with zero CVEs",
      "Automatic updates and feature additions",
      "Global scalability without infrastructure investment",
      "AI-powered automation reduces manual tasks by 95%"
    ],
    recommendations: [
      "Ideal for immediate deployment and value realization",
      "Perfect for organizations seeking cost optimization",
      "Recommended for zero trust security implementations",
      "Best choice for cloud-native architectures",
      "Optimal for compliance-heavy industries"
    ]
  },

  cisco_ise: {
    id: "cisco_ise",
    name: "Cisco Identity Services Engine (ISE)",
    category: "leader",
    marketShare: 32.5,
    deploymentType: "on-premise",
    logo: "/cisco-logo.png",
    description: "Industry-leading identity services engine with comprehensive policy management. Requires significant infrastructure investment, ongoing maintenance, and specialized expertise.",
    website: "https://cisco.com/go/ise",
    founded: 1984,
    headquarters: "San Jose, CA",
    employees: 83000,
    revenue: 51557000000,
    stockSymbol: "CSCO",

    pricing: {
      model: "per-device",
      basePrice: 75000, // Base ISE deployment
      pricePerDevice: 15.0, // 2024 pricing with inflation
      minimumDevices: 100,
      maximumDevices: 100000,
      volumeDiscounts: {
        "1000": 5,
        "2500": 8,
        "5000": 12,
        "10000": 18,
        "25000": 25
      },
      contractTerms: {
        monthly: 15.0,
        annual: 13.5, // 10% discount
        triennial: 12.0, // 20% discount
        enterprise: 11.25 // 25% discount
      },
      marketAdjustments: {
        demandMultiplier: 1.1,
        competitionDiscount: 0.98,
        seasonalAdjustment: 1.05,
        lastUpdated: "2024-01-10"
      },
      additionalCosts: {
        hardware: 200000, // ISE appliances and infrastructure
        professionalServices: 125000, // Implementation services
        training: 45000, // Cisco training and certification
        maintenance: 45000, // Annual SmartNet
        support: 65000, // Premium support
        integration: 35000, // Third-party integrations
        migration: 85000, // Migration from existing systems
        customization: 55000, // Custom policy development
        consulting: 75000 // Ongoing consulting
      },
      addOns: {
        "Cisco TrustSec": {
          perDevice: 4.0,
          description: "Software-defined segmentation and policy enforcement",
          required: false,
          category: "security"
        },
        "pxGrid": {
          perDevice: 3.0,
          description: "Platform exchange grid for ecosystem integration",
          required: false,
          category: "integration"
        },
        "Advanced Malware Protection": {
          perDevice: 5.0,
          description: "AMP integration and threat intelligence",
          required: false,
          category: "security"
        },
        "Threat Intelligence": {
          perDevice: 3.5,
          description: "Threat feeds and advanced analytics",
          required: false,
          category: "security"
        },
        "Plus Licenses": {
          perDevice: 8.0,
          description: "Advanced features and capabilities",
          required: true,
          category: "management"
        },
        "Apex Licenses": {
          perDevice: 12.0,
          description: "Premium features and advanced analytics",
          required: false,
          category: "analytics"
        }
      }
    },

    implementation: {
      timeToDeployDays: 180, // 6 months typical
      complexity: "enterprise",
      phases: [
        {
          name: "Planning & Design",
          duration: 30,
          dependencies: [],
          risks: ["Requirements gathering", "Architecture complexity"],
          deliverables: ["Design document", "Implementation plan", "Resource allocation"]
        },
        {
          name: "Hardware Procurement & Setup",
          duration: 45,
          dependencies: ["Planning"],
          risks: ["Hardware delays", "Data center requirements"],
          deliverables: ["Hardware installed", "Network configured", "Basic connectivity"]
        },
        {
          name: "Software Installation & Configuration",
          duration: 60,
          dependencies: ["Hardware Setup"],
          risks: ["Configuration complexity", "Integration challenges"],
          deliverables: ["ISE installed", "Policies configured", "Integrations complete"]
        },
        {
          name: "Testing & Rollout",
          duration: 45,
          dependencies: ["Configuration"],
          risks: ["User impact", "Performance issues"],
          deliverables: ["Testing complete", "Production rollout", "User training"]
        }
      ],
      professionalServicesRequired: true,
      trainingHours: 80,
      certificationRequired: true,
      onboardingComplexity: "complex",
      migrationSupport: true,
      rollbackCapability: false,
      pilotProgramAvailable: true,
      resourcesRequired: {
        technical: 3.0,
        administrative: 1.5,
        security: 1.0,
        ongoing: 2.5,
        peak: 5.0
      },
      implementationRisks: {
        technical: 75,
        timeline: 65,
        budget: 70,
        adoption: 60,
        integration: 80
      }
    },

    security: {
      securityRating: 82,
      cveCount: 67, // 2024 data - increasing trend
      criticalCveCount: 22,
      lastSecurityIncident: "2024-01-08",
      securityIncidentCount: 8,
      complianceSupport: [
        "HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST", "ISO27001",
        "Common-Criteria", "FIPS-140-2"
      ],
      zeroTrustMaturity: 72,
      certifications: ["Common-Criteria", "FIPS-140-2", "CC-EAL4+"],
      securityFeatures: {
        encryption: "enterprise",
        authentication: "advanced",
        authorization: "rbac",
        monitoring: "advanced",
        threatDetection: "signature",
        incidentResponse: "semi-automated"
      },
      trackRecord: {
        yearsInOperation: 15,
        majorIncidents: 8,
        dataBreaches: 2,
        downtimeEvents: 12,
        securityAudits: 24,
        penetrationTests: 48
      }
    },

    features: {
      core: [
        "Policy Management", "Device Profiling", "Guest Access",
        "Certificate Services", "Network Segmentation", "RADIUS Authentication"
      ],
      advanced: [
        "TrustSec", "pxGrid", "Threat Intelligence", "Advanced Reporting",
        "Custom Policies", "API Integration"
      ],
      enterprise: [
        "Multi-node Deployment", "Global Policy Management", "Advanced Analytics",
        "Custom Dashboards", "Enterprise Integrations"
      ],
      integrations: [
        "Cisco Security Portfolio", "Third-party SIEM", "MDM Solutions",
        "Active Directory", "LDAP", "External Databases"
      ],
      apis: ["REST API", "ERS API", "Monitoring API"],
      includedFeatures: [
        "Basic RADIUS", "Policy Engine", "Guest Portal", "Basic Reporting"
      ],
      additionalLicenses: [
        "TrustSec", "pxGrid", "Plus Licenses", "Apex Licenses",
        "Advanced Licensing", "Threat Intelligence"
      ],
      featureCompleteness: 92,
      innovationScore: 75,
      usabilityScore: 65,
      scalabilityScore: 85
    },

    infrastructure: {
      hardwareRequired: true,
      cloudNative: false,
      multiTenant: false,
      globalDeployment: true,
      scalabilityScore: 78,
      highAvailability: 99.5,
      disasterRecovery: true,
      backupStrategy: "Manual backup procedures",
      maintenanceWindows: 12, // Monthly maintenance
      upgradeComplexity: "complex",
      infrastructureCosts: {
        servers: 150000,
        storage: 25000,
        networking: 35000,
        virtualization: 20000,
        cloudServices: 0,
        dataCenter: 45000
      },
      performance: {
        maxDevices: 100000,
        maxUsers: 500000,
        throughput: 50000,
        latency: 50,
        availability: 99.5,
        scalingTime: 30
      }
    },

    support: {
      availability: "24/7/365",
      responseTime: {
        critical: "< 1 hour",
        high: "< 4 hours",
        medium: "< 8 hours",
        low: "< 24 hours"
      },
      customerSatisfaction: 76,
      supportChannels: ["Phone", "Email", "Portal", "TAC"],
      documentationQuality: 85,
      communitySupport: true,
      professionalServices: {
        implementation: 125000,
        training: 45000,
        consulting: 75000,
        customization: 55000,
        ongoing: 65000,
        emergency: 25000
      },
      metrics: {
        firstCallResolution: 68,
        escalationRate: 15,
        knowledgeBaseArticles: 2500,
        trainingPrograms: 25,
        certificationPrograms: 8
      }
    },

    operationalMetrics: {
      adminEffort: 8,
      automationLevel: 45,
      upgradeComplexity: "complex",
      reportingCapabilities: "advanced",
      apiAvailability: true,
      cloudManagement: false,
      selfService: false,
      userExperience: 65,
      staffingRequirements: {
        administrators: 2.5,
        specialists: 1.5,
        trainingDays: 20,
        ongoingEducation: 10
      },
      operationalCosts: {
        monthlyMaintenance: 25000,
        annualSupport: 65000,
        staffCosts: 500000, // 4 FTE * $125k
        trainingCosts: 45000,
        toolingCosts: 15000
      },
      efficiency: {
        deploymentSpeed: 25,
        configurationTime: 35,
        troubleshootingTime: 45,
        reportingTime: 65,
        auditPreparation: 55
      }
    },

    roi: {
      breachRiskReduction: 0.68,
      laborSavings: 0.5,
      complianceSavings: 125000,
      downtimeReduction: 0.75,
      operationalEfficiency: 0.55,
      timeToValue: 180,
      yearlyBenefit: 350000,
      netPresentValue: 450000,
      internalRateOfReturn: 0.25,
      paybackPeriod: 28,
      profitabilityIndex: 1.8,
      riskAdjustedReturn: 0.18
    },

    riskMetrics: {
      securityPostureScore: 82,
      vendorStability: 95,
      technologyRisk: 45,
      complianceRisk: 25,
      operationalRisk: 55,
      financialRisk: 20,
      marketRisk: 15,
      riskMitigation: {
        securityControls: 85,
        businessContinuity: 90,
        vendorDiversification: 95,
        insuranceCoverage: 85
      }
    },

    complianceSummary: {
      automationLevel: 45,
      frameworksCovered: [
        "HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST", "ISO27001", "Common-Criteria"
      ],
      auditReadiness: 75,
      automatedCompliance: false,
      certifications: ["Common-Criteria", "FIPS-140-2"],
      complianceMetrics: {
        auditPassRate: 85,
        violationCount: 5,
        remediationTime: 15,
        reportingAccuracy: 80,
        controlEffectiveness: 78
      }
    },

    marketPosition: {
      gartnerQuadrant: "leader",
      forresterWave: "leader",
      marketTrends: "stable",
      competitiveAdvantages: [
        "Market leader with proven track record",
        "Comprehensive feature set",
        "Strong Cisco ecosystem integration",
        "Extensive partner network",
        "Enterprise-grade capabilities"
      ],
      marketChallenges: [
        "High complexity and cost",
        "Long deployment timelines",
        "Requires specialized expertise",
        "Legacy architecture limitations"
      ],
      futureOutlook: "neutral",
      marketMetrics: {
        customerGrowth: 15,
        marketShareTrend: -5,
        innovationIndex: 65,
        customerRetention: 85,
        partnerEcosystem: 95
      }
    },

    financialHealth: {
      revenueGrowth: 8,
      profitability: 25,
      debtToEquity: 0.15,
      cashReserves: 25000000000,
      rdInvestment: 15,
      marketCap: 200000000000,
      creditRating: "AA",
      stabilityIndicators: {
        revenueStability: 95,
        customerConcentration: 25,
        geographicDiversification: 95,
        productDiversification: 90,
        financialResilience: 98
      }
    },

    customerFeedback: {
      overallSatisfaction: 76,
      recommendationScore: 72,
      renewalRate: 85,
      expansionRate: 65,
      supportSatisfaction: 75,
      implementationSatisfaction: 65,
      feedback: {
        easeOfUse: 55,
        reliability: 85,
        performance: 80,
        valueForMoney: 60,
        innovation: 65,
        support: 75
      }
    },

    strategicFit: {
      digitalTransformation: 65,
      cloudStrategy: 45,
      securityStrategy: 85,
      complianceStrategy: 80,
      costOptimization: 45,
      alignment: {
        businessObjectives: 75,
        technologyRoadmap: 70,
        securityRequirements: 85,
        complianceNeeds: 80,
        budgetConstraints: 45
      }
    },

    strengths: [
      "Market leader with proven enterprise track record",
      "Comprehensive feature set and policy management",
      "Strong Cisco ecosystem integration",
      "Extensive compliance certifications",
      "Large partner and support network",
      "Advanced threat intelligence capabilities",
      "Mature platform with extensive customization"
    ],
    weaknesses: [
      "Complex deployment requiring 6+ months",
      "High infrastructure and maintenance costs",
      "67 CVEs including critical vulnerabilities",
      "Requires dedicated specialized staff",
      "Expensive licensing model with multiple add-ons",
      "Legacy architecture limitations",
      "High operational overhead"
    ],
    bestFor: [
      "Large enterprises with Cisco infrastructure",
      "Organizations with complex policy requirements",
      "Environments requiring extensive customization",
      "Companies with dedicated Cisco expertise",
      "Highly regulated industries with complex compliance needs"
    ],
    challenges: [
      "High total cost of ownership",
      "Complex ongoing management and maintenance",
      "Lengthy deployment and configuration process",
      "Requires significant hardware investment",
      "Multiple license types and add-on costs",
      "Vendor lock-in with Cisco ecosystem"
    ],
    advantages: [
      "Mature platform with extensive features",
      "Strong enterprise support and services",
      "Deep integration with Cisco security portfolio",
      "Comprehensive policy management capabilities",
      "Proven scalability for large deployments"
    ],
    recommendations: [
      "Consider for large Cisco-centric environments",
      "Evaluate total cost including hidden expenses",
      "Plan for 6+ month implementation timeline",
      "Ensure adequate specialized staffing",
      "Budget for ongoing maintenance and upgrades"
    ]
  },

  aruba_clearpass: {
    id: "aruba_clearpass",
    name: "Aruba ClearPass",
    category: "challenger",
    marketShare: 16.2,
    deploymentType: "hybrid",
    logo: "/aruba-logo.png",
    description: "Comprehensive network access control with strong policy management and multi-vendor support. Requires hardware appliances and professional services for deployment.",
    website: "https://arubanetworks.com/products/security/network-access-control",
    founded: 2002,
    headquarters: "Santa Clara, CA",
    employees: 3200,
    revenue: 3400000000,
    stockSymbol: "HPE",

    pricing: {
      model: "per-device",
      basePrice: 35000,
      pricePerDevice: 9.5, // 2024 pricing increase
      minimumDevices: 50,
      maximumDevices: 75000,
      volumeDiscounts: {
        "500": 8,
        "1000": 12,
        "2500": 18,
        "5000": 25,
        "10000": 32
      },
      contractTerms: {
        monthly: 9.5,
        annual: 8.55, // 10% discount
        triennial: 7.6, // 20% discount
        enterprise: 7.125 // 25% discount
      },
      marketAdjustments: {
        demandMultiplier: 1.05,
        competitionDiscount: 0.96,
        seasonalAdjustment: 1.02,
        lastUpdated: "2024-01-12"
      },
      additionalCosts: {
        hardware: 95000, // ClearPass appliances
        professionalServices: 55000, // Implementation services
        training: 25000, // ClearPass training
        maintenance: 28000, // Annual maintenance
        support: 35000, // Support contracts
        integration: 20000, // Third-party integrations
        migration: 45000, // Migration services
        customization: 30000, // Custom development
        consulting: 40000 // Ongoing consulting
      },
      addOns: {
        "IntroSpect UEBA": {
          perDevice: 4.0,
          description: "User and entity behavior analytics",
          required: false,
          category: "analytics"
        },
        "Policy Enforcement Firewall": {
          perDevice: 2.5,
          description: "Integrated firewall policies",
          required: false,
          category: "security"
        },
        "Guest Management": {
          perDevice: 1.5,
          description: "Advanced guest portal and management",
          required: false,
          category: "management"
        },
        "OnGuard Compliance": {
          perDevice: 2.0,
          description: "Endpoint compliance checking",
          required: false,
          category: "compliance"
        },
        "Advanced Licensing": {
          perDevice: 3.0,
          description: "Premium features and capabilities",
          required: true,
          category: "management"
        }
      }
    },

    implementation: {
      timeToDeployDays: 90, // 3 months
      complexity: "moderate",
      phases: [
        {
          name: "Planning & Design",
          duration: 14,
          dependencies: [],
          risks: ["Requirements complexity", "Integration planning"],
          deliverables: ["Architecture design", "Implementation plan"]
        },
        {
          name: "Hardware Installation",
          duration: 21,
          dependencies: ["Planning"],
          risks: ["Hardware delivery", "Network changes"],
          deliverables: ["Appliances installed", "Network configured"]
        },
        {
          name: "Software Configuration",
          duration: 35,
          dependencies: ["Hardware Installation"],
          risks: ["Policy complexity", "Integration challenges"],
          deliverables: ["Policies configured", "Integrations complete"]
        },
        {
          name: "Testing & Rollout",
          duration: 20,
          dependencies: ["Configuration"],
          risks: ["User impact", "Performance tuning"],
          deliverables: ["Testing complete", "Production rollout"]
        }
      ],
      professionalServicesRequired: true,
      trainingHours: 40,
      certificationRequired: false,
      onboardingComplexity: "moderate",
      migrationSupport: true,
      rollbackCapability: true,
      pilotProgramAvailable: true,
      resourcesRequired: {
        technical: 2.0,
        administrative: 1.0,
        security: 0.5,
        ongoing: 1.5,
        peak: 3.0
      },
      implementationRisks: {
        technical: 55,
        timeline: 45,
        budget: 50,
        adoption: 40,
        integration: 60
      }
    },

    security: {
      securityRating: 79,
      cveCount: 31, // 2024 data
      criticalCveCount: 12,
      lastSecurityIncident: "2023-11-15",
      securityIncidentCount: 4,
      complianceSupport: [
        "HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST", "ISO27001"
      ],
      zeroTrustMaturity: 68,
      certifications: ["Common-Criteria", "FIPS-140-2"],
      securityFeatures: {
        encryption: "advanced",
        authentication: "advanced",
        authorization: "rbac",
        monitoring: "advanced",
        threatDetection: "behavioral",
        incidentResponse: "semi-automated"
      },
      trackRecord: {
        yearsInOperation: 12,
        majorIncidents: 4,
        dataBreaches: 1,
        downtimeEvents: 8,
        securityAudits: 18,
        penetrationTests: 36
      }
    },

    features: {
      core: [
        "Policy Manager", "Device Insight", "Guest Access", "OnGuard",
        "Certificate Management", "Network Segmentation"
      ],
      advanced: [
        "IntroSpect UEBA", "Policy Enforcement", "Threat Detection",
        "Advanced Reporting", "Custom Policies"
      ],
      enterprise: [
        "Multi-site Management", "Global Policies", "Advanced Analytics",
        "Enterprise Integrations"
      ],
      integrations: [
        "Aruba Infrastructure", "Third-party Switches", "SIEM Solutions",
        "Active Directory", "MDM Platforms"
      ],
      apis: ["REST API", "XML API"],
      includedFeatures: [
        "Basic Policy Management", "Guest Portal", "Device Profiling",
        "Basic Reporting"
      ],
      additionalLicenses: [
        "IntroSpect", "Advanced Licensing", "Enterprise Features",
        "Premium Support"
      ],
      featureCompleteness: 85,
      innovationScore: 72,
      usabilityScore: 78,
      scalabilityScore: 82
    },

    infrastructure: {
      hardwareRequired: true,
      cloudNative: false,
      multiTenant: false,
      globalDeployment: true,
      scalabilityScore: 82,
      highAvailability: 99.0,
      disasterRecovery: true,
      backupStrategy: "Automated backup with manual recovery",
      maintenanceWindows: 6, // Bi-monthly
      upgradeComplexity: "moderate",
      infrastructureCosts: {
        servers: 95000,
        storage: 15000,
        networking: 20000,
        virtualization: 12000,
        cloudServices: 0,
        dataCenter: 25000
      },
      performance: {
        maxDevices: 75000,
        maxUsers: 300000,
        throughput: 35000,
        latency: 25,
        availability: 99.0,
        scalingTime: 15
      }
    },

    support: {
      availability: "24/7/365",
      responseTime: {
        critical: "< 2 hours",
        high: "< 4 hours",
        medium: "< 8 hours",
        low: "< 24 hours"
      },
      customerSatisfaction: 82,
      supportChannels: ["Phone", "Email", "Portal"],
      documentationQuality: 80,
      communitySupport: true,
      professionalServices: {
        implementation: 55000,
        training: 25000,
        consulting: 40000,
        customization: 30000,
        ongoing: 35000,
        emergency: 15000
      },
      metrics: {
        firstCallResolution: 75,
        escalationRate: 12,
        knowledgeBaseArticles: 1200,
        trainingPrograms: 15,
        certificationPrograms: 4
      }
    },

    operationalMetrics: {
      adminEffort: 6,
      automationLevel: 58,
      upgradeComplexity: "moderate",
      reportingCapabilities: "standard",
      apiAvailability: true,
      cloudManagement: false,
      selfService: false,
      userExperience: 75,
      staffingRequirements: {
        administrators: 1.8,
        specialists: 0.8,
        trainingDays: 10,
        ongoingEducation: 5
      },
      operationalCosts: {
        monthlyMaintenance: 12000,
        annualSupport: 35000,
        staffCosts: 325000, // 2.6 FTE * $125k
        trainingCosts: 25000,
        toolingCosts: 8000
      },
      efficiency: {
        deploymentSpeed: 45,
        configurationTime: 55,
        troubleshootingTime: 65,
        reportingTime: 70,
        auditPreparation: 65
      }
    },

    roi: {
      breachRiskReduction: 0.72,
      laborSavings: 1.2,
      complianceSavings: 85000,
      downtimeReduction: 0.78,
      operationalEfficiency: 0.68,
      timeToValue: 90,
      yearlyBenefit: 285000,
      netPresentValue: 650000,
      internalRateOfReturn: 0.35,
      paybackPeriod: 22,
      profitabilityIndex: 2.2,
      riskAdjustedReturn: 0.28
    },

    riskMetrics: {
      securityPostureScore: 79,
      vendorStability: 88,
      technologyRisk: 35,
      complianceRisk: 28,
      operationalRisk: 45,
      financialRisk: 25,
      marketRisk: 20,
      riskMitigation: {
        securityControls: 78,
        businessContinuity: 85,
        vendorDiversification: 80,
        insuranceCoverage: 82
      }
    },

    complianceSummary: {
      automationLevel: 58,
      frameworksCovered: [
        "HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST", "ISO27001"
      ],
      auditReadiness: 72,
      automatedCompliance: false,
      certifications: ["Common-Criteria"],
      complianceMetrics: {
        auditPassRate: 78,
        violationCount: 8,
        remediationTime: 12,
        reportingAccuracy: 75,
        controlEffectiveness: 72
      }
    },

    marketPosition: {
      gartnerQuadrant: "challenger",
      forresterWave: "strong-performer",
      marketTrends: "stable",
      competitiveAdvantages: [
        "Strong policy management capabilities",
        "Multi-vendor network support",
        "Good price-performance ratio",
        "Comprehensive feature set",
        "Strong Aruba ecosystem integration"
      ],
      marketChallenges: [
        "Requires hardware appliances",
        "Complex initial setup",
        "Limited cloud-native capabilities",
        "Ongoing maintenance requirements"
      ],
      futureOutlook: "neutral",
      marketMetrics: {
        customerGrowth: 25,
        marketShareTrend: 5,
        innovationIndex: 72,
        customerRetention: 82,
        partnerEcosystem: 78
      }
    },

    financialHealth: {
      revenueGrowth: 12,
      profitability: 18,
      debtToEquity: 0.25,
      cashReserves: 5000000000,
      rdInvestment: 12,
      marketCap: 45000000000,
      creditRating: "A+",
      stabilityIndicators: {
        revenueStability: 88,
        customerConcentration: 35,
        geographicDiversification: 85,
        productDiversification: 75,
        financialResilience: 85
      }
    },

    customerFeedback: {
      overallSatisfaction: 82,
      recommendationScore: 78,
      renewalRate: 88,
      expansionRate: 72,
      supportSatisfaction: 80,
      implementationSatisfaction: 75,
      feedback: {
        easeOfUse: 72,
        reliability: 85,
        performance: 80,
        valueForMoney: 75,
        innovation: 70,
        support: 80
      }
    },

    strategicFit: {
      digitalTransformation: 72,
      cloudStrategy: 55,
      securityStrategy: 82,
      complianceStrategy: 78,
      costOptimization: 68,
      alignment: {
        businessObjectives: 78,
        technologyRoadmap: 75,
        securityRequirements: 82,
        complianceNeeds: 78,
        budgetConstraints: 68
      }
    },

    strengths: [
      "Strong policy management capabilities",
      "Multi-vendor network support",
      "Good price-performance ratio",
      "Comprehensive feature set",
      "Strong Aruba ecosystem integration",
      "Mature platform with proven capabilities",
      "Good customer support"
    ],
    weaknesses: [
      "Requires hardware appliances and infrastructure",
      "Complex initial setup and configuration",
      "31 CVEs including security vulnerabilities",
      "Limited cloud-native capabilities",
      "Ongoing maintenance requirements",
      "Requires specialized training"
    ],
    bestFor: [
      "Mid to large enterprises with hybrid infrastructure",
      "Multi-vendor network environments",
      "Organizations with existing Aruba investments",
      "Policy-heavy deployment requirements",
      "Companies seeking balance between features and cost"
    ],
    challenges: [
      "Hardware procurement and deployment complexity",
      "Ongoing appliance maintenance and updates",
      "Multiple license tiers and add-on costs",
      "Requires dedicated network security expertise",
      "Limited automation capabilities"
    ],
    advantages: [
      "Mature platform with proven enterprise capabilities",
      "Strong multi-vendor network support",
      "Comprehensive policy management tools",
      "Good integration with existing infrastructure",
      "Competitive pricing for mid-market"
    ],
    recommendations: [
      "Suitable for hybrid infrastructure environments",
      "Plan for 3-month implementation timeline",
      "Budget for ongoing hardware maintenance",
      "Ensure adequate technical expertise",
      "Consider cloud migration strategy"
    ]
  },

  forescout: {
    id: "forescout",
    name: "Forescout Platform",
    category: "challenger",
    marketShare: 10.8,
    deploymentType: "hybrid",
    logo: "/forescout-logo.png",
    description: "Device visibility and control platform with strong IoT and OT security capabilities. Requires appliances and specialized expertise for industrial environments.",
    website: "https://forescout.com",
    founded: 2000,
    headquarters: "San Jose, CA",
    employees: 1400,
    revenue: 385000000,
    stockSymbol: "Private",

    pricing: {
      model: "per-device",
      basePrice: 45000,
      pricePerDevice: 7.5, // 2024 pricing
      minimumDevices: 100,
      maximumDevices: 100000,
      volumeDiscounts: {
        "1000": 12,
        "2500": 18,
        "5000": 25,
        "10000": 32,
        "25000": 40
      },
      contractTerms: {
        monthly: 7.5,
        annual: 6.75, // 10% discount
        triennial: 6.0, // 20% discount
        enterprise: 5.625 // 25% discount
      },
      marketAdjustments: {
        demandMultiplier: 1.08,
        competitionDiscount: 0.94,
        seasonalAdjustment: 1.03,
        lastUpdated: "2024-01-14"
      },
      additionalCosts: {
        hardware: 85000, // Forescout appliances
        professionalServices: 65000, // Professional services
        training: 35000, // Technical training
        maintenance: 38000, // Annual maintenance
        support: 45000, // Support contracts
        integration: 25000, // OT/IT integrations
        migration: 55000, // Migration services
        customization: 40000, // Custom policies
        consulting: 50000 // Ongoing consulting
      },
      addOns: {
        "IoT Security": {
          perDevice: 2.5,
          description: "IoT device security and profiling",
          required: false,
          category: "security"
        },
        "OT Visibility": {
          perDevice: 4.0,
          description: "Operational technology monitoring",
          required: false,
          category: "security"
        },
        "Threat Detection": {
          perDevice: 3.0,
          description: "Advanced threat detection and response",
          required: false,
          category: "security"
        },
        "Compliance Module": {
          perDevice: 2.0,
          description: "Compliance monitoring and reporting",
          required: false,
          category: "compliance"
        },
        "Enterprise Licensing": {
          perDevice: 3.5,
          description: "Advanced features and capabilities",
          required: true,
          category: "management"
        }
      }
    },

    implementation: {
      timeToDeployDays: 120, // 4 months
      complexity: "moderate",
      phases: [
        {
          name: "Discovery & Assessment",
          duration: 21,
          dependencies: [],
          risks: ["Network complexity", "Device diversity"],
          deliverables: ["Network assessment", "Device inventory"]
        },
        {
          name: "Infrastructure Setup",
          duration: 35,
          dependencies: ["Discovery"],
          risks: ["Hardware deployment", "Network integration"],
          deliverables: ["Appliances deployed", "Network configured"]
        },
        {
          name: "Policy Development",
          duration: 42,
          dependencies: ["Infrastructure"],
          risks: ["Policy complexity", "OT integration"],
          deliverables: ["Policies configured", "OT integration complete"]
        },
        {
          name: "Testing & Production",
          duration: 22,
          dependencies: ["Policy Development"],
          risks: ["Production impact", "Performance tuning"],
          deliverables: ["Testing complete", "Production deployment"]
        }
      ],
      professionalServicesRequired: true,
      trainingHours: 60,
      certificationRequired: false,
      onboardingComplexity: "moderate",
      migrationSupport: true,
      rollbackCapability: true,
      pilotProgramAvailable: true,
      resourcesRequired: {
        technical: 2.5,
        administrative: 1.0,
        security: 1.5,
        ongoing: 2.0,
        peak: 4.0
      },
      implementationRisks: {
        technical: 65,
        timeline: 55,
        budget: 60,
        adoption: 50,
        integration: 75
      }
    },

    security: {
      securityRating: 76,
      cveCount: 43, // 2024 data
      criticalCveCount: 16,
      lastSecurityIncident: "2023-09-22",
      securityIncidentCount: 6,
      complianceSupport: [
        "HIPAA", "PCI-DSS", "NIST", "IEC-62443", "ISO27001"
      ],
      zeroTrustMaturity: 62,
      certifications: ["IEC-62443", "Common-Criteria"],
      securityFeatures: {
        encryption: "advanced",
        authentication: "mfa",
        authorization: "rbac",
        monitoring: "advanced",
        threatDetection: "behavioral",
        incidentResponse: "semi-automated"
      },
      trackRecord: {
        yearsInOperation: 24,
        majorIncidents: 6,
        dataBreaches: 2,
        downtimeEvents: 10,
        securityAudits: 20,
        penetrationTests: 40
      }
    },

    features: {
      core: [
        "Device Discovery", "Classification", "Policy Enforcement",
        "Compliance Monitoring", "Network Segmentation"
      ],
      advanced: [
        "IoT Security", "OT Visibility", "Threat Detection",
        "Automated Response", "Advanced Analytics"
      ],
      enterprise: [
        "Multi-site Management", "Global Policies", "Enterprise Integrations",
        "Advanced Reporting"
      ],
      integrations: [
        "Security Orchestration", "SIEM Platforms", "Firewalls",
        "Endpoint Protection", "OT Systems"
      ],
      apis: ["REST API", "GraphQL API"],
      includedFeatures: [
        "Device Discovery", "Basic Classification", "Policy Enforcement",
        "Basic Reporting"
      ],
      additionalLicenses: [
        "IoT Module", "OT Module", "Advanced Analytics",
        "Threat Intelligence", "Enterprise Licensing"
      ],
      featureCompleteness: 88,
      innovationScore: 78,
      usabilityScore: 72,
      scalabilityScore: 80
    },

    infrastructure: {
      hardwareRequired: true,
      cloudNative: false,
      multiTenant: false,
      globalDeployment: true,
      scalabilityScore: 80,
      highAvailability: 98.5,
      disasterRecovery: true,
      backupStrategy: "Automated backup with manual recovery",
      maintenanceWindows: 8, // Quarterly plus patches
      upgradeComplexity: "moderate",
      infrastructureCosts: {
        servers: 85000,
        storage: 18000,
        networking: 22000,
        virtualization: 15000,
        cloudServices: 0,
        dataCenter: 28000
      },
      performance: {
        maxDevices: 100000,
        maxUsers: 250000,
        throughput: 40000,
        latency: 30,
        availability: 98.5,
        scalingTime: 20
      }
    },

    support: {
      availability: "24/7/365",
      responseTime: {
        critical: "< 2 hours",
        high: "< 6 hours",
        medium: "< 12 hours",
        low: "< 48 hours"
      },
      customerSatisfaction: 78,
      supportChannels: ["Phone", "Email", "Portal"],
      documentationQuality: 75,
      communitySupport: true,
      professionalServices: {
        implementation: 65000,
        training: 35000,
        consulting: 50000,
        customization: 40000,
        ongoing: 45000,
        emergency: 18000
      },
      metrics: {
        firstCallResolution: 70,
        escalationRate: 18,
        knowledgeBaseArticles: 800,
        trainingPrograms: 12,
        certificationPrograms: 3
      }
    },

    operationalMetrics: {
      adminEffort: 7,
      automationLevel: 62,
      upgradeComplexity: "moderate",
      reportingCapabilities: "advanced",
      apiAvailability: true,
      cloudManagement: false,
      selfService: false,
      userExperience: 70,
      staffingRequirements: {
        administrators: 2.0,
        specialists: 1.0,
        trainingDays: 15,
        ongoingEducation: 8
      },
      operationalCosts: {
        monthlyMaintenance: 15000,
        annualSupport: 45000,
        staffCosts: 375000, // 3 FTE * $125k
        trainingCosts: 35000,
        toolingCosts: 10000
      },
      efficiency: {
        deploymentSpeed: 35,
        configurationTime: 45,
        troubleshootingTime: 55,
        reportingTime: 75,
        auditPreparation: 68
      }
    },

    roi: {
      breachRiskReduction: 0.75,
      laborSavings: 1.0,
      complianceSavings: 95000,
      downtimeReduction: 0.72,
      operationalEfficiency: 0.62,
      timeToValue: 120,
      yearlyBenefit: 265000,
      netPresentValue: 485000,
      internalRateOfReturn: 0.28,
      paybackPeriod: 26,
      profitabilityIndex: 1.9,
      riskAdjustedReturn: 0.22
    },

    riskMetrics: {
      securityPostureScore: 76,
      vendorStability: 78,
      technologyRisk: 42,
      complianceRisk: 32,
      operationalRisk: 48,
      financialRisk: 35,
      marketRisk: 28,
      riskMitigation: {
        securityControls: 75,
        businessContinuity: 80,
        vendorDiversification: 70,
        insuranceCoverage: 78
      }
    },

    complianceSummary: {
      automationLevel: 62,
      frameworksCovered: [
        "HIPAA", "PCI-DSS", "NIST", "IEC-62443", "ISO27001"
      ],
      auditReadiness: 68,
      automatedCompliance: false,
      certifications: ["IEC-62443"],
      complianceMetrics: {
        auditPassRate: 72,
        violationCount: 12,
        remediationTime: 18,
        reportingAccuracy: 70,
        controlEffectiveness: 68
      }
    },

    marketPosition: {
      gartnerQuadrant: "challenger",
      forresterWave: "contender",
      marketTrends: "stable",
      competitiveAdvantages: [
        "Excellent IoT and OT device visibility",
        "Strong device classification capabilities",
        "Good integration with security tools",
        "Comprehensive compliance features",
        "Industrial/OT network expertise"
      ],
      marketChallenges: [
        "Complex deployment and management",
        "Requires significant hardware investment",
        "Higher learning curve",
        "Limited cloud-native capabilities"
      ],
      futureOutlook: "neutral",
      marketMetrics: {
        customerGrowth: 18,
        marketShareTrend: -2,
        innovationIndex: 78,
        customerRetention: 78,
        partnerEcosystem: 72
      }
    },

    financialHealth: {
      revenueGrowth: 15,
      profitability: 8,
      debtToEquity: 0.45,
      cashReserves: 125000000,
      rdInvestment: 18,
      stabilityIndicators: {
        revenueStability: 78,
        customerConcentration: 45,
        geographicDiversification: 70,
        productDiversification: 65,
        financialResilience: 75
      }
    },

    customerFeedback: {
      overallSatisfaction: 78,
      recommendationScore: 74,
      renewalRate: 82,
      expansionRate: 68,
      supportSatisfaction: 76,
      implementationSatisfaction: 72,
      feedback: {
        easeOfUse: 68,
        reliability: 82,
        performance: 78,
        valueForMoney: 72,
        innovation: 75,
        support: 76
      }
    },

    strategicFit: {
      digitalTransformation: 68,
      cloudStrategy: 45,
      securityStrategy: 82,
      complianceStrategy: 75,
      costOptimization: 65,
      alignment: {
        businessObjectives: 72,
        technologyRoadmap: 68,
        securityRequirements: 82,
        complianceNeeds: 75,
        budgetConstraints: 65
      }
    },

    strengths: [
      "Excellent IoT and OT device visibility",
      "Strong device classification capabilities",
      "Good integration with security tools",
      "Comprehensive compliance features",
      "Industrial/OT network expertise",
      "Strong threat detection capabilities",
      "Good value for IoT-heavy environments"
    ],
    weaknesses: [
      "Complex deployment and management",
      "43 CVEs including security vulnerabilities",
      "Requires significant hardware investment",
      "Higher learning curve for administrators",
      "Limited cloud-native capabilities",
      "Ongoing maintenance complexity"
    ],
    bestFor: [
      "IoT-heavy environments",
      "Industrial/OT networks",
      "Compliance-focused organizations",
      "Large device inventories with diverse types",
      "Organizations requiring detailed device visibility"
    ],
    challenges: [
      "Appliance-based architecture limits scalability",
      "Complex policy management for large environments",
      "Ongoing hardware maintenance and refresh cycles",
      "Multiple modules require separate licensing",
      "Requires specialized OT/IoT expertise"
    ],
    advantages: [
      "Strong device visibility and classification",
      "Excellent IoT and OT security capabilities",
      "Good threat detection and response features",
      "Comprehensive compliance monitoring",
      "Proven in industrial environments"
    ],
    recommendations: [
      "Ideal for IoT and OT-heavy environments",
      "Plan for 4-month implementation",
      "Budget for ongoing appliance maintenance",
      "Ensure OT/IoT security expertise",
      "Consider cloud migration roadmap"
    ]
  },

  ivanti_neurons: {
    id: "ivanti_neurons",
    name: "Ivanti Neurons for NAC (formerly Pulse Secure)",
    category: "niche",
    marketShare: 1.8, // Declining rapidly
    deploymentType: "on-premise",
    logo: "/ivanti-logo.png",
    description: "⚠️ CRITICAL SECURITY RISK: Legacy NAC solution with active nation-state exploitation. End-of-life product with 89+ known vulnerabilities. IMMEDIATE MIGRATION STRONGLY RECOMMENDED.",
    website: "https://ivanti.com",
    founded: 1985,
    headquarters: "South Jordan, UT",
    employees: 4200,
    revenue: 525000000,
    stockSymbol: "Private",

    pricing: {
      model: "per-device",
      basePrice: 25000,
      pricePerDevice: 8.5, // High pricing for declining product
      minimumDevices: 100,
      maximumDevices: 15000,
      volumeDiscounts: {
        "500": 5,
        "1000": 8,
        "2500": 12,
        "5000": 18
      },
      contractTerms: {
        monthly: 8.5,
        annual: 7.65, // 10% discount
        triennial: 6.8, // 20% discount
        enterprise: 6.375 // 25% discount
      },
      marketAdjustments: {
        demandMultiplier: 0.75, // Declining demand
        competitionDiscount: 0.85,
        seasonalAdjustment: 0.9,
        lastUpdated: "2024-01-20"
      },
      additionalCosts: {
        hardware: 65000, // Legacy appliances
        professionalServices: 85000, // Migration complexity
        training: 25000, // Limited training available
        maintenance: 35000, // High maintenance costs
        support: 45000, // Premium support required
        integration: 40000, // Complex integrations
        migration: 125000, // Migration away from platform
        customization: 55000, // Legacy customizations
        consulting: 95000 // Migration consulting
      },
      addOns: {
        "Advanced Reporting": {
          perDevice: 1.5,
          description: "Enhanced reporting capabilities",
          required: false,
          category: "management"
        },
        "Mobile Device Support": {
          perDevice: 2.0,
          description: "Mobile device management integration",
          required: false,
          category: "management"
        },
        "Legacy Integration": {
          perDevice: 3.0,
          description: "Integration with legacy systems",
          required: true,
          category: "integration"
        }
      }
    },

    implementation: {
      timeToDeployDays: 150, // 5 months including migration planning
      complexity: "enterprise",
      phases: [
        {
          name: "Migration Planning",
          duration: 30,
          dependencies: [],
          risks: ["Legacy system complexity", "Data migration"],
          deliverables: ["Migration plan", "Risk assessment", "Timeline"]
        },
        {
          name: "Infrastructure Setup",
          duration: 45,
          dependencies: ["Planning"],
          risks: ["Hardware compatibility", "Network changes"],
          deliverables: ["Infrastructure deployed", "Basic connectivity"]
        },
        {
          name: "Data Migration",
          duration: 45,
          dependencies: ["Infrastructure"],
          risks: ["Data integrity", "System compatibility"],
          deliverables: ["Data migrated", "Policies configured"]
        },
        {
          name: "Testing & Cutover",
          duration: 30,
          dependencies: ["Migration"],
          risks: ["Production impact", "Rollback complexity"],
          deliverables: ["Testing complete", "Production cutover"]
        }
      ],
      professionalServicesRequired: true,
      trainingHours: 80,
      certificationRequired: true,
      onboardingComplexity: "complex",
      migrationSupport: false, // Limited migration support
      rollbackCapability: false,
      pilotProgramAvailable: false,
      resourcesRequired: {
        technical: 4.0,
        administrative: 2.0,
        security: 2.0,
        ongoing: 3.5,
        peak: 6.0
      },
      implementationRisks: {
        technical: 95,
        timeline: 85,
        budget: 90,
        adoption: 80,
        integration: 95
      }
    },

    security: {
      securityRating: 28, // Very low due to active exploitation
      cveCount: 89, // High number of vulnerabilities
      criticalCveCount: 34,
      lastSecurityIncident: "2024-01-15", // Recent active exploitation
      securityIncidentCount: 15,
      complianceSupport: ["PCI-DSS", "HIPAA"], // Limited compliance
      zeroTrustMaturity: 15,
      certifications: [], // No current certifications
      securityFeatures: {
        encryption: "basic",
        authentication: "basic",
        authorization: "rbac",
        monitoring: "basic",
        threatDetection: "signature",
        incidentResponse: "manual"
      },
      trackRecord: {
        yearsInOperation: 20,
        majorIncidents: 15,
        dataBreaches: 8,
        downtimeEvents: 25,
        securityAudits: 5,
        penetrationTests: 10
      }
    },

    features: {
      core: [
        "Basic NAC", "Device Discovery", "Policy Enforcement",
        "Guest Access", "Certificate Management"
      ],
      advanced: [],
      enterprise: [],
      integrations: [
        "Active Directory", "Basic SIEM", "Legacy Systems"
      ],
      apis: ["Limited REST API"],
      includedFeatures: [
        "Basic RADIUS", "Policy Engine", "Basic Reporting"
      ],
      additionalLicenses: [
        "Advanced Features", "Mobile Support", "Enterprise Licensing"
      ],
      featureCompleteness: 45,
      innovationScore: 25,
      usabilityScore: 40,
      scalabilityScore: 35
    },

    infrastructure: {
      hardwareRequired: true,
      cloudNative: false,
      multiTenant: false,
      globalDeployment: false,
      scalabilityScore: 35,
      highAvailability: 95.0,
      disasterRecovery: false,
      backupStrategy: "Manual backup procedures",
      maintenanceWindows: 24, // High maintenance
      upgradeComplexity: "complex",
      infrastructureCosts: {
        servers: 65000,
        storage: 12000,
        networking: 18000,
        virtualization: 8000,
        cloudServices: 0,
        dataCenter: 22000
      },
      performance: {
        maxDevices: 15000,
        maxUsers: 50000,
        throughput: 5000,
        latency: 100,
        availability: 95.0,
        scalingTime: 60
      }
    },

    support: {
      availability: "Business Hours",
      responseTime: {
        critical: "< 24 hours",
        high: "< 48 hours",
        medium: "< 72 hours",
        low: "< 1 week"
      },
      customerSatisfaction: 42, // Very low
      supportChannels: ["Email", "Portal"],
      documentationQuality: 45,
      communitySupport: false,
      professionalServices: {
        implementation: 85000,
        training: 25000,
        consulting: 95000,
        customization: 55000,
        ongoing: 45000,
        emergency: 35000
      },
      metrics: {
        firstCallResolution: 35,
        escalationRate: 45,
        knowledgeBaseArticles: 200,
        trainingPrograms: 3,
        certificationPrograms: 1
      }
    },

    operationalMetrics: {
      adminEffort: 10, // Very high
      automationLevel: 25,
      upgradeComplexity: "complex",
      reportingCapabilities: "basic",
      apiAvailability: false,
      cloudManagement: false,
      selfService: false,
      userExperience: 35,
      staffingRequirements: {
        administrators: 3.5,
        specialists: 2.0,
        trainingDays: 25,
        ongoingEducation: 15
      },
      operationalCosts: {
        monthlyMaintenance: 20000,
        annualSupport: 45000,
        staffCosts: 687500, // 5.5 FTE * $125k
        trainingCosts: 25000,
        toolingCosts: 15000
      },
      efficiency: {
        deploymentSpeed: 15,
        configurationTime: 25,
        troubleshootingTime: 20,
        reportingTime: 30,
        auditPreparation: 25
      }
    },

    roi: {
      breachRiskReduction: -0.15, // Negative - increases risk
      laborSavings: -2.0, // Negative - requires more staff
      complianceSavings: 15000,
      downtimeReduction: 0.25,
      operationalEfficiency: 0.15,
      timeToValue: 150,
      yearlyBenefit: -125000, // Negative value
      netPresentValue: -850000,
      internalRateOfReturn: -0.25,
      paybackPeriod: 999, // Never pays back
      profitabilityIndex: 0.3,
      riskAdjustedReturn: -0.35
    },

    riskMetrics: {
      securityPostureScore: 28,
      vendorStability: 35, // Low due to security issues
      technologyRisk: 98, // Very high
      complianceRisk: 85, // High risk
      operationalRisk: 90,
      financialRisk: 75,
      marketRisk: 95,
      riskMitigation: {
        securityControls: 25,
        businessContinuity: 35,
        vendorDiversification: 40,
        insuranceCoverage: 30
      }
    },

    complianceSummary: {
      automationLevel: 25,
      frameworksCovered: ["PCI-DSS", "HIPAA"],
      auditReadiness: 35,
      automatedCompliance: false,
      certifications: [],
      complianceMetrics: {
        auditPassRate: 45,
        violationCount: 25,
        remediationTime: 45,
        reportingAccuracy: 40,
        controlEffectiveness: 35
      }
    },

    marketPosition: {
      gartnerQuadrant: "niche",
      forresterWave: "challenger",
      marketTrends: "declining",
      competitiveAdvantages: [
        "Legacy system compatibility"
      ],
      marketChallenges: [
        "89 known CVEs including critical vulnerabilities",
        "Active nation-state exploitation in the wild",
        "End-of-life product with limited support",
        "High operational overhead and complexity",
        "Poor security posture and vendor stability"
      ],
      futureOutlook: "negative",
      marketMetrics: {
        customerGrowth: -45,
        marketShareTrend: -35,
        innovationIndex: 25,
        customerRetention: 35,
        partnerEcosystem: 25
      }
    },

    financialHealth: {
      revenueGrowth: -15,
      profitability: 5,
      debtToEquity: 0.65,
      cashReserves: 85000000,
      rdInvestment: 8,
      stabilityIndicators: {
        revenueStability: 35,
        customerConcentration: 65,
        geographicDiversification: 55,
        productDiversification: 45,
        financialResilience: 40
      }
    },

    customerFeedback: {
      overallSatisfaction: 42,
      recommendationScore: 25,
      renewalRate: 35,
      expansionRate: 15,
      supportSatisfaction: 38,
      implementationSatisfaction: 35,
      feedback: {
        easeOfUse: 35,
        reliability: 40,
        performance: 38,
        valueForMoney: 30,
        innovation: 25,
        support: 38
      }
    },

    strategicFit: {
      digitalTransformation: 25,
      cloudStrategy: 15,
      securityStrategy: 20,
      complianceStrategy: 35,
      costOptimization: 25,
      alignment: {
        businessObjectives: 25,
        technologyRoadmap: 20,
        securityRequirements: 20,
        complianceNeeds: 35,
        budgetConstraints: 25
      }
    },

    strengths: [
      "Legacy system compatibility (limited benefit)"
    ],
    weaknesses: [
      "89 known CVEs including critical vulnerabilities",
      "Active nation-state exploitation in the wild",
      "End-of-life product with limited support",
      "High operational overhead and complexity",
      "Poor security posture and vendor stability",
      "No cloud-native capabilities",
      "Expensive maintenance and support costs",
      "Limited feature development",
      "High technical debt"
    ],
    bestFor: [
      "Organizations requiring immediate migration away from this platform"
    ],
    challenges: [
      "Critical security vulnerabilities with active exploitation",
      "End-of-life status with limited vendor support",
      "High total cost of ownership",
      "Complex migration to modern alternatives required",
      "Significant security and compliance risks",
      "Limited scalability and performance",
      "Lack of modern security features"
    ],
    advantages: [
      "None - immediate migration recommended"
    ],
    recommendations: [
      "IMMEDIATE MIGRATION REQUIRED - Security Risk",
      "Do not deploy new instances",
      "Plan emergency migration to modern platform",
      "Consider Portnox CLEAR for rapid replacement",
      "Implement additional security controls if migration delayed"
    ]
  }
}

export const AllVendorData = ComprehensiveVendorDatabase