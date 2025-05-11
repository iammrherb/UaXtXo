/**
 * Chart Manager
 * Manages all chart rendering and updates throughout the application
 */
class ChartManager {
  constructor() {
    this.charts = {};
    this.colorPalette = {
      primary: ['rgba(46, 117, 182, 0.8)', 'rgba(46, 117, 182, 0.6)', 'rgba(46, 117, 182, 0.4)'],
      secondary: ['rgba(112, 173, 71, 0.8)', 'rgba(112, 173, 71, 0.6)', 'rgba(112, 173, 71, 0.4)'],
      accent: ['rgba(237, 125, 49, 0.8)', 'rgba(237, 125, 49, 0.6)', 'rgba(237, 125, 49, 0.4)'],
      neutral: ['rgba(165, 165, 165, 0.8)', 'rgba(165, 165, 165, 0.6)', 'rgba(165, 165, 165, 0.4)'],
      category10: [
        'rgba(46, 117, 182, 0.8)',
        'rgba(112, 173, 71, 0.8)',
        'rgba(237, 125, 49, 0.8)',
        'rgba(68, 114, 196, 0.8)',
        'rgba(147, 196, 125, 0.8)',
        'rgba(255, 192, 0, 0.8)',
        'rgba(91, 155, 213, 0.8)',
        'rgba(112, 48, 160, 0.8)',
        'rgba(255, 104, 104, 0.8)',
        'rgba(41, 134, 204, 0.8)'
      ]
    };
    
    // Initialize chart defaults if Chart.js is available
    if (typeof Chart !== 'undefined') {
      Chart.defaults.font.family = "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif";
      Chart.defaults.color = '#505050';
      
      if (Chart.defaults.scale) {
        Chart.defaults.scale.grid = Chart.defaults.scale.grid || {};
        Chart.defaults.scale.grid.color = 'rgba(0, 0, 0, 0.05)';
      }
    }
    
    console.log("Chart Manager initialized");
  }
  
  /**
   * Initialize all charts on the page
   */
  initializeCharts() {
    console.log("Initializing all charts...");
    
    // Clear any existing charts to prevent conflicts
    this._clearExistingCharts();
    
    // Make sure Chart.js is available
    if (typeof Chart === 'undefined') {
      console.error("Chart.js library not found. Charts cannot be initialized.");
      return;
    }
    
    // Initialize TCO comparison chart
    this.initializeTcoComparisonChart();
    
    // Initialize cost breakdown charts
    this.initializeCostBreakdownCharts();
    
    // Initialize cumulative cost chart
    this.initializeCumulativeCostChart();
    
    // Initialize feature comparison chart
    this.initializeFeatureComparisonChart();
    
    // Initialize implementation chart
    this.initializeImplementationChart();
    
    // Initialize ROI chart
    this.initializeRoiChart();
    
    // Initialize sensitivity chart
    this.initializeSensitivityChart();
    
    console.log("All charts initialized successfully");
  }
  
  /**
   * Clear existing charts to prevent conflicts
   * @private
   */
  _clearExistingCharts() {
    // Destroy existing chart instances
    Object.keys(this.charts).forEach(key => {
      const chart = this.charts[key];
      if (chart && typeof chart.destroy === 'function') {
        chart.destroy();
      }
    });
    
    // Reset charts object
    this.charts = {};
  }
  
  /**
   * Ensure canvas element exists, create if needed
   * @param {string} id - Canvas element ID
   * @param {string} parentSelector - Parent container selector
   * @param {string} title - Chart title
   * @returns {boolean} - Whether canvas exists or was created
   */
  ensureCanvasExists(id, parentSelector, title) {
    // Check if canvas already exists
    if (document.getElementById(id)) {
      return true;
    }
    
    // Find parent container
    const parent = document.querySelector(parentSelector);
    if (!parent) {
      console.warn(`Parent container ${parentSelector} not found for canvas ${id}`);
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
    console.log(`Created missing canvas element for ${id}`);
    return true;
  }
  
  /**
   * Initialize TCO comparison chart
   */
  initializeTcoComparisonChart() {
    // Ensure canvas exists
    if (!this.ensureCanvasExists(
      'tco-comparison-chart', 
      '.comparison-charts', 
      '3-Year TCO Comparison'
    )) {
      return;
    }
    
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx) {
      console.warn("Canvas element not found for TCO comparison chart");
      return;
    }
    
    // Check for existing chart instance and destroy it
    if (this.charts.tcoComparison) {
      this.charts.tcoComparison.destroy();
    }
    
    try {
      this.charts.tcoComparison = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Current Solution', 'Portnox Cloud'],
          datasets: [{
            label: 'Hardware',
            backgroundColor: this.colorPalette.category10[0],
            data: [35000, 0]
          }, {
            label: 'Software & Licensing',
            backgroundColor: this.colorPalette.category10[1],
            data: [120000, 90000]
          }, {
            label: 'Implementation',
            backgroundColor: this.colorPalette.category10[2],
            data: [75000, 30000]
          }, {
            label: 'Maintenance',
            backgroundColor: this.colorPalette.category10[3],
            data: [45000, 0]
          }, {
            label: 'Personnel',
            backgroundColor: this.colorPalette.category10[4],
            data: [180000, 90000]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: '3-Year Total Cost of Ownership'
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: $${context.raw.toLocaleString()}`
              }
            },
            legend: {
              position: 'bottom'
            }
          },
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true,
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`
              }
            }
          }
        }
      });
      
      console.log("TCO comparison chart initialized");
    } catch (error) {
      console.error("Error initializing TCO comparison chart:", error);
    }
  }
  
  /**
   * Initialize cost breakdown charts
   */
  initializeCostBreakdownCharts() {
    // Current solution breakdown
    if (!this.ensureCanvasExists(
      'current-breakdown-chart', 
      '.comparison-charts', 
      'Current Solution Cost Breakdown'
    )) {
      return;
    }
    
    const currentCtx = document.getElementById('current-breakdown-chart');
    if (!currentCtx) {
      console.warn("Canvas element not found for current breakdown chart");
      return;
    }
    
    // Check for existing chart instance and destroy it
    if (this.charts.currentBreakdown) {
      this.charts.currentBreakdown.destroy();
    }
    
    try {
      this.charts.currentBreakdown = new Chart(currentCtx, {
        type: 'pie',
        data: {
          labels: ['Hardware', 'Software & Licensing', 'Implementation', 'Maintenance', 'Personnel'],
          datasets: [{
            data: [35000, 120000, 75000, 45000, 180000],
            backgroundColor: this.colorPalette.category10.slice(0, 5)
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Current Solution Cost Breakdown'
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                  return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                }
              }
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      });
      
      console.log("Current solution breakdown chart initialized");
    } catch (error) {
      console.error("Error initializing current breakdown chart:", error);
    }
    
    // Alternative solution breakdown
    if (!this.ensureCanvasExists(
      'alternative-breakdown-chart', 
      '.comparison-charts', 
      'Portnox Cloud Cost Breakdown'
    )) {
      return;
    }
    
    const altCtx = document.getElementById('alternative-breakdown-chart');
    if (!altCtx) {
      console.warn("Canvas element not found for alternative breakdown chart");
      return;
    }
    
    // Check for existing chart instance and destroy it
    if (this.charts.alternativeBreakdown) {
      this.charts.alternativeBreakdown.destroy();
    }
    
    try {
      this.charts.alternativeBreakdown = new Chart(altCtx, {
        type: 'pie',
        data: {
          labels: ['Hardware', 'Software & Licensing', 'Implementation', 'Maintenance', 'Personnel'],
          datasets: [{
            data: [0, 90000, 30000, 0, 90000],
            backgroundColor: this.colorPalette.category10.slice(0, 5)
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Portnox Cloud Cost Breakdown'
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                  return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                }
              }
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      });
      
      console.log("Alternative solution breakdown chart initialized");
    } catch (error) {
      console.error("Error initializing alternative breakdown chart:", error);
    }
  }
  
  /**
   * Initialize cumulative cost chart
   */
  initializeCumulativeCostChart() {
    // Ensure canvas exists
    if (!this.ensureCanvasExists(
      'cumulative-cost-chart', 
      '.comparison-charts', 
      'Cumulative Cost Over Time'
    )) {
      return;
    }
    
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx) {
      console.warn("Canvas element not found for cumulative cost chart");
      return;
    }
    
    // Check for existing chart instance and destroy it
    if (this.charts.cumulativeCost) {
      this.charts.cumulativeCost.destroy();
    }
    
    try {
      this.charts.cumulativeCost = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
          datasets: [{
            label: 'Current Solution',
            backgroundColor: 'rgba(46, 117, 182, 0.2)',
            borderColor: 'rgba(46, 117, 182, 1)',
            fill: true,
            data: [75000, 185000, 295000, 455000]
          }, {
            label: 'Portnox Cloud',
            backgroundColor: 'rgba(112, 173, 71, 0.2)',
            borderColor: 'rgba(112, 173, 71, 1)',
            fill: true,
            data: [30000, 90000, 150000, 210000]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Cumulative Cost Over Time'
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: $${context.raw.toLocaleString()}`
              }
            }
          },
          scales: {
            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`
              }
            }
          }
        }
      });
      
      console.log("Cumulative cost chart initialized");
    } catch (error) {
      console.error("Error initializing cumulative cost chart:", error);
    }
  }
  
  /**
   * Initialize feature comparison chart
   */
  initializeFeatureComparisonChart() {
    // Ensure canvas exists
    if (!this.ensureCanvasExists(
      'feature-comparison-chart', 
      '#features-panel .features-content', 
      'Feature Comparison'
    )) {
      return;
    }
    
    const ctx = document.getElementById('feature-comparison-chart');
    if (!ctx) {
      console.warn("Canvas element not found for feature comparison chart");
      return;
    }
    
    // Check for existing chart instance and destroy it
    if (this.charts.featureComparison) {
      this.charts.featureComparison.destroy();
    }
    
    try {
      this.charts.featureComparison = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: [
            'Device Visibility',
            'Policy Management',
            'Guest Access',
            'BYOD Support',
            'Cloud Integration',
            'Remediation',
            'Third-Party Integration',
            'Scalability',
            'Ease of Use',
            'Reporting'
          ],
          datasets: [{
            label: 'Current Solution',
            backgroundColor: 'rgba(46, 117, 182, 0.2)',
            borderColor: 'rgba(46, 117, 182, 1)',
            pointBackgroundColor: 'rgba(46, 117, 182, 1)',
            data: [7, 6, 7, 6, 5, 6, 7, 7, 5, 6]
          }, {
            label: 'Portnox Cloud',
            backgroundColor: 'rgba(112, 173, 71, 0.2)',
            borderColor: 'rgba(112, 173, 71, 1)',
            pointBackgroundColor: 'rgba(112, 173, 71, 1)',
            data: [8, 9, 8, 9, 10, 9, 9, 9, 9, 8]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              borderWidth: 2
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Feature Comparison'
            }
          },
          scales: {
            r: {
              angleLines: {
                display: true
              },
              suggestedMin: 0,
              suggestedMax: 10
            }
          }
        }
      });
      
      console.log("Feature comparison chart initialized");
    } catch (error) {
      console.error("Error initializing feature comparison chart:", error);
    }
  }
  
  /**
   * Initialize implementation chart
   */
  initializeImplementationChart() {
    // Ensure canvas exists
    if (!this.ensureCanvasExists(
      'implementation-comparison-chart', 
      '#implementation-panel .implementation-content', 
      'Implementation Timeline Comparison'
    )) {
      return;
    }
    
    const ctx = document.getElementById('implementation-comparison-chart');
    if (!ctx) {
      console.warn("Canvas element not found for implementation comparison chart");
      return;
    }
    
    // Check for existing chart instance and destroy it
    if (this.charts.implementationComparison) {
      this.charts.implementationComparison.destroy();
    }
    
    try {
      this.charts.implementationComparison = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Planning', 'Infrastructure', 'Installation', 'Configuration', 'Testing', 'Deployment'],
          datasets: [{
            label: 'Current Solution',
            backgroundColor: 'rgba(46, 117, 182, 0.7)',
            data: [30, 20, 25, 15, 20, 40]
          }, {
            label: 'Portnox Cloud',
            backgroundColor: 'rgba(112, 173, 71, 0.7)',
            data: [10, 0, 5, 10, 10, 15]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            title: {
              display: true,
              text: 'Implementation Timeline (Days)'
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Days'
              }
            }
          }
        }
      });
      
      console.log("Implementation comparison chart initialized");
    } catch (error) {
      console.error("Error initializing implementation comparison chart:", error);
    }
  }
  
  /**
   * Initialize ROI chart
   */
  initializeRoiChart() {
    // Ensure canvas exists
    if (!this.ensureCanvasExists(
      'roi-chart', 
      '#roi-panel .roi-content', 
      'ROI Analysis'
    )) {
      return;
    }
    
    const ctx = document.getElementById('roi-chart');
    if (!ctx) {
      console.warn("Canvas element not found for ROI chart");
      return;
    }
    
    // Check for existing chart instance and destroy it
    if (this.charts.roi) {
      this.charts.roi.destroy();
    }
    
    try {
      this.charts.roi = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Month 1', 'Month 6', 'Month 12', 'Month 18', 'Month 24', 'Month 30', 'Month 36'],
          datasets: [{
            label: 'Cumulative Investment',
            borderColor: 'rgba(46, 117, 182, 1)',
            backgroundColor: 'rgba(46, 117, 182, 0.1)',
            fill: true,
            data: [30000, 60000, 90000, 120000, 150000, 180000, 210000]
          }, {
            label: 'Cumulative Return',
            borderColor: 'rgba(112, 173, 71, 1)',
            backgroundColor: 'rgba(112, 173, 71, 0.1)',
            fill: true,
            data: [0, 40000, 95000, 150000, 205000, 260000, 315000]
          }, {
            label: 'Break-even',
            borderColor: 'rgba(255, 0, 0, 1)',
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0,
            data: [null, null, 90000, null, null, null, null]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Return on Investment Analysis'
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  if (context.dataset.label === 'Break-even') {
                    return 'Break-even Point';
                  }
                  return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                }
              }
            }
          },
          scales: {
            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`
              }
            }
          }
        }
      });
      
      console.log("ROI chart initialized");
    } catch (error) {
      console.error("Error initializing ROI chart:", error);
    }
  }
  
  /**
   * Initialize sensitivity chart
   */
  initializeSensitivityChart() {
    // Ensure canvas exists
    if (!this.ensureCanvasExists(
      'sensitivity-chart', 
      '#sensitivity-panel .sensitivity-results', 
      'Sensitivity Analysis'
    )) {
      return;
    }
    
    const ctx = document.getElementById('sensitivity-chart');
    if (!ctx) {
      console.warn("Canvas element not found for sensitivity chart");
      return;
    }
    
    // Check for existing chart instance and destroy it
    if (this.charts.sensitivity) {
      this.charts.sensitivity.destroy();
    }
    
    try {
      this.charts.sensitivity = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
          datasets: [{
            label: 'Current Solution TCO',
            borderColor: 'rgba(46, 117, 182, 1)',
            backgroundColor: 'rgba(46, 117, 182, 0)',
            data: [95000, 190000, 285000, 380000, 455000, 550000, 645000, 740000, 835000, 930000]
          }, {
            label: 'Portnox Cloud TCO',
            borderColor: 'rgba(112, 173, 71, 1)',
            backgroundColor: 'rgba(112, 173, 71, 0)',
            data: [45000, 90000, 135000, 180000, 210000, 252000, 294000, 336000, 378000, 420000]
          }, {
            label: 'Savings',
            borderColor: 'rgba(237, 125, 49, 1)',
            backgroundColor: 'rgba(237, 125, 49, 0.2)',
            fill: true,
            data: [50000, 100000, 150000, 200000, 245000, 298000, 351000, 404000, 457000, 510000]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Sensitivity Analysis - Device Count Impact'
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                }
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Device Count'
              }
            },
            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`
              }
            }
          }
        }
      });
      
      console.log("Sensitivity chart initialized");
    } catch (error) {
      console.error("Error initializing sensitivity chart:", error);
    }
  }
  
  /**
   * Update TCO comparison chart with real data
   * @param {Object} currentSolution - Current solution costs
   * @param {Object} portnoxSolution - Portnox solution costs
   */
  updateTcoComparisonChart(currentSolution, portnoxSolution) {
    if (!this.charts.tcoComparison) {
      console.warn("TCO comparison chart not initialized");
      return;
    }
    
    const chart = this.charts.tcoComparison;
    
    // Update hardware costs
    chart.data.datasets[0].data = [
      currentSolution.hardware || 0,
      portnoxSolution.hardware || 0
    ];
    
    // Update licensing costs
    chart.data.datasets[1].data = [
      currentSolution.licensing || 0,
      portnoxSolution.licensing || 0
    ];
    
    // Update implementation costs
    chart.data.datasets[2].data = [
      currentSolution.implementation || 0,
      portnoxSolution.implementation || 0
    ];
    
    // Update maintenance costs
    chart.data.datasets[3].data = [
      currentSolution.maintenance || 0,
      portnoxSolution.maintenance || 0
    ];
    
    // Update personnel costs
    chart.data.datasets[4].data = [
      currentSolution.personnel || 0,
      portnoxSolution.personnel || 0
    ];
    
    chart.update();
    console.log("TCO comparison chart updated with real data");
  }
  
  /**
   * Update cost breakdown charts with real data
   * @param {Object} currentSolution - Current solution costs
   * @param {Object} portnoxSolution - Portnox solution costs
   */
  updateCostBreakdownCharts(currentSolution, portnoxSolution) {
    // Update current solution breakdown
    if (this.charts.currentBreakdown) {
      this.charts.currentBreakdown.data.datasets[0].data = [
        currentSolution.hardware || 0,
        currentSolution.licensing || 0,
        currentSolution.implementation || 0,
        currentSolution.maintenance || 0,
        currentSolution.personnel || 0
      ];
      
      this.charts.currentBreakdown.update();
      console.log("Current solution breakdown chart updated");
    }
    
    // Update Portnox solution breakdown
    if (this.charts.alternativeBreakdown) {
      this.charts.alternativeBreakdown.data.datasets[0].data = [
        portnoxSolution.hardware || 0,
        portnoxSolution.licensing || 0,
        portnoxSolution.implementation || 0,
        portnoxSolution.maintenance || 0,
        portnoxSolution.personnel || 0
      ];
      
      this.charts.alternativeBreakdown.update();
      console.log("Portnox solution breakdown chart updated");
    }
  }
}

// Initialize chart manager when document is ready
document.addEventListener('DOMContentLoaded', function() {
  window.chartManager = new ChartManager();
  
  // Initialize charts if page is already loaded
  if (document.readyState === 'complete') {
    window.chartManager.initializeCharts();
  } else {
    window.addEventListener('load', function() {
      window.chartManager.initializeCharts();
    });
  }
});
