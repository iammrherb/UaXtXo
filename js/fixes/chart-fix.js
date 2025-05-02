/**
 * Enhanced chart loading fix
 * - Ensures all charts are properly initialized and displayed
 * - Prevents chart canvas errors
 * - Ensures ROI chart is created and accessible
 */
(function() {
  // Execute on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing chart fixes...');
    
    // Chart requirements - make sure all containers exist
    const requiredCharts = [
      { id: 'tco-comparison-chart', title: 'TCO Comparison' },
      { id: 'cumulative-cost-chart', title: 'Cumulative Costs Over Time' },
      { id: 'current-breakdown-chart', title: 'Cost Breakdown' },
      { id: 'alternative-breakdown-chart', title: 'Cost Breakdown - Portnox' },
      { id: 'feature-comparison-chart', title: 'Feature Comparison' },
      { id: 'implementation-comparison-chart', title: 'Implementation Time Comparison' },
      { id: 'roi-chart', title: 'Return on Investment Analysis' },
      { id: 'waterfall-chart', title: 'Cost Analysis Over Time' },
      { id: 'resource-utilization-chart', title: 'IT Resource Utilization' }
    ];
    
    // Poll for ChartBuilder initialization
    const checkInterval = setInterval(function() {
      if (window.chartBuilder) {
        clearInterval(checkInterval);
        fixCharts();
      }
    }, 100);
    
    function fixCharts() {
      // Ensure all chart canvases exist
      requiredCharts.forEach(function(chartInfo) {
        ensureChartCanvas(chartInfo.id, chartInfo.title);
      });
      
      // Fix chart initialization if needed
      if (window.chartBuilder) {
        // Extend chartBuilder.initCharts if it exists
        const originalInitCharts = window.chartBuilder.initCharts;
        window.chartBuilder.initCharts = function() {
          // Call original method
          originalInitCharts.apply(this, arguments);
          
          // Additional initializations
          if (!this.charts.roi) this.initROIChart();
          if (!this.charts.waterfall) this.initWaterfallChart();
          if (!this.charts.resourceUtilization) this.initResourceUtilizationChart();
        };
        
        // Add initialization methods if they don't exist
        if (!window.chartBuilder.initROIChart) {
          window.chartBuilder.initROIChart = function() {
            const ctx = document.getElementById('roi-chart');
            if (!ctx) {
              console.warn('ROI chart canvas not found');
              return;
            }
            
            this.charts.roi = new Chart(ctx, {
              type: 'line',
              data: {
                labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
                datasets: [
                  {
                    label: 'Current Solution',
                    data: [100000, 150000, 200000, 250000],
                    borderColor: this.chartColors.neutral,
                    backgroundColor: `${this.chartColors.neutral}20`,
                    fill: true
                  },
                  {
                    label: 'Portnox Cloud',
                    data: [80000, 110000, 140000, 170000],
                    borderColor: this.chartColors.portnox,
                    backgroundColor: `${this.chartColors.portnox}20`,
                    fill: true
                  },
                  {
                    label: 'Cumulative Savings',
                    data: [20000, 60000, 80000, 100000],
                    borderColor: '#28a745',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    fill: false,
                    yAxisID: 'y1'
                  }
                ]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Cumulative Cost ($)'
                    },
                    ticks: {
                      callback: function(value) {
                        return '$' + value.toLocaleString();
                      }
                    }
                  },
                  y1: {
                    position: 'right',
                    beginAtZero: true,
                    grid: {
                      drawOnChartArea: false
                    },
                    title: {
                      display: true,
                      text: 'Cumulative Savings ($)'
                    },
                    ticks: {
                      callback: function(value) {
                        return '$' + value.toLocaleString();
                      }
                    }
                  }
                },
                plugins: {
                  title: {
                    display: true,
                    text: 'Return on Investment Analysis',
                    font: {
                      size: 16
                    }
                  }
                }
              }
            });
            
            console.log('ROI chart initialized with placeholder data');
          };
        }
        
        // Add waterfall chart initialization if it doesn't exist
        if (!window.chartBuilder.initWaterfallChart) {
          window.chartBuilder.initWaterfallChart = function() {
            const ctx = document.getElementById('waterfall-chart');
            if (!ctx) {
              console.warn('Waterfall chart canvas not found');
              return;
            }
            
            this.charts.waterfall = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: ['Initial Investment', 'Year 1 Savings', 'Year 2 Savings', 'Year 3 Savings', 'Total Savings'],
                datasets: [{
                  data: [-50000, 30000, 40000, 50000, 70000],
                  backgroundColor: function(context) {
                    const value = context.dataset.data[context.dataIndex];
                    return value < 0 ? '#dc3545' : (value > 0 ? '#28a745' : '#ffc107');
                  },
                  borderColor: function(context) {
                    const value = context.dataset.data[context.dataIndex];
                    return value < 0 ? '#dc3545' : (value > 0 ? '#28a745' : '#ffc107');
                  },
                  borderWidth: 1
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    ticks: {
                      callback: function(value) {
                        return '$' + value.toLocaleString();
                      }
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  },
                  title: {
                    display: true,
                    text: 'Cost Analysis Over Time',
                    font: {
                      size: 16
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return window.formatCurrency(context.parsed.y);
                      }
                    }
                  }
                }
              }
            });
            
            console.log('Waterfall chart initialized with placeholder data');
          };
        }
        
        // Add resource utilization chart initialization if it doesn't exist
        if (!window.chartBuilder.initResourceUtilizationChart) {
          window.chartBuilder.initResourceUtilizationChart = function() {
            const ctx = document.getElementById('resource-utilization-chart');
            if (!ctx) {
              console.warn('Resource utilization chart canvas not found');
              return;
            }
            
            this.charts.resourceUtilization = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: ['Network Admin', 'Security Admin', 'System Admin', 'Help Desk'],
                datasets: [
                  {
                    label: 'Current Solution (FTE)',
                    data: [0.5, 0.4, 0.3, 0.1],
                    backgroundColor: this.chartColors.neutral,
                    borderColor: this.chartColors.neutral,
                    borderWidth: 1
                  },
                  {
                    label: 'Portnox Cloud (FTE)',
                    data: [0.2, 0.15, 0.05, 0.05],
                    backgroundColor: this.chartColors.portnox,
                    borderColor: this.chartColors.portnox,
                    borderWidth: 1
                  }
                ]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Full-Time Equivalent (FTE)'
                    }
                  }
                },
                plugins: {
                  title: {
                    display: true,
                    text: 'IT Resource Utilization',
                    font: {
                      size: 16
                    }
                  }
                }
              }
            });
            
            console.log('Resource utilization chart initialized with placeholder data');
          };
        }
        
        // Re-run chart initialization
        window.chartBuilder.initCharts();
        console.log('All charts have been initialized or fixed');
      }
    }
    
    // Helper function to ensure chart canvas exists
    function ensureChartCanvas(chartId, chartTitle) {
      if (!document.getElementById(chartId)) {
        console.log(`Creating missing chart canvas: ${chartId}`);
        
        // Find container or create one
        let container = document.querySelector(`.chart-container:has(#${chartId})`);
        
        if (!container) {
          // Find a parent container to append to
          const possibleParents = [
            document.querySelector(`.result-card:has(.chart-title:contains('${chartTitle}')) .chart-container`),
            document.querySelector(`.result-card .chart-container`),
            document.querySelector('.results-grid'),
            document.querySelector('.tab-content')
          ];
          
          const parent = possibleParents.find(el => el !== null);
          
          if (!parent) {
            console.warn(`Could not find a parent for chart: ${chartId}`);
            return;
          }
          
          // Create a new result card if needed
          if (!parent.classList.contains('chart-container')) {
            const card = document.createElement('div');
            card.className = 'result-card';
            
            const titleElement = document.createElement('h3');
            titleElement.className = 'chart-title';
            titleElement.textContent = chartTitle;
            
            container = document.createElement('div');
            container.className = 'chart-container';
            
            card.appendChild(titleElement);
            card.appendChild(container);
            
            parent.appendChild(card);
          } else {
            container = parent;
          }
        }
        
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.id = chartId;
        container.appendChild(canvas);
      }
    }
  });
})();
