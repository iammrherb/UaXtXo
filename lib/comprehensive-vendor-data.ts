export interface VendorFeature {
  name: string
  category: "core" | "security" | "management" | "integration" | "analytics"
  score: number
  description?: string
}

export interface VendorImplementation {
  deploymentTime: {
    pilot: string
    production: string
  }
  complexity: "low" | "medium" | "high"
  requirements: string[]
}

export interface VendorSupport {
  levels: string[]
  sla: string
  training: boolean
  documentation: "excellent" | "good" | "fair" | "poor"
}

export interface VendorData {
  name: string
  category: "enterprise" | "cloud" | "traditional"
  description: string
  strengths: string[]
  weaknesses: string[]
  features: VendorFeature[]
  implementation: VendorImplementation
  support: VendorSupport
  marketPosition: "leader" | "challenger" | "niche" | "visionary"
  lastUpdated: string
}

export const ComprehensiveVendorDatabase: Record<string, VendorData> = {
  portnox: {
    name: "Portnox",
    category: "cloud",
    description: "Cloud-native NAC platform with AI-powered security and zero-trust architecture",
    strengths: [
      "Cloud-native architecture",
      "AI-powered threat detection",
      "Rapid deployment",
      "Intuitive management",
      "Cost-effective pricing",
      "Zero-trust security model",
    ],
    weaknesses: ["Newer market presence", "Limited legacy integrations"],
    features: [
      // Core NAC Features
      { name: "Device Discovery", category: "core", score: 95 },
      { name: "Authentication", category: "core", score: 92 },
      { name: "Authorization", category: "core", score: 90 },
      { name: "Policy Enforcement", category: "core", score: 94 },
      { name: "Guest Access", category: "core", score: 88 },

      // Security Features
      { name: "Threat Detection", category: "security", score: 96 },
      { name: "Behavioral Analysis", category: "security", score: 94 },
      { name: "IoT Security", category: "security", score: 92 },
      { name: "Endpoint Compliance", category: "security", score: 90 },
      { name: "Risk Assessment", category: "security", score: 93 },

      // Management Features
      { name: "Centralized Management", category: "management", score: 95 },
      { name: "Reporting & Analytics", category: "management", score: 91 },
      { name: "Policy Templates", category: "management", score: 89 },
      { name: "Workflow Automation", category: "management", score: 92 },
      { name: "Multi-tenancy", category: "management", score: 88 },

      // Integration Features
      { name: "SIEM Integration", category: "integration", score: 90 },
      { name: "Active Directory", category: "integration", score: 94 },
      { name: "Cloud Platforms", category: "integration", score: 96 },
      { name: "Network Infrastructure", category: "integration", score: 88 },
      { name: "Security Tools", category: "integration", score: 91 },

      // Analytics Features
      { name: "Real-time Monitoring", category: "analytics", score: 94 },
      { name: "Compliance Reporting", category: "analytics", score: 92 },
      { name: "Custom Dashboards", category: "analytics", score: 89 },
      { name: "Predictive Analytics", category: "analytics", score: 87 },
      { name: "Forensic Analysis", category: "analytics", score: 85 },
    ],
    implementation: {
      deploymentTime: {
        pilot: "2-4 weeks",
        production: "6-12 weeks",
      },
      complexity: "low",
      requirements: ["Cloud connectivity", "Network infrastructure access", "Identity provider integration"],
    },
    support: {
      levels: ["Standard", "Premium", "Enterprise"],
      sla: "99.9% uptime",
      training: true,
      documentation: "excellent",
    },
    marketPosition: "visionary",
    lastUpdated: "2024-01-15",
  },

  cisco: {
    name: "Cisco ISE",
    category: "enterprise",
    description: "Comprehensive identity and access management platform for enterprise networks",
    strengths: [
      "Market leader",
      "Comprehensive feature set",
      "Strong ecosystem",
      "Enterprise scalability",
      "Extensive integrations",
    ],
    weaknesses: ["High complexity", "Expensive licensing", "Long deployment times", "Steep learning curve"],
    features: [
      // Core NAC Features
      { name: "Device Discovery", category: "core", score: 90 },
      { name: "Authentication", category: "core", score: 95 },
      { name: "Authorization", category: "core", score: 93 },
      { name: "Policy Enforcement", category: "core", score: 91 },
      { name: "Guest Access", category: "core", score: 85 },

      // Security Features
      { name: "Threat Detection", category: "security", score: 85 },
      { name: "Behavioral Analysis", category: "security", score: 80 },
      { name: "IoT Security", category: "security", score: 82 },
      { name: "Endpoint Compliance", category: "security", score: 88 },
      { name: "Risk Assessment", category: "security", score: 83 },

      // Management Features
      { name: "Centralized Management", category: "management", score: 88 },
      { name: "Reporting & Analytics", category: "management", score: 86 },
      { name: "Policy Templates", category: "management", score: 84 },
      { name: "Workflow Automation", category: "management", score: 82 },
      { name: "Multi-tenancy", category: "management", score: 85 },

      // Integration Features
      { name: "SIEM Integration", category: "integration", score: 92 },
      { name: "Active Directory", category: "integration", score: 95 },
      { name: "Cloud Platforms", category: "integration", score: 80 },
      { name: "Network Infrastructure", category: "integration", score: 95 },
      { name: "Security Tools", category: "integration", score: 90 },

      // Analytics Features
      { name: "Real-time Monitoring", category: "analytics", score: 85 },
      { name: "Compliance Reporting", category: "analytics", score: 88 },
      { name: "Custom Dashboards", category: "analytics", score: 82 },
      { name: "Predictive Analytics", category: "analytics", score: 75 },
      { name: "Forensic Analysis", category: "analytics", score: 80 },
    ],
    implementation: {
      deploymentTime: {
        pilot: "8-12 weeks",
        production: "6-12 months",
      },
      complexity: "high",
      requirements: [
        "Dedicated hardware/VMs",
        "Network infrastructure changes",
        "Extensive planning and design",
        "Professional services",
      ],
    },
    support: {
      levels: ["Basic", "Enhanced", "Premium"],
      sla: "99.5% uptime",
      training: true,
      documentation: "good",
    },
    marketPosition: "leader",
    lastUpdated: "2024-01-15",
  },

  aruba: {
    name: "Aruba ClearPass",
    category: "enterprise",
    description: "Policy management platform providing device onboarding and access control",
    strengths: [
      "Strong policy engine",
      "Good wireless integration",
      "Flexible deployment options",
      "Competitive pricing",
    ],
    weaknesses: ["Limited cloud capabilities", "Complex configuration", "Weaker IoT support"],
    features: [
      // Core NAC Features
      { name: "Device Discovery", category: "core", score: 85 },
      { name: "Authentication", category: "core", score: 88 },
      { name: "Authorization", category: "core", score: 90 },
      { name: "Policy Enforcement", category: "core", score: 87 },
      { name: "Guest Access", category: "core", score: 82 },

      // Security Features
      { name: "Threat Detection", category: "security", score: 78 },
      { name: "Behavioral Analysis", category: "security", score: 75 },
      { name: "IoT Security", category: "security", score: 70 },
      { name: "Endpoint Compliance", category: "security", score: 83 },
      { name: "Risk Assessment", category: "security", score: 76 },

      // Management Features
      { name: "Centralized Management", category: "management", score: 84 },
      { name: "Reporting & Analytics", category: "management", score: 80 },
      { name: "Policy Templates", category: "management", score: 86 },
      { name: "Workflow Automation", category: "management", score: 78 },
      { name: "Multi-tenancy", category: "management", score: 75 },

      // Integration Features
      { name: "SIEM Integration", category: "integration", score: 82 },
      { name: "Active Directory", category: "integration", score: 90 },
      { name: "Cloud Platforms", category: "integration", score: 70 },
      { name: "Network Infrastructure", category: "integration", score: 88 },
      { name: "Security Tools", category: "integration", score: 80 },

      // Analytics Features
      { name: "Real-time Monitoring", category: "analytics", score: 80 },
      { name: "Compliance Reporting", category: "analytics", score: 82 },
      { name: "Custom Dashboards", category: "analytics", score: 78 },
      { name: "Predictive Analytics", category: "analytics", score: 65 },
      { name: "Forensic Analysis", category: "analytics", score: 72 },
    ],
    implementation: {
      deploymentTime: {
        pilot: "6-8 weeks",
        production: "4-8 months",
      },
      complexity: "medium",
      requirements: ["Hardware appliances or VMs", "Network configuration", "Policy design and testing"],
    },
    support: {
      levels: ["Foundation", "Enhanced", "Expert"],
      sla: "99.0% uptime",
      training: true,
      documentation: "good",
    },
    marketPosition: "challenger",
    lastUpdated: "2024-01-15",
  },

  meraki: {
    name: "Cisco Meraki",
    category: "cloud",
    description: "Cloud-managed networking with integrated security and access control",
    strengths: ["Cloud management", "Easy deployment", "Integrated networking", "Simple licensing"],
    weaknesses: ["Limited enterprise features", "Vendor lock-in", "Basic policy engine", "Higher ongoing costs"],
    features: [
      // Core NAC Features
      { name: "Device Discovery", category: "core", score: 80 },
      { name: "Authentication", category: "core", score: 82 },
      { name: "Authorization", category: "core", score: 78 },
      { name: "Policy Enforcement", category: "core", score: 75 },
      { name: "Guest Access", category: "core", score: 85 },

      // Security Features
      { name: "Threat Detection", category: "security", score: 72 },
      { name: "Behavioral Analysis", category: "security", score: 68 },
      { name: "IoT Security", category: "security", score: 74 },
      { name: "Endpoint Compliance", category: "security", score: 70 },
      { name: "Risk Assessment", category: "security", score: 69 },

      // Management Features
      { name: "Centralized Management", category: "management", score: 90 },
      { name: "Reporting & Analytics", category: "management", score: 85 },
      { name: "Policy Templates", category: "management", score: 75 },
      { name: "Workflow Automation", category: "management", score: 70 },
      { name: "Multi-tenancy", category: "management", score: 80 },

      // Integration Features
      { name: "SIEM Integration", category: "integration", score: 70 },
      { name: "Active Directory", category: "integration", score: 85 },
      { name: "Cloud Platforms", category: "integration", score: 88 },
      { name: "Network Infrastructure", category: "integration", score: 92 },
      { name: "Security Tools", category: "integration", score: 72 },

      // Analytics Features
      { name: "Real-time Monitoring", category: "analytics", score: 88 },
      { name: "Compliance Reporting", category: "analytics", score: 75 },
      { name: "Custom Dashboards", category: "analytics", score: 85 },
      { name: "Predictive Analytics", category: "analytics", score: 60 },
      { name: "Forensic Analysis", category: "analytics", score: 65 },
    ],
    implementation: {
      deploymentTime: {
        pilot: "1-2 weeks",
        production: "4-8 weeks",
      },
      complexity: "low",
      requirements: ["Meraki networking equipment", "Cloud connectivity", "Basic configuration"],
    },
    support: {
      levels: ["Standard", "Advanced"],
      sla: "99.9% uptime",
      training: true,
      documentation: "good",
    },
    marketPosition: "niche",
    lastUpdated: "2024-01-15",
  },

  forescout: {
    name: "Forescout",
    category: "enterprise",
    description: "Device visibility and control platform with strong IoT and OT security focus",
    strengths: [
      "Excellent device visibility",
      "Strong IoT/OT support",
      "Agentless operation",
      "Comprehensive integrations",
    ],
    weaknesses: ["Complex deployment", "High cost", "Steep learning curve", "Limited cloud options"],
    features: [
      // Core NAC Features
      { name: "Device Discovery", category: "core", score: 95 },
      { name: "Authentication", category: "core", score: 85 },
      { name: "Authorization", category: "core", score: 88 },
      { name: "Policy Enforcement", category: "core", score: 90 },
      { name: "Guest Access", category: "core", score: 75 },

      // Security Features
      { name: "Threat Detection", category: "security", score: 88 },
      { name: "Behavioral Analysis", category: "security", score: 85 },
      { name: "IoT Security", category: "security", score: 95 },
      { name: "Endpoint Compliance", category: "security", score: 92 },
      { name: "Risk Assessment", category: "security", score: 90 },

      // Management Features
      { name: "Centralized Management", category: "management", score: 85 },
      { name: "Reporting & Analytics", category: "management", score: 88 },
      { name: "Policy Templates", category: "management", score: 82 },
      { name: "Workflow Automation", category: "management", score: 86 },
      { name: "Multi-tenancy", category: "management", score: 78 },

      // Integration Features
      { name: "SIEM Integration", category: "integration", score: 95 },
      { name: "Active Directory", category: "integration", score: 88 },
      { name: "Cloud Platforms", category: "integration", score: 75 },
      { name: "Network Infrastructure", category: "integration", score: 90 },
      { name: "Security Tools", category: "integration", score: 95 },

      // Analytics Features
      { name: "Real-time Monitoring", category: "analytics", score: 92 },
      { name: "Compliance Reporting", category: "analytics", score: 90 },
      { name: "Custom Dashboards", category: "analytics", score: 85 },
      { name: "Predictive Analytics", category: "analytics", score: 80 },
      { name: "Forensic Analysis", category: "analytics", score: 88 },
    ],
    implementation: {
      deploymentTime: {
        pilot: "6-10 weeks",
        production: "4-10 months",
      },
      complexity: "high",
      requirements: [
        "Dedicated appliances",
        "Network access and configuration",
        "Integration planning",
        "Professional services",
      ],
    },
    support: {
      levels: ["Standard", "Premium", "Elite"],
      sla: "99.5% uptime",
      training: true,
      documentation: "good",
    },
    marketPosition: "challenger",
    lastUpdated: "2024-01-15",
  },
}

export const getVendorLogoPath = (vendorId: string): string => {
  return ComprehensiveVendorDatabase[vendorId]?.logoPath || "/placeholder.svg"
}

export const getVendorsByCategory = (category: string): VendorData[] => {
  return Object.values(ComprehensiveVendorDatabase).filter((vendor) => vendor.category === category)
}

export const getVendorsByMarketPosition = (position: string): VendorData[] => {
  return Object.values(ComprehensiveVendorDatabase).filter((vendor) => vendor.marketPosition === position)
}

export const searchVendors = (query: string): VendorData[] => {
  const lowercaseQuery = query.toLowerCase()
  return Object.values(ComprehensiveVendorDatabase).filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(lowercaseQuery) ||
      vendor.description.toLowerCase().includes(lowercaseQuery) ||
      vendor.strengths.some((strength) => strength.toLowerCase().includes(lowercaseQuery)) ||
      vendor.idealFor.some((ideal) => ideal.toLowerCase().includes(lowercaseQuery)),
  )
}

// Compliance frameworks data
export const complianceFrameworksData = {
  sox: {
    name: "Sarbanes-Oxley (SOX)",
    description: "Financial reporting and internal controls",
    industry: "Financial Services",
    requirements: ["Access controls", "Audit trails", "Data integrity"],
  },
  hipaa: {
    name: "HIPAA",
    description: "Healthcare information privacy and security",
    industry: "Healthcare",
    requirements: ["Access controls", "Audit logs", "Encryption", "Risk assessments"],
  },
  "pci-dss": {
    name: "PCI-DSS",
    description: "Payment card industry data security",
    industry: "Retail/Finance",
    requirements: ["Network segmentation", "Access controls", "Monitoring", "Encryption"],
  },
  gdpr: {
    name: "GDPR",
    description: "General Data Protection Regulation",
    industry: "All (EU)",
    requirements: ["Data protection", "Privacy controls", "Breach notification", "Consent management"],
  },
  "iso-27001": {
    name: "ISO 27001",
    description: "Information security management systems",
    industry: "All",
    requirements: ["Risk management", "Security controls", "Continuous monitoring", "Documentation"],
  },
  nist: {
    name: "NIST Cybersecurity Framework",
    description: "Cybersecurity risk management framework",
    industry: "All",
    requirements: ["Identify", "Protect", "Detect", "Respond", "Recover"],
  },
  fedramp: {
    name: "FedRAMP",
    description: "Federal risk and authorization management program",
    industry: "Government",
    requirements: ["Security controls", "Continuous monitoring", "Incident response", "Documentation"],
  },
  "nerc-cip": {
    name: "NERC CIP",
    description: "Critical infrastructure protection for utilities",
    industry: "Energy/Utilities",
    requirements: ["Asset identification", "Security controls", "Personnel training", "Incident reporting"],
  },
}

// Industry security metrics
export const industrySecurityMetricsData = {
  healthcare: {
    averageBreachCost: 10930000,
    breachProbability: 0.29,
    complianceRequirements: ["HIPAA", "HITECH", "FDA"],
    criticalAssets: ["Patient records", "Medical devices", "Research data"],
  },
  financial: {
    averageBreachCost: 5720000,
    breachProbability: 0.19,
    complianceRequirements: ["SOX", "PCI-DSS", "GLBA", "FFIEC"],
    criticalAssets: ["Customer data", "Transaction records", "Trading systems"],
  },
  government: {
    averageBreachCost: 4740000,
    breachProbability: 0.15,
    complianceRequirements: ["FedRAMP", "FISMA", "NIST", "CJIS"],
    criticalAssets: ["Citizen data", "Government systems", "Classified information"],
  },
  technology: {
    averageBreachCost: 4880000,
    breachProbability: 0.22,
    complianceRequirements: ["SOC 2", "ISO 27001", "GDPR"],
    criticalAssets: ["Source code", "Customer data", "Intellectual property"],
  },
  education: {
    averageBreachCost: 3790000,
    breachProbability: 0.26,
    complianceRequirements: ["FERPA", "COPPA", "GDPR"],
    criticalAssets: ["Student records", "Research data", "Financial information"],
  },
  manufacturing: {
    averageBreachCost: 4470000,
    breachProbability: 0.18,
    complianceRequirements: ["ISO 27001", "NIST", "IEC 62443"],
    criticalAssets: ["Production systems", "Design data", "Supply chain information"],
  },
  retail: {
    averageBreachCost: 3280000,
    breachProbability: 0.24,
    complianceRequirements: ["PCI-DSS", "GDPR", "CCPA"],
    criticalAssets: ["Customer data", "Payment information", "Inventory systems"],
  },
  energy: {
    averageBreachCost: 6950000,
    breachProbability: 0.16,
    complianceRequirements: ["NERC CIP", "NIST", "IEC 62443"],
    criticalAssets: ["SCADA systems", "Grid infrastructure", "Customer data"],
  },
}
