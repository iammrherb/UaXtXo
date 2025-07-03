import type { IndustryId, OrgSizeId, ComplianceLevel } from "@/types/common"

export type VendorId =
  | "portnox"
  | "cisco_ise"
  | "aruba_clearpass"
  | "fortinet_fortigate"
  | "juniper_mist"
  | "extreme_networks"
  | "forescout"
  | "microsoft_nps"
  | "radiusaas"
  | "securew2"
  | "foxpass"
  | "packetfence"

export interface ComplianceSupport {
  standardId: string
  standardName: string
  coverageLevel: ComplianceLevel
  certificationStatus: "certified" | "in_progress" | "planned" | "not_applicable"
  lastAuditDate?: string
  nextAuditDate?: string
  notes?: string
}

export interface PricingTier {
  name: string
  description: string
  pricePerUser?: number
  pricePerDevice?: number
  minimumUsers?: number
  maximumUsers?: number
  features: string[]
  supportLevel: "basic" | "standard" | "premium" | "enterprise"
}

export interface NewVendorData {
  id: VendorId
  name: string
  vendorType: "Cloud NAC" | "Traditional NAC" | "Hybrid NAC" | "RADIUS-as-a-Service" | "Identity Platform"
  description: string
  logoUrl: string
  website: string

  // Core capabilities
  strengths: string[]
  weaknesses: string[]
  keyFeatures: string[]

  // Deployment & Architecture
  deploymentOptions: ("cloud" | "on_premise" | "hybrid")[]
  architectureType: "centralized" | "distributed" | "cloud_native" | "hybrid"
  scalabilityRating: 1 | 2 | 3 | 4 | 5

  // Industry fit
  bestFitIndustries: IndustryId[]
  recommendedOrgSizes: OrgSizeId[]

  // Compliance & Security
  complianceSupport?: ComplianceSupport[]
  securityCertifications: string[]

  // Pricing & TCO
  pricingModel: "per_user" | "per_device" | "flat_rate" | "tiered" | "custom"
  pricingTiers: PricingTier[]

  // Implementation
  implementationComplexity: "low" | "medium" | "high" | "very_high"
  averageImplementationTime: number // in days
  onboardingSupport: "self_service" | "guided" | "full_service" | "white_glove"

  // Support & Maintenance
  supportOptions: string[]
  maintenanceRequirements: "minimal" | "moderate" | "high" | "very_high"

  // Integration capabilities
  integrationCapabilities: {
    activeDirectory: boolean
    ldap: boolean
    saml: boolean
    oauth: boolean
    api: boolean
    siem: boolean
    mdm: boolean
  }

  // Performance metrics
  performanceMetrics: {
    maxConcurrentUsers: number
    authenticationLatency: number // in ms
    uptimeGuarantee: number // percentage
    throughput: number // authentications per second
  }

  // Market position
  marketShare: number // percentage
  customerBase: number
  yearFounded: number
  lastUpdated: string
}

export const allVendorsData = new Map<VendorId, NewVendorData>([
  [
    "portnox",
    {
      id: "portnox",
      name: "Portnox",
      vendorType: "Cloud NAC",
      description: "Cloud-native Network Access Control platform with AI-powered security and zero-trust architecture",
      logoUrl: "/portnox-logo-color.png",
      website: "https://www.portnox.com",

      strengths: [
        "Cloud-native architecture with rapid deployment",
        "AI-powered threat detection and response",
        "Comprehensive device visibility and profiling",
        "Strong integration ecosystem",
        "Excellent scalability and performance",
      ],
      weaknesses: [
        "Newer player in the market",
        "Limited on-premise deployment options",
        "Pricing can be higher for smaller organizations",
      ],
      keyFeatures: [
        "Zero-trust network access",
        "AI-powered device profiling",
        "Cloud-native architecture",
        "Real-time threat detection",
        "Automated policy enforcement",
        "Comprehensive compliance reporting",
      ],

      deploymentOptions: ["cloud", "hybrid"],
      architectureType: "cloud_native",
      scalabilityRating: 5,

      bestFitIndustries: ["healthcare", "financial_services", "technology", "education", "government"],
      recommendedOrgSizes: ["medium", "large", "enterprise"],

      complianceSupport: [
        {
          standardId: "hipaa",
          standardName: "HIPAA",
          coverageLevel: "Covered",
          certificationStatus: "certified",
          lastAuditDate: "2023-06-15",
          nextAuditDate: "2024-06-15",
        },
        {
          standardId: "pci_dss",
          standardName: "PCI-DSS",
          coverageLevel: "Covered",
          certificationStatus: "certified",
          lastAuditDate: "2023-08-20",
          nextAuditDate: "2024-08-20",
        },
        {
          standardId: "sox",
          standardName: "SOX",
          coverageLevel: "Covered",
          certificationStatus: "certified",
        },
        {
          standardId: "gdpr",
          standardName: "GDPR",
          coverageLevel: "Covered",
          certificationStatus: "certified",
        },
      ],
      securityCertifications: ["SOC 2 Type II", "ISO 27001", "FedRAMP Ready"],

      pricingModel: "per_user",
      pricingTiers: [
        {
          name: "Essential",
          description: "Basic NAC functionality for small to medium organizations",
          pricePerUser: 8,
          minimumUsers: 100,
          maximumUsers: 1000,
          features: [
            "Device discovery and profiling",
            "Basic policy enforcement",
            "Standard reporting",
            "Email support",
          ],
          supportLevel: "standard",
        },
        {
          name: "Professional",
          description: "Advanced features with AI-powered security",
          pricePerUser: 15,
          minimumUsers: 500,
          maximumUsers: 5000,
          features: [
            "All Essential features",
            "AI-powered threat detection",
            "Advanced analytics",
            "API access",
            "Phone support",
          ],
          supportLevel: "premium",
        },
        {
          name: "Enterprise",
          description: "Full-featured platform for large organizations",
          pricePerUser: 25,
          minimumUsers: 2000,
          features: [
            "All Professional features",
            "Custom integrations",
            "Dedicated support",
            "Advanced compliance reporting",
            "White-label options",
          ],
          supportLevel: "enterprise",
        },
      ],

      implementationComplexity: "low",
      averageImplementationTime: 30,
      onboardingSupport: "full_service",

      supportOptions: ["24/7 phone support", "Email support", "Live chat", "Knowledge base", "Community forum"],
      maintenanceRequirements: "minimal",

      integrationCapabilities: {
        activeDirectory: true,
        ldap: true,
        saml: true,
        oauth: true,
        api: true,
        siem: true,
        mdm: true,
      },

      performanceMetrics: {
        maxConcurrentUsers: 100000,
        authenticationLatency: 50,
        uptimeGuarantee: 99.9,
        throughput: 10000,
      },

      marketShare: 8.5,
      customerBase: 1200,
      yearFounded: 2014,
      lastUpdated: "2024-01-15",
    },
  ],
  [
    "cisco_ise",
    {
      id: "cisco_ise",
      name: "Cisco Identity Services Engine (ISE)",
      vendorType: "Traditional NAC",
      description: "Enterprise-grade network access control and policy enforcement platform",
      logoUrl: "/cisco-logo.png",
      website: "https://www.cisco.com/c/en/us/products/security/identity-services-engine/",

      strengths: [
        "Market leader with extensive features",
        "Strong integration with Cisco ecosystem",
        "Comprehensive policy management",
        "Mature platform with proven track record",
        "Extensive partner ecosystem",
      ],
      weaknesses: [
        "Complex deployment and management",
        "High total cost of ownership",
        "Steep learning curve",
        "Resource-intensive infrastructure requirements",
      ],
      keyFeatures: [
        "Centralized policy management",
        "Device profiling and compliance",
        "Guest access management",
        "BYOD support",
        "Threat-centric NAC",
        "Extensive reporting and analytics",
      ],

      deploymentOptions: ["on_premise", "hybrid"],
      architectureType: "centralized",
      scalabilityRating: 4,

      bestFitIndustries: ["financial_services", "government", "healthcare", "education", "manufacturing"],
      recommendedOrgSizes: ["large", "enterprise"],

      complianceSupport: [
        {
          standardId: "hipaa",
          standardName: "HIPAA",
          coverageLevel: "Covered",
          certificationStatus: "certified",
        },
        {
          standardId: "pci_dss",
          standardName: "PCI-DSS",
          coverageLevel: "Covered",
          certificationStatus: "certified",
        },
        {
          standardId: "fedramp",
          standardName: "FedRAMP",
          coverageLevel: "Covered",
          certificationStatus: "certified",
        },
      ],
      securityCertifications: ["Common Criteria", "FIPS 140-2", "FedRAMP"],

      pricingModel: "tiered",
      pricingTiers: [
        {
          name: "Base",
          description: "Core NAC functionality",
          features: ["Basic policy enforcement", "Device profiling", "Guest access", "Standard support"],
          supportLevel: "standard",
        },
        {
          name: "Plus",
          description: "Advanced features and integrations",
          features: [
            "All Base features",
            "Advanced threat detection",
            "Mobile device management",
            "Enhanced analytics",
          ],
          supportLevel: "premium",
        },
        {
          name: "Apex",
          description: "Full-featured enterprise platform",
          features: ["All Plus features", "AI-powered insights", "Advanced compliance", "Premium support"],
          supportLevel: "enterprise",
        },
      ],

      implementationComplexity: "very_high",
      averageImplementationTime: 180,
      onboardingSupport: "full_service",

      supportOptions: ["24/7 TAC support", "Professional services", "Training", "Documentation"],
      maintenanceRequirements: "high",

      integrationCapabilities: {
        activeDirectory: true,
        ldap: true,
        saml: true,
        oauth: true,
        api: true,
        siem: true,
        mdm: true,
      },

      performanceMetrics: {
        maxConcurrentUsers: 500000,
        authenticationLatency: 100,
        uptimeGuarantee: 99.5,
        throughput: 50000,
      },

      marketShare: 35.2,
      customerBase: 15000,
      yearFounded: 2012,
      lastUpdated: "2024-01-15",
    },
  ],
  [
    "aruba_clearpass",
    {
      id: "aruba_clearpass",
      name: "Aruba ClearPass",
      vendorType: "Traditional NAC",
      description: "Policy management platform providing role and device-based network access control",
      logoUrl: "/aruba-logo.png",
      website: "https://www.arubanetworks.com/products/security/network-access-control/",

      strengths: [
        "Strong policy management capabilities",
        "Excellent integration with Aruba infrastructure",
        "Flexible deployment options",
        "Good scalability",
        "Comprehensive guest access features",
      ],
      weaknesses: [
        "Complex initial configuration",
        "Limited cloud-native features",
        "Requires specialized expertise",
        "Higher maintenance overhead",
      ],
      keyFeatures: [
        "Policy-based access control",
        "Device fingerprinting",
        "Guest management",
        "Certificate management",
        "Threat detection",
        "Compliance reporting",
      ],

      deploymentOptions: ["on_premise", "cloud", "hybrid"],
      architectureType: "hybrid",
      scalabilityRating: 4,

      bestFitIndustries: ["education", "healthcare", "retail", "manufacturing", "government"],
      recommendedOrgSizes: ["medium", "large", "enterprise"],

      complianceSupport: [
        {
          standardId: "hipaa",
          standardName: "HIPAA",
          coverageLevel: "Covered",
          certificationStatus: "certified",
        },
        {
          standardId: "pci_dss",
          standardName: "PCI-DSS",
          coverageLevel: "Partial",
          certificationStatus: "in_progress",
        },
      ],
      securityCertifications: ["Common Criteria", "FIPS 140-2"],

      pricingModel: "per_device",
      pricingTiers: [
        {
          name: "ClearPass Base",
          description: "Essential NAC functionality",
          pricePerDevice: 12,
          features: ["Basic policy enforcement", "Device profiling", "Guest access", "Standard reporting"],
          supportLevel: "standard",
        },
        {
          name: "ClearPass Pro",
          description: "Advanced security and management",
          pricePerDevice: 20,
          features: [
            "All Base features",
            "Advanced threat protection",
            "Mobile device management",
            "Enhanced analytics",
          ],
          supportLevel: "premium",
        },
      ],

      implementationComplexity: "high",
      averageImplementationTime: 120,
      onboardingSupport: "guided",

      supportOptions: ["Technical support", "Professional services", "Training", "Community"],
      maintenanceRequirements: "moderate",

      integrationCapabilities: {
        activeDirectory: true,
        ldap: true,
        saml: true,
        oauth: false,
        api: true,
        siem: true,
        mdm: true,
      },

      performanceMetrics: {
        maxConcurrentUsers: 200000,
        authenticationLatency: 80,
        uptimeGuarantee: 99.7,
        throughput: 25000,
      },

      marketShare: 18.7,
      customerBase: 8500,
      yearFounded: 2010,
      lastUpdated: "2024-01-15",
    },
  ],
  [
    "fortinet_fortigate",
    {
      id: "fortinet_fortigate",
      name: "Fortinet FortiGate NAC",
      vendorType: "Traditional NAC",
      description: "Integrated network access control as part of Fortinet's security fabric",
      logoUrl: "/fortinet-logo.png",
      website: "https://www.fortinet.com/products/network-access-control",

      strengths: [
        "Integrated security fabric approach",
        "Strong threat intelligence integration",
        "Cost-effective for existing Fortinet customers",
        "Good performance and scalability",
        "Comprehensive security features",
      ],
      weaknesses: [
        "Limited standalone NAC features",
        "Requires Fortinet ecosystem for full benefits",
        "Complex multi-vendor environments",
        "Learning curve for non-Fortinet users",
      ],
      keyFeatures: [
        "Integrated security fabric",
        "Threat intelligence integration",
        "Device compliance checking",
        "Network segmentation",
        "Automated response",
        "Centralized management",
      ],

      deploymentOptions: ["on_premise", "hybrid"],
      architectureType: "distributed",
      scalabilityRating: 4,

      bestFitIndustries: ["manufacturing", "retail", "government", "financial_services"],
      recommendedOrgSizes: ["medium", "large", "enterprise"],

      complianceSupport: [
        {
          standardId: "pci_dss",
          standardName: "PCI-DSS",
          coverageLevel: "Covered",
          certificationStatus: "certified",
        },
        {
          standardId: "hipaa",
          standardName: "HIPAA",
          coverageLevel: "Partial",
          certificationStatus: "in_progress",
        },
      ],
      securityCertifications: ["Common Criteria", "ICSA Labs"],

      pricingModel: "tiered",
      pricingTiers: [
        {
          name: "FortiGate NAC Basic",
          description: "Basic NAC functionality integrated with FortiGate",
          features: ["Device discovery", "Basic policy enforcement", "Network segmentation", "Standard support"],
          supportLevel: "standard",
        },
        {
          name: "FortiGate NAC Advanced",
          description: "Advanced NAC with threat intelligence",
          features: ["All Basic features", "Threat intelligence integration", "Advanced analytics", "Premium support"],
          supportLevel: "premium",
        },
      ],

      implementationComplexity: "medium",
      averageImplementationTime: 90,
      onboardingSupport: "guided",

      supportOptions: ["FortiCare support", "Professional services", "Training", "Documentation"],
      maintenanceRequirements: "moderate",

      integrationCapabilities: {
        activeDirectory: true,
        ldap: true,
        saml: true,
        oauth: false,
        api: true,
        siem: true,
        mdm: false,
      },

      performanceMetrics: {
        maxConcurrentUsers: 150000,
        authenticationLatency: 90,
        uptimeGuarantee: 99.5,
        throughput: 20000,
      },

      marketShare: 12.3,
      customerBase: 6200,
      yearFounded: 2015,
      lastUpdated: "2024-01-15",
    },
  ],
  [
    "juniper_mist",
    {
      id: "juniper_mist",
      name: "Juniper Mist NAC",
      vendorType: "Cloud NAC",
      description: "AI-driven cloud-native network access control with automated operations",
      logoUrl: "/juniper-logo.png",
      website: "https://www.juniper.net/us/en/products/network-access-control/",

      strengths: [
        "AI-driven automation and insights",
        "Cloud-native architecture",
        "Excellent user experience",
        "Strong wireless integration",
        "Simplified management",
      ],
      weaknesses: [
        "Newer to the NAC market",
        "Limited on-premise options",
        "Smaller ecosystem compared to competitors",
        "Higher cost for some deployments",
      ],
      keyFeatures: [
        "AI-driven operations",
        "Cloud-native management",
        "Automated policy enforcement",
        "Real-time analytics",
        "Wireless-first approach",
        "Zero-touch provisioning",
      ],

      deploymentOptions: ["cloud", "hybrid"],
      architectureType: "cloud_native",
      scalabilityRating: 5,

      bestFitIndustries: ["education", "retail", "healthcare", "technology"],
      recommendedOrgSizes: ["medium", "large"],

      complianceSupport: [
        {
          standardId: "gdpr",
          standardName: "GDPR",
          coverageLevel: "Covered",
          certificationStatus: "certified",
        },
        {
          standardId: "hipaa",
          standardName: "HIPAA",
          coverageLevel: "Partial",
          certificationStatus: "planned",
        },
      ],
      securityCertifications: ["SOC 2", "ISO 27001"],

      pricingModel: "per_device",
      pricingTiers: [
        {
          name: "Mist NAC Essentials",
          description: "Basic cloud NAC functionality",
          pricePerDevice: 10,
          features: ["Cloud management", "Basic policy enforcement", "Device profiling", "Standard analytics"],
          supportLevel: "standard",
        },
        {
          name: "Mist NAC Premium",
          description: "Advanced AI-driven NAC",
          pricePerDevice: 18,
          features: ["All Essentials features", "AI-driven insights", "Advanced automation", "Premium analytics"],
          supportLevel: "premium",
        },
      ],

      implementationComplexity: "low",
      averageImplementationTime: 45,
      onboardingSupport: "full_service",

      supportOptions: ["Cloud support", "Professional services", "Training", "Community"],
      maintenanceRequirements: "minimal",

      integrationCapabilities: {
        activeDirectory: true,
        ldap: true,
        saml: true,
        oauth: true,
        api: true,
        siem: true,
        mdm: true,
      },

      performanceMetrics: {
        maxConcurrentUsers: 75000,
        authenticationLatency: 60,
        uptimeGuarantee: 99.9,
        throughput: 15000,
      },

      marketShare: 5.8,
      customerBase: 2800,
      yearFounded: 2019,
      lastUpdated: "2024-01-15",
    },
  ],
  [
    "extreme_networks",
    {
      id: "extreme_networks",
      name: "Extreme Networks NAC",
      vendorType: "Traditional NAC",
      description: "Network access control integrated with Extreme's network infrastructure",
      logoUrl: "/extreme-logo.png",
      website: "https://www.extremenetworks.com/product/nac/",

      strengths: [
        "Strong integration with Extreme infrastructure",
        "Good price-performance ratio",
        "Flexible deployment options",
        "Solid technical support",
        "Growing feature set",
      ],
      weaknesses: [
        "Smaller market presence",
        "Limited third-party integrations",
        "Less advanced analytics",
        "Fewer compliance certifications",
      ],
      keyFeatures: [
        "Policy-based access control",
        "Device profiling",
        "Guest management",
        "Network segmentation",
        "Compliance reporting",
        "Integration with ExtremeCloud",
      ],

      deploymentOptions: ["on_premise", "cloud", "hybrid"],
      architectureType: "hybrid",
      scalabilityRating: 3,

      bestFitIndustries: ["education", "government", "healthcare", "retail"],
      recommendedOrgSizes: ["small", "medium", "large"],

      complianceSupport: [
        {
          standardId: "hipaa",
          standardName: "HIPAA",
          coverageLevel: "Partial",
          certificationStatus: "in_progress",
        },
      ],
      securityCertifications: ["Common Criteria"],

      pricingModel: "per_device",
      pricingTiers: [
        {
          name: "NAC Basic",
          description: "Essential network access control",
          pricePerDevice: 8,
          features: ["Basic policy enforcement", "Device discovery", "Guest access", "Standard reporting"],
          supportLevel: "standard",
        },
        {
          name: "NAC Advanced",
          description: "Enhanced NAC with advanced features",
          pricePerDevice: 14,
          features: ["All Basic features", "Advanced profiling", "Enhanced analytics", "Premium support"],
          supportLevel: "premium",
        },
      ],

      implementationComplexity: "medium",
      averageImplementationTime: 75,
      onboardingSupport: "guided",

      supportOptions: ["Technical support", "Professional services", "Training"],
      maintenanceRequirements: "moderate",

      integrationCapabilities: {
        activeDirectory: true,
        ldap: true,
        saml: false,
        oauth: false,
        api: true,
        siem: false,
        mdm: false,
      },

      performanceMetrics: {
        maxConcurrentUsers: 50000,
        authenticationLatency: 120,
        uptimeGuarantee: 99.0,
        throughput: 8000,
      },

      marketShare: 3.2,
      customerBase: 1500,
      yearFounded: 2016,
      lastUpdated: "2024-01-15",
    },
  ],
  [
    "forescout",
    {
      id: "forescout",
      name: "Forescout Platform",
      vendorType: "Hybrid NAC",
      description: "Device visibility and control platform with network access control capabilities",
      logoUrl: "/forescout-logo.png",
      website: "https://www.forescout.com/",

      strengths: [
        "Excellent device visibility and discovery",
        "Strong IoT and OT device support",
        "Agentless architecture",
        "Comprehensive threat detection",
        "Good integration capabilities",
      ],
      weaknesses: [
        "Complex pricing model",
        "Steep learning curve",
        "Resource-intensive deployment",
        "Limited cloud-native features",
      ],
      keyFeatures: [
        "Agentless device discovery",
        "IoT/OT device support",
        "Real-time compliance monitoring",
        "Automated response",
        "Threat hunting capabilities",
        "Extensive integrations",
      ],

      deploymentOptions: ["on_premise", "hybrid"],
      architectureType: "distributed",
      scalabilityRating: 4,

      bestFitIndustries: ["manufacturing", "energy_utilities", "healthcare", "government"],
      recommendedOrgSizes: ["large", "enterprise"],

      complianceSupport: [
        {
          standardId: "nerc_cip",
          standardName: "NERC CIP",
          coverageLevel: "Covered",
          certificationStatus: "certified",
        },
        {
          standardId: "hipaa",
          standardName: "HIPAA",
          coverageLevel: "Covered",
          certificationStatus: "certified",
        },
      ],
      securityCertifications: ["Common Criteria", "FIPS 140-2"],

      pricingModel: "custom",
      pricingTiers: [
        {
          name: "Foundation",
          description: "Basic device visibility and control",
          features: ["Device discovery", "Basic profiling", "Policy enforcement", "Standard reporting"],
          supportLevel: "standard",
        },
        {
          name: "Advanced",
          description: "Enhanced security and compliance",
          features: [
            "All Foundation features",
            "Advanced threat detection",
            "Compliance automation",
            "Enhanced integrations",
          ],
          supportLevel: "premium",
        },
      ],

      implementationComplexity: "high",
      averageImplementationTime: 150,
      onboardingSupport: "full_service",

      supportOptions: ["24/7 support", "Professional services", "Training", "Customer success"],
      maintenanceRequirements: "high",

      integrationCapabilities: {
        activeDirectory: true,
        ldap: true,
        saml: true,
        oauth: false,
        api: true,
        siem: true,
        mdm: true,
      },

      performanceMetrics: {
        maxConcurrentUsers: 300000,
        authenticationLatency: 110,
        uptimeGuarantee: 99.5,
        throughput: 30000,
      },

      marketShare: 7.9,
      customerBase: 3200,
      yearFounded: 2000,
      lastUpdated: "2024-01-15",
    },
  ],
  [
    "microsoft_nps",
    {
      id: "microsoft_nps",
      name: "Microsoft Network Policy Server",
      vendorType: "Traditional NAC",
      description: "Windows Server role providing RADIUS server and NAP functionality",
      logoUrl: "/microsoft-logo.png",
      website: "https://docs.microsoft.com/en-us/windows-server/networking/technologies/nps/",

      strengths: [
        "Native Windows integration",
        "Cost-effective for Windows environments",
        "Good Active Directory integration",
        "Familiar management interface",
        "Included with Windows Server",
      ],
      weaknesses: [
        "Limited advanced NAC features",
        "Windows-centric approach",
        "Basic reporting capabilities",
        "Limited scalability",
        "Minimal threat detection",
      ],
      keyFeatures: [
        "RADIUS authentication",
        "Network Access Protection (NAP)",
        "Policy-based access control",
        "Active Directory integration",
        "Certificate-based authentication",
        "Basic reporting",
      ],

      deploymentOptions: ["on_premise"],
      architectureType: "centralized",
      scalabilityRating: 2,

      bestFitIndustries: ["government", "education", "small_business"],
      recommendedOrgSizes: ["small", "medium"],

      complianceSupport: [
        {
          standardId: "hipaa",
          standardName: "HIPAA",
          coverageLevel: "Partial",
          certificationStatus: "not_applicable",
        },
      ],
      securityCertifications: ["Common Criteria"],

      pricingModel: "flat_rate",
      pricingTiers: [
        {
          name: "Windows Server Standard",
          description: "Included with Windows Server Standard edition",
          features: ["RADIUS authentication", "NAP", "Basic policy enforcement", "Standard support"],
          supportLevel: "standard",
        },
        {
          name: "Windows Server Datacenter",
          description: "Included with Windows Server Datacenter edition",
          features: ["All Standard features", "Enhanced virtualization", "Premium support"],
          supportLevel: "premium",
        },
      ],

      implementationComplexity: "medium",
      averageImplementationTime: 60,
      onboardingSupport: "self_service",

      supportOptions: ["Microsoft support", "Documentation", "Community forums"],
      maintenanceRequirements: "moderate",

      integrationCapabilities: {
        activeDirectory: true,
        ldap: true,
        saml: false,
        oauth: false,
        api: false,
        siem: false,
        mdm: false,
      },

      performanceMetrics: {
        maxConcurrentUsers: 10000,
        authenticationLatency: 150,
        uptimeGuarantee: 98.0,
        throughput: 2000,
      },

      marketShare: 2.1,
      customerBase: 10000,
      yearFounded: 2008,
      lastUpdated: "2024-01-15",
    },
  ],
  [
    "radiusaas",
    {
      id: "radiusaas",
      name: "Radius-as-a-Service",
      vendorType: "RADIUS-as-a-Service",
      description: "Cloud-based RADIUS authentication service for secure network access",
      logoUrl: "/radiusaas-logo.png",
      website: "https://www.radiusaas.com/",

      strengths: [
        "Simplified RADIUS deployment",
        "Cloud-native architecture",
        "Cost-effective for small to medium businesses",
        "Easy to manage",
        "Good for Wi-Fi authentication",
      ],
      weaknesses: [
        "Limited advanced NAC features",
        "Focus on authentication, not policy",
        "Fewer integrations",
        "Limited scalability for large enterprises",
      ],
      keyFeatures: [
        "Cloud-based RADIUS",
        "Certificate-based authentication",
        "User and device management",
        "Integration with identity providers",
        "Basic reporting",
        "Simplified Wi-Fi security",
      ],

      deploymentOptions: ["cloud"],
      architectureType: "cloud_native",
      scalabilityRating: 3,

      bestFitIndustries: ["education", "retail", "small_business", "hospitality"],
      recommendedOrgSizes: ["small", "medium"],

      complianceSupport: [
        {
          standardId: "pci_dss",
          standardName: "PCI-DSS",
          coverageLevel: "Partial",
          certificationStatus: "in_progress",
        },
      ],
      securityCertifications: ["SOC 2"],

      pricingModel: "per_user",
      pricingTiers: [
        {
          name: "Basic",
          description: "Essential RADIUS authentication",
          pricePerUser: 2,
          features: ["Cloud RADIUS", "User management", "Basic reporting", "Email support"],
          supportLevel: "basic",
        },
        {
          name: "Pro",
          description: "Advanced features and support",
          pricePerUser: 4,
          features: ["All Basic features", "Certificate management", "Advanced reporting", "Phone support"],
          supportLevel: "standard",
        },
      ],

      implementationComplexity: "low",
      averageImplementationTime: 15,
      onboardingSupport: "self_service",

      supportOptions: ["Email support", "Phone support", "Knowledge base"],
      maintenanceRequirements: "minimal",

      integrationCapabilities: {
        activeDirectory: true,
        ldap: true,
        saml: true,
        oauth: false,
        api: true,
        siem: false,
        mdm: false,
      },

      performanceMetrics: {
        maxConcurrentUsers: 25000,
        authenticationLatency: 70,
        uptimeGuarantee: 99.9,
        throughput: 5000,
      },

      marketShare: 1.5,
      customerBase: 800,
      yearFounded: 2018,
      lastUpdated: "2024-01-15",
    },
  ],
  [
    "securew2",
    {
      id: "securew2",
      name: "SecureW2",
      vendorType: "Identity Platform",
      description: "Cloud-based identity and access management with strong certificate support",
      logoUrl: "/securew2-logo.png",
      website: "https://www.securew2.com/",

      strengths: [
        "Excellent certificate management",
        "Strong identity provider integration",
        "Good for BYOD environments",
        "Simplified onboarding",
        "Cloud-native architecture",
      ],
      weaknesses: [
        "Limited traditional NAC features",
        "Focus on identity, not network policy",
        "Fewer threat detection capabilities",
        "Higher cost for some deployments",
      ],
      keyFeatures: [
        "Certificate lifecycle management",
        "Cloud RADIUS",
        "Identity provider integration",
        "BYOD onboarding",
        "Passwordless authentication",
        "Comprehensive reporting",
      ],

      deploymentOptions: ["cloud"],
      architectureType: "cloud_native",
      scalabilityRating: 4,

      bestFitIndustries: ["education", "technology", "healthcare", "retail"],
      recommendedOrgSizes: ["medium", "large"],

      complianceSupport: [
        {
          standardId: "hipaa",
          standardName: "HIPAA",
          coverageLevel: "Partial",
          certificationStatus: "in_progress",
        },
        {
          standardId: "pci_dss",
          standardName: "PCI-DSS",
          coverageLevel: "Partial",
          certificationStatus: "in_progress",
        },
      ],
      securityCertifications: ["SOC 2", "ISO 27001"],

      pricingModel: "per_user",
      pricingTiers: [
        {
          name: "Standard",
          description: "Core identity and access management",
          pricePerUser: 5,
          features: ["Cloud RADIUS", "Certificate management", "Basic reporting", "Standard support"],
          supportLevel: "standard",
        },
        {
          name: "Enterprise",
          description: "Advanced features and integrations",
          pricePerUser: 9,
          features: ["All Standard features", "Advanced integrations", "Premium support", "Enhanced analytics"],
          supportLevel: "premium",
        },
      ],

      implementationComplexity: "low",
      averageImplementationTime: 30,
      onboardingSupport: "guided",

      supportOptions: ["24/7 support", "Professional services", "Training", "Customer success"],
      maintenanceRequirements: "minimal",

      integrationCapabilities: {
        activeDirectory: true,
        ldap: true,
        saml: true,
        oauth: true,
        api: true,
        siem: true,
        mdm: true,
      },

      performanceMetrics: {
        maxConcurrentUsers: 50000,
        authenticationLatency: 60,
        uptimeGuarantee: 99.9,
        throughput: 10000,
      },

      marketShare: 2.8,
      customerBase: 1200,
      yearFounded: 2012,
      lastUpdated: "2024-01-15",
    },
  ],
  [
    "foxpass",
    {
      id: "foxpass",
      name: "Foxpass",
      vendorType: "RADIUS-as-a-Service",
      description: "Cloud-based RADIUS and LDAP authentication with strong security features",
      logoUrl: "/foxpass-logo.png",
      website: "https://www.foxpass.com/",

      strengths: [
        "Simplified RADIUS and LDAP",
        "Strong security focus",
        "Good for cloud-first organizations",
        "Easy to deploy and manage",
        "Cost-effective",
      ],
      weaknesses: [
        "Limited advanced NAC features",
        "Fewer integrations than competitors",
        "Limited scalability for very large enterprises",
        "Basic reporting",
      ],
      keyFeatures: [
        "Cloud RADIUS and LDAP",
        "Certificate-based authentication",
        "SSH key management",
        "Integration with identity providers",
        "Basic policy enforcement",
        "Simplified security",
      ],

      deploymentOptions: ["cloud"],
      architectureType: "cloud_native",
      scalabilityRating: 3,

      bestFitIndustries: ["technology", "small_business", "startups"],
      recommendedOrgSizes: ["small", "medium"],

      complianceSupport: [
        {
          standardId: "soc2",
          standardName: "SOC 2",
          coverageLevel: "Covered",
          certificationStatus: "certified",
        },
      ],
      securityCertifications: ["SOC 2"],

      pricingModel: "per_user",
      pricingTiers: [
        {
          name: "Basic",
          description: "Essential RADIUS and LDAP",
          pricePerUser: 3,
          features: ["Cloud RADIUS", "Cloud LDAP", "Basic reporting", "Email support"],
          supportLevel: "basic",
        },
        {
          name: "Pro",
          description: "Advanced features and support",
          pricePerUser: 6,
          features: ["All Basic features", "SSH key management", "Advanced reporting", "Phone support"],
          supportLevel: "standard",
        },
      ],

      implementationComplexity: "low",
      averageImplementationTime: 10,
      onboardingSupport: "self_service",

      supportOptions: ["Email support", "Phone support", "Knowledge base"],
      maintenanceRequirements: "minimal",

      integrationCapabilities: {
        activeDirectory: true,
        ldap: true,
        saml: true,
        oauth: false,
        api: true,
        siem: false,
        mdm: false,
      },

      performanceMetrics: {
        maxConcurrentUsers: 15000,
        authenticationLatency: 80,
        uptimeGuarantee: 99.9,
        throughput: 3000,
      },

      marketShare: 0.9,
      customerBase: 500,
      yearFounded: 2015,
      lastUpdated: "2024-01-15",
    },
  ],
  [
    "packetfence",
    {
      id: "packetfence",
      name: "PacketFence",
      vendorType: "Traditional NAC",
      description: "Open-source network access control solution with a wide range of features",
      logoUrl: "/packetfence-logo.png",
      website: "https://www.packetfence.org/",

      strengths: [
        "Open-source and free",
        "Highly customizable",
        "Strong community support",
        "Wide range of features",
        "Good for budget-conscious organizations",
      ],
      weaknesses: [
        "Requires significant technical expertise",
        "No official enterprise support",
        "Complex deployment and management",
        "Steep learning curve",
        "Limited cloud-native features",
      ],
      keyFeatures: [
        "Policy-based access control",
        "Device profiling",
        "Guest management",
        "Network segmentation",
        "Compliance checking",
        "Extensive integrations",
      ],

      deploymentOptions: ["on_premise"],
      architectureType: "centralized",
      scalabilityRating: 3,

      bestFitIndustries: ["education", "government", "non_profit"],
      recommendedOrgSizes: ["small", "medium", "large"],

      complianceSupport: [
        {
          standardId: "hipaa",
          standardName: "HIPAA",
          coverageLevel: "NotCovered",
          certificationStatus: "not_applicable",
        },
      ],
      securityCertifications: [],

      pricingModel: "flat_rate",
      pricingTiers: [
        {
          name: "Community Edition",
          description: "Free and open-source",
          features: ["All features", "Community support"],
          supportLevel: "basic",
        },
      ],

      implementationComplexity: "very_high",
      averageImplementationTime: 200,
      onboardingSupport: "self_service",

      supportOptions: ["Community forums", "Mailing lists", "Documentation"],
      maintenanceRequirements: "very_high",

      integrationCapabilities: {
        activeDirectory: true,
        ldap: true,
        saml: true,
        oauth: false,
        api: true,
        siem: true,
        mdm: true,
      },

      performanceMetrics: {
        maxConcurrentUsers: 20000,
        authenticationLatency: 150,
        uptimeGuarantee: 95.0,
        throughput: 4000,
      },

      marketShare: 0.5,
      customerBase: 2000,
      yearFounded: 2003,
      lastUpdated: "2024-01-15",
    },
  ],
])

export const VENDOR_IDS_DEFINITIVE: readonly VendorId[] = [
  "portnox",
  "cisco_ise",
  "aruba_clearpass",
  "fortinet_fortigate",
  "juniper_mist",
  "extreme_networks",
  "forescout",
  "microsoft_nps",
  "radiusaas",
  "securew2",
  "foxpass",
  "packetfence",
]

export function getVendorDataById(id: VendorId): NewVendorData | undefined {
  return allVendorsData.get(id)
}
