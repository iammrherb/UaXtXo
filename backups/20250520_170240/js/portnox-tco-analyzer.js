/**
 * Portnox Total Cost Analyzer - Main Application
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
    chartPlaceholders: null,
    isDarkMode: false,
  },
  
  /**
   * Initialize the application
   */
  init: function() {
    console.log('Initializing Portnox TCO Analyzer...');
    
    // Initialize Calculator
    this.state.calculator = new TcoCalculator(this.state.config);
    
    // Initialize Chart Placeholders
    this.state.chartPlaceholders = window.chartPlaceholders || new ChartPlaceholders();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Initialize UI state
    this.initUIState();
    
    console.log('Portnox TCO Analyzer initialized successfully.');
    // Dispatch event for other components to know we are ready
    window.dispatchEvent(new CustomEvent("appInitialized"));
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
    const calcBtn = document.getElementById('calculate-btn');
    const calcBtnHeader = document.getElementById('calculate-btn-header');
    
    if (calcBtn) {
      calcBtn.addEventListener('click', () => this.calculate());
    }
    
    if (calcBtnHeader) {
      calcBtnHeader.addEventListener('click', () => this.calculate());
    }
    
    // Export button
    const exportBtn = document.getElementById('export-pdf');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportReport());
    }
    
    // Help button
    const helpBtn = document.getElementById('help-btn');
    if (helpBtn) {
      helpBtn.addEventListener('click', () => this.toggleHelpModal());
    }
    
    // Dark mode toggle
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) {
      darkModeBtn.addEventListener('click', () => this.toggleDarkMode());
    }
    
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', () => this.toggleSidebar());
    }
    
    // Main view tabs (Executive, Financial, Security, Technical)
    const mainTabs = document.querySelectorAll('.main-tab');
    mainTabs.forEach(tab => {
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
    
    // Config card headers (collapsible)
    const configCardHeaders = document.querySelectorAll('.config-card-header');
    configCardHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('i:last-child');
        
        content.classList.toggle('collapsed');
        
        if (content.classList.contains('collapsed')) {
          icon.className = 'fas fa-chevron-down';
        } else {
          icon.className = 'fas fa-chevron-up';
        }
      });
    });
    
    console.log('Event listeners set up successfully.');
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
    
    // Set active view
    this.changeView(this.state.activeView);
    
    console.log('UI state initialized successfully.');
  },
  
  /**
   * Change the active view (Executive, Financial, Security, Technical)
   */
  changeView: function(view) {
    // Update state
    this.state.activeView = view;
    
    // Update tab states
    const mainTabs = document.querySelectorAll('.main-tab');
    mainTabs.forEach(tab => {
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
        
        // Set first panel as active
        const firstPanel = panel.querySelector('.results-panel');
        if (firstPanel) {
          const panelId = firstPanel.id;
          this.changePanel(panelId);
        }
      } else {
        panel.classList.remove('active');
      }
    });
  },
  
  /**
   * Change the active panel within a view
   */
  changePanel: function(panelId) {
    // Update state
    this.state.activePanel = panelId;
    
    // Get the view from the panel
    const panel = document.getElementById(panelId);
    if (!panel) return;
    
    const viewPanel = panel.closest('.view-panel');
    if (!viewPanel) return;
    
    const view = viewPanel.dataset.view;
    
    // Update tab states
    const resultsTabs = document.querySelectorAll(`.view-panel[data-view="${view}"] .results-tab`);
    resultsTabs.forEach(tab => {
      if (tab.dataset.panel === panelId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Update panel states
    const resultsPanels = document.querySelectorAll(`.view-panel[data-view="${view}"] .results-panel`);
    resultsPanels.forEach(p => {
      if (p.id === panelId) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
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
   * Toggle sidebar visibility
   */
  toggleSidebar: function() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebar-toggle');
    const contentArea = document.querySelector('.content-area');
    
    if (sidebar && toggle && contentArea) {
      sidebar.classList.toggle('collapsed');
      toggle.classList.toggle('collapsed');
      contentArea.classList.toggle('expanded');
      
      // Update icon
      const icon = toggle.querySelector('i');
      if (icon) {
        if (sidebar.classList.contains('collapsed')) {
          icon.className = 'fas fa-chevron-right';
        } else {
          icon.className = 'fas fa-chevron-left';
        }
      }
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
    if (icon) {
      if (this.state.isDarkMode) {
        icon.className = 'fas fa-sun';
      } else {
        icon.className = 'fas fa-moon';
      }
    }
    
    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: this.state.isDarkMode ? 'dark' : 'light' }
    }));
  },
  
  /**
   * Toggle help modal
   */
  toggleHelpModal: function() {
    const modal = document.getElementById('help-modal');
    if (modal) {
      modal.classList.toggle('active');
    }
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
        
        // Create basic charts
        this.createBasicCharts();
        
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
   * Create basic charts
   */
  createBasicCharts: function() {
    // Create TCO comparison chart
    if (this.state.chartPlaceholders) {
      this.state.chartPlaceholders.createBasicTcoChart('tco-comparison-chart', this.state.results);
    }
  },
  
  /**
   * Update UI with calculation results
   */
  updateResultsUI: function() {
    if (!this.state.results) return;
    
    console.log('Updating UI with results...');
    
    // Update metrics based on results
    this.updateMetrics();
    
    console.log('UI updated with results.');
  },
  
  /**
   * Update metrics displays
   */
  updateMetrics: function() {
    const { results } = this.state;
    
    if (!results.vendors || !results.vendors.portnox) return;
    
    // Executive view metrics
    const portnoxResults = results.vendors.portnox;
    
    // Update displayed metrics if elements exist
    const updateElement = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };
    
    // Total cost
    updateElement('portnox-tco', this.formatCurrency(portnoxResults.totalTco));
    
    // Implementation time
    updateElement('implementation-time', `${portnoxResults.implementation.time} days`);
    
    // Other vendors comparison
    if (results.vendors.cisco) {
      const ciscoResults = results.vendors.cisco;
      const costDiff = ciscoResults.totalTco - portnoxResults.totalTco;
      const savingsPercent = Math.round((costDiff / ciscoResults.totalTco) * 100);
      
      updateElement('total-savings', this.formatCurrency(costDiff));
      updateElement('savings-percentage', `${savingsPercent}% reduction vs. Cisco ISE`);
      updateElement('tco-comparison', `vs. ${this.formatCurrency(ciscoResults.totalTco)} (Cisco ISE)`);
    }
  },
  
  /**
   * Show loading overlay
   */
  showLoadingOverlay: function() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.add('active');
    }
  },
  
  /**
   * Hide loading overlay
   */
  hideLoadingOverlay: function() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  },
  
  /**
   * Show a toast notification
   */
  showToast: function(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
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
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
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
  }
};

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
