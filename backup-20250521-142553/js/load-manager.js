/**
 * Consolidated Script Loader for Portnox Total Cost Analyzer
 * Prevents duplicate declarations and manages script loading order
 */

// Global namespace for all chart managers
window.Portnox = window.Portnox || {};

// Script loading tracker
window.Portnox.loadedScripts = window.Portnox.loadedScripts || {};

/**
 * Load a script only if it hasn't been loaded yet
 * @param {string} url - Script URL to load
 * @param {Function} callback - Optional callback after loading
 */
window.Portnox.loadScript = function(url, callback) {
  // If already loaded, just run callback
  if (window.Portnox.loadedScripts[url]) {
    if (callback && typeof callback === 'function') {
      callback();
    }
    return;
  }
  
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  
  // Handle callback
  if (callback && typeof callback === 'function') {
    script.onload = callback;
  }
  
  // Mark as loaded
  window.Portnox.loadedScripts[url] = true;
  
  // Add to document
  document.head.appendChild(script);
  console.log('Loaded script: ' + url);
};

/**
 * Initialize all chart managers in the correct order
 */
window.Portnox.initializeCharts = function() {
  // Define script loading order
  const scripts = [
    'js/charts/chart-config.js',
    'js/charts/highcharts/highcharts-manager.js',
    'js/charts/apex/apex-charts.js',
    'js/charts/d3/d3-manager.js',
    'js/charts/security-charts.js',
    'js/charts/chart-loader.js'
  ];
  
  // Load scripts in sequence
  let index = 0;
  function loadNext() {
    if (index < scripts.length) {
      const script = scripts[index++];
      window.Portnox.loadScript(script, loadNext);
    } else {
      // All scripts loaded, now initialize
      console.log('All chart scripts loaded successfully');
      
      // Initialize chart loader if available
      if (window.ChartLoader) {
        window.chartLoader = new ChartLoader().init();
      }
    }
  }
  
  // Start loading
  loadNext();
};

// Fix for chart configuration to prevent duplicate declaration
window.Portnox.initChartConfig = function() {
  if (!window.ChartConfig) {
    window.ChartConfig = {
      colors: {
        primary: '#1a5a96',
        secondary: '#0d4275',
        highlight: '#27ae60',
        warning: '#e74c3c',
        neutral: '#3498db',
        chart: [
          '#1a5a96', // Portnox Blue
          '#e74c3c', // Cisco Red
          '#e67e22', // Aruba Orange
          '#f39c12', // Forescout Amber
          '#2ecc71', // FortiNAC Green
          '#3498db', // Juniper Blue
          '#9b59b6', // SecureW2 Purple
          '#34495e', // Microsoft Navy
          '#16a085', // Arista Teal
          '#27ae60'  // Foxpass Green
        ]
      },
      
      defaults: {
        fontFamily: '"Nunito", sans-serif',
        fontSize: 12
      },
      
      // Get colors for vendor IDs
      getVendorColor: function(vendorId) {
        // Map vendor IDs to color indexes
        const vendorColorMap = {
          'portnox': 0,
          'cisco': 1,
          'aruba': 2,
          'forescout': 3,
          'fortinac': 4,
          'juniper': 5,
          'securew2': 6,
          'microsoft': 7,
          'arista': 8,
          'foxpass': 9
        };
        
        const colorIndex = vendorColorMap[vendorId] !== undefined ? vendorColorMap[vendorId] : 0;
        return this.colors.chart[colorIndex];
      },
      
      // Format currency values
      formatCurrency: function(value) {
        return '$' + value.toLocaleString();
      }
    };
  }
};

// Initialize chart config immediately
window.Portnox.initChartConfig();

// Document ready handler
document.addEventListener('DOMContentLoaded', function() {
  window.Portnox.initializeCharts();
  
  // Initialize view organization after charts
  if (typeof organizeViews === 'function') {
    setTimeout(organizeViews, 500);
  }
  
  // Initialize views
  if (typeof initializeViews === 'function') {
    setTimeout(initializeViews, 1000);
  }
});
