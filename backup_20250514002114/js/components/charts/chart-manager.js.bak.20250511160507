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
    
    // Initialize chart defaults
    Chart.defaults.font.family = "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif";
    Chart.defaults.color = '#505050';
    Chart.defaults.scale.grid.color = 'rgba(0, 0, 0, 0.05)';
    
    // Register global tooltip handler for currency formatting
    Chart.register({
      id: 'currencyFormat',
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.restore();
      }
    });
    
    console.log("Chart Manager initialized");
  }
  
  // Initialize all charts on the page
  initializeCharts() {
    console.log("Initializing all charts...");
    
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
  
  // Initialize TCO comparison chart
  initializeTcoComparisonChart() {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx) {
      console.warn("Canvas element not found for TCO comparison chart");
      return;
    }
    
    this.charts.tcoComparison = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Current Solution', 'Portnox Cloud'],
        datasets: [{
          label: 'Hardware',
          backgroundColor: this.colorPalette.category10[0],
          data: [0, 0]
        }, {
          label: 'Software & Licensing',
          backgroundColor: this.colorPalette.category10[1],
          data: [0, 0]
        }, {
          label: 'Implementation',
          backgroundColor: this.colorPalette.category10[2],
          data: [0, 0]
        }, {
          label: 'Maintenance',
          backgroundColor: this.colorPalette.category10[3],
          data: [0, 0]
        }, {
          label: 'Personnel',
          backgroundColor: this.colorPalette.category10[4],
          data: [0, 0]
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
  }
  
  // Initialize cost breakdown charts
  initializeCostBreakdownCharts() {
    // Current solution breakdown
    const currentCtx = document.getElementById('current-breakdown-chart');
    if (currentCtx) {
      this.charts.currentBreakdown = new Chart(currentCtx, {
        type: 'pie',
        data: {
          labels: ['Hardware', 'Software & Licensing', 'Implementation', 'Maintenance', 'Personnel'],
          datasets: [{
            data: [0, 0, 0, 0, 0],
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
    } else {
      console.warn("Canvas element not found for current breakdown chart");
    }
    
    // Alternative solution breakdown
    const altCtx = document.getElementById('alternative-breakdown-chart');
    if (altCtx) {
      this.charts.alternativeBreakdown = new Chart(altCtx, {
        type: 'pie',
        data: {
          labels: ['Hardware', 'Software & Licensing', 'Implementation', 'Maintenance', 'Personnel'],
          datasets: [{
            data: [0, 0, 0, 0, 0],
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
    } else {
      console.warn("Canvas element not found for alternative breakdown chart");
    }
  }
  
  // Initialize cumulative cost chart
  initializeCumulativeCostChart() {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx) {
      console.warn("Canvas element not found for cumulative cost chart");
      return;
    }
    
    this.charts.cumulativeCost = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
        datasets: [{
          label: 'Current Solution',
          backgroundColor: 'rgba(46, 117, 182, 0.2)',
          borderColor: 'rgba(46, 117, 182, 1)',
          fill: true,
          data: [0, 0, 0, 0]
        }, {
          label: 'Portnox Cloud',
          backgroundColor: 'rgba(112, 173, 71, 0.2)',
          borderColor: 'rgba(112, 173, 71, 1)',
          fill: true,
          data: [0, 0, 0, 0]
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
  }
  
  // Initialize feature comparison chart
  initializeFeatureComparisonChart() {
    const ctx = document.getElementById('feature-comparison-chart');
    if (!ctx) {
      console.warn("Canvas element not found for feature comparison chart");
      return;
    }
    
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
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }, {
          label: 'Portnox Cloud',
          backgroundColor: 'rgba(112, 173, 71, 0.2)',
          borderColor: 'rgba(112, 173, 71, 1)',
          pointBackgroundColor: 'rgba(112, 173, 71, 1)',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
  }
  
  // Initialize implementation chart
  initializeImplementationChart() {
    const ctx = document.getElementById('implementation-comparison-chart');
    if (!ctx) {
      console.warn("Canvas element not found for implementation comparison chart");
      return;
    }
    
    this.charts.implementationComparison = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Planning', 'Infrastructure', 'Installation', 'Configuration', 'Testing', 'Deployment'],
        datasets: [{
          label: 'Current Solution',
          backgroundColor: 'rgba(46, 117, 182, 0.7)',
          data: [0, 0, 0, 0, 0, 0]
        }, {
          label: 'Portnox Cloud',
          backgroundColor: 'rgba(112, 173, 71, 0.7)',
          data: [0, 0, 0, 0, 0, 0]
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
  }
  
  // Initialize ROI chart
  initializeRoiChart() {
    const ctx = document.getElementById('roi-chart');
    if (!ctx) {
      console.warn("Canvas element not found for ROI chart");
      return;
    }
    
    this.charts.roi = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Month 1', 'Month 6', 'Month 12', 'Month 18', 'Month 24', 'Month 30', 'Month 36'],
        datasets: [{
          label: 'Cumulative Investment',
          borderColor: 'rgba(46, 117, 182, 1)',
          backgroundColor: 'rgba(46, 117, 182, 0.1)',
          fill: true,
          data: [0, 0, 0, 0, 0, 0, 0]
        }, {
          label: 'Cumulative Return',
          borderColor: 'rgba(112, 173, 71, 1)',
          backgroundColor: 'rgba(112, 173, 71, 0.1)',
          fill: true,
          data: [0, 0, 0, 0, 0, 0, 0]
        }, {
          label: 'Break-even',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0,
          data: [0, 0, 0, 0, 0, 0, 0]
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
  }
  
  // Initialize sensitivity chart
  initializeSensitivityChart() {
    const ctx = document.getElementById('sensitivity-chart');
    if (!ctx) {
      console.warn("Canvas element not found for sensitivity chart");
      return;
    }
    
    this.charts.sensitivity = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Current Solution TCO',
          borderColor: 'rgba(46, 117, 182, 1)',
          backgroundColor: 'rgba(46, 117, 182, 0)',
          data: []
        }, {
          label: 'Portnox Cloud TCO',
          borderColor: 'rgba(112, 173, 71, 1)',
          backgroundColor: 'rgba(112, 173, 71, 0)',
          data: []
        }, {
          label: 'Savings',
          borderColor: 'rgba(237, 125, 49, 1)',
          backgroundColor: 'rgba(237, 125, 49, 0.2)',
          fill: true,
          data: []
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Sensitivity Analysis'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                if (context.dataset.label === 'Savings') {
                  return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
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
    
    console.log("Sensitivity chart initialized");
  }
  
  // Update TCO comparison chart with real data
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
  
  // Update all other charts with similar methods...
  // Methods for updating each chart with real data would follow here
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
