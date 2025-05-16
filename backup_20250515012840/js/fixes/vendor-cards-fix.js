/**
 * Vendor Cards Fix
 * Ensures vendor cards are properly styled and interactive
 */

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Select all vendor cards
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    // Add click event to vendor cards
    vendorCards.forEach(card => {
      card.addEventListener('click', function() {
        // Remove active class from all cards
        vendorCards.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked card
        this.classList.add('active');
        
        // Get vendor ID
        const vendorId = this.dataset.vendor;
        
        // Show preview if function exists
        if (typeof showVendorPreview === 'function') {
          showVendorPreview(vendorId);
        } else if (typeof WizardController !== 'undefined' && 
                  typeof WizardController.showVendorPreview === 'function') {
          WizardController.showVendorPreview(vendorId);
        } else {
          // Simple fallback
          const previewContainer = document.getElementById('vendor-preview');
          if (previewContainer) {
            const vendorName = this.querySelector('h3')?.textContent || vendorId;
            
            previewContainer.innerHTML = `
              <div class="vendor-preview-card">
                <h3>Selected: ${vendorName}</h3>
                <p>You will compare this solution with Portnox Cloud.</p>
              </div>
            `;
          }
        }
      });
    });
    
    // Add animation classes
    vendorCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 50}ms`;
      card.classList.add('fade-in');
    });
    
    // Add vendor selection function to window
    window.showVendorPreview = function(vendorId) {
      const previewContainer = document.getElementById('vendor-preview');
      if (!previewContainer) return;
      
      // Simple vendor name mapping
      const vendorNames = {
        'cisco': 'Cisco ISE',
        'aruba': 'Aruba ClearPass',
        'forescout': 'Forescout',
        'fortinac': 'FortiNAC',
        'nps': 'Microsoft NPS',
        'securew2': 'SecureW2',
        'juniper': 'Juniper Mist',
        'foxpass': 'Foxpass',
        'arista': 'Arista Agni',
        'noNac': 'No NAC Solution'
      };
      
      const vendorName = vendorNames[vendorId] || vendorId;
      
      // Create vendor preview
      previewContainer.innerHTML = `
        <div class="vendor-preview-card">
          <h3>Selected: ${vendorName}</h3>
          <div class="preview-content">
            <p>You've selected ${vendorName} as your current NAC solution. We'll compare its costs and capabilities with Portnox Cloud.</p>
            
            <div class="preview-comparison">
              <div class="comparison-item">
                <span class="label">Deployment Model:</span>
                <span class="value">${vendorId === 'noNac' ? 'None' : (vendorId === 'securew2' ? 'Cloud' : 'On-Premises')}</span>
              </div>
              <div class="comparison-item">
                <span class="label">Hardware Required:</span>
                <span class="value">${vendorId === 'noNac' || vendorId === 'securew2' ? 'No' : 'Yes'}</span>
              </div>
              <div class="comparison-item">
                <span class="label">Implementation Time:</span>
                <span class="value">${vendorId === 'noNac' ? 'None' : (vendorId === 'securew2' ? 'Weeks' : 'Months')}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    };
  });
})();
