/**
 * Portnox Total Cost Analyzer - Main Application
 * 
 * This is the main application logic for the Portnox Total Cost Analyzer
 * which calculates and displays TCO and ROI for different NAC vendors.
 */

// Global app state
const App = {
  state: {
    selectedVendors: ['portnox'],  // Default selection
    activeView: 'executive',        // executive, financial, security, technical
    activePanel: 'executive-summary', // Current active panel
    results: null,                  // Calculation results
    config: {
      deviceCount: 500,
      locationCount: 2,
      years: 3,
      organizationSize: 'small', // very-small, small, medium, large, enterprise
      industry: '',
      complianceRequirements: [],
      riskProfile: 'standard', // standard, elevated, high, regulated
      cybersecurityInsurance: 'standard', // none, basic, standard, comprehensive
      networkRequirements: {
        cloudIntegration: false,
        legacyDevices: false,
        byodSupport: true,
        iotSupport: false,
        wirelessSupport: true,
        remoteWork: true
      },
      costParameters: {
        portnoxBasePrice: 3.0, // $ per device per month
        portnoxDiscount: 15,   // % volume discount
        fteCost: 100000,       // $ per year for full-time employee
        fteAllocation: 25,     // % of FTE dedicated to NAC
        maintenancePercentage: 18, // % of license cost for maintenance
        downtimeCost: 5000,    // $ per hour
        riskReduction: 35,     // % reduction in breach risks
        insuranceReduction: 10 // % reduction in insurance premiums
      }
    },
    calculator: null,
    chartManager: null,
    isDarkMode: false,
  },
  
  /**
   * Initialize the application
   */
  init: function() {
    console.log('Initializing Portnox TCO Analyzer...');
    
    // Initialize Calculator
    this.state.calculator = new TcoCalculator(this.state.config);
    
    // Initialize Chart Manager (using ApexCharts)
    this.state.chartManager = new ApexChartManager();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Initialize UI state
    this.initUIState();
    
    console.log('Portnox TCO Analyzer initialized successfully.');
  },
  
  /**
   * Set up all event listeners
   */
  setupEventListeners: function() {
    console.log('Setting up event listeners...');
    
    // Vendor selection
    const vendorCards = document.querySelectorAll('.vendor-card');
    vendorCards.forEach(card => {
      card.addEventListener('click', () => {
        const vendorId = card.dataset.vendor;
        this.toggleVendorSelection(vendorId, card);
      });
    });
    
    // Calculate buttons
    document.getElementById('calculate-btn').addEventListener('click', () => this.calculate());
    document.getElementById('calculate-btn-header').addEventListener('click', () => this.calculate());
    
    // Export button
    document.getElementById('export-pdf').addEventListener('click', () => this.exportReport());
    
    // Help button
    document.getElementById('help-btn').addEventListener('click', () => this.toggleHelpModal());
    
    // Dark mode toggle
    document.getElementById('dark-mode-toggle').addEventListener('click', () => this.toggleDarkMode());
    
    // View tabs (executive, financial, security, technical)
    const viewTabs = document.querySelectorAll('.stakeholder-tab');
    viewTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.dataset.view;
        this.changeView(view);
      });
    });
    
    // Results tabs within views
    const resultsTabs = document.querySelectorAll('.results-tab');
    resultsTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const panel = tab.dataset.panel;
        this.changePanel(panel);
      });
    });
    
    // Sidebar toggle
    document.getElementById('sidebar-toggle').addEventListener('click', () => this.toggleSidebar());
    
    // Config card toggles
    const configHeaders = document.querySelectorAll('.config-card-header');
    configHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const card = header.parentElement;
        this.toggleConfigCard(card);
      });
    });
    
    // Input change events for configuration
    this.setupConfigInputListeners();
    
    // Modal close buttons
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    modalCloseButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        this.closeModal(modal);
      });
    });
    
    // Window click to close modals
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.closeModal(e.target);
      }
    });
    
    console.log('Event listeners set up successfully.');
  },
  
  /**
   * Set up configuration input listeners to update config state
   */
  setupConfigInputListeners: function() {
    // Industry select
    document.getElementById('industry-select').addEventListener('change', (e) => {
      this.state.config.industry = e.target.value;
    });
    
    // Compliance checkboxes
    const complianceCheckboxes = document.querySelectorAll('.compliance-item input');
    complianceCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateComplianceRequirements();
      });
    });
    
    // Risk profile
    document.getElementById('risk-profile').addEventListener('change', (e) => {
      this.state.config.riskProfile = e.target.value;
    });
    
    // Cybersecurity insurance
    document.getElementById('cybersecurity-insurance').addEventListener('change', (e) => {
      this.state.config.cybersecurityInsurance = e.target.value;
    });
    
    // Organization size
    document.getElementById('organization-size').addEventListener('change', (e) => {
      this.state.config.organizationSize = e.target.value;
      this.updateDeviceCount(e.target.value);
    });
    
    // Device count
    document.getElementById('device-count').addEventListener('change', (e) => {
      this.state.config.deviceCount = parseInt(e.target.value, 10);
    });
    
    // Locations
    document.getElementById('locations').addEventListener('change', (e) => {
      this.state.config.locationCount = parseInt(e.target.value, 10);
    });
    
    // Network requirements
    const networkCheckboxes = document.querySelectorAll('.feature-grid input');
    networkCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateNetworkRequirements();
      });
    });
    
    // Years to project
    document.getElementById('years-to-project').addEventListener('change', (e) => {
      this.state.config.years = parseInt(e.target.value, 10);
    });
    
    // Cost parameters
    this.setupCostParameterListeners();
  },
  
  /**
   * Set up cost parameter slider listeners
   */
  setupCostParameterListeners: function() {
    // Portnox base price
    document.getElementById('portnox-base-price').addEventListener('input', (e) => {
      const value = parseFloat(e.target.value);
      this.state.config.costParameters.portnoxBasePrice = value;
      document.getElementById('portnox-cost-value').textContent = `$${value.toFixed(2)}`;
    });
    
    // Portnox discount
    document.getElementById('portnox-discount').addEventListener('input', (e) => {
      const value = parseInt(e.target.value, 10);
      this.state.config.costParameters.portnoxDiscount = value;
      document.getElementById('portnox-discount-value').textContent = `${value}%`;
    });
    
    // FTE cost
    document.getElementById('fte-cost').addEventListener('input', (e) => {
      const value = parseInt(e.target.value, 10);
      this.state.config.costParameters.fteCost = value;
      document.getElementById('fte-cost-value').textContent = `$${value.toLocaleString()}`;
    });
    
    // FTE allocation
    document.getElementById('fte-allocation').addEventListener('input', (e) => {
      const value = parseInt(e.target.value, 10);
      this.state.config.costParameters.fteAllocation = value;
      document.getElementById('fte-allocation-value').textContent = `${value}%`;
    });
    
    // Maintenance percentage
    document.getElementById('maintenance-percentage').addEventListener('input', (e) => {
      const value = parseInt(e.target.value, 10);
      this.state.config.costParameters.maintenancePercentage = value;
      document.getElementById('maintenance-value').textContent = `${value}%`;
    });
    
    // Downtime cost
    document.getElementById('downtime-cost').addEventListener('input', (e) => {
      const value = parseInt(e.target.value, 10);
      this.state.config.costParameters.downtimeCost = value;
      document.getElementById('downtime-cost-value').textContent = `$${value.toLocaleString()}`;
    });
    
    // Risk reduction
    document.getElementById('risk-reduction').addEventListener('input', (e) => {
      const value = parseInt(e.target.value, 10);
      this.state.config.costParameters.riskReduction = value;
      document.getElementById('risk-reduction-value').textContent = `${value}%`;
    });
    
    // Insurance reduction
    document.getElementById('insurance-reduction').addEventListener('input', (e) => {
      const value = parseInt(e.target.value, 10);
      this.state.config.costParameters.insuranceReduction = value;
      document.getElementById('insurance-reduction-value').textContent = `${value}%`;
    });
  },
  
  /**
   * Initialize UI state based on default values
   */
  initUIState: function() {
    console.log('Initializing UI state...');
    
    // Set initial vendor selection
    this.state.selectedVendors.forEach(vendorId => {
      const card = document.querySelector(`.vendor-card[data-vendor="${vendorId}"]`);
      if (card) {
        card.classList.add('selected');
      }
    });
    
    // Set initial view and panel
    this.changeView(this.state.activeView);
    
    // Set initial values for sliders and dropdowns
    const { config } = this.state;
    
    // Set industry
    document.getElementById('industry-select').value = config.industry;
    
    // Set compliance requirements
    config.complianceRequirements.forEach(req => {
      const checkbox = document.getElementById(`compliance-${req}`);
      if (checkbox) checkbox.checked = true;
    });
    
    // Set risk profile
    document.getElementById('risk-profile').value = config.riskProfile;
    
    // Set insurance
    document.getElementById('cybersecurity-insurance').value = config.cybersecurityInsurance;
    
    // Set organization size
    document.getElementById('organization-size').value = config.organizationSize;
    
    // Set device count
    document.getElementById('device-count').value = config.deviceCount;
    
    // Set locations
    document.getElementById('locations').value = config.locationCount;
    
    // Set network requirements
    for (const [key, value] of Object.entries(config.networkRequirements)) {
      const checkbox = document.getElementById(key.replace(/([A-Z])/g, '-$1').toLowerCase());
      if (checkbox) checkbox.checked = value;
    }
    
    // Set years
    document.getElementById('years-to-project').value = config.years;
    
    // Set cost parameters
    this.updateCostParameterDisplay();
    
    console.log('UI state initialized successfully.');
  },
  
  /**
   * Update cost parameter display values
   */
  updateCostParameterDisplay: function() {
    const { costParameters } = this.state.config;
    
    document.getElementById('portnox-base-price').value = costParameters.portnoxBasePrice;
    document.getElementById('portnox-cost-value').textContent = `$${costParameters.portnoxBasePrice.toFixed(2)}`;
    
    document.getElementById('portnox-discount').value = costParameters.portnoxDiscount;
    document.getElementById('portnox-discount-value').textContent = `${costParameters.portnoxDiscount}%`;
    
    document.getElementById('fte-cost').value = costParameters.fteCost;
    document.getElementById('fte-cost-value').textContent = `$${costParameters.fteCost.toLocaleString()}`;
    
    document.getElementById('fte-allocation').value = costParameters.fteAllocation;
    document.getElementById('fte-allocation-value').textContent = `${costParameters.fteAllocation}%`;
    
    document.getElementById('maintenance-percentage').value = costParameters.maintenancePercentage;
    document.getElementById('maintenance-value').textContent = `${costParameters.maintenancePercentage}%`;
    
    document.getElementById('downtime-cost').value = costParameters.downtimeCost;
    document.getElementById('downtime-cost-value').textContent = `$${costParameters.downtimeCost.toLocaleString()}`;
    
    document.getElementById('risk-reduction').value = costParameters.riskReduction;
    document.getElementById('risk-reduction-value').textContent = `${costParameters.riskReduction}%`;
    
    document.getElementById('insurance-reduction').value = costParameters.insuranceReduction;
    document.getElementById('insurance-reduction-value').textContent = `${costParameters.insuranceReduction}%`;
  },
  
  /**
   * Update device count based on organization size
   */
  updateDeviceCount: function(size) {
    const sizeCounts = {
      'very-small': 250,
      'small': 500,
      'medium': 3000,
      'large': 7500,
      'enterprise': 15000
    };
    
    const newCount = sizeCounts[size] || 500;
    document.getElementById('device-count').value = newCount;
    this.state.config.deviceCount = newCount;
  },
  
  /**
   * Update compliance requirements from checkboxes
   */
  updateComplianceRequirements: function() {
    const complianceReqs = [];
    const checkboxes = document.querySelectorAll('.compliance-item input:checked');
    
    checkboxes.forEach(box => {
      const id = box.id.replace('compliance-', '');
      complianceReqs.push(id);
    });
    
    this.state.config.complianceRequirements = complianceReqs;
  },
  
  /**
   * Update network requirements from checkboxes
   */
  updateNetworkRequirements: function() {
    const reqs = {};
    
    reqs.cloudIntegration = document.getElementById('cloud-integration').checked;
    reqs.legacyDevices = document.getElementById('legacy-devices').checked;
    reqs.byodSupport = document.getElementById('byod-support').checked;
    reqs.iotSupport = document.getElementById('iot-support').checked;
    reqs.wirelessSupport = document.getElementById('wireless-support').checked;
    reqs.remoteWork = document.getElementById('remote-work').checked;
    
    this.state.config.networkRequirements = reqs;
  },
  
  /**
   * Toggle vendor selection
   */
  toggleVendorSelection: function(vendorId, card) {
    if (vendorId === 'portnox') {
      // Portnox cannot be deselected
      return;
    }
    
    const index = this.state.selectedVendors.indexOf(vendorId);
    
    if (index === -1) {
      // Add vendor to selection
      this.state.selectedVendors.push(vendorId);
      card.classList.add('selected');
    } else {
      // Remove vendor from selection
      this.state.selectedVendors.splice(index, 1);
      card.classList.remove('selected');
    }
    
    console.log('Selected vendors:', this.state.selectedVendors);
  },
  
  /**
   * Change the active view
   */
  changeView: function(view) {
    // Update active view
    this.state.activeView = view;
    
    // Update tab states
    const viewTabs = document.querySelectorAll('.stakeholder-tab');
    viewTabs.forEach(tab => {
      if (tab.dataset.view === view) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Update view panels
    const viewPanels = document.querySelectorAll('.view-panel');
    viewPanels.forEach(panel => {
      if (panel.dataset.view === view) {
        panel.classList.add('active');
        
        // Get the first panel in this view
        const firstPanel = panel.querySelector('.results-panel');
        if (firstPanel) {
          const panelId = firstPanel.id;
          this.changePanel(panelId);
        }
      } else {
        panel.classList.remove('active');
      }
    });
    
    // If we have results, update the charts for this view
    if (this.state.results) {
      this.updateChartsForActiveView();
    }
  },
  
  /**
   * Change the active panel within a view
   */
  changePanel: function(panelId) {
    const view = this.state.activeView;
    
    // Update active panel
    this.state.activePanel = panelId;
    
    // Update tab states in current view
    const resultsTabs = document.querySelectorAll(`.view-panel[data-view="${view}"] .results-tab`);
    resultsTabs.forEach(tab => {
      if (tab.dataset.panel === panelId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Update panel visibility
    const resultsPanels = document.querySelectorAll(`.view-panel[data-view="${view}"] .results-panel`);
    resultsPanels.forEach(panel => {
      if (panel.id === panelId) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
    
    // Update charts if needed
    if (this.state.results) {
      // Specific chart updates for each panel if needed
    }
  },
  
  /**
   * Toggle sidebar visibility
   */
  toggleSidebar: function() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebar-toggle');
    const contentArea = document.querySelector('.content-area');
    
    sidebar.classList.toggle('collapsed');
    toggle.classList.toggle('collapsed');
    contentArea.classList.toggle('expanded');
    
    // Update icon
    const icon = toggle.querySelector('i');
    if (sidebar.classList.contains('collapsed')) {
      icon.className = 'fas fa-chevron-right';
    } else {
      icon.className = 'fas fa-chevron-left';
    }
  },
  
  /**
   * Toggle config card expansion
   */
  toggleConfigCard: function(card) {
    const content = card.querySelector('.config-card-content');
    const icon = card.querySelector('.config-card-header i');
    
    content.classList.toggle('collapsed');
    
    if (content.classList.contains('collapsed')) {
      icon.className = 'fas fa-chevron-down';
    } else {
      icon.className = 'fas fa-chevron-up';
    }
  },
  
  /**
   * Toggle dark mode
   */
  toggleDarkMode: function() {
    document.body.classList.toggle('dark-mode');
    this.state.isDarkMode = document.body.classList.contains('dark-mode');
    
    // Update icon
    const icon = document.querySelector('#dark-mode-toggle i');
    if (this.state.isDarkMode) {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
    
    // Update charts if needed
    if (this.state.results) {
      this.updateChartsForActiveView();
    }
  },
  
  /**
   * Toggle help modal
   */
  toggleHelpModal: function() {
    const modal = document.getElementById('help-modal');
    modal.classList.toggle('active');
  },
  
  /**
   * Close a modal
   */
  closeModal: function(modal) {
    modal.classList.remove('active');
  },
  
  /**
   * Calculate TCO and ROI
   */
  calculate: function() {
    console.log('Calculating TCO and ROI...');
    
    // Show loading overlay
    this.showLoadingOverlay();
    
    // Update calculator config
    this.state.calculator.updateConfig(this.state.config);
    
    // Perform calculation with slight delay to allow UI to update
    setTimeout(() => {
      try {
        // Calculate results
        this.state.results = this.state.calculator.calculate(this.state.selectedVendors);
        
        // Update UI with results
        this.updateResultsUI();
        
        // Hide loading overlay
        this.hideLoadingOverlay();
        
        // Show success toast
        this.showToast('Calculation completed successfully!', 'success');
        
        console.log('Calculation completed:', this.state.results);
      } catch (error) {
        console.error('Calculation error:', error);
        
        // Hide loading overlay
        this.hideLoadingOverlay();
        
        // Show error toast
        this.showToast('Error during calculation: ' + error.message, 'error');
      }
    }, 800);
  },
  
  /**
   * Update UI with calculation results
   */
  updateResultsUI: function() {
    if (!this.state.results) return;
    
    console.log('Updating UI with results...');
    
    // Update metrics based on results
    this.updateMetrics();
    
    // Update charts for the active view
    this.updateChartsForActiveView();
    
    console.log('UI updated with results.');
  },
  
  /**
   * Update metrics displays
   */
  updateMetrics: function() {
    const { results } = this.state;
    
    // Executive view metrics
    if (results.vendors.portnox && results.vendors.cisco) {
      const portnoxTco = results.vendors.portnox.totalTco;
      const ciscoTco = results.vendors.cisco.totalTco;
      const savings = ciscoTco - portnoxTco;
      const savingsPercentage = Math.round((savings / ciscoTco) * 100);
      
      // Total savings
      document.getElementById('total-savings').textContent = this.formatCurrency(savings);
      document.getElementById('savings-percentage').textContent = `${savingsPercentage}% reduction vs. Cisco ISE`;
      
      // Payback period
      if (results.roi.portnox) {
        const paybackMonths = Math.round(results.roi.portnox.paybackPeriod);
        document.getElementById('payback-period').textContent = `${paybackMonths} months`;
      }
      
      // Risk reduction
      if (results.security && results.security.portnox) {
        const riskReduction = Math.round(results.security.portnox.improvements.overall);
        document.getElementById('risk-reduction-total').textContent = `${riskReduction}%`;
      }
      
      // Implementation time
      const implementationTime = results.vendors.portnox.implementation.time;
      document.getElementById('implementation-time').textContent = `${implementationTime} days`;
      document.getElementById('implementation-comparison').textContent = `${Math.round((1 - (implementationTime / results.vendors.cisco.implementation.time)) * 100)}% faster than on-premises`;
    }
    
    // Financial view metrics
    if (results.vendors.portnox && results.vendors.cisco) {
      const portnoxTco = results.vendors.portnox.totalTco;
      const ciscoTco = results.vendors.cisco.totalTco;
      
      // TCO
      document.getElementById('portnox-tco').textContent = this.formatCurrency(portnoxTco);
      document.getElementById('tco-comparison').textContent = `vs. ${this.formatCurrency(ciscoTco)} (Cisco ISE)`;
      
      // Annual subscription
      const annualSub = results.vendors.portnox.breakdown.subscription / this.state.config.years;
      document.getElementById('annual-subscription').textContent = this.formatCurrency(annualSub);
      
      // Implementation cost
      document.getElementById('implementation-cost').textContent = this.formatCurrency(results.vendors.portnox.breakdown.implementation);
      
      // Operational cost
      const operationalCost = results.vendors.portnox.breakdown.personnel / this.state.config.years;
      document.getElementById('operational-cost').textContent = this.formatCurrency(operationalCost);
    }
    
    // ROI metrics
    if (results.roi.portnox) {
      const portnoxRoi = results.roi.portnox;
      
      // 3-Year ROI
      document.getElementById('three-year-roi').textContent = `${Math.round(portnoxRoi.roiPercentage)}%`;
      
      // Annual savings
      document.getElementById('annual-savings').textContent = this.formatCurrency(portnoxRoi.annualSavings);
      
      // Productivity gains
      document.getElementById('productivity-value').textContent = this.formatCurrency(portnoxRoi.productivityBenefit);
      
      // Compliance savings
      document.getElementById('compliance-savings').textContent = this.formatCurrency(portnoxRoi.complianceSavings);
    }
    
    // Security metrics
    if (results.security && results.security.portnox) {
      const portnoxSecurity = results.security.portnox;
      
      // Security improvement
      document.getElementById('security-improvement').textContent = `${Math.round(portnoxSecurity.improvements.overall)}%`;
      
      // Breach probability
      document.getElementById('breach-probability').textContent = portnoxSecurity.risk.breachProbability;
      
      // Compliance coverage
      document.getElementById('compliance-coverage').textContent = `${Math.round(portnoxSecurity.compliance.coverage)}%`;
      
      // Mean time to respond
      document.getElementById('mttr').textContent = `${portnoxSecurity.risk.mttr} min`;
    }
  },
  
  /**
   * Update charts for the active view
   */
  updateChartsForActiveView: function() {
    const { activeView, results } = this.state;
    
    switch (activeView) {
      case 'executive':
        this.state.chartManager.initExecutiveCharts(results);
        break;
      case 'financial':
        this.state.chartManager.initFinancialCharts(results);
        break;
      case 'security':
        this.state.chartManager.initSecurityCharts(results);
        break;
      case 'technical':
        this.state.chartManager.initTechnicalCharts(results);
        break;
    }
  },
  
  /**
   * Show loading overlay
   */
  showLoadingOverlay: function() {
    const overlay = document.getElementById('loading-overlay');
    overlay.classList.add('active');
  },
  
  /**
   * Hide loading overlay
   */
  hideLoadingOverlay: function() {
    const overlay = document.getElementById('loading-overlay');
    overlay.classList.remove('active');
  },
  
  /**
   * Show a toast notification
   */
  showToast: function(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = document.createElement('i');
    switch (type) {
      case 'success':
        icon.className = 'fas fa-check-circle';
        break;
      case 'error':
        icon.className = 'fas fa-exclamation-circle';
        break;
      case 'warning':
        icon.className = 'fas fa-exclamation-triangle';
        break;
      default:
        icon.className = 'fas fa-info-circle';
    }
    
    const textSpan = document.createElement('span');
    textSpan.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(textSpan);
    toastContainer.appendChild(toast);
    
    // Show the toast with animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Remove the toast after 5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 5000);
  },
  
  /**
   * Export report as PDF
   */
  exportReport: function() {
    console.log('Exporting report...');
    
    // Show loading overlay
    this.showLoadingOverlay();
    
    // Simulated export delay (would be replaced with actual PDF generation)
    setTimeout(() => {
      // Hide loading overlay
      this.hideLoadingOverlay();
      
      // Show success toast
      this.showToast('Report exported successfully!', 'success');
    }, 2000);
  },
  
  /**
   * Format currency values
   */
  formatCurrency: function(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  },
  
  /**
   * Format percentage values
   */
  formatPercentage: function(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(value / 100);
  }
};

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
