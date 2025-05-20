/**
 * Integration script for Portnox Total Cost Analyzer
 * This script integrates all the components into the main application
 */

document.addEventListener('DOMContentLoaded', () => {
  // Integration of UI manager
  if (App.state) {
    // Add enhanced components to App.state
    App.state.uiManager = new UIManager(App);
    App.state.themeManager = new ThemeManager();
    App.state.vendorComparison = new VendorComparisonView(App);
    
    // Initialize vendor comparison
    App.state.vendorComparison.init('vendor-radar-chart');
    
    // Override App methods with enhanced versions
    const originalInit = App.init;
    App.init = function() {
      // Call original init
      const result = originalInit.apply(this, arguments);
      
      // Initialize UI manager
      this.state.uiManager.init();
      
      return result;
    };
    
    // Fix any initialization issues
    if (App.initialized) {
      // App already initialized, just initialize UI manager
      App.state.uiManager.init();
    }
    
    // Apply final UI enhancements
    const enhanceUI = () => {
      // Add animation classes
      document.querySelectorAll('.dashboard-card, .chart-container')
        .forEach(el => el.classList.add('animate-fade-in'));
      
      // Add tooltip data attributes
      document.querySelectorAll('.btn[title]').forEach(btn => {
        btn.setAttribute('data-tooltip', btn.getAttribute('title'));
        btn.removeAttribute('title');
      });
      
      // Add vendor card hover effects
      document.querySelectorAll('.vendor-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          if (!card.classList.contains('selected')) {
            card.style.transform = 'translateY(-5px)';
          }
        });
        
        card.addEventListener('mouseleave', () => {
          if (!card.classList.contains('selected')) {
            card.style.transform = '';
          }
        });
      });
    };
    
    // Run UI enhancements
    enhanceUI();
    
    // Add resize handler for responsiveness
    window.addEventListener('resize', () => {
      if (App.state.uiManager) {
        App.state.uiManager.handleResize();
      }
    });
    
    console.log('Integration script applied successfully');
  } else {
    console.error('App not initialized. Integration failed.');
  }
});
