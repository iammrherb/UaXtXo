/**
 * Portnox TCO Analyzer - Modern UI JavaScript
 * Handles UI interactions, state management, and dynamic content updates
 */

// UI State management
const UIState = {
  sidebarCollapsed: false,
  activeTab: 'executive', // Default tab
  darkMode: false,
  selectedVendors: ['portnox', 'cisco'], // Default selected vendors
  loadingState: false,
  comparisonData: null,
  
  // Method to toggle sidebar collapse state
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    document.querySelector('.sidebar').classList.toggle('collapsed', this.sidebarCollapsed);
    document.querySelector('.content-area').style.marginLeft = this.sidebarCollapsed ? 
      'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';
  },
  
  // Method to switch active tab
  setActiveTab(tabId) {
    this.activeTab = tabId;
    // Update UI
    document.querySelectorAll('.view-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabId);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `${tabId}-content`);
    });
  },
  
  // Method to toggle dark mode
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
    
    // Update icon
    const darkModeIcon = document.getElementById('dark-mode-icon');
    if (darkModeIcon) {
      darkModeIcon.classList.toggle('fa-moon', !this.darkMode);
      darkModeIcon.classList.toggle('fa-sun', this.darkMode);
    }
    
    // Re-render charts with appropriate theme
    if (this.comparisonData) {
      renderCharts(this.comparisonData);
    }
  },
  
  // Method to toggle vendor selection
  toggleVendor(vendorId) {
    const index = this.selectedVendors.indexOf(vendorId);
    
    if (index === -1) {
      // Add vendor if not already selected
      this.selectedVendors.push(vendorId);
    } else if (this.selectedVendors.length > 1) {
      // Remove vendor if already selected and there's more than one vendor selected
      this.selectedVendors.splice(index, 1);
    }
    
    // Update UI
    updateVendorSelectionUI();
  },
  
  // Method to show loading state
  showLoading() {
    this.loadingState = true;
    document.getElementById('loading-overlay').style.display = 'flex';
  },
  
  // Method to hide loading state
  hideLoading() {
    this.loadingState = false;
    document.getElementById('loading-overlay').style.display = 'none';
  }
};

// Configuration state for TCO calculation
const ConfigState = {
  industry: 'financial',
  complianceFrameworks: ['pci-dss', 'nist'],
  organizationSize: 'medium',
  deviceCount: 2500,
  locations: 5,
  analysisYears: 3,
  fteCost: 120000,
  maintenancePercentage: 18,
  implementationUrgency: 'normal',
  
  // Advanced configuration
  cloudIntegration: false,
  legacyDevices: false,
  byodSupport: true,
  trainingCost: 500,
  consultingRate: 2000,
  
  // Update configuration value
  updateConfig(key, value) {
    if (this[key] !== undefined) {
      this[key] = value;
      
      // Handle special cases
      if (key === 'industry') {
        updateIndustrySpecificUI(value);
      }
      
      // Update UI elements that depend on this value
      updateConfigDependentUI(key);
    }
  },
  
  // Get full configuration object
  getConfig() {
    return { ...this };
  }
};

// Initialize the UI
function initializeUI() {
  // Set up event listeners for sidebar toggle
  document.getElementById('sidebar-toggle').addEventListener('click', () => UIState.toggleSidebar());
  
  // Set up event listeners for tab switching
  document.querySelectorAll('.view-tab').forEach(tab => {
    tab.addEventListener('click', () => UIState.setActiveTab(tab.dataset.tab));
  });
  
  // Set up event listeners for dark mode toggle
  document.getElementById('dark-mode-toggle').addEventListener('click', () => UIState.toggleDarkMode());
  
  // Set up event listeners for vendor selection
  document.querySelectorAll('.vendor-card').forEach(card => {
    card.addEventListener('click', () => UIState.toggleVendor(card.dataset.vendor));
  });
  
  // Set up event listeners for configuration inputs
  setupConfigInputListeners();
  
  // Set up event listener for calculate button
  document.getElementById('calculate-btn').addEventListener('click', performCalculation);
  
  // Initialize vendor selection UI
  updateVendorSelectionUI();
  
  // Initialize industry-specific UI
  updateIndustrySpecificUI(ConfigState.industry);
}

// Update UI to reflect vendor selection
function updateVendorSelectionUI() {
  document.querySelectorAll('.vendor-card').forEach(card => {
    const vendorId = card.dataset.vendor;
    card.classList.toggle('selected', UIState.selectedVendors.includes(vendorId));
  });
}

// Update industry-specific UI elements
function updateIndustrySpecificUI(industry) {
  // Update compliance framework options based on industry
  const complianceOptions = document.getElementById('compliance-options');
  
  // Different industries have different relevant compliance frameworks
  const industryCompliance = {
    'financial': ['pci-dss', 'soc2', 'nist', 'gdpr', 'glba'],
    'healthcare': ['hipaa', 'nist', 'gdpr', 'hitrust'],
    'education': ['ferpa', 'gdpr', 'nist'],
    'government': ['fisma', 'nist', 'cmmc', 'fedramp'],
    'manufacturing': ['nist', 'iec62443', 'cmmc'],
    'retail': ['pci-dss', 'gdpr', 'ccpa'],
    'technology': ['soc2', 'iso27001', 'gdpr', 'ccpa', 'nist']
  };
  
  // Get compliance frameworks for selected industry
  const relevantFrameworks = industryCompliance[industry] || ['nist', 'gdpr'];
  
  // Update UI with relevant compliance frameworks
  if (complianceOptions) {
    complianceOptions.innerHTML = '';
    
    relevantFrameworks.forEach(framework => {
      const isChecked = ConfigState.complianceFrameworks.includes(framework);
      
      const checkboxItem = document.createElement('div');
      checkboxItem.className = 'form-check';
      checkboxItem.innerHTML = `
        <input type="checkbox" id="compliance-${framework}" class="form-check-input" 
          ${isChecked ? 'checked' : ''} data-framework="${framework}">
        <label for="compliance-${framework}" class="form-check-label">
          ${getComplianceDisplayName(framework)}
        </label>
      `;
      
      complianceOptions.appendChild(checkboxItem);
      
      // Add event listener
      checkboxItem.querySelector('input').addEventListener('change', (e) => {
        toggleComplianceFramework(framework, e.target.checked);
      });
    });
  }
  
  // Update industry-specific insights
  updateIndustryInsights(industry);
}

// Get display name for compliance framework
function getComplianceDisplayName(frameworkId) {
  const frameworkNames = {
    'pci-dss': 'PCI DSS',
    'soc2': 'SOC 2',
    'nist': 'NIST 800-53',
    'gdpr': 'GDPR',
    'hipaa': 'HIPAA',
    'hitrust': 'HITRUST',
    'ferpa': 'FERPA',
    'fisma': 'FISMA',
    'cmmc': 'CMMC',
    'fedramp': 'FedRAMP',
    'iec62443': 'IEC 62443',
    'iso27001': 'ISO 27001',
    'ccpa': 'CCPA',
    'glba': 'GLBA'
  };
  
  return frameworkNames[frameworkId] || frameworkId.toUpperCase();
}

// Toggle compliance framework selection
function toggleComplianceFramework(framework, isSelected) {
  if (isSelected) {
    // Add framework if not already selected
    if (!ConfigState.complianceFrameworks.includes(framework)) {
      ConfigState.complianceFrameworks.push(framework);
    }
  } else {
    // Remove framework
    const index = ConfigState.complianceFrameworks.indexOf(framework);
    if (index !== -1) {
      ConfigState.complianceFrameworks.splice(index, 1);
    }
  }
}

// Update industry-specific insights
function updateIndustryInsights(industry) {
  const insightsContainer = document.getElementById('industry-insights');
  if (!insightsContainer) return;
  
  const industryInsights = {
    'financial': [
      'Financial institutions face regulatory requirements for secure access control',
      'PCI DSS compliance is critical for protecting cardholder data',
      'Zero Trust is increasingly required by financial regulators',
      'Breach costs in financial sector average $5.72M per incident'
    ],
    'healthcare': [
      'HIPAA requirements mandate strict access controls for PHI',
      'Healthcare faces 2x more cyberattacks than other industries',
      'IoT/medical devices create complex network security challenges',
      'Average healthcare breach costs $9.23M per incident'
    ],
    'education': [
      'BYOD environments require flexible access control solutions',
      'Student data privacy regulations like FERPA demand secure access',
      'Limited IT budgets require efficient, scalable NAC solutions',
      'Diverse environments with varying security requirements'
    ],
    'government': [
      'Compliance with FISMA and FedRAMP is mandatory',
      'Implementation of Zero Trust Architecture (ZTA) is now required',
      'Secure access to sensitive information critical for national security',
      'CMMC requirements increasing for defense contractors'
    ],
    'manufacturing': [
      'OT/IT convergence requires unified security approach',
      'Legacy equipment creates unique security challenges',
      'Supply chain security regulations increasing globally',
      'IEC 62443 compliance essential for industrial systems'
    ],
    'retail': [
      'PCI DSS compliance required for all merchants processing cards',
      'Distributed locations need centralized management',
      'IoT devices (POS, inventory systems) require secure access',
      'High seasonality demands flexible scaling of access policies'
    ],
    'technology': [
      'Development environments require granular access controls',
      'Remote workforce requires secure access from anywhere',
      'Protection of intellectual property is business-critical',
      'Rapid scaling demands cloud-native security solutions'
    ]
  };
  
  // Get insights for selected industry
  const relevantInsights = industryInsights[industry] || [
    'Network protection is essential regardless of industry',
    'Zero Trust principles apply across all verticals',
    'Regulatory compliance requirements continue to increase',
    'Cloud migration requires modern security approaches'
  ];
  
  // Update UI with relevant insights
  insightsContainer.innerHTML = '';
  
  relevantInsights.forEach(insight => {
    const insightItem = document.createElement('div');
    insightItem.className = 'industry-insight';
    insightItem.innerHTML = `
      <div class="insight-content">
        <i class="fas fa-lightbulb insight-icon"></i>
        <span>${insight}</span>
      </div>
    `;
    
    insightsContainer.appendChild(insightItem);
  });
}

// Set up event listeners for all configuration inputs
function setupConfigInputListeners() {
  // Industry selection
  const industrySelect = document.getElementById('industry-select');
  if (industrySelect) {
    industrySelect.value = ConfigState.industry;
    industrySelect.addEventListener('change', (e) => {
      ConfigState.updateConfig('industry', e.target.value);
    });
  }
  
  // Organization size
  const orgSizeSelect = document.getElementById('organization-size');
  if (orgSizeSelect) {
    orgSizeSelect.value = ConfigState.organizationSize;
    orgSizeSelect.addEventListener('change', (e) => {
      ConfigState.updateConfig('organizationSize', e.target.value);
      
      // Update device count based on organization size
      const deviceCountPresets = {
        'small': 500,
        'medium': 2500,
        'large': 7500,
        'enterprise': 20000
      };
      
      // Update device count input
      const deviceCountInput = document.getElementById('device-count');
      if (deviceCountInput) {
        deviceCountInput.value = deviceCountPresets[e.target.value] || 2500;
        ConfigState.updateConfig('deviceCount', parseInt(deviceCountInput.value, 10));
      }
    });
  }
  
  // Device count
  const deviceCountInput = document.getElementById('device-count');
  if (deviceCountInput) {
    deviceCountInput.value = ConfigState.deviceCount;
    deviceCountInput.addEventListener('change', (e) => {
      ConfigState.updateConfig('deviceCount', parseInt(e.target.value, 10));
    });
  }
  
  // Number of locations
  const locationsInput = document.getElementById('locations');
  if (locationsInput) {
    locationsInput.value = ConfigState.locations;
    locationsInput.addEventListener('change', (e) => {
      ConfigState.updateConfig('locations', parseInt(e.target.value, 10));
    });
  }
  
  // Years to project
  const yearsSelect = document.getElementById('years-to-project');
  if (yearsSelect) {
    yearsSelect.value = ConfigState.analysisYears;
    yearsSelect.addEventListener('change', (e) => {
      ConfigState.updateConfig('analysisYears', parseInt(e.target.value, 10));
    });
  }
  
  // FTE cost
  const fteCostInput = document.getElementById('fte-cost');
  if (fteCostInput) {
    fteCostInput.value = ConfigState.fteCost;
    fteCostInput.addEventListener('change', (e) => {
      ConfigState.updateConfig('fteCost', parseInt(e.target.value, 10));
    });
  }
  
  // Feature checkboxes
  const cloudIntegrationCheckbox = document.getElementById('cloud-integration');
  if (cloudIntegrationCheckbox) {
    cloudIntegrationCheckbox.checked = ConfigState.cloudIntegration;
    cloudIntegrationCheckbox.addEventListener('change', (e) => {
      ConfigState.updateConfig('cloudIntegration', e.target.checked);
    });
  }
  
  const legacyDevicesCheckbox = document.getElementById('legacy-devices');
  if (legacyDevicesCheckbox) {
    legacyDevicesCheckbox.checked = ConfigState.legacyDevices;
    legacyDevicesCheckbox.addEventListener('change', (e) => {
      ConfigState.updateConfig('legacyDevices', e.target.checked);
    });
  }
  
  const byodCheckbox = document.getElementById('byod-support');
  if (byodCheckbox) {
    byodCheckbox.checked = ConfigState.byodSupport;
    byodCheckbox.addEventListener('change', (e) => {
      ConfigState.updateConfig('byodSupport', e.target.checked);
    });
  }
}

// Update UI elements that depend on configuration changes
function updateConfigDependentUI(changedKey) {
  // Handle specific UI updates based on configuration changes
  // This will be called whenever a configuration value changes
  
  // For example, when device count changes, update cost estimates
  if (['deviceCount', 'analysisYears', 'fteCost'].includes(changedKey)) {
    updateCostEstimates();
  }
}

// Update cost estimates based on current configuration
function updateCostEstimates() {
  // This would update any preliminary cost estimates shown in the UI
  // before the full calculation is performed
  
  // For demonstration, update the estimated TCO range
  const estimatedTcoElement = document.getElementById('estimated-tco-range');
  if (estimatedTcoElement) {
    const deviceCount = ConfigState.deviceCount;
    const years = ConfigState.analysisYears;
    
    // Simple calculation for estimated TCO range
    const lowEndPortnox = deviceCount * 3 * 12 * years; // $3 per device per month
    const highEndPortnox = deviceCount * 5 * 12 * years; // $5 per device per month
    
    const lowEndOnPrem = deviceCount * 10 * years; // $10 per device per year
                        + (ConfigState.fteCost * 0.5 * years); // 0.5 FTE
    
    const highEndOnPrem = deviceCount * 15 * years // $15 per device per year
                        + (ConfigState.fteCost * 1 * years); // 1 FTE
    
    estimatedTcoElement.textContent = `$${formatNumber(lowEndPortnox)} - $${formatNumber(highEndPortnox)} (vs. $${formatNumber(lowEndOnPrem)} - $${formatNumber(highEndOnPrem)} for on-premises)`;
  }
}

// Perform TCO calculation
function performCalculation() {
  // Show loading state
  UIState.showLoading();
  
  // In a real application, this would make an API call or perform complex calculations
  // For demonstration, we'll simulate a delay and then display mock results
  setTimeout(() => {
    // Generate comparison data
    const comparisonData = generateComparisonData();
    
    // Save to state
    UIState.comparisonData = comparisonData;
    
    // Render charts and tables
    renderCharts(comparisonData);
    renderTables(comparisonData);
    
    // Show main content area
    document.querySelector('.content-area').classList.remove('hidden');
    
    // Hide loading state
    UIState.hideLoading();
    
    // Optionally collapse sidebar on mobile
    if (window.innerWidth < 768) {
      UIState.toggleSidebar();
    }
  }, 1500);
}

// Generate comparison data based on configuration
function generateComparisonData() {
  // This would be a complex calculation in a real application
  // For demonstration, we'll return mock data
  
  const selectedVendors = UIState.selectedVendors;
  const deviceCount = ConfigState.deviceCount;
  const years = ConfigState.analysisYears;
  const fteCost = ConfigState.fteCost;
  
  // Base costs per vendor per device
  const vendorBaseCosts = {
    'portnox': 4, // $4 per device per month (cloud subscription)
    'cisco': 12, // $12 per device per year (plus hardware, implementation, etc.)
    'aruba': 10, // $10 per device per year
    'forescout': 11, // $11 per device per year
    'fortinac': 9, // $9 per device per year
    'noNac': 0 // No direct licensing cost
  };
  
  // FTE requirements per vendor
  const vendorFteRequirements = {
    'portnox': 0.15, // 15% of one FTE
    'cisco': 0.5, // 50% of one FTE
    'aruba': 0.45, // 45% of one FTE
    'forescout': 0.4, // 40% of one FTE
    'fortinac': 0.4, // 40% of one FTE
    'noNac': 0 // No direct FTE for NAC, but security risks
  };
  
  // Hardware costs (one-time)
  const vendorHardwareCosts = {
    'portnox': 0, // Cloud-based, no hardware
    'cisco': deviceCount * 3, // $3 per device
    'aruba': deviceCount * 2.5, // $2.50 per device
    'forescout': deviceCount * 2.75, // $2.75 per device
    'fortinac': deviceCount * 2, // $2 per device
    'noNac': 0 // No hardware
  };
  
  // Implementation costs (one-time)
  const vendorImplementationCosts = {
    'portnox': 10000 + (deviceCount * 0.5), // Base fee + $0.50 per device
    'cisco': 30000 + (deviceCount * 2), // Base fee + $2 per device
    'aruba': 25000 + (deviceCount * 1.8), // Base fee + $1.80 per device
    'forescout': 25000 + (deviceCount * 1.7), // Base fee + $1.70 per device
    'fortinac': 20000 + (deviceCount * 1.6), // Base fee + $1.60 per device
    'noNac': 0 // No implementation
  };
  
  // Implementation time (days)
  const vendorImplementationTime = {
    'portnox': 45,
    'cisco': 180,
    'aruba': 160,
    'forescout': 150,
    'fortinac': 140,
    'noNac': 0
  };
  
  // Annual maintenance percentage of initial costs
  const vendorMaintenancePercentage = {
    'portnox': 0, // Included in subscription
    'cisco': 0.18, // 18% annual maintenance
    'aruba': 0.18, // 18% annual maintenance
    'forescout': 0.18, // 18% annual maintenance
    'fortinac': 0.18, // 18% annual maintenance
    'noNac': 0 // No maintenance
  };
  
  // Risk scores (lower is better)
  const vendorRiskScores = {
    'portnox': {
      'breachRisk': 30,
      'compliance': 20,
      'visibility': 15,
      'management': 25,
      'uptime': 10
    },
    'cisco': {
      'breachRisk': 70,
      'compliance': 60,
      'visibility': 55,
      'management': 65,
      'uptime': 40
    },
    'aruba': {
      'breachRisk': 65,
      'compliance': 55,
      'visibility': 50,
      'management': 60,
      'uptime': 35
    },
    'forescout': {
      'breachRisk': 60,
      'compliance': 50,
      'visibility': 40,
      'management': 55,
      'uptime': 30
    },
    'fortinac': {
      'breachRisk': 60,
      'compliance': 55,
      'visibility': 45,
      'management': 60,
      'uptime': 35
    },
    'noNac': {
      'breachRisk': 95,
      'compliance': 90,
      'visibility': 85,
      'management': 90,
      'uptime': 75
    }
  };
  
  // Feature scores (0-100)
  const vendorFeatureScores = {
    'portnox': {
      'cloudSupport': 100,
      'apiIntegration': 90,
      'scalability': 95,
      'security': 95,
      'userExperience': 90,
      'zeroTrust': 100,
      'mobileSupport': 90
    },
    'cisco': {
      'cloudSupport': 50,
      'apiIntegration': 60,
      'scalability': 70,
      'security': 80,
      'userExperience': 60,
      'zeroTrust': 40,
      'mobileSupport': 50
    },
    'aruba': {
      'cloudSupport': 60,
      'apiIntegration': 70,
      'scalability': 75,
      'security': 85,
      'userExperience': 65,
      'zeroTrust': 45,
      'mobileSupport': 65
    },
    'forescout': {
      'cloudSupport': 40,
      'apiIntegration': 65,
      'scalability': 60,
      'security': 80,
      'userExperience': 50,
      'zeroTrust': 40,
      'mobileSupport': 50
    },
    'fortinac': {
      'cloudSupport': 45,
      'apiIntegration': 60,
      'scalability': 65,
      'security': 75,
      'userExperience': 55,
      'zeroTrust': 45,
      'mobileSupport': 55
    },
    'noNac': {
      'cloudSupport': 0,
      'apiIntegration': 0,
      'scalability': 0,
      'security': 0,
      'userExperience': 0,
      'zeroTrust': 0,
      'mobileSupport': 0
    }
  };
  
  // Compliance coverage percentage
  const vendorCompliance = {
    'portnox': {
      'nist': 95,
      'iso27001': 90,
      'hipaa': 100,
      'pciDss': 95,
      'gdpr': 85
    },
    'cisco': {
      'nist': 70,
      'iso27001': 65,
      'hipaa': 60,
      'pciDss': 75,
      'gdpr': 50
    },
    'aruba': {
      'nist': 75,
      'iso27001': 70,
      'hipaa': 65,
      'pciDss': 80,
      'gdpr': 60
    },
    'forescout': {
      'nist': 65,
      'iso27001': 60,
      'hipaa': 70,
      'pciDss': 75,
      'gdpr': 55
    },
    'fortinac': {
      'nist': 65,
      'iso27001': 60,
      'hipaa': 65,
      'pciDss': 70,
      'gdpr': 50
    },
    'noNac': {
      'nist': 10,
      'iso27001': 5,
      'hipaa': 5,
      'pciDss': 5,
      'gdpr': 5
    }
  };
  
  // Generate yearly cost data
  const yearlyData = {};
  const cumulativeData = {};
  
  selectedVendors.forEach(vendor => {
    // Calculate yearly costs
    const yearData = [];
    let runningTotal = 0;
    const cumulativePoints = ['Initial'];
    
    // Initial costs (hardware + implementation)
    const initialCost = vendorHardwareCosts[vendor] + vendorImplementationCosts[vendor];
    runningTotal += initialCost;
    cumulativePoints.push(formatNumber(runningTotal));
    
    for (let year = 1; year <= years; year++) {
      // License costs
      let yearCost = 0;
      
      if (vendor === 'portnox') {
        // Monthly subscription
        yearCost += deviceCount * vendorBaseCosts[vendor] * 12;
      } else if (vendor !== 'noNac') {
        // Annual license
        yearCost += deviceCount * vendorBaseCosts[vendor];
        
        // Maintenance costs (not applicable to first year for on-prem)
        if (year > 1) {
          yearCost += vendorHardwareCosts[vendor] * vendorMaintenancePercentage[vendor];
        }
      }
      
      // Personnel costs
      yearCost += fteCost * vendorFteRequirements[vendor];
      
      // Add to yearly data
      yearData.push(yearCost);
      
      // Add to running total for cumulative chart
      runningTotal += yearCost;
      
      // Add quarterly points for first year, then yearly
      if (year === 1) {
        // Q1, Q2, Q3
        for (let q = 1; q <= 3; q++) {
          cumulativePoints.push(formatNumber(initialCost + (yearCost * q / 4)));
        }
        // End of year 1
        cumulativePoints.push(formatNumber(initialCost + yearCost));
      } else {
        // End of year 2, 3, etc.
        cumulativePoints.push(formatNumber(runningTotal));
      }
    }
    
    yearlyData[vendor] = yearData;
    cumulativeData[vendor] = cumulativePoints;
  });
  
  // Calculate breakdown percentages
  const breakdownData = {};
  
  selectedVendors.forEach(vendor => {
    let total = vendorHardwareCosts[vendor] + vendorImplementationCosts[vendor];
    
    // Add yearly costs
    for (let i = 0; i < yearlyData[vendor].length; i++) {
      total += yearlyData[vendor][i];
    }
    
    // Handle special case for Portnox (cloud subscription model)
    if (vendor === 'portnox') {
      breakdownData[vendor] = [
        { name: 'Subscription', value: (deviceCount * vendorBaseCosts[vendor] * 12 * years / total) * 100 },
        { name: 'Implementation', value: (vendorImplementationCosts[vendor] / total) * 100 },
        { name: 'Personnel', value: (fteCost * vendorFteRequirements[vendor] * years / total) * 100 }
      ];
    } else if (vendor === 'noNac') {
      breakdownData[vendor] = [
        { name: 'Security Incidents', value: 65 },
        { name: 'Manual Management', value: 35 }
      ];
    } else {
      // On-premises model
      breakdownData[vendor] = [
        { name: 'Hardware', value: (vendorHardwareCosts[vendor] / total) * 100 },
        { name: 'Software', value: (deviceCount * vendorBaseCosts[vendor] * years / total) * 100 },
        { name: 'Implementation', value: (vendorImplementationCosts[vendor] / total) * 100 },
        { name: 'Maintenance', value: (vendorHardwareCosts[vendor] * vendorMaintenancePercentage[vendor] * (years - 1) / total) * 100 },
        { name: 'Personnel', value: (fteCost * vendorFteRequirements[vendor] * years / total) * 100 }
      ];
    }
  });
  
  // Implementation timeline comparison
  const implementationData = {};
  const implementationLabels = ['Planning', 'Installation', 'Configuration', 'Testing', 'Training', 'Deployment'];
  
  selectedVendors.forEach(vendor => {
    if (vendor === 'portnox') {
      implementationData[vendor] = [10, 0, 15, 10, 5, 5]; // Cloud model
    } else if (vendor === 'cisco') {
      implementationData[vendor] = [30, 45, 40, 30, 20, 15];
    } else if (vendor === 'aruba') {
      implementationData[vendor] = [25, 40, 35, 25, 15, 20];
    } else if (vendor === 'forescout') {
      implementationData[vendor] = [25, 35, 35, 25, 15, 15];
    } else if (vendor === 'fortinac') {
      implementationData[vendor] = [20, 35, 30, 25, 15, 15];
    } else if (vendor === 'noNac') {
      implementationData[vendor] = [0, 0, 0, 0, 0, 0];
    }
  });
  
  // ROI calculation
  const roiData = {};
  
  // 20% chance of breach without NAC yearly, 5% with NAC
  // Average breach cost $4.24M
  const breachCost = 4240000;
  const noNacBreachRisk = 0.2;
  const nacBreachRisk = 0.05;
  
  // Productivity gains from automation (hours saved per device per year)
  const productivityHoursPerDevice = {
    'portnox': 2.5,
    'cisco': 1.2,
    'aruba': 1.3,
    'forescout': 1.2,
    'fortinac': 1.1,
    'noNac': 0
  };
  
  // Average value of 1 IT hour
  const itHourValue = 75;
  
  selectedVendors.forEach(vendor => {
    const yearlyRoi = [];
    let cumulativeCost = vendorHardwareCosts[vendor] + vendorImplementationCosts[vendor];
    let baselineCost = 0; // No NAC cost
    let baselineRisk = noNacBreachRisk * breachCost; // Risk cost without NAC
    
    for (let year = 1; year <= years; year++) {
      // Add yearly costs
      cumulativeCost += yearlyData[vendor][year - 1];
      
      // Add baseline cost (risk of no NAC)
      baselineCost += (fteCost * 0.1 * year); // Increasing manual management cost
      baselineRisk += noNacBreachRisk * breachCost; // Cumulative breach risk
      
      // Calculate benefits
      let benefits = 0;
      
      if (vendor !== 'noNac') {
        // Reduced breach risk
        benefits += (noNacBreachRisk - nacBreachRisk) * breachCost;
        
        // Productivity gains
        benefits += productivityHoursPerDevice[vendor] * deviceCount * itHourValue;
        
        // Reduced manual management
        benefits += fteCost * 0.1; // Compared to manual management
      }
      
      // Yearly ROI = Cumulative benefits - Cumulative costs
      const yearRoi = (benefits * year) - cumulativeCost;
      yearlyRoi.push(yearRoi);
    }
    
    roiData[vendor] = yearlyRoi;
  });
  
  return {
    yearlyData,
    cumulativeData,
    breakdownData,
    implementationData,
    implementationLabels,
    vendorRiskScores,
    vendorFeatureScores,
    vendorCompliance,
    roiData,
    vendorImplementationTime,
    vendorFteRequirements
  };
}

// Render charts with comparison data
function renderCharts(data) {
  // This would use Chart.js or another charting library
  // For demonstration, we'll just update the UI with placeholders
  
  // Example chart updates
  const chartElements = document.querySelectorAll('.chart-container');
  chartElements.forEach(container => {
    container.innerHTML = `<div class="chart-placeholder">
      <div class="chart-title">${container.dataset.title || 'Chart'}</div>
      <div class="chart-mock" style="height: 280px; background-color: #f3f4f6;"></div>
      <div class="chart-legend">
        ${UIState.selectedVendors.map(vendor => 
          `<div class="vendor-indicator">
            <div class="color-dot" style="background-color: ${getVendorColor(vendor)};"></div>
            <div class="vendor-name">${getVendorDisplayName(vendor)}</div>
          </div>`
        ).join('')}
      </div>
    </div>`;
  });
  
  // In a real implementation, this would create actual charts using Chart.js or similar
}

// Render comparison tables
function renderTables(data) {
  // This would build detailed comparison tables
  // For demonstration, we'll update placeholder tables
  
  // TCO Comparison Table
  const tcoTableBody = document.querySelector('#tco-comparison-table tbody');
  if (tcoTableBody) {
    tcoTableBody.innerHTML = '';
    
    // Add rows for each cost component
    const costComponents = [
      { name: 'Hardware Costs', key: 'hardware' },
      { name: 'Software/Subscription', key: 'software' },
      { name: 'Implementation', key: 'implementation' },
      { name: 'Maintenance & Support', key: 'maintenance' },
      { name: 'Personnel (FTE)', key: 'personnel' },
      { name: 'Total 3-Year TCO', key: 'total', isTotal: true }
    ];
    
    costComponents.forEach(component => {
      const row = document.createElement('tr');
      if (component.isTotal) {
        row.className = 'total-row';
      }
      
      const nameCell = document.createElement('td');
      nameCell.textContent = component.name;
      row.appendChild(nameCell);
      
      // Add cells for each vendor
      UIState.selectedVendors.forEach(vendor => {
        const cell = document.createElement('td');
        
        // In a real implementation, this would use actual data
        if (component.key === 'hardware') {
          cell.textContent = vendor === 'portnox' ? '$0' : 
                             vendor === 'cisco' ? '$175,000' : 
                             vendor === 'aruba' ? '$160,000' : 
                             vendor === 'forescout' ? '$150,000' : 
                             vendor === 'fortinac' ? '$130,000' : 
                             vendor === 'noNac' ? '$0' : 'N/A';
        } else if (component.key === 'software') {
          cell.textContent = vendor === 'portnox' ? '$300,000' : 
                             vendor === 'cisco' ? '$250,000' : 
                             vendor === 'aruba' ? '$240,000' : 
                             vendor === 'forescout' ? '$235,000' : 
                             vendor === 'fortinac' ? '$200,000' : 
                             vendor === 'noNac' ? '$0' : 'N/A';
        } else if (component.key === 'implementation') {
          cell.textContent = vendor === 'portnox' ? '$30,000' : 
                             vendor === 'cisco' ? '$120,000' : 
                             vendor === 'aruba' ? '$110,000' : 
                             vendor === 'forescout' ? '$105,000' : 
                             vendor === 'fortinac' ? '$100,000' : 
                             vendor === 'noNac' ? '$0' : 'N/A';
        } else if (component.key === 'maintenance') {
          cell.textContent = vendor === 'portnox' ? '$45,000' : 
                             vendor === 'cisco' ? '$180,000' : 
                             vendor === 'aruba' ? '$170,000' : 
                             vendor === 'forescout' ? '$160,000' : 
                             vendor === 'fortinac' ? '$150,000' : 
                             vendor === 'noNac' ? '$0' : 'N/A';
        } else if (component.key === 'personnel') {
          cell.textContent = vendor === 'portnox' ? '$54,000' : 
                             vendor === 'cisco' ? '$180,000' : 
                             vendor === 'aruba' ? '$162,000' : 
                             vendor === 'forescout' ? '$144,000' : 
                             vendor === 'fortinac' ? '$144,000' : 
                             vendor === 'noNac' ? '$180,000' : 'N/A';
        } else if (component.key === 'total') {
          cell.textContent = vendor === 'portnox' ? '$429,000' : 
                             vendor === 'cisco' ? '$905,000' : 
                             vendor === 'aruba' ? '$842,000' : 
                             vendor === 'forescout' ? '$794,000' : 
                             vendor === 'fortinac' ? '$724,000' : 
                             vendor === 'noNac' ? '$180,000' : 'N/A';
          cell.className = 'total-cell';
        }
        
        row.appendChild(cell);
      });
      
      tcoTableBody.appendChild(row);
    });
  }
  
  // Feature Comparison Table
  const featureTableBody = document.querySelector('#feature-comparison-table tbody');
  if (featureTableBody) {
    featureTableBody.innerHTML = '';
    
    // Add rows for each feature
    const features = [
      { name: 'Cloud-Based Architecture', key: 'cloud' },
      { name: 'Zero Trust Security', key: 'zeroTrust' },
      { name: 'Multi-Factor Authentication', key: 'mfa' },
      { name: 'Scalability', key: 'scalability' },
      { name: 'BYOD Support', key: 'byod' },
      { name: 'Guest Management', key: 'guest' },
      { name: 'Remote Access', key: 'remote' }
    ];
    
    features.forEach(feature => {
      const row = document.createElement('tr');
      
      const nameCell = document.createElement('td');
      nameCell.textContent = feature.name;
      nameCell.className = 'feature-name';
      row.appendChild(nameCell);
      
      // Add cells for each vendor
      UIState.selectedVendors.forEach(vendor => {
        const cell = document.createElement('td');
        cell.className = 'feature-status-cell';
        
        // In a real implementation, this would use actual data
        if (feature.key === 'cloud') {
          cell.innerHTML = vendor === 'portnox' ? '<span class="feature-status feature-full">✓</span> Full' : 
                           vendor === 'cisco' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'aruba' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'forescout' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'fortinac' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'noNac' ? '<span class="feature-status feature-none">✗</span> None' : 'N/A';
        } else if (feature.key === 'zeroTrust') {
          cell.innerHTML = vendor === 'portnox' ? '<span class="feature-status feature-full">✓</span> Full' : 
                           vendor === 'cisco' ? '<span class="feature-status feature-partial">⚠</span> Partial' : 
                           vendor === 'aruba' ? '<span class="feature-status feature-partial">⚠</span> Partial' : 
                           vendor === 'forescout' ? '<span class="feature-status feature-partial">⚠</span> Partial' : 
                           vendor === 'fortinac' ? '<span class="feature-status feature-partial">⚠</span> Partial' : 
                           vendor === 'noNac' ? '<span class="feature-status feature-none">✗</span> None' : 'N/A';
        } else if (feature.key === 'mfa') {
          cell.innerHTML = vendor === 'portnox' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'cisco' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'aruba' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'forescout' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'fortinac' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'noNac' ? '<span class="feature-status feature-none">✗</span> No' : 'N/A';
        } else if (feature.key === 'scalability') {
          cell.innerHTML = vendor === 'portnox' ? '<span class="feature-status feature-full">✓</span> Simple' : 
                           vendor === 'cisco' ? '<span class="feature-status feature-partial">⚠</span> Complex' : 
                           vendor === 'aruba' ? '<span class="feature-status feature-partial">⚠</span> Complex' : 
                           vendor === 'forescout' ? '<span class="feature-status feature-partial">⚠</span> Complex' : 
                           vendor === 'fortinac' ? '<span class="feature-status feature-partial">⚠</span> Moderate' : 
                           vendor === 'noNac' ? '<span class="feature-status feature-none">✗</span> None' : 'N/A';
        } else if (feature.key === 'byod') {
          cell.innerHTML = vendor === 'portnox' ? '<span class="feature-status feature-full">✓</span> Advanced' : 
                           vendor === 'cisco' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'aruba' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'forescout' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'fortinac' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'noNac' ? '<span class="feature-status feature-none">✗</span> No' : 'N/A';
        } else if (feature.key === 'guest') {
          cell.innerHTML = vendor === 'portnox' ? '<span class="feature-status feature-full">✓</span> Advanced' : 
                           vendor === 'cisco' ? '<span class="feature-status feature-full">✓</span> Advanced' : 
                           vendor === 'aruba' ? '<span class="feature-status feature-full">✓</span> Advanced' : 
                           vendor === 'forescout' ? '<span class="feature-status feature-partial">⚠</span> Basic' : 
                           vendor === 'fortinac' ? '<span class="feature-status feature-partial">⚠</span> Basic' : 
                           vendor === 'noNac' ? '<span class="feature-status feature-none">✗</span> No' : 'N/A';
        } else if (feature.key === 'remote') {
          cell.innerHTML = vendor === 'portnox' ? '<span class="feature-status feature-full">✓</span> Full' : 
                           vendor === 'cisco' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'aruba' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'forescout' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'fortinac' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'noNac' ? '<span class="feature-status feature-none">✗</span> None' : 'N/A';
        }
        
        row.appendChild(cell);
      });
      
      featureTableBody.appendChild(row);
    });
  }
  
  // Update summary metrics
  updateSummaryMetrics(data);
}

// Update summary metrics
function updateSummaryMetrics(data) {
  // Get total costs for each vendor
  const totalCosts = {};
  
  UIState.selectedVendors.forEach(vendor => {
    let total = 0;
    
    // Yearly costs
    if (data.yearlyData[vendor]) {
      data.yearlyData[vendor].forEach(cost => {
        total += cost;
      });
    }
    
    totalCosts[vendor] = total;
  });
  
  // Find baseline (usually Cisco)
  let baseline = 'cisco';
  if (!UIState.selectedVendors.includes('cisco')) {
    // Find most expensive alternative
    let maxCost = 0;
    UIState.selectedVendors.forEach(vendor => {
      if (totalCosts[vendor] > maxCost) {
        maxCost = totalCosts[vendor];
        baseline = vendor;
      }
    });
  }
  
  // Get Portnox savings if selected
  if (UIState.selectedVendors.includes('portnox') && UIState.selectedVendors.includes(baseline)) {
    const savings = totalCosts[baseline] - totalCosts['portnox'];
    const savingsPercentage = (savings / totalCosts[baseline]) * 100;
    
    const savingsValue = document.getElementById('total-savings');
    if (savingsValue) {
      savingsValue.textContent = `${formatNumber(savings)}`;
    }
    
    const savingsPercent = document.getElementById('savings-percentage');
    if (savingsPercent) {
      savingsPercent.textContent = `${Math.round(savingsPercentage)}% lower TCO vs. ${getVendorDisplayName(baseline)}`;
    }
  }
  
  // Set implementation time
  const implTime = document.getElementById('implementation-time');
  if (implTime && data.vendorImplementationTime) {
    const portnoxTime = data.vendorImplementationTime['portnox'] || 45;
    const baselineTime = data.vendorImplementationTime[baseline] || 180;
    const timeSavings = baselineTime - portnoxTime;
    
    implTime.textContent = `${portnoxTime} days`;
    
    const implDetail = implTime.nextElementSibling;
    if (implDetail) {
      implDetail.textContent = `${timeSavings} days faster than ${getVendorDisplayName(baseline)}`;
    }
  }
  
  // Set risk reduction
  const riskReduction = document.getElementById('risk-reduction');
  if (riskReduction && data.vendorRiskScores) {
    const portnoxRisk = data.vendorRiskScores['portnox'] ? 
      Object.values(data.vendorRiskScores['portnox']).reduce((a, b) => a + b, 0) / 5 : 20;
    
    const baselineRisk = data.vendorRiskScores[baseline] ?
      Object.values(data.vendorRiskScores[baseline]).reduce((a, b) => a + b, 0) / 5 : 60;
    
    const reduction = Math.round(((baselineRisk - portnoxRisk) / baselineRisk) * 100);
    
    riskReduction.textContent = `${reduction}%`;
  }
  
  // Set breakeven point
  const breakeven = document.getElementById('breakeven-point');
  if (breakeven && UIState.selectedVendors.includes('portnox')) {
    breakeven.textContent = '10 months';
  }
  
  // Update key insights
  updateKeyInsights(data);
}

// Update key insights
function updateKeyInsights(data) {
  const insightsList = document.getElementById('key-insights-list');
  if (!insightsList) return;
  
  insightsList.innerHTML = '';
  
  // Generate insights based on data
  const insights = [];
  
  // TCO Insight
  if (UIState.selectedVendors.includes('portnox') && UIState.selectedVendors.includes('cisco')) {
    insights.push({
      icon: 'piggy-bank',
      title: 'Total Cost of Ownership',
      content: `Portnox Cloud offers up to 53% lower TCO than Cisco ISE over 3 years, driven primarily by reduced hardware costs and lower FTE requirements.`
    });
  }
  
  // Implementation Insight
  if (UIState.selectedVendors.includes('portnox')) {
    insights.push({
      icon: 'clock',
      title: 'Rapid Implementation',
      content: `Portnox Cloud can be implemented in 45 days or less, compared to 180+ days for on-premises solutions, accelerating time-to-value by up to 75%.`
    });
  }
  
  // Cloud Architecture Insight
  if (UIState.selectedVendors.includes('portnox')) {
    insights.push({
      icon: 'cloud',
      title: 'Cloud-Native Advantage',
      content: `Portnox's cloud-native architecture eliminates hardware costs and ongoing maintenance expenses while providing automatic updates and elastic scalability.`
    });
  }
  
  // Personnel Insight
  if (UIState.selectedVendors.includes('portnox') && UIState.selectedVendors.some(v => v !== 'portnox' && v !== 'noNac')) {
    insights.push({
      icon: 'users',
      title: 'Reduced FTE Requirements',
      content: `Portnox requires only 0.15 FTE for ongoing management, compared to 0.4-0.5 FTE for on-premises NAC solutions, freeing up IT resources for strategic initiatives.`
    });
  }
  
  // Compliance Insight
  if (UIState.selectedVendors.includes('portnox')) {
    insights.push({
      icon: 'shield-alt',
      title: 'Comprehensive Compliance',
      content: `Portnox provides up to 95% coverage of major compliance frameworks including PCI DSS, NIST, HIPAA, and ISO 27001, reducing audit complexity and risk.`
    });
  }
  
  // Scalability Insight
  if (UIState.selectedVendors.includes('portnox')) {
    insights.push({
      icon: 'expand-arrows-alt',
      title: 'Elastic Scalability',
      content: `Portnox Cloud scales elastically without additional hardware or complex capacity planning, supporting growth from hundreds to millions of devices.`
    });
  }
  
  // Zero Trust Insight
  if (UIState.selectedVendors.includes('portnox')) {
    insights.push({
      icon: 'lock',
      title: 'Zero Trust Leadership',
      content: `Portnox provides comprehensive Zero Trust NAC with continuous device authentication and authorization, compared to partial or limited support from legacy vendors.`
    });
  }
  
  // Risk Reduction Insight
  if (UIState.selectedVendors.includes('portnox') && UIState.selectedVendors.includes('noNac')) {
    insights.push({
      icon: 'chart-line',
      title: 'Risk Reduction',
      content: `Implementing Portnox Cloud reduces the risk of a data breach by up to 75% compared to having no NAC solution, potentially avoiding millions in breach costs.`
    });
  }
  
  // Add insights to the list
  insights.slice(0, 5).forEach(insight => {
    const insightItem = document.createElement('div');
    insightItem.className = 'insight-item';
    insightItem.innerHTML = `
      <div class="insight-icon">
        <i class="fas fa-${insight.icon}"></i>
      </div>
      <div class="insight-content">
        <h4 class="insight-title">${insight.title}</h4>
        <p class="insight-text">${insight.content}</p>
      </div>
    `;
    
    insightsList.appendChild(insightItem);
  });
}

// Utility functions
function formatNumber(num) {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getVendorColor(vendorId) {
  const vendorColors = {
    'portnox': '#10b981',
    'cisco': '#3b82f6',
    'aruba': '#f59e0b',
    'forescout': '#f97316',
    'fortinac': '#8b5cf6',
    'noNac': '#ef4444'
  };
  
  return vendorColors[vendorId] || '#9ca3af';
}

function getVendorDisplayName(vendorId) {
  const vendorNames = {
    'portnox': 'Portnox Cloud',
    'cisco': 'Cisco ISE',
    'aruba': 'Aruba ClearPass',
    'forescout': 'Forescout',
    'fortinac': 'FortiNAC',
    'noNac': 'No NAC Solution'
  };
  
  return vendorNames[vendorId] || vendorId;
}

// Initialize the UI when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeUI();
});
