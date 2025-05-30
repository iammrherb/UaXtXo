/**
 * Fixed Executive Integration Script
 * Ensures proper integration without conflicts
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Initializing Fixed Executive Integration...');
  
  // Wait for components to load
  setTimeout(() => {
    initializeFixedIntegration();
  }, 1500);
});

function initializeFixedIntegration() {
  // Ensure we're on the executive view
  const executiveView = document.querySelector('#executive-view');
  if (!executiveView) {
    console.warn('Executive view not found');
    return;
  }
  
  // Initialize the fixed ultimate executive view
  if (typeof UltimateExecutiveView !== 'undefined' && !window.ultimateExecutiveView) {
    window.ultimateExecutiveView = new UltimateExecutiveView();
    window.ultimateExecutiveView.init();
    console.log('✅ Fixed Ultimate Executive View initialized');
  }
  
  // Setup calculation integration
  setupCalculationIntegration();
  
  // Setup vendor selection integration
  setupVendorIntegration();
  
  console.log('✅ Fixed Executive Integration complete');
}

function setupCalculationIntegration() {
  // Listen for calculation events
  document.addEventListener('calculationComplete', (event) => {
    if (window.ultimateExecutiveView) {
      window.ultimateExecutiveView.updateFromCalculation(event.detail);
    }
  });
  
  // Listen for vendor changes
  document.addEventListener('vendorSelectionChanged', (event) => {
    if (window.ultimateExecutiveView) {
      window.ultimateExecutiveView.selectedVendors = event.detail;
      window.ultimateExecutiveView.refreshCurrentTab();
    }
  });
}

function setupVendorIntegration() {
  // Sync with sidebar vendor selection
  const vendorCards = document.querySelectorAll('.vendor-card');
  vendorCards.forEach(card => {
    card.addEventListener('click', () => {
      setTimeout(() => {
        const selectedVendors = Array.from(document.querySelectorAll('.vendor-card.selected'))
          .map(c => c.getAttribute('data-vendor'));
        
        // Update executive view vendor buttons
        document.querySelectorAll('.vendor-btn').forEach(btn => {
          const vendorId = btn.getAttribute('data-vendor');
          if (selectedVendors.includes(vendorId)) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
        
        // Update executive view
        if (window.ultimateExecutiveView) {
          window.ultimateExecutiveView.selectedVendors = selectedVendors;
          window.ultimateExecutiveView.refreshCurrentTab();
        }
      }, 100);
    });
  });
}

// Export for global access
window.executiveIntegrationFixed = {
  initializeFixedIntegration,
  setupCalculationIntegration,
  setupVendorIntegration
};
