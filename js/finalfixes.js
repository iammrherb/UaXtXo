/**
 * Final Fixes for Portnox Total Cost Analyzer
 * Apply all fixes and enhancements in one go
 */

// Load all required fixes and enhancements
document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying all fixes and enhancements...');
  
  // Add modern CSS
  loadResource('css/modern-styles.css', 'css');
  
  // Load vendor data
  loadResource('js/data/vendor-data.js', 'js');
  
  // Load tab navigator
  loadResource('js/components/tab-navigator-enhanced.js', 'js');
  
  // Load vendor comparison
  loadResource('js/components/vendorComparison.js', 'js');
  
  // Load NIST CSF visualization
  loadResource('js/components/nistCsfVisualization.js', 'js');
  
  // Load comprehensive fixes
  loadResource('js/utils/comprehensive-fix.js', 'js', function() {
    console.log('All components loaded. Initializing application...');
    
    // Initialize fixes
    if (typeof initializeFixes === 'function') {
      initializeFixes();
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
