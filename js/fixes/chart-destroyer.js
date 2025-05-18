/**
 * Chart Destroyer Utility
 * Ensures proper cleanup of Chart.js instances before reinitialization
 */
(function() {
  window.chartInstances = window.chartInstances || {};
  
  window.destroyChart = function(canvasId) {
    if (window.chartInstances[canvasId]) {
      window.chartInstances[canvasId].destroy();
      delete window.chartInstances[canvasId];
      console.log(`Chart ${canvasId} destroyed successfully`);
    }
  };
  
  window.destroyAllCharts = function() {
    console.log("Destroying all charts...");
    Object.keys(window.chartInstances).forEach(canvasId => {
      window.destroyChart(canvasId);
    });
    console.log("All charts destroyed");
  };
  
  // Enhanced chart initialization to store references
  window.initializeChart = function(canvasId, config) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas with ID ${canvasId} not found`);
      return null;
    }
    
    // Always destroy existing chart on this canvas first
    window.destroyChart(canvasId);
    
    // Clear the canvas
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create and store new chart
    try {
      const chart = new Chart(ctx, config);
      window.chartInstances[canvasId] = chart;
      return chart;
    } catch (error) {
      console.error(`Error initializing chart ${canvasId}:`, error);
      return null;
    }
  };
  
  // Hook into panel and view changes to ensure charts are destroyed
  document.addEventListener('DOMContentLoaded', function() {
    // Tab switching events
    const resultsTabs = document.querySelectorAll('.results-tab');
    resultsTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        window.destroyAllCharts();
      });
    });
    
    // View switching events
    const viewTabs = document.querySelectorAll('.stakeholder-tab');
    viewTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        window.destroyAllCharts();
      });
    });
  });
})();
