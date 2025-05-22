/**
 * Executive View Priority Manager
 * Ensures only the executive view loads and prevents conflicts
 */

// Disable other view systems when executive view is active
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎯 Executive View Priority Manager starting...');
  
  // Wait for DOM to be fully ready
  setTimeout(() => {
    ensureExecutiveViewPriority();
  }, 2000);
});

function ensureExecutiveViewPriority() {
  const executiveView = document.querySelector('#executive-view, .view-panel[data-view="executive"]');
  
  if (!executiveView) {
    console.warn('Executive view container not found');
    return;
  }
  
  // Stop other view rendering systems
  if (window.zeroTrustUI && typeof window.zeroTrustUI.renderCurrentView === 'function') {
    const originalRender = window.zeroTrustUI.renderCurrentView;
    window.zeroTrustUI.renderCurrentView = function(...args) {
      console.log('🚫 Blocking default view render in favor of executive view');
      return; // Block default rendering
    };
  }
  
  // Ensure executive view content is not overwritten
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.target.classList.contains('view-content')) {
        const target = mutation.target;
        const parent = target.closest('.view-panel');
        
        if (parent && parent.getAttribute('data-view') === 'executive') {
          // Check if our executive content was replaced
          if (!target.querySelector('.executive-command-center') && window.executiveViewComplete) {
            console.log('🔄 Restoring executive view content...');
            setTimeout(() => {
              window.executiveViewComplete.createExecutiveDashboard();
            }, 100);
          }
        }
      }
    });
  });
  
  // Observe the executive view container
  const viewContent = executiveView.querySelector('.view-content');
  if (viewContent) {
    observer.observe(viewContent, { childList: true, subtree: true });
  }
  
  console.log('✅ Executive view priority established');
}
