/**
 * Chart Fix
 * Prevents chart reuse errors
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Chart fix script loaded');
  
  // Initialize chart instances tracker
  window.chartInstances = window.chartInstances || {};
  
  // Store original Chart constructor
  const OriginalChart = window.Chart;
  
  // Override Chart constructor to manage instances
  window.Chart = function(ctx, config) {
    // Get canvas ID
    const canvas = ctx.canvas || ctx;
    const canvasId = canvas.id || '';
    
    console.log(`Creating chart on canvas: ${canvasId}`);
    
    // Destroy existing chart if it exists
    if (canvasId && window.chartInstances[canvasId]) {
      console.log(`Destroying existing chart on canvas: ${canvasId}`);
      window.chartInstances[canvasId].destroy();
    }
    
    // Create new chart
    const chart = new OriginalChart(ctx, config);
    
    // Store chart instance
    if (canvasId) {
      window.chartInstances[canvasId] = chart;
    }
    
    return chart;
  };
  
  // Copy properties from original Chart
  for (const prop in OriginalChart) {
    if (OriginalChart.hasOwnProperty(prop)) {
      window.Chart[prop] = OriginalChart[prop];
    }
  }
});
