/**
 * Security View Initialization Patch
 * This script ensures the Security View is properly initialized by the application
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying Security View initialization patch...');
  
  // Wait for app integration to be available
  const checkAndPatch = () => {
    if (window.appIntegration) {
      // Check if securityView already exists and is initialized
      if (!window.securityView || !window.securityView.initialized) {
        console.log('Loading Security View module...');
        
        // If securityView doesn't exist, create it
        if (!window.securityView) {
          console.log('Creating SecurityView instance');
          window.securityView = new SecurityView();
        }
        
        // Try to initialize it
        if (window.securityView && typeof window.securityView.init === 'function') {
          console.log('Initializing SecurityView');
          window.securityView.init();
        }
      } else {
        console.log('SecurityView already initialized');
      }
      
      // Patch appIntegration.updateViews method to ensure securityView is updated
      if (window.appIntegration && typeof window.appIntegration.updateViews === 'function') {
        const originalUpdateViews = window.appIntegration.updateViews;
        
        // Only patch if not already patched
        if (!window.appIntegration._securityViewPatched) {
          window.appIntegration.updateViews = function(data) {
            // Call original method
            originalUpdateViews.call(this, data);
            
            // Also ensure securityView is updated
            if (window.securityView && typeof window.securityView.update === 'function') {
              console.log('Patch: Updating SecurityView with data');
              window.securityView.update(data);
            }
          };
          
          // Mark as patched
          window.appIntegration._securityViewPatched = true;
          console.log('Patched appIntegration.updateViews to update SecurityView');
        }
      }
      
      // Patch view navigation to switch to security view
      const securityTab = document.querySelector('.main-tab[data-view="security"]');
      if (securityTab) {
        securityTab.addEventListener('click', function() {
          console.log('Security tab clicked, ensuring SecurityView is initialized');
          
          // Try to initialize again just to be sure
          if (window.securityView && typeof window.securityView.init === 'function') {
            window.securityView.init();
          }
        });
      }
    } else {
      // Check again in 500ms
      setTimeout(checkAndPatch, 500);
    }
  };
  
  // Start the check
  checkAndPatch();
});
