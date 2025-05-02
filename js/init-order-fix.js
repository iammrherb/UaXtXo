/**
 * Initialization order fix for TCO Calculator
 * Ensures components are initialized in the correct order and only once
 */
document.addEventListener('DOMContentLoaded', function() {
  // Component initialization status tracking
  window._initStatus = {
    domCache: false,
    tabManager: false,
    notificationManager: false,
    loadingManager: false,
    validationManager: false,
    uiController: false,
    chartBuilder: false,
    calculator: false
  };
  
  // Original console.log to preserve logging
  const originalConsoleLog = console.log;
  
  // Override console.log to track initializations
  console.log = function() {
    const message = arguments[0];
    
    // Check for initialization messages
    if (typeof message === 'string') {
      if (message.includes('DOM Cache initialized')) {
        window._initStatus.domCache = true;
      } else if (message.includes('Tab Manager initialized')) {
        window._initStatus.tabManager = true;
      } else if (message.includes('Notification Manager initialized')) {
        window._initStatus.notificationManager = true;
      } else if (message.includes('Loading Manager initialized')) {
        window._initStatus.loadingManager = true;
      } else if (message.includes('Validation Manager initialized')) {
        window._initStatus.validationManager = true;
      } else if (message.includes('UI Controller initialized')) {
        window._initStatus.uiController = true;
      } else if (message.includes('Chart Builder initialized')) {
        window._initStatus.chartBuilder = true;
      } else if (message.includes('Calculator initialized')) {
        window._initStatus.calculator = true;
      }
    }
    
    // Call original console.log
    return originalConsoleLog.apply(console, arguments);
  };
  
  // Initialize components if not already initialized
  setTimeout(function() {
    // Check and initialize each component
    if (!window._initStatus.domCache && !window.domCache) {
      console.log('DOM Cache not initialized, initializing now...');
      window.domCache = new DOMCache();
      window.domCache.init();
      console.log('DOM Cache initialized');
    }
    
    if (!window._initStatus.tabManager && !window.tabManager) {
      console.log('Tab Manager not initialized, initializing now...');
      window.tabManager = new TabManager();
      console.log('Tab Manager initialized');
    }
    
    if (!window._initStatus.notificationManager && !window.notificationManager) {
      console.log('Notification Manager not initialized, initializing now...');
      window.notificationManager = new NotificationManager();
      console.log('Notification Manager initialized');
    }
    
    if (!window._initStatus.loadingManager && !window.loadingManager) {
      console.log('Loading Manager not initialized, initializing now...');
      window.loadingManager = new LoadingManager();
      console.log('Loading Manager initialized');
    }
    
    if (!window._initStatus.validationManager && !window.validationManager) {
      console.log('Validation Manager not initialized, initializing now...');
      window.validationManager = new ValidationManager();
      console.log('Validation Manager initialized');
    }
    
    if (!window._initStatus.uiController && !window.uiController) {
      console.log('UI Controller not initialized, initializing now...');
      window.uiController = new UIController();
      console.log('UI Controller initialized');
    }
    
    if (!window._initStatus.chartBuilder && !window.chartBuilder) {
      console.log('Chart Builder not initialized, initializing now...');
      window.chartBuilder = new ChartBuilder();
      window.chartBuilder.initCharts();
      console.log('Chart Builder initialized');
    }
    
    if (!window._initStatus.calculator && !window.calculator) {
      console.log('Calculator not initialized, initializing now...');
      window.calculator = new Calculator();
      console.log('Calculator initialized');
    }
    
    // Set default active vendor if not already set
    if (window.uiController && !window.uiController.activeVendor) {
      window.uiController.setActiveVendor('cisco');
      console.log('Active vendor set to Cisco');
    }
    
    // Run initial calculation if needed and not already running
    if (window.calculator && !window._calculationRunning) {
      window._calculationRunning = true;
      console.log('Running initial calculation...');
      try {
        window.calculator.calculate();
        console.log('Initial calculation completed');
      } catch (err) {
        console.error('Error during initial calculation:', err);
        if (window.notificationManager) {
          window.notificationManager.error('Error calculating TCO. Please try again.');
        }
      }
      window._calculationRunning = false;
    }
  }, 500); // Delay to ensure all scripts are loaded
});
