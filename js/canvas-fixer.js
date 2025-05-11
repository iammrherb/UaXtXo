/**
 * Canvas Element Fixer
 * Ensures all necessary canvas elements exist in the DOM
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("Canvas Element Fixer: Checking for required canvas elements...");
  
  // Canvas elements that should exist
  const requiredCanvases = [
    {
      id: 'tco-comparison-chart',
      parent: '.comparison-charts',
      title: '3-Year TCO Comparison'
    },
    {
      id: 'current-breakdown-chart',
      parent: '.comparison-charts',
      title: 'Current Solution Cost Breakdown'
    },
    {
      id: 'alternative-breakdown-chart',
      parent: '.comparison-charts',
      title: 'Portnox Cloud Cost Breakdown'
    },
    {
      id: 'cumulative-cost-chart',
      parent: '.comparison-charts',
      title: 'Cumulative Cost Over Time'
    },
    {
      id: 'implementation-comparison-chart',
      parent: '#implementation-panel .implementation-content',
      title: 'Implementation Timeline Comparison'
    },
    {
      id: 'feature-comparison-chart',
      parent: '#features-panel .features-content',
      title: 'Feature Comparison'
    },
    {
      id: 'roi-chart',
      parent: '#roi-panel .roi-content',
      title: 'ROI Analysis'
    },
    {
      id: 'sensitivity-chart',
      parent: '#sensitivity-panel .sensitivity-results',
      title: 'Sensitivity Analysis'
    }
  ];
  
  // Function to ensure canvas exists
  function ensureCanvasExists(id, parentSelector, title) {
    // Check if canvas already exists
    if (document.getElementById(id)) {
      return true;
    }
    
    // Find parent container
    const parent = document.querySelector(parentSelector);
    if (!parent) {
      console.warn(`Canvas Fixer: Parent container ${parentSelector} not found for canvas ${id}`);
      return false;
    }
    
    // Create chart card and canvas
    const chartCard = document.createElement('div');
    chartCard.className = 'chart-card';
    chartCard.innerHTML = `
      <h3>${title}</h3>
      <canvas id="${id}"></canvas>
    `;
    
    // Append to parent
    parent.appendChild(chartCard);
    console.log(`Canvas Fixer: Created missing canvas element for ${id}`);
    return true;
  }
  
  // Check each required canvas
  requiredCanvases.forEach(canvas => {
    ensureCanvasExists(canvas.id, canvas.parent, canvas.title);
  });
  
  // Ensure parent containers exist
  const requiredContainers = [
    {
      id: 'implementation-panel',
      parent: '.results-content',
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
      parent: '.results-content',
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
      parent: '.results-content',
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
      parent: '.results-content',
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
  
  // Ensure parent containers
  requiredContainers.forEach(container => {
    if (!document.getElementById(container.id)) {
      const parent = document.querySelector(container.parent);
      if (parent) {
        const containerElement = document.createElement('div');
        containerElement.className = 'result-panel';
        containerElement.id = container.id;
        containerElement.innerHTML = container.content;
        parent.appendChild(containerElement);
        console.log(`Canvas Fixer: Created missing container: ${container.id}`);
      } else {
        console.warn(`Canvas Fixer: Parent container ${container.parent} not found for ${container.id}`);
      }
    }
  });
  
  // Ensure comparison charts container has proper structure
  const comparisonPanel = document.getElementById('comparison-panel');
  if (comparisonPanel) {
    const comparisonCharts = comparisonPanel.querySelector('.comparison-charts');
    
    if (comparisonCharts) {
      // Check if we need to add a chart grid
      if (!comparisonCharts.querySelector('.chart-grid')) {
        const chartGrid = document.createElement('div');
        chartGrid.className = 'chart-grid';
        
        // Move existing chart cards into the grid
        const chartCards = comparisonCharts.querySelectorAll('.chart-card');
        if (chartCards.length > 0) {
          chartCards.forEach(card => {
            chartGrid.appendChild(card);
          });
        }
        
        // Add chart grid to comparison charts
        comparisonCharts.appendChild(chartGrid);
        console.log('Canvas Fixer: Added chart grid to comparison charts');
      }
    } else {
      // Create the comparison charts container
      const chartsContainer = document.createElement('div');
      chartsContainer.className = 'comparison-charts';
      
      const chartGrid = document.createElement('div');
      chartGrid.className = 'chart-grid';
      
      chartsContainer.appendChild(chartGrid);
      comparisonPanel.prepend(chartsContainer);
      console.log('Canvas Fixer: Created comparison charts container');
    }
  }
  
  console.log("Canvas Element Fixer: Completed check for required canvas elements");
});
