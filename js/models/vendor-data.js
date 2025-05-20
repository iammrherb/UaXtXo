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
      