/**
 * Ultimate Executive Integration Script
 * Ensures seamless integration with existing Portnox Total Cost Analyzer
 */

// Enhanced integration with error handling and fallbacks
class UltimateExecutiveIntegration {
  constructor() {
    this.initialized = false;
    this.executiveView = null;
    this.eventListeners = [];
  }
  
  init() {
    console.log('Initializing Ultimate Executive Integration...');
    
    // Wait for DOM and other components
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupIntegration());
    } else {
      this.setupIntegration();
    }
  }
  
  setupIntegration() {
    // Initialize with delay to ensure other components are ready
    setTimeout(() => {
      this.initializeExecutiveView();
      this.setupEventIntegration();
      this.integrateWithCalculator();
      this.setupViewSwitching();
      this.initialized = true;
    }, 1500);
  }
  
  initializeExecutiveView() {
    try {
      // Check if executive view container exists
      const executiveContainer = document.querySelector('#executive-view') || 
                               document.querySelector('.view-panel[data-view="executive"]');
      
      if (!executiveContainer) {
        console.warn('Executive view container not found');
        return;
      }
      
      // Initialize the ultimate executive view
      if (typeof UltimateExecutiveView !== 'undefined' && !window.ultimateExecutiveView) {
        window.ultimateExecutiveView = new UltimateExecutiveView();
        this.executiveView = window.ultimateExecutiveView.init();
        console.log('Ultimate Executive View initialized successfully');
      }
    } catch (error) {
      console.error('Error initializing Ultimate Executive View:', error);
    }
  }
  
  setupEventIntegration() {
    // Integrate with main tab navigation
    const mainTabs = document.querySelectorAll('.main-tab[data-view="executive"]');
    mainTabs.forEach(tab => {
      const listener = () => {
        if (this.executiveView && typeof this.executiveView.init === 'function') {
          setTimeout(() => this.executiveView.refreshCharts(), 100);
        }
      };
      tab.addEventListener('click', listener);
      this.eventListeners.push({ element: tab, event: 'click', listener });
    });
  }
  
  integrateWithCalculator() {
    // Enhanced calculator integration
    const calculationHandler = (event) => {
      if (this.executiveView && event.detail) {
        console.log('Updating executive view with calculation data:', event.detail);
        this.executiveView.updateFromCalculation(event.detail);
      }
    };
    
    document.addEventListener('calculationComplete', calculationHandler);
    this.eventListeners.push({ element: document, event: 'calculationComplete', listener: calculationHandler });
    
    // Vendor selection integration
    const vendorHandler = (event) => {
      if (this.executiveView && event.detail) {
        console.log('Updating vendor selection:', event.detail);
        this.executiveView.updateVendorSelection(event.detail);
      }
    };
    
    document.addEventListener('vendorSelectionChanged', vendorHandler);
    this.eventListeners.push({ element: document, event: 'vendorSelectionChanged', listener: vendorHandler });
    
    // Configuration changes
    const configHandler = (event) => {
      if (this.executiveView && event.detail) {
        console.log('Configuration changed:', event.detail);
        this.executiveView.updateConfiguration(event.detail);
      }
    };
    
    document.addEventListener('configurationChanged', configHandler);
    this.eventListeners.push({ element: document, event: 'configurationChanged', listener: configHandler });
  }
  
  setupViewSwitching() {
    // Enhanced view switching with mutation observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          if (target.classList.contains('view-panel') && target.classList.contains('active')) {
            const viewType = target.getAttribute('data-view') || target.id?.replace('-view', '');
            if (viewType === 'executive' && this.executiveView) {
              // Refresh executive view when it becomes active
              setTimeout(() => {
                if (typeof this.executiveView.refreshCharts === 'function') {
                  this.executiveView.refreshCharts();
                }
              }, 150);
            }
          }
        }
      });
    });
    
    // Observe all view panels
    const viewPanels = document.querySelectorAll('.view-panel, [id$="-view"]');
    viewPanels.forEach(panel => {
      observer.observe(panel, { attributes: true, attributeFilter: ['class'] });
    });
  }
  
  // Cleanup method
  destroy() {
    this.eventListeners.forEach(({ element, event, listener }) => {
      element.removeEventListener(event, listener);
    });
    this.eventListeners = [];
    this.initialized = false;
  }
}

// Initialize integration
const ultimateExecutiveIntegration = new UltimateExecutiveIntegration();
ultimateExecutiveIntegration.init();

// Export for global access
window.ultimateExecutiveIntegration = ultimateExecutiveIntegration;
