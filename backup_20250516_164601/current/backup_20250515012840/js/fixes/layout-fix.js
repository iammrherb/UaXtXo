/**
 * Portnox TCO Analyzer - Layout Hotfix
 * This script forces the modern layout by removing the wizard elements
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying layout hotfix...');
  
  // Check if wizard is present
  const wizardContainer = document.querySelector('.wizard-container');
  if (wizardContainer) {
    console.log('Wizard found, hiding and forcing modern layout');
    
    // Hide wizard
    wizardContainer.style.display = 'none';
    
    // Show modern layout if available
    const appMain = document.querySelector('.app-main');
    if (appMain) {
      appMain.style.display = 'flex';
    }
    
    // Show content area if available
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      contentArea.classList.remove('hidden');
    }
  }
});
