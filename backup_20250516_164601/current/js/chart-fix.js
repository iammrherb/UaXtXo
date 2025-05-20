/**
 * Chart Fix Script
 * Resolves chart initialization conflicts
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("Chart Fix: Applying patches to chart initialization...");

  // Wait for chartManager to be available
  const checkChartManager = function() {
    if (typeof window.chartManager !== 'undefined') {
      // Override initializeCharts to prevent multiple initializations
      const originalInitializeCharts = window.chartManager.initializeCharts;

      let initialized = false;
      window.chartManager.initializeCharts = function() {
        // Clear existing charts first
        if (window.chartManager.charts) {
          Object.keys(window.chartManager.charts).forEach(key => {
            const chart = window.chartManager.charts[key];
            if (chart && typeof chart.destroy === 'function') {
              try {
                chart.destroy();
              } catch (e) {
                console.warn("Failed to destroy chart:", e);
              }
            }
          });
          window.chartManager.charts = {};
        }

        // Call original method
        console.log("Chart Fix: Safe initialization of charts");
        originalInitializeCharts.call(window.chartManager);
        initialized = true;
      };

      // Add method to check if charts are initialized
      window.chartManager.areChartsInitialized = function() {
        return initialized;
      };

      console.log("Chart Fix: Applied patches to chart initialization");
    } else {
      setTimeout(checkChartManager, 100);
    }
  };

  checkChartManager();
});
