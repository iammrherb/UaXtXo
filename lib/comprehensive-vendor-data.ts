export interface VendorData {
  id: string
  name: string
  category: "leader" | "challenger" | "niche" | "visionary" | "legacy"
  marketShare: number
  description: string
  strengths: string[]
  weaknesses: string[]
  pricing: {
    model: "per-device" | "per-user" | "subscription" | "perpetual" | "quote-based"
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
  security: {
    securityRating: number
    cveCount: number
    zeroTrustMaturity: number
    complianceSupport: string[]
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
    description: "Cloud-native Zero Trust NAC platform with industry-leading simplicity and security",
    strengths: [
      "Zero infrastructure requirements",
      "Fastest deployment (hours vs months)",
      "95% automation level",
      "Zero CVEs since inception",
      "Comprehensive single license",
      "Vendor agnostic platform",
    ],
    weaknesses: ["Newer market presence", "Limited legacy integrations", "Smaller partner ecosystem"],
    pricing: {
      model: "per-device",
      basePrice: 0,
      pricePerDevice: 60,
      volumeDiscounts: {
        1000: 10,
        5000: 20,
        10000: 30,
        25000: 40,
      },
      additionalCosts: {
        hardware: 0,
        services: 5000,
        training: 0,
        maintenance: 0,
        support: 0,
      },
      hiddenCosts: {
        total: 0,
        breakdown: {},
      },
    },
    implementation: {
      deploymentDays: 7,
      complexityScore: 2,
      resourcesRequired: {
        internalFTE: 0.1,
        vendorFTE: 0.2,
        trainingHours: 8,
        ongoingFTE: 0.05,
      },
    },
    security: {
      securityRating: 95,
      cveCount: 0,
      zeroTrustMaturity: 95,
      complianceSupport: ["SOC2", "HIPAA", "PCI-DSS", "GDPR", "FedRAMP", "ISO27001"],
    },
    roi: {
      paybackMonths: 3,
      annualSavings: 450000,
      efficiencyGains: 90,
      riskReduction: 92,
    },
    features: {
      core: ["Device Discovery", "Policy Enforcement", "Network Segmentation", "Guest Access"],
      advanced: ["Zero Trust", "AI/ML Analytics", "Threat Detection", "Compliance Automation"],
      integrations: ["Universal SIEM", "ITSM", "Identity Providers", "Cloud Platforms"],
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
    description: "Market-leading NAC solution with comprehensive policy management and deep Cisco integration",
    strengths: [
      "Market leader with proven track record",
      "Comprehensive feature set",
      "Deep Cisco ecosystem integration",
      "Extensive partner network",
      "Strong enterprise support",
    ],
    weaknesses: [
      "Complex deployment and management",
      "High total cost of ownership",
      "Requires specialized expertise",
      "Frequent security vulnerabilities",
      "Vendor lock-in concerns",
    ],
    pricing: {
      model: "per-device",
      basePrice: 50000,
      pricePerDevice: 125,
      volumeDiscounts: {
        1000: 5,
        5000: 15,
        10000: 25,
        25000: 35,
      },
      additionalCosts: {
        hardware: 195000,
        services: 175000,
        training: 25000,
        maintenance: 45000,
        support: 35000,
      },
      hiddenCosts: {
        total: 255000,
        breakdown: {
          "Network Redesign": 75000,
          "Downtime Costs": 100000,
          "Training & Certification": 40000,
          "Integration Rework": 40000,
        },
      },
    },
    implementation: {
      deploymentDays: 180,
      complexityScore: 9,
      resourcesRequired: {
        internalFTE: 2.5,
        vendorFTE: 1.5,
        trainingHours: 120,
        ongoingFTE: 1.8,
      },
    },
    security: {
      securityRating: 88,
      cveCount: 47,
      zeroTrustMaturity: 75,
      complianceSupport: ["SOC2", "HIPAA", "PCI-DSS", "GDPR", "FedRAMP", "ISO27001", "FISMA"],
    },
    roi: {
      paybackMonths: 24,
      annualSavings: 180000,
      efficiencyGains: 65,
      riskReduction: 78,
    },
    features: {
      core: ["Policy Management", "Device Profiling", "Guest Access", "BYOD Support"],
      advanced: ["TrustSec", "pxGrid", "Threat Containment", "Analytics"],
      integrations: ["Cisco Security", "Third-party SIEM", "Identity Providers", "Vulnerability Scanners"],
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
      "Multi-vendor support",
    ],
    weaknesses: [
      "Complex initial setup",
      "Limited cloud-native features",
      "Requires hardware investment",
      "Moderate learning curve",
    ],
    pricing: {
      model: "per-device",
      basePrice: 25000,
      pricePerDevice: 95,
      volumeDiscounts: {
        1000: 8,
        5000: 18,
        10000: 28,
        25000: 38,
      },
      additionalCosts: {
        hardware: 95000,
        services: 75000,
        training: 15000,
        maintenance: 25000,
        support: 20000,
      },
      hiddenCosts: {
        total: 125000,
        breakdown: {
          "Hardware Refresh": 50000,
          "Professional Services": 35000,
          Training: 25000,
          Downtime: 15000,
        },
      },
    },
    implementation: {
      deploymentDays: 90,
      complexityScore: 7,
      resourcesRequired: {
        internalFTE: 1.8,
        vendorFTE: 1.0,
        trainingHours: 80,
        ongoingFTE: 1.2,
      },
    },
    security: {
      securityRating: 85,
      cveCount: 23,
      zeroTrustMaturity: 70,
      complianceSupport: ["SOC2", "HIPAA", "PCI-DSS", "GDPR", "ISO27001"],
    },
    roi: {
      paybackMonths: 18,
      annualSavings: 220000,
      efficiencyGains: 75,
      riskReduction: 82,
    },
    features: {
      core: ["Policy Enforcement", "Device Profiling", "Guest Management", "BYOD"],
      advanced: ["OnGuard", "OnBoard", "Application Visibility", "Threat Detection"],
      integrations: ["Aruba Infrastructure", "Third-party Security", "Identity Systems", "SIEM"],
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
    description: "Device visibility and control platform with strong IoT and OT focus",
    strengths: [
      "Excellent device visibility",
      "Strong IoT/OT support",
      "Agentless architecture",
      "Comprehensive device intelligence",
      "Good threat detection",
    ],
    weaknesses: [
      "Complex licensing model",
      "High operational overhead",
      "Limited cloud-native features",
      "Expensive for large deployments",
    ],
    pricing: {
      model: "per-device",
      basePrice: 35000,
      pricePerDevice: 75,
      volumeDiscounts: {
        1000: 10,
        5000: 20,
        10000: 30,
        25000: 40,
      },
      additionalCosts: {
        hardware: 125000,
        services: 100000,
        training: 20000,
        maintenance: 35000,
        support: 25000,
      },
      hiddenCosts: {
        total: 180000,
        breakdown: {
          "Module Licensing": 80000,
          "Professional Services": 60000,
          Training: 25000,
          "Hardware Refresh": 15000,
        },
      },
    },
    implementation: {
      deploymentDays: 120,
      complexityScore: 8,
      resourcesRequired: {
        internalFTE: 2.0,
        vendorFTE: 1.2,
        trainingHours: 100,
        ongoingFTE: 1.5,
      },
    },
    security: {
      securityRating: 82,
      cveCount: 18,
      zeroTrustMaturity: 68,
      complianceSupport: ["SOC2", "HIPAA", "PCI-DSS", "GDPR", "ISO27001", "NERC-CIP"],
    },
    roi: {
      paybackMonths: 20,
      annualSavings: 195000,
      efficiencyGains: 70,
      riskReduction: 85,
    },
    features: {
      core: ["Device Discovery", "Asset Inventory", "Policy Enforcement", "Threat Detection"],
      advanced: ["IoT Security", "OT Visibility", "Threat Hunting", "Compliance Monitoring"],
      integrations: ["Security Orchestration", "SIEM", "Vulnerability Management", "ITSM"],
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
      "Strong wireless integration",
      "Good automation capabilities",
      "Modern user experience",
    ],
    weaknesses: [
      "Requires Mist ecosystem",
      "Limited third-party integrations",
      "Newer to market",
      "Higher cloud dependency",
    ],
    pricing: {
      model: "subscription",
      basePrice: 15000,
      pricePerDevice: 72,
      volumeDiscounts: {
        1000: 12,
        5000: 22,
        10000: 32,
        25000: 42,
      },
      additionalCosts: {
        hardware: 0,
        services: 40000,
        training: 10000,
        maintenance: 0,
        support: 15000,
      },
      hiddenCosts: {
        total: 85000,
        breakdown: {
          "Mist Infrastructure": 60000,
          "Migration Services": 15000,
          Training: 10000,
        },
      },
    },
    implementation: {
      deploymentDays: 60,
      complexityScore: 5,
      resourcesRequired: {
        internalFTE: 1.2,
        vendorFTE: 0.8,
        trainingHours: 60,
        ongoingFTE: 0.8,
      },
    },
    security: {
      securityRating: 83,
      cveCount: 8,
      zeroTrustMaturity: 78,
      complianceSupport: ["SOC2", "HIPAA", "PCI-DSS", "GDPR", "ISO27001"],
    },
    roi: {
      paybackMonths: 15,
      annualSavings: 280000,
      efficiencyGains: 78,
      riskReduction: 80,
    },
    features: {
      core: ["AI-driven Policy", "Device Profiling", "Dynamic Segmentation", "Guest Access"],
      advanced: ["Marvis AI", "Anomaly Detection", "Automated Remediation", "Cloud Analytics"],
      integrations: ["Mist Platform", "Third-party Security", "Identity Providers", "Cloud Services"],
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
    description: "Flexible NAC solution with strong multi-vendor support and deployment options",
    strengths: [
      "Flexible deployment options",
      "Good multi-vendor support",
      "Competitive pricing",
      "Strong customer support",
      "Easy management interface",
    ],
    weaknesses: [
      "Limited advanced features",
      "Smaller market presence",
      "Basic analytics capabilities",
      "Limited cloud features",
    ],
    pricing: {
      model: "per-device",
      basePrice: 20000,
      pricePerDevice: 65,
      volumeDiscounts: {
        1000: 15,
        5000: 25,
        10000: 35,
        25000: 45,
      },
      additionalCosts: {
        hardware: 100000,
        services: 60000,
        training: 12000,
        maintenance: 20000,
        support: 18000,
      },
      hiddenCosts: {
        total: 95000,
        breakdown: {
          "Hardware Refresh": 40000,
          "Professional Services": 30000,
          Training: 15000,
          Maintenance: 10000,
        },
      },
    },
    implementation: {
      deploymentDays: 75,
      complexityScore: 6,
      resourcesRequired: {
        internalFTE: 1.5,
        vendorFTE: 0.8,
        trainingHours: 70,
        ongoingFTE: 1.0,
      },
    },
    security: {
      securityRating: 78,
      cveCount: 12,
      zeroTrustMaturity: 65,
      complianceSupport: ["SOC2", "HIPAA", "PCI-DSS", "GDPR", "ISO27001"],
    },
    roi: {
      paybackMonths: 16,
      annualSavings: 210000,
      efficiencyGains: 72,
      riskReduction: 75,
    },
    features: {
      core: ["Policy Management", "Device Profiling", "Guest Access", "BYOD Support"],
      advanced: ["Threat Detection", "Compliance Reporting", "API Integration", "Multi-tenancy"],
      integrations: ["Multi-vendor Infrastructure", "SIEM", "Identity Systems", "Cloud Platforms"],
    },
    support: {
      availability: "24/7/365",
      responseTime: "< 4 hours",
      satisfaction: 86,
    },
  },
  fortinet: {
    id: "fortinet",
    name: "Fortinet FortiNAC",
    category: "niche",
    marketShare: 8.1,
    description: "Integrated NAC solution with strong firewall integration and security fabric",
    strengths: [
      "Strong security fabric integration",
      "Good firewall integration",
      "Comprehensive threat protection",
      "Competitive pricing",
      "Single-vendor security stack",
    ],
    weaknesses: [
      "Requires Fortinet ecosystem",
      "Complex multi-vendor environments",
      "Limited cloud-native features",
      "Moderate scalability",
    ],
    pricing: {
      model: "per-device",
      basePrice: 18000,
      pricePerDevice: 58,
      volumeDiscounts: {
        1000: 12,
        5000: 22,
        10000: 32,
        25000: 42,
      },
      additionalCosts: {
        hardware: 85000,
        services: 55000,
        training: 15000,
        maintenance: 22000,
        support: 20000,
      },
      hiddenCosts: {
        total: 110000,
        breakdown: {
          "FortiGate Requirements": 60000,
          "Professional Services": 25000,
          Training: 15000,
          Integration: 10000,
        },
      },
    },
    implementation: {
      deploymentDays: 85,
      complexityScore: 7,
      resourcesRequired: {
        internalFTE: 1.6,
        vendorFTE: 1.0,
        trainingHours: 85,
        ongoingFTE: 1.1,
      },
    },
    security: {
      securityRating: 82,
      cveCount: 15,
      zeroTrustMaturity: 72,
      complianceSupport: ["SOC2", "HIPAA", "PCI-DSS", "GDPR", "ISO27001"],
    },
    roi: {
      paybackMonths: 17,
      annualSavings: 240000,
      efficiencyGains: 70,
      riskReduction: 78,
    },
    features: {
      core: ["Device Control", "Policy Enforcement", "Guest Management", "BYOD"],
      advanced: ["Security Fabric", "Threat Intelligence", "Automated Response", "Compliance"],
      integrations: ["Fortinet Security Fabric", "Third-party SIEM", "Identity Providers", "Vulnerability Scanners"],
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
    description: "Cloud-first NAC solution with strong network integration and automation",
    strengths: [
      "Cloud-first architecture",
      "Strong network integration",
      "Good automation capabilities",
      "Modern API-first design",
      "Scalable cloud platform",
    ],
    weaknesses: [
      "Requires Arista switches",
      "Limited market presence",
      "Newer solution",
      "Limited third-party integrations",
    ],
    pricing: {
      model: "subscription",
      basePrice: 12000,
      pricePerDevice: 48,
      volumeDiscounts: {
        1000: 15,
        5000: 25,
        10000: 35,
        25000: 45,
      },
      additionalCosts: {
        hardware: 0,
        services: 35000,
        training: 8000,
        maintenance: 0,
        support: 12000,
      },
      hiddenCosts: {
        total: 120000,
        breakdown: {
          "Arista Switch Requirements": 100000,
          "Migration Services": 15000,
          Training: 5000,
        },
      },
    },
    implementation: {
      deploymentDays: 45,
      complexityScore: 4,
      resourcesRequired: {
        internalFTE: 1.0,
        vendorFTE: 0.6,
        trainingHours: 50,
        ongoingFTE: 0.7,
      },
    },
    security: {
      securityRating: 80,
      cveCount: 6,
      zeroTrustMaturity: 75,
      complianceSupport: ["SOC2", "HIPAA", "PCI-DSS", "GDPR", "ISO27001"],
    },
    roi: {
      paybackMonths: 14,
      annualSavings: 260000,
      efficiencyGains: 75,
      riskReduction: 77,
    },
    features: {
      core: ["Cloud Management", "Policy Automation", "Device Profiling", "Network Segmentation"],
      advanced: ["AI-driven Analytics", "Automated Remediation", "Cloud Integration", "API Management"],
      integrations: ["Arista EOS", "Cloud Platforms", "Identity Providers", "Security Tools"],
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
    strengths: [
      "Simple cloud management",
      "Easy deployment",
      "Good wireless integration",
      "Intuitive dashboard",
      "Reliable cloud platform",
    ],
    weaknesses: [
      "Requires Meraki infrastructure",
      "Limited advanced features",
      "High ongoing costs",
      "Basic policy capabilities",
    ],
    pricing: {
      model: "subscription",
      basePrice: 0,
      pricePerDevice: 108,
      volumeDiscounts: {
        1000: 8,
        5000: 18,
        10000: 28,
        25000: 38,
      },
      additionalCosts: {
        hardware: 0,
        services: 30000,
        training: 5000,
        maintenance: 0,
        support: 15000,
      },
      hiddenCosts: {
        total: 180000,
        breakdown: {
          "Meraki Infrastructure": 150000,
          Migration: 20000,
          Training: 10000,
        },
      },
    },
    implementation: {
      deploymentDays: 30,
      complexityScore: 3,
      resourcesRequired: {
        internalFTE: 0.8,
        vendorFTE: 0.4,
        trainingHours: 40,
        ongoingFTE: 0.6,
      },
    },
    security: {
      securityRating: 75,
      cveCount: 10,
      zeroTrustMaturity: 60,
      complianceSupport: ["SOC2", "HIPAA", "PCI-DSS", "GDPR"],
    },
    roi: {
      paybackMonths: 19,
      annualSavings: 180000,
      efficiencyGains: 68,
      riskReduction: 70,
    },
    features: {
      core: ["Cloud Management", "Guest Access", "Device Profiling", "Policy Enforcement"],
      advanced: ["Location Analytics", "API Integration", "Mobile Device Management", "Compliance Reporting"],
      integrations: ["Meraki Platform", "Identity Providers", "SIEM", "Cloud Services"],
    },
    support: {
      availability: "24/7/365",
      responseTime: "< 4 hours",
      satisfaction: 83,
    },
  },
  ivanti: {
    id: "ivanti",
    name: "Ivanti Neurons (Pulse Secure)",
    category: "legacy",
    marketShare: 3.8,
    description: "⚠️ CRITICAL SECURITY RISK - Active nation-state exploitation. Immediate migration required.",
    strengths: ["Established market presence", "VPN integration", "Remote access capabilities"],
    weaknesses: [
      "⚠️ CRITICAL: Active exploitation by nation-state actors",
      "Multiple zero-day vulnerabilities",
      "End-of-life product line",
      "No security updates",
      "Immediate migration required",
    ],
    pricing: {
      model: "quote-based",
      basePrice: 45000,
      pricePerDevice: 95,
      volumeDiscounts: {
        1000: 5,
        5000: 15,
        10000: 25,
        25000: 35,
      },
      additionalCosts: {
        hardware: 150000,
        services: 120000,
        training: 25000,
        maintenance: 40000,
        support: 30000,
      },
      hiddenCosts: {
        total: 500000,
        breakdown: {
          "Security Breach Risk": 300000,
          "Emergency Migration": 100000,
          "Compliance Violations": 75000,
          "Reputation Damage": 25000,
        },
      },
    },
    implementation: {
      deploymentDays: 150,
      complexityScore: 10,
      resourcesRequired: {
        internalFTE: 3.0,
        vendorFTE: 2.0,
        trainingHours: 150,
        ongoingFTE: 2.5,
      },
    },
    security: {
      securityRating: 25,
      cveCount: 89,
      zeroTrustMaturity: 30,
      complianceSupport: ["Limited compliance support due to security issues"],
    },
    roi: {
      paybackMonths: 999,
      annualSavings: -200000,
      efficiencyGains: 35,
      riskReduction: -50,
    },
    features: {
      core: ["VPN Access", "Basic NAC", "Remote Access", "Legacy Support"],
      advanced: ["⚠️ Advanced features compromised by security vulnerabilities"],
      integrations: ["Limited due to security concerns"],
    },
    support: {
      availability: "Limited",
      responseTime: "> 24 hours",
      satisfaction: 45,
    },
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft Network Policy Server (NPS)",
    category: "legacy",
    marketShare: 15.2,
    description: "Basic RADIUS server included with Windows Server - limited NAC capabilities",
    strengths: [
      "Included with Windows Server",
      "No additional licensing cost",
      "Active Directory integration",
      "Simple RADIUS functionality",
    ],
    weaknesses: [
      "Very basic NAC capabilities",
      "No device profiling",
      "Limited policy options",
      "No advanced security features",
      "Requires significant custom development",
    ],
    pricing: {
      model: "perpetual",
      basePrice: 0,
      pricePerDevice: 0,
      volumeDiscounts: {},
      additionalCosts: {
        hardware: 25000,
        services: 85000,
        training: 15000,
        maintenance: 20000,
        support: 25000,
      },
      hiddenCosts: {
        total: 200000,
        breakdown: {
          "Custom Development": 120000,
          "Integration Work": 50000,
          "Ongoing Maintenance": 30000,
        },
      },
    },
    implementation: {
      deploymentDays: 120,
      complexityScore: 8,
      resourcesRequired: {
        internalFTE: 2.5,
        vendorFTE: 0.5,
        trainingHours: 80,
        ongoingFTE: 2.0,
      },
    },
    security: {
      securityRating: 55,
      cveCount: 25,
      zeroTrustMaturity: 25,
      complianceSupport: ["Basic Windows compliance only"],
    },
    roi: {
      paybackMonths: 36,
      annualSavings: 50000,
      efficiencyGains: 30,
      riskReduction: 40,
    },
    features: {
      core: ["Basic RADIUS", "AD Integration", "Certificate Services", "Basic Policies"],
      advanced: ["Limited advanced features"],
      integrations: ["Windows Ecosystem", "Active Directory", "Basic SIEM"],
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
    strengths: [
      "Simple cloud deployment",
      "Good for small businesses",
      "Competitive pricing",
      "Easy setup",
      "Good customer support",
    ],
    weaknesses: [
      "Limited enterprise features",
      "Basic policy capabilities",
      "No advanced security features",
      "Limited integrations",
      "Scalability concerns",
    ],
    pricing: {
      model: "per-user",
      basePrice: 1000,
      pricePerDevice: 36,
      volumeDiscounts: {
        1000: 10,
        5000: 20,
        10000: 30,
        25000: 40,
      },
      additionalCosts: {
        hardware: 0,
        services: 8000,
        training: 2000,
        maintenance: 0,
        support: 5000,
      },
      hiddenCosts: {
        total: 25000,
        breakdown: {
          "Feature Limitations": 15000,
          "Integration Work": 8000,
          Migration: 2000,
        },
      },
    },
    implementation: {
      deploymentDays: 14,
      complexityScore: 2,
      resourcesRequired: {
        internalFTE: 0.3,
        vendorFTE: 0.2,
        trainingHours: 20,
        ongoingFTE: 0.2,
      },
    },
    security: {
      securityRating: 68,
      cveCount: 3,
      zeroTrustMaturity: 45,
      complianceSupport: ["SOC2", "Basic compliance"],
    },
    roi: {
      paybackMonths: 8,
      annualSavings: 120000,
      efficiencyGains: 60,
      riskReduction: 55,
    },
    features: {
      core: ["Cloud RADIUS", "Basic Policies", "User Management", "Guest Access"],
      advanced: ["API Access", "Basic Reporting", "Multi-tenancy"],
      integrations: ["Identity Providers", "Basic SIEM", "Cloud Services"],
    },
    support: {
      availability: "Business Hours",
      responseTime: "< 8 hours",
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
      "Managed service model",
      "Strong wireless security",
    ],
    weaknesses: [
      "Very expensive",
      "Limited NAC features",
      "Narrow use cases",
      "Complex certificate management",
      "Limited enterprise adoption",
    ],
    pricing: {
      model: "per-device",
      basePrice: 15000,
      pricePerDevice: 120,
      volumeDiscounts: {
        1000: 5,
        5000: 15,
        10000: 25,
        25000: 35,
      },
      additionalCosts: {
        hardware: 0,
        services: 45000,
        training: 18000,
        maintenance: 25000,
        support: 20000,
      },
      hiddenCosts: {
        total: 95000,
        breakdown: {
          "PKI Management": 50000,
          "Certificate Lifecycle": 25000,
          Training: 20000,
        },
      },
    },
    implementation: {
      deploymentDays: 60,
      complexityScore: 7,
      resourcesRequired: {
        internalFTE: 1.5,
        vendorFTE: 1.0,
        trainingHours: 100,
        ongoingFTE: 1.2,
      },
    },
    security: {
      securityRating: 85,
      cveCount: 2,
      zeroTrustMaturity: 70,
      complianceSupport: ["SOC2", "HIPAA", "PCI-DSS", "GDPR", "FERPA"],
    },
    roi: {
      paybackMonths: 22,
      annualSavings: 150000,
      efficiencyGains: 65,
      riskReduction: 80,
    },
    features: {
      core: ["PKI Management", "Certificate Authentication", "Wireless Security", "Device Certificates"],
      advanced: ["Managed PKI", "Certificate Lifecycle", "SCEP/EST", "Cloud PKI"],
      integrations: ["Identity Providers", "Wireless Controllers", "MDM Systems", "Cloud Services"],
    },
    support: {
      availability: "24/7/365",
      responseTime: "< 4 hours",
      satisfaction: 82,
    },
  },
  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    category: "legacy",
    marketShare: 1.2,
    description: "Open-source NAC solution with high total cost of ownership despite free licensing",
    strengths: [
      "Open source (free licensing)",
      "Customizable",
      "Active community",
      "No vendor lock-in",
      "Full source code access",
    ],
    weaknesses: [
      "High implementation costs",
      "Requires specialized expertise",
      "Limited commercial support",
      "Complex deployment",
      "High ongoing maintenance",
    ],
    pricing: {
      model: "perpetual",
      basePrice: 0,
      pricePerDevice: 0,
      volumeDiscounts: {},
      additionalCosts: {
        hardware: 75000,
        services: 150000,
        training: 35000,
        maintenance: 60000,
        support: 45000,
      },
      hiddenCosts: {
        total: 250000,
        breakdown: {
          "Custom Development": 120000,
          "Specialized Consulting": 80000,
          "Ongoing Maintenance": 50000,
        },
      },
    },
    implementation: {
      deploymentDays: 180,
      complexityScore: 9,
      resourcesRequired: {
        internalFTE: 3.0,
        vendorFTE: 2.0,
        trainingHours: 200,
        ongoingFTE: 2.5,
      },
    },
    security: {
      securityRating: 70,
      cveCount: 35,
      zeroTrustMaturity: 50,
      complianceSupport: ["Custom compliance implementation required"],
    },
    roi: {
      paybackMonths: 48,
      annualSavings: 80000,
      efficiencyGains: 45,
      riskReduction: 60,
    },
    features: {
      core: ["Open Source NAC", "Policy Management", "Device Registration", "Guest Portal"],
      advanced: ["Custom Development Required", "API Access", "Reporting"],
      integrations: ["Custom integrations required", "Open APIs", "Third-party tools"],
    },
    support: {
      availability: "Community/Commercial",
      responseTime: "Variable",
      satisfaction: 60,
    },
  },
}
