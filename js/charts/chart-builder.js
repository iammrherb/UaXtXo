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
    const ctx = document.getElementById('tco-comparison-chart').getContext('2d');
    if (!ctx) return;
    
    this.charts.tcoComparison = new Chart(ctx, {
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
    
    const vendors = Object.keys(vendorData);
    const labels = vendors.map(vendor => vendorData[vendor].name);
    const initialCostsData = vendors.map(vendor => {
      return results[vendor].totalInitialCosts + (results[vendor].migrationCost || 0);
    });
    const ongoingCostsData = vendors.map(vendor => {
      return results[vendor].annualCosts * results.yearsToProject;
    });
    
    this.charts.tcoComparison.data.labels = labels;
    this.charts.tcoComparison.data.datasets[0].data = initialCostsData;
    this.charts.tcoComparison.data.datasets[1].data = ongoingCostsData;
    this.charts.tcoComparison.update();
  }

  initCumulativeCostChart() {
    const ctx = document.getElementById('cumulative-cost-chart').getContext('2d');
    if (!ctx) return;
    
    this.charts.cumulativeCost = new Chart(ctx, {
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
    
    const vendors = Object.keys(vendorData);
    const yearsToProject = results.yearsToProject;
    
    // Generate labels
    const labels = ['Initial'];
    for (let i = 1; i <= yearsToProject; i++) {
      labels.push(`Year ${i}`);
    }
    
    // Create datasets for each vendor
    const datasets = [];
    
    vendors.forEach(vendor => {
      const vendorColor = this.chartColors[vendor];
      const data = [];
      
      // Initial costs
      const initialCost = results[vendor].totalInitialCosts + (results[vendor].migrationCost || 0);
      data.push(initialCost);
      
      // Cumulative costs for each year
      for (let i = 1; i <= yearsToProject; i++) {
        data.push(initialCost + (results[vendor].annualCosts * i));
      }
      
      datasets.push({
        label: vendorData[vendor].name,
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
    const currentCtx = document.getElementById('current-breakdown-chart').getContext('2d');
    const altCtx = document.getElementById('alternative-breakdown-chart').getContext('2d');
    
    if (!currentCtx || !altCtx) return;
    
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
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${formatCurrency(value)} (${percentage}%)`;
            }
          }
        }
      }
    };
    
    // Create placeholder charts, to be updated with actual data
    this.charts.currentBreakdown = new Chart(currentCtx, {
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
    
    this.charts.altBreakdown = new Chart(altCtx, {
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
    if (!this.charts.currentBreakdown || !this.charts.altBreakdown || !window.calculator.results) return;
    
    const results = window.calculator.results;
    const yearsToProject = results.yearsToProject;
    
    const createBreakdownData = (vendor) => {
      const vendorResults = results[vendor];
      if (!vendorResults) return [0, 0, 0, 0, 0, 0, 0, 0];
      
      const orgSize = document.getElementById('organization-size').value;
      const vendorData = window.vendorData[vendor][orgSize];
      const complexityMultiplier = calculateComplexityMultiplier(vendor, window.vendorData[vendor].cloudBased);
      
      // Create breakdown data
      const categories = [
        vendorResults.costBreakdown.hardware,
        vendorResults.costBreakdown.networkRedesign,
        vendorResults.costBreakdown.implementation,
        vendorResults.costBreakdown.training,
        vendorResults.costBreakdown.maintenance,
        vendorResults.costBreakdown.licensing,
        vendorResults.costBreakdown.personnel,
        vendorResults.costBreakdown.downtime
      ];
      
      return categories;
    };
    
    // Update charts
    this.charts.currentBreakdown.data.datasets[0].data = createBreakdownData(currentVendor);
    this.charts.currentBreakdown.update();
    
    this.charts.altBreakdown.data.datasets[0].data = createBreakdownData(altVendor);
    this.charts.altBreakdown.update();
  }
}
