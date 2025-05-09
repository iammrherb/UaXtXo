/**
 * Chart.js Initialization Fix
 * Prevents conflicts with Chart.js configuration
 */
(function() {
  // Run before any other scripts
  const originalChartModule = window.Chart;
  
  // Safely set Chart defaults without conflicting
  function safelySetChartDefaults() {
    if (!window.Chart) return;
    
    // Only set these if they haven't been set already
    if (!window.Chart.defaults.font) {
      window.Chart.defaults.font = {
        family: "'Segoe UI', 'Helvetica Neue', 'Arial', sans-serif",
        size: 12
      };
    }
    
    if (!window.Chart.defaults.color) {
      window.Chart.defaults.color = '#505050';
    }
    
    window.Chart.defaults.responsive = true;
    window.Chart.defaults.maintainAspectRatio = false;
    
    console.log('Chart.js initialization fixed');
  }
  
  // Try immediately if Chart is already defined
  safelySetChartDefaults();
  
  // Also try when the page loads
  window.addEventListener('load', function() {
    safelySetChartDefaults();
  });
})();
