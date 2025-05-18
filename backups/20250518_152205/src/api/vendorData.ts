// Comprehensive vendor data for all NAC solutions

// Define vendor data interface
export interface VendorData {
  id: string;
  name: string;
  description: string;
  logo: string;
  badge?: string;
  badgeClass?: string;
  deployment: 'cloud' | 'on-premises' | 'hybrid';
  pricing: {
    model: 'subscription' | 'perpetual' | 'hybrid';
    basePrice: number;
    maintenancePercentage?: number;
    getImplementationDays: (deviceCount: number) => number;
    getImplementationCost: (deviceCount: number) => number;
    getFteRequired: (deviceCount: number) => number;
    getHardwareCost: (deviceCount: number) => number;
    riskReductionEffectiveness: number;
    meanTimeToRespond: number;
  };
  features: {
    cloudNative: number;
    zeroTrust: number;
    deploymentSpeed: number;
    managementSimplicity: number;
    scalability: number;
    remoteAccess: number;
    compliance: number;
    costEffectiveness: number;
    threatPrevention: number;
    deviceDiscovery: number;
    userExperience: number;
    thirdPartyIntegration: number;
  };
  marketPosition: {
    marketShare: number;
    customerSatisfaction: number;
    analystRating: number;
    yearsFounded: number;
    targetMarket: string[];
  };
  strengthsWeaknesses: {
    strengths: string[];
    weaknesses: string[];
    bestFitFor: string[];
    challenges: string[];
  };
}

// Comprehensive vendor data including all required vendors
export const vendorData: Record<string, VendorData> = {
  portnox: {
    id: 'portnox',
    name: 'Portnox Cloud',
    description: 'Cloud-native NAC',
    logo: process.env.NODE_ENV === 'production' ? '/UaXtXo/img/vendors/' : '/img/vendors/portnox-logo.png',
    badge: 'Best Value',
    badgeClass: 'badge-primary',
    deployment: 'cloud',
    pricing: {
      model: 'subscription',
      // Base price per device per month (before discounts)
      basePrice: 3.00,
      // Implementation days based on device count
      getImplementationDays: (deviceCount: number) => {
        if (deviceCount < 1000) return 14;
        if (deviceCount < 5000) return 21;
        if (deviceCount < 10000) return 30;
        return 45;
      },
      // Implementation cost calculation
      getImplementationCost: (deviceCount: number) => {
        const days = vendorData.portnox.pricing.getImplementationDays(deviceCount);
        return days * 1500; // Daily implementation rate
      },
      // Resources required (FTE percentage)
      getFteRequired: (deviceCount: number) => {
        if (deviceCount < 1000) return 0.15;
        if (deviceCount < 5000) return 0.25;
        if (deviceCount < 10000) return 0.5;
        return 0.75;
      },
      // Hardware costs (none for cloud)
      getHardwareCost: () => 0,
      // Risk reduction effectiveness (%)
      riskReductionEffectiveness: 85,
      // Mean time to respond (minutes)
      meanTimeToRespond: 45,
    },
    features: {
      cloudNative: 10,
      zeroTrust: 9,
      deploymentSpeed: 10,
      managementSimplicity: 9,
      scalability: 10,
      remoteAccess: 9,
      compliance: 8,
      costEffectiveness: 10,
      threatPrevention: 8,
      deviceDiscovery: 9,
      userExperience: 9,
      thirdPartyIntegration: 8
    },
    marketPosition: {
      marketShare: 12,
      customerSatisfaction: 4.7,
      analystRating: 4.5,
      yearsFounded: 2007,
      targetMarket: ['SMB', 'Mid-Market', 'Enterprise']
    },
    strengthsWeaknesses: {
      strengths: [
        'True cloud-native architecture',
        'Rapid deployment with minimal infrastructure',
        'Simple, intuitive management interface',
        'Strong BYOD and remote access support',
        'Continuous compliance monitoring'
      ],
      weaknesses: [
        'Newer to enterprise market segment',
        'Still building brand recognition',
        'Limited hardware-level integration compared to legacy vendors'
      ],
      bestFitFor: [
        'Cloud-first organizations',
        'Multi-location enterprises',
        'Companies prioritizing rapid time-to-security',
        'Organizations with limited IT resources'
      ],
      challenges: [
        'Competing against established vendor relationships',
        'Meeting specialized industrial or healthcare requirements'
      ]
    }
  },
  
  cisco: {
    id: 'cisco',
    name: 'Cisco ISE',
    description: 'Enterprise NAC',
    logo: process.env.NODE_ENV === 'production' ? '/UaXtXo/img/vendors/' : '/img/vendors/cisco-logo.png',
    badge: 'Complex',
    badgeClass: 'badge-warning',
    deployment: 'on-premises',
    pricing: {
      model: 'perpetual',
      // Base perpetual license cost per device
      basePrice: 85.00,
      // Annual maintenance as percentage of license cost
      maintenancePercentage: 20,
      // Implementation days based on device count
      getImplementationDays: (deviceCount: number) => {
        if (deviceCount < 1000) return 45;
        if (deviceCount < 5000) return 90;
        if (deviceCount < 10000) return 120;
        return 180;
      },
      // Implementation cost calculation
      getImplementationCost: (deviceCount: number) => {
        const days = vendorData.cisco.pricing.getImplementationDays(deviceCount);
        return days * 2000; // Daily implementation rate
      },
      // Resources required (FTE percentage)
      getFteRequired: (deviceCount: number) => {
        if (deviceCount < 1000) return 0.5;
        if (deviceCount < 5000) return 1.0;
        if (deviceCount < 10000) return 1.5;
        return 2.0;
      },
      // Hardware costs
      getHardwareCost: (deviceCount: number) => {
        if (deviceCount < 1000) return 50000;
        if (deviceCount < 5000) return 120000;
        if (deviceCount < 10000) return 200000;
        return 350000;
      },
      // Risk reduction effectiveness (%)
      riskReductionEffectiveness: 75,
      // Mean time to respond (minutes)
      meanTimeToRespond: 90,
    },
    features: {
      cloudNative: 4,
      zeroTrust: 7,
      deploymentSpeed: 3,
      managementSimplicity: 4,
      scalability: 8,
      remoteAccess: 6,
      compliance: 9,
      costEffectiveness: 3,
      threatPrevention: 8,
      deviceDiscovery: 8,
      userExperience: 5,
      thirdPartyIntegration: 9
    },
    marketPosition: {
      marketShare: 35,
      customerSatisfaction: 3.8,
      analystRating: 4.1,
      yearsFounded: 1984,
      targetMarket: ['Enterprise', 'Global 2000', 'Government']
    },
    strengthsWeaknesses: {
      strengths: [
        'Market leader with extensive install base',
        'Deep integration with Cisco networking infrastructure',
        'Comprehensive policy management',
        'Strong security ecosystem integration',
        'Mature compliance reporting'
      ],
      weaknesses: [
        'Complex implementation and management',
        'High hardware and consulting requirements',
        'Significant ongoing maintenance costs',
        'Limited cloud capabilities'
      ],
      bestFitFor: [
        'Existing Cisco networking customers',
        'Large enterprises with dedicated security teams',
        'Organizations requiring deep infrastructure integration',
        'Companies with complex compliance requirements'
      ],
      challenges: [
        'Cloud migration and adoption',
        'Simplified management for resource-constrained organizations',
        'Cost justification for smaller enterprises'
      ]
    }
  },
  
  aruba: {
    id: 'aruba',
    name: 'Aruba ClearPass',
    description: 'Policy manager',
    logo: process.env.NODE_ENV === 'production' ? '/UaXtXo/img/vendors/' : '/img/vendors/aruba-logo.png',
    deployment: 'on-premises',
    pricing: {
      model: 'perpetual',
      basePrice: 70.00,
      maintenancePercentage: 18,
      getImplementationDays: (deviceCount: number) => {
        if (deviceCount < 1000) return 40;
        if (deviceCount < 5000) return 75;
        if (deviceCount < 10000) return 100;
        return 150;
      },
      getImplementationCost: (deviceCount: number) => {
        const days = vendorData.aruba.pricing.getImplementationDays(deviceCount);
        return days * 1800;
      },
      getFteRequired: (deviceCount: number) => {
        if (deviceCount < 1000) return 0.4;
        if (deviceCount < 5000) return 0.75;
        if (deviceCount < 10000) return 1.25;
        return 1.75;
      },
      getHardwareCost: (deviceCount: number) => {
        if (deviceCount < 1000) return 40000;
        if (deviceCount < 5000) return 90000;
        if (deviceCount < 10000) return 150000;
        return 250000;
      },
      riskReductionEffectiveness: 70,
      meanTimeToRespond: 105,
    },
    features: {
      cloudNative: 5,
      zeroTrust: 6,
      deploymentSpeed: 4,
      managementSimplicity: 5,
      scalability: 7,
      remoteAccess: 7,
      compliance: 8,
      costEffectiveness: 5,
      threatPrevention: 7,
      deviceDiscovery: 8,
      userExperience: 6,
      thirdPartyIntegration: 7
    },
    marketPosition: {
      marketShare: 18,
      customerSatisfaction: 4.0,
      analystRating: 4.0,
      yearsFounded: 2002,
      targetMarket: ['Enterprise', 'Education', 'Healthcare']
    },
    strengthsWeaknesses: {
      strengths: [
        'Strong wireless integration',
        'Extensive device profiling',
        'Solid policy management',
        'Good API integration options',
        'HP enterprise backing'
      ],
      weaknesses: [
        'Complex deployment architecture',
        'Moderate learning curve',
        'Limited cloud capabilities',
        'Resource-intensive management'
      ],
      bestFitFor: [
        'Existing HPE/Aruba customers',
        'Organizations with complex wireless deployments',
        'Education and healthcare sectors',
        'Mid to large enterprises'
      ],
      challenges: [
        'Cloud transition and SaaS delivery',
        'Simplifying management experience',
        'Reducing total cost of ownership'
      ]
    }
  },
  
  forescout: {
    id: 'forescout',
    name: 'Forescout',
    description: 'Device visibility',
    logo: process.env.NODE_ENV === 'production' ? '/UaXtXo/img/vendors/' : '/img/vendors/forescout-logo.png',
    deployment: 'on-premises',
    pricing: {
      model: 'perpetual',
      basePrice: 75.00,
      maintenancePercentage: 22,
      getImplementationDays: (deviceCount: number) => {
        if (deviceCount < 1000) return 50;
        if (deviceCount < 5000) return 90;
        if (deviceCount < 10000) return 130;
        return 180;
      },
      getImplementationCost: (deviceCount: number) => {
        const days = vendorData.forescout.pricing.getImplementationDays(deviceCount);
        return days * 1900;
      },
      getFteRequired: (deviceCount: number) => {
        if (deviceCount < 1000) return 0.5;
        if (deviceCount < 5000) return 0.8;
        if (deviceCount < 10000) return 1.3;
        return 2.0;
      },
      getHardwareCost: (deviceCount: number) => {
        if (deviceCount < 1000) return 45000;
        if (deviceCount < 5000) return 100000;
        if (deviceCount < 10000) return 180000;
        return 300000;
      },
      riskReductionEffectiveness: 72,
      meanTimeToRespond: 95,
    },
    features: {
      cloudNative: 4,
      zeroTrust: 7,
      deploymentSpeed: 3,
      managementSimplicity: 5,
      scalability: 8,
      remoteAccess: 4,
      compliance: 8,
      costEffectiveness: 4,
      threatPrevention: 9,
      deviceDiscovery: 10,
      userExperience: 5,
      thirdPartyIntegration: 8
    },
    marketPosition: {
      marketShare: 15,
      customerSatisfaction: 3.9,
      analystRating: 4.2,
      yearsFounded: 2000,
      targetMarket: ['Enterprise', 'Government', 'Critical Infrastructure']
    },
    strengthsWeaknesses: {
      strengths: [
        'Superior device discovery capabilities',
        'Excellent IoT/OT device visibility',
        'Strong integration ecosystem',
        'Advanced threat hunting',
        'Agentless architecture'
      ],
      weaknesses: [
        'High total cost of ownership',
        'Complex implementation',
        'Limited cloud options',
        'Resource-intensive management'
      ],
      bestFitFor: [
        'Large enterprises with diverse device types',
        'Critical infrastructure providers',
        'Organizations with significant IoT deployments',
        'Environments requiring detailed visibility'
      ],
      challenges: [
        'Simplifying deployment complexity',
        'Improving cloud capabilities',
        'Reducing management overhead'
      ]
    }
  },
  
  fortinac: {
    id: 'fortinac',
    name: 'FortiNAC',
    description: 'Fortinet NAC',
    logo: process.env.NODE_ENV === 'production' ? '/UaXtXo/img/vendors/' : '/img/vendors/fortinac-logo.png',
    deployment: 'on-premises',
    pricing: {
      model: 'perpetual',
      basePrice: 60.00,
      maintenancePercentage: 20,
      getImplementationDays: (deviceCount: number) => {
        if (deviceCount < 1000) return 35;
        if (deviceCount < 5000) return 70;
        if (deviceCount < 10000) return 100;
        return 140;
      },
      getImplementationCost: (deviceCount: number) => {
        const days = vendorData.fortinac.pricing.getImplementationDays(deviceCount);
        return days * 1700;
      },
      getFteRequired: (deviceCount: number) => {
        if (deviceCount < 1000) return 0.4;
        if (deviceCount < 5000) return 0.7;
        if (deviceCount < 10000) return 1.2;
        return 1.8;
      },
      getHardwareCost: (deviceCount: number) => {
        if (deviceCount < 1000) return 30000;
        if (deviceCount < 5000) return 75000;
        if (deviceCount < 10000) return 140000;
        return 220000;
      },
      riskReductionEffectiveness: 68,
      meanTimeToRespond: 110,
    },
    features: {
      cloudNative: 5,
      zeroTrust: 7,
      deploymentSpeed: 5,
      managementSimplicity: 6,
      scalability: 7,
      remoteAccess: 6,
      compliance: 7,
      costEffectiveness: 6,
      threatPrevention: 8,
      deviceDiscovery: 7,
      userExperience: 6,
      thirdPartyIntegration: 7
    },
    marketPosition: {
      marketShare: 8,
      customerSatisfaction: 3.8,
      analystRating: 3.9,
      yearsFounded: 2000,
      targetMarket: ['Enterprise', 'MidMarket', 'Government']
    },
    strengthsWeaknesses: {
      strengths: [
        'Strong Fortinet security fabric integration',
        'Good price-to-performance ratio',
        'Unified security management',
        'Automated response capabilities',
        'Improving cloud management'
      ],
      weaknesses: [
        'Limited features compared to specialized NAC vendors',
        'Less mature than leading competitors',
        'Integration challenges outside of Fortinet ecosystem',
        'Limited cloud-native capabilities'
      ],
      bestFitFor: [
        'Existing Fortinet customers',
        'Organizations seeking integrated security stack',
        'Medium enterprises with moderate complexity',
        'Price-sensitive security teams'
      ],
      challenges: [
        'Competing with specialized NAC vendors',
        'Expanding cloud capabilities',
        'Feature parity with market leaders'
      ]
    }
  },
  
  juniper: {
    id: 'juniper',
    name: 'Juniper Mist',
    description: 'AI-driven NAC',
    logo: process.env.NODE_ENV === 'production' ? '/UaXtXo/img/vendors/' : '/img/vendors/juniper-logo.png',
    deployment: 'hybrid',
    pricing: {
      model: 'hybrid',
      basePrice: 50.00,
      maintenancePercentage: 15,
      getImplementationDays: (deviceCount: number) => {
        if (deviceCount < 1000) return 30;
        if (deviceCount < 5000) return 60;
        if (deviceCount < 10000) return 90;
        return 130;
      },
      getImplementationCost: (deviceCount: number) => {
        const days = vendorData.juniper.pricing.getImplementationDays(deviceCount);
        return days * 1800;
      },
      getFteRequired: (deviceCount: number) => {
        if (deviceCount < 1000) return 0.3;
        if (deviceCount < 5000) return 0.6;
        if (deviceCount < 10000) return 1.0;
        return 1.5;
      },
      getHardwareCost: (deviceCount: number) => {
        if (deviceCount < 1000) return 20000;
        if (deviceCount < 5000) return 60000;
        if (deviceCount < 10000) return 100000;
        return 180000;
      },
      riskReductionEffectiveness: 75,
      meanTimeToRespond: 85,
    },
    features: {
      cloudNative: 7,
      zeroTrust: 8,
      deploymentSpeed: 6,
      managementSimplicity: 7,
      scalability: 8,
      remoteAccess: 7,
      compliance: 7,
      costEffectiveness: 7,
      threatPrevention: 7,
      deviceDiscovery: 8,
      userExperience: 8,
      thirdPartyIntegration: 7
    },
    marketPosition: {
      marketShare: 6,
      customerSatisfaction: 4.3,
      analystRating: 4.2,
      yearsFounded: 1996,
      targetMarket: ['Enterprise', 'Service Provider', 'Education']
    },
    strengthsWeaknesses: {
      strengths: [
        'Advanced AI-driven insights',
        'Strong wireless integration',
        'Good cloud management',
        'Innovative user experience',
        'Solid security architecture'
      ],
      weaknesses: [
        'Smaller market share than leaders',
        'Integration complexity with non-Juniper networks',
        'Partial cloud transition still in progress',
        'Less mature NAC specific capabilities'
      ],
      bestFitFor: [
        'Organizations valuing AI-driven insights',
        'Existing Juniper customers',
        'Companies focusing on user experience',
        'Education and healthcare institutions'
      ],
      challenges: [
        'Expanding market presence',
        'Competing with specialized NAC vendors',
        'Building comprehensive NAC features'
      ]
    }
  },
  
  extreme: {
    id: 'extreme',
    name: 'Extreme NAC',
    description: 'Network security',
    logo: process.env.NODE_ENV === 'production' ? '/UaXtXo/img/vendors/' : '/img/vendors/extreme-logo.png',
    deployment: 'on-premises',
    pricing: {
      model: 'perpetual',
      basePrice: 65.00,
      maintenancePercentage: 18,
      getImplementationDays: (deviceCount: number) => {
        if (deviceCount < 1000) return 38;
        if (deviceCount < 5000) return 75;
        if (deviceCount < 10000) return 110;
        return 150;
      },
      getImplementationCost: (deviceCount: number) => {
        const days = vendorData.extreme.pricing.getImplementationDays(deviceCount);
        return days * 1750;
      },
      getFteRequired: (deviceCount: number) => {
        if (deviceCount < 1000) return 0.45;
        if (deviceCount < 5000) return 0.8;
        if (deviceCount < 10000) return 1.3;
        return 1.8;
      },
      getHardwareCost: (deviceCount: number) => {
        if (deviceCount < 1000) return 35000;
        if (deviceCount < 5000) return 85000;
        if (deviceCount < 10000) return 150000;
        return 270000;
      },
      riskReductionEffectiveness: 70,
      meanTimeToRespond: 100,
    },
    features: {
      cloudNative: 5,
      zeroTrust: 7,
      deploymentSpeed: 5,
      managementSimplicity: 6,
      scalability: 8,
      remoteAccess: 6,
      compliance: 7,
      costEffectiveness: 6,
      threatPrevention: 7,
      deviceDiscovery: 8,
      userExperience: 6,
      thirdPartyIntegration: 7
    },
    marketPosition: {
      marketShare: 7,
      customerSatisfaction: 3.9,
      analystRating: 3.8,
      yearsFounded: 1996,
      targetMarket: ['Enterprise', 'Education', 'Healthcare']
    },
    strengthsWeaknesses: {
      strengths: [
        'Strong network integration',
        'Good wired/wireless integration',
        'Solid policy management',
        'Decent compliance capabilities',
        'Improving cloud management'
      ],
      weaknesses: [
        'Complex deployment model',
        'Limited cloud capabilities',
        'Management complexity',
        'More resource-intensive than cloud alternatives'
      ],
      bestFitFor: [
        'Existing Extreme Networks customers',
        'Organizations with on-premises preference',
        'Education and healthcare sectors',
        'Traditional enterprises'
      ],
      challenges: [
        'Cloud transition',
        'Competing with cloud-native solutions',
        'Simplifying management experience'
      ]
    }
  },
  
  securew2: {
    id: 'securew2',
    name: 'SecureW2',
    description: 'Cloud RADIUS',
    logo: process.env.NODE_ENV === 'production' ? '/UaXtXo/img/vendors/' : '/img/vendors/securew2-logo.png',
    deployment: 'cloud',
    pricing: {
      model: 'subscription',
      basePrice: 2.50,
      getImplementationDays: (deviceCount: number) => {
        if (deviceCount < 1000) return 20;
        if (deviceCount < 5000) return 30;
        if (deviceCount < 10000) return 45;
        return 60;
      },
      getImplementationCost: (deviceCount: number) => {
        const days = vendorData.securew2.pricing.getImplementationDays(deviceCount);
        return days * 1500;
      },
      getFteRequired: (deviceCount: number) => {
        if (deviceCount < 1000) return 0.2;
        if (deviceCount < 5000) return 0.4;
        if (deviceCount < 10000) return 0.7;
        return 1.0;
      },
      getHardwareCost: () => 0,
      riskReductionEffectiveness: 65,
      meanTimeToRespond: 70,
    },
    features: {
      cloudNative: 9,
      zeroTrust: 6,
      deploymentSpeed: 8,
      managementSimplicity: 8,
      scalability: 7,
      remoteAccess: 8,
      compliance: 6,
      costEffectiveness: 8,
      threatPrevention: 6,
      deviceDiscovery: 7,
      userExperience: 8,
      thirdPartyIntegration: 7
    },
    marketPosition: {
      marketShare: 3,
      customerSatisfaction: 4.4,
      analystRating: 3.6,
      yearsFounded: 2013,
      targetMarket: ['SMB', 'Education', 'Mid-Market']
    },
    strengthsWeaknesses: {
      strengths: [
        'Cloud-native architecture',
        'Simple deployment model',
        'Good ease of use',
        'Solid BYOD support',
        'Flexible identity provider integration'
      ],
      weaknesses: [
        'Limited enterprise-class features',
        'Smaller company and market share',
        'More focused on authentication than full NAC',
        'Less comprehensive compliance capabilities'
      ],
      bestFitFor: [
        'Small to medium businesses',
        'Education institutions',
        'Organizations prioritizing cloud migration',
        'Environments needing simpler management'
      ],
      challenges: [
        'Expanding enterprise capabilities',
        'Competing with full-featured NAC vendors',
        'Building market presence'
      ]
    }
  },
  
  arista: {
    id: 'arista',
    name: 'Arista Agni',
    description: 'Network control',
    logo: process.env.NODE_ENV === 'production' ? '/UaXtXo/img/vendors/' : '/img/vendors/arista-logo.png',
    deployment: 'on-premises',
    pricing: {
      model: 'perpetual',
      basePrice: 65.00,
      maintenancePercentage: 18,
      getImplementationDays: (deviceCount: number) => {
        if (deviceCount < 1000) return 40;
        if (deviceCount < 5000) return 80;
        if (deviceCount < 10000) return 110;
        return 160;
      },
      getImplementationCost: (deviceCount: number) => {
        const days = vendorData.arista.pricing.getImplementationDays(deviceCount);
        return days * 1800;
      },
      getFteRequired: (deviceCount: number) => {
        if (deviceCount < 1000) return 0.4;
        if (deviceCount < 5000) return 0.75;
        if (deviceCount < 10000) return 1.3;
        return 1.8;
      },
      getHardwareCost: (deviceCount: number) => {
        if (deviceCount < 1000) return 35000;
        if (deviceCount < 5000) return 85000;
        if (deviceCount < 10000) return 150000;
        return 260000;
      },
      riskReductionEffectiveness: 70,
      meanTimeToRespond: 100,
    },
    features: {
      cloudNative: 5,
      zeroTrust: 7,
      deploymentSpeed: 4,
      managementSimplicity: 5,
      scalability: 8,
      remoteAccess: 6,
      compliance: 7,
      costEffectiveness: 6,
      threatPrevention: 7,
      deviceDiscovery: 8,
      userExperience: 5,
      thirdPartyIntegration: 6
    },
    marketPosition: {
      marketShare: 4,
      customerSatisfaction: 3.8,
      analystRating: 3.7,
      yearsFounded: 2004,
      targetMarket: ['Enterprise', 'DataCenter', 'Service Provider']
    },
    strengthsWeaknesses: {
      strengths: [
        'Strong network infrastructure integration',
        'Good scalability features',
        'Solid data center capabilities',
        'Deep network visibility',
        'Quality enterprise support'
      ],
      weaknesses: [
        'Complex deployment model',
        'Limited cloud capabilities',
        'Steeper learning curve',
        'Less intuitive user interface'
      ],
      bestFitFor: [
        'Existing Arista customers',
        'Data center-focused organizations',
        'Large enterprises with complex networks',
        'Technical network teams'
      ],
      challenges: [
        'Broadening beyond network infrastructure',
        'Simplifying management experience',
        'Expanding cloud capabilities'
      ]
    }
  },
  
  foxpass: {
    id: 'foxpass',
    name: 'Foxpass',
    description: 'Cloud RADIUS/LDAP',
    logo: process.env.NODE_ENV === 'production' ? '/UaXtXo/img/vendors/' : '/img/vendors/foxpass-logo.png',
    deployment: 'cloud',
    pricing: {
      model: 'subscription',
      basePrice: 2.00,
      getImplementationDays: (deviceCount: number) => {
        if (deviceCount < 1000) return 15;
        if (deviceCount < 5000) return 25;
        if (deviceCount < 10000) return 40;
        return 60;
      },
      getImplementationCost: (deviceCount: number) => {
        const days = vendorData.foxpass.pricing.getImplementationDays(deviceCount);
        return days * 1400;
      },
      getFteRequired: (deviceCount: number) => {
        if (deviceCount < 1000) return 0.2;
        if (deviceCount < 5000) return 0.35;
        if (deviceCount < 10000) return 0.6;
        return 0.9;
      },
      getHardwareCost: () => 0,
      riskReductionEffectiveness: 60,
      meanTimeToRespond: 75,
    },
    features: {
      cloudNative: 9,
      zeroTrust: 6,
      deploymentSpeed: 8,
      managementSimplicity: 7,
      scalability: 7,
      remoteAccess: 7,
      compliance: 5,
      costEffectiveness: 8,
      threatPrevention: 5,
      deviceDiscovery: 6,
      userExperience: 7,
      thirdPartyIntegration: 7
    },
    marketPosition: {
      marketShare: 2,
      customerSatisfaction: 4.3,
      analystRating: 3.4,
      yearsFounded: 2014,
      targetMarket: ['SMB', 'Technology', 'Startups']
    },
    strengthsWeaknesses: {
      strengths: [
        'True cloud-native architecture',
        'Simple deployment and management',
        'Developer-friendly approach',
        'Good API support',
        'Straightforward pricing'
      ],
      weaknesses: [
        'Limited enterprise-class features',
        'Smaller market presence',
        'Less comprehensive than full NAC solutions',
        'Fewer compliance capabilities'
      ],
      bestFitFor: [
        'Small to medium businesses',
        'Technology startups',
        'Developer-focused organizations',
        'Cloud-first companies'
      ],
      challenges: [
        'Building enterprise capabilities',
        'Expanding beyond core authentication',
        'Growing market share'
      ]
    }
  },
  
  microsoft: {
    id: 'microsoft',
    name: 'Microsoft NPS',
    description: 'Windows Server NAC',
    logo: process.env.NODE_ENV === 'production' ? '/UaXtXo/img/vendors/' : '/img/vendors/microsoft-logo.png',
    deployment: 'on-premises',
    pricing: {
      model: 'hybrid',
      basePrice: 10.00, // Windows Server CAL cost per device
      maintenancePercentage: 25,
      getImplementationDays: (deviceCount: number) => {
        if (deviceCount < 1000) return 25;
        if (deviceCount < 5000) return 50;
        if (deviceCount < 10000) return 90;
        return 140;
      },
      getImplementationCost: (deviceCount: number) => {
        const days = vendorData.microsoft.pricing.getImplementationDays(deviceCount);
        return days * 1600;
      },
      getFteRequired: (deviceCount: number) => {
        if (deviceCount < 1000) return 0.4;
        if (deviceCount < 5000) return 0.8;
        if (deviceCount < 10000) return 1.4;
        return 2.0;
      },
      getHardwareCost: (deviceCount: number) => {
        if (deviceCount < 1000) return 15000; // Windows Server costs
        if (deviceCount < 5000) return 40000;
        if (deviceCount < 10000) return 80000;
        return 150000;
      },
      riskReductionEffectiveness: 55,
      meanTimeToRespond: 120,
    },
    features: {
      cloudNative: 3,
      zeroTrust: 5,
      deploymentSpeed: 4,
      managementSimplicity: 4,
      scalability: 7,
      remoteAccess: 5,
      compliance: 6,
      costEffectiveness: 7,
      threatPrevention: 5,
      deviceDiscovery: 6,
      userExperience: 5,
      thirdPartyIntegration: 7
    },
    marketPosition: {
      marketShare: 12,
      customerSatisfaction: 3.5,
      analystRating: 3.2,
      yearsFounded: 1975,
      targetMarket: ['Enterprise', 'SMB', 'Government']
    },
    strengthsWeaknesses: {
      strengths: [
        'Deep Windows integration',
        'Existing admin familiarity',
        'Widespread installed base',
        'Lower incremental cost for Windows shops',
        'Active Directory integration'
      ],
      weaknesses: [
        'Limited functionality compared to dedicated NAC',
        'Minimal non-Windows device support',
        'Complex configuration',
        'Basic management capabilities',
        'Limited security controls'
      ],
      bestFitFor: [
        'Windows-centric organizations',
        'Cost-sensitive environments',
        'Small to medium businesses',
        'Organizations with minimal NAC requirements'
      ],
      challenges: [
        'Supporting modern heterogeneous environments',
        'Competing with dedicated NAC solutions',
        'Providing comprehensive security controls'
      ]
    }
  },
  
  "no-nac": {
    id: 'no-nac',
    name: 'No NAC',
    description: 'High risk baseline',
    badge: 'High Risk',
    badgeClass: 'badge-danger',
    logo: process.env.NODE_ENV === 'production' ? '/UaXtXo/img/vendors/' : '/img/vendors/no-nac-icon.png',
    deployment: 'on-premises',
    pricing: {
      model: 'perpetual',
      basePrice: 0,
      getImplementationDays: () => 0,
      getImplementationCost: () => 0,
      getFteRequired: (deviceCount: number) => {
        // Still need IT staff to manage network access manually
        if (deviceCount < 1000) return 0.25;
        if (deviceCount < 5000) return 0.5;
        if (deviceCount < 10000) return 1.0;
        return 2.0;
      },
      getHardwareCost: () => 0,
      riskReductionEffectiveness: 0,
      meanTimeToRespond: 480, // 8 hours average response time
    },
    features: {
      cloudNative: 0,
      zeroTrust: 0,
      deploymentSpeed: 10, // No deployment needed
      managementSimplicity: 1, // Manual management is complex
      scalability: 1,
      remoteAccess: 2,
      compliance: 1,
      costEffectiveness: 5, // Low initial cost but high risk
      threatPrevention: 1,
      deviceDiscovery: 2,
      userExperience: 3,
      thirdPartyIntegration: 1
    },
    marketPosition: {
      marketShare: 30, // Still many organizations without NAC
      customerSatisfaction: 2.0,
      analystRating: 1.0,
      yearsFounded: 0,
      targetMarket: ['SMB', 'Cost-sensitive', 'Low-security-priority']
    },
    strengthsWeaknesses: {
      strengths: [
        'No upfront license costs',
        'No implementation time',
        'No dedicated hardware required',
        'Simplicity for very small networks'
      ],
      weaknesses: [
        'No automated security controls',
        'No visibility into connected devices',
        'Significant security risk exposure',
        'Manual incident response',
        'Non-compliant with most regulations',
        'High operational burden for IT staff'
      ],
      bestFitFor: [
        'Very small organizations',
        'Low-value networks with minimal risk',
        'Environments with no compliance requirements',
        'Networks with no sensitive data'
      ],
      challenges: [
        'Security incident prevention',
        'Compliance adherence',
        'Visibility into network assets',
        'Automated security control'
      ]
    }
  }
};

// Industry Risk Profiles
export interface IndustryRiskProfile {
  name: string;
  baseRiskLevel: 'standard' | 'elevated' | 'high' | 'regulated';
  complianceRequirements: string[];
  breachCostPerRecord: number;
  recommendedControls: string[];
  incidentProbability: number;
  averageIncidentCost: number;
}

export const industryRiskProfiles: Record<string, IndustryRiskProfile> = {
  healthcare: {
    name: 'Healthcare',
    baseRiskLevel: 'high',
    complianceRequirements: ['hipaa', 'pci'],
    breachCostPerRecord: 429, // $429 per record (IBM Cost of Data Breach Report)
    recommendedControls: [
      'Multi-factor authentication',
      'Device health checks',
      'Network segmentation',
      'Continuous monitoring'
    ],
    incidentProbability: 0.32, // 32% annual probability
    averageIncidentCost: 9.23e6 // $9.23 million average
  },
  financial: {
    name: 'Financial Services',
    baseRiskLevel: 'regulated',
    complianceRequirements: ['pci', 'sox', 'gdpr', 'nist'],
    breachCostPerRecord: 406, // $406 per record
    recommendedControls: [
      'Microsegmentation',
      'Continuous authentication',
      'Granular access control',
      'Real-time monitoring and response'
    ],
    incidentProbability: 0.35, // 35% annual probability
    averageIncidentCost: 5.97e6 // $5.97 million average
  },
  education: {
    name: 'Education',
    baseRiskLevel: 'standard',
    complianceRequirements: ['ferpa', 'gdpr'],
    breachCostPerRecord: 237, // $237 per record
    recommendedControls: [
      'BYOD support',
      'Guest network isolation',
      'Basic device authentication',
      'User role-based access'
    ],
    incidentProbability: 0.43, // 43% annual probability
    averageIncidentCost: 3.86e6 // $3.86 million average
  },
  government: {
    name: 'Government',
    baseRiskLevel: 'high',
    complianceRequirements: ['nist', 'cmmc', 'gdpr'],
    breachCostPerRecord: 402, // $402 per record
    recommendedControls: [
      'Zero Trust architecture',
      'Continuous monitoring',
      'Full device visibility',
      'Automated quarantine'
    ],
    incidentProbability: 0.28, // 28% annual probability
    averageIncidentCost: 9.48e6 // $9.48 million average
  },
  manufacturing: {
    name: 'Manufacturing',
    baseRiskLevel: 'elevated',
    complianceRequirements: ['iso', 'nist'],
    breachCostPerRecord: 273, // $273 per record
    recommendedControls: [
      'IoT device management',
      'OT network segmentation',
      'Basic authentication',
      'Compliance reporting'
    ],
    incidentProbability: 0.39, // 39% annual probability
    averageIncidentCost: 4.47e6 // $4.47 million average
  },
  retail: {
    name: 'Retail',
    baseRiskLevel: 'elevated',
    complianceRequirements: ['pci', 'gdpr'],
    breachCostPerRecord: 243, // $243 per record
    recommendedControls: [
      'POS device security',
      'Customer data protection',
      'Store network isolation',
      'Wireless security'
    ],
    incidentProbability: 0.45, // 45% annual probability
    averageIncidentCost: 3.28e6 // $3.28 million average
  },
  technology: {
    name: 'Technology',
    baseRiskLevel: 'elevated',
    complianceRequirements: ['iso', 'gdpr', 'sox'],
    breachCostPerRecord: 311, // $311 per record
    recommendedControls: [
      'Developer access controls',
      'Cloud resource protection',
      'Continuous authentication',
      'API security'
    ],
    incidentProbability: 0.37, // 37% annual probability
    averageIncidentCost: 5.04e6 // $5.04 million average
  },
  energy: {
    name: 'Energy & Utilities',
    baseRiskLevel: 'high',
    complianceRequirements: ['nist', 'iso'],
    breachCostPerRecord: 351, // $351 per record
    recommendedControls: [
      'Critical infrastructure protection',
      'SCADA network isolation',
      'Advanced monitoring',
      'Regulatory compliance automation'
    ],
    incidentProbability: 0.31, // 31% annual probability
    averageIncidentCost: 6.39e6 // $6.39 million average
  }
};

// Compliance Framework Details
export interface ComplianceFramework {
  name: string;
  fullName: string;
  description: string;
  requirements: string[];
  controlAreas: string[];
  applicability: string[];
  penalties: string;
  nacRelevance: number; // 1-10 scale of how important NAC is for this framework
}

export const complianceFrameworks: Record<string, ComplianceFramework> = {
  pci: {
    name: 'PCI DSS',
    fullName: 'Payment Card Industry Data Security Standard',
    description: 'Standard for organizations that handle credit card data',
    requirements: [
      'Network segmentation',
      'Access control',
      'Vulnerability management',
      'Regular testing'
    ],
    controlAreas: [
      'Build and Maintain a Secure Network',
      'Protect Cardholder Data',
      'Maintain a Vulnerability Management Program',
      'Implement Strong Access Control Measures',
      'Regularly Monitor and Test Networks',
      'Maintain an Information Security Policy'
    ],
    applicability: [
      'Any organization that stores, processes, or transmits cardholder data',
      'Merchants',
      'Financial institutions',
      'Service providers'
    ],
    penalties: 'Fines of $5,000 to $100,000 per month, increased transaction fees, or revocation of card processing privileges',
    nacRelevance: 9
  },
  hipaa: {
    name: 'HIPAA',
    fullName: 'Health Insurance Portability and Accountability Act',
    description: 'Protects sensitive patient health information',
    requirements: [
      'Access controls',
      'Audit controls',
      'Integrity controls',
      'Transmission security'
    ],
    controlAreas: [
      'Administrative Safeguards',
      'Physical Safeguards',
      'Technical Safeguards',
      'Organizational Requirements',
      'Policies and Procedures and Documentation Requirements'
    ],
    applicability: [
      'Healthcare providers',
      'Health plans',
      'Healthcare clearinghouses',
      'Business associates'
    ],
    penalties: 'Tiered civil penalties from $100 to $50,000 per violation, with an annual maximum of $1.5 million',
    nacRelevance: 8
  },
  nist: {
    name: 'NIST 800-53',
    fullName: 'NIST Special Publication 800-53',
    description: 'Security controls for federal information systems',
    requirements: [
      'Access control',
      'Audit and accountability',
      'Identification and authentication',
      'System and communications protection'
    ],
    controlAreas: [
      'Access Control',
      'Awareness and Training',
      'Audit and Accountability',
      'Security Assessment and Authorization',
      'Configuration Management',
      'Contingency Planning',
      'Identification and Authentication',
      'Incident Response',
      'Maintenance',
      'Media Protection',
      'Physical and Environmental Protection',
      'Planning',
      'Personnel Security',
      'Risk Assessment',
      'System and Services Acquisition',
      'System and Communications Protection',
      'System and Information Integrity'
    ],
    applicability: [
      'Federal agencies',
      'Government contractors',
      'Organizations seeking federal approval'
    ],
    penalties: 'Federal funding impacts, contract loss, and regulatory actions for non-compliance',
    nacRelevance: 9
  },
  gdpr: {
    name: 'GDPR',
    fullName: 'General Data Protection Regulation',
    description: 'EU regulation on data protection and privacy',
    requirements: [
      'Data access controls',
      'Data protection by design',
      'Breach notification',
      'Right to be forgotten'
    ],
    controlAreas: [
      'Lawfulness, Fairness and Transparency',
      'Purpose Limitation',
      'Data Minimization',
      'Accuracy',
      'Storage Limitation',
      'Integrity and Confidentiality',
      'Accountability'
    ],
    applicability: [
      'Any organization processing EU resident data',
      'Organizations with EU establishment',
      'Organizations offering goods/services to EU residents',
      'Organizations monitoring behavior of EU residents'
    ],
    penalties: 'Up to €20 million or 4% of global annual revenue, whichever is higher',
    nacRelevance: 7
  },
  iso: {
    name: 'ISO 27001',
    fullName: 'International Organization for Standardization 27001',
    description: 'International standard for information security management',
    requirements: [
      'Asset management',
      'Access control',
      'Cryptography',
      'Physical security'
    ],
    controlAreas: [
      'Information Security Policies',
      'Organization of Information Security',
      'Human Resource Security',
      'Asset Management',
      'Access Control',
      'Cryptography',
      'Physical and Environmental Security',
      'Operations Security',
      'Communications Security',
      'System Acquisition, Development and Maintenance',
      'Supplier Relationships',
      'Information Security Incident Management',
      'Information Security Aspects of Business Continuity Management',
      'Compliance'
    ],
    applicability: [
      'Organizations seeking certification',
      'Global enterprises',
      'Regulated industries',
      'Service providers'
    ],
    penalties: 'Loss of certification, potential contract losses, reputational damage',
    nacRelevance: 8
  },
  cmmc: {
    name: 'CMMC',
    fullName: 'Cybersecurity Maturity Model Certification',
    description: 'Certification program for defense contractors',
    requirements: [
      'Access control',
      'Asset management',
      'Audit and accountability',
      'Security assessment'
    ],
    controlAreas: [
      'Access Control',
      'Asset Management',
      'Audit and Accountability',
      'Awareness and Training',
      'Configuration Management',
      'Identification and Authentication',
      'Incident Response',
      'Maintenance',
      'Media Protection',
      'Personnel Security',
      'Physical Protection',
      'Recovery',
      'Risk Management',
      'Security Assessment',
      'Situational Awareness',
      'System and Communications Protection',
      'System and Information Integrity'
    ],
    applicability: [
      'Defense contractors',
      'Defense supply chain companies',
      'DoD subcontractors'
    ],
    penalties: 'Loss of defense contracts, disqualification from DoD procurement',
    nacRelevance: 10
  },
  ferpa: {
    name: 'FERPA',
    fullName: 'Family Educational Rights and Privacy Act',
    description: 'Protects the privacy of student education records',
    requirements: [
      'Access control',
      'Disclosure limitations',
      'Record management',
      'Parental/student rights'
    ],
    controlAreas: [
      'Parental/Eligible Student Rights',
      'Access Control',
      'Disclosure Limitations',
      'Amendment Procedures',
      'Annual Notification'
    ],
    applicability: [
      'Educational institutions receiving federal funding',
      'Schools',
      'Colleges',
      'Universities'
    ],
    penalties: 'Loss of federal funding for educational institutions',
    nacRelevance: 6
  },
  sox: {
    name: 'SOX',
    fullName: 'Sarbanes-Oxley Act',
    description: 'Requires public companies to have proper internal controls',
    requirements: [
      'Access controls',
      'Change management',
      'Segregation of duties',
      'IT general controls'
    ],
    controlAreas: [
      'Control Environment',
      'Risk Assessment',
      'Control Activities',
      'Information and Communication',
      'Monitoring Activities'
    ],
    applicability: [
      'Public companies',
      'Accounting firms serving public companies',
      'Management and auditors of public companies'
    ],
    penalties: 'Fines up to $5 million, imprisonment up to 20 years for executives',
    nacRelevance: 7
  }
};
