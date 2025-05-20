/**
 * Main Entry Point for Portnox Total Cost Analyzer
 * Modified to integrate with existing code without conflicts
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Portnox Total Cost Analyzer enhancements...');
  
  // Check if the main application is initialized
  if (window.App) {
    console.log('Main application found, integrating enhancements...');
    
    // Add dark mode support if not already present
    if (!window.hasOwnProperty('themeManager')) {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDarkMode && !localStorage.getItem('theme')) {
        document.body.classList.add('dark-mode');
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themechange', {
          detail: { theme: 'dark' }
        }));
      }
    }
    
    // Make sure sidebar manager is initialized
    if (!window.sidebarManager || !window.sidebarManager.initialized) {
      console.log('Re-initializing sidebar manager...');
      window.sidebarManager = new SidebarManager();
    }
    
    console.log('Portnox Total Cost Analyzer enhancements initialized successfully');
  } else {
    console.log('Waiting for main application to initialize...');
    
    // Listen for the main app initialization
    window.addEventListener('appInitialized', () => {
      console.log('Main application initialized, now applying enhancements');
      // Re-initialize sidebar manager when main app is ready
      if (!window.sidebarManager || !window.sidebarManager.initialized) {
        window.sidebarManager = new SidebarManager();
      }
    });
  }
});
