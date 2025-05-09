/**
 * Main entry point for the NAC Total Cost Analyzer application
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('NAC Total Cost Analyzer initialized');
  
  // Add safety check for UI controller
  if (typeof EnhancedUIController === 'undefined') {
    console.warn('EnhancedUIController not defined - check script loading order');
    
    // Create fallback controller to prevent further errors
    window.uiController = {
      initializeUI: function() { console.log('Using fallback UI controller'); },
      validateInputs: function() { return true; },
      showMessage: function(msg, type) { console.log('Message:', msg, type); }
    };
  } else {
    // Initialize UI controller
    console.log('Initializing UI controller');
    window.uiController = new EnhancedUIController();
  }
  
  // Check for hash parameters to auto-load configurations
  const hashParams = new URLSearchParams(window.location.hash.substr(1));
  if (hashParams.has('vendor')) {
    const vendor = hashParams.get('vendor');
    const vendorCard = document.querySelector(`.vendor-card[data-vendor="${vendor}"]`);
    if (vendorCard) {
      setTimeout(() => {
        vendorCard.click();
        console.log(`Auto-selected vendor: ${vendor}`);
        
        // Auto-calculate if needed
        if (hashParams.has('calculate') && hashParams.get('calculate') === 'true') {
          setTimeout(() => {
            document.getElementById('calculate-btn').click();
            console.log('Auto-calculated TCO');
          }, 500);
        }
      }, 100);
    }
  }
  
  // Check for query parameters to pre-populate industry
  const queryParams = new URLSearchParams(window.location.search);
  if (queryParams.has('industry')) {
    const industry = queryParams.get('industry');
    const industrySelector = document.getElementById('industry-selector');
    if (industrySelector) {
      setTimeout(() => {
        industrySelector.value = industry;
        industrySelector.dispatchEvent(new Event('change'));
        console.log(`Auto-selected industry: ${industry}`);
      }, 100);
    }
  }
});

// Load wizard fixes
document.addEventListener('DOMContentLoaded', function() {
  const wizardFixesScript = document.createElement('script');
  wizardFixesScript.src = 'js/fixes/wizard-fixes.js';
  document.body.appendChild(wizardFixesScript);
  console.log('Wizard fixes script loaded');
});
