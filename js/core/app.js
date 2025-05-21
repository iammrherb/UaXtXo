/**
 * Main Application for Portnox Total Cost Analyzer
 * Initializes and coordinates all application components
 */

class PortnoxTCA {
  constructor() {
    this.config = window.TCAConfig || {};
    this.initialized = false;
    
    // References to component managers
    this.viewManager = null;
    this.chartManager = null;
    this.sidebarManager = null;
    this.vendorManager = null;
  }
  
  /**
   * Initialize the application
   */
  init() {
    console.log('Initializing Portnox Total Cost Analyzer...');
    
    // Get references to component managers
    this.viewManager = window.viewManager;
    this.chartManager = window.chartManager;
    this.sidebarManager = window.sidebarManager;
    this.vendorManager = window.vendorManager;
    
    // Check if all required components are available
    if (!this.viewManager || !this.chartManager || !this.sidebarManager || !this.vendorManager) {
      console.error('Required component managers not found');
      return false;
    }
    
    // Set up global event listeners
    this.setupEventListeners();
    
    // Create missing vendor logos
    this.createMissingVendorLogos();
    
    this.initialized = true;
    
    // Log initialization complete
    console.log('Portnox Total Cost Analyzer initialized successfully');
    
    return true;
  }
  
  /**
   * Set up global event listeners
   */
  setupEventListeners() {
    // Listen for vendor selection changes
    document.addEventListener('vendorSelectionChange', (event) => {
      const selectedVendors = event.detail.selectedVendors;
      console.log('Vendor selection changed:', selectedVendors);
      
      // Update charts based on selected vendors
      this.updateCharts();
    });
    
    // Listen for configuration value changes
    document.addEventListener('configValueChange', (event) => {
      console.log('Configuration value changed:', event.detail);
      
      // Update calculations and charts
      this.updateCalculations();
    });
    
    // Window resize handling
    window.addEventListener('resize', this.debounce(() => {
      // Refresh charts on window resize
      if (this.chartManager) {
        this.chartManager.destroyAllCharts();
        this.updateCharts();
      }
    }, 250));
  }
  
  /**
   * Update all charts with current data
   */
  updateCharts() {
    // This would update all charts with the latest data
    // For now, just refresh the current view
    const activeView = this.viewManager.activeView.secondary;
    this.viewManager.refreshView(activeView);
  }
  
  /**
   * Update calculations based on configuration changes
   */
  updateCalculations() {
    // This would recalculate all data based on the current configuration
    // Then update the charts
    this.updateCharts();
  }
  
  /**
   * Create placeholder logos for vendors with missing images
   */
  createMissingVendorLogos() {
    // Get all vendor logo images
    const vendorLogos = document.querySelectorAll('.vendor-logo img');
    
    // Set error handler to show text instead of missing image
    vendorLogos.forEach(logo => {
      logo.onerror = function() {
        const vendorCard = this.closest('.vendor-select-card');
        const vendorId = vendorCard ? vendorCard.dataset.vendor : null;
        const vendor = vendorId ? PortnoxTCA.config.vendors[vendorId] : null;
        
        // Hide the image
        this.style.display = 'none';
        
        // Show the vendor name as text
        const logoContainer = this.parentElement;
        if (logoContainer) {
          const text = document.createElement('span');
          text.className = 'vendor-text-logo';
          text.textContent = vendor ? vendor.shortName : 'Vendor';
          logoContainer.appendChild(text);
        }
      };
    });
  }
  
  /**
   * Debounce function to limit execution frequency
   * @param {Function} func - The function to debounce
   * @param {number} wait - The debounce wait time in milliseconds
   * @returns {Function} - The debounced function
   */
  debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Create the application instance
  window.app = new PortnoxTCA();
  
  // Initialize once all component managers are loaded
  setTimeout(() => {
    window.app.init();
  }, 500);
});
