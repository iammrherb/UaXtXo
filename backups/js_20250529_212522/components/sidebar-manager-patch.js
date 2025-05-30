/**
 * Sidebar Manager Patch
 * Adds missing getSelectedVendors method and fixes vendor selection
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying sidebar manager patch...');
  
  // Wait for sidebar manager to initialize
  setTimeout(patchSidebarManager, 500);
});

function patchSidebarManager() {
  console.log('Patching sidebar manager...');
  
  // Add getSelectedVendors method to window.sidebarManager if it doesn't exist
  if (window.sidebarManager === undefined) {
    window.sidebarManager = {};
  }
  
  // Add or replace getSelectedVendors method
  window.sidebarManager.getSelectedVendors = function() {
    const selectedCards = document.querySelectorAll('.vendor-select-card.selected');
    const vendors = [];
    
    selectedCards.forEach(card => {
      const vendorId = card.getAttribute('data-vendor');
      if (vendorId) {
        vendors.push(vendorId);
      }
    });
    
    // Ensure we always have at least Portnox selected
    if (!vendors.includes('portnox')) {
      vendors.unshift('portnox');
      
      // Also select Portnox card in the UI
      const portnoxCard = document.querySelector('.vendor-select-card[data-vendor="portnox"]');
      if (portnoxCard && !portnoxCard.classList.contains('selected')) {
        portnoxCard.classList.add('selected');
        
        // Update counter if it exists
        const counterElement = document.getElementById('vendor-counter-value');
        if (counterElement) {
          const count = document.querySelectorAll('.vendor-select-card.selected').length;
          counterElement.textContent = count;
        }
      }
    }
    
    console.log('Selected vendors:', vendors);
    return vendors;
  };
  
  // Fix vendor selection functionality
  const vendorCards = document.querySelectorAll('.vendor-select-card');
  
  vendorCards.forEach(card => {
    // Make sure Portnox is selected
    if (card.getAttribute('data-vendor') === 'portnox' && !card.classList.contains('selected')) {
      card.classList.add('selected');
    }
    
    // Clone card to remove existing event listeners
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
    
    // Add click handler
    newCard.addEventListener('click', function() {
      const vendorId = this.getAttribute('data-vendor');
      console.log(`Toggling vendor: ${vendorId}`);
      
      // Can't deselect Portnox
      if (vendorId === 'portnox' && this.classList.contains('selected')) {
        console.log('Cannot deselect Portnox (locked vendor)');
        return;
      }
      
      // Toggle selection
      if (this.classList.contains('selected')) {
        this.classList.remove('selected');
      } else {
        // Check if we're at the limit (3 vendors + Portnox)
        const selectedCount = document.querySelectorAll('.vendor-select-card.selected').length;
        if (selectedCount >= 3) {
          alert('You can select a maximum of 3 vendors to compare');
          return;
        }
        
        this.classList.add('selected');
      }
      
      // Update counter
      const counterElement = document.getElementById('vendor-counter-value');
      if (counterElement) {
        const count = document.querySelectorAll('.vendor-select-card.selected').length;
        counterElement.textContent = count;
      }
    });
  });
  
  // Fix sidebar toggle
  const sidebarToggle = document.getElementById('sidebar-toggle');
  if (sidebarToggle) {
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.querySelector('.content-area');
    
    if (sidebar && contentArea) {
      // Clone to remove existing event listeners
      const newToggle = sidebarToggle.cloneNode(true);
      sidebarToggle.parentNode.replaceChild(newToggle, sidebarToggle);
      
      // Add click handler
      newToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        this.classList.toggle('collapsed');
        contentArea.classList.toggle('expanded');
        console.log('Sidebar toggle clicked');
      });
    }
  }
  
  console.log('Sidebar manager patched successfully');
}
