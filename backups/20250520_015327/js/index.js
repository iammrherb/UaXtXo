/**
 * Main Entry Point for Portnox Total Cost Analyzer
 * Initializes the application with enhanced features
 */

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Portnox Total Cost Analyzer with enhancements...');
  
  // Initialize application
  if (window.App) {
    App.init();
    
    // Check and add dark mode support based on system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode && !localStorage.getItem('theme')) {
      document.body.classList.add('dark-mode');
      
      // Dispatch theme change event
      window.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme: 'dark' }
      }));
    }
    
    // Log initialization complete
    console.log('Portnox Total Cost Analyzer initialized successfully');
  } else {
    console.error('Application not found. Initialization failed.');
  }
});
