export interface VendorData {
  id: string
  name: string
  category: "leader" | "challenger" | "visionary" | "niche"
  marketShare: number
  description: string
  strengths: string[]
  weaknesses: string[]
  pricing: {
    model: "per-device" | "per-user" | "tiered" | "enterprise"
    basePrice: number
    pricePerDevice: number
    volumeDiscounts: Record<number, number>
    additionalCosts: {
      hardware: number
      services: number
      training: number
      maintenance: number
      support: number
    }
    hiddenCosts: {
      total: number
      breakdown: Record<string, number>
    }
  }
  security: {
    securityRating: number
    cveCount: number
    zeroTrustMaturity: number
    complianceSupport: string[]
  }
  implementation: {
    deploymentDays: number
    complexityScore: number
    resourcesRequired: {
      internalFTE: number
      vendorFTE: number
      trainingHours: number
      ongoingFTE: number
    }
  }
  roi: {
    paybackMonths: number
    annualSavings: number
    efficiencyGains: number
    riskReduction: number
  }
  features: {
    core: string[]
    advanced: string[]
    integrations: string[]
  }
  support: {
    availability: string
    responseTime: string
    satisfaction: number
  }
}

export const ComprehensiveVendorDatabase: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    category: "visionary",
    marketShare: 8.5,
    description: "Cloud-native Zero Trust NAC platform with industry-leading security and deployment speed",
    strengths: [
      "Zero CVE security record",
      "30-minute deployment",
      "95% Zero Trust maturity",
      "No hardware requirements",
      "90% admin overhead reduction",
      "Vendor agnostic architecture",
    ],
    weaknesses: ["Newer market presence", "Limited legacy system support"],
    pricing: {
      model: "per-device",
      basePrice: 25000,
      pricePerDevice: 60,
      volumeDiscounts: {
        1000: 10,
        5000: 15,
        10000: 20,
        25000: 25,
      },
      additionalCosts: {
        hardware: 0,
        services: 5000,
        training: 5000,
        maintenance: 0,
        support: 0,
      },
      hiddenCosts: {
        total: 0,
        breakdown: {},
      },
    },
    security: {
      securityRating: 95,
      cveCount: 0,
      zeroTrustMaturity: 95,
      complianceSupport: ["SOC2", "HIPAA", "PCI-DSS", "GDPR", "FedRAMP", "ISO27001"],
    },
    implementation: {
      deploymentDays: 1,
      complexityScore: 2,
      resourcesRequired: {
        internalFTE: 0.5,
        vendorFTE: 1,
        trainingHours: 8,
        ongoingFTE: 0.2,
      },
    },
    roi: {
      paybackMonths: 3,
      annualSavings: 450000,
      efficiencyGains: 90,
      riskReduction: 92,
    },
    features: {
      core: ["Device Discovery", "Policy Enforcement", "Network Segmentation", "Guest Access"],
      advanced: ["AI/ML Analytics", "Threat Detection", "Automated Response", "Zero Trust Architecture"],
      integrations: ["SIEM", "SOAR", "Cloud Platforms", "Identity Providers", "Firewalls"],
    },
    support: {
      availability: "24/7/365",
      responseTime: "< 1 hour",
      satisfaction: 98,
    },
  },
  cisco: {
    id: "cisco",
    name: "Cisco Identity Services Engine (ISE)",
    category: "leader",
    marketShare: 25.3,
    description: "Market-leading NAC solution with comprehensive policy management and network visibility",
    strengths: [
      "Market leader with extensive features",
      "Strong ecosystem integration",
      "Comprehensive policy engine",
      "Large partner network",
    ],
    weaknesses: [
      "Complex deployment and management",
      "High total cost of ownership",
      "Frequent security vulnerabilities",
      "Vendor lock-in architecture",
    ],
    pricing: {
      model: "tiered",
      basePrice: 75000,
      pricePerDevice: 125,
      volumeDiscounts: {
        1000: 5,
        5000: 10,
        10000: 15,
        25000: 20,
      },
      additionalCosts: {
        hardware: 195000,
        services: 175000,
        training: 25000,
        maintenance: 85000,
        support: 45000,
      },
      hiddenCosts: {
        total: 255000,
        breakdown: {
          "Network Redesign": 150000,
          "Integration Complexity": 75000,
          "Downtime Costs": 30000,
        },
      },
    },
    security: {
      securityRating: 88,
      cveCount: 47,
      zeroTrustMaturity: 75,
      complianceSupport: ["SOC2", "HIPAA", "PCI-DSS", "GDPR", "FedRAMP"],
    },
    implementation: {
      deploymentDays: 180,
      complexityScore: 9,
      resourcesRequired: {
        internalFTE: 3,
        vendorFTE: 2,
        trainingHours: 120,
        ongoingFTE: 2.5,
      },
    },
    roi: {
      paybackMonths: 18,
      annualSavings: 180000,
      efficiencyGains: 45,
      riskReduction: 65,
    },
    features: {
      core: ["Policy Management", "Device Profiling", "Guest Access", "BYOD Support"],
      advanced: ["TrustSec", "pxGrid", "Threat-Centric NAC", "Software Defined Access"],
      integrations: ["Cisco Security Portfolio", "Third-party SIEM", "MDM Solutions"],
    },
    support: {
      availability: "24/7/365",
      responseTime: "< 4 hours",
      satisfaction: 82,
    },
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    category: "challenger",
    marketShare: 18.7,
    description: "Comprehensive NAC solution with strong wireless integration and policy management",
    strengths: [
      "Strong wireless integration",
      "Flexible deployment options",
      "Good price-performance ratio",
      "Comprehensive policy engine",
    ],
    weaknesses: ["Complex initial setup", "Limited cloud-native features", "Moderate security posture"],
    pricing: {
      model: "per-device",
      basePrice: 45000,
      pricePerDevice: 95,
      volumeDiscounts: {
        1000: 8,
        5000: 12,
        10000: 18,
        25000: 22,
      },
      additionalCosts: {
        hardware: 95000,
        services: 75000,
        training: 15000,
        maintenance: 45000,
        support: 25000,
      },
      hiddenCosts: {
        total: 125000,
        breakdown: {
          "Professional Services": 85000,
          "Training Overhead": 40000,
        },
      },
    },
    security: {
      securityRating: 85,
      cveCount: 23,
      zeroTrustMaturity: 70,
      complianceSupport: ["SOC2", "HIPAA", "PCI-DSS", "GDPR"],
    },
    implementation: {
      deploymentDays: 90,
      complexityScore: 7,
      resourcesRequired: {
        internalFTE: 2,
        vendorFTE: 1.5,
        trainingHours: 80,
        ongoingFTE: 1.8,
      },
    },
    roi: {
      paybackMonths: 14,
      annualSavings: 220000,
      efficiencyGains: 55,
      riskReduction: 70,
    },
    features: {
      core: ["Policy Manager", "Device Insight", "Guest Access", "OnGuard"],
      advanced: ["IntroSpect UEBA", "ClearPass Exchange", "API Gateway"],
      integrations: ["Aruba Infrastructure", "Third-party Security Tools", "Cloud Platforms"],
    },
    support: {
      availability: "24/7/365",
      responseTime: "< 2 hours",
      satisfaction: 88,
    },
  },
  forescout: {
    id: "forescout",
    name: "Forescout Platform",
    category: "niche",
    marketShare: 12.4,
    description: "Device visibility and compliance platform with strong IoT and OT support",
    strengths: [
      "Excellent device visibility",
      "Strong IoT/OT support",
      "Agentless architecture",
      "Comprehensive device intelligence",
    ],
    weaknesses: ["Complex pricing model", "High implementation costs", "Limited cloud-native features"],
    pricing: {
      model: "per-device",
      basePrice: 65000,
      pricePerDevice: 75,
      volumeDiscounts: {
        1000: 6,
        5000: 12,
        10000: 16,
        25000: 20,
      },
      additionalCosts: {
        hardware: 125000,
        services: 100000,
        training: 20000,
        maintenance: 65000,
        support: 35000,
      },
      hiddenCosts: {
        total: 180000,
        breakdown: {
          "Module Licensing": 120000,
          "Integration Services": 60000,
        },
      },
    },
    security: {
      securityRating: 82,
      cveCount: 18,
      zeroTrustMaturity: 68,
      complianceSupport: ["SOC2", "HIPAA", "PCI-DSS", "NERC-CIP"],
    },
    implementation: {
      deploymentDays: 120,
      complexityScore: 8,
      resourcesRequired: {
        internalFTE: 2.5,
        vendorFTE: 2,
        trainingHours: 100,
        ongoingFTE: 2.2,
      },
    },
    roi: {
      paybackMonths: 16,
      annualSavings: 195000,
      efficiencyGains: 50,
      riskReduction: 68,
    },
    features: {
      core: ["Device Discovery", "Compliance Assessment", "Network Segmentation", "Incident Response"],
      advanced: ["Extended Modules", "OT Security", "IoT Security", "Cloud Assessment"],
      integrations: ["SIEM Platforms", "Orchestration Tools", "Firewalls", "Switches"],
    },
    support: {
      availability: "24/7/365",
      responseTime: "< 3 hours",
      satisfaction: 85,
    },
  },
  juniper: {
    id: "juniper",
    name: "Juniper Mist Access Assurance",
    category: "challenger",
    marketShare: 9.2,
    description: "AI-driven cloud-native NAC with strong wireless integration and automation",
    strengths: [
      "AI-driven operations",
      "Cloud-native architecture",
      "Strong automation capabilities",
      "Good wireless integration",
    ],
    weaknesses: ["Requires Juniper infrastructure", "Limited third-party integrations", "Newer to market"],
    pricing: {
      model: "per-device",
      basePrice: 35000,
      pricePerDevice: 72,
      volumeDiscounts: {
        1000: 10,
        5000: 15,
        10000: 20,
        25000: 25,
      },
      additionalCosts: {
        hardware: 0,
        services: 40000,
        training: 10000,
        maintenance: 25000,
        support: 15000,
      },
      hiddenCosts: {
        total: 85000,
        breakdown: {
          "Infrastructure Requirements": 85000,
        },
      },
    },
    security: {
      securityRating: 83,
      cveCount: 12,
      zeroTrustMaturity: 78,
      complianceSupport: ["SOC2", "HIPAA", "PCI-DSS", "GDPR"],
    },
    implementation: {
      deploymentDays: 60,
      complexityScore: 5,
      resourcesRequired: {
        internalFTE: 1.5,
        vendorFTE: 1,
        trainingHours: 40,
        ongoingFTE: 1.2,
      },
    },
    roi: {
      paybackMonths: 12,
      annualSavings: 265000,
      efficiencyGains: 65,
      riskReduction: 72,
    },
    features: {
      core: ["AI-driven Policy", "Dynamic Segmentation", "User Experience", "Wireless Assurance"],
      advanced: ["Marvis AI", "Location Services", "IoT Assurance", "WAN Assurance"],
      integrations: ["Juniper Infrastructure", "Cloud Platforms", "Identity Providers"],
    },
    support: {
      availability: "24/7/365",
      responseTime: "< 2 hours",
      satisfaction: 90,
    },
  },
  extreme: {
    id: "extreme",
    name: "Extreme NAC",
    category: "niche",
    marketShare: 6.8,
    description: "Flexible NAC solution with strong policy management and network integration",
    strengths: [
      "Flexible deployment options",
      "Good price point",
      "Strong policy engine",
      "Decent integration capabilities",
    ],
    weaknesses: ["Limited advanced features", "Moderate security posture", "Complex management interface"],
    pricing: {
      model: "per-device",
      basePrice: 30000,
      pricePerDevice: 65,
      volumeDiscounts: {
        1000: 8,
        5000: 12,
        10000: 16,
        25000: 20,
      },
      additionalCosts: {
        hardware: 100000,
        services: 60000,
        training: 12000,
        maintenance: 35000,
        support: 20000,
      },
      hiddenCosts: {
        total: 95000,
        breakdown: {
          "Professional Services": 65000,
          "Ongoing Support": 30000,
        },
      },
    },
    security: {
      securityRating: 78,
      cveCount: 15,
      zeroTrustMaturity: 62,
      complianceSupport: ["SOC2", "PCI-DSS", "GDPR"],
    },
    implementation: {
      deploymentDays: 75,
      complexityScore: 6,
      resourcesRequired: {
        internalFTE: 2,
        vendorFTE: 1,
        trainingHours: 60,
        ongoingFTE: 1.5,
      },
    },
    roi: {
      paybackMonths: 15,
      annualSavings: 185000,
      efficiencyGains: 48,
      riskReduction: 62,
    },
    features: {
      core: ["Policy Manager", "End-System Manager", "Guest Manager", "Mobile Manager"],
      advanced: ["Analytics", "Workflow Manager", "API Integration"],
      integrations: ["Extreme Infrastructure", "Third-party Security", "Cloud Services"],
    },
    support: {
      availability: "Business Hours",
      responseTime: "< 4 hours",
      satisfaction: 78,
    },
  },
  fortinet: {
    id: "fortinet",
    name: "Fortinet FortiNAC",
    category: "niche",
    marketShare: 8.1,
    description: "Integrated NAC solution with strong firewall integration and security fabric",
    strengths: [
      "Strong firewall integration",
      "Security Fabric integration",
      "Good value proposition",
      "Comprehensive visibility",
    ],
    weaknesses: ["Requires Fortinet ecosystem", "Limited standalone capabilities", "Complex multi-vendor environments"],
    pricing: {
      model: "per-device",
      basePrice: 28000,
      pricePerDevice: 58,
      volumeDiscounts: {
        1000: 10,
        5000: 15,
        10000: 18,
        25000: 22,
      },
      additionalCosts: {
        hardware: 85000,
        services: 55000,
        training: 15000,
        maintenance: 30000,
        support: 18000,
      },
      hiddenCosts: {
        total: 75000,
        breakdown: {
          "Ecosystem Requirements": 75000,
        },
      },
    },
    security: {
      securityRating: 82,
      cveCount: 21,
      zeroTrustMaturity: 65,
      complianceSupport: ["SOC2", "PCI-DSS", "HIPAA", "GDPR"],
    },
    implementation: {
      deploymentDays: 85,
      complexityScore: 7,
      resourcesRequired: {
        internalFTE: 2,
        vendorFTE: 1.5,
        trainingHours: 70,
        ongoingFTE: 1.8,
      },
    },
    roi: {
      paybackMonths: 13,
      annualSavings: 205000,
      efficiencyGains: 52,
      riskReduction: 68,
    },
    features: {
      core: ["Device Control", "Vulnerability Assessment", "Guest Management", "Compliance"],
      advanced: ["Security Fabric Integration", "IoT Security", "Automated Response"],
      integrations: ["Fortinet Security Fabric", "Third-party SIEM", "Cloud Platforms"],
    },
    support: {
      availability: "24/7/365",
      responseTime: "< 3 hours",
      satisfaction: 84,
    },
  },
  arista: {
    id: "arista",
    name: "Arista CloudVision AGNI",
    category: "niche",
    marketShare: 4.2,
    description: "Cloud-first NAC solution with strong network automation and telemetry",
    strengths: ["Cloud-first architecture", "Strong automation", "Good telemetry capabilities", "Modern API design"],
    weaknesses: ["Requires Arista switches", "Limited market presence", "Newer solution"],
    pricing: {
      model: "per-device",
      basePrice: 25000,
      pricePerDevice: 48,
      volumeDiscounts: {
        1000: 12,
        5000: 18,
        10000: 22,
        25000: 28,
      },
      additionalCosts: {
        hardware: 0,
        services: 35000,
        training: 8000,
        maintenance: 20000,
        support: 12000,
      },
      hiddenCosts: {
        total: 65000,
        breakdown: {
          "Infrastructure Requirements": 65000,
        },
      },
    },
    security: {
      securityRating: 80,
      cveCount: 8,
      zeroTrustMaturity: 75,
      complianceSupport: ["SOC2", "PCI-DSS", "GDPR"],
    },
    implementation: {
      deploymentDays: 42,
      complexityScore: 4,
      resourcesRequired: {
        internalFTE: 1,
        vendorFTE: 1,
        trainingHours: 32,
        ongoingFTE: 0.8,
      },
    },
    roi: {
      paybackMonths: 10,
      annualSavings: 235000,
      efficiencyGains: 68,
      riskReduction: 70,
    },
    features: {
      core: ["Network Automation", "Telemetry", "Policy Management", "Segmentation"],
      advanced: ["AI/ML Analytics", "Predictive Insights", "Workflow Automation"],
      integrations: ["Arista EOS", "Cloud Platforms", "Third-party Tools"],
    },
    support: {
      availability: "24/7/365",
      responseTime: "< 2 hours",
      satisfaction: 87,
    },
  },
  meraki: {
    id: "meraki",
    name: "Cisco Meraki Access Control",
    category: "niche",
    marketShare: 7.3,
    description: "Cloud-managed access control with simple deployment and management",
    strengths: ["Simple cloud management", "Easy deployment", "Good user experience", "Strong wireless integration"],
    weaknesses: ["Limited advanced features", "Requires Meraki infrastructure", "High ongoing costs"],
    pricing: {
      model: "per-device",
      basePrice: 40000,
      pricePerDevice: 108,
      volumeDiscounts: {
        1000: 5,
        5000: 8,
        10000: 12,
        25000: 15,
      },
      additionalCosts: {
        hardware: 0,
        services: 30000,
        training: 5000,
        maintenance: 0,
        support: 0,
      },
      hiddenCosts: {
        total: 125000,
        breakdown: {
          "Infrastructure Lock-in": 125000,
        },
      },
    },
    security: {
      securityRating: 75,
      cveCount: 19,
      zeroTrustMaturity: 58,
      complianceSupport: ["SOC2", "PCI-DSS"],
    },
    implementation: {
      deploymentDays: 30,
      complexityScore: 3,
      resourcesRequired: {
        internalFTE: 0.5,
        vendorFTE: 0.5,
        trainingHours: 16,
        ongoingFTE: 0.8,
      },
    },
    roi: {
      paybackMonths: 16,
      annualSavings: 165000,
      efficiencyGains: 42,
      riskReduction: 55,
    },
    features: {
      core: ["Cloud Management", "Guest Access", "Device Compliance", "Wireless Integration"],
      advanced: ["Location Analytics", "API Integration"],
      integrations: ["Meraki Infrastructure", "Cloud Services", "Identity Providers"],
    },
    support: {
      availability: "Business Hours",
      responseTime: "< 4 hours",
      satisfaction: 82,
    },
  },
  ivanti: {
    id: "ivanti",
    name: "Ivanti Neurons (Pulse Secure)",
    category: "niche",
    marketShare: 3.8,
    description: "⚠️ CRITICAL SECURITY RISK - Active exploitation by nation-state actors",
    strengths: ["Comprehensive endpoint management", "VPN integration"],
    weaknesses: [
      "⚠️ ACTIVE SECURITY EXPLOITS",
      "Nation-state targeting",
      "Complex architecture",
      "High maintenance overhead",
      "Poor security track record",
    ],
    pricing: {
      model: "per-device",
      basePrice: 85000,
      pricePerDevice: 95,
      volumeDiscounts: {
        1000: 5,
        5000: 8,
        10000: 12,
        25000: 15,
      },
      additionalCosts: {
        hardware: 150000,
        services: 120000,
        training: 25000,
        maintenance: 95000,
        support: 55000,
      },
      hiddenCosts: {
        total: 350000,
        breakdown: {
          "Security Incident Response": 200000,
          "Emergency Patching": 75000,
          "Compliance Violations": 75000,
        },
      },
    },
    security: {
      securityRating: 25,
      cveCount: 89,
      zeroTrustMaturity: 35,
      complianceSupport: ["Limited"],
    },
    implementation: {
      deploymentDays: 150,
      complexityScore: 10,
      resourcesRequired: {
        internalFTE: 4,
        vendorFTE: 3,
        trainingHours: 160,
        ongoingFTE: 3.5,
      },
    },
    roi: {
      paybackMonths: 36,
      annualSavings: 85000,
      efficiencyGains: 25,
      riskReduction: 15,
    },
    features: {
      core: ["VPN Access", "Endpoint Management", "Policy Enforcement"],
      advanced: ["Limited Advanced Features"],
      integrations: ["Limited Third-party Support"],
    },
    support: {
      availability: "Business Hours",
      responseTime: "< 8 hours",
      satisfaction: 45,
    },
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft Network Policy Server (NPS)",
    category: "niche",
    marketShare: 15.2,
    description: "Basic RADIUS server included with Windows Server - limited NAC capabilities",
    strengths: ["Included with Windows Server", "Basic RADIUS functionality", "Microsoft ecosystem integration"],
    weaknesses: [
      "Very limited NAC features",
      "No advanced policy management",
      "Poor device visibility",
      "Manual configuration required",
    ],
    pricing: {
      model: "enterprise",
      basePrice: 0,
      pricePerDevice: 0,
      volumeDiscounts: {},
      additionalCosts: {
        hardware: 75000,
        services: 85000,
        training: 15000,
        maintenance: 25000,
        support: 35000,
      },
      hiddenCosts: {
        total: 185000,
        breakdown: {
          "Manual Management Overhead": 125000,
          "Limited Functionality Gaps": 60000,
        },
      },
    },
    security: {
      securityRating: 55,
      cveCount: 32,
      zeroTrustMaturity: 25,
      complianceSupport: ["Basic Windows Compliance"],
    },
    implementation: {
      deploymentDays: 120,
      complexityScore: 8,
      resourcesRequired: {
        internalFTE: 3,
        vendorFTE: 0,
        trainingHours: 80,
        ongoingFTE: 2.8,
      },
    },
    roi: {
      paybackMonths: 24,
      annualSavings: 95000,
      efficiencyGains: 20,
      riskReduction: 35,
    },
    features: {
      core: ["Basic RADIUS", "Windows Authentication", "Simple Policies"],
      advanced: ["Limited Advanced Features"],
      integrations: ["Microsoft Ecosystem Only"],
    },
    support: {
      availability: "Business Hours",
      responseTime: "< 24 hours",
      satisfaction: 65,
    },
  },
  foxpass: {
    id: "foxpass",
    name: "FoxPass",
    category: "niche",
    marketShare: 2.1,
    description: "Cloud-based RADIUS service focused on SMB market with simple deployment",
    strengths: ["Simple cloud deployment", "Good for small businesses", "Affordable pricing", "Easy management"],
    weaknesses: ["Limited enterprise features", "Basic policy management", "Limited integrations", "SMB-focused only"],
    pricing: {
      model: "per-user",
      basePrice: 5000,
      pricePerDevice: 36,
      volumeDiscounts: {
        1000: 10,
        5000: 15,
        10000: 20,
      },
      additionalCosts: {
        hardware: 0,
        services: 8000,
        training: 2000,
        maintenance: 0,
        support: 0,
      },
      hiddenCosts: {
        total: 25000,
        breakdown: {
          "Feature Limitations": 25000,
        },
      },
    },
    security: {
      securityRating: 68,
      cveCount: 5,
      zeroTrustMaturity: 45,
      complianceSupport: ["SOC2", "Basic Compliance"],
    },
    implementation: {
      deploymentDays: 14,
      complexityScore: 2,
      resourcesRequired: {
        internalFTE: 0.5,
        vendorFTE: 0.5,
        trainingHours: 8,
        ongoingFTE: 0.3,
      },
    },
    roi: {
      paybackMonths: 8,
      annualSavings: 125000,
      efficiencyGains: 35,
      riskReduction: 45,
    },
    features: {
      core: ["Cloud RADIUS", "User Management", "Basic Policies", "WiFi Authentication"],
      advanced: ["API Access", "LDAP Integration"],
      integrations: ["Google Workspace", "Office 365", "Basic LDAP"],
    },
    support: {
      availability: "Business Hours",
      responseTime: "< 4 hours",
      satisfaction: 78,
    },
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    category: "niche",
    marketShare: 1.8,
    description: "Managed PKI and certificate-based authentication specialist",
    strengths: [
      "Strong PKI expertise",
      "Certificate-based security",
      "Good for education sector",
      "Managed service approach",
    ],
    weaknesses: ["Very expensive", "Limited NAC features", "Niche market focus", "Complex certificate management"],
    pricing: {
      model: "per-device",
      basePrice: 35000,
      pricePerDevice: 120,
      volumeDiscounts: {
        1000: 5,
        5000: 8,
        10000: 12,
      },
      additionalCosts: {
        hardware: 0,
        services: 45000,
        training: 18000,
        maintenance: 25000,
        support: 15000,
      },
      hiddenCosts: {
        total: 85000,
        breakdown: {
          "Certificate Management Overhead": 85000,
        },
      },
    },
    security: {
      securityRating: 85,
      cveCount: 3,
      zeroTrustMaturity: 72,
      complianceSupport: ["SOC2", "HIPAA", "FERPA", "PCI-DSS"],
    },
    implementation: {
      deploymentDays: 65,
      complexityScore: 6,
      resourcesRequired: {
        internalFTE: 1.5,
        vendorFTE: 2,
        trainingHours: 60,
        ongoingFTE: 1.2,
      },
    },
    roi: {
      paybackMonths: 18,
      annualSavings: 155000,
      efficiencyGains: 45,
      riskReduction: 75,
    },
    features: {
      core: ["Managed PKI", "Certificate Provisioning", "WiFi Security", "Device Authentication"],
      advanced: ["Cloud RADIUS", "JoinNow", "Certificate Lifecycle Management"],
      integrations: ["Identity Providers", "MDM Solutions", "Cloud Platforms"],
    },
    support: {
      availability: "Business Hours",
      responseTime: "< 2 hours",
      satisfaction: 88,
    },
  },
  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    category: "niche",
    marketShare: 1.2,
    description: "Open-source NAC solution with high implementation and support costs",
    strengths: ["Open source flexibility", "No licensing costs", "Customizable features", "Community support"],
    weaknesses: [
      "Very high implementation costs",
      "Requires extensive expertise",
      "Limited commercial support",
      "Complex maintenance",
    ],
    pricing: {
      model: "enterprise",
      basePrice: 0,
      pricePerDevice: 0,
      volumeDiscounts: {},
      additionalCosts: {
        hardware: 95000,
        services: 150000,
        training: 35000,
        maintenance: 85000,
        support: 65000,
      },
      hiddenCosts: {
        total: 225000,
        breakdown: {
          "Implementation Complexity": 125000,
          "Ongoing Maintenance": 100000,
        },
      },
    },
    security: {
      securityRating: 70,
      cveCount: 12,
      zeroTrustMaturity: 55,
      complianceSupport: ["Custom Implementation Required"],
    },
    implementation: {
      deploymentDays: 180,
      complexityScore: 10,
      resourcesRequired: {
        internalFTE: 4,
        vendorFTE: 2,
        trainingHours: 200,
        ongoingFTE: 3.2,
      },
    },
    roi: {
      paybackMonths: 30,
      annualSavings: 115000,
      efficiencyGains: 30,
      riskReduction: 50,
    },
    features: {
      core: ["Open Source NAC", "Policy Management", "Device Registration", "Guest Access"],
      advanced: ["Customizable Features", "API Access", "Integration Flexibility"],
      integrations: ["Custom Development Required"],
    },
    support: {
      availability: "Community/Commercial",
      responseTime: "Variable",
      satisfaction: 65,
    },
  },
}
