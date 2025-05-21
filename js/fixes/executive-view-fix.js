/**
 * Executive View Fix for Portnox Total Cost Analyzer
 * Ensures proper initialization and rendering of Executive View
 */

console.log("Applying executive view fix...");

document.addEventListener('DOMContentLoaded', function() {
  // Create executive view panel if it doesn't exist
  if (!document.querySelector('.view-panel[data-view="executive"]')) {
    console.log("Creating executive view panel");
    const contentWrapper = document.querySelector('.content-area .content-wrapper');
    
    if (contentWrapper) {
      const execPanel = document.createElement('div');
      execPanel.className = 'view-panel';
      execPanel.setAttribute('data-view', 'executive');
      
      // Add necessary tabs
      execPanel.innerHTML = `
        <div class="results-tabs">
          <button class="results-tab active" data-panel="executive-summary">Executive Summary</button>
          <button class="results-tab" data-panel="executive-roi">TCO & ROI</button>
          <button class="results-tab" data-panel="executive-security">Security Impact</button>
          <button class="results-tab" data-panel="executive-compliance">Compliance</button>
          <button class="results-tab" data-panel="executive-comparison">Vendor Comparison</button>
        </div>
        
        <div id="executive-summary" class="results-panel active">
          <!-- Content will be added by executive-view.js -->
        </div>
        
        <div id="executive-roi" class="results-panel">
          <!-- Content will be added by executive-view.js -->
        </div>
        
        <div id="executive-security" class="results-panel">
          <!-- Content will be added by executive-view.js -->
        </div>
        
        <div id="executive-compliance" class="results-panel">
          <!-- Content will be added by executive-view.js -->
        </div>
        
        <div id="executive-comparison" class="results-panel">
          <!-- Content will be added by executive-view.js -->
        </div>
      `;
      
      contentWrapper.appendChild(execPanel);
    }
  }
  
  // Re-initialize executive view if it failed earlier
  if (window.executiveView && !window.executiveView.initialized) {
    console.log("Re-initializing executive view");
    window.executiveView.init();
  }
});
