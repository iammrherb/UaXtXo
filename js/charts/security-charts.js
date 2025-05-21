/**
 * Security Charts for Portnox Total Cost Analyzer
 * Renders security-specific visualizations
 */

const SecurityCharts = {
  renderNistFrameworkChart: function(containerId, data) {
    if (!window.ApexCharts) {
      console.error("ApexCharts library not available");
      return;
    }
    
    const element = document.getElementById(containerId);
    if (!element) {
      console.error(`Container element ${containerId} not found`);
      return;
    }
    
    // Use default data if none provided
    if (!data) {
      data = {
        portnox: {
          identify: 95,
          protect: 90,
          detect: 95,
          respond: 92,
          recover: 88
        },
        competitors: {
          identify: 75,
          protect: 72,
          detect: 70,
          respond: 68,
          recover: 65
        }
      };
    }
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          data: [
            data.portnox.identify,
            data.portnox.protect,
            data.portnox.detect,
            data.portnox.respond,
            data.portnox.recover
          ]
        },
        {
          name: 'Industry Average',
          data: [
            data.competitors.identify,
            data.competitors.protect,
            data.competitors.detect,
            data.competitors.respond,
            data.competitors.recover
          ]
        }
      ],
      chart: {
        type: 'radar',
        height: 350,
        fontFamily: '"Nunito", sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        }
      },
      colors: ['#1a5a96', '#e74c3c'],
      stroke: {
        width: 2
      },
      fill: {
        opacity: 0.2
      },
      markers: {
        size: 4,
        hover: {
          size: 6
        }
      },
      title: {
        text: 'NIST Cybersecurity Framework Coverage',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
      },
      xaxis: {
        categories: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        max: 100,
        min: 0,
        show: false
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
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
  
  renderBreachImpactChart: function(containerId, data) {
    if (!window.ApexCharts) {
      console.error("ApexCharts library not available");
      return;
    }
    
    const element = document.getElementById(containerId);
    if (!element) {
      console.error(`Container element ${containerId} not found`);
      return;
    }
    
    // Use default data if none provided
    if (!data) {
      data = {
        categories: ['No NAC Solution', 'Traditional NAC', 'Portnox Cloud'],
        avgBreachCost: [4350000, 1525000, 650000],
        avgResponseTime: [280, 72, 15]
      };
    }
    
    const options = {
      series: [
        {
          name: 'Average Data Breach Cost',
          type: 'column',
          data: data.avgBreachCost
        },
        {
          name: 'Avg. Response Time (Hours)',
          type: 'line',
          data: data.avgResponseTime
        }
      ],
      chart: {
        height: 350,
        type: 'line',
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
      stroke: {
        width: [0, 4],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          borderRadius: 5
        }
      },
      fill: {
        opacity: [0.85, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 6
      },
      xaxis: {
        categories: data.categories,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: [
        {
          title: {
            text: 'Breach Cost ($)',
            style: {
              fontSize: '14px',
              fontWeight: 500
            }
          },
          labels: {
            formatter: function(val) {
              return '$' + Math.round(val / 1000000) + 'M';
            }
          }
        },
        {
          opposite: true,
          title: {
            text: 'Response Time (Hours)',
            style: {
              fontSize: '14px',
              fontWeight: 500
            }
          },
          labels: {
            formatter: function(val) {
              return Math.round(val) + ' hrs';
            }
          }
        }
      ],
      colors: ['#e74c3c', '#1a5a96'],
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      },
      annotations: {
        points: [
          {
            x: 'Portnox Cloud',
            y: 650000,
            marker: {
              size: 6,
              fillColor: '#27ae60',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'Lowest Breach Cost',
              borderColor: '#27ae60',
              style: {
                background: '#27ae60',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600
              },
              offsetY: -30
            }
          },
          {
            x: 'Portnox Cloud',
            y: 15,
            seriesIndex: 1,
            marker: {
              size: 6,
              fillColor: '#27ae60',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'Fastest Response',
              borderColor: '#27ae60',
              style: {
                background: '#27ae60',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600
              },
              offsetY: 15
            }
          }
        ]
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: [{
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return "$" + y.toLocaleString();
            }
            return y;
          }
        }, {
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " hours";
            }
            return y;
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
  
  initializeCharts: function() {
    this.renderNistFrameworkChart('nist-framework-chart');
    this.renderBreachImpactChart('breach-impact-chart');
  }
};

// Make it globally available
window.SecurityCharts = SecurityCharts;
