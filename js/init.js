/**
 * TCO Analyzer Initialization Script
 * Ensures all components are initialized in the correct order
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("TCO Analyzer initialization starting...");
  
  // Create necessary containers if they don't exist
  createMissingContainers();
  
  // Wait for all components to be loaded
  const checkComponentsLoaded = () => {
    const requiredComponents = [
      'Chart',        // Chart.js library
      'chartManager', // Our chart manager
      'ApplicationController' // Application controller
    ];
    
    const missingComponents = requiredComponents.filter(component => {
      if (component === 'Chart') {
        return typeof window[component] === 'undefined';
      } else {
        return typeof window[component] === 'undefined';
      }
    });
    
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
  
  /**
   * Create missing containers dynamically
   */
  function createMissingContainers() {
    // Create main result panels if they don't exist
    const resultsContent = document.querySelector('.results-content');
    if (resultsContent) {
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
        },
        {
          id: 'sensitivity-panel',
          title: 'Sensitivity Analysis',
          content: `
            <div class="sensitivity-content">
              <div class="sensitivity-controls">
                <h3>Sensitivity Analysis Parameters</h3>
                <div class="parameter-grid">
                  <div class="parameter-card">
                    <label for="sensitivity-variable">Variable to Analyze</label>
                    <select id="sensitivity-variable" class="form-select">
                      <option value="deviceCount">Device Count</option>
                      <option value="cost">Cost per Device</option>
                      <option value="fte">FTE Requirements</option>
                      <option value="implementation">Implementation Time</option>
                    </select>
                  </div>
                  <div class="parameter-card">
                    <label>Value Range</label>
                    <div class="range-inputs">
                      <input type="number" id="sensitivity-min" class="form-input" placeholder="Min">
                      <input type="number" id="sensitivity-max" class="form-input" placeholder="Max">
                    </div>
                  </div>
                </div>
                <button id="run-sensitivity" class="btn btn-primary">
                  Run Sensitivity Analysis
                </button>
              </div>
              <div class="sensitivity-results">
                <div class="chart-card">
                  <h3>Sensitivity Analysis Results</h3>
                  <canvas id="sensitivity-chart"></canvas>
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
    
    // Ensure comparison charts container has proper structure
    const comparisonPanel = document.getElementById('comparison-panel');
    if (comparisonPanel) {
      const comparisonCharts = comparisonPanel.querySelector('.comparison-charts');
      
      if (comparisonCharts && !comparisonCharts.querySelector('.chart-grid')) {
        // Create wrapper for charts
        const chartGrid = document.createElement('div');
        chartGrid.className = 'chart-grid';
        
        // Move existing children into the grid
        while (comparisonCharts.firstChild) {
          chartGrid.appendChild(comparisonCharts.firstChild);
        }
        
        // Append grid to comparison charts container
        comparisonCharts.appendChild(chartGrid);
        console.log("Created chart grid for comparison charts");
      }
    }
  }
  
  // Start checking for component loading
  setTimeout(checkComponentsLoaded, 100);
});
