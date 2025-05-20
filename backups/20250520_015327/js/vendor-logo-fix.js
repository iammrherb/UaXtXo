/**
 * Immediate fix for vendor logos in sidebar
 */
(function fixVendorLogos() {
  // Function to fix vendor logos
  function applyLogoFixes() {
    const vendorCards = document.querySelectorAll('.vendor-select-card');
    
    vendorCards.forEach(card => {
      const logoImg = card.querySelector('.vendor-logo img');
      if (logoImg) {
        // Ensure proper sizing - important flags to override any inline styles
        logoImg.style.cssText = 'max-height: 28px !important; max-width: 80px !important; object-fit: contain !important;';
      }
      
      // Fix card height
      card.style.cssText = 'height: 80px !important; padding: 8px 4px !important;';
      
      // Fix vendor name
      const nameElement = card.querySelector('.vendor-name');
      if (nameElement) {
        nameElement.style.cssText = 'font-size: 11px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; max-width: 95% !important; text-align: center !important;';
      }
    });
  }
  
  // Apply fixes immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLogoFixes);
  } else {
    applyLogoFixes();
  }
  
  // Also apply fixes after any updates to the DOM
  const observer = new MutationObserver(function(mutations) {
    applyLogoFixes();
  });
  
  // Start observing once the DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
