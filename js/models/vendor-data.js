/**
 * Vendor data model for Portnox Total Cost Analyzer
 * Contains real data for NAC vendor comparison
 */
const VENDORS = {
  portnox: {
    id: 'portnox',
    name: 'Portnox Cloud',
    description: 'Cloud-native NAC',
    logo: 'img/vendors/portnox-logo.png',
    badge: {
      text: 'Best Value',
      class: 'badge-primary'
    },
    architecture: 'cloud',
    basePrice: {
      small: 3.0,    // Per device per month
      medium: 2.7,   // Per device per month
      large: 2.4,    // Per device per month
      enterprise: 2.1 // Per device per month
    },
    implementation: {
      timeInDays: 21,
      costPercentage: 10  // % of first year subscription
    },
    fte: {
      required: 0.25,  // FTE allocation per year
    },
    maintenance: {
      percentage: 0,  // Included in subscription
      downtime: 0.5,  // Hours per year
    },
    security: {
      zeroTrustScore: 9.5,    // Out of 10
      deviceAuthScore: 9.7,   // Out of 10
      riskAssessmentScore: 9.6,// Out of 10
      remediationSpeed: 4,    // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: true,
      ferpa: true,
      sox: true
    },
    features: {
      cloudIntegration: true,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: true
    }
  },
  cisco: {
    id: 'cisco',
    name: 'Cisco ISE',
    description: 'Enterprise NAC',
    logo: 'img/vendors/cisco-logo.png',
    badge: {
      text: 'Complex',
      class: 'badge-warning'
    },
    architecture: 'on-premises',
    basePrice: {
      small: 65,     // Per device - perpetual license
      medium: 60,    // Per device - perpetual license
      large: 55,     // Per device - perpetual license
      enterprise: 50 // Per device - perpetual license
    },
    hardware: {
      small: 75000,   // Base hardware cost
      medium: 150000, // Base hardware cost
      large: 300000,  // Base hardware cost
      enterprise: 500000 // Base hardware cost
    },
    implementation: {
      timeInDays: 90,
      costPercentage: 40  // % of license cost
    },
    fte: {
      required: 1.5,  // FTE allocation per year
    },
    maintenance: {
      percentage: 18, // Yearly maintenance as % of license
      downtime: 8,    // Hours per year
    },
    security: {
      zeroTrustScore: 8.0,    // Out of 10
      deviceAuthScore: 8.5,   // Out of 10
      riskAssessmentScore: 8.0,// Out of 10
      remediationSpeed: 10,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: true,
      ferpa: true,
      sox: true
    },
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false
    }
  },
  aruba: {
    id: 'aruba',
    name: 'Aruba ClearPass',
    description: 'Policy manager',
    logo: 'img/vendors/aruba-logo.png',
    architecture: 'on-premises',
    basePrice: {
      small: 55,     // Per device - perpetual license
      medium: 50,    // Per device - perpetual license
      large: 45,     // Per device - perpetual license
      enterprise: 40 // Per device - perpetual license
    },
    hardware: {
      small: 60000,   // Base hardware cost
      medium: 120000, // Base hardware cost
      large: 240000,  // Base hardware cost
      enterprise: 400000 // Base hardware cost
    },
    implementation: {
      timeInDays: 60,
      costPercentage: 35  // % of license cost
    },
    fte: {
      required: 1.0,  // FTE allocation per year
    },
    maintenance: {
      percentage: 20, // Yearly maintenance as % of license
      downtime: 6,    // Hours per year
    },
    security: {
      zeroTrustScore: 7.5,    // Out of 10
      deviceAuthScore: 8.0,   // Out of 10
      riskAssessmentScore: 7.5,// Out of 10
      remediationSpeed: 12,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: true,
      ferpa: true,
      sox: true
    },
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false
    }
  },
  forescout: {
    id: 'forescout',
    name: 'Forescout',
    description: 'Device visibility',
    logo: 'img/vendors/forescout-logo.png',
    architecture: 'on-premises',
    basePrice: {
      small: 60,     // Per device - perpetual license
      medium: 55,    // Per device - perpetual license
      large: 50,     // Per device - perpetual license
      enterprise: 45 // Per device - perpetual license
    },
    hardware: {
      small: 65000,   // Base hardware cost
      medium: 130000, // Base hardware cost
      large: 260000,  // Base hardware cost
      enterprise: 450000 // Base hardware cost
    },
    implementation: {
      timeInDays: 70,
      costPercentage: 40  // % of license cost
    },
    fte: {
      required: 1.0,  // FTE allocation per year
    },
    maintenance: {
      percentage: 20, // Yearly maintenance as % of license
      downtime: 7,    // Hours per year
    },
    security: {
      zeroTrustScore: 7.0,    // Out of 10
      deviceAuthScore: 9.0,   // Out of 10
      riskAssessmentScore: 8.5,// Out of 10
      remediationSpeed: 15,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: true,
      ferpa: true,
      sox: false
    },
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false
    }
  },
  fortinac: {
    id: 'fortinac',
    name: 'FortiNAC',
    description: 'Fortinet NAC',
    logo: 'img/vendors/fortinac-logo.png',
    architecture: 'on-premises',
    basePrice: {
      small: 50,     // Per device - perpetual license
      medium: 45,    // Per device - perpetual license
      large: 40,     // Per device - perpetual license
      enterprise: 35 // Per device - perpetual license
    },
    hardware: {
      small: 55000,   // Base hardware cost
      medium: 110000, // Base hardware cost
      large: 220000,  // Base hardware cost
      enterprise: 380000 // Base hardware cost
    },
    implementation: {
      timeInDays: 60,
      costPercentage: 35  // % of license cost
    },
    fte: {
      required: 0.9,  // FTE allocation per year
    },
    maintenance: {
      percentage: 18, // Yearly maintenance as % of license
      downtime: 8,    // Hours per year
    },
    security: {
      zeroTrustScore: 7.5,    // Out of 10
      deviceAuthScore: 8.0,   // Out of 10
      riskAssessmentScore: 7.5,// Out of 10
      remediationSpeed: 14,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: false,
      ferpa: true,
      sox: true
    },
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false
    }
  },
  juniper: {
    id: 'juniper',
    name: 'Juniper Mist',
    description: 'AI-driven NAC',
    logo: 'img/vendors/juniper-logo.png',
    architecture: 'hybrid',
    basePrice: {
      small: 5.0,     // Per device per month
      medium: 4.5,    // Per device per month
      large: 4.0,     // Per device per month
      enterprise: 3.5 // Per device per month
    },
    hardware: {
      small: 20000,   // Base hardware cost
      medium: 40000,  // Base hardware cost
      large: 80000,   // Base hardware cost
      enterprise: 150000 // Base hardware cost
    },
    implementation: {
      timeInDays: 35,
      costPercentage: 20  // % of first year subscription
    },
    fte: {
      required: 0.5,  // FTE allocation per year
    },
    maintenance: {
      percentage: 0,  // Included in subscription
      downtime: 2,    // Hours per year
    },
    security: {
      zeroTrustScore: 8.5,    // Out of 10
      deviceAuthScore: 8.5,   // Out of 10
      riskAssessmentScore: 9.0,// Out of 10
      remediationSpeed: 8,    // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: false,
      ferpa: true,
      sox: false
    },
    features: {
      cloudIntegration: true,
      legacyDevices: false,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: true
    }
  },
  securew2: {
    id: 'securew2',
    name: 'SecureW2',
    description: 'Cloud RADIUS',
    logo: 'img/vendors/securew2-logo.png',
    architecture: 'cloud',
    basePrice: {
      small: 4.0,     // Per device per month
      medium: 3.7,    // Per device per month
      large: 3.4,     // Per device per month
      enterprise: 3.1 // Per device per month
    },
    implementation: {
      timeInDays: 28,
      costPercentage: 15  // % of first year subscription
    },
    fte: {
      required: 0.4,  // FTE allocation per year
    },
    maintenance: {
      percentage: 0,  // Included in subscription
      downtime: 1,    // Hours per year
    },
    security: {
      zeroTrustScore: 8.0,    // Out of 10
      deviceAuthScore: 8.0,   // Out of 10
      riskAssessmentScore: 7.5,// Out of 10
      remediationSpeed: 10,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: false,
      ferpa: true,
      sox: false
    },
    features: {
      cloudIntegration: true,
      legacyDevices: false,
      byod: true,
      iot: false,
      wireless: true,
      remoteUsers: true
    }
  },
  microsoft: {
    id: 'microsoft',
    name: 'Microsoft NPS',
    description: 'Windows Server NAC',
    logo: 'img/vendors/microsoft-logo.png',
    architecture: 'on-premises',
    basePrice: {
      small: 15,     // Per device - Windows Server CAL
      medium: 14,    // Per device - Windows Server CAL
      large: 13,     // Per device - Windows Server CAL
      enterprise: 12 // Per device - Windows Server CAL
    },
    hardware: {
      small: 20000,   // Base hardware cost
      medium: 40000,  // Base hardware cost
      large: 80000,   // Base hardware cost
      enterprise: 150000 // Base hardware cost
    },
    implementation: {
      timeInDays: 40,
      costPercentage: 30  // % of license cost
    },
    fte: {
      required: 0.7,  // FTE allocation per year
    },
    maintenance: {
      percentage: 16, // Yearly maintenance as % of license
      downtime: 12,   // Hours per year
    },
    security: {
      zeroTrustScore: 6.0,    // Out of 10
      deviceAuthScore: 6.5,   // Out of 10
      riskAssessmentScore: 5.5,// Out of 10
      remediationSpeed: 30,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: false,
      iso: true,
      cmmc: false,
      ferpa: true,
      sox: false
    },
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: false,
      iot: false,
      wireless: true,
      remoteUsers: false
    }
  },
  arista: {
    id: 'arista',
    name: 'Arista Agni',
    description: 'Network control',
    logo: 'img/vendors/arista-logo.png',
    architecture: 'on-premises',
    basePrice: {
      small: 52,     // Per device - perpetual license
      medium: 48,    // Per device - perpetual license
      large: 44,     // Per device - perpetual license
      enterprise: 40 // Per device - perpetual license
    },
    hardware: {
      small: 60000,   // Base hardware cost
      medium: 120000, // Base hardware cost
      large: 240000,  // Base hardware cost
      enterprise: 400000 // Base hardware cost
    },
    implementation: {
      timeInDays: 65,
      costPercentage: 35  // % of license cost
    },
    fte: {
      required: 1.0,  // FTE allocation per year
    },
    maintenance: {
      percentage: 18, // Yearly maintenance as % of license
      downtime: 7,    // Hours per year
    },
    security: {
      zeroTrustScore: 7.0,    // Out of 10
      deviceAuthScore: 7.5,   // Out of 10
      riskAssessmentScore: 7.0,// Out of 10
      remediationSpeed: 18,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: false,
      ferpa: true,
      sox: false
    },
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false
    }
  },
  foxpass: {
    id: 'foxpass',
    name: 'Foxpass',
    description: 'Cloud RADIUS/LDAP',
    logo: 'img/vendors/foxpass-logo.png',
    architecture: 'cloud',
    basePrice: {
      small: 3.5,     // Per device per month
      medium: 3.2,    // Per device per month
      large: 2.9,     // Per device per month
      enterprise: 2.6 // Per device per month
    },
    implementation: {
      timeInDays: 25,
      costPercentage: 15  // % of first year subscription
    },
    fte: {
      required: 0.3,  // FTE allocation per year
    },
    maintenance: {
      percentage: 0,  // Included in subscription
      downtime: 2,    // Hours per year
    },
    security: {
      zeroTrustScore: 7.5,    // Out of 10
      deviceAuthScore: 7.0,   // Out of 10
      riskAssessmentScore: 6.5,// Out of 10
      remediationSpeed: 12,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: false,
      gdpr: true,
      iso: false,
      cmmc: false,
      ferpa: true,
      sox: false
    },
    features: {
      cloudIntegration: true,
      legacyDevices: false,
      byod: true,
      iot: false,
      wireless: true,
      remoteUsers: true
    }
  },
  "no-nac": {
    id: 'no-nac',
    name: 'No NAC',
    description: 'High risk baseline',
    logo: 'img/vendors/no-nac-icon.png',
    badge: {
      text: 'High Risk',
      class: 'badge-danger'
    },
    architecture: 'none',
    basePrice: {
      small: 0,
      medium: 0,
      large: 0,
      enterprise: 0
    },
    implementation: {
      timeInDays: 0,
      costPercentage: 0
    },
    fte: {
      required: 0.2,  // Still requires some network security management
    },
    maintenance: {
      percentage: 0,
      downtime: 24,   // Increased downtime due to security incidents
    },
    security: {
      zeroTrustScore: 1.0,    // Out of 10
      deviceAuthScore: 2.0,   // Out of 10
      riskAssessmentScore: 1.5,// Out of 10
      remediationSpeed: 180,  // Minutes
    },
    compliance: {
      pci: false,
      hipaa: false,
      nist: false,
      gdpr: false,
      iso: false,
      cmmc: false,
      ferpa: false,
      sox: false
    },
    features: {
      cloudIntegration: false,
      legacyDevices: false,
      byod: false,
      iot: false,
      wireless: false,
      remoteUsers: false
    }
  }
};

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VENDORS };
}
