/**
 * Final Fixes for Portnox Total Cost Analyzer
 * Apply all fixes and enhancements in one go
 */

// Load all required fixes and enhancements
document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying all fixes and enhancements for Portnox Total Cost Analyzer...');
  
  // Add modern CSS
  loadResource('css/modern-styles.css', 'css');
  
  // Add Font Awesome if not already present
  if (!document.querySelector('link[href*="fontawesome"]')) {
    loadResource('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css', 'css');
  }
  
  // Add ApexCharts
  loadResource('https://cdn.jsdelivr.net/npm/apexcharts', 'js');
  
  // Load vendor data
  loadResource('js/data/vendor-data.js', 'js', function() {
    // If vendor data wasn't found in the first location, try another
    if (typeof window.VENDORS === 'undefined') {
      loadResource('js/models/vendor-data.js', 'js');
    }
  });
  
  // Load custom components
  loadResource('js/components/tab-navigator-enhanced.js', 'js');
  loadResource('js/components/vendorComparison.js', 'js');
  loadResource('js/components/nistCsfVisualization.js', 'js');
  
  // Load calculator fixes
  loadResource('js/models/calculator-fix.js', 'js');
  
  // Load comprehensive fixes
  loadResource('js/utils/comprehensive-fix.js', 'js', function() {
    console.log('All components loaded. Initializing application...');
    
    // Initialize fixes
    if (typeof initializeFixes === 'function') {
      setTimeout(initializeFixes, 500); // Slight delay to ensure all scripts are processed
    }
  });
});

/**
 * Load a resource (JS or CSS) dynamically
 */
function loadResource(url, type, callback) {
  // Check if resource already exists
  const existingElements = document.querySelectorAll(`link[href="${url}"], script[src="${url}"]`);
  if (existingElements.length > 0) {
    console.log(`Resource ${url} already loaded`);
    if (callback) callback();
    return;
  }
  
  let element;
  
  if (type === 'css') {
    element = document.createElement('link');
    element.rel = 'stylesheet';
    element.href = url;
  } else if (type === 'js') {
    element = document.createElement('script');
    element.src = url;
    
    if (callback) {
      element.onload = callback;
    }
  }
  
  document.head.appendChild(element);
  console.log(`Loaded ${type} resource: ${url}`);
}
