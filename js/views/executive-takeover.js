/**
 * Executive View Takeover - Ensures ONLY ExecutiveViewComplete runs
 */

// Immediately take over executive view
(function() {
  console.log('🎯 Executive Takeover starting...');
  
  // Disable all other executive view systems
  if (window.zeroTrustUI) {
    const originalRender = window.zeroTrustUI.renderCurrentView;
    window.zeroTrustUI.renderCurrentView = function(view, results) {
      if (view === 'executive') {
        console.log('🚫 Blocking enhanced-ui executive render');
        return; // Block executive rendering
      }
      return originalRender.call(this, view, results);
    };
  }
  
  // Force load ExecutiveViewComplete when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
      const executiveView = document.querySelector('#executive-view .view-content') || 
                          document.querySelector('.view-panel[data-view="executive"] .view-content');
      
      if (executiveView && typeof ExecutiveViewComplete !== 'undefined') {
        // Clear any existing content
        executiveView.innerHTML = '';
        
        // Initialize our executive view
        window.executiveViewComplete = new ExecutiveViewComplete();
        window.executiveViewComplete.init();
        console.log('✅ ExecutiveViewComplete is now the ONLY executive view');
      } else {
        console.error('❌ ExecutiveViewComplete class not available');
      }
    }, 1000);
  });
})();
