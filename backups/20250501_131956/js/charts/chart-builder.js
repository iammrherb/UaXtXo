/**
 * Enhanced Chart Builder for creating and updating charts
 * Includes better mobile responsiveness and accessibility
 */

class ChartBuilder {
  constructor() {
    this.charts = {};
    this.chartDefaults = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 15,
            usePointStyle: true,
            pointStyle: 'square'
          }
        },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
          padding: 10,
          bodySpacing: 5,
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          },
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += window.formatCurrency(context.parsed.y);
              }
              return label;
            }
          }
        }
      }
    };
    
    this.chartColors = {
      cisco: '#049fd9',      // Cisco blue
      aruba: '#ff8300',      // Aruba orange
      forescout: '#005daa',  // Forescout blue
      nps: '#00a4ef',        // Microsoft blue
      portnox: '#2bd25b',    // Portnox green
      neutral: '#888888'     // Neutral gray
    };
    
    this.breakdownColors = [
      '#1B67B2', // Primary blue
      '#4D44AB', // Purple
      '#568C1C', // Green
      '#C77F1A', // Orange
      '#B54369', // Pink
      '#1CA43F', // Darker green
      '#5E5E5E', // Dark gray
      '#8884d8'  // Lavender
    ];
    
    this.isMobile = window.innerWidth < 768;
    
    // Listen for window resize to update mobile state
    window.addEventListener('resize', () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth < 768;
      
      // If mobile state changed, update charts
      if (wasMobile !== this.isMobile) {
        this.updateAllCharts();
      }
    });
  }
  
  updateAllCharts() {
    if (this.charts.tcoComparison) {
      this.charts.tcoComparison.update();
    }
    
    if (this.charts.cumulativeCost) {
      this.charts.cumulativeCost.update();
    }
    
    if (this.charts.currentBreakdown) {
      this.charts.currentBreakdown.update();
    }
    
    if (this.charts.altBreakdown) {
      this.charts.altBreakdown.update();
    }
  }
  
  initCharts() {
    this.initTCOComparisonChart();
    this.initCumulativeCostChart();
    this.initBreakdownCharts('cisco', 'portnox');
  }
  
  initTCOComparisonChart() {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx) {
      console.warn('TCO Comparison chart canvas element not found');
      return;
    }
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) {
      console.warn('Could not get 2D context for TCO Comparison chart');
      return;
    }
    
    // Define chart configuration
    const chartConfig = {
      type: 'bar',
      data: {
        labels: ['Cisco ISE', 'Aruba ClearPass', 'Forescout', 'Microsoft NPS', 'Portnox Cloud'],
        datasets: [
          {
            label: 'Initial Costs',
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'Migration Costs',
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(255, 159, 64, 0.7)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'Ongoing Costs',
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          }
        ]
      },
      options: {
        ...this.chartDefaults,
        indexAxis: this.isMobile ? 'y' : 'x', // Horizontal bars on mobile
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false
            },
            ticks: {
              autoSkip: false,
              maxRotation: this.isMobile ? 0 : 45,
              minRotation: 0
            },
            title: {
              display: !this.isMobile,
              text: 'Vendors'
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            },
            title: {
              display: true,
              text: 'Cost ($)'
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Total Cost of Ownership Comparison',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          datalabels: {
            display: false
          }
        }
      }
    };
    
    // Create the chart
    this.charts.tcoComparison = new Chart(ctxCanvas, chartConfig);
  }
  
  updateTCOComparisonChart(results) {
    if (!this.charts.tcoComparison || !results) {
      console.warn('TCO Comparison chart or results not available');
      return;
    }
    
    // Safely get vendors
    const vendors = Object.keys(window.vendorData || {});
    if (!vendors.length) {
      console.warn('No vendor data available');
      return;
    }
    
    const labels = vendors.map(vendor => window.vendorData[vendor].name);
    const initialCostsData = vendors.map(vendor => {
      return results[vendor] ? results[vendor].totalInitialCosts : 0;
    });
    const migrationCostsData = vendors.map(vendor => {
      return results[vendor] ? results[vendor].migrationCost || 0 : 0;
    });
    const ongoingCostsData = vendors.map(vendor => {
      return results[vendor] ? results[vendor].annualCosts * results.yearsToProject : 0;
    });
    
    // Update chart data
    this.charts.tcoComparison.data.labels = labels;
    this.charts.tcoComparison.data.datasets[0].data = initialCostsData;
    this.charts.tcoComparison.data.datasets[1].data = migrationCostsData;
    this.charts.tcoComparison.data.datasets[2].data = ongoingCostsData;
    
    // Update title to include years
    const chartTitle = `Total Cost of Ownership Comparison (${results.yearsToProject} Years)`;
    this.charts.tcoComparison.options.plugins.title.text = chartTitle;
    
    // Update indexAxis based on mobile state
    this.charts.tcoComparison.options.indexAxis = this.isMobile ? 'y' : 'x';
    
    // Update chart
    this.charts.tcoComparison.update();
  }
  
  initCumulativeCostChart() {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx) {
      console.warn('Cumulative Cost chart canvas element not found');
      return;
    }
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) {
      console.warn('Could not get 2D context for Cumulative Cost chart');
      return;
    }
    
    // Define chart configuration
    const chartConfig = {
      type: 'line',
      data: {
        labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        elements: {
          line: {
            tension: 0.1,
            borderWidth: 2
          },
          point: {
            radius: 3,
            hoverRadius: 6
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            title: {
              display: !this.isMobile,
              text: 'Timeline'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            },
            title: {
              display: true,
              text: 'Cumulative Cost ($)'
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Cumulative Costs Over Time',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    };
    
    // Create the chart
    this.charts.cumulativeCost = new Chart(ctxCanvas, chartConfig);
  }
  
  updateCumulativeCostChart(results) {
    if (!this.charts.cumulativeCost || !results) {
      console.warn('Cumulative Cost chart or results not available');
      return;
    }
    
    // Safely get vendors
    const vendors = Object.keys(window.vendorData || {});
    if (!vendors.length) {
      console.warn('No vendor data available');
      return;
    }
    
    const yearsToProject = results.yearsToProject || 3;
    const currentVendor = window.uiController ? window.uiController.activeVendor : null;
    
    // Generate labels
    const labels = ['Initial'];
    for (let i = 1; i <= yearsToProject; i++) {
      labels.push(`Year ${i}`);
    }
    
    // Create datasets for each vendor
    const datasets = [];
    
    vendors.forEach(vendor => {
      if (!results[vendor]) return;
      
      const vendorColor = this.chartColors[vendor] || this.chartColors.neutral;
      const isCurrentVendor = vendor === currentVendor;
      const isPortnox = vendor === 'portnox';
      const data = [];
      
      // Initial costs
      const initialCost = results[vendor].totalInitialCosts + (results[vendor].migrationCost || 0);
      data.push(initialCost);
      
      // Cumulative costs for each year
      for (let i = 1; i <= yearsToProject; i++) {
        data.push(initialCost + (results[vendor].annualCosts * i));
      }
      
      datasets.push({
        label: window.vendorData[vendor].name,
        data: data,
        backgroundColor: vendorColor,
        borderColor: vendorColor,
        borderWidth: (isCurrentVendor || isPortnox) ? 3 : 2,
        pointRadius: (isCurrentVendor || isPortnox) ? 4 : 3,
        pointHoverRadius: 7,
        tension: 0.1,
        // Dashed line for anything except current vendor and Portnox
        borderDash: (!isCurrentVendor && !isPortnox) ? [5, 5] : []
      });
    });
    
    // Update chart data
    this.charts.cumulativeCost.data.labels = labels;
    this.charts.cumulativeCost.data.datasets = datasets;
    
    // Update chart
    this.charts.cumulativeCost.update();
  }
  
  initBreakdownCharts(currentVendor, altVendor) {
    const currentCtx = document.getElementById('current-breakdown-chart');
    const altCtx = document.getElementById('alternative-breakdown-chart');
    
    if (!currentCtx || !altCtx) {
      console.warn('Breakdown chart canvas elements not found');
      return;
    }
    
    const currentCtxCanvas = currentCtx.getContext('2d');
    const altCtxCanvas = altCtx.getContext('2d');
    
    if (!currentCtxCanvas || !altCtxCanvas) {
      console.warn('Could not get 2D context for breakdown charts');
      return;
    }
    
    // Common pie chart options
    const pieOptions = {
      ...this.chartDefaults,
      cutout: '35%', // Make it a doughnut chart for better visibility
      plugins: {
        ...this.chartDefaults.plugins,
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
              return `${label}: ${window.formatCurrency(value)} (${percentage}%)`;
            }
          }
        },
        datalabels: {
          display: context => {
            // Only show labels for segments that are at least 5% of the total
            const data = context.dataset.data;
            const total = data.reduce((a, b) => a + b, 0);
            return context.dataIndex >= 0 && (data[context.dataIndex] / total) >= 0.05;
          },
          formatter: (value, context) => {
            const data = context.dataset.data;
            const total = data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(0) : '0';
            return percentage + '%';
          },
          color: '#fff',
          font: {
            weight: 'bold'
          }
        }
      }
    };
    
    // Labels common to both charts
    const labels = [
      'Hardware', 
      'Network Redesign', 
      'Implementation', 
      'Training', 
      'Maintenance', 
      'Licensing', 
      'Personnel', 
      'Downtime'
    ];
    
    // Create placeholder charts, to be updated with actual data
    this.charts.currentBreakdown = new Chart(currentCtxCanvas, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: this.breakdownColors,
          borderWidth: 1,
          borderColor: '#ffffff'
        }]
      },
      options: {
        ...pieOptions,
        plugins: {
          ...pieOptions.plugins,
          title: {
            display: true,
            text: window.vendorData[currentVendor]?.name || 'Current Solution',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
    
    this.charts.altBreakdown = new Chart(altCtxCanvas, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: this.breakdownColors,
          borderWidth: 1,
          borderColor: '#ffffff'
        }]
      },
      options: {
        ...pieOptions,
        plugins: {
          ...pieOptions.plugins,
          title: {
            display: true,
            text: window.vendorData[altVendor]?.name || 'Alternative Solution',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }
  
  updateBreakdownCharts(currentVendor, altVendor) {
    if (!this.charts.currentBreakdown || !this.charts.altBreakdown || !window.calculator || !window.calculator.results) {
      console.warn('Breakdown charts or results not available');
      return;
    }
    
    const results = window.calculator.results;
    
    const createBreakdownData = (vendor) => {
      // Check if vendor exists in results
      const vendorResults = results[vendor];
      if (!vendorResults || !vendorResults.costBreakdown) {
        console.warn(`No cost breakdown data found for vendor: ${vendor}`);
        return [0, 0, 0, 0, 0, 0, 0, 0];
      }
      
      // Create breakdown data from costBreakdown object
      return [
        vendorResults.costBreakdown.hardware || 0,
        vendorResults.costBreakdown.networkRedesign || 0,
        vendorResults.costBreakdown.implementation || 0,
        vendorResults.costBreakdown.training || 0,
        vendorResults.costBreakdown.maintenance || 0,
        vendorResults.costBreakdown.licensing || 0,
        vendorResults.costBreakdown.personnel || 0,
        vendorResults.costBreakdown.downtime || 0
      ];
    };
    
    // Update chart titles
    this.charts.currentBreakdown.options.plugins.title.text = window.vendorData[currentVendor]?.name || 'Current Solution';
    this.charts.altBreakdown.options.plugins.title.text = window.vendorData[altVendor]?.name || 'Alternative Solution';
    
    // Update charts
    try {
      this.charts.currentBreakdown.data.datasets[0].data = createBreakdownData(currentVendor);
      this.charts.currentBreakdown.update();
    } catch (err) {
      console.error("Error updating current breakdown chart:", err);
    }
    
    try {
      this.charts.altBreakdown.data.datasets[0].data = createBreakdownData(altVendor);
      this.charts.altBreakdown.update();
    } catch (err) {
      console.error("Error updating alternative breakdown chart:", err);
    }
  }
  
  // Additional method to create implementation timeline chart
  createImplementationChart(containerId, currentVendor, alternativeVendor) {
    const ctx = document.getElementById(containerId);
    if (!ctx) {
      console.warn(`Implementation chart canvas element not found: ${containerId}`);
      return null;
    }
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) {
      console.warn(`Could not get 2D context for implementation chart: ${containerId}`);
      return null;
    }
    
    const results = window.calculator?.results;
    if (!results || !results.implementationResults) {
      console.warn('Implementation results not available');
      return null;
    }
    
    const currentImplementation = results.implementationResults[currentVendor];
    const altImplementation = results.implementationResults[alternativeVendor];
    
    if (!currentImplementation || !altImplementation) {
      console.warn('Implementation data not available for one or both vendors');
      return null;
    }
    
    // Get implementation phases
    const phases = [];
    for (const phase in currentImplementation.phases) {
      if (!phases.includes(phase)) {
        phases.push(phase);
      }
    }
    
    for (const phase in altImplementation.phases) {
      if (!phases.includes(phase)) {
        phases.push(phase);
      }
    }
    
    // Prepare data
    const currentData = phases.map(phase => currentImplementation.phases[phase] || 0);
    const altData = phases.map(phase => altImplementation.phases[phase] || 0);
    
    // Format phase labels for display
    const formattedPhases = phases.map(phase => {
      // Convert camelCase to Title Case
      return phase
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
    });
    
    // Create chart
    const chart = new Chart(ctxCanvas, {
      type: 'bar',
      data: {
        labels: formattedPhases,
        datasets: [
          {
            label: window.vendorData[currentVendor]?.name || 'Current Solution',
            data: currentData,
            backgroundColor: this.chartColors[currentVendor] || this.chartColors.neutral,
            borderColor: this.chartColors[currentVendor] || this.chartColors.neutral,
            borderWidth: 1
          },
          {
            label: window.vendorData[alternativeVendor]?.name || 'Alternative Solution',
            data: altData,
            backgroundColor: this.chartColors[alternativeVendor] || this.chartColors.neutral,
            borderColor: this.chartColors[alternativeVendor] || this.chartColors.neutral,
            borderWidth: 1
          }
        ]
      },
      options: {
        ...this.chartDefaults,
        indexAxis: this.isMobile ? 'y' : 'x',
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Days'
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Implementation Timeline Comparison',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y.toFixed(1) + ' days';
                }
                return label;
              }
            }
          }
        }
      }
    });
    
    return chart;
  }
}
