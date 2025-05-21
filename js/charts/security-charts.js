/**
 * Security Charts for Portnox Total Cost Analyzer
 * Renders security-specific visualizations
 */

const SecurityCharts = {
  init: function() {
    console.log("Initializing security charts module");
    this.renderNistFrameworkChart();
    this.renderBreachImpactChart();
    this.renderSecurityFrameworksChart();
    this.renderThreatModelChart();
    this.renderIndustryBreachChart();
  },
  
  renderNistFrameworkChart: function() {
    const chartElement = document.getElementById('nist-framework-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          data: [95, 92, 96, 94, 90]
        },
        {
          name: 'Industry Average',
          data: [70, 65, 72, 68, 62]
        }
      ],
      chart: {
        type: 'radar',
        height: 350,
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        }
      },
      stroke: {
        width: 2
      },
      fill: {
        opacity: 0.1
      },
      markers: {
        size: 4
      },
      xaxis: {
        categories: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover']
      },
      colors: [ChartConfig.colors.primary, ChartConfig.colors.warning],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      }
    };
    
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  },
  
  renderBreachImpactChart: function() {
    const chartElement = document.getElementById('breach-impact-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    const options = {
      series: [
        {
          name: 'Average Breach Cost',
          type: 'column',
          data: [4350000, 1525000, 650000]
        },
        {
          name: 'Response Time (Hours)',
          type: 'line',
          data: [280, 72, 5]
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: true
        }
      },
      stroke: {
        width: [0, 4]
      },
      xaxis: {
        categories: ['No NAC', 'Traditional NAC', 'Portnox Cloud']
      },
      yaxis: [
        {
          title: {
            text: 'Breach Cost ($)'
          },
          labels: {
            formatter: function(val) {
              return '$' + Math.round(val/1000000) + 'M';
            }
          }
        },
        {
          opposite: true,
          title: {
            text: 'Response Time (Hours)'
          }
        }
      ],
      colors: [ChartConfig.colors.danger, ChartConfig.colors.primary],
      dataLabels: {
        enabled: false
      }
    };
    
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  },
  
  renderSecurityFrameworksChart: function() {
    const chartElement = document.getElementById('security-frameworks-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          data: [95, 92, 94, 90, 93, 96, 95, 94]
        },
        {
          name: 'Industry Average',
          data: [72, 68, 70, 65, 69, 58, 72, 62]
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['HIPAA', 'PCI DSS', 'NIST CSF', 'GDPR', 'ISO 27001', 'CMMC', 'SOX', 'GLBA']
      },
      yaxis: {
        title: {
          text: 'Coverage (%)'
        }
      },
      colors: [ChartConfig.colors.primary, ChartConfig.colors.warning],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      }
    };
    
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  },
  
  renderThreatModelChart: function() {
    const chartElement = document.getElementById('threat-model-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    const options = {
      series: [
        {
          name: 'With Portnox',
          data: [15, 10, 12, 8, 5, 7]
        },
        {
          name: 'Without NAC',
          data: [85, 75, 90, 65, 60, 70]
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0
            }
          }
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: ['Unauthorized Access', 'Malware Propagation', 'Data Exfiltration', 'Lateral Movement', 'Shadow IT', 'Insider Threats'],
        labels: {
          formatter: function (val) {
            return val + '%';
          }
        }
      },
      yaxis: {
        title: {
          text: 'Risk Level'
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + '%';
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      },
      colors: [ChartConfig.colors.primary, ChartConfig.colors.danger]
    };
    
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  },
  
  renderIndustryBreachChart: function() {
    const chartElement = document.getElementById('industry-breach-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    const options = {
      series: [{
        name: 'Average Breach Cost',
        data: [9230000, 5970000, 3280000, 4740000, 8750000, 3580000, 4650000, 5850000]
      }],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          distributed: true,
          borderRadius: 4
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: ['Healthcare', 'Financial', 'Retail', 'Manufacturing', 'Government', 'Education', 'Energy', 'Insurance'],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Breach Cost ($)'
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val/1000000) + 'M';
          }
        }
      },
      colors: [
        ChartConfig.colors.primary,
        ChartConfig.colors.secondary,
        ChartConfig.colors.highlight,
        ChartConfig.colors.warning,
        ChartConfig.colors.danger,
        '#9b59b6',
        '#2980b9',
        '#f39c12'
      ]
    };
    
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
};

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  if (window.ApexCharts) {
    SecurityCharts.init();
  } else {
    console.error('ApexCharts library not loaded');
  }
});

// Make SecurityCharts available globally
window.SecurityCharts = SecurityCharts;
