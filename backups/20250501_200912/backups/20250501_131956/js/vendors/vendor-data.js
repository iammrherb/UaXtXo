/**
 * Vendor data and comparison information
 */

// Make sure vendorData is globally accessible
window.vendorData = {
  cisco: {
    name: 'Cisco ISE',
    logo: 'img/cisco-logo.png',
    cloudBased: false,
    description: 'Enterprise-grade on-premises NAC solution with extensive Cisco ecosystem integration',
    small: {
      initialHardware: 75000,
      annualMaintenance: 25000,
      annualLicensing: 40000,
      networkRedesign: 15000,
      implementation: 35000,
      training: 10000,
      annualDowntime: 24,
      // FTE allocation by role (fraction of full-time)
      fteAllocation: {
        networkAdmin: 0.4,
        securityAdmin: 0.3,
        systemAdmin: 0.2,
        helpDesk: 0.1
      },
      // Implementation timeline in days
      implementationTimeline: {
        planning: 14,
        hardwareDeployment: 10, 
        initialConfiguration: 15,
        testing: 21,
        policyDefinition: 14,
        pilotDeployment: 10,
        fullDeployment: 30,
        postDeploymentTuning: 15
      }
    },
    medium: {
      initialHardware: 150000,
      annualMaintenance: 50000,
      annualLicensing: 100000,
      networkRedesign: 25000,
      implementation: 60000,
      training: 15000,
      annualDowntime: 36,
      fteAllocation: {
        networkAdmin: 0.6,
        securityAdmin: 0.5,
        systemAdmin: 0.3,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 21,
        hardwareDeployment: 15, 
        initialConfiguration: 21,
        testing: 28,
        policyDefinition: 21,
        pilotDeployment: 14,
        fullDeployment: 45,
        postDeploymentTuning: 21
      }
    },
    large: {
      initialHardware: 300000,
      annualMaintenance: 100000,
      annualLicensing: 250000,
      networkRedesign: 50000,
      implementation: 120000,
      training: 30000,
      annualDowntime: 48,
      fteAllocation: {
        networkAdmin: 0.8,
        securityAdmin: 0.7,
        systemAdmin: 0.4,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 30,
        hardwareDeployment: 21, 
        initialConfiguration: 30,
        testing: 35,
        policyDefinition: 30,
        pilotDeployment: 21,
        fullDeployment: 60,
        postDeploymentTuning: 30
      }
    }
  },
  aruba: {
    name: 'Aruba ClearPass',
    logo: 'img/aruba-logo.png',
    cloudBased: false,
    description: 'Comprehensive NAC solution with strong multi-vendor support and policy management',
    small: {
      initialHardware: 65000,
      annualMaintenance: 20000,
      annualLicensing: 35000,
      networkRedesign: 12000,
      implementation: 30000,
      training: 9000,
      annualDowntime: 20,
      fteAllocation: {
        networkAdmin: 0.35,
        securityAdmin: 0.25,
        systemAdmin: 0.2,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 10,
        hardwareDeployment: 8, 
        initialConfiguration: 12,
        testing: 18,
        policyDefinition: 12,
        pilotDeployment: 8,
        fullDeployment: 25,
        postDeploymentTuning: 12
      }
    },
    medium: {
      initialHardware: 130000,
      annualMaintenance: 45000,
      annualLicensing: 90000,
      networkRedesign: 20000,
      implementation: 50000,
      training: 12000,
      annualDowntime: 30,
      fteAllocation: {
        networkAdmin: 0.5,
        securityAdmin: 0.4,
        systemAdmin: 0.3,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 14,
        hardwareDeployment: 12, 
        initialConfiguration: 18,
        testing: 24,
        policyDefinition: 18,
        pilotDeployment: 12,
        fullDeployment: 40,
        postDeploymentTuning: 18
      }
    },
    large: {
      initialHardware: 280000,
      annualMaintenance: 90000,
      annualLicensing: 225000,
      networkRedesign: 40000,
      implementation: 100000,
      training: 25000,
      annualDowntime: 40,
      fteAllocation: {
        networkAdmin: 0.7,
        securityAdmin: 0.5,
        systemAdmin: 0.4,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 21,
        hardwareDeployment: 18, 
        initialConfiguration: 25,
        testing: 30,
        policyDefinition: 25,
        pilotDeployment: 16,
        fullDeployment: 55,
        postDeploymentTuning: 25
      }
    }
  },
  forescout: {
    name: 'Forescout',
    logo: 'img/forescout-logo.png',
    cloudBased: false,
    description: 'Visibility-focused NAC solution with strong device discovery and classification',
    small: {
      initialHardware: 70000,
      annualMaintenance: 22000,
      annualLicensing: 38000,
      networkRedesign: 10000,
      implementation: 32000,
      training: 8000,
      annualDowntime: 18,
      fteAllocation: {
        networkAdmin: 0.3,
        securityAdmin: 0.3,
        systemAdmin: 0.2,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 12,
        hardwareDeployment: 8, 
        initialConfiguration: 14,
        testing: 16,
        policyDefinition: 12,
        pilotDeployment: 7,
        fullDeployment: 20,
        postDeploymentTuning: 10
      }
    },
    medium: {
      initialHardware: 140000,
      annualMaintenance: 48000,
      annualLicensing: 95000,
      networkRedesign: 18000,
      implementation: 45000,
      training: 14000,
      annualDowntime: 28,
      fteAllocation: {
        networkAdmin: 0.45,
        securityAdmin: 0.45,
        systemAdmin: 0.3,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 16,
        hardwareDeployment: 12, 
        initialConfiguration: 18,
        testing: 20,
        policyDefinition: 18,
        pilotDeployment: 10,
        fullDeployment: 35,
        postDeploymentTuning: 15
      }
    },
    large: {
      initialHardware: 290000,
      annualMaintenance: 95000,
      annualLicensing: 230000,
      networkRedesign: 35000,
      implementation: 90000,
      training: 25000,
      annualDowntime: 36,
      fteAllocation: {
        networkAdmin: 0.6,
        securityAdmin: 0.6,
        systemAdmin: 0.4,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 24,
        hardwareDeployment: 18, 
        initialConfiguration: 24,
        testing: 25,
        policyDefinition: 24,
        pilotDeployment: 14,
        fullDeployment: 45,
        postDeploymentTuning: 20
      }
    }
  },
  nps: {
    name: 'Microsoft NPS',
    logo: 'img/microsoft-logo.png',
    cloudBased: false,
    description: 'Basic Windows-based RADIUS server with limited NAC functionality',
    small: {
      initialHardware: 15000,
      annualMaintenance: 5000,
      annualLicensing: 0,
      networkRedesign: 8000,
      implementation: 20000,
      training: 5000,
      annualDowntime: 30,
      fteAllocation: {
        networkAdmin: 0.2,
        securityAdmin: 0.1,
        systemAdmin: 0.4,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 10,
        hardwareDeployment: 5, 
        initialConfiguration: 7,
        testing: 10,
        policyDefinition: 7,
        pilotDeployment: 5,
        fullDeployment: 15,
        postDeploymentTuning: 8
      }
    },
    medium: {
      initialHardware: 30000,
      annualMaintenance: 10000,
      annualLicensing: 0,
      networkRedesign: 15000,
      implementation: 30000,
      training: 8000,
      annualDowntime: 48,
      fteAllocation: {
        networkAdmin: 0.3,
        securityAdmin: 0.2,
        systemAdmin: 0.6,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 15,
        hardwareDeployment: 8, 
        initialConfiguration: 10,
        testing: 15,
        policyDefinition: 10,
        pilotDeployment: 7,
        fullDeployment: 25,
        postDeploymentTuning: 12
      }
    },
    large: {
      initialHardware: 60000,
      annualMaintenance: 20000,
      annualLicensing: 0,
      networkRedesign: 25000,
      implementation: 50000,
      training: 15000,
      annualDowntime: 72,
      fteAllocation: {
        networkAdmin: 0.4,
        securityAdmin: 0.3,
        systemAdmin: 0.8,
        helpDesk: 0.2
      },
      implementationTimeline: {
        planning: 20,
        hardwareDeployment: 12, 
        initialConfiguration: 15,
        testing: 20,
        policyDefinition: 15,
        pilotDeployment: 10,
        fullDeployment: 35,
        postDeploymentTuning: 18
      }
    }
  },
  portnox: {
    name: 'Portnox Cloud',
    logo: 'img/portnox-logo.png',
    cloudBased: true,
    description: 'Cloud-native NAC solution with zero-trust approach and simplified deployment',
    small: {
      initialHardware: 0,
      annualMaintenance: 5000,
      annualLicensing: 25000,
      networkRedesign: 2000,
      implementation: 5000,
      training: 2000,
      annualDowntime: 4,
      fteAllocation: {
        networkAdmin: 0.1,
        securityAdmin: 0.1,
        systemAdmin: 0.025,
        helpDesk: 0.025
      },
      implementationTimeline: {
        planning: 3,
        cloudAccountSetup: 1, 
        initialConfiguration: 2,
        testing: 3,
        policyDefinition: 3,
        pilotDeployment: 2,
        fullDeployment: 4,
        postDeploymentTuning: 2
      }
    },
    medium: {
      initialHardware: 0,
      annualMaintenance: 7500,
      annualLicensing: 60000,
      networkRedesign: 4000,
      implementation: 10000,
      training: 4000,
      annualDowntime: 6,
      fteAllocation: {
        networkAdmin: 0.2,
        securityAdmin: 0.15,
        systemAdmin: 0.05,
        helpDesk: 0.05
      },
      implementationTimeline: {
        planning: 5,
        cloudAccountSetup: 1, 
        initialConfiguration: 3,
        testing: 4,
        policyDefinition: 4,
        pilotDeployment: 3,
        fullDeployment: 7,
        postDeploymentTuning: 3
      }
    },
    large: {
      initialHardware: 0,
      annualMaintenance: 10000,
      annualLicensing: 150000,
      networkRedesign: 8000,
      implementation: 20000,
      training: 8000,
      annualDowntime: 8,
      fteAllocation: {
        networkAdmin: 0.3,
        securityAdmin: 0.25,
        systemAdmin: 0.1,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 8,
        cloudAccountSetup: 1, 
        initialConfiguration: 5,
        testing: 7,
        policyDefinition: 7,
        pilotDeployment: 5,
        fullDeployment: 14,
        postDeploymentTuning: 5
      }
    }
  }
};

// Portnox benefits data - make globally available
window.portnoxBenefits = [
  {
    title: "Zero Hardware Costs",
    description: "Eliminate capital expenditure on NAC appliances and associated server infrastructure",
    icon: "??",
    metric: "100% savings"
  },
  {
    title: "Reduced Implementation Time",
    description: "Get up and running 70-85% faster than traditional NAC solutions",
    icon: "??",
    metric: "75% faster"
  },
  {
    title: "Lower IT Staffing Requirements",
    description: "Decrease NAC administration overhead by up to 80%",
    icon: "??",
    metric: "$180,000/year"
  },
  {
    title: "Reduced Downtime",
    description: "Minimize business disruption with significantly fewer outages",
    icon: "??",
    metric: "85% reduction"
  },
  {
    title: "Automated Updates",
    description: "Eliminate maintenance windows and manual update processes",
    icon: "??",
    metric: "Zero downtime updates"
  },
  {
    title: "Faster ROI",
    description: "Achieve return on investment in a fraction of the time",
    icon: "??",
    metric: "0.8 years"
  }
];
