/**
 * Executive View Integration Script
 * Ensures proper integration with existing Portnox Total Cost Analyzer
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Executive View Integration...');
  
  // Wait for other components to initialize
  setTimeout(() => {
    initializeExecutiveIntegration();
  }, 1500);
});

function initializeExecutiveIntegration() {
  // Check if executive view container exists
  const executiveContainer = document.querySelector('#executive-view') || 
                           document.querySelector('.view-panel[data-view="executive"]');
  
  if (!executiveContainer) {
    console.warn('Executive view container not found');
    return;
  }
  
  // Initialize the complete executive view if not already done
  if (typeof ExecutiveViewComplete !== 'undefined' && !window.executiveViewComplete) {
    window.executiveViewComplete = new ExecutiveViewComplete();
    window.executiveViewComplete.init();
    console.log('Executive View Complete initialized');
  }
  
  // Integrate with existing tab navigation
  integrateTabs();
  
  // Integrate with existing calculation system
  integrateCalculations();
  
  // Set up event listeners for view switching
  setupViewSwitching();
}

function integrateTabs() {
  // Look for existing tab system
  const mainTabs = document.querySelectorAll('.main-tab[data-view="executive"]');
  
  mainTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Ensure executive view is properly initialized
      if (window.executiveViewComplete && typeof window.executiveViewComplete.init === 'function') {
        window.executiveViewComplete.init();
      }
    });
  });
}

function integrateCalculations() {
  // Listen for calculation updates
  document.addEventListener('calculationComplete', (event) => {
    if (window.executiveViewComplete && typeof window.executiveViewComplete.updateData === 'function') {
      window.executiveViewComplete.updateData(event.detail);
    }
  });
  
  // Listen for vendor selection changes
  document.addEventListener('vendorSelectionChanged', (event) => {
    if (window.executiveViewComplete && typeof window.executiveViewComplete.updateVendors === 'function') {
      window.executiveViewComplete.updateVendors(event.detail);
    }
  });
}

function setupViewSwitching() {
  // Enhanced view switching for executive dashboard
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target;
        if (target.classList.contains('view-panel') && target.classList.contains('active')) {
          const viewType = target.getAttribute('data-view');
          if (viewType === 'executive' && window.executiveViewComplete) {
            // Refresh charts when executive view becomes active
            setTimeout(() => {
              if (typeof window.executiveViewComplete.refreshCharts === 'function') {
                window.executiveViewComplete.refreshCharts();
              }
            }, 100);
          }
        }
      }
    });
  });
  
  // Observe view panels
  const viewPanels = document.querySelectorAll('.view-panel');
  viewPanels.forEach(panel => {
    observer.observe(panel, { attributes: true });
  });
}

// Export integration functions
window.executiveIntegration = {
  initializeExecutiveIntegration,
  integrateTabs,
  integrateCalculations,
  setupViewSwitching
};
