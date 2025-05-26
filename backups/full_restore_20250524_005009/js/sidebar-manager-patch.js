/**
 * SidebarManager Patch for Portnox Total Cost Analyzer
 * Adds missing methods and fixes errors
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying SidebarManager patch...');
  
  // Wait for sidebar manager to be initialized
  checkAndPatchSidebarManager();
});

function checkAndPatchSidebarManager() {
  if (typeof window.sidebarManager === 'undefined') {
    console.log('Waiting for SidebarManager to be defined...');
    setTimeout(checkAndPatchSidebarManager, 500);
    return;
  }
  
  // Add missing getSelectedVendors method
  if (typeof window.sidebarManager.getSelectedVendors !== 'function') {
    console.log('Adding missing getSelectedVendors method...');
    
    window.sidebarManager.getSelectedVendors = function() {
      // Check if selectedVendors property exists
      if (!this.selectedVendors) {
        // Initialize with default selected vendors
        this.selectedVendors = ['portnox', 'cisco'];
        
        // Try to find selected vendor cards
        const selectedCards = document.querySelectorAll('.vendor-select-card.selected');
        if (selectedCards && selectedCards.length > 0) {
          this.selectedVendors = Array.from(selectedCards).map(card => card.dataset.vendor);
        }
      }
      
      // Always include 'portnox' in the selection
      if (!this.selectedVendors.includes('portnox')) {
        this.selectedVendors.push('portnox');
      }
      
      console.log('Selected vendors:', this.selectedVendors);
      return this.selectedVendors;
    };
    
    console.log('Added getSelectedVendors method to SidebarManager');
  }
  
  // Ensure toggle vendor selection updates the array
  if (typeof window.sidebarManager.toggleVendorSelection === 'function') {
    const originalToggle = window.sidebarManager.toggleVendorSelection;
    
    window.sidebarManager.toggleVendorSelection = function(vendorId, cardElement) {
      // Call original method
      const result = originalToggle.call(this, vendorId, cardElement);
      
      // Make sure the selectedVendors array is updated
      if (!this.selectedVendors) {
        this.selectedVendors = ['portnox'];
      }
      
      // Check if the card is selected
      const isSelected = cardElement.classList.contains('selected');
      
      // Update the selectedVendors array
      const index = this.selectedVendors.indexOf(vendorId);
      if (isSelected && index === -1) {
        this.selectedVendors.push(vendorId);
      } else if (!isSelected && index !== -1) {
        this.selectedVendors.splice(index, 1);
      }
      
      // Always include 'portnox' in the selection
      if (!this.selectedVendors.includes('portnox')) {
        this.selectedVendors.push('portnox');
      }
      
      console.log('Updated selected vendors:', this.selectedVendors);
      return result;
    };
    
    console.log('Enhanced toggleVendorSelection method');
  }
}
