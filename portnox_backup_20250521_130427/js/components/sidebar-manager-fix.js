/**
 * Fixed Sidebar Manager for Portnox Total Cost Analyzer
 * Fixes toggling and section expansion/collapse
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing sidebar manager fix...');
  
  // Wait a bit for main sidebar manager to initialize
  setTimeout(fixSidebarManager, 500);
});

function fixSidebarManager() {
  // Fix sidebar toggle
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const contentArea = document.querySelector('.content-area');
  
  if (!sidebarToggle || !sidebar || !contentArea) {
    console.warn('Sidebar elements not found, cannot fix toggle');
    return;
  }
  
  // Remove existing event listeners by cloning and replacing
  const newSidebarToggle = sidebarToggle.cloneNode(true);
  sidebarToggle.parentNode.replaceChild(newSidebarToggle, sidebarToggle);
  
  // Add fixed event listener
  newSidebarToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Toggling sidebar');
    sidebar.classList.toggle('collapsed');
    newSidebarToggle.classList.toggle('collapsed');
    contentArea.classList.toggle('expanded');
  });
  
  // Fix config card toggles
  const configCards = document.querySelectorAll('.config-card');
  
  configCards.forEach(card => {
    const header = card.querySelector('.config-card-header');
    const content = card.querySelector('.config-card-content');
    const toggleIcon = header?.querySelector('.toggle-icon');
    
    if (!header || !content) return;
    
    // Remove existing event listeners by cloning and replacing
    const newHeader = header.cloneNode(true);
    header.parentNode.replaceChild(newHeader, header);
    
    // Add fixed event listener
    newHeader.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Special handler for cost config
      if (card.id === 'cost-config') {
        // Let the specialized handler deal with it
        return;
      }
      
      console.log(`Toggling section ${card.id}`);
      
      if (content.classList.contains('collapsed')) {
        // Expand
        content.classList.remove('collapsed');
        
        const newToggleIcon = newHeader.querySelector('.toggle-icon');
        if (newToggleIcon) newToggleIcon.classList.remove('collapsed');
        
        // Set explicit max-height to ensure transition works
        const contentHeight = content.scrollHeight;
        content.style.maxHeight = '0px';
        
        // Force reflow
        content.offsetHeight;
        
        // Set target height
        content.style.maxHeight = `${contentHeight}px`;
        
        // Clear max-height after transition to allow content to grow if needed
        setTimeout(() => {
          content.style.maxHeight = '';
        }, 300);
      } else {
        // Collapse
        const contentHeight = content.scrollHeight;
        content.style.maxHeight = `${contentHeight}px`;
        
        // Force reflow
        content.offsetHeight;
        
        // Set collapse height
        content.style.maxHeight = '0px';
        
        // Add collapsed class after transition
        setTimeout(() => {
          content.classList.add('collapsed');
          
          const newToggleIcon = newHeader.querySelector('.toggle-icon');
          if (newToggleIcon) newToggleIcon.classList.add('collapsed');
        }, 300);
      }
    });
  });
  
  // Fix vendor selection cards - ensure they respond to clicks
  const vendorCards = document.querySelectorAll('.vendor-select-card');
  vendorCards.forEach(card => {
    if (card.dataset.vendor === 'portnox') return; // Skip Portnox card
    
    // Remove existing event listeners by cloning and replacing
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
    
    // Add fixed event listener
    newCard.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      newCard.classList.toggle('selected');
      console.log(`Toggled vendor ${newCard.dataset.vendor}`);
      
      // If window.sidebarManager exists, update its selectedVendors
      if (window.sidebarManager && typeof window.sidebarManager.toggleVendorSelection === 'function') {
        window.sidebarManager.toggleVendorSelection(newCard.dataset.vendor, newCard);
      }
    });
  });
  
  console.log('Sidebar manager fixes applied');
}
