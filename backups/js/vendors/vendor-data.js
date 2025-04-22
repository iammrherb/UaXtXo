/**
 * Vendor data and comparison information
 */

const vendorData = {
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

// Enhanced feature comparison data with detailed descriptions
const featureComparisonData = {
  deploymentModel: {
    title: 'Deployment Model',
    description: 'The primary deployment architecture of the NAC solution',
    cisco: { value: 'On-premises', score: 2, detail: 'Requires physical appliances and dedicated infrastructure' },
    aruba: { value: 'On-premises', score: 2, detail: 'Requires physical or virtual appliances and dedicated infrastructure' },
    forescout: { value: 'On-premises', score: 2, detail: 'Requires physical appliances or virtual machines' },
    nps: { value: 'On-premises', score: 1, detail: 'Requires Windows Servers and associated infrastructure' },
    portnox: { value: 'Cloud-native', score: 5, detail: 'True SaaS architecture with zero on-premises infrastructure requirements' }
  },
  hardwareRequired: {
    title: 'Hardware Requirements',
    description: 'Physical or virtual hardware needed to implement the solution',
    cisco: { value: 'Multiple appliances', score: 1, detail: 'Requires dedicated ISE nodes, plus distribution nodes for larger deployments' },
    aruba: { value: 'Multiple appliances', score: 1, detail: 'Requires ClearPass appliances or virtualized servers' },
    forescout: { value: 'Multiple appliances', score: 1, detail: 'Requires CounterACT appliances, with Enterprise Manager for multi-site deployments' },
    nps: { value: 'Windows Servers', score: 2, detail: 'Runs on Windows Server, requires additional servers for high-availability' },
    portnox: { value: 'None', score: 5, detail: 'No dedicated hardware required, fully cloud-hosted platform' }
  },
  implementationTime: {
    title: 'Implementation Time',
    description: 'Average time to complete deployment from start to finish',
    cisco: { value: '3-6 months', score: 1, detail: 'Lengthy deployment cycle with complex planning, staging, and rollout phases' },
    aruba: { value: '2.5-5 months', score: 2, detail: 'Significant deployment time with multiple implementation phases' },
    forescout: { value: '2-4.5 months', score: 2, detail: 'Extended deployment timeline with visibility and control phases' },
    nps: { value: '1-2 months', score: 3, detail: 'Moderate deployment time with Windows Server integration' },
    portnox: { value: '1-4 weeks', score: 5, detail: 'Rapid deployment with simplified configuration and cloud-based architecture' }
  },
  maintenanceEffort: {
    title: 'Maintenance Effort',
    description: 'Ongoing operational effort required to maintain the solution',
    cisco: { value: 'High', score: 1, detail: 'Requires constant patching, updates, and maintenance with specialized skills' },
    aruba: { value: 'Medium-High', score: 2, detail: 'Ongoing appliance maintenance, updates, and management' },
    forescout: { value: 'Medium', score: 3, detail: 'Regular updates and maintenance, with simpler management interface' },
    nps: { value: 'Medium-High', score: 2, detail: 'Windows Server maintenance plus NPS-specific management' },
    portnox: { value: 'Very Low', score: 5, detail: 'Almost zero maintenance overhead with automated updates and cloud management' }
  },
  automatedUpdates: {
    title: 'Automated Updates',
    description: 'How solution updates are handled and applied',
    cisco: { value: 'No', score: 1, detail: 'Manual update process requires scheduled maintenance windows' },
    aruba: { value: 'No', score: 1, detail: 'Manual update process requires scheduled maintenance windows' },
    forescout: { value: 'Partial', score: 3, detail: 'Some automated updates, but major version upgrades require manual intervention' },
    nps: { value: 'With Windows', score: 2, detail: 'Windows updates automated, but NPS configuration changes are manual' },
    portnox: { value: 'Yes', score: 5, detail: 'Continuous delivery model with zero-downtime updates' }
  },
  scalability: {
    title: 'Scalability',
    description: 'Ability to scale with organizational growth',
    cisco: { value: 'Complex', score: 2, detail: 'Requires planning and additional hardware for scaling' },
    aruba: { value: 'Moderate', score: 3, detail: 'More straightforward scaling process, but requires additional hardware' },
    forescout: { value: 'Moderate', score: 3, detail: 'Scales with additional appliances and Enterprise Manager' },
    nps: { value: 'Limited', score: 2, detail: 'Scaling requires additional Windows servers and manual configuration' },
    portnox: { value: 'Excellent', score: 5, detail: 'Effortless elastic cloud scaling with no customer action required' }
  },
  multiVendorSupport: {
    title: 'Multi-Vendor Support',
    description: 'Support for diverse network equipment vendors',
    cisco: { value: 'Limited', score: 2, detail: 'Works best with Cisco network equipment, limited support for other vendors' },
    aruba: { value: 'Good', score: 4, detail: 'Designed to work with multi-vendor networks, especially HPE/Aruba' },
    forescout: { value: 'Very Good', score: 4, detail: 'Strong multi-vendor support for discovery and control' },
    nps: { value: 'Basic', score: 3, detail: 'Standard RADIUS support for networking equipment' },
    portnox: { value: 'Excellent', score: 5, detail: 'Vendor-agnostic design with comprehensive support for all major networking vendors' }
  },
  licensingModel: {
    title: 'Licensing Model',
    description: 'How the solution is licensed and priced',
    cisco: { value: 'Complex tiered', score: 2, detail: 'Complex licensing tiers with different feature sets and add-ons' },
    aruba: { value: 'Per device/Perpetual', score: 3, detail: 'Per-device licensing model with perpetual options' },
    forescout: { value: 'Per device flexibility', score: 3, detail: 'Per-device licensing with some flexibility in options' },
    nps: { value: 'Windows Server CALs', score: 3, detail: 'Requires Windows Server and Client Access Licenses' },
    portnox: { value: 'Simple subscription', score: 5, detail: 'Transparent per-device subscription with all features included' }
  },
  totalCostOfOwnership: {
    title: 'Total Cost of Ownership',
    description: 'Overall long-term cost including hardware, software, maintenance, and personnel',
    cisco: { value: 'High', score: 1, detail: 'Highest TCO due to hardware, licensing, and high operational costs' },
    aruba: { value: 'High', score: 1, detail: 'High TCO with significant hardware and operational expenses' },
    forescout: { value: 'Medium-High', score: 2, detail: 'Substantial initial investment with moderate operational costs' },
    nps: { value: 'Medium', score: 3, detail: 'Lower licensing costs but higher operational overhead' },
    portnox: { value: 'Low', score: 5, detail: 'Lowest TCO with no hardware costs and minimal operational overhead' }
  },
  automatedRemediation: {
    title: 'Automated Remediation',
    description: 'Ability to automatically remediate security issues',
    cisco: { value: 'Basic', score: 3, detail: 'Policy-based remediation with some automated responses' },
    aruba: { value: 'Basic', score: 3, detail: 'Policy-based remediation with some automated responses' },
    forescout: { value: 'Advanced', score: 4, detail: 'Strong automated remediation capabilities' },
    nps: { value: 'Limited', score: 2, detail: 'Basic enforcement without sophisticated remediation' },
    portnox: { value: 'Advanced', score: 5, detail: 'Comprehensive automated remediation with dynamic policy enforcement' }
  },
  cloudIntegration: {
    title: 'Cloud Integration',
    description: 'Integration with cloud services and applications',
    cisco: { value: 'Limited', score: 2, detail: 'Traditional architecture with limited cloud integration' },
    aruba: { value: 'Moderate', score: 3, detail: 'Improved cloud integration but primarily on-premises focused' },
    forescout: { value: 'Moderate', score: 3, detail: 'Some cloud integrations available but not core architecture' },
    nps: { value: 'Basic', score: 2, detail: 'Limited cloud integration capabilities' },
    portnox: { value: 'Native', score: 5, detail: 'Built from the ground up for cloud integration with extensive API support' }
  },
  remoteWorkSupport: {
    title: 'Remote Work Support',
    description: 'How well the solution supports remote and hybrid work models',
    cisco: { value: 'Complex', score: 2, detail: 'Requires VPN or additional components for remote access' },
    aruba: { value: 'Moderate', score: 3, detail: 'Better remote support but requires additional configuration' },
    forescout: { value: 'Good', score: 4, detail: 'Enhanced remote capabilities with endpoint agents' },
    nps: { value: 'Limited', score: 2, detail: 'Limited remote capabilities without additional components' },
    portnox: { value: 'Excellent', score: 5, detail: 'Built specifically for distributed workforce with native remote assessment' }
  }
};

// Portnox benefits data
const portnoxBenefits = [
  {
    title: "Zero Hardware Costs",
    description: "Eliminate capital expenditure on NAC appliances and associated server infrastructure",
    icon: "💰",
    metric: "100% savings"
  },
  {
    title: "Reduced Implementation Time",
    description: "Get up and running 70-85% faster than traditional NAC solutions",
    icon: "⏱️",
    metric: "75% faster"
  },
  {
    title: "Lower IT Staffing Requirements",
    description: "Decrease NAC administration overhead by up to 80%",
    icon: "👥",
    metric: "$180,000/year"
  },
  {
    title: "Reduced Downtime",
    description: "Minimize business disruption with significantly fewer outages",
    icon: "🔄",
    metric: "85% reduction"
  },
  {
    title: "Automated Updates",
    description: "Eliminate maintenance windows and manual update processes",
    icon: "🔄",
    metric: "Zero downtime updates"
  },
  {
    title: "Faster ROI",
    description: "Achieve return on investment in a fraction of the time",
    icon: "📈",
    metric: "0.8 years"
  }
];
