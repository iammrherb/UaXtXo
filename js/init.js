/**
 * TCO Analyzer Initialization Script
 * Ensures all components are initialized in the correct order
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("TCO Analyzer initialization starting...");
  
  // Wait for all components to be loaded
  const checkComponentsLoaded = () => {
    const requiredComponents = [
      'chartManager',
      'tcoCalculator', 
      'industryComplianceProcessor',
      'featureComparisonProcessor'
    ];
    
    const missingComponents = requiredComponents.filter(component => !window[component]);
    
    if (missingComponents.length > 0) {
      console.log(`Waiting for components to load: ${missingComponents.join(', ')}`);
      setTimeout(checkComponentsLoaded, 100);
    } else {
      console.log("All components loaded, initializing application controller");
      
      // Initialize application controller
      if (!window.appController) {
        window.appController = new ApplicationController();
      }
      
      // Initialize app
      window.appController.init();
      
      console.log("TCO Analyzer initialized successfully!");
    }
  };
  
  // Start checking for component loading
  checkComponentsLoaded();
});
