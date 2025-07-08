import type { VendorDetails } from "@/types/vendor-analysis"

export const COMPREHENSIVE_VENDOR_DATA: Record<string, VendorDetails> = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    description:
      "AI-powered cloud-native NAC delivering zero-trust security with unmatched simplicity. Portnox CLEAR revolutionizes network access control with intelligent device classification, automated policy enforcement, and seamless cloud deployment that takes minutes, not months.",
    category: "cloud-native",
    marketPosition: "visionary",
    licensing: {
      base: [
        {
          name: "Essentials",
          listPrice: 20,
          unit: "device",
          period: "year",
          features: ["Basic NAC", "Cloud RADIUS", "Device Discovery", "Basic Policies"],
        },
        {
          name: "Professional",
          listPrice: 30,
          unit: "device",
          period: "year",
          features: ["Advanced NAC", "Risk Scoring", "AI Classification", "Advanced Policies", "Guest Access"],
        },
        {
          name: "Enterprise",
          listPrice: 40,
          unit: "device",
          period: "year",
          features: ["Zero Trust NAC", "Full AI Suite", "Advanced Analytics", "Custom Integrations", "Premium Support"],
        },
      ],
      modules: [
        {
          name: "Advanced Analytics",
          listPrice: 5,
          unit: "device",
          period: "year",
          features: ["Deep Analytics", "Custom Reports", "Behavioral Analysis"],
        },
      ],
    },
    hardware: {
      cloud: [
        {
          name: "Cloud Service",
          capacity: "Unlimited",
          listPrice: 0,
          useCase: "Pure SaaS deployment",
        },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        "MAC Authentication": "✓✓✓",
        "Web Authentication": "✓✓✓",
        "Certificate Management": "✓✓✓",
        "Multi-Factor Authentication": "✓✓✓",
        RADIUS: "✓✓✓",
      },
      network: {
        "VLAN Assignment": "✓✓✓",
        "ACL Management": "✓✓✓",
        Quarantine: "✓✓✓",
        "Guest Access": "✓✓✓",
        IoT: "✓✓✓",
        BYOD: "✓✓✓",
      },
      advanced: {
        "Zero Trust": "✓✓✓",
        "AI/ML": "✓✓✓",
        "Risk Scoring": "✓✓✓",
        "Behavioral Analysis": "✓✓✓",
        "Cloud Native": "✓✓✓",
        "API Integration": "✓✓✓",
      },
      compliance: {
        "Audit Logging": "✓✓✓",
        "Compliance Reports": "✓✓✓",
        "Policy Templates": "✓✓✓",
        "Real-time Monitoring": "✓✓✓",
      },
    },
    integrations: {
      identity: [
        { name: "Active Directory", cost: 0, complexity: "low" },
        { name: "Azure AD", cost: 0, complexity: "low" },
        { name: "Okta", cost: 0, complexity: "low" },
        { name: "LDAP", cost: 0, complexity: "low" },
      ],
      mdm: [
        { name: "Microsoft Intune", cost: 0, complexity: "low" },
        { name: "VMware Workspace ONE", cost: 0, complexity: "medium" },
        { name: "Jamf", cost: 0, complexity: "low" },
      ],
      siem: [
        { name: "Splunk", cost: 0, complexity: "medium" },
        { name: "QRadar", cost: 0, complexity: "medium" },
        { name: "Azure Sentinel", cost: 0, complexity: "low" },
      ],
      security: [
        { name: "CrowdStrike", cost: 0, complexity: "low" },
        { name: "SentinelOne", cost: 0, complexity: "low" },
        { name: "Palo Alto", cost: 0, complexity: "medium" },
      ],
    },
    professionalServices: {
      vendor: [
        { name: "Implementation", cost: "Included" },
        { name: "Migration", cost: "Included" },
        { name: "Training", cost: "Included" },
      ],
      training: [
        { name: "Admin Training", cost: "Included" },
        { name: "End User Training", cost: "Included" },
      ],
    },
    highAvailability: {
      licensing: "Included",
      cost: "0",
      failoverTime: "Automatic (< 30 seconds)",
    },
    tcoFactors: {
      fteRequirement: 0.25,
      upgradeComplexity: "low",
      downtimeRisk: "low",
    },
    hiddenCosts: {
      licensingGotchas: [],
      commonExpenses: [],
      operationalOverhead: [],
    },
  },

  cisco_ise: {
    id: "cisco_ise",
    name: "Cisco Identity Services Engine (ISE)",
    description:
      "Market-leading NAC solution with comprehensive policy enforcement and deep Cisco ecosystem integration. ISE provides enterprise-grade network access control with advanced threat detection and extensive third-party integrations.",
    category: "enterprise",
    marketPosition: "leader",
    licensing: {
      base: [
        {
          name: "Base",
          listPrice: 75,
          unit: "endpoint",
          period: "year",
          features: ["Basic NAC", "RADIUS", "Basic Policies", "Guest Access"],
        },
        {
          name: "Plus",
          listPrice: 125,
          unit: "endpoint",
          period: "year",
          features: ["Advanced NAC", "Profiling", "Posture Assessment", "TrustSec"],
        },
        {
          name: "Apex",
          listPrice: 175,
          unit: "endpoint",
          period: "year",
          features: ["Full Feature Set", "pxGrid", "Advanced Threat Detection", "AI Analytics"],
        },
      ],
      modules: [
        {
          name: "Threat-Centric NAC",
          listPrice: 25,
          unit: "endpoint",
          period: "year",
          features: ["Threat Intelligence", "Advanced Analytics"],
        },
      ],
    },
    hardware: {
      physical: [
        {
          name: "ISE-3315-K9",
          capacity: "Up to 5,000 endpoints",
          listPrice: 25000,
          streetPrice: "~$18,000",
          useCase: "Small to medium deployments",
        },
        {
          name: "ISE-3355-K9",
          capacity: "Up to 50,000 endpoints",
          listPrice: 75000,
          streetPrice: "~$55,000",
          useCase: "Large enterprise deployments",
        },
        {
          name: "ISE-3395-K9",
          capacity: "Up to 500,000 endpoints",
          listPrice: 150000,
          streetPrice: "~$110,000",
          useCase: "Very large enterprise/service provider",
        },
      ],
      virtual: [
        {
          name: "ISE VM Small",
          capacity: "Up to 3,000 endpoints",
          listPrice: 15000,
          useCase: "Small deployments",
        },
        {
          name: "ISE VM Medium",
          capacity: "Up to 10,000 endpoints",
          listPrice: 35000,
          useCase: "Medium deployments",
        },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        "MAC Authentication": "✓✓✓",
        "Web Authentication": "✓✓✓",
        "Certificate Management": "✓✓✓",
        "Multi-Factor Authentication": "✓✓",
        RADIUS: "✓✓✓",
      },
      network: {
        "VLAN Assignment": "✓✓✓",
        "ACL Management": "✓✓✓",
        Quarantine: "✓✓✓",
        "Guest Access": "✓✓✓",
        IoT: "✓✓",
        BYOD: "✓✓✓",
      },
      advanced: {
        "Zero Trust": "✓✓",
        "AI/ML": "✓✓",
        "Risk Scoring": "✓✓",
        "Behavioral Analysis": "✓",
        "Cloud Native": "✓",
        "API Integration": "✓✓✓",
      },
      compliance: {
        "Audit Logging": "✓✓✓",
        "Compliance Reports": "✓✓✓",
        "Policy Templates": "✓✓✓",
        "Real-time Monitoring": "✓✓✓",
      },
    },
    integrations: {
      identity: [
        { name: "Active Directory", cost: 0, complexity: "low" },
        { name: "LDAP", cost: 0, complexity: "medium" },
        { name: "RSA SecurID", cost: 5000, complexity: "high" },
      ],
      mdm: [
        { name: "Microsoft Intune", cost: 0, complexity: "medium" },
        { name: "AirWatch", cost: 2500, complexity: "high" },
      ],
      siem: [
        { name: "Splunk", cost: 0, complexity: "medium" },
        { name: "QRadar", cost: 0, complexity: "high" },
      ],
      security: [
        { name: "Cisco Security Portfolio", cost: 0, complexity: "low" },
        { name: "Third-party SIEM", cost: 5000, complexity: "high" },
      ],
    },
    professionalServices: {
      vendor: [
        { name: "Implementation", cost: "$50,000-$200,000" },
        { name: "Migration", cost: "$25,000-$100,000" },
        { name: "Health Check", cost: "$15,000" },
      ],
      training: [
        { name: "Admin Training", cost: 5000 },
        { name: "Advanced Training", cost: 8000 },
      ],
    },
    highAvailability: {
      licensing: "Additional licenses required",
      cost: "50% of primary node cost",
      failoverTime: "5-15 minutes",
    },
    tcoFactors: {
      fteRequirement: 2.5,
      upgradeComplexity: "high",
      downtimeRisk: "medium",
    },
    hiddenCosts: {
      licensingGotchas: [
        "Base/Plus/Apex licensing complexity",
        "Per-endpoint licensing can be expensive at scale",
        "Hardware refresh cycles every 5-7 years",
      ],
      commonExpenses: [
        { name: "Professional Services", cost: "$50,000-$200,000" },
        { name: "Training", cost: "$10,000-$20,000" },
        { name: "Hardware Maintenance", cost: "20% annually" },
      ],
      operationalOverhead: [
        "Complex policy management requires dedicated staff",
        "Regular maintenance windows for updates",
      ],
    },
  },

  aruba_clearpass: {
    id: "aruba_clearpass",
    name: "Aruba ClearPass",
    description:
      "Comprehensive NAC solution with strong policy enforcement and excellent integration capabilities. ClearPass offers flexible deployment options and robust security features for enterprise environments.",
    category: "enterprise",
    marketPosition: "challenger",
    licensing: {
      base: [
        {
          name: "ClearPass Base",
          listPrice: 60,
          unit: "device",
          period: "year",
          features: ["Basic NAC", "Guest Access", "RADIUS", "Basic Policies"],
        },
        {
          name: "ClearPass Policy Manager",
          listPrice: 90,
          unit: "device",
          period: "year",
          features: ["Advanced Policies", "Profiling", "Posture Assessment"],
        },
        {
          name: "ClearPass Enterprise",
          listPrice: 120,
          unit: "device",
          period: "year",
          features: ["Full Feature Set", "Advanced Analytics", "API Access"],
        },
      ],
    },
    hardware: {
      physical: [
        {
          name: "CPPM-HW1K",
          capacity: "Up to 1,000 devices",
          listPrice: 12000,
          streetPrice: "~$9,000",
          useCase: "Small deployments",
        },
        {
          name: "CPPM-HW5K",
          capacity: "Up to 5,000 devices",
          listPrice: 35000,
          streetPrice: "~$26,000",
          useCase: "Medium deployments",
        },
        {
          name: "CPPM-HW25K",
          capacity: "Up to 25,000 devices",
          listPrice: 85000,
          streetPrice: "~$64,000",
          useCase: "Large deployments",
        },
      ],
      virtual: [
        {
          name: "ClearPass VM",
          capacity: "Up to 2,500 devices",
          listPrice: 20000,
          useCase: "Virtual deployments",
        },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        "MAC Authentication": "✓✓✓",
        "Web Authentication": "✓✓✓",
        "Certificate Management": "✓✓✓",
        "Multi-Factor Authentication": "✓✓",
        RADIUS: "✓✓✓",
      },
      network: {
        "VLAN Assignment": "✓✓✓",
        "ACL Management": "✓✓✓",
        Quarantine: "✓✓✓",
        "Guest Access": "✓✓✓",
        IoT: "✓✓",
        BYOD: "✓✓✓",
      },
      advanced: {
        "Zero Trust": "✓✓",
        "AI/ML": "✓",
        "Risk Scoring": "✓✓",
        "Behavioral Analysis": "✓",
        "Cloud Native": "✓",
        "API Integration": "✓✓✓",
      },
      compliance: {
        "Audit Logging": "✓✓✓",
        "Compliance Reports": "✓✓✓",
        "Policy Templates": "✓✓✓",
        "Real-time Monitoring": "✓✓✓",
      },
    },
    integrations: {
      identity: [
        { name: "Active Directory", cost: 0, complexity: "low" },
        { name: "LDAP", cost: 0, complexity: "medium" },
        { name: "Azure AD", cost: 0, complexity: "medium" },
      ],
      mdm: [
        { name: "Microsoft Intune", cost: 0, complexity: "medium" },
        { name: "VMware Workspace ONE", cost: 0, complexity: "medium" },
      ],
      siem: [
        { name: "Aruba Analytics", cost: 0, complexity: "low" },
        { name: "Splunk", cost: 0, complexity: "medium" },
      ],
      security: [
        { name: "Aruba Security Portfolio", cost: 0, complexity: "low" },
        { name: "Third-party Security", cost: 2500, complexity: "medium" },
      ],
    },
    professionalServices: {
      vendor: [
        { name: "Implementation", cost: "$25,000-$75,000" },
        { name: "Migration", cost: "$15,000-$50,000" },
      ],
      training: [
        { name: "Admin Training", cost: 3000 },
        { name: "Advanced Training", cost: 5000 },
      ],
    },
    highAvailability: {
      licensing: "Included in Enterprise",
      cost: "Hardware cost only",
      failoverTime: "2-5 minutes",
    },
    tcoFactors: {
      fteRequirement: 1.5,
      upgradeComplexity: "medium",
      downtimeRisk: "medium",
    },
    hiddenCosts: {
      licensingGotchas: ["Different licensing models for different features", "Hardware sizing can be complex"],
      commonExpenses: [
        { name: "Professional Services", cost: "$25,000-$75,000" },
        { name: "Training", cost: "$5,000-$10,000" },
      ],
      operationalOverhead: ["Regular maintenance required", "Policy complexity can grow over time"],
    },
  },

  forescout: {
    id: "forescout",
    name: "Forescout Platform",
    description:
      "Device visibility and compliance platform with strong IoT/OT focus. Forescout excels at device discovery and classification across complex enterprise environments including operational technology networks.",
    category: "enterprise",
    marketPosition: "challenger",
    licensing: {
      base: [
        {
          name: "Core",
          listPrice: 35,
          unit: "device",
          period: "year",
          features: ["Device Discovery", "Basic Classification", "Compliance Assessment"],
        },
        {
          name: "Advanced",
          listPrice: 50,
          unit: "device",
          period: "year",
          features: ["Advanced Classification", "Policy Enforcement", "Integration APIs"],
        },
        {
          name: "Enterprise",
          listPrice: 65,
          unit: "device",
          period: "year",
          features: ["Full Platform", "Advanced Analytics", "Custom Integrations"],
        },
      ],
    },
    hardware: {
      physical: [
        {
          name: "CounterACT 3500",
          capacity: "Up to 10,000 devices",
          listPrice: 45000,
          streetPrice: "~$34,000",
          useCase: "Medium deployments",
        },
        {
          name: "CounterACT 8000",
          capacity: "Up to 50,000 devices",
          listPrice: 125000,
          streetPrice: "~$94,000",
          useCase: "Large deployments",
        },
      ],
      virtual: [
        {
          name: "Virtual Appliance",
          capacity: "Up to 5,000 devices",
          listPrice: 25000,
          useCase: "Virtual deployments",
        },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓",
        "MAC Authentication": "✓✓✓",
        "Web Authentication": "✓✓",
        "Certificate Management": "✓✓",
        "Multi-Factor Authentication": "✓",
        RADIUS: "✓✓",
      },
      network: {
        "VLAN Assignment": "✓✓✓",
        "ACL Management": "✓✓✓",
        Quarantine: "✓✓✓",
        "Guest Access": "✓✓",
        IoT: "✓✓✓",
        BYOD: "✓✓",
      },
      advanced: {
        "Zero Trust": "✓✓",
        "AI/ML": "✓✓",
        "Risk Scoring": "✓✓✓",
        "Behavioral Analysis": "✓✓",
        "Cloud Native": "✓",
        "API Integration": "✓✓✓",
      },
      compliance: {
        "Audit Logging": "✓✓✓",
        "Compliance Reports": "✓✓✓",
        "Policy Templates": "✓✓✓",
        "Real-time Monitoring": "✓✓✓",
      },
    },
    integrations: {
      identity: [
        { name: "Active Directory", cost: 0, complexity: "medium" },
        { name: "LDAP", cost: 0, complexity: "medium" },
      ],
      mdm: [
        { name: "Microsoft Intune", cost: 0, complexity: "medium" },
        { name: "VMware Workspace ONE", cost: 0, complexity: "high" },
      ],
      siem: [
        { name: "Splunk", cost: 0, complexity: "low" },
        { name: "QRadar", cost: 0, complexity: "medium" },
        { name: "ArcSight", cost: 0, complexity: "medium" },
      ],
      security: [
        { name: "Palo Alto", cost: 0, complexity: "medium" },
        { name: "Checkpoint", cost: 0, complexity: "medium" },
      ],
    },
    professionalServices: {
      vendor: [
        { name: "Implementation", cost: "$40,000-$120,000" },
        { name: "Migration", cost: "$20,000-$60,000" },
      ],
      training: [
        { name: "Admin Training", cost: 4000 },
        { name: "Advanced Training", cost: 6000 },
      ],
    },
    highAvailability: {
      licensing: "Additional license required",
      cost: "50% of primary appliance",
      failoverTime: "3-8 minutes",
    },
    tcoFactors: {
      fteRequirement: 2,
      upgradeComplexity: "medium",
      downtimeRisk: "medium",
    },
    hiddenCosts: {
      licensingGotchas: [
        "Per-device licensing can be expensive for large IoT deployments",
        "Different modules require separate licensing",
      ],
      commonExpenses: [
        { name: "Professional Services", cost: "$40,000-$120,000" },
        { name: "Training", cost: "$8,000-$15,000" },
      ],
      operationalOverhead: ["Complex policy tuning required", "Regular signature updates needed"],
    },
  },

  extreme_nac: {
    id: "extreme_nac",
    name: "Extreme Networks NAC",
    description:
      "Flexible NAC solution with cloud and on-premise deployment options. Extreme NAC provides comprehensive network access control with strong integration capabilities and competitive pricing.",
    category: "mid-market",
    marketPosition: "niche",
    licensing: {
      base: [
        {
          name: "Essential",
          listPrice: 12,
          unit: "device",
          period: "year",
          features: ["Basic NAC", "Guest Access", "RADIUS"],
        },
        {
          name: "Advanced",
          listPrice: 18,
          unit: "device",
          period: "year",
          features: ["Advanced NAC", "Policy Management", "Analytics"],
        },
        {
          name: "Premium",
          listPrice: 25,
          unit: "device",
          period: "year",
          features: ["Full Feature Set", "Advanced Analytics", "API Access"],
        },
      ],
    },
    hardware: {
      physical: [
        {
          name: "ExtremeControl Appliance",
          capacity: "Up to 5,000 devices",
          listPrice: 15000,
          streetPrice: "~$11,000",
          useCase: "Small to medium deployments",
        },
      ],
      virtual: [
        {
          name: "Virtual Appliance",
          capacity: "Up to 2,500 devices",
          listPrice: 8000,
          useCase: "Virtual deployments",
        },
      ],
      cloud: [
        {
          name: "Cloud Service",
          capacity: "Unlimited",
          listPrice: 0,
          useCase: "Cloud-managed deployment",
        },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        "MAC Authentication": "✓✓✓",
        "Web Authentication": "✓✓✓",
        "Certificate Management": "✓✓",
        "Multi-Factor Authentication": "✓",
        RADIUS: "✓✓✓",
      },
      network: {
        "VLAN Assignment": "✓✓✓",
        "ACL Management": "✓✓",
        Quarantine: "✓✓✓",
        "Guest Access": "✓✓✓",
        IoT: "✓✓",
        BYOD: "✓✓✓",
      },
      advanced: {
        "Zero Trust": "✓",
        "AI/ML": "✓",
        "Risk Scoring": "✓",
        "Behavioral Analysis": "✗",
        "Cloud Native": "✓✓",
        "API Integration": "✓✓",
      },
      compliance: {
        "Audit Logging": "✓✓✓",
        "Compliance Reports": "✓✓",
        "Policy Templates": "✓✓",
        "Real-time Monitoring": "✓✓",
      },
    },
    integrations: {
      identity: [
        { name: "Active Directory", cost: 0, complexity: "low" },
        { name: "LDAP", cost: 0, complexity: "medium" },
      ],
      mdm: [{ name: "Microsoft Intune", cost: 0, complexity: "medium" }],
      siem: [{ name: "Splunk", cost: 0, complexity: "medium" }],
      security: [{ name: "Extreme Security Portfolio", cost: 0, complexity: "low" }],
    },
    professionalServices: {
      vendor: [
        { name: "Implementation", cost: "$15,000-$40,000" },
        { name: "Migration", cost: "$10,000-$25,000" },
      ],
      training: [{ name: "Admin Training", cost: 2000 }],
    },
    highAvailability: {
      licensing: "Included",
      cost: "Hardware cost only",
      failoverTime: "2-5 minutes",
    },
    tcoFactors: {
      fteRequirement: 1,
      upgradeComplexity: "medium",
      downtimeRisk: "medium",
    },
    hiddenCosts: {
      licensingGotchas: ["Cloud vs on-premise licensing differences"],
      commonExpenses: [{ name: "Professional Services", cost: "$15,000-$40,000" }],
      operationalOverhead: ["Regular maintenance required"],
    },
  },

  fortinet_fortinac: {
    id: "fortinet_fortinac",
    name: "Fortinet FortiNAC",
    description:
      "Integrated NAC solution within Fortinet Security Fabric. FortiNAC provides network access control with deep integration into Fortinet's security ecosystem and centralized management.",
    category: "enterprise",
    marketPosition: "niche",
    licensing: {
      base: [
        {
          name: "FortiNAC Base",
          listPrice: "Contact Sales",
          unit: "device",
          period: "year",
          features: ["Basic NAC", "Integration with Security Fabric"],
        },
      ],
    },
    hardware: {
      physical: [
        {
          name: "FortiNAC-1000F",
          capacity: "Up to 10,000 devices",
          listPrice: 35000,
          useCase: "Medium deployments",
        },
      ],
      virtual: [
        {
          name: "FortiNAC VM",
          capacity: "Up to 5,000 devices",
          listPrice: 20000,
          useCase: "Virtual deployments",
        },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        "MAC Authentication": "✓✓✓",
        "Web Authentication": "✓✓",
        "Certificate Management": "✓✓",
        "Multi-Factor Authentication": "✓",
        RADIUS: "✓✓✓",
      },
      network: {
        "VLAN Assignment": "✓✓✓",
        "ACL Management": "✓✓✓",
        Quarantine: "✓✓✓",
        "Guest Access": "✓✓",
        IoT: "✓✓",
        BYOD: "✓✓",
      },
      advanced: {
        "Zero Trust": "✓",
        "AI/ML": "✓",
        "Risk Scoring": "✓",
        "Behavioral Analysis": "✗",
        "Cloud Native": "✓",
        "API Integration": "✓✓",
      },
      compliance: {
        "Audit Logging": "✓✓✓",
        "Compliance Reports": "✓✓",
        "Policy Templates": "✓✓",
        "Real-time Monitoring": "✓✓",
      },
    },
    integrations: {
      identity: [
        { name: "Active Directory", cost: 0, complexity: "low" },
        { name: "LDAP", cost: 0, complexity: "medium" },
      ],
      security: [{ name: "Fortinet Security Fabric", cost: 0, complexity: "low" }],
    },
    professionalServices: {
      vendor: [{ name: "Implementation", cost: "$20,000-$60,000" }],
      training: [{ name: "Admin Training", cost: 3000 }],
    },
    highAvailability: {
      licensing: "Additional license required",
      cost: "50% of primary appliance",
      failoverTime: "5-10 minutes",
    },
    tcoFactors: {
      fteRequirement: 1.5,
      upgradeComplexity: "medium",
      downtimeRisk: "medium",
    },
    hiddenCosts: {
      licensingGotchas: ["Requires Fortinet ecosystem for full value"],
      commonExpenses: [{ name: "Professional Services", cost: "$20,000-$60,000" }],
      operationalOverhead: ["Best value when part of larger Fortinet deployment"],
    },
  },

  juniper_mist: {
    id: "juniper_mist",
    name: "Juniper Mist Access Assurance",
    description:
      "AI-driven NAC solution integrated with Juniper Mist cloud platform. Provides intelligent network access control with machine learning-based insights and cloud-native management.",
    category: "cloud-native",
    marketPosition: "visionary",
    licensing: {
      base: [
        {
          name: "Access Assurance",
          listPrice: 6,
          unit: "client",
          period: "year",
          features: ["AI-driven NAC", "Cloud Management", "Analytics"],
        },
      ],
    },
    hardware: {
      cloud: [
        {
          name: "Cloud Service",
          capacity: "Unlimited",
          listPrice: 0,
          useCase: "Cloud-managed deployment",
        },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        "MAC Authentication": "✓✓✓",
        "Web Authentication": "✓✓",
        "Certificate Management": "✓✓",
        "Multi-Factor Authentication": "✓",
        RADIUS: "✓✓✓",
      },
      network: {
        "VLAN Assignment": "✓✓✓",
        "ACL Management": "✓✓",
        Quarantine: "✓✓",
        "Guest Access": "✓✓",
        IoT: "✓✓",
        BYOD: "✓✓",
      },
      advanced: {
        "Zero Trust": "✓✓",
        "AI/ML": "✓✓✓",
        "Risk Scoring": "✓✓",
        "Behavioral Analysis": "✓✓",
        "Cloud Native": "✓✓✓",
        "API Integration": "✓✓",
      },
      compliance: {
        "Audit Logging": "✓✓",
        "Compliance Reports": "✓✓",
        "Policy Templates": "✓✓",
        "Real-time Monitoring": "✓✓✓",
      },
    },
    integrations: {
      identity: [
        { name: "Active Directory", cost: 0, complexity: "low" },
        { name: "Azure AD", cost: 0, complexity: "low" },
      ],
      security: [{ name: "Juniper Security Portfolio", cost: 0, complexity: "low" }],
    },
    professionalServices: {
      vendor: [{ name: "Implementation", cost: "$10,000-$30,000" }],
      training: [{ name: "Admin Training", cost: 2000 }],
    },
    highAvailability: {
      licensing: "Included",
      cost: "0",
      failoverTime: "Automatic (cloud-based)",
    },
    tcoFactors: {
      fteRequirement: 0.5,
      upgradeComplexity: "low",
      downtimeRisk: "low",
    },
    hiddenCosts: {
      licensingGotchas: ["Requires Juniper Mist ecosystem"],
      commonExpenses: [{ name: "Juniper Infrastructure", cost: "Variable" }],
      operationalOverhead: ["Limited to Juniper network infrastructure"],
    },
  },

  microsoft_nps: {
    id: "microsoft_nps",
    name: "Microsoft Network Policy Server (NPS)",
    description:
      "Built-in Windows Server RADIUS solution providing basic network access control. NPS offers fundamental NAC capabilities for Windows-centric environments at no additional licensing cost.",
    category: "sme",
    marketPosition: "niche",
    licensing: {
      base: [
        {
          name: "Included with Windows Server",
          listPrice: 0,
          unit: "server",
          period: "perpetual",
          features: ["Basic RADIUS", "Network Policies", "Connection Request Policies"],
        },
      ],
    },
    hardware: {
      physical: [
        {
          name: "Windows Server",
          capacity: "Depends on server specs",
          listPrice: 1000,
          useCase: "Basic RADIUS deployment",
        },
      ],
      virtual: [
        {
          name: "Windows Server VM",
          capacity: "Depends on VM specs",
          listPrice: 1000,
          useCase: "Virtual RADIUS deployment",
        },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓",
        "MAC Authentication": "✗",
        "Web Authentication": "✗",
        "Certificate Management": "✓",
        "Multi-Factor Authentication": "✗",
        RADIUS: "✓✓✓",
      },
      network: {
        "VLAN Assignment": "✓",
        "ACL Management": "✗",
        Quarantine: "✗",
        "Guest Access": "✗",
        IoT: "✗",
        BYOD: "✓",
      },
      advanced: {
        "Zero Trust": "✗",
        "AI/ML": "✗",
        "Risk Scoring": "✗",
        "Behavioral Analysis": "✗",
        "Cloud Native": "✗",
        "API Integration": "✓",
      },
      compliance: {
        "Audit Logging": "✓",
        "Compliance Reports": "✗",
        "Policy Templates": "✓",
        "Real-time Monitoring": "✓",
      },
    },
    integrations: {
      identity: [{ name: "Active Directory", cost: 0, complexity: "low" }],
    },
    professionalServices: {
      vendor: [],
      training: [],
    },
    highAvailability: {
      licensing: "Included",
      cost: "Additional server cost",
      failoverTime: "Manual failover",
    },
    tcoFactors: {
      fteRequirement: 0.5,
      upgradeComplexity: "low",
      downtimeRisk: "high",
    },
    hiddenCosts: {
      licensingGotchas: [
        "Limited functionality compared to dedicated NAC solutions",
        "Requires Windows Server licensing",
      ],
      commonExpenses: [{ name: "Windows Server License", cost: "$1,000+" }],
      operationalOverhead: ["Manual policy management", "Limited reporting capabilities"],
    },
  },

  foxpass: {
    id: "foxpass",
    name: "FoxPass",
    description:
      "Cloud-based RADIUS and LDAP service designed for modern organizations. FoxPass provides simple, secure authentication with easy integration and competitive pricing for SMB to mid-market.",
    category: "cloud-native",
    marketPosition: "niche",
    licensing: {
      base: [
        {
          name: "Starter",
          listPrice: 3,
          unit: "user",
          period: "month",
          features: ["Cloud RADIUS", "LDAP", "Basic Integrations"],
        },
        {
          name: "Professional",
          listPrice: 5,
          unit: "user",
          period: "month",
          features: ["Advanced Features", "SSO", "API Access"],
        },
        {
          name: "Enterprise",
          listPrice: 8,
          unit: "user",
          period: "month",
          features: ["Full Feature Set", "Premium Support", "Custom Integrations"],
        },
      ],
    },
    hardware: {
      cloud: [
        {
          name: "Cloud Service",
          capacity: "Unlimited",
          listPrice: 0,
          useCase: "Pure SaaS deployment",
        },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓",
        "MAC Authentication": "✓",
        "Web Authentication": "✓",
        "Certificate Management": "✓",
        "Multi-Factor Authentication": "✓",
        RADIUS: "✓✓✓",
      },
      network: {
        "VLAN Assignment": "✓",
        "ACL Management": "✗",
        Quarantine: "✗",
        "Guest Access": "✓",
        IoT: "✓",
        BYOD: "✓✓",
      },
      advanced: {
        "Zero Trust": "✗",
        "AI/ML": "✗",
        "Risk Scoring": "✗",
        "Behavioral Analysis": "✗",
        "Cloud Native": "✓✓✓",
        "API Integration": "✓✓",
      },
      compliance: {
        "Audit Logging": "✓✓",
        "Compliance Reports": "✓",
        "Policy Templates": "✓",
        "Real-time Monitoring": "✓",
      },
    },
    integrations: {
      identity: [
        { name: "Google Workspace", cost: 0, complexity: "low" },
        { name: "Azure AD", cost: 0, complexity: "low" },
        { name: "Okta", cost: 0, complexity: "low" },
      ],
      mdm: [{ name: "Jamf", cost: 0, complexity: "low" }],
    },
    professionalServices: {
      vendor: [{ name: "Implementation", cost: "Included" }],
      training: [{ name: "Admin Training", cost: "Included" }],
    },
    highAvailability: {
      licensing: "Included",
      cost: "0",
      failoverTime: "Automatic (cloud-based)",
    },
    tcoFactors: {
      fteRequirement: 0.25,
      upgradeComplexity: "low",
      downtimeRisk: "low",
    },
    hiddenCosts: {
      licensingGotchas: ["Per-user pricing can be expensive for device-heavy environments"],
      commonExpenses: [],
      operationalOverhead: ["Limited advanced NAC features"],
    },
  },

  securew2: {
    id: "securew2",
    name: "SecureW2",
    description:
      "Managed PKI and certificate-based authentication solution. SecureW2 specializes in secure wireless authentication with automated certificate management and strong security focus.",
    category: "enterprise",
    marketPosition: "niche",
    licensing: {
      base: [
        {
          name: "Cloud RADIUS",
          listPrice: "Contact Sales",
          unit: "user",
          period: "year",
          features: ["Managed PKI", "Certificate Automation", "Cloud RADIUS"],
        },
      ],
    },
    hardware: {
      cloud: [
        {
          name: "Cloud Service",
          capacity: "Unlimited",
          listPrice: 0,
          useCase: "Cloud-managed PKI and RADIUS",
        },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        "MAC Authentication": "✓",
        "Web Authentication": "✓",
        "Certificate Management": "✓✓✓",
        "Multi-Factor Authentication": "✓✓",
        RADIUS: "✓✓✓",
      },
      network: {
        "VLAN Assignment": "✓✓",
        "ACL Management": "✓",
        Quarantine: "✓",
        "Guest Access": "✓✓",
        IoT: "✓",
        BYOD: "✓✓✓",
      },
      advanced: {
        "Zero Trust": "✓",
        "AI/ML": "✗",
        "Risk Scoring": "✗",
        "Behavioral Analysis": "✗",
        "Cloud Native": "✓✓",
        "API Integration": "✓",
      },
      compliance: {
        "Audit Logging": "✓✓",
        "Compliance Reports": "✓✓",
        "Policy Templates": "✓",
        "Real-time Monitoring": "✓",
      },
    },
    integrations: {
      identity: [
        { name: "Active Directory", cost: 0, complexity: "low" },
        { name: "Azure AD", cost: 0, complexity: "low" },
      ],
      mdm: [{ name: "Microsoft Intune", cost: 0, complexity: "medium" }],
    },
    professionalServices: {
      vendor: [{ name: "Implementation", cost: "$10,000-$25,000" }],
      training: [{ name: "Admin Training", cost: 2000 }],
    },
    highAvailability: {
      licensing: "Included",
      cost: "0",
      failoverTime: "Automatic (cloud-based)",
    },
    tcoFactors: {
      fteRequirement: 0.5,
      upgradeComplexity: "low",
      downtimeRisk: "low",
    },
    hiddenCosts: {
      licensingGotchas: ["Premium pricing for managed PKI services"],
      commonExpenses: [{ name: "Professional Services", cost: "$10,000-$25,000" }],
      operationalOverhead: ["Focused on certificate-based authentication"],
    },
  },

  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    description:
      "Open-source NAC solution with comprehensive features and community support. PacketFence offers enterprise-grade capabilities with the flexibility of open-source licensing and customization.",
    category: "open-source",
    marketPosition: "niche",
    licensing: {
      base: [
        {
          name: "Community Edition",
          listPrice: 0,
          unit: "unlimited",
          period: "perpetual",
          features: ["Full NAC Features", "Community Support", "Open Source"],
        },
      ],
    },
    hardware: {
      physical: [
        {
          name: "Self-hosted Server",
          capacity: "Depends on hardware",
          listPrice: 5000,
          useCase: "On-premise deployment",
        },
      ],
      virtual: [
        {
          name: "Virtual Machine",
          capacity: "Depends on VM specs",
          listPrice: 0,
          useCase: "Virtual deployment",
        },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        "MAC Authentication": "✓✓✓",
        "Web Authentication": "✓✓✓",
        "Certificate Management": "✓✓",
        "Multi-Factor Authentication": "✓",
        RADIUS: "✓✓✓",
      },
      network: {
        "VLAN Assignment": "✓✓✓",
        "ACL Management": "✓✓",
        Quarantine: "✓✓✓",
        "Guest Access": "✓✓✓",
        IoT: "✓✓",
        BYOD: "✓✓✓",
      },
      advanced: {
        "Zero Trust": "✓",
        "AI/ML": "✗",
        "Risk Scoring": "✓",
        "Behavioral Analysis": "✗",
        "Cloud Native": "✗",
        "API Integration": "✓✓",
      },
      compliance: {
        "Audit Logging": "✓✓✓",
        "Compliance Reports": "✓✓",
        "Policy Templates": "✓✓",
        "Real-time Monitoring": "✓✓",
      },
    },
    integrations: {
      identity: [
        { name: "Active Directory", cost: 0, complexity: "medium" },
        { name: "LDAP", cost: 0, complexity: "medium" },
      ],
      security: [{ name: "Open Source Security Tools", cost: 0, complexity: "high" }],
    },
    professionalServices: {
      vendor: [
        { name: "Commercial Support", cost: "$15,000-$50,000" },
        { name: "Professional Services", cost: "$25,000-$75,000" },
      ],
      training: [{ name: "Admin Training", cost: 5000 }],
    },
    highAvailability: {
      licensing: "Included",
      cost: "Additional hardware cost",
      failoverTime: "Manual configuration required",
    },
    tcoFactors: {
      fteRequirement: 2,
      upgradeComplexity: "high",
      downtimeRisk: "medium",
    },
    hiddenCosts: {
      licensingGotchas: ["Free software but high implementation and support costs"],
      commonExpenses: [
        { name: "Professional Services", cost: "$25,000-$75,000" },
        { name: "Commercial Support", cost: "$15,000-$50,000" },
      ],
      operationalOverhead: ["Requires significant technical expertise", "Community support may be limited"],
    },
  },

  arista_agni: {
    id: "arista_agni",
    name: "Arista CloudVision AGNI",
    description:
      "Cloud-first NAC solution integrated with Arista's CloudVision platform. AGNI provides intelligent network access control with AI-driven insights and seamless integration with Arista switching infrastructure.",
    category: "cloud-native",
    marketPosition: "niche",
    licensing: {
      base: [
        {
          name: "AGNI Subscription",
          listPrice: "Contact Sales",
          unit: "switch port",
          period: "year",
          features: ["AI-driven NAC", "CloudVision Integration", "Analytics"],
        },
      ],
    },
    hardware: {
      cloud: [
        {
          name: "CloudVision Service",
          capacity: "Unlimited",
          listPrice: 0,
          useCase: "Cloud-managed deployment",
        },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        "MAC Authentication": "✓✓✓",
        "Web Authentication": "✓✓",
        "Certificate Management": "✓✓",
        "Multi-Factor Authentication": "✓",
        RADIUS: "✓✓✓",
      },
      network: {
        "VLAN Assignment": "✓✓✓",
        "ACL Management": "✓✓✓",
        Quarantine: "✓✓",
        "Guest Access": "✓✓",
        IoT: "✓✓",
        BYOD: "✓✓",
      },
      advanced: {
        "Zero Trust": "✓✓",
        "AI/ML": "✓✓✓",
        "Risk Scoring": "✓✓",
        "Behavioral Analysis": "✓✓",
        "Cloud Native": "✓✓✓",
        "API Integration": "✓✓",
      },
      compliance: {
        "Audit Logging": "✓✓",
        "Compliance Reports": "✓✓",
        "Policy Templates": "✓✓",
        "Real-time Monitoring": "✓✓✓",
      },
    },
    integrations: {
      identity: [
        { name: "Active Directory", cost: 0, complexity: "low" },
        { name: "Azure AD", cost: 0, complexity: "low" },
      ],
      security: [{ name: "Arista Security Portfolio", cost: 0, complexity: "low" }],
    },
    professionalServices: {
      vendor: [{ name: "Implementation", cost: "$15,000-$40,000" }],
      training: [{ name: "Admin Training", cost: 3000 }],
    },
    highAvailability: {
      licensing: "Included",
      cost: "0",
      failoverTime: "Automatic (cloud-based)",
    },
    tcoFactors: {
      fteRequirement: 0.5,
      upgradeComplexity: "low",
      downtimeRisk: "low",
    },
    hiddenCosts: {
      licensingGotchas: ["Requires Arista switching infrastructure"],
      commonExpenses: [{ name: "Arista Infrastructure", cost: "Variable" }],
      operationalOverhead: ["Limited to Arista network infrastructure"],
    },
  },

  cisco_meraki: {
    id: "cisco_meraki",
    name: "Cisco Meraki",
    description:
      "Cloud-managed networking solution with integrated NAC capabilities. Meraki provides simple network access control as part of its comprehensive cloud-managed infrastructure platform.",
    category: "cloud-native",
    marketPosition: "challenger",
    licensing: {
      base: [
        {
          name: "Systems Manager",
          listPrice: "Contact Sales",
          unit: "device",
          period: "year",
          features: ["Cloud Management", "Basic NAC", "Device Management"],
        },
      ],
    },
    hardware: {
      cloud: [
        {
          name: "Cloud Dashboard",
          capacity: "Unlimited",
          listPrice: 0,
          useCase: "Cloud-managed deployment",
        },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓",
        "MAC Authentication": "✓✓",
        "Web Authentication": "✓✓",
        "Certificate Management": "✓",
        "Multi-Factor Authentication": "✓",
        RADIUS: "✓✓",
      },
      network: {
        "VLAN Assignment": "✓✓",
        "ACL Management": "✓✓",
        Quarantine: "✓",
        "Guest Access": "✓✓",
        IoT: "✓",
        BYOD: "✓✓",
      },
      advanced: {
        "Zero Trust": "✓",
        "AI/ML": "✓",
        "Risk Scoring": "✓",
        "Behavioral Analysis": "✗",
        "Cloud Native": "✓✓✓",
        "API Integration": "✓✓",
      },
      compliance: {
        "Audit Logging": "✓✓",
        "Compliance Reports": "✓",
        "Policy Templates": "✓",
        "Real-time Monitoring": "✓✓",
      },
    },
    integrations: {
      identity: [
        { name: "Active Directory", cost: 0, complexity: "low" },
        { name: "Azure AD", cost: 0, complexity: "low" },
      ],
      mdm: [{ name: "Meraki Systems Manager", cost: 0, complexity: "low" }],
    },
    professionalServices: {
      vendor: [{ name: "Implementation", cost: "$10,000-$30,000" }],
      training: [{ name: "Admin Training", cost: 2000 }],
    },
    highAvailability: {
      licensing: "Included",
      cost: "0",
      failoverTime: "Automatic (cloud-based)",
    },
    tcoFactors: {
      fteRequirement: 0.5,
      upgradeComplexity: "low",
      downtimeRisk: "low",
    },
    hiddenCosts: {
      licensingGotchas: ["Requires Meraki infrastructure", "Limited standalone NAC capabilities"],
      commonExpenses: [{ name: "Meraki Infrastructure", cost: "Variable" }],
      operationalOverhead: ["Part of broader Meraki ecosystem"],
    },
  },
}
