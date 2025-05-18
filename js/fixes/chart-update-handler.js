/**
 * Chart Update Handler
 * Manages chart updates when data or selections change
 */
(function() {
  // Master function to update all charts
  window.updateAllCharts = function(selectedVendors) {
    console.log("Updating all charts with selected vendors:", selectedVendors);
    
    if (!selectedVendors || selectedVendors.length === 0) {
      console.error("No vendors selected for chart updates");
      return;
    }
    
    // Get calculated data
    const calculationData = window.getCalculatedData ? window.getCalculatedData() : {};
    
    // Create a function to safely initialize charts
    const safeInitChart = function(initFn, ...args) {
      try {
        if (typeof initFn === 'function') {
          return initFn(...args);
        }
      } catch (error) {
        console.error(`Error initializing chart with ${initFn ? initFn.name : 'unknown function'}:`, error);
        return null;
      }
    };
    
    // Update all charts with current data
    safeInitChart(window.initTcoComparisonChart, selectedVendors, calculationData);
    safeInitChart(window.initCumulativeCostChart, selectedVendors, calculationData);
    safeInitChart(window.initRoiChart, selectedVendors, calculationData);
    safeInitChart(window.initBreachImpactChart, selectedVendors, calculationData);
    safeInitChart(window.initRiskComparisonChart, selectedVendors, calculationData);
    safeInitChart(window.initVendorRadarChart, selectedVendors, calculationData);
    safeInitChart(window.initSecurityCapabilityRadarChart, selectedVendors, calculationData);
    safeInitChart(window.initArchitectureChart, selectedVendors, calculationData);
    safeInitChart(window.initFeatureRadarChart, selectedVendors, calculationData);
    
    console.log("All charts updated successfully");
  };
  
  // Hook up chart updating to vendor selection and parameter changes
  document.addEventListener('DOMContentLoaded', function() {
    const vendorCards = document.querySelectorAll('.vendor-card');
    vendorCards.forEach(card => {
      card.addEventListener('click', function() {
        setTimeout(() => {
          const selectedVendors = Array.from(document.querySelectorAll('.vendor-card.selected'))
            .map(card => card.getAttribute('data-vendor'))
            .filter(Boolean);
            
          window.updateAllCharts(selectedVendors);
        }, 100);
      });
    });
    
    // Update when calculation parameters change
    const calculationInputs = document.querySelectorAll('#cost-config input, #organization-config input, #organization-config select');
    calculationInputs.forEach(input => {
      input.addEventListener('change', function() {
        const selectedVendors = Array.from(document.querySelectorAll('.vendor-card.selected'))
          .map(card => card.getAttribute('data-vendor'))
          .filter(Boolean);
          
        window.updateCalculations(selectedVendors);
      });
    });
  });
})();
