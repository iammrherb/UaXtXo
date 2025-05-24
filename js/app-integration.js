/**
 * Enhanced Application Integration for Portnox Total Cost Analyzer
 * Provides proper initialization and integration between components
 */

console.log("Initializing Portnox Total Cost Analyzer with enhanced components...");

document.addEventListener('DOMContentLoaded', function() {
  // Ensure vendor data is loaded before initializing views
  window.addEventListener('vendorDataLoaded', function() {
    // Initialize all the views
    if (window.executiveView && !window.executiveView.initialized) {
      window.executiveView.init();
    }
    
    if (window.securityView && !window.securityView.initialized) {
      window.securityView.init();
    }
    
    // Setup global calculation function
    window.updateAllViews = function(data) {
      if (window.executiveView && window.executiveView.initialized) {
        window.executiveView.update(data);
      }
      
      if (window.securityView && window.securityView.initialized) {
        window.securityView.update(data);
      }
    };
    
    console.log("Portnox Total Cost Analyzer initialized successfully.");
  });
  
  // Trigger vendor data load if it hasn't happened already
  const vendorReady = () => window.dispatchEvent(new Event('vendorDataLoaded'));

  if (window.VENDOR_DATA) {
    vendorReady();
  } else if (window.VENDORS) {
    window.VENDOR_DATA = window.VENDORS;
    vendorReady();
  } else {
    console.error("Vendor data not available. Loading vendors.js...");
    const script = document.createElement('script');
    script.src = 'js/data/vendors.js';
    script.onload = vendorReady;
    document.head.appendChild(script);
  }
});
