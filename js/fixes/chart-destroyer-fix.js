/**
 * Enhanced Chart Destroyer
 * Fixes persistent chart reinitialization issues
 */
(function() {
  // Store all chart instances by ID
  window.chartRegistry = window.chartRegistry || {};
  
  // Destroy specific chart
  window.destroyChart = function(canvasId) {
    try {
      // Try to get chart instance from our registry
      if (window.chartRegistry[canvasId]) {
        window.chartRegistry[canvasId].destroy();
        delete window.chartRegistry[canvasId];
        console.log(`Chart ${canvasId} destroyed successfully via registry`);
        return true;
      }
      
      // Try to get from Chart.js registry if available
      if (window.Chart && typeof Chart.getChart === 'function') {
        const chartInstance = Chart.getChart(canvasId);
        if (chartInstance) {
          chartInstance.destroy();
          console.log(`Chart ${canvasId} destroyed via Chart.getChart()`);
          return true;
        }
      }
      
      // Get canvas and clear it manually as fallback
      const canvas = document.getElementById(canvasId);
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          console.log(`Canvas ${canvasId} cleared manually`);
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error(`Error destroying chart ${canvasId}:`, error);
      return false;
    }
  };
  
  // Destroy all charts
  window.destroyAllCharts = function() {
    console.log("Destroying all charts...");
    
    // First try our registry
    Object.keys(window.chartRegistry).forEach(canvasId => {
      window.destroyChart(canvasId);
    });
    
    // Then try to find all canvases and clear them
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
      if (canvas.id) {
        window.destroyChart(canvas.id);
      } else {
        // For canvases without ID
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    });
    
    // Reset registry
    window.chartRegistry = {};
    
    console.log("All charts destroyed");
  };
  
  // Enhanced chart initialization
  window.initializeChart = function(canvasId, config) {
    // Always destroy existing chart first
    window.destroyChart(canvasId);
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas element ${canvasId} not found`);
      return null;
    }
    
    try {
      // Create new chart
      const chart = new Chart(canvas, config);
      
      // Store in registry
      window.chartRegistry[canvasId] = chart;
      
      return chart;
    } catch (error) {
      console.error(`Error initializing chart ${canvasId}:`, error);
      return null;
    }
  };
  
  // Hook into view and panel changes to ensure proper chart destruction
  document.addEventListener('DOMContentLoaded', function() {
    // Find all view tabs and add event listeners
    const viewTabs = document.querySelectorAll('.stakeholder-tab');
    viewTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Always destroy all charts before switching views
        window.destroyAllCharts();
      });
    });
    
    // Find all panel tabs and add event listeners
    const panelTabs = document.querySelectorAll('.results-tab');
    panelTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Always destroy all charts before switching panels
        window.destroyAllCharts();
      });
    });
  });
})();
