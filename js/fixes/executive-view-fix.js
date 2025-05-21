/**
 * Executive View Fix for Portnox Total Cost Analyzer
 * Ensures proper initialization of the Executive View
 */

(function() {
  console.log("Applying Executive View fix...");
  
  // Wait for DOM content to be loaded
  document.addEventListener('DOMContentLoaded', function() {
    fixExecutiveView();
  });
  
  // If DOM already loaded, fix it now
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    fixExecutiveView();
  }
  
  function fixExecutiveView() {
    // Check if executiveView is available
    if (!window.executiveView) {
      console.error("executiveView object not found");
      return;
    }
    
    // Find the executive view panel
    let viewPanel = document.querySelector('.view-panel[data-view="executive"]');
    
    // If not found, look for the panel by ID
    if (!viewPanel) {
      viewPanel = document.getElementById('executive-view');
    }
    
    // If still not found, create it
    if (!viewPanel) {
      console.log("Creating executive view panel...");
      viewPanel = document.createElement('div');
      viewPanel.className = 'view-panel';
      viewPanel.id = 'executive-view';
      viewPanel.dataset.view = 'executive';
      
      // Find content area to append to
      const contentArea = document.querySelector('.content-wrapper');
      if (contentArea) {
        contentArea.appendChild(viewPanel);
      } else {
        console.error("Content area not found");
        return;
      }
    }
    
    // Reinitialize the executive view with the correct container
    if (!window.executiveView.initialized) {
      console.log("Reinitializing executive view...");
      const result = window.executiveView.init('executive');
      
      if (result) {
        console.log("Executive view initialized successfully");
      } else {
        console.error("Failed to initialize executive view");
      }
    } else {
      console.log("Executive view already initialized");
    }
    
    // If charts are not visible, refresh them
    console.log("Refreshing executive charts...");
    if (window.executiveView.refreshChartsInPanel) {
      window.executiveView.refreshChartsInPanel('executive-summary');
    }
  }
})();

console.log("Executive view fix script loaded");
