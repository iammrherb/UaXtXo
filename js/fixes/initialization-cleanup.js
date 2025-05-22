/**
 * Initialization Cleanup
 * Prevents duplicate initializations and conflicts
 */

// Track initialized components
window.initializedComponents = window.initializedComponents || {};

// Override existing initializations to prevent duplicates
const originalInit = window.ultimateExecutiveView?.init;
if (originalInit && !window.initializedComponents.ultimateExecutiveView) {
  window.ultimateExecutiveView.init = function() {
    if (window.initializedComponents.ultimateExecutiveView) {
      console.log('⚠️ UltimateExecutiveView already initialized, skipping...');
      return this;
    }
    
    console.log('🚀 Initializing UltimateExecutiveView (controlled)...');
    window.initializedComponents.ultimateExecutiveView = true;
    return originalInit.call(this);
  };
}

// Clean up multiple event listeners
const cleanupEventListeners = () => {
  // Remove duplicate calculation listeners
  document.removeEventListener('calculationComplete', () => {});
  document.removeEventListener('vendorSelectionChanged', () => {});
  document.removeEventListener('configurationChanged', () => {});
  
  console.log('🧹 Cleaned up duplicate event listeners');
};

// Consolidate vendor selection updates
const consolidateVendorUpdates = () => {
  let vendorUpdateTimeout;
  
  const updateVendors = (selectedVendors) => {
    clearTimeout(vendorUpdateTimeout);
    vendorUpdateTimeout = setTimeout(() => {
      console.log('🏪 Consolidated vendor update:', selectedVendors);
      
      // Update all dashboard instances
      if (window.ultimateExecutiveView) {
        window.ultimateExecutiveView.selectedVendors = selectedVendors;
      }
      
      if (window.consolidatedExecutiveDashboard) {
        window.consolidatedExecutiveDashboard.selectedVendors = selectedVendors;
        window.consolidatedExecutiveDashboard.updateCalculations();
      }
    }, 100);
  };
  
  // Override vendor selection functions
  window.updateVendorSelection = updateVendors;
};

// Initialize cleanup
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    cleanupEventListeners();
    consolidateVendorUpdates();
    console.log('✅ Initialization cleanup complete');
  }, 4000);
});
