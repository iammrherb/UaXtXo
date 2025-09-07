export interface VendorData {
  id: string
  name: string
  category: "leader" | "challenger" | "visionary" | "niche"
  marketShare: number
  deploymentType: "cloud" | "on-premise" | "hybrid"
  logo: string
  description: string

  pricing: {
    model: "per-device" | "per-user" | "flat-rate" | "quote-based"
    basePrice: number
    pricePerDevice: number
    minimumDevices?: number
    additionalCosts: {
      hardware: number
      services: number
      training: number
      maintenance: number
    }
  }

  implementation: {
    timeToDeployDays: number
    complexity: "low" | "medium" | "high"
    professionalServicesRequired: boolean
    trainingHours: number
  }

  security: {
    securityRating: number
    cveCount: number
    lastSecurityIncident?: string
    complianceSupport: string[]
    zeroTrustMaturity: number
  }

  features: {
    core: string[]
    advanced: string[]
    integrations: string[]
  }

  support: {
    availability: string
    responseTime: string
    customerSatisfaction: number
  }

  strengths: string[]
  weaknesses: string[]
  bestFor: string[]
}

export const ComprehensiveVendorDatabase: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    category: "visionary",
    marketShare: 8.5,
    deploymentType: "cloud",
    logo: "/portnox-logo.png",
    description: "Pure cloud-native NAC with zero infrastructure requirements and industry-leading security posture.",

    pricing: {
      model: "per-device",
      basePrice: 0,
      pricePerDevice: 4.0,
      additionalCosts: {
        hardware: 0,
        services: 0,
        training: 0,
        maintenance: 0,
      },
    },

    implementation: {
      timeToDeployDays: 1,
      complexity: "low",
      professionalServicesRequired: false,
      trainingHours: 2,
    },

    security: {
      securityRating: 95,
      cveCount: 0,
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST", "ISO27001", "FedRAMP"],
      zeroTrustMaturity: 95,
    },

    features: {
      core: ["Device Discovery", "Policy Enforcement", "Guest Access", "Certificate Management"],
      advanced: ["AI-Powered Analytics", "Automated Remediation", "Risk Scoring", "Behavioral Analysis"],
      integrations: ["Active Directory", "SIEM", "ITSM", "MDM", "Cloud Platforms"],
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 1 hour",
      customerSatisfaction: 96,
    },

    strengths: [
      "Zero infrastructure requirements",
      "Fastest deployment in industry",
      "No CVEs in security history",
      "95% Zero Trust maturity score",
      "All-inclusive pricing model",
    ],
    weaknesses: ["Newer market presence", "Limited on-premise options"],
    bestFor: [
      "Cloud-first organizations",
      "Rapid deployment requirements",
      "Cost-conscious enterprises",
      "Zero Trust initiatives",
    ],
  },

  cisco: {
    id: "cisco",
    name: "Cisco Identity Services Engine (ISE)",
    category: "leader",
    marketShare: 35.2,
    deploymentType: "on-premise",
    logo: "/cisco-logo.png",
    description:
      "Industry-leading identity services engine with comprehensive policy management and extensive ecosystem integration.",

    pricing: {
      model: "per-device",
      basePrice: 50000,
      pricePerDevice: 12.0,
      minimumDevices: 100,
      additionalCosts: {
        hardware: 150000,
        services: 75000,
        training: 25000,
        maintenance: 30000,
      },
    },

    implementation: {
      timeToDeployDays: 180,
      complexity: "high",
      professionalServicesRequired: true,
      trainingHours: 40,
    },

    security: {
      securityRating: 85,
      cveCount: 47,
      lastSecurityIncident: "2023-Q4",
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST", "ISO27001", "Common Criteria"],
      zeroTrustMaturity: 75,
    },

    features: {
      core: ["Policy Management", "Device Profiling", "Guest Access", "Certificate Services"],
      advanced: ["TrustSec", "pxGrid", "Threat Intelligence", "Compliance Reporting"],
      integrations: ["Cisco Security Portfolio", "Third-party SIEM", "MDM Solutions", "Threat Intelligence"],
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 4 hours",
      customerSatisfaction: 78,
    },

    strengths: [
      "Market leader with proven track record",
      "Comprehensive feature set",
      "Extensive ecosystem integration",
      "Strong enterprise support",
    ],
    weaknesses: [
      "Complex deployment and management",
      "High total cost of ownership",
      "Significant hardware requirements",
      "Multiple CVEs annually",
    ],
    bestFor: [
      "Large enterprises",
      "Cisco-centric environments",
      "Complex policy requirements",
      "Regulatory compliance needs",
    ],
  },

  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    category: "challenger",
    marketShare: 18.7,
    deploymentType: "hybrid",
    logo: "/aruba-logo.png",
    description: "Comprehensive network access control with strong policy management and multi-vendor support.",

    pricing: {
      model: "per-device",
      basePrice: 25000,
      pricePerDevice: 8.5,
      minimumDevices: 50,
      additionalCosts: {
        hardware: 80000,
        services: 40000,
        training: 15000,
        maintenance: 20000,
      },
    },

    implementation: {
      timeToDeployDays: 90,
      complexity: "medium",
      professionalServicesRequired: true,
      trainingHours: 24,
    },

    security: {
      securityRating: 82,
      cveCount: 12,
      lastSecurityIncident: "2023-Q2",
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST"],
      zeroTrustMaturity: 70,
    },

    features: {
      core: ["Policy Manager", "Device Insight", "Guest Access", "OnGuard"],
      advanced: ["IntroSpect UEBA", "Policy Enforcement", "Threat Detection", "Compliance Reporting"],
      integrations: ["Aruba Infrastructure", "Third-party Switches", "SIEM Solutions", "MDM Platforms"],
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 2 hours",
      customerSatisfaction: 84,
    },

    strengths: [
      "Strong policy management",
      "Multi-vendor support",
      "Good price-performance ratio",
      "Comprehensive feature set",
    ],
    weaknesses: ["Complex initial setup", "Hardware dependencies", "Limited cloud-native features"],
    bestFor: [
      "Mid to large enterprises",
      "Multi-vendor environments",
      "Policy-heavy deployments",
      "Budget-conscious organizations",
    ],
  },

  forescout: {
    id: "forescout",
    name: "Forescout Platform",
    category: "challenger",
    marketShare: 12.3,
    deploymentType: "hybrid",
    logo: "/forescout-logo.png",
    description: "Device visibility and control platform with strong IoT and OT security capabilities.",

    pricing: {
      model: "per-device",
      basePrice: 30000,
      pricePerDevice: 6.5,
      minimumDevices: 100,
      additionalCosts: {
        hardware: 60000,
        services: 35000,
        training: 18000,
        maintenance: 25000,
      },
    },

    implementation: {
      timeToDeployDays: 120,
      complexity: "medium",
      professionalServicesRequired: true,
      trainingHours: 32,
    },

    security: {
      securityRating: 80,
      cveCount: 8,
      lastSecurityIncident: "2023-Q1",
      complianceSupport: ["HIPAA", "PCI-DSS", "NIST", "IEC 62443"],
      zeroTrustMaturity: 65,
    },

    features: {
      core: ["Device Discovery", "Classification", "Policy Enforcement", "Compliance Monitoring"],
      advanced: ["IoT Security", "OT Visibility", "Threat Detection", "Automated Response"],
      integrations: ["Security Orchestration", "SIEM Platforms", "Firewalls", "Endpoint Protection"],
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 3 hours",
      customerSatisfaction: 79,
    },

    strengths: [
      "Excellent IoT/OT visibility",
      "Strong device classification",
      "Good integration capabilities",
      "Comprehensive compliance features",
    ],
    weaknesses: ["Complex deployment", "Higher learning curve", "Limited cloud-native options"],
    bestFor: [
      "IoT-heavy environments",
      "OT/Industrial networks",
      "Compliance-focused organizations",
      "Large device inventories",
    ],
  },

  extreme: {
    id: "extreme",
    name: "Extreme NAC",
    category: "niche",
    marketShare: 5.8,
    deploymentType: "hybrid",
    logo: "/extreme-logo.png",
    description: "Flexible network access control with cloud and on-premise deployment options.",

    pricing: {
      model: "per-device",
      basePrice: 15000,
      pricePerDevice: 5.0,
      minimumDevices: 50,
      additionalCosts: {
        hardware: 40000,
        services: 20000,
        training: 10000,
        maintenance: 15000,
      },
    },

    implementation: {
      timeToDeployDays: 60,
      complexity: "medium",
      professionalServicesRequired: false,
      trainingHours: 16,
    },

    security: {
      securityRating: 75,
      cveCount: 5,
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX"],
      zeroTrustMaturity: 60,
    },

    features: {
      core: ["Access Control", "Guest Management", "Device Profiling", "Policy Enforcement"],
      advanced: ["Cloud Management", "Analytics", "Automated Remediation"],
      integrations: ["Extreme Infrastructure", "Third-party Systems", "Cloud Platforms"],
    },

    support: {
      availability: "Business Hours",
      responseTime: "< 4 hours",
      customerSatisfaction: 76,
    },

    strengths: ["Flexible deployment options", "Good value proposition", "Easy to manage", "Quick deployment"],
    weaknesses: ["Limited advanced features", "Smaller ecosystem", "Basic analytics capabilities"],
    bestFor: [
      "SMB to mid-market",
      "Extreme infrastructure users",
      "Simple NAC requirements",
      "Budget-conscious deployments",
    ],
  },

  fortinet: {
    id: "fortinet",
    name: "Fortinet FortiNAC",
    category: "niche",
    marketShare: 4.2,
    deploymentType: "on-premise",
    logo: "/fortinet-logo.png",
    description: "Network access control integrated with Fortinet Security Fabric for comprehensive security.",

    pricing: {
      model: "quote-based",
      basePrice: 20000,
      pricePerDevice: 7.0,
      minimumDevices: 100,
      additionalCosts: {
        hardware: 50000,
        services: 25000,
        training: 12000,
        maintenance: 18000,
      },
    },

    implementation: {
      timeToDeployDays: 90,
      complexity: "medium",
      professionalServicesRequired: true,
      trainingHours: 24,
    },

    security: {
      securityRating: 78,
      cveCount: 15,
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX", "GDPR"],
      zeroTrustMaturity: 65,
    },

    features: {
      core: ["Device Discovery", "Access Control", "Guest Portal", "Compliance Monitoring"],
      advanced: ["Security Fabric Integration", "Threat Intelligence", "Automated Response"],
      integrations: ["Fortinet Security Fabric", "FortiGate", "FortiAnalyzer", "Third-party SIEM"],
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 4 hours",
      customerSatisfaction: 74,
    },

    strengths: [
      "Strong Fortinet integration",
      "Comprehensive security features",
      "Good threat intelligence",
      "Unified management",
    ],
    weaknesses: ["Limited multi-vendor support", "Complex without Fortinet infrastructure", "Higher CVE count"],
    bestFor: [
      "Fortinet-centric environments",
      "Security-focused organizations",
      "Integrated security requirements",
      "Threat intelligence needs",
    ],
  },

  juniper: {
    id: "juniper",
    name: "Juniper Mist Access Assurance",
    category: "visionary",
    marketShare: 3.1,
    deploymentType: "cloud",
    logo: "/juniper-logo.png",
    description: "AI-driven cloud-native access assurance with machine learning capabilities.",

    pricing: {
      model: "per-device",
      basePrice: 10000,
      pricePerDevice: 6.0,
      minimumDevices: 50,
      additionalCosts: {
        hardware: 30000,
        services: 15000,
        training: 8000,
        maintenance: 12000,
      },
    },

    implementation: {
      timeToDeployDays: 30,
      complexity: "low",
      professionalServicesRequired: false,
      trainingHours: 12,
    },

    security: {
      securityRating: 82,
      cveCount: 3,
      complianceSupport: ["HIPAA", "PCI-DSS", "GDPR"],
      zeroTrustMaturity: 80,
    },

    features: {
      core: ["AI-Driven Insights", "Dynamic Policies", "User Experience Monitoring"],
      advanced: ["Machine Learning", "Predictive Analytics", "Automated Troubleshooting"],
      integrations: ["Mist Cloud", "Juniper Infrastructure", "Third-party Systems"],
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 2 hours",
      customerSatisfaction: 85,
    },

    strengths: ["AI-driven capabilities", "Cloud-native architecture", "Excellent user experience", "Low CVE count"],
    weaknesses: ["Requires Mist ecosystem", "Limited on-premise options", "Newer to market"],
    bestFor: ["Juniper Mist users", "AI-driven operations", "Cloud-first organizations", "User experience focus"],
  },

  arista: {
    id: "arista",
    name: "Arista CloudVision AGNI",
    category: "niche",
    marketShare: 2.8,
    deploymentType: "cloud",
    logo: "/arista-logo.png",
    description: "Cloud-first network identity and access management for Arista environments.",

    pricing: {
      model: "quote-based",
      basePrice: 25000,
      pricePerDevice: 8.0,
      minimumDevices: 100,
      additionalCosts: {
        hardware: 0,
        services: 20000,
        training: 10000,
        maintenance: 15000,
      },
    },

    implementation: {
      timeToDeployDays: 45,
      complexity: "medium",
      professionalServicesRequired: true,
      trainingHours: 20,
    },

    security: {
      securityRating: 79,
      cveCount: 4,
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX"],
      zeroTrustMaturity: 70,
    },

    features: {
      core: ["Identity Management", "Access Control", "Policy Automation"],
      advanced: ["CloudVision Integration", "Telemetry Analytics", "Automated Compliance"],
      integrations: ["Arista Switches", "CloudVision", "Third-party Security Tools"],
    },

    support: {
      availability: "Business Hours",
      responseTime: "< 4 hours",
      customerSatisfaction: 77,
    },

    strengths: [
      "Cloud-first architecture",
      "Strong Arista integration",
      "Good automation capabilities",
      "Low CVE count",
    ],
    weaknesses: ["Requires Arista infrastructure", "Limited multi-vendor support", "Smaller market presence"],
    bestFor: [
      "Arista customers",
      "Cloud-native deployments",
      "Automation-focused environments",
      "Data center networks",
    ],
  },

  ivanti: {
    id: "ivanti",
    name: "Ivanti Neurons (formerly Pulse Secure)",
    category: "niche",
    marketShare: 2.1,
    deploymentType: "hybrid",
    logo: "/placeholder-logo.png",
    description: "⚠️ CRITICAL SECURITY RISK: Active nation-state exploitation. Immediate migration required.",

    pricing: {
      model: "per-device",
      basePrice: 18000,
      pricePerDevice: 9.0,
      minimumDevices: 50,
      additionalCosts: {
        hardware: 45000,
        services: 30000,
        training: 15000,
        maintenance: 20000,
      },
    },

    implementation: {
      timeToDeployDays: 120,
      complexity: "high",
      professionalServicesRequired: true,
      trainingHours: 32,
    },

    security: {
      securityRating: 35,
      cveCount: 89,
      lastSecurityIncident: "2024-Q1 - Active Exploitation",
      complianceSupport: ["HIPAA", "PCI-DSS"],
      zeroTrustMaturity: 40,
    },

    features: {
      core: ["VPN Access", "Device Compliance", "Policy Enforcement"],
      advanced: ["Endpoint Security", "Application Access", "Risk Assessment"],
      integrations: ["Ivanti Security Suite", "Third-party Endpoints", "SIEM Solutions"],
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 6 hours",
      customerSatisfaction: 62,
    },

    strengths: ["Comprehensive endpoint integration", "VPN capabilities", "Unified management"],
    weaknesses: [
      "⚠️ CRITICAL: Active nation-state exploitation",
      "89 CVEs including critical vulnerabilities",
      "Poor security track record",
      "Complex deployment and management",
    ],
    bestFor: [
      "⚠️ NOT RECOMMENDED - Security Risk",
      "Immediate migration required",
      "Consider Portnox CLEAR as replacement",
    ],
  },

  microsoft: {
    id: "microsoft",
    name: "Microsoft Network Policy Server (NPS)",
    category: "niche",
    marketShare: 15.2,
    deploymentType: "on-premise",
    logo: "/microsoft-logo.png",
    description: "Basic RADIUS authentication included with Windows Server. Limited NAC capabilities.",

    pricing: {
      model: "flat-rate",
      basePrice: 0,
      pricePerDevice: 0,
      additionalCosts: {
        hardware: 25000,
        services: 15000,
        training: 5000,
        maintenance: 10000,
      },
    },

    implementation: {
      timeToDeployDays: 30,
      complexity: "medium",
      professionalServicesRequired: false,
      trainingHours: 16,
    },

    security: {
      securityRating: 65,
      cveCount: 12,
      complianceSupport: ["Basic Windows Security"],
      zeroTrustMaturity: 30,
    },

    features: {
      core: ["RADIUS Authentication", "Basic Policy Management", "Windows Integration"],
      advanced: ["Limited - Basic RADIUS only"],
      integrations: ["Active Directory", "Windows Infrastructure", "Basic LDAP"],
    },

    support: {
      availability: "Business Hours",
      responseTime: "Varies",
      customerSatisfaction: 68,
    },

    strengths: ["Free with Windows Server", "Native AD integration", "Simple RADIUS functionality"],
    weaknesses: [
      "Very limited NAC features",
      "No advanced security capabilities",
      "Basic policy management",
      "Limited scalability",
    ],
    bestFor: [
      "Basic RADIUS needs only",
      "Small Windows environments",
      "Budget-constrained deployments",
      "Simple authentication requirements",
    ],
  },

  foxpass: {
    id: "foxpass",
    name: "FoxPass",
    category: "niche",
    marketShare: 1.2,
    deploymentType: "cloud",
    logo: "/foxpass-logo.png",
    description: "Cloud-based RADIUS service focused on simplicity and ease of use for SMB market.",

    pricing: {
      model: "per-user",
      basePrice: 0,
      pricePerDevice: 3.0,
      minimumDevices: 10,
      additionalCosts: {
        hardware: 0,
        services: 2000,
        training: 1000,
        maintenance: 0,
      },
    },

    implementation: {
      timeToDeployDays: 7,
      complexity: "low",
      professionalServicesRequired: false,
      trainingHours: 4,
    },

    security: {
      securityRating: 72,
      cveCount: 2,
      complianceSupport: ["Basic Security"],
      zeroTrustMaturity: 45,
    },

    features: {
      core: ["Cloud RADIUS", "User Management", "Basic Policies"],
      advanced: ["API Integration", "SSO Support", "Basic Analytics"],
      integrations: ["Google Workspace", "Office 365", "LDAP", "SAML"],
    },

    support: {
      availability: "Business Hours",
      responseTime: "< 24 hours",
      customerSatisfaction: 81,
    },

    strengths: ["Simple cloud deployment", "Good for SMB market", "Affordable pricing", "Easy to use"],
    weaknesses: [
      "Limited enterprise features",
      "Basic security capabilities",
      "No advanced NAC functions",
      "Limited scalability",
    ],
    bestFor: [
      "Small to medium businesses",
      "Simple RADIUS needs",
      "Cloud-first organizations",
      "Budget-conscious deployments",
    ],
  },

  securew2: {
    id: "securew2",
    name: "SecureW2",
    category: "niche",
    marketShare: 0.8,
    deploymentType: "cloud",
    logo: "/securew2-logo.png",
    description: "Cloud-based certificate management and WiFi security solution with PKI focus.",

    pricing: {
      model: "per-device",
      basePrice: 5000,
      pricePerDevice: 3.5, // Updated to accurate pricing
      minimumDevices: 500, // Minimum commitment
      additionalCosts: {
        hardware: 0, // No hardware required (cloud service)
        services: 8000, // Implementation services
        training: 3000, // 8 hours of training
        maintenance: 0, // Included in subscription
      },
    },

    implementation: {
      timeToDeployDays: 14, // Realistic for cloud service
      complexity: "low", // Cloud service is low complexity
      professionalServicesRequired: false, // Can be self-deployed
      trainingHours: 8, // 1 day of training
    },

    security: {
      securityRating: 85,
      cveCount: 2, // Low CVE count
      complianceSupport: ["HIPAA", "PCI-DSS", "GDPR"],
      zeroTrustMaturity: 75,
    },

    features: {
      core: ["Certificate Management", "WiFi Security", "RADIUS-as-a-Service", "User Onboarding"],
      advanced: ["Cloud PKI", "BYOD Onboarding", "Certificate Lifecycle Management", "API Integration"],
      integrations: ["Active Directory", "Azure AD", "Google Workspace", "SAML IdPs", "MDM Solutions"],
    },

    support: {
      availability: "Business Hours",
      responseTime: "< 4 hours",
      customerSatisfaction: 83,
    },

    strengths: [
      "Strong certificate management",
      "Excellent WiFi security",
      "Cloud-native architecture",
      "Good BYOD support",
    ],
    weaknesses: [
      "Limited NAC features beyond WiFi",
      "Focused on certificate-based auth",
      "Niche market focus",
      "Limited wired network support",
    ],
    bestFor: [
      "Certificate-based authentication",
      "Educational institutions",
      "WiFi-focused security",
      "BYOD environments",
    ],
  },

  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    category: "niche",
    marketShare: 0.5,
    deploymentType: "on-premise",
    logo: "/packetfence-logo.png",
    description: "Open-source network access control with commercial support options available.",

    pricing: {
      model: "flat-rate",
      basePrice: 0,
      pricePerDevice: 0,
      additionalCosts: {
        hardware: 20000,
        services: 25000,
        training: 15000,
        maintenance: 20000,
      },
    },

    implementation: {
      timeToDeployDays: 90,
      complexity: "high",
      professionalServicesRequired: true,
      trainingHours: 40,
    },

    security: {
      securityRating: 70,
      cveCount: 8,
      complianceSupport: ["Basic Open Source"],
      zeroTrustMaturity: 50,
    },

    features: {
      core: ["Open Source NAC", "Device Registration", "Policy Enforcement"],
      advanced: ["Captive Portal", "VLAN Assignment", "Integration APIs"],
      integrations: ["Various Network Equipment", "LDAP", "RADIUS", "Custom Integrations"],
    },

    support: {
      availability: "Community/Commercial",
      responseTime: "Varies",
      customerSatisfaction: 65,
    },

    strengths: ["Open source flexibility", "No licensing costs", "Customizable", "Community support"],
    weaknesses: [
      "High implementation complexity",
      "Requires significant expertise",
      "Limited commercial support",
      "Higher total cost with services",
    ],
    bestFor: [
      "Open source environments",
      "Custom requirements",
      "Technical organizations",
      "Budget-conscious with expertise",
    ],
  },

  meraki: {
    id: "meraki",
    name: "Cisco Meraki",
    category: "niche",
    marketShare: 6.8,
    deploymentType: "cloud",
    logo: "/meraki-logo.png",
    description: "Cloud-managed network access control integrated with Meraki infrastructure.",

    pricing: {
      model: "per-device",
      basePrice: 10000,
      pricePerDevice: 4.5,
      minimumDevices: 50,
      additionalCosts: {
        hardware: 80000,
        services: 15000,
        training: 8000,
        maintenance: 12000,
      },
    },

    implementation: {
      timeToDeployDays: 14,
      complexity: "low",
      professionalServicesRequired: false,
      trainingHours: 8,
    },

    security: {
      securityRating: 78,
      cveCount: 6,
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX"],
      zeroTrustMaturity: 65,
    },

    features: {
      core: ["Cloud Management", "Policy Enforcement", "Guest Access"],
      advanced: ["Analytics", "Threat Protection", "SD-WAN Integration"],
      integrations: ["Meraki Infrastructure", "Cisco Security", "Third-party APIs"],
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 2 hours",
      customerSatisfaction: 86,
    },

    strengths: ["Easy cloud management", "Quick deployment", "Good user experience", "Strong Meraki integration"],
    weaknesses: [
      "Requires Meraki infrastructure",
      "Limited multi-vendor support",
      "Subscription-based pricing",
      "Vendor lock-in",
    ],
    bestFor: ["Meraki customers", "Cloud-managed networks", "Simple deployments", "SMB to mid-market"],
  },
}

// Export alias for backward compatibility
export const COMPREHENSIVE_VENDOR_DATA = ComprehensiveVendorDatabase
