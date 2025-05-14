/**
 * Application Initialization Bridge
 * Ensures all components are properly initialized and connected
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("App Bridge: Starting application initialization bridge...");

  // List of required components
  const requiredComponents = [
    { name: 'Chart', check: function() { return typeof window.Chart !== 'undefined'; } },
    { name: 'chartManager', check: function() { return typeof window.chartManager !== 'undefined'; } },
    { name: 'ApplicationController', check: function() { return typeof window.ApplicationController !== 'undefined'; } }
  ];

  // Create a global controller if ApplicationController isn't found
  if (typeof window.ApplicationController === 'undefined') {
    console.log("App Bridge: Creating fallback ApplicationController");

    window.ApplicationController = class ApplicationController {
      constructor() {
        this.state = {
          currentStep: 1,
          totalSteps: 5,
          formData: {
            currentVendor: '',
            industry: '',
            deviceCount: 2500,
            yearsToProject: 3,
            // Other default values...
          },
          results: null
        };

        this.components = {
          wizard: null,
          chartManager: null
        };

        console.log("App Bridge: Fallback ApplicationController initialized");
      }

      init() {
        console.log("App Bridge: Initializing fallback controller");

        // Detect components
        if (window.wizardManager) {
          this.components.wizard = window.wizardManager;
        }

        if (window.chartManager) {
          this.components.chartManager = window.chartManager;
        }

        // Initialize event handlers
        this._initEventHandlers();

        console.log("App Bridge: Fallback controller initialized successfully");
      }

      _initEventHandlers() {
        // Add event handlers for calculator button
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
          calculateBtn.addEventListener('click', this._showResults.bind(this));
        }

        // Add event handlers for result tabs
        document.querySelectorAll('.result-tab').forEach(tab => {
          tab.addEventListener('click', (e) => {
            this._switchResultTab(e.currentTarget.dataset.tab);
          });
        });
      }

      _showResults() {
        console.log("App Bridge: Showing results");

        // Show results container
        const wizardContainer = document.getElementById('wizard-container');
        const resultsContainer = document.getElementById('results-container');

        if (wizardContainer) {
          wizardContainer.classList.add('hidden');
        }

        if (resultsContainer) {
          resultsContainer.classList.remove('hidden');
        }

        // Initialize charts
        if (this.components.chartManager) {
          this.components.chartManager.initializeCharts();
        }

        // Activate overview tab
        this._switchResultTab('overview');
      }

      _switchResultTab(tabId) {
        // Update tab buttons
        document.querySelectorAll('.result-tab').forEach(tab => {
          tab.classList.remove('active');
        });

        const activeTab = document.querySelector(`.result-tab[data-tab="${tabId}"]`);
        if (activeTab) {
          activeTab.classList.add('active');
        }

        // Update tab panels
        document.querySelectorAll('.result-panel').forEach(panel => {
          panel.classList.remove('active');
        });

        const activePanel = document.getElementById(`${tabId}-panel`);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      }
    };

    // Create global controller instance
    window.appController = new window.ApplicationController();
  }

  // Create a test button to toggle results view
  let resultsContainer = document.getElementById('results-container');
  if (resultsContainer && resultsContainer.classList.contains('hidden')) {
    const testButton = document.createElement('button');
    testButton.className = 'btn btn-primary';
    testButton.style.position = 'fixed';
    testButton.style.bottom = '20px';
    testButton.style.right = '20px';
    testButton.style.zIndex = '9999';
    testButton.textContent = 'Show TCO Results';

    testButton.addEventListener('click', function() {
      if (resultsContainer.classList.contains('hidden')) {
        resultsContainer.classList.remove('hidden');
        this.textContent = 'Hide TCO Results';

        // Initialize charts
        if (window.chartManager) {
          window.chartManager.initializeCharts();
        }

        // Hide wizard container
        const wizardContainer = document.getElementById('wizard-container');
        if (wizardContainer) {
          wizardContainer.classList.add('hidden');
        }
      } else {
        resultsContainer.classList.add('hidden');
        this.textContent = 'Show TCO Results';

        // Show wizard container
        const wizardContainer = document.getElementById('wizard-container');
        if (wizardContainer) {
          wizardContainer.classList.remove('hidden');
        }
      }
    });

    document.body.appendChild(testButton);
    console.log("App Bridge: Added test button for toggling results view");
  }

  // Check if all required components are loaded
  const checkComponentsLoaded = function() {
    const missingComponents = requiredComponents.filter(comp => !comp.check());

    if (missingComponents.length > 0) {
      console.log(`App Bridge: Waiting for components to load: ${missingComponents.map(c => c.name).join(', ')}`);
      setTimeout(checkComponentsLoaded, 100);
    } else {
      console.log("App Bridge: All components loaded");

      // Initialize application controller
      if (window.appController && typeof window.appController.init === 'function') {
        window.appController.init();
      } else if (window.ApplicationController) {
        window.appController = new window.ApplicationController();
        window.appController.init();
      }

      console.log("App Bridge: Application initialized successfully");
    }
  };

  // Start checking for component loading
  setTimeout(checkComponentsLoaded, 100);
});
