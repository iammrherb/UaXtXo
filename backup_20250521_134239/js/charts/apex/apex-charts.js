/**
 * ApexCharts Integration for Portnox Total Cost Analyzer
 * Provides chart rendering functions for the application
 */

const ApexChartsManager = {
  renderTcoComparisonChart: function(containerId, data) {
    if (!window.ApexCharts) {
      console.error("ApexCharts library not available");
      return;
    }
    
    const element = document.getElementById(containerId);
    if (!element) {
      console.error(`Container element ${containerId} not found`);
      return;
    }
    
    // Use data from calculation if available, otherwise use demo data
    if (!data) {
      data = this.getDemoData();
    }
    
    // Extract data for chart
    const vendors = Object.keys(data);
    const tcoValues = vendors.map(id => data[id].tco);
    const vendorNames = vendors.map(id => data[id].name);
    
    const options = {
      series: [{
        name: '3-Year TCO',
        data: tcoValues
      }],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: '"Nunito", sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 8,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return '$' + Math.round(val).toLocaleString();
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: vendorNames,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Total Cost ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val).toLocaleString();
          }
        }
      },
      fill: {
        opacity: 1,
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [50, 100]
        }
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60'],
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      },
      annotations: {
        points: [{
          x: vendorNames[0],
          y: tcoValues[0],
          marker: {
            size: 6,
            fillColor: '#27ae60',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Best Value',
            borderColor: '#27ae60',
            style: {
              background: '#27ae60',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };

    // Clear any existing chart
    element.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(element, options);
    chart.render();
  },
  
  renderCumulativeCostChart: function(containerId, data) {
    if (!window.ApexCharts) {
      console.error("ApexCharts library not available");
      return;
    }
    
    const element = document.getElementById(containerId);
    if (!element) {
      console.error(`Container element ${containerId} not found`);
      return;
    }
    
    // Use data from calculation if available, otherwise use demo data
    if (!data) {
      data = this.getDemoData();
    }
    
    // Sample data for cumulative costs over 3 years
    const years = ['Initial', 'Year 1', 'Year 2', 'Year 3'];
    
    // Generate cumulative costs for vendors
    const seriesData = [];
    
    // Take only first 4 vendors for clarity
    const vendors = Object.keys(data).slice(0, 4);
    
    vendors.forEach(vendorId => {
      const vendor = data[vendorId];
      
      // Calculate initial cost (implementation + hardware)
      const initialCost = vendor.implementationCost + (vendor.hardware || 0);
      
      // Calculate annual cost (subscription/maintenance + personnel)
      const annualCost = (vendor.subscription || 0) + (vendor.maintenance || 0) + vendor.personnel;
      
      // Generate cumulative costs
      const costs = [
        initialCost,
        initialCost + annualCost,
        initialCost + (annualCost * 2),
        initialCost + (annualCost * 3)
      ];
      
      seriesData.push({
        name: vendor.name,
        data: costs
      });
    });
    
    const options = {
      series: seriesData,
      chart: {
        height: 350,
        type: 'line',
        fontFamily: '"Nunito", sans-serif',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12'],
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return '$' + Math.round(val / 1000) + 'K';
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false
          }
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      markers: {
        size: 6,
        hover: {
          size: 8
        }
      },
      xaxis: {
        categories: years,
        title: {
          text: 'Timeline',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      },
      yaxis: {
        title: {
          text: 'Cumulative Cost ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val).toLocaleString();
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      }
    };
    
    // Clear any existing chart
    element.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(element, options);
    chart.render();
  },
  
  getDemoData: function() {
    // This is only used if real vendor data is not available
    return {
      'portnox': {
        name: 'Portnox Cloud',
        tco: 245000,
        implementationCost: 15000,
        hardware: 0,
        maintenance: 12500,
        subscription: 172000,
        personnel: 25000
      },
      'cisco': {
        name: 'Cisco ISE',
        tco: 520000,
        implementationCost: 85000,
        hardware: 130000,
        maintenance: 98000,
        subscription: 0,
        personnel: 200000
      },
      'aruba': {
        name: 'Aruba ClearPass',
        tco: 480000,
        implementationCost: 65000,
        hardware: 110000,
        maintenance: 85000,
        subscription: 0,
        personnel: 175000
      },
      'forescout': {
        name: 'Forescout',
        tco: 430000,
        implementationCost: 75000,
        hardware: 100000,
        maintenance: 75000,
        subscription: 0,
        personnel: 150000
      }
    };
  },
  
  initializeCharts: function() {
    this.renderTcoComparisonChart('tco-comparison-chart');
    this.renderCumulativeCostChart('cumulative-cost-chart');
  }
};

// Make it globally available
window.ApexChartsManager = ApexChartsManager;
