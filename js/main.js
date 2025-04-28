/**
 * Main JavaScript file for the TCO Calculator
 * Enhanced version with proper initialization and error handling
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing TCO Calculator...');
  
  try {
    // Add skip-to-content link for accessibility
    addSkipToContentLink();
    
    // Initialize DOM Cache
    if (typeof DOMCache === 'undefined') {
      throw new Error("DOMCache class is not defined. Make sure js/managers/dom-cache.js is loaded properly.");
    }
    window.domCache = new DOMCache();
    window.domCache.init();
    console.log('DOM Cache initialized');
    
    // Initialize Tab Manager
    if (typeof TabManager === 'undefined') {
      throw new Error("TabManager class is not defined. Make sure js/managers/tab-manager.js is loaded properly.");
    }
    window.tabManager = new TabManager();
    console.log('Tab Manager initialized');
    
    // Initialize Validation Manager
    if (typeof ValidationManager === 'undefined') {
      throw new Error("ValidationManager class is not defined. Make sure js/managers/validation-manager.js is loaded properly.");
    }
    window.validationManager = new ValidationManager();
    console.log('Validation Manager initialized');
    
    // Initialize Notification Manager
    if (typeof NotificationManager === 'undefined') {
      throw new Error("NotificationManager class is not defined. Make sure js/managers/notification-manager.js is loaded properly.");
    }
    window.notificationManager = new NotificationManager();
    console.log('Notification Manager initialized');
    
    // Initialize Loading Manager
    if (typeof LoadingManager === 'undefined') {
      throw new Error("LoadingManager class is not defined. Make sure js/managers/loading-manager.js is loaded properly.");
    }
    window.loadingManager = new LoadingManager();
    console.log('Loading Manager initialized');
    
    // Initialize UI Controller
    if (typeof UIController === 'undefined') {
      throw new Error("UIController class is not defined. Make sure js/components/ui-controller.js is loaded properly.");
    }
    window.uiController = new UIController();
    console.log('UI Controller initialized');
    
    // Initialize Chart Builder
    if (typeof ChartBuilder === 'undefined') {
      throw new Error("ChartBuilder class is not defined. Make sure js/charts/chart-builder.js is loaded properly.");
    }
    window.chartBuilder = new ChartBuilder();
    window.chartBuilder.initCharts();
    console.log('Chart Builder initialized');
    
    // Initialize Calculator
    if (typeof Calculator === 'undefined') {
      throw new Error("Calculator class is not defined. Make sure js/components/calculator.js is loaded properly.");
    }
    window.calculator = new Calculator();
    console.log('Calculator initialized');
    
    // Set up calculate button
    const calculateBtn = window.domCache.get('calculate-btn') || document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        // Validate inputs before calculating
        if (window.validationManager.validateAll()) {
          window.calculator.calculate()
            .then(() => {
              console.log('Calculation completed successfully');
            })
            .catch(err => {
              console.error('Calculation error:', err);
            });
        } else {
          if (window.notificationManager) {
            window.notificationManager.error('Please correct the errors before calculating');
          }
        }
      });
    }
    
    // Set default active vendor
    if (window.uiController) {
      console.log('Setting default active vendor...');
      window.uiController.setActiveVendor('cisco');
    }
    
    // Set up event listeners for calculator
    if (window.calculator) {
      window.calculator.on('calculationComplete', (results) => {
        console.log('Calculation event received with results', results?.calculationId || 'unknown');
      });
    }
    
    // Add version info to footer
    addVersionInfo();
    
    // Pre-calculate for initial state after a short delay to ensure DOM is ready
    setTimeout(() => {
      try {
        console.log('Running initial calculation...');
        
        if (window.loadingManager) {
          window.loadingManager.show('results-container', 'Running initial calculation...');
        }
        
        window.calculator.calculate()
          .then(() => {
            console.log('Initial calculation completed');
            
            setTimeout(() => {
              // Show welcome notification only after everything is ready
              if (window.notificationManager) {
                window.notificationManager.info('Welcome to the NAC TCO Calculator!');
              }
            }, 500);
          })
          .catch(err => {
            console.error('Error during initial calculation:', err);
            
            if (window.notificationManager) {
              window.notificationManager.error('Error during initial calculation: ' + err.message);
            }
          });
      } catch (err) {
        console.error('Error during initial calculation:', err);
        
        if (window.notificationManager) {
          window.notificationManager.error('Error during initial calculation: ' + err.message);
        }
      }
    }, 800); // Increased delay for better reliability
    
    console.log('TCO Calculator initialized and ready');
  } catch (error) {
    console.error('Error initializing TCO Calculator:', error);
    
    // Create an alert for critical errors since notification manager might not be available
    alert('Error initializing the TCO Calculator: ' + error.message + '\n\nPlease check your browser console for more details.');
  }
});

function addSkipToContentLink() {
  const skipLink = document.createElement('a');
  skipLink.textContent = 'Skip to content';
  skipLink.className = 'skip-to-content';
  skipLink.href = '#results-container';
  skipLink.setAttribute('tabindex', '0');
  
  document.body.insertBefore(skipLink, document.body.firstChild);
}

function addVersionInfo() {
  const footer = document.querySelector('.app-footer');
  if (!footer) return;
  
  const versionInfo = document.createElement('div');
  versionInfo.className = 'version-info';
  versionInfo.textContent = 'Version 1.1.0';
  
  footer.appendChild(versionInfo);
}
