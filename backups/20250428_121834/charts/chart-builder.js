/**
 * Chart Builder for creating and updating charts
 */

class ChartBuilder {
  constructor() {
    this.charts = {};
    this.chartColors = {
      cisco: '#049fd9',      // Cisco blue
      aruba: '#ff8300',      // Aruba orange
      forescout: '#005daa',  // Forescout blue
      nps: '#00a4ef',        // Microsoft blue
      portnox: '#2bd25b'     // Green
    };
  }

  initCharts() {
    this.initTCOComparisonChart();
    this.initCumulativeCostChart();
    this.initBreakdownCharts('cisco', 'portnox');
  }

  initTCOComparisonChart() {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx) return;
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) return;
    
    this.charts.tcoComparison = new Chart(ctxCanvas, {
      type: 'bar',
      data: {
        labels: ['Cisco ISE', 'Aruba ClearPass', 'Forescout', 'Microsoft NPS', 'Portnox Cloud'],
        datasets: [
          {
            label: 'Initial Costs',
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Ongoing Costs',
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
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
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(context.parsed.y);
                }
                return label;
              }
            }
          }
        }
      }
    });
  }

  updateTCOComparisonChart(results) {
    if (!this.charts.tcoComparison || !results) return;
    
    // Safely get vendors
    const vendors = Object.keys(window.vendorData || {});
    if (!vendors.length) return;
    
    const labels = vendors.map(vendor => window.vendorData[vendor].name);
    const initialCostsData = vendors.map(vendor => {
      return results[vendor] ? results[vendor].totalInitialCosts + (results[vendor].migrationCost || 0) : 0;
    });
    const ongoingCostsData = vendors.map(vendor => {
      return results[vendor] ? results[vendor].annualCosts * results.yearsToProject : 0;
    });
    
    this.charts.tcoComparison.data.labels = labels;
    this.charts.tcoComparison.data.datasets[0].data = initialCostsData;
    this.charts.tcoComparison.data.datasets[1].data = ongoingCostsData;
    this.charts.tcoComparison.update();
  }

  initCumulativeCostChart() {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx) return;
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) return;
    
    this.charts.cumulativeCost = new Chart(ctxCanvas, {
      type: 'line',
      data: {
        labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
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
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(context.parsed.y);
                }
                return label;
              }
            }
          }
        }
      }
    });
  }

  updateCumulativeCostChart(results) {
    if (!this.charts.cumulativeCost || !results) return;
    
    // Safely get vendors
    const vendors = Object.keys(window.vendorData || {});
    if (!vendors.length) return;
    
    const yearsToProject = results.yearsToProject || 3;
    
    // Generate labels
    const labels = ['Initial'];
    for (let i = 1; i <= yearsToProject; i++) {
      labels.push(`Year ${i}`);
    }
    
    // Create datasets for each vendor
    const datasets = [];
    
    vendors.forEach(vendor => {
      if (!results[vendor]) return;
      
      const vendorColor = this.chartColors[vendor] || '#888888';
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
        borderWidth: vendor === 'portnox' || vendor === window.uiController.activeVendor ? 3 : 2,
        tension: 0.1
      });
    });
    
    this.charts.cumulativeCost.data.labels = labels;
    this.charts.cumulativeCost.data.datasets = datasets;
    this.charts.cumulativeCost.update();
  }

  initBreakdownCharts(currentVendor, altVendor) {
    const currentCtx = document.getElementById('current-breakdown-chart');
    const altCtx = document.getElementById('alternative-breakdown-chart');
    
    if (!currentCtx || !altCtx) return;
    
    const currentCtxCanvas = currentCtx.getContext('2d');
    const altCtxCanvas = altCtx.getContext('2d');
    
    if (!currentCtxCanvas || !altCtxCanvas) return;
    
    const pieOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
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
        }
      }
    };
    
    // Create placeholder charts, to be updated with actual data
    this.charts.currentBreakdown = new Chart(currentCtxCanvas, {
      type: 'pie',
      data: {
        labels: ['Hardware', 'Network Redesign', 'Implementation', 'Training', 'Maintenance', 'Licensing', 'Personnel', 'Downtime'],
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: [
            '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
            '#8884d8', '#82ca9d', '#ffc658', '#ff8042'
          ]
        }]
      },
      options: pieOptions
    });
    
    this.charts.altBreakdown = new Chart(altCtxCanvas, {
      type: 'pie',
      data: {
        labels: ['Hardware', 'Network Redesign', 'Implementation', 'Training', 'Maintenance', 'Licensing', 'Personnel', 'Downtime'],
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: [
            '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
            '#8884d8', '#82ca9d', '#ffc658', '#ff8042'
          ]
        }]
      },
      options: pieOptions
    });
  }

  updateBreakdownCharts(currentVendor, altVendor) {
    if (!this.charts.currentBreakdown || !this.charts.altBreakdown || !window.calculator || !window.calculator.results) return;
    
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
}
