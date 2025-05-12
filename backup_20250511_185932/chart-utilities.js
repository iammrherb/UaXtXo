/**
 * Chart Utilities
 * Provides common functions for chart management and error resolution
 * Version: 2.1
 */

(function() {
  // Create a namespace for chart utilities
  window.ChartUtils = window.ChartUtils || {};
  
  // Track all chart instances
  window.ChartUtils.instances = {};
  
  // Log function with prefix
  function log(message) {
    console.log(`[Chart Utils] ${message}`);
  }
  
  // Initialize the utilities
  function init() {
    log('Initializing chart utilities...');
    
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
      console.warn('[Chart Utils] Chart.js not found. Utils will wait for it to load.');
      
      // Watch for Chart.js to become available
      const checkInterval = setInterval(() => {
        if (typeof Chart !== 'undefined') {
          log('Chart.js detected, initializing utilities...');
          clearInterval(checkInterval);
          setupChartPatches();
        }
      }, 100);
      
      // Give up after 5 seconds
      setTimeout(() => {
        if (typeof Chart === 'undefined') {
          clearInterval(checkInterval);
          console.error('[Chart Utils] Chart.js was not loaded after 5 seconds');
        }
      }, 5000);
    } else {
      setupChartPatches();
    }
  }
  
  // Set up Chart.js patches
  function setupChartPatches() {
    log('Setting up Chart.js patches...');
    
    // Patch for getChart utility if not present
    if (typeof Chart.getChart !== 'function') {
      Chart.getChart = function(canvas) {
        if (typeof canvas === 'string') {
          canvas = document.getElementById(canvas);
        }
        
        if (!canvas) return null;
        
        return Object.values(Chart.instances || {}).find(chart => 
          chart.canvas === canvas
        );
      };
      
      log('Added Chart.getChart method');
    }
    
    // Patch for safe destroy
    window.ChartUtils.destroyChart = function(canvasId) {
      const chart = Chart.getChart(canvasId);
      if (chart) {
        chart.destroy();
        log(`Destroyed chart: ${canvasId}`);
        return true;
      }
      return false;
    };
    
    // Patch for safely initializing a chart
    window.ChartUtils.initializeChart = function(canvasId, config) {
      try {
        // First, ensure any existing chart is destroyed
        window.ChartUtils.destroyChart(canvasId);
        
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
          console.warn(`[Chart Utils] Canvas element not found: ${canvasId}`);
          return null;
        }
        
        // Create new chart
        const ctx = canvas.getContext('2d');
        const newChart = new Chart(ctx, config);
        
        // Store in our instance tracker
        window.ChartUtils.instances[canvasId] = newChart;
        
        log(`Successfully initialized chart: ${canvasId}`);
        return newChart;
      } catch (error) {
        console.error(`[Chart Utils] Error initializing chart ${canvasId}:`, error);
        return null;
      }
    };
    
    // Patch for refreshing a chart
    window.ChartUtils.refreshChart = function(canvasId) {
      const chart = Chart.getChart(canvasId);
      if (chart) {
        chart.update();
        log(`Refreshed chart: ${canvasId}`);
        return true;
      }
      return false;
    };
    
    // Patch for destroying all charts
    window.ChartUtils.destroyAllCharts = function() {
      Object.keys(window.ChartUtils.instances).forEach(id => {
        window.ChartUtils.destroyChart(id);
      });
      log('Destroyed all charts');
    };
    
    // Create global aliases for backward compatibility
    window.initializeChart = window.ChartUtils.initializeChart;
    window.destroyChart = window.ChartUtils.destroyChart;
    window.refreshChart = window.ChartUtils.refreshChart;
    
    log('Chart.js patches successfully applied');
  }
  
  // Initialize Chart Utilities
  init();
  
  // Set up event listeners for tab changes
  document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.result-tab');
    tabButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        const tabName = this.getAttribute('data-tab');
        log(`Tab changed to: ${tabName}`);
        
        // Small delay to let the DOM update
        setTimeout(() => {
          const activePanel = document.querySelector('.result-panel.active');
          if (activePanel) {
            const canvases = activePanel.querySelectorAll('canvas');
            canvases.forEach(canvas => {
              window.ChartUtils.refreshChart(canvas.id);
            });
          }
        }, 100);
      });
    });
    
    log('Tab change handlers installed');
  });
})();
