/**
 * Immediate fix for vendor logos in sidebar
 * This script ensures all vendor logos are properly sized
 */
(function() {
  // Function to apply fixes to all vendor cards
  function fixVendorLogos() {
    const vendorCards = document.querySelectorAll('.vendor-select-card');
    
    vendorCards.forEach(card => {
      const logoImg = card.querySelector('.vendor-logo img');
      if (logoImg) {
        // Apply important style rules to override any inline styles
        logoImg.style.cssText = 'max-height: 28px !important; max-width: 80px !important; object-fit: contain !important;';
      }
      
      // Fix card height and padding
      card.style.cssText = 'height: 80px !important; padding: 8px 4px !important;';
      
      // Fix vendor name text
      const nameElement = card.querySelector('.vendor-name');
      if (nameElement) {
        nameElement.style.cssText = 'font-size: 11px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; max-width: 95% !important; text-align: center !important;';
      }
    });
  }
  
  // Apply fixes on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixVendorLogos);
  } else {
    fixVendorLogos();
  }
  
  // Set up a MutationObserver to apply fixes when the DOM changes
  const observer = new MutationObserver(function(mutations) {
    fixVendorLogos();
  });
  
  // Start observing once the DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Also run fix when content is loaded
    window.addEventListener('load', fixVendorLogos);
  });
})();
