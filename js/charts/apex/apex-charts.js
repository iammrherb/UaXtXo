/**
 * ApexCharts Integration for Portnox Total Cost Analyzer
 * Provides chart rendering utilities for all views
 */

const ApexChartsManager = {
  init: function() {
    console.log("Initializing ApexCharts Manager");
    this.setupDefaultConfig();
    this.renderInitialCharts();
  },
  
  setupDefaultConfig: function() {
    // Set global ApexCharts options
    if (window.ApexCharts) {
      window.ApexCharts.defaultOptions = {
        fontFamily: 'Nunito, sans-serif',
        foreColor: '#333',
        tooltip: {
          enabled: true,
          theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light'
        },
        chart: {
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          },
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false
            }
          }
        }
      };
    }
  },
  
  renderInitialCharts: function() {
    // Executive summary charts
    this.renderTcoComparisonChart();
    this.renderCumulativeCostChart();
    
    // Ensure charts are updated when calculate button is clicked
    const calculateBtns = document.querySelectorAll('#calculate-btn, #calculate-btn-header');
    calculateBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          this.updateAllCharts();
        }, 1000); // Allow time for calculations to complete
      });
    });
  },
  
  renderTcoComparisonChart: function() {
    const chartElement = document.getElementById('tco-comparison-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Use available vendor data or fallback
    const vendorData = window.VENDORS || {
      'portnox': { name: 'Portnox Cloud', tco: 245000 },
      'cisco': { name: 'Cisco ISE', tco: 520000 },
      'aruba': { name: 'Aruba', tco: 480000 }
    };
    
    // Extract data for chart
    const vendors = Object.keys(vendorData).slice(0, 5);
    const vendorNames = vendors.map(id => vendorData[id].name);
    const tcoValues = vendors.map(id => vendorData[id].tco);
    
    const options = {
      series: [{
        name: '3-Year TCO',
        data: tcoValues
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 8
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return '$' + Math.round(val).toLocaleString();
        }
      },
      xaxis: {
        categories: vendorNames
      },
      yaxis: {
        title: {
          text: 'Total Cost ($)'
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val).toLocaleString();
          }
        }
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12', '#2ecc71']
    };
    
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  },
  
  renderCumulativeCostChart: function() {
    const chartElement = document.getElementById('cumulative-cost-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    const years = ['Initial', 'Year 1', 'Year 2', 'Year 3'];
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          data: [20000, 100000, 170000, 245000]
        },
        {
          name: 'Cisco ISE',
          data: [215000, 350000, 450000, 520000]
        },
        {
          name: 'Aruba ClearPass',
          data: [175000, 280000, 380000, 480000]
        }
      ],
      chart: {
        height: 350,
        type: 'line'
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      xaxis: {
        categories: years
      },
      yaxis: {
        title: {
          text: 'Cumulative Cost ($)'
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val).toLocaleString();
          }
        }
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22']
    };
    
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  },
  
  updateAllCharts: function() {
    console.log("Updating all charts with new data");
    
    // Re-render all charts with current data
    this.renderTcoComparisonChart();
    this.renderCumulativeCostChart();
    
    // Update security charts if they exist
    if (window.SecurityCharts) {
      window.SecurityCharts.init();
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  if (window.ApexCharts) {
    ApexChartsManager.init();
  } else {
    console.error("ApexCharts library not loaded");
  }
});

// Make ApexChartsManager available globally
window.ApexChartsManager = ApexChartsManager;
