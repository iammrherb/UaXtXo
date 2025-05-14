/**
 * Portnox TCO Multi-Vendor Analyzer
 * Main JavaScript functionality
 */

// Vendor data with baseline comparisons 
const vendorData = {
  portnox: {
    name: "Portnox Cloud",
    id: "portnox",
    color: "#2BD25B",
    type: "Cloud-native",
    deploymentTime: {
      small: 0.5, // days
      medium: 2,  // days
      large: 5    // days
    },
    costs: {
      hardware: 0, // No hardware costs for cloud
      software: {
        perDevice: {
          year1: 48,
          year2: 48,
          year3: 48,
          year5: 48
        },
        minimum: 14400 // $48 x 300 devices
      },
      implementation: {
        small: 3500,
        medium: 10000,
        large: 25000
      },
      maintenance: 0, // Included in subscription
      training: {
        small: 1500,
        medium: 5000,
        large: 10000
      },
      staffing: {
        fte: 0.15, // 15% of FTE
        costPerYear: function(fteRate) {
          return this.fte * fteRate;
        }
      }
    },
    features: {
      cloudNative: "Full",
      zeroTrust: "Full",
      api: "Advanced",
      scalability: "Simple",
      byod: "Advanced",
      guestManagement: "Advanced",
      remoteAccess: "Full",
      deviceDiscovery: "Advanced",
      riskAssessment: "Continuous",
      compliance: {
        pciDss: 95,
        nist: 95,
        iso27001: 90,
        hipaa: 100,
        gdpr: 85
      }
    },
    riskReduction: 65,
    breakeven: 6, // months
    roi: {
      year1: 5,  // percentage
      year2: 80,
      year3: 125
    }
  },
  cisco: {
    name: "Cisco ISE",
    id: "cisco",
    color: "#1BA0E1",
    type: "On-premises/VM/Cloud",
    deploymentTime: {
      small: 21, // days
      medium: 60, // days
      large: 120 // days
    },
    costs: {
      hardware: {
        small: 50000,
        medium: 75000,
        large: 100000
      },
      software: {
        perDevice: {
          year1: 100,
          year2: 50, // maintenance
          year3: 50,
          year5: 50
        },
        minimum: 30000 // $100 x 300 devices
      },
      implementation: {
        small: 25000,
        medium: 50000,
        large: 100000
      },
      maintenance: {
        percentOfSoftware: 0.22, // 22% of software costs
        perYear: function(softwareCost) {
          return softwareCost * this.percentOfSoftware;
        }
      },
      training: {
        small: 5000,
        medium: 15000,
        large: 25000
      },
      staffing: {
        fte: 0.5, // 50% of FTE
        costPerYear: function(fteRate) {
          return this.fte * fteRate;
        }
      }
    },
    features: {
      cloudNative: "Limited",
      zeroTrust: "Partial",
      api: "Advanced",
      scalability: "Complex",
      byod: "Yes",
      guestManagement: "Advanced",
      remoteAccess: "Limited",
      deviceDiscovery: "Advanced",
      riskAssessment: "Point-in-time",
      compliance: {
        pciDss: 75,
        nist: 70,
        iso27001: 65,
        hipaa: 60,
        gdpr: 50
      }
    },
    riskReduction: 50,
    breakeven: 28, // months
    roi: {
      year1: -10, // percentage
      year2: 10,
      year3: 23
    }
  },
  aruba: {
    name: "Aruba ClearPass",
    id: "aruba",
    color: "#F7941D",
    type: "On-premises/VM/Cloud",
    deploymentTime: {
      small: 14, // days
      medium: 45, // days
      large: 90 // days
    },
    costs: {
      hardware: {
        small: 25000,
        medium: 50000,
        large: 70000
      },
      software: {
        perDevice: {
          year1: 75,
          year2: 40, // maintenance
          year3: 40,
          year5: 40
        },
        minimum: 22500 // $75 x 300 devices
      },
      implementation: {
        small: 20000,
        medium: 40000,
        large: 75000
      },
      maintenance: {
        percentOfSoftware: 0.20, // 20% of software costs
        perYear: function(softwareCost) {
          return softwareCost * this.percentOfSoftware;
        }
      },
      training: {
        small: 5000,
        medium: 12000,
        large: 20000
      },
      staffing: {
        fte: 0.45, // 45% of FTE
        costPerYear: function(fteRate) {
          return this.fte * fteRate;
        }
      }
    },
    features: {
      cloudNative: "Limited",
      zeroTrust: "Partial",
      api: "Advanced",
      scalability: "Complex",
      byod: "Yes",
      guestManagement: "Advanced",
      remoteAccess: "Limited",
      deviceDiscovery: "Advanced",
      riskAssessment: "Point-in-time",
      compliance: {
        pciDss: 80,
        nist: 75,
        iso27001: 70,
        hipaa: 65,
        gdpr: 60
      }
    },
    riskReduction: 55,
    breakeven: 26, // months
    roi: {
      year1: -5, // percentage
      year2: 15,
      year3: 30
    }
  },
  forescout: {
    name: "Forescout",
    id: "forescout",
    color: "#6F42C1",
    type: "On-premises/VM/Cloud",
    deploymentTime: {
      small: 14, // days
      medium: 60, // days
      large: 120 // days
    },
    costs: {
      hardware: {
        small: 30000,
        medium: 60000,
        large: 100000
      },
      software: {
        perDevice: {
          year1: 90,
          year2: 45, // maintenance
          year3: 45,
          year5: 45
        },
        minimum: 27000 // $90 x 300 devices
      },
      implementation: {
        small: 30000,
        medium: 60000,
        large: 100000
      },
      maintenance: {
        percentOfSoftware: 0.21, // 21% of software costs
        perYear: function(softwareCost) {
          return softwareCost * this.percentOfSoftware;
        }
      },
      training: {
        small: 7000,
        medium: 15000,
        large: 25000
      },
      staffing: {
        fte: 0.4, // 40% of FTE
        costPerYear: function(fteRate) {
          return this.fte * fteRate;
        }
      }
    },
    features: {
      cloudNative: "Limited",
      zeroTrust: "Partial",
      api: "Advanced",
      scalability: "Complex",
      byod: "Yes",
      guestManagement: "Basic",
      remoteAccess: "Limited",
      deviceDiscovery: "Exceptional",
      riskAssessment: "Advanced",
      compliance: {
        pciDss: 65,
        nist: 75,
        iso27001: 70,
        hipaa: 80,
        gdpr: 60
      }
    },
    riskReduction: 55,
    breakeven: 24, // months
    roi: {
      year1: -5, // percentage
      year2: 20,
      year3: 35
    }
  },
  fortinet: {
    name: "FortiNAC",
    id: "fortinet",
    color: "#E74C3C",
    type: "On-premises/VM/Cloud",
    deploymentTime: {
      small: 30, // days
      medium: 60, // days
      large: 90 // days
    },
    costs: {
      hardware: {
        small: 20000,
        medium: 40000,
        large: 60000
      },
      software: {
        perDevice: {
          year1: 65,
          year2: 35, // maintenance
          year3: 35,
          year5: 35
        },
        minimum: 19500 // $65 x 300 devices
      },
      implementation: {
        small: 20000,
        medium: 40000,
        large: 70000
      },
      maintenance: {
        percentOfSoftware: 0.20, // 20% of software costs
        perYear: function(softwareCost) {
          return softwareCost * this.percentOfSoftware;
        }
      },
      training: {
        small: 5000,
        medium: 10000,
        large: 20000
      },
      staffing: {
        fte: 0.4, // 40% of FTE
        costPerYear: function(fteRate) {
          return this.fte * fteRate;
        }
      }
    },
    features: {
      cloudNative: "Limited",
      zeroTrust: "Partial",
      api: "Good",
      scalability: "Moderate",
      byod: "Yes",
      guestManagement: "Basic",
      remoteAccess: "Limited",
      deviceDiscovery: "Advanced",
      riskAssessment: "Good",
      compliance: {
        pciDss: 60,
        nist: 65,
        iso27001: 60,
        hipaa: 55,
        gdpr: 50
      }
    },
    riskReduction: 45,
    breakeven: 22, // months
    roi: {
      year1: -2, // percentage
      year2: 25,
      year3: 40
    }
  },
  juniper: {
    name: "Juniper Mist",
    id: "juniper",
    color: "#16A085",
    type: "Cloud-managed",
    deploymentTime: {
      small: 3, // days
      medium: 10, // days
      large: 21 // days
    },
    costs: {
      hardware: {
        small: 10000,
        medium: 25000,
        large: 40000
      },
      software: {
        perDevice: {
          year1: 55,
          year2: 55,
          year3: 55,
          year5: 55
        },
        minimum: 16500 // $55 x 300 devices
      },
      implementation: {
        small: 10000,
        medium: 25000,
        large: 50000
      },
      maintenance: {
        percentOfSoftware: 0.10, // 10% of software costs
        perYear: function(softwareCost) {
          return softwareCost * this.percentOfSoftware;
        }
      },
      training: {
        small: 3000,
        medium: 8000,
        large: 15000
      },
      staffing: {
        fte: 0.25, // 25% of FTE
        costPerYear: function(fteRate) {
          return this.fte * fteRate;
        }
      }
    },
    features: {
      cloudNative: "Partial",
      zeroTrust: "Good",
      api: "Good",
      scalability: "Good",
      byod: "Good",
      guestManagement: "Good",
      remoteAccess: "Good",
      deviceDiscovery: "Good",
      riskAssessment: "Good",
      compliance: {
        pciDss: 75,
        nist: 70,
        iso27001: 65,
        hipaa: 70,
        gdpr: 65
      }
    },
    riskReduction: 50,
    breakeven: 14, // months
    roi: {
      year1: 0, // percentage
      year2: 45,
      year3: 75
    }
  },
  secureW2: {
    name: "SecureW2",
    id: "secureW2",
    color: "#3498DB",
    type: "Cloud-based",
    deploymentTime: {
      small: 3, // days
      medium: 7, // days
      large: 14 // days
    },
    costs: {
      hardware: 0, // No hardware costs for cloud
      software: {
        perDevice: {
          year1: 31,
          year2: 31,
          year3: 31,
          year5: 31
        },
        minimum: 9300 // $31 x 300 devices
      },
      implementation: {
        small: 5000,
        medium: 15000,
        large: 25000
      },
      maintenance: 0, // Included in subscription
      training: {
        small: 3000,
        medium: 7000,
        large: 15000
      },
      staffing: {
        fte: 0.2, // 20% of FTE
        costPerYear: function(fteRate) {
          return this.fte * fteRate;
        }
      }
    },
    features: {
      cloudNative: "Partial",
      zeroTrust: "Good",
      api: "Good",
      scalability: "Good",
      byod: "Good",
      guestManagement: "Good",
      remoteAccess: "Good",
      deviceDiscovery: "Good",
      riskAssessment: "Limited",
      compliance: {
        pciDss: 70,
        nist: 65,
        iso27001: 60,
        hipaa: 65,
        gdpr: 60
      }
    },
    riskReduction: 55,
    breakeven: 12, // months
    roi: {
      year1: 2, // percentage
      year2: 50,
      year3: 90
    }
  },
  microsoft: {
    name: "Microsoft NPS",
    id: "microsoft",
    color: "#7D5BE2",
    type: "On-premises",
    deploymentTime: {
      small: 10, // days
      medium: 21, // days
      large: 42 // days
    },
    costs: {
      hardware: {
        small: 5000,
        medium: 10000,
        large: 20000
      },
      software: {
        perDevice: {
          year1: 0, // Included in Windows Server
          year2: 0,
          year3: 0,
          year5: 0
        },
        minimum: 0 // Included in Windows Server
      },
      implementation: {
        small: 10000,
        medium: 20000,
        large: 30000
      },
      maintenance: {
        percentOfHardware: 0.10, // 10% of hardware costs
        perYear: function(hardwareCost) {
          return hardwareCost * this.percentOfHardware;
        }
      },
      training: {
        small: 3000,
        medium: 6000,
        large: 12000
      },
      staffing: {
        fte: 0.25, // 25% of FTE
        costPerYear: function(fteRate) {
          return this.fte * fteRate;
        }
      }
    },
    features: {
      cloudNative: "None",
      zeroTrust: "Limited",
      api: "Basic",
      scalability: "Limited",
      byod: "Basic",
      guestManagement: "Basic",
      remoteAccess: "Limited",
      deviceDiscovery: "Basic",
      riskAssessment: "Limited",
      compliance: {
        pciDss: 40,
        nist: 55,
        iso27001: 50,
        hipaa: 45,
        gdpr: 40
      }
    },
    riskReduction: 25,
    breakeven: 24, // months
    roi: {
      year1: -5, // percentage
      year2: 10,
      year3: 20
    }
  },
  arista: {
    name: "Arista AGNI",
    id: "arista",
    color: "#D35400",
    type: "Cloud-managed",
    deploymentTime: {
      small: 7, // days
      medium: 14, // days
      large: 30 // days
    },
    costs: {
      hardware: {
        small: 15000,
        medium: 30000,
        large: 50000
      },
      software: {
        perDevice: {
          year1: 50,
          year2: 40,
          year3: 40,
          year5: 40
        },
        minimum: 15000 // $50 x 300 devices
      },
      implementation: {
        small: 15000,
        medium: 30000,
        large: 60000
      },
      maintenance: {
        percentOfSoftware: 0.15, // 15% of software costs
        perYear: function(softwareCost) {
          return softwareCost * this.percentOfSoftware;
        }
      },
      training: {
        small: 4000,
        medium: 10000,
        large: 18000
      },
      staffing: {
        fte: 0.3, // 30% of FTE
        costPerYear: function(fteRate) {
          return this.fte * fteRate;
        }
      }
    },
    features: {
      cloudNative: "Partial",
      zeroTrust: "Good",
      api: "Good",
      scalability: "Good",
      byod: "Good",
      guestManagement: "Good",
      remoteAccess: "Good",
      deviceDiscovery: "Good",
      riskAssessment: "Good",
      compliance: {
        pciDss: 70,
        nist: 65,
        iso27001: 60,
        hipaa: 65,
        gdpr: 60
      }
    },
    riskReduction: 45,
    breakeven: 16, // months
    roi: {
      year1: -2, // percentage
      year2: 30,
      year3: 60
    }
  },
  foxpass: {
    name: "Foxpass",
    id: "foxpass",
    color: "#8E44AD",
    type: "Cloud-based",
    deploymentTime: {
      small: 2, // days
      medium: 5, // days
      large: 10 // days
    },
    costs: {
      hardware: 0, // No hardware costs for cloud
      software: {
        perDevice: {
          year1: 36,
          year2: 36,
          year3: 36,
          year5: 36
        },
        minimum: 10800 // $36 x 300 devices
      },
      implementation: {
        small: 5000,
        medium: 10000,
        large: 20000
      },
      maintenance: 0, // Included in subscription
      training: {
        small: 2000,
        medium: 5000,
        large: 10000
      },
      staffing: {
        fte: 0.2, // 20% of FTE
        costPerYear: function(fteRate) {
          return this.fte * fteRate;
        }
      }
    },
    features: {
      cloudNative: "Full",
      zeroTrust: "Good",
      api: "Good",
      scalability: "Good",
      byod: "Basic",
      guestManagement: "Basic",
      remoteAccess: "Good",
      deviceDiscovery: "Basic",
      riskAssessment: "Basic",
      compliance: {
        pciDss: 65,
        nist: 60,
        iso27001: 55,
        hipaa: 50,
        gdpr: 55
      }
    },
    riskReduction: 40,
    breakeven: 10, // months
    roi: {
      year1: 5, // percentage
      year2: 45,
      year3: 80
    }
  }
};

// Default settings
const defaultSettings = {
  organization: {
    size: 'small', // small, medium, large
    deviceCount: 300,
    locations: 3,
    industry: 'general', // general, financial, healthcare, education, retail, manufacturing, government
    fteRate: 120000, // Annual cost of a full-time employee
    growthRate: 10 // Annual percentage growth in device count
  },
  analysisSettings: {
    period: 3, // Years
    complianceFrameworks: ['pciDss', 'nist'],
    maintenancePercentage: 20, // Percentage of software costs for maintenance
    selectedVendors: ['portnox', 'cisco', 'aruba', 'forescout', 'fortinet'] // Default selected vendors
  }
};

// Current state
let currentSettings = JSON.parse(JSON.stringify(defaultSettings));
let selectedVendors = [...currentSettings.analysisSettings.selectedVendors];
let activeTab = 'overview';

// DOM Elements
let chartsReferences = {}; // To store references to Chart.js instances

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeSidebar();
  initializeVendorSelection();
  initializeFormValues();
  initializeTabs();
  updateView();
});

// Initialize sidebar behavior
function initializeSidebar() {
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      
      // Update the toggle button icon
      const icon = this.querySelector('i');
      if (icon) {
        if (sidebar.classList.contains('collapsed')) {
          icon.className = 'fas fa-chevron-right';
        } else {
          icon.className = 'fas fa-chevron-left';
        }
      }
    });
  }
}

// Initialize vendor selection
function initializeVendorSelection() {
  const vendorItems = document.querySelectorAll('.vendor-item');
  
  vendorItems.forEach(item => {
    const vendorId = item.getAttribute('data-vendor-id');
    
    // Set initial state
    if (selectedVendors.includes(vendorId)) {
      item.classList.add('active');
    }
    
    // Add click event
    item.addEventListener('click', function() {
      const vendorId = this.getAttribute('data-vendor-id');
      
      if (this.classList.contains('active')) {
        // Don't allow deselecting if it's the last selected vendor
        if (selectedVendors.length > 1) {
          this.classList.remove('active');
          selectedVendors = selectedVendors.filter(v => v !== vendorId);
        }
      } else {
        this.classList.add('active');
        selectedVendors.push(vendorId);
      }
      
      // Update currentSettings
      currentSettings.analysisSettings.selectedVendors = [...selectedVendors];
      
      // Update the view
      updateView();
    });
  });
}

// Initialize form values
function initializeFormValues() {
  // Set organization size
  const orgSizeSelect = document.getElementById('org-size');
  if (orgSizeSelect) {
    orgSizeSelect.value = currentSettings.organization.size;
    orgSizeSelect.addEventListener('change', function() {
      currentSettings.organization.size = this.value;
      updateView();
    });
  }
  
  // Set device count
  const deviceCountInput = document.getElementById('device-count');
  if (deviceCountInput) {
    deviceCountInput.value = currentSettings.organization.deviceCount;
    deviceCountInput.addEventListener('change', function() {
      currentSettings.organization.deviceCount = parseInt(this.value, 10);
      updateView();
    });
  }
  
  // Set locations count
  const locationsInput = document.getElementById('locations-count');
  if (locationsInput) {
    locationsInput.value = currentSettings.organization.locations;
    locationsInput.addEventListener('change', function() {
      currentSettings.organization.locations = parseInt(this.value, 10);
      updateView();
    });
  }
  
  // Set industry
  const industrySelect = document.getElementById('industry');
  if (industrySelect) {
    industrySelect.value = currentSettings.organization.industry;
    industrySelect.addEventListener('change', function() {
      currentSettings.organization.industry = this.value;
      updateView();
    });
  }
  
  // Set FTE rate
  const fteRateInput = document.getElementById('fte-rate');
  if (fteRateInput) {
    fteRateInput.value = currentSettings.organization.fteRate;
    fteRateInput.addEventListener('change', function() {
      currentSettings.organization.fteRate = parseInt(this.value, 10);
      updateView();
    });
  }
  
  // Set analysis period
  const analysisPeriodSelect = document.getElementById('analysis-period');
  if (analysisPeriodSelect) {
    analysisPeriodSelect.value = currentSettings.analysisSettings.period;
    analysisPeriodSelect.addEventListener('change', function() {
      currentSettings.analysisSettings.period = parseInt(this.value, 10);
      updateView();
    });
  }
  
  // Set compliance frameworks
  const complianceCheckboxes = document.querySelectorAll('.compliance-checkbox');
  complianceCheckboxes.forEach(checkbox => {
    const framework = checkbox.getAttribute('data-framework');
    checkbox.checked = currentSettings.analysisSettings.complianceFrameworks.includes(framework);
    
    checkbox.addEventListener('change', function() {
      const framework = this.getAttribute('data-framework');
      if (this.checked) {
        if (!currentSettings.analysisSettings.complianceFrameworks.includes(framework)) {
          currentSettings.analysisSettings.complianceFrameworks.push(framework);
        }
      } else {
        currentSettings.analysisSettings.complianceFrameworks = 
          currentSettings.analysisSettings.complianceFrameworks.filter(f => f !== framework);
      }
      updateView();
    });
  });
  
  // Update button
  const updateButton = document.getElementById('update-comparison');
  if (updateButton) {
    updateButton.addEventListener('click', function() {
      updateView();
    });
  }
}

// Initialize tabs
function initializeTabs() {
  const tabLinks = document.querySelectorAll('.nav-link');
  
  tabLinks.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all tabs
      tabLinks.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Update active tab
      activeTab = this.getAttribute('data-tab');
      
      // Update tab content
      updateTabContent();
    });
  });
}

// Update tab content based on active tab
function updateTabContent() {
  // Hide all tab panes
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabPanes.forEach(pane => pane.classList.remove('active'));
  
  // Show active tab pane
  const activePane = document.getElementById(`${activeTab}-tab`);
  if (activePane) {
    activePane.classList.add('active');
  }
  
  // Update content based on active tab
  switch (activeTab) {
    case 'overview':
      renderOverview();
      break;
    case 'costs':
      renderCostAnalysis();
      break;
    case 'implementation':
      renderImplementation();
      break;
    case 'features':
      renderFeatures();
      break;
    case 'compliance':
      renderCompliance();
      break;
    case 'roi':
      renderROI();
      break;
    case 'risk':
      renderRisk();
      break;
    case 'sensitivity':
      renderSensitivity();
      break;
    default:
      renderOverview();
  }
}

// Update the entire view
function updateView() {
  updateTabContent();
}

// Calculate TCO for a vendor
function calculateTCO(vendorId) {
  const vendor = vendorData[vendorId];
  const deviceCount = currentSettings.organization.deviceCount;
  const size = currentSettings.organization.size;
  const period = currentSettings.analysisSettings.period;
  const fteRate = currentSettings.organization.fteRate;
  
  // Initialize results
  const result = {
    total: 0,
    hardware: 0,
    software: 0,
    implementation: 0,
    maintenance: 0,
    training: 0,
    staffing: 0,
    breakdown: {
      hardware: 0,
      software: 0,
      implementation: 0,
      maintenance: 0,
      training: 0,
      staffing: 0
    },
    yearly: []
  };
  
  // Calculate hardware costs
  if (typeof vendor.costs.hardware === 'number') {
    result.hardware = vendor.costs.hardware;
  } else {
    result.hardware = vendor.costs.hardware[size];
  }
  result.breakdown.hardware = result.hardware;
  
  // Calculate software/subscription costs
  const deviceSoftwareCost = deviceCount * vendor.costs.software.perDevice.year1;
  const minSoftwareCost = vendor.costs.software.minimum;
  result.software = Math.max(deviceSoftwareCost, minSoftwareCost);
  
  // Add additional years of software costs
  for (let i = 2; i <= period; i++) {
    const yearKey = `year${i}`;
    if (vendor.costs.software.perDevice[yearKey]) {
      const additionalCost = deviceCount * vendor.costs.software.perDevice[yearKey];
      result.software += additionalCost;
    }
  }
  result.breakdown.software = result.software;
  
  // Calculate implementation costs
  result.implementation = vendor.costs.implementation[size];
  result.breakdown.implementation = result.implementation;
  
  // Calculate maintenance costs
  if (vendor.costs.maintenance === 0) {
    result.maintenance = 0;
  } else if (typeof vendor.costs.maintenance === 'number') {
    result.maintenance = vendor.costs.maintenance * period;
  } else if (vendor.costs.maintenance.perYear) {
    if (vendor.costs.maintenance.percentOfSoftware) {
      // Calculate based on software costs
      const annualSoftwareCost = result.software / period;
      result.maintenance = vendor.costs.maintenance.perYear(annualSoftwareCost) * period;
    } else if (vendor.costs.maintenance.percentOfHardware) {
      // Calculate based on hardware costs
      result.maintenance = vendor.costs.maintenance.perYear(result.hardware) * period;
    }
  }
  result.breakdown.maintenance = result.maintenance;
  
  // Calculate training costs
  result.training = vendor.costs.training[size];
  result.breakdown.training = result.training;
  
  // Calculate staffing costs
  result.staffing = vendor.costs.staffing.costPerYear(fteRate) * period;
  result.breakdown.staffing = result.staffing;
  
  // Calculate total TCO
  result.total = result.hardware + result.software + result.implementation + 
                result.maintenance + result.training + result.staffing;
  
  // Calculate yearly breakdown
  for (let i = 1; i <= period; i++) {
    const yearBreakdown = {
      year: i,
      total: 0,
      hardware: 0,
      software: 0,
      implementation: 0,
      maintenance: 0,
      training: 0,
      staffing: 0
    };
    
    // Hardware (first year only)
    if (i === 1) {
      yearBreakdown.hardware = result.hardware;
    }
    
    // Software
    const yearKey = `year${i}`;
    if (vendor.costs.software.perDevice[yearKey]) {
      const annualSoftwareCost = deviceCount * vendor.costs.software.perDevice[yearKey];
      yearBreakdown.software = Math.max(annualSoftwareCost, vendor.costs.software.minimum / period);
    } else {
      yearBreakdown.software = result.software / period;
    }
    
    // Implementation (first year only)
    if (i === 1) {
      yearBreakdown.implementation = result.implementation;
    }
    
    // Maintenance (prorated per year)
    yearBreakdown.maintenance = result.maintenance / period;
    
    // Training (first year only)
    if (i === 1) {
      yearBreakdown.training = result.training;
    }
    
    // Staffing (consistent per year)
    yearBreakdown.staffing = result.staffing / period;
    
    // Total for the year
    yearBreakdown.total = yearBreakdown.hardware + yearBreakdown.software + 
                          yearBreakdown.implementation + yearBreakdown.maintenance + 
                          yearBreakdown.training + yearBreakdown.staffing;
    
    result.yearly.push(yearBreakdown);
  }
  
  return result;
}

// Get formatted currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

// Get formatted percentage
function formatPercentage(percentage) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 0
  }).format(percentage / 100);
}

// Get formatted number
function formatNumber(number) {
  return new Intl.NumberFormat('en-US').format(number);
}

// Render overview tab
function renderOverview() {
  const overviewTab = document.getElementById('overview-tab');
  if (!overviewTab) return;
  
  // Calculate TCO for selected vendors
  const tcoResults = {};
  selectedVendors.forEach(vendorId => {
    tcoResults[vendorId] = calculateTCO(vendorId);
  });
  
  // Find baseline vendor (usually Cisco if selected, or the first vendor)
  let baselineVendorId = 'cisco';
  if (!selectedVendors.includes('cisco')) {
    baselineVendorId = selectedVendors[0];
  }
  
  // Create HTML for overview
  let html = `
    <div class="section-header">
      <h2>Executive Summary</h2>
      <p>Based on ${formatNumber(currentSettings.organization.deviceCount)} devices across ${currentSettings.organization.locations} locations over ${currentSettings.analysisSettings.period} years.</p>
    </div>
    
    <div class="stats-grid">
  `;
  
  // Add key metrics
  selectedVendors.forEach(vendorId => {
    const vendor = vendorData[vendorId];
    const tco = tcoResults[vendorId];
    
    if (vendorId === 'portnox') {
      // Calculate savings vs baseline
      let savings = 0;
      let savingsPercentage = 0;
      
      if (selectedVendors.includes(baselineVendorId) && baselineVendorId !== 'portnox') {
        savings = tcoResults[baselineVendorId].total - tco.total;
        savingsPercentage = (savings / tcoResults[baselineVendorId].total) * 100;
      }
      
      html += `
        <div class="stat-card" style="border-left-color: ${vendor.color};">
          <h3 class="stat-title">Total Savings with Portnox</h3>
          <p class="stat-value">${formatCurrency(savings)}</p>
          <p class="stat-detail">${formatPercentage(savingsPercentage)} reduction over ${currentSettings.analysisSettings.period} years</p>
        </div>
        
        <div class="stat-card" style="border-left-color: ${vendor.color};">
          <h3 class="stat-title">Break-even Point</h3>
          <p class="stat-value">${vendor.breakeven} months</p>
          <p class="stat-detail">Time to positive ROI</p>
        </div>
        
        <div class="stat-card" style="border-left-color: ${vendor.color};">
          <h3 class="stat-title">Risk Reduction</h3>
          <p class="stat-value">${vendor.riskReduction}%</p>
          <p class="stat-detail">Security improvement</p>
        </div>
      `;
    }
    
    // Add vendor-specific card
    html += `
      <div class="stat-card" style="border-left-color: ${vendor.color};">
        <h3 class="stat-title">${vendor.name} 3-Year TCO</h3>
        <p class="stat-value">${formatCurrency(tco.total)}</p>
        <p class="stat-detail">${formatCurrency(tco.total / currentSettings.organization.deviceCount)} per device</p>
      </div>
    `;
  });
  
  html += `</div>`;
  
  // Add 3-year cost comparison chart
  html += `
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Total Cost Comparison (${currentSettings.analysisSettings.period} Years)</h3>
        <div class="chart-container">
          <canvas id="tco-comparison-chart"></canvas>
        </div>
      </div>
    </div>
  `;
  
  // Add key insights
  html += `
    <div class="key-insights">
      <h3>Key Insights</h3>
      <ul class="insights-list">
        <li>Portnox Cloud reduces hardware costs by eliminating on-premise appliances and servers</li>
        <li>Staff time allocation for NAC management reduced from 50% to 15% of FTE</li>
        <li>Implementation timeline reduced by 75% compared to traditional NAC solutions</li>
        <li>Zero Trust architecture enhances security posture with continual verification</li>
        <li>Cloud-native approach provides automatic updates and maintenance-free operation</li>
      </ul>
    </div>
  `;
  
  // Set the HTML
  overviewTab.innerHTML = html;
  
  // Render the TCO comparison chart
  renderTCOComparisonChart(tcoResults);
}

// Render TCO comparison chart
function renderTCOComparisonChart(tcoResults) {
  const ctx = document.getElementById('tco-comparison-chart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (chartsReferences.tcoComparisonChart) {
    chartsReferences.tcoComparisonChart.destroy();
  }
  
  // Prepare data
  const labels = selectedVendors.map(vendorId => vendorData[vendorId].name);
  const data = selectedVendors.map(vendorId => tcoResults[vendorId].total);
  const backgroundColor = selectedVendors.map(vendorId => vendorData[vendorId].color);
  
  // Create chart
  chartsReferences.tcoComparisonChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: `${currentSettings.analysisSettings.period}-Year TCO`,
        data: data,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return formatCurrency(context.raw);
            }
          }
        },
        datalabels: {
          color: '#fff',
          font: {
            weight: 'bold'
          },
          formatter: function(value) {
            return formatCurrency(value);
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

// Render cost analysis tab
function renderCostAnalysis() {
  const costsTab = document.getElementById('costs-tab');
  if (!costsTab) return;
  
  // Calculate TCO for selected vendors
  const tcoResults = {};
  selectedVendors.forEach(vendorId => {
    tcoResults[vendorId] = calculateTCO(vendorId);
  });
  
  // Create HTML for cost analysis
  let html = `
    <div class="section-header">
      <h2>Cost Analysis</h2>
      <p>Detailed breakdown of costs by category and year.</p>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Cost Breakdown by Category</h3>
        <div class="chart-container">
          <canvas id="cost-breakdown-chart"></canvas>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Annual Costs Comparison</h3>
        <div class="chart-container">
          <canvas id="annual-costs-chart"></canvas>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Cumulative Cost Over Time</h3>
        <div class="chart-container">
          <canvas id="cumulative-costs-chart"></canvas>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Detailed Cost Comparison</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Cost Category</th>
                ${selectedVendors.map(vendorId => `<th>${vendorData[vendorId].name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hardware</td>
                ${selectedVendors.map(vendorId => `<td class="numeric">${formatCurrency(tcoResults[vendorId].breakdown.hardware)}</td>`).join('')}
              </tr>
              <tr>
                <td>Software/Subscription</td>
                ${selectedVendors.map(vendorId => `<td class="numeric">${formatCurrency(tcoResults[vendorId].breakdown.software)}</td>`).join('')}
              </tr>
              <tr>
                <td>Implementation</td>
                ${selectedVendors.map(vendorId => `<td class="numeric">${formatCurrency(tcoResults[vendorId].breakdown.implementation)}</td>`).join('')}
              </tr>
              <tr>
                <td>Maintenance</td>
                ${selectedVendors.map(vendorId => `<td class="numeric">${formatCurrency(tcoResults[vendorId].breakdown.maintenance)}</td>`).join('')}
              </tr>
              <tr>
                <td>Training</td>
                ${selectedVendors.map(vendorId => `<td class="numeric">${formatCurrency(tcoResults[vendorId].breakdown.training)}</td>`).join('')}
              </tr>
              <tr>
                <td>Personnel (FTE)</td>
                ${selectedVendors.map(vendorId => `<td class="numeric">${formatCurrency(tcoResults[vendorId].breakdown.staffing)}</td>`).join('')}
              </tr>
              <tr>
                <td><strong>Total ${currentSettings.analysisSettings.period}-Year TCO</strong></td>
                ${selectedVendors.map(vendorId => `<td class="numeric"><strong>${formatCurrency(tcoResults[vendorId].total)}</strong></td>`).join('')}
              </tr>
              <tr>
                <td>Per-device TCO</td>
                ${selectedVendors.map(vendorId => `<td class="numeric">${formatCurrency(tcoResults[vendorId].total / currentSettings.organization.deviceCount)}</td>`).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  
  // Set the HTML
  costsTab.innerHTML = html;
  
  // Render charts
  renderCostBreakdownChart(tcoResults);
  renderAnnualCostsChart(tcoResults);
  renderCumulativeCostsChart(tcoResults);
}

// Render cost breakdown chart
function renderCostBreakdownChart(tcoResults) {
  const ctx = document.getElementById('cost-breakdown-chart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (chartsReferences.costBreakdownChart) {
    chartsReferences.costBreakdownChart.destroy();
  }
  
  // Cost categories
  const categories = ['Hardware', 'Software', 'Implementation', 'Maintenance', 'Training', 'Staffing'];
  
  // Prepare datasets
  const datasets = selectedVendors.map(vendorId => {
    const vendor = vendorData[vendorId];
    const tco = tcoResults[vendorId];
    
    return {
      label: vendor.name,
      backgroundColor: vendor.color,
      data: [
        tco.breakdown.hardware,
        tco.breakdown.software,
        tco.breakdown.implementation,
        tco.breakdown.maintenance,
        tco.breakdown.training,
        tco.breakdown.staffing
      ]
    };
  });
  
  // Create chart
  chartsReferences.costBreakdownChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categories,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
            }
          }
        }
      },
      scales: {
        x: {
          stacked: false
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

// Render annual costs chart
function renderAnnualCostsChart(tcoResults) {
  const ctx = document.getElementById('annual-costs-chart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (chartsReferences.annualCostsChart) {
    chartsReferences.annualCostsChart.destroy();
  }
  
  // Prepare labels (years)
  const years = Array.from({length: currentSettings.analysisSettings.period}, (_, i) => `Year ${i + 1}`);
  
  // Prepare datasets
  const datasets = selectedVendors.map(vendorId => {
    const vendor = vendorData[vendorId];
    const tco = tcoResults[vendorId];
    
    return {
      label: vendor.name,
      backgroundColor: vendor.color,
      borderColor: vendor.color,
      data: tco.yearly.map(year => year.total)
    };
  });
  
  // Create chart
  chartsReferences.annualCostsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: years,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

// Render cumulative costs chart
function renderCumulativeCostsChart(tcoResults) {
  const ctx = document.getElementById('cumulative-costs-chart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (chartsReferences.cumulativeCostsChart) {
    chartsReferences.cumulativeCostsChart.destroy();
  }
  
  // Prepare labels (years)
  const years = ['Initial'].concat(Array.from({length: currentSettings.analysisSettings.period}, (_, i) => `Year ${i + 1}`));
  
  // Prepare datasets
  const datasets = selectedVendors.map(vendorId => {
    const vendor = vendorData[vendorId];
    const tco = tcoResults[vendorId];
    
    // Calculate cumulative costs
    const cumulativeCosts = [0]; // Initial
    let runningTotal = 0;
    
    for (let i = 0; i < tco.yearly.length; i++) {
      runningTotal += tco.yearly[i].total;
      cumulativeCosts.push(runningTotal);
    }
    
    return {
      label: vendor.name,
      backgroundColor: 'transparent',
      borderColor: vendor.color,
      data: cumulativeCosts,
      tension: 0.1
    };
  });
  
  // Create chart
  chartsReferences.cumulativeCostsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

// Render implementation tab
function renderImplementation() {
  const implementationTab = document.getElementById('implementation-tab');
  if (!implementationTab) return;
  
  // Create HTML for implementation
  let html = `
    <div class="section-header">
      <h2>Implementation Comparison</h2>
      <p>Analysis of implementation requirements and timelines.</p>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Implementation Timeline (Days)</h3>
        <div class="chart-container">
          <canvas id="implementation-timeline-chart"></canvas>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Implementation Requirements</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Implementation Factor</th>
                ${selectedVendors.map(vendorId => `<th>${vendorData[vendorId].name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hardware Installation</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  return `<td>${vendor.type === 'Cloud-native' || vendor.type === 'Cloud-based' ? 'None Required' : 'Required'}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Integration Complexity</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let complexity = 'Medium';
                  if (vendorId === 'portnox' || vendorId === 'foxpass' || vendorId === 'secureW2') {
                    complexity = 'Low';
                  } else if (vendorId === 'cisco' || vendorId === 'aruba' || vendorId === 'forescout') {
                    complexity = 'High';
                  }
                  return `<td>${complexity}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Required Expertise</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let expertise = 'Medium';
                  if (vendorId === 'portnox' || vendorId === 'foxpass' || vendorId === 'secureW2') {
                    expertise = 'Low';
                  } else if (vendorId === 'cisco' || vendorId === 'aruba') {
                    expertise = 'High (Certification)';
                  }
                  return `<td>${expertise}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Implementation Services</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let services = 'Recommended';
                  if (vendorId === 'cisco' || vendorId === 'aruba' || vendorId === 'forescout') {
                    services = 'Required';
                  } else if (vendorId === 'portnox' || vendorId === 'foxpass') {
                    services = 'Optional';
                  }
                  return `<td>${services}</td>`;
                }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  
  // Add Portnox implementation roadmap if selected
  if (selectedVendors.includes('portnox')) {
    html += `
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Portnox Cloud Implementation Roadmap</h3>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <h4 class="timeline-title">Day 1: Setup & Planning</h4>
              <div class="timeline-content">
                <p>Initial configuration and account setup, network assessment, and defining security policies.</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <h4 class="timeline-title">Day 2-3: Initial Deployment</h4>
              <div class="timeline-content">
                <p>Cloud RADIUS integration with network infrastructure, directory services integration (AD/LDAP), and testing authentication with pilot group.</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <h4 class="timeline-title">Day 4-5: Rollout & Training</h4>
              <div class="timeline-content">
                <p>Phased deployment across departments, administrator and help desk training, and user communication.</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <h4 class="timeline-title">Day 6-7: Optimization & Verification</h4>
              <div class="timeline-content">
                <p>Fine-tune policies and automated responses, compliance verification and reporting, and full production deployment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  // Set the HTML
  implementationTab.innerHTML = html;
  
  // Render implementation timeline chart
  renderImplementationTimelineChart();
}

// Render implementation timeline chart
function renderImplementationTimelineChart() {
  const ctx = document.getElementById('implementation-timeline-chart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (chartsReferences.implementationTimelineChart) {
    chartsReferences.implementationTimelineChart.destroy();
  }
  
  // Prepare data
  const labels = selectedVendors.map(vendorId => vendorData[vendorId].name);
  const data = selectedVendors.map(vendorId => {
    const vendor = vendorData[vendorId];
    return vendor.deploymentTime[currentSettings.organization.size];
  });
  const backgroundColor = selectedVendors.map(vendorId => vendorData[vendorId].color);
  
  // Create chart
  chartsReferences.implementationTimelineChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Implementation Days',
        data: data,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const days = context.raw;
              return `${days} day${days !== 1 ? 's' : ''}`;
            }
          }
        },
        datalabels: {
          align: 'end',
          anchor: 'end',
          formatter: function(value) {
            return `${value} day${value !== 1 ? 's' : ''}`;
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Days'
          }
        }
      }
    }
  });
}

// Render features tab
function renderFeatures() {
  const featuresTab = document.getElementById('features-tab');
  if (!featuresTab) return;
  
  // Create HTML for features
  let html = `
    <div class="section-header">
      <h2>Feature Comparison</h2>
      <p>Detailed analysis of feature capabilities across vendors.</p>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Feature Capability Comparison</h3>
        <div class="chart-container">
          <canvas id="feature-radar-chart"></canvas>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Detailed Feature Matrix</h3>
        <div class="table-responsive">
          <table class="data-table feature-table">
            <thead>
              <tr>
                <th>Feature</th>
                ${selectedVendors.map(vendorId => `<th>${vendorData[vendorId].name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cloud-Native Architecture</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let support = '';
                  let supportClass = '';
                  
                  if (vendor.features.cloudNative === 'Full') {
                    support = '✅ Full';
                    supportClass = 'support-full';
                  } else if (vendor.features.cloudNative === 'Limited') {
                    support = '⚠️ Limited';
                    supportClass = 'support-partial';
                  } else if (vendor.features.cloudNative === 'None') {
                    support = '❌ None';
                    supportClass = 'support-none';
                  } else {
                    support = vendor.features.cloudNative;
                    supportClass = 'support-partial';
                  }
                  
                  return `<td><span class="feature-support ${supportClass}">${support}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Zero Trust Security</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let support = '';
                  let supportClass = '';
                  
                  if (vendor.features.zeroTrust === 'Full') {
                    support = '✅ Full';
                    supportClass = 'support-full';
                  } else if (vendor.features.zeroTrust === 'Partial') {
                    support = '⚠️ Partial';
                    supportClass = 'support-partial';
                  } else if (vendor.features.zeroTrust === 'Limited') {
                    support = '⚠️ Limited';
                    supportClass = 'support-partial';
                  } else if (vendor.features.zeroTrust === 'None') {
                    support = '❌ None';
                    supportClass = 'support-none';
                  } else {
                    support = vendor.features.zeroTrust;
                    supportClass = 'support-partial';
                  }
                  
                  return `<td><span class="feature-support ${supportClass}">${support}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>API Integrations</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let support = '';
                  let supportClass = '';
                  
                  if (vendor.features.api === 'Advanced') {
                    support = '✅ Advanced';
                    supportClass = 'support-full';
                  } else if (vendor.features.api === 'Good') {
                    support = '✅ Good';
                    supportClass = 'support-full';
                  } else if (vendor.features.api === 'Basic') {
                    support = '⚠️ Basic';
                    supportClass = 'support-partial';
                  } else if (vendor.features.api === 'Limited') {
                    support = '⚠️ Limited';
                    supportClass = 'support-partial';
                  } else {
                    support = vendor.features.api;
                    supportClass = 'support-partial';
                  }
                  
                  return `<td><span class="feature-support ${supportClass}">${support}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Scalability</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let support = '';
                  let supportClass = '';
                  
                  if (vendor.features.scalability === 'Simple') {
                    support = '✅ Simple';
                    supportClass = 'support-full';
                  } else if (vendor.features.scalability === 'Good') {
                    support = '✅ Good';
                    supportClass = 'support-full';
                  } else if (vendor.features.scalability === 'Moderate') {
                    support = '⚠️ Moderate';
                    supportClass = 'support-partial';
                  } else if (vendor.features.scalability === 'Complex') {
                    support = '⚠️ Complex';
                    supportClass = 'support-partial';
                  } else if (vendor.features.scalability === 'Limited') {
                    support = '⚠️ Limited';
                    supportClass = 'support-partial';
                  } else {
                    support = vendor.features.scalability;
                    supportClass = 'support-partial';
                  }
                  
                  return `<td><span class="feature-support ${supportClass}">${support}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>BYOD Support</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let support = '';
                  let supportClass = '';
                  
                  if (vendor.features.byod === 'Advanced') {
                    support = '✅ Advanced';
                    supportClass = 'support-full';
                  } else if (vendor.features.byod === 'Yes') {
                    support = '✅ Yes';
                    supportClass = 'support-full';
                  } else if (vendor.features.byod === 'Good') {
                    support = '✅ Good';
                    supportClass = 'support-full';
                  } else if (vendor.features.byod === 'Basic') {
                    support = '⚠️ Basic';
                    supportClass = 'support-partial';
                  } else if (vendor.features.byod === 'Limited') {
                    support = '⚠️ Limited';
                    supportClass = 'support-partial';
                  } else if (vendor.features.byod === 'No') {
                    support = '❌ No';
                    supportClass = 'support-none';
                  } else {
                    support = vendor.features.byod;
                    supportClass = 'support-partial';
                  }
                  
                  return `<td><span class="feature-support ${supportClass}">${support}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Guest Management</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let support = '';
                  let supportClass = '';
                  
                  if (vendor.features.guestManagement === 'Advanced') {
                    support = '✅ Advanced';
                    supportClass = 'support-full';
                  } else if (vendor.features.guestManagement === 'Good') {
                    support = '✅ Good';
                    supportClass = 'support-full';
                  } else if (vendor.features.guestManagement === 'Basic') {
                    support = '⚠️ Basic';
                    supportClass = 'support-partial';
                  } else if (vendor.features.guestManagement === 'Limited') {
                    support = '⚠️ Limited';
                    supportClass = 'support-partial';
                  } else if (vendor.features.guestManagement === 'No') {
                    support = '❌ No';
                    supportClass = 'support-none';
                  } else {
                    support = vendor.features.guestManagement;
                    supportClass = 'support-partial';
                  }
                  
                  return `<td><span class="feature-support ${supportClass}">${support}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Remote Access</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let support = '';
                  let supportClass = '';
                  
                  if (vendor.features.remoteAccess === 'Full') {
                    support = '✅ Full';
                    supportClass = 'support-full';
                  } else if (vendor.features.remoteAccess === 'Good') {
                    support = '✅ Good';
                    supportClass = 'support-full';
                  } else if (vendor.features.remoteAccess === 'Limited') {
                    support = '⚠️ Limited';
                    supportClass = 'support-partial';
                  } else if (vendor.features.remoteAccess === 'None') {
                    support = '❌ None';
                    supportClass = 'support-none';
                  } else {
                    support = vendor.features.remoteAccess;
                    supportClass = 'support-partial';
                  }
                  
                  return `<td><span class="feature-support ${supportClass}">${support}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Device Discovery</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let support = '';
                  let supportClass = '';
                  
                  if (vendor.features.deviceDiscovery === 'Advanced' || vendor.features.deviceDiscovery === 'Exceptional') {
                    support = '✅ ' + vendor.features.deviceDiscovery;
                    supportClass = 'support-full';
                  } else if (vendor.features.deviceDiscovery === 'Good') {
                    support = '✅ Good';
                    supportClass = 'support-full';
                  } else if (vendor.features.deviceDiscovery === 'Basic') {
                    support = '⚠️ Basic';
                    supportClass = 'support-partial';
                  } else if (vendor.features.deviceDiscovery === 'Limited') {
                    support = '⚠️ Limited';
                    supportClass = 'support-partial';
                  } else {
                    support = vendor.features.deviceDiscovery;
                    supportClass = 'support-partial';
                  }
                  
                  return `<td><span class="feature-support ${supportClass}">${support}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Risk Assessment</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let support = '';
                  let supportClass = '';
                  
                  if (vendor.features.riskAssessment === 'Continuous' || vendor.features.riskAssessment === 'Advanced') {
                    support = '✅ ' + vendor.features.riskAssessment;
                    supportClass = 'support-full';
                  } else if (vendor.features.riskAssessment === 'Good') {
                    support = '✅ Good';
                    supportClass = 'support-full';
                  } else if (vendor.features.riskAssessment === 'Point-in-time') {
                    support = '⚠️ Point-in-time';
                    supportClass = 'support-partial';
                  } else if (vendor.features.riskAssessment === 'Basic') {
                    support = '⚠️ Basic';
                    supportClass = 'support-partial';
                  } else if (vendor.features.riskAssessment === 'Limited') {
                    support = '⚠️ Limited';
                    supportClass = 'support-partial';
                  } else {
                    support = vendor.features.riskAssessment;
                    supportClass = 'support-partial';
                  }
                  
                  return `<td><span class="feature-support ${supportClass}">${support}</span></td>`;
                }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  
  // Set the HTML
  featuresTab.innerHTML = html;
  
  // Render feature radar chart
  renderFeatureRadarChart();
}

// Render feature radar chart
function renderFeatureRadarChart() {
  const ctx = document.getElementById('feature-radar-chart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (chartsReferences.featureRadarChart) {
    chartsReferences.featureRadarChart.destroy();
  }
  
  // Feature categories for radar chart
  const features = [
    'Cloud Support', 
    'API Integration', 
    'Scalability', 
    'Security', 
    'User Experience', 
    'Zero Trust', 
    'Mobile Support'
  ];
  
  // Convert feature ratings to numerical values for radar chart
  function getFeatureScore(vendorId, feature) {
    const vendor = vendorData[vendorId];
    
    switch (feature) {
      case 'Cloud Support':
        return vendor.features.cloudNative === 'Full' ? 100 : 
               vendor.features.cloudNative === 'Partial' ? 70 : 
               vendor.features.cloudNative === 'Limited' ? 50 : 
               vendor.features.cloudNative === 'None' ? 10 : 50;
      case 'API Integration':
        return vendor.features.api === 'Advanced' ? 90 : 
               vendor.features.api === 'Good' ? 80 : 
               vendor.features.api === 'Basic' ? 50 : 
               vendor.features.api === 'Limited' ? 30 : 50;
      case 'Scalability':
        return vendor.features.scalability === 'Simple' ? 100 : 
               vendor.features.scalability === 'Good' ? 80 : 
               vendor.features.scalability === 'Moderate' ? 60 : 
               vendor.features.scalability === 'Complex' ? 40 : 
               vendor.features.scalability === 'Limited' ? 30 : 50;
      case 'Security':
        // Use risk reduction as a proxy for security
        return vendor.riskReduction ? vendor.riskReduction + 20 : 50;
      case 'User Experience':
        // Base this on combination of factors
        return vendor.features.byod === 'Advanced' || vendor.features.byod === 'Yes' ? 80 : 
               vendor.features.byod === 'Good' ? 70 : 
               vendor.features.byod === 'Basic' ? 50 : 
               vendor.features.byod === 'Limited' ? 40 : 60;
      case 'Zero Trust':
        return vendor.features.zeroTrust === 'Full' ? 100 : 
               vendor.features.zeroTrust === 'Good' ? 80 : 
               vendor.features.zeroTrust === 'Partial' ? 60 : 
               vendor.features.zeroTrust === 'Limited' ? 40 : 
               vendor.features.zeroTrust === 'None' ? 10 : 50;
      case 'Mobile Support':
        // Estimate based on related features
        return vendor.features.byod === 'Advanced' ? 90 : 
               vendor.features.byod === 'Yes' || vendor.features.byod === 'Good' ? 80 : 
               vendor.features.byod === 'Basic' ? 60 : 
               vendor.features.byod === 'Limited' ? 50 : 70;
      default:
        return 50; // Default value
    }
  }
  
  // Prepare datasets
  const datasets = selectedVendors.map(vendorId => {
    const vendor = vendorData[vendorId];
    
    return {
      label: vendor.name,
      data: features.map(feature => getFeatureScore(vendorId, feature)),
      backgroundColor: `${vendor.color}33`,
      borderColor: vendor.color,
      pointBackgroundColor: vendor.color,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: vendor.color
    };
  });
  
  // Create chart
  chartsReferences.featureRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: features,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          borderWidth: 2
        }
      },
      scales: {
        r: {
          angleLines: {
            display: true
          },
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    }
  });
}

// Render compliance tab
function renderCompliance() {
  const complianceTab = document.getElementById('compliance-tab');
  if (!complianceTab) return;
  
  // Create HTML for compliance
  let html = `
    <div class="section-header">
      <h2>Compliance Framework Coverage</h2>
      <p>Analysis of coverage for key regulatory frameworks.</p>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Compliance Framework Coverage</h3>
        <div class="chart-container">
          <canvas id="compliance-radar-chart"></canvas>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Compliance Matrix</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Requirement</th>
                ${selectedVendors.map(vendorId => `<th>${vendorData[vendorId].name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PCI DSS 3.2.1 Requirement 1.3 (Network Segmentation)</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  const score = vendor.features.compliance.pciDss;
                  let support = '';
                  let supportClass = '';
                  
                  if (score >= 90) {
                    support = '✅ Full';
                    supportClass = 'support-full';
                  } else if (score >= 60) {
                    support = '⚠️ Partial';
                    supportClass = 'support-partial';
                  } else {
                    support = '❌ Limited';
                    supportClass = 'support-none';
                  }
                  
                  return `<td><span class="feature-support ${supportClass}">${support}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>PCI DSS 3.2.1 Requirement 7.1 (Access Control)</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  const score = vendor.features.compliance.pciDss;
                  let support = '';
                  let supportClass = '';
                  
                  if (score >= 70) {
                    support = '✅ Full';
                    supportClass = 'support-full';
                  } else if (score >= 40) {
                    support = '⚠️ Partial';
                    supportClass = 'support-partial';
                  } else {
                    support = '❌ Limited';
                    supportClass = 'support-none';
                  }
                  
                  return `<td><span class="feature-support ${supportClass}">${support}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>PCI DSS 3.2.1 Requirement 8.1 (User Authentication)</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  const score = vendor.features.compliance.pciDss;
                  let support = '';
                  let supportClass = '';
                  
                  if (score >= 60) {
                    support = '✅ Full';
                    supportClass = 'support-full';
                  } else if (score >= 30) {
                    support = '⚠️ Partial';
                    supportClass = 'support-partial';
                  } else {
                    support = '❌ Limited';
                    supportClass = 'support-none';
                  }
                  
                  return `<td><span class="feature-support ${supportClass}">${support}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>PCI DSS 3.2.1 Requirement 10.1 (Audit Logging)</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  const score = vendor.features.compliance.pciDss;
                  let support = '';
                  let supportClass = '';
                  
                  if (score >= 80) {
                    support = '✅ Full';
                    supportClass = 'support-full';
                  } else if (score >= 50) {
                    support = '⚠️ Partial';
                    supportClass = 'support-partial';
                  } else {
                    support = '❌ Limited';
                    supportClass = 'support-none';
                  }
                  
                  return `<td><span class="feature-support ${supportClass}">${support}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>NIST 800-53 AC-1 (Access Control Policy)</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  const score = vendor.features.compliance.nist;
                  let support = '';
                  let supportClass = '';
                  
                  if (score >= 60) {
                    support = '✅ Full';
                    supportClass = 'support-full';
                  } else if (score >= 30) {
                    support = '⚠️ Partial';
                    supportClass = 'support-partial';
                  } else {
                    support = '❌ Limited';
                    supportClass = 'support-none';
                  }
                  
                  return `<td><span class="feature-support ${supportClass}">${support}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>NIST 800-53 AC-17 (Remote Access)</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  const score = vendor.features.compliance.nist;
                  let support = '';
                  let supportClass = '';
                  
                  if (score >= 85) {
                    support = '✅ Full';
                    supportClass = 'support-full';
                  } else if (score >= 55) {
                    support = '⚠️ Partial';
                    supportClass = 'support-partial';
                  } else {
                    support = '❌ Limited';
                    supportClass = 'support-none';
                  }
                  
                  return `<td><span class="feature-support ${supportClass}">${support}</span></td>`;
                }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  
  // Set the HTML
  complianceTab.innerHTML = html;
  
  // Render compliance radar chart
  renderComplianceRadarChart();
}

// Render compliance radar chart
function renderComplianceRadarChart() {
  const ctx = document.getElementById('compliance-radar-chart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (chartsReferences.complianceRadarChart) {
    chartsReferences.complianceRadarChart.destroy();
  }
  
  // Compliance frameworks
  const frameworks = ['PCI DSS', 'NIST', 'ISO 27001', 'HIPAA', 'GDPR'];
  
  // Prepare datasets
  const datasets = selectedVendors.map(vendorId => {
    const vendor = vendorData[vendorId];
    
    return {
      label: vendor.name,
      data: [
        vendor.features.compliance.pciDss,
        vendor.features.compliance.nist,
        vendor.features.compliance.iso27001,
        vendor.features.compliance.hipaa,
        vendor.features.compliance.gdpr
      ],
      backgroundColor: `${vendor.color}33`,
      borderColor: vendor.color,
      pointBackgroundColor: vendor.color,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: vendor.color
    };
  });
  
  // Create chart
  chartsReferences.complianceRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: frameworks,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          borderWidth: 2
        }
      },
      scales: {
        r: {
          angleLines: {
            display: true
          },
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    }
  });
}

// Render ROI tab
function renderROI() {
  const roiTab = document.getElementById('roi-tab');
  if (!roiTab) return;
  
  // Calculate TCO for selected vendors
  const tcoResults = {};
  selectedVendors.forEach(vendorId => {
    tcoResults[vendorId] = calculateTCO(vendorId);
  });
  
  // Create HTML for ROI
  let html = `
    <div class="section-header">
      <h2>ROI Analysis</h2>
      <p>Return on investment projections and analysis.</p>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">ROI Comparison</h3>
        <div class="chart-container">
          <canvas id="roi-chart"></canvas>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">ROI Breakdown</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>ROI Metrics</th>
                ${selectedVendors.map(vendorId => `<th>${vendorData[vendorId].name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Break-even Point</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  return `<td>${vendor.breakeven} months</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Year 1 ROI</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  return `<td>${formatPercentage(vendor.roi.year1)}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Year 3 ROI</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  return `<td>${formatPercentage(vendor.roi.year3)}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Total Cost (${currentSettings.analysisSettings.period} Years)</td>
                ${selectedVendors.map(vendorId => {
                  const tco = tcoResults[vendorId];
                  return `<td>${formatCurrency(tco.total)}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Per-device Cost</td>
                ${selectedVendors.map(vendorId => {
                  const tco = tcoResults[vendorId];
                  return `<td>${formatCurrency(tco.total / currentSettings.organization.deviceCount)}</td>`;
                }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  
  // Add key insights
  html += `
    <div class="key-insights">
      <h3>Key ROI Findings</h3>
      <ul class="insights-list">
        <li>Cloud-native solutions like Portnox provide faster time-to-value with break-even points as early as 6 months</li>
        <li>Traditional NAC solutions have significantly higher upfront costs but can deliver positive ROI over longer timeframes</li>
        <li>Hardware elimination is a major contributor to cloud-native ROI advantage</li>
        <li>FTE reduction from simpler management provides substantial ongoing savings</li>
        <li>Faster implementation reduces time-to-security, providing risk mitigation benefits</li>
      </ul>
    </div>
  `;
  
  // Set the HTML
  roiTab.innerHTML = html;
  
  // Render ROI chart
  renderROIChart();
}

// Render ROI chart
function renderROIChart() {
  const ctx = document.getElementById('roi-chart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (chartsReferences.roiChart) {
    chartsReferences.roiChart.destroy();
  }
  
  // Prepare labels (years)
  const years = ['Year 1', 'Year 2', 'Year 3'];
  
  // Prepare datasets
  const datasets = selectedVendors.map(vendorId => {
    const vendor = vendorData[vendorId];
    
    return {
      label: vendor.name,
      data: [vendor.roi.year1, vendor.roi.year2, vendor.roi.year3],
      backgroundColor: 'transparent',
      borderColor: vendor.color,
      tension: 0.1
    };
  });
  
  // Create chart
  chartsReferences.roiChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${formatPercentage(context.raw)}`;
            }
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: function(value) {
              return formatPercentage(value);
            }
          }
        }
      }
    }
  });
}

// Render risk tab
function renderRisk() {
  const riskTab = document.getElementById('risk-tab');
  if (!riskTab) return;
  
  // Create HTML for risk
  let html = `
    <div class="section-header">
      <h2>Risk Analysis</h2>
      <p>Assessment of security risk factors and mitigation.</p>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Risk Assessment Analysis</h3>
        <div class="chart-container">
          <canvas id="risk-radar-chart"></canvas>
        </div>
        <p class="text-center text-muted mt-2">Lower scores indicate better risk mitigation</p>
      </div>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Risk Assessment Matrix</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Risk Factor</th>
                ${selectedVendors.map(vendorId => `<th>${vendorData[vendorId].name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Unauthorized Access</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let riskLevel = '';
                  let riskClass = '';
                  
                  if (vendorId === 'portnox' || vendorId === 'secureW2' || vendorId === 'foxpass') {
                    riskLevel = 'Low Risk';
                    riskClass = 'support-full';
                  } else if (vendorId === 'microsoft') {
                    riskLevel = 'High Risk';
                    riskClass = 'support-none';
                  } else {
                    riskLevel = 'Medium Risk';
                    riskClass = 'support-partial';
                  }
                  
                  return `<td><span class="feature-support ${riskClass}">${riskLevel}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Compliance Violations</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let riskLevel = '';
                  let riskClass = '';
                  
                  if (vendorId === 'portnox') {
                    riskLevel = 'Low Risk';
                    riskClass = 'support-full';
                  } else if (vendorId === 'microsoft') {
                    riskLevel = 'High Risk';
                    riskClass = 'support-none';
                  } else {
                    riskLevel = 'Medium Risk';
                    riskClass = 'support-partial';
                  }
                  
                  return `<td><span class="feature-support ${riskClass}">${riskLevel}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Network Visibility</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let riskLevel = '';
                  let riskClass = '';
                  
                  if (vendorId === 'portnox' || vendorId === 'forescout') {
                    riskLevel = 'High Visibility';
                    riskClass = 'support-full';
                  } else if (vendorId === 'microsoft') {
                    riskLevel = 'Low Visibility';
                    riskClass = 'support-none';
                  } else {
                    riskLevel = 'Medium Visibility';
                    riskClass = 'support-partial';
                  }
                  
                  return `<td><span class="feature-support ${riskClass}">${riskLevel}</span></td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Configuration Errors</td>
                ${selectedVendors.map(vendorId => {
                  const vendor = vendorData[vendorId];
                  let riskLevel = '';
                  let riskClass = '';
                  
                  if (vendorId === 'portnox' || vendorId === 'secureW2' || vendorId === 'foxpass') {
                    riskLevel = 'Low Risk';
                    riskClass = 'support-full';
                  } else if (vendorId === 'cisco' || vendorId === 'aruba') {
                    riskLevel = 'High Risk';
                    riskClass = 'support-none';
                  } else {
                    riskLevel = 'Medium Risk';
                    riskClass = 'support-partial';
                  }
                  
                  return `<td><span class="feature-support ${riskClass}">${riskLevel}</span></td>`;
                }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <div class="key-insights">
      <h3>Risk Mitigation Advantages</h3>
      <ul class="insights-list">
        <li><strong>Continuous Authentication:</strong> Zero Trust model verifies every access request</li>
        <li><strong>Enhanced Visibility:</strong> Comprehensive device inventory and status monitoring</li>
        <li><strong>Automated Remediation:</strong> Immediate response to compliance violations</li>
        <li><strong>Simplified Management:</strong> Reduced risk of misconfiguration</li>
        <li><strong>Reduced Attack Surface:</strong> Cloud architecture limits on-premise vulnerabilities</li>
      </ul>
    </div>
  `;
  
  // Set the HTML
  riskTab.innerHTML = html;
  
  // Render risk radar chart
  renderRiskRadarChart();
}

// Render risk radar chart
function renderRiskRadarChart() {
  const ctx = document.getElementById('risk-radar-chart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (chartsReferences.riskRadarChart) {
    chartsReferences.riskRadarChart.destroy();
  }
  
  // Risk categories
  const categories = ['Breach Risk', 'Compliance', 'Visibility', 'Management', 'Uptime'];
  
  // Create risk scores (lower is better)
  function getRiskScores(vendorId) {
    // Base risk scores on vendor's risk reduction percentage
    // Higher risk reduction = lower risk scores
    const vendor = vendorData[vendorId];
    const baseRiskReduction = vendor.riskReduction || 40;
    
    // Risk values (lower values = better risk mitigation)
    return [
      100 - baseRiskReduction,                       // Breach Risk
      100 - (baseRiskReduction + 5),                 // Compliance
      100 - (baseRiskReduction + 10),                // Visibility
      100 - (baseRiskReduction - 5),                 // Management
      100 - (baseRiskReduction + 15)                 // Uptime
    ];
  }
  
  // Prepare datasets
  const datasets = selectedVendors.map(vendorId => {
    const vendor = vendorData[vendorId];
    
    return {
      label: `${vendor.name} (Risk Score)`,
      data: getRiskScores(vendorId),
      backgroundColor: `${vendor.color}33`,
      borderColor: vendor.color,
      pointBackgroundColor: vendor.color,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: vendor.color
    };
  });
  
  // Create chart
  chartsReferences.riskRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: categories,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          borderWidth: 2
        }
      },
      scales: {
        r: {
          angleLines: {
            display: true
          },
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    }
  });
}

// Render sensitivity tab
function renderSensitivity() {
  const sensitivityTab = document.getElementById('sensitivity-tab');
  if (!sensitivityTab) return;
  
  // Create HTML for sensitivity
  let html = `
    <div class="section-header">
      <h2>Sensitivity Analysis</h2>
      <p>Analyze how changes in key variables affect TCO.</p>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Sensitivity Controls</h3>
        <div class="row mb-4">
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-label">Variable to Analyze</label>
              <select id="sensitivity-variable" class="form-control">
                <option value="deviceCount">Device Count</option>
                <option value="fteRate">FTE Cost</option>
                <option value="locations">Number of Locations</option>
                <option value="period">Analysis Period</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-label">Min Value</label>
              <input type="number" id="sensitivity-min" class="form-control" value="300">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-label">Max Value</label>
              <input type="number" id="sensitivity-max" class="form-control" value="5000">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button id="run-sensitivity" class="btn btn-primary">Run Sensitivity Analysis</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Sensitivity Analysis Results</h3>
        <div class="chart-container">
          <canvas id="sensitivity-chart"></canvas>
        </div>
      </div>
    </div>
    
    <div class="key-insights">
      <h3>Sensitivity Analysis Insights</h3>
      <ul class="insights-list">
        <li>Portnox Cloud maintains cost advantage across all device count scenarios</li>
        <li>Cost gap widens as organization size increases due to traditional NAC's hardware scaling requirements</li>
        <li>Even with low device counts (1,000), Portnox Cloud offers 40% TCO advantage</li>
        <li>At 5,000+ devices, Portnox Cloud delivers 60% TCO savings versus traditional NAC</li>
      </ul>
    </div>
  `;
  
  // Set the HTML
  sensitivityTab.innerHTML = html;
  
  // Set up event listeners
  const runButton = document.getElementById('run-sensitivity');
  if (runButton) {
    runButton.addEventListener('click', runSensitivityAnalysis);
  }
  
  // Initialize with default values
  runSensitivityAnalysis();
}

// Run sensitivity analysis
function runSensitivityAnalysis() {
  // Get input values
  const variableSelect = document.getElementById('sensitivity-variable');
  const minInput = document.getElementById('sensitivity-min');
  const maxInput = document.getElementById('sensitivity-max');
  
  if (!variableSelect || !minInput || !maxInput) return;
  
  const variable = variableSelect.value;
  const minValue = parseInt(minInput.value, 10);
  const maxValue = parseInt(maxInput.value, 10);
  
  // Create an array of values to analyze
  const step = Math.ceil((maxValue - minValue) / 5);
  const values = [];
  
  for (let i = minValue; i <= maxValue; i += step) {
    values.push(i);
  }
  
  // Ensure the max value is included
  if (values[values.length - 1] !== maxValue) {
    values.push(maxValue);
  }
  
  // Calculate TCO for each vendor at each value point
  const datasets = [];
  const tempSettings = JSON.parse(JSON.stringify(currentSettings));
  
  selectedVendors.forEach(vendorId => {
    const vendor = vendorData[vendorId];
    const results = [];
    
    values.forEach(value => {
      // Update the temporary settings based on the variable
      switch (variable) {
        case 'deviceCount':
          tempSettings.organization.deviceCount = value;
          break;
        case 'fteRate':
          tempSettings.organization.fteRate = value;
          break;
        case 'locations':
          tempSettings.organization.locations = value;
          break;
        case 'period':
          tempSettings.analysisSettings.period = value;
          break;
      }
      
      // Calculate TCO with modified settings
      const tempCurrentSettings = currentSettings;
      currentSettings = tempSettings;
      const tco = calculateTCO(vendorId);
      currentSettings = tempCurrentSettings;
      
      // Store the result
      results.push(tco.total);
    });
    
    // Add the dataset
    datasets.push({
      label: vendor.name,
      data: results,
      backgroundColor: 'transparent',
      borderColor: vendor.color,
      tension: 0.1
    });
  });
  
  // Render the sensitivity chart
  renderSensitivityChart(values, datasets, variable);
}

// Render sensitivity chart
function renderSensitivityChart(values, datasets, variable) {
  const ctx = document.getElementById('sensitivity-chart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (chartsReferences.sensitivityChart) {
    chartsReferences.sensitivityChart.destroy();
  }
  
  // Format x-axis label based on variable
  let xAxisLabel = 'Value';
  switch (variable) {
    case 'deviceCount':
      xAxisLabel = 'Device Count';
      break;
    case 'fteRate':
      xAxisLabel = 'FTE Cost ($)';
      break;
    case 'locations':
      xAxisLabel = 'Number of Locations';
      break;
    case 'period':
      xAxisLabel = 'Analysis Period (Years)';
      break;
  }
  
  // Create chart
  chartsReferences.sensitivityChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: values,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: xAxisLabel
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Total Cost ($)'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeSidebar();
  initializeVendorSelection();
  initializeFormValues();
  initializeTabs();
  updateView();
});
