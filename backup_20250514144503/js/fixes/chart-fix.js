/**
 * Chart Fix for Total Cost Analyzer
 * Ensures charts are properly initialized and rendered
 */

(function() {
  // Store original Chart constructor
  const originalChart = window.Chart;
  
  // Create wrapper function for Chart constructor
  window.Chart = function(context, config) {
    // Check if context is valid
    if (!context) {
      console.error('Invalid chart context');
      return null;
    }
    
    // Ensure config is valid
    if (!config || !config.type) {
      console.error('Invalid chart configuration');
      return null;
    }
    
    try {
      // Call original Chart constructor
      return new originalChart(context, config);
    } catch (error) {
      console.error('Error creating chart:', error);
      return null;
    }
  };
  
  // Copy prototype and static properties
  if (originalChart) {
    Object.assign(window.Chart, originalChart);
    window.Chart.prototype = originalChart.prototype;
  }
})();
