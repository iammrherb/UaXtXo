/**
 * Enhanced Toggle Functionality for Portnox Total Cost Analyzer
 * Fixes issues with sections that can't be expanded once collapsed
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing collapsible sections fix...');
  
  // Apply fixes after a short delay to ensure DOM is fully loaded
  setTimeout(fixCollapsibleSections, 500);
});

function fixCollapsibleSections() {
  // Find all config cards in the sidebar
  const configCards = document.querySelectorAll('.config-card');
  
  if (!configCards || configCards.length === 0) {
    console.warn('No config cards found, will try again in 1 second');
    setTimeout(fixCollapsibleSections, 1000);
    return;
  }
  
  console.log(`Found ${configCards.length} config cards, applying fixes`);
  
  // Process each config card
  configCards.forEach((card, index) => {
    const header = card.querySelector('.config-card-header');
    const content = card.querySelector('.config-card-content');
    const toggleIcon = header ? header.querySelector('.toggle-icon') : null;
    
    if (!header || !content) {
      console.warn(`Config card ${index} is missing header or content, skipping`);
      return;
    }
    
    // Remove any existing click handlers by cloning and replacing
    const newHeader = header.cloneNode(true);
    header.parentNode.replaceChild(newHeader, header);
    
    // Make sure content has transition styles
    content.style.transition = 'max-height 0.35s ease-in-out, opacity 0.35s ease-in-out, padding 0.35s ease-in-out';
    
    // Check if initially collapsed and apply correct class
    if (content.classList.contains('collapsed')) {
      content.style.maxHeight = '0px';
      content.style.opacity = '0';
      content.style.paddingTop = '0';
      content.style.paddingBottom = '0';
      
      const newToggleIcon = newHeader.querySelector('.toggle-icon');
      if (newToggleIcon) newToggleIcon.classList.add('collapsed');
    } else {
      // Make sure it's fully expanded
      content.style.maxHeight = 'none';
      content.style.opacity = '1';
      content.style.paddingTop = '';
      content.style.paddingBottom = '';
    }
    
    // Add new, more reliable click handler
    newHeader.addEventListener('click', function() {
      // Find content and toggle icon again (to be safe)
      const content = card.querySelector('.config-card-content');
      const toggleIcon = newHeader.querySelector('.toggle-icon');
      
      console.log(`Toggling config card ${index} - ${card.id || 'unknown'}`);
      
      if (content.classList.contains('collapsed')) {
        // Expand
        content.classList.remove('collapsed');
        if (toggleIcon) toggleIcon.classList.remove('collapsed');
        
        // First set a specific height to allow transition
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        
        // Force reflow
        content.offsetHeight;
        
        // Transition to full height
        content.style.maxHeight = '1000px'; // Large enough for all content
        content.style.opacity = '1';
        content.style.paddingTop = '';
        content.style.paddingBottom = '';
        
        // After transition, set to auto height
        setTimeout(() => {
          content.style.maxHeight = 'none';
        }, 350);
      } else {
        // Collapse
        // First set explicit height for transition
        content.style.maxHeight = content.scrollHeight + 'px';
        
        // Force reflow
        content.offsetHeight;
        
        // Transition to zero height
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
        
        // Add collapsed class after transition
        setTimeout(() => {
          content.classList.add('collapsed');
          if (toggleIcon) toggleIcon.classList.add('collapsed');
        }, 350);
      }
    });
    
    console.log(`Fixed toggle functionality for card ${index} - ${card.id || 'unknown'}`);
  });
  
  console.log('Collapsible section fixes applied successfully');
}

// Add a global helper function that other modules can use
window.toggleCollapsibleSection = function(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return false;
  
  const header = card.querySelector('.config-card-header');
  if (header) {
    // Simulate a click on the header
    header.click();
    return true;
  }
  return false;
};
