/**
 * TCO Analyzer Initialization Script
 * Ensures all components are initialized in the correct order
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("TCO Analyzer initialization starting...");

  // Create necessary containers if they don't exist
  createMissingContainers();

  // Define global initialization status
  window.appInitialized = false;

  // Wait for all components to be loaded
  const checkComponentsLoaded = () => {
    // Don't attempt initialization if the app bridge has already handled it
    if (window.appInitialized) {
      console.log("Initialization already completed by app bridge");
      return;
    }

    const requiredComponents = [
      { name: 'Chart', global: 'Chart' },
      { name: 'chartManager', global: 'chartManager' },
      { name: 'ApplicationController', global: 'ApplicationController' }
    ];

    const missingComponents = requiredComponents.filter(comp => {
      return typeof window[comp.global] === 'undefined';
    });

    if (missingComponents.length > 0) {
      console.log(`Waiting for components to load: ${missingComponents.map(c => c.name).join(', ')}`);

      // Limit the number of retries to avoid infinite loops
      if (window.componentLoadRetries === undefined) {
        window.componentLoadRetries = 0;
      }

      window.componentLoadRetries++;

      // After 30 retries (3 seconds), create fallback components
      if (window.componentLoadRetries > 30 && window.componentLoadRetries < 35) {
        createFallbackComponents(missingComponents);
      }

      // Set a maximum limit to prevent infinite loops
      if (window.componentLoadRetries < 200) {
        setTimeout(checkComponentsLoaded, 100);
      } else {
        console.warn("Maximum retry limit reached. Using available components.");
        window.appInitialized = true;
      }
    } else {
      console.log("All components loaded, initializing application controller");

      // Initialize application controller
      if (!window.appController) {
        try {
          window.appController = new ApplicationController();
          window.appController.init();
          window.appInitialized = true;
        } catch (error) {
          console.error("Error initializing application controller:", error);
        }
      }

      console.log("TCO Analyzer initialized successfully!");
    }
  };

  /**
   * Create missing containers dynamically
   */
  function createMissingContainers() {
    // Create missing panels
    createMissingResultPanels();

    // Ensure comparison charts container has proper structure
    ensureComparisonChartStructure();
  }

  /**
   * Create missing result panels
   */
  function createMissingResultPanels() {
    const resultsContent = document.querySelector('.results-content');
    if (!resultsContent) return;

    const panels = [
      {
        id: 'implementation-panel',
        title: 'Implementation Analysis',
        content: `
          <div class="implementation-content">
            <div class="chart-card">
              <h3>Implementation Timeline Comparison</h3>
              <canvas id="implementation-comparison-chart"></canvas>
            </div>
            <div class="implementation-details">
              <h3>Implementation Roadmap</h3>
              <div id="implementation-roadmap">
                <!-- Roadmap populated dynamically -->
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'features-panel',
        title: 'Feature Comparison',
        content: `
          <div class="features-content">
            <div class="chart-card">
              <h3>Feature Comparison</h3>
              <canvas id="feature-comparison-chart"></canvas>
            </div>
            <div class="features-matrix">
              <h3>Detailed Feature Matrix</h3>
              <table id="features-matrix-table" class="data-table">
                <!-- Table populated dynamically -->
              </table>
            </div>
          </div>
        `
      },
      {
        id: 'roi-panel',
        title: 'ROI Analysis',
        content: `
          <div class="roi-content">
            <div class="chart-card">
              <h3>ROI Analysis</h3>
              <canvas id="roi-chart"></canvas>
            </div>
            <div class="roi-details">
              <h3>ROI Breakdown</h3>
              <div id="roi-breakdown">
                <!-- ROI details populated dynamically -->
              </div>
            </div>
          </div>
        `
      }
    ];

    // Create missing panels
    panels.forEach(panel => {
      if (!document.getElementById(panel.id)) {
        const panelElement = document.createElement('div');
        panelElement.className = 'result-panel';
        panelElement.id = panel.id;
        panelElement.innerHTML = panel.content;
        resultsContent.appendChild(panelElement);
        console.log(`Created missing panel: ${panel.id}`);
      }
    });
  }

  /**
   * Ensure comparison charts container has proper structure
   */
  function ensureComparisonChartStructure() {
    const comparisonPanel = document.getElementById('comparison-panel');
    if (!comparisonPanel) return;

    let comparisonCharts = comparisonPanel.querySelector('.comparison-charts');

    if (!comparisonCharts) {
      // Create the container if it doesn't exist
      comparisonCharts = document.createElement('div');
      comparisonCharts.className = 'comparison-charts';
      comparisonPanel.insertBefore(comparisonCharts, comparisonPanel.firstChild);
      console.log("Created comparison charts container");
    }

    if (!comparisonCharts.querySelector('.chart-grid')) {
      // Create chart grid
      const chartGrid = document.createElement('div');
      chartGrid.className = 'chart-grid';

      // Move existing chart cards to the grid
      const chartCards = comparisonCharts.querySelectorAll('.chart-card');
      if (chartCards.length > 0) {
        chartCards.forEach(card => chartGrid.appendChild(card));
      }

      // Add chart grid to container
      comparisonCharts.appendChild(chartGrid);
      console.log("Created chart grid for comparison charts");
    }
  }

  /**
   * Create fallback components if they are missing
   */
  function createFallbackComponents(missingComponents) {
    missingComponents.forEach(comp => {
      if (comp.name === 'ApplicationController' && typeof window.ApplicationController === 'undefined') {
        console.warn("Creating fallback ApplicationController");

        // Simple ApplicationController implementation
        window.ApplicationController = class ApplicationController {
          constructor() {
            this.state = { currentStep: 1 };
          }

          init() {
            console.log("Fallback ApplicationController initialized");
          }
        };
      }
    });
  }

  // Start checking for component loading
  setTimeout(checkComponentsLoaded, 100);
});
