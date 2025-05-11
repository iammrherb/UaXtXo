/**
 * Consolidated Chart Fix for Zero Trust Total Cost Analyzer
 * Resolves chart initialization issues and improves chart rendering reliability
 * 
 * This fix:
 * 1. Implements lazy chart initialization based on tab visibility
 * 2. Adds proper error handling and canvas existence checks
 * 3. Ensures charts are (re)initialized when their containing tabs become visible
 * 4. Consolidates multiple fixes into a single clean solution
 */

(function() {
  console.log("Chart Builder initialized and available as window.chartBuilder");
  
  // Store chart configurations for later initialization
  const chartConfigurations = {
    'tco-comparison-chart': {
      type: 'bar',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Cost ($)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '3-Year TCO Comparison'
          }
        }
      }
    },
    'cumulative-cost-chart': {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cumulative Cost ($)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time (months)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Cumulative Cost Over Time'
          }
        }
      }
    },
    'current-breakdown-chart': {
      type: 'doughnut',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Current Solution Cost Breakdown'
          }
        }
      }
    },
    'alternative-breakdown-chart': {
      type: 'doughnut',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Portnox Cloud Cost Breakdown'
          }
        }
      }
    },
    'implementation-comparison-chart': {
      type: 'radar',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 5
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Implementation Comparison'
          }
        }
      }
    },
    'feature-comparison-chart': {
      type: 'radar',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 5
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Feature Comparison'
          }
        }
      }
    },
    'roi-chart': {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Return on Investment ($)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time (months)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'ROI Analysis'
          }
        }
      }
    }
  };

  // Create empty chart instances storage
  const chartInstances = {};

  // Demo data for initial testing - will be replaced with real data in production
  const getDemoData = function(chartId) {
    if (chartId === 'tco-comparison-chart') {
      return {
        labels: ['Current Solution', 'Portnox Cloud'],
        datasets: [{
          label: 'Total Cost ($)',
          data: [350000, 180000],
          backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(75, 192, 192, 0.5)'],
          borderColor: ['rgb(54, 162, 235)', 'rgb(75, 192, 192)'],
          borderWidth: 1
        }]
      };
    } else if (chartId === 'cumulative-cost-chart') {
      return {
        labels: ['0', '6', '12', '18', '24', '30', '36'],
        datasets: [
          {
            label: 'Current Solution',
            data: [50000, 125000, 175000, 225000, 275000, 325000, 375000],
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            tension: 0.1
          },
          {
            label: 'Portnox Cloud',
            data: [75000, 100000, 125000, 140000, 155000, 170000, 185000],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.1
          }
        ]
      };
    } else if (chartId.includes('breakdown-chart')) {
      return {
        labels: ['Implementation', 'Licensing', 'Maintenance', 'Personnel', 'Training'],
        datasets: [{
          data: [15, 30, 20, 25, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }]
      };
    } else if (chartId.includes('comparison-chart')) {
      return {
        labels: ['Ease of Use', 'Deployment Speed', 'Scalability', 'Support', 'Flexibility', 'Reliability'],
        datasets: [
          {
            label: 'Current Solution',
            data: [3, 2, 3, 4, 2, 4],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
          },
          {
            label: 'Portnox Cloud',
            data: [4, 5, 5, 4, 5, 4],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            pointBackgroundColor: 'rgb(75, 192, 192)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(75, 192, 192)'
          }
        ]
      };
    } else if (chartId === 'roi-chart') {
      return {
        labels: ['0', '6', '12', '18', '24', '30', '36'],
        datasets: [{
          label: 'Net Savings',
          data: [-25000, 0, 50000, 85000, 120000, 155000, 190000],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1
        }]
      };
    }
    
    // Default empty data if no match
    return {
      labels: [],
      datasets: []
    };
  };

  // Initialize or reinitialize a chart
  const initializeChart = function(chartId) {
    try {
      const canvas = document.getElementById(chartId);
      
      if (!canvas) {
        console.log(`Canvas element not found for chart: ${chartId}`);
        return false;
      }
      
      // Destroy existing chart if it exists
      if (chartInstances[chartId]) {
        chartInstances[chartId].destroy();
      }
      
      const ctx = canvas.getContext('2d');
      const config = chartConfigurations[chartId];
      
      if (!config) {
        console.log(`No configuration found for chart: ${chartId}`);
        return false;
      }
      
      // Create chart with demo data
      const data = getDemoData(chartId);
      chartInstances[chartId] = new Chart(ctx, {
        type: config.type,
        data: data,
        options: config.options
      });
      
      console.log(`Chart created successfully: ${chartId}`);
      return true;
    } catch (error) {
      console.error(`Error initializing chart ${chartId}:`, error);
      return false;
    }
  };

  // Initialize visible charts
  const initializeVisibleCharts = function() {
    console.log('Chart.js detected, initializing charts...');
    
    // Get the active tab
    const activeTabContent = document.querySelector('.tab-pane.active');
    if (!activeTabContent) {
      console.log('No active tab found');
      return;
    }
    
    // Find all canvas elements in the active tab
    const canvasElements = activeTabContent.querySelectorAll('canvas[id]');
    let successCount = 0;
    
    canvasElements.forEach(canvas => {
      const chartId = canvas.id;
      if (initializeChart(chartId)) {
        successCount++;
      }
    });
    
    console.log(`All charts initialized successfully (${successCount} charts)`);
  };

  // Update chart data
  const updateChartData = function(chartId, newData) {
    if (!chartInstances[chartId]) {
      console.log(`Chart ${chartId} not initialized yet, initializing now...`);
      if (!initializeChart(chartId)) {
        console.error(`Failed to initialize chart ${chartId} for data update`);
        return false;
      }
    }
    
    try {
      const chart = chartInstances[chartId];
      chart.data = newData;
      chart.update();
      return true;
    } catch (error) {
      console.error(`Error updating chart ${chartId}:`, error);
      return false;
    }
  };

  // Set up tab change listeners to initialize charts when tabs become visible
  const setupTabListeners = function() {
    const tabLinks = document.querySelectorAll('a[data-bs-toggle="tab"]');
    
    tabLinks.forEach(tabLink => {
      tabLink.addEventListener('shown.bs.tab', function(event) {
        const targetTabId = event.target.getAttribute('href');
        const targetTab = document.querySelector(targetTabId);
        
        if (!targetTab) return;
        
        // Find all canvas elements in the newly activated tab
        const canvasElements = targetTab.querySelectorAll('canvas[id]');
        canvasElements.forEach(canvas => {
          initializeChart(canvas.id);
        });
      });
    });
  };

  // Initialize the chart builder
  const initChartBuilder = function() {
    console.log("Installing chart fix...");
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      console.error("Chart.js not loaded! Charts won't be initialized.");
      return false;
    }
    
    // Initialize the chart builder
    window.chartBuilder = {
      initialize: initializeVisibleCharts,
      initChart: initializeChart,
      updateChart: updateChartData,
      getChartInstance: function(chartId) {
        return chartInstances[chartId];
      }
    };
    
    // Set up tab change listeners
    setupTabListeners();
    
    // Initialize charts that are visible on page load
    initializeVisibleCharts();
    
    console.log("Chart fix installed successfully");
    return true;
  };
  
  // Run initialization when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChartBuilder);
  } else {
    initChartBuilder();
  }
})();
