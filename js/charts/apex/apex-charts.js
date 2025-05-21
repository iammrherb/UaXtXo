/**
 * ApexCharts Manager for Portnox Total Cost Analyzer
 * Provides centralized chart creation and configuration
 */

class ApexChartManager {
  constructor() {
    this.charts = {};
    this.colors = {
      primary: '#1a5a96',
      secondary: '#2ecc71',
      warning: '#f39c12',
      danger: '#e74c3c',
      info: '#3498db',
      purple: '#9b59b6',
      gray: '#95a5a6'
    };
    
    this.fontFamily = 'Nunito, sans-serif';
  }
  
  /**
   * Get common chart options
   */
  getCommonOptions() {
    return {
      chart: {
        fontFamily: this.fontFamily,
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
        },
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
        }
      }
    };
  }
  
  /**
   * Destroy chart if it exists
   */
  destroyChart(chartId) {
    if (this.charts[chartId]) {
      this.charts[chartId].destroy();
      delete this.charts[chartId];
    }
  }
  
  /**
   * Create or update a chart
   */
  createChart(element, options, chartId) {
    if (!element) return null;
    
    // Destroy existing chart if it exists
    this.destroyChart(chartId);
    
    // Create new chart
    const chart = new ApexCharts(element, options);
    chart.render();
    
    // Store chart reference
    this.charts[chartId] = chart;
    
    return chart;
  }
  
  /**
   * Create vendor scorecard chart
   */
  createVendorScorecardChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.ApexCharts) return;
    
    // Sample data for vendor scorecard
    const vendors = ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'];
    const compositeScores = [92, 67, 65, 70, 63];
    
    const options = {
      ...this.getCommonOptions(),
      series: [{
        name: 'Composite Score',
        data: compositeScores
      }],
      chart: {
        ...this.getCommonOptions().chart,
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
          barHeight: '70%',
          borderRadius: 6
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 5,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        },
        formatter: function(val) {
          return val + ' / 100';
        },
        background: {
          enabled: true,
          foreColor: '#333',
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
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: vendors,
        labels: {
          style: {
            fontSize: '12px'
          }
        },
        title: {
          text: 'Overall Score (0-100)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      },
      colors: [this.colors.primary, this.colors.secondary, this.colors.warning, this.colors.danger, this.colors.info],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + ' / 100';
          }
        }
      },
      grid: {
        borderColor: '#e7e7e7',
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      annotations: {
        points: [{
          x: 'Portnox Cloud',
          y: 92,
          marker: {
            size: 6,
            fillColor: '#2ecc71',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Best Overall',
            borderColor: '#2ecc71',
            style: {
              background: '#2ecc71',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };
    
    return this.createChart(element, options, chartId);
  }
  
  /**
   * Create TCO comparison chart
   */
  createTcoComparisonChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.ApexCharts) return;
    
    // Sample data for TCO comparison
    const vendors = ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'];
    const tcoValues = [245000, 520000, 480000, 430000, 400000];
    
    const options = {
      ...this.getCommonOptions(),
      series: [{
        name: '3-Year TCO',
        data: tcoValues
      }],
      chart: {
        ...this.getCommonOptions().chart,
        type: 'bar',
        height: 350
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
          return '$' + Math.round(val / 1000) + 'K';
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
        categories: vendors,
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
            return '$' + Math.round(val / 1000) + 'K';
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
      colors: [this.colors.primary, this.colors.danger, this.colors.warning, this.colors.secondary, this.colors.info],
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      },
      annotations: {
        points: [{
          x: 'Portnox Cloud',
          y: 245000,
          marker: {
            size: 6,
            fillColor: '#2ecc71',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Best Value',
            borderColor: '#2ecc71',
            style: {
              background: '#2ecc71',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };
    
    return this.createChart(element, options, chartId);
  }
  
  /**
   * Create security frameworks chart
   */
  createSecurityFrameworksChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.ApexCharts) return;
    
    // Sample data for security frameworks
    const frameworks = ['HIPAA', 'PCI DSS', 'NIST CSF', 'GDPR', 'ISO 27001', 'CMMC', 'SOX'];
    const portnoxCoverage = [95, 92, 94, 90, 93, 96, 91];
    const competitorAvg = [72, 68, 70, 65, 69, 58, 72];
    
    const options = {
      ...this.getCommonOptions(),
      series: [
        {
          name: 'Portnox Cloud',
          data: portnoxCoverage
        },
        {
          name: 'Industry Average',
          data: competitorAvg
        }
      ],
      chart: {
        ...this.getCommonOptions().chart,
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + '%';
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
        categories: frameworks,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Coverage (%)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      fill: {
        opacity: 1
      },
      colors: [this.colors.primary, this.colors.warning],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      }
    };
    
    return this.createChart(element, options, chartId);
  }
  
  /**
   * Create breach impact chart
   */
  createBreachImpactChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.ApexCharts) return;
    
    // Sample data for breach impact
    const categories = ['No NAC Solution', 'Traditional NAC', 'Portnox Cloud'];
    const breachCost = [4350000, 1525000, 650000];
    const responseTime = [280, 72, 15];
    
    const options = {
      ...this.getCommonOptions(),
      series: [
        {
          name: 'Avg. Breach Cost',
          type: 'column',
          data: breachCost
        },
        {
          name: 'Avg. Response Time (Hours)',
          type: 'line',
          data: responseTime
        }
      ],
      chart: {
        ...this.getCommonOptions().chart,
        height: 350,
        type: 'line'
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
        categories: categories,
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
      colors: [this.colors.danger, this.colors.primary],
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
              fillColor: '#2ecc71',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'Lowest Breach Cost',
              borderColor: '#2ecc71',
              style: {
                background: '#2ecc71',
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
              fillColor: '#2ecc71',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'Fastest Response',
              borderColor: '#2ecc71',
              style: {
                background: '#2ecc71',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600
              },
              offsetY: 15
            }
          }
        ]
      }
    };
    
    return this.createChart(element, options, chartId);
  }
  
  /**
   * Create insurance impact chart
   */
  createInsuranceImpactChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.ApexCharts) return;
    
    // Sample data for insurance impact
    const vendors = ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'];
    const premiumReduction = [25, 15, 12, 10, 8];
    
    const options = {
      ...this.getCommonOptions(),
      series: [{
        name: 'Premium Reduction',
        data: premiumReduction
      }],
      chart: {
        ...this.getCommonOptions().chart,
        type: 'bar',
        height: 350
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
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: vendors,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Premium Reduction (%)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      fill: {
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
      colors: [this.colors.primary],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      }
    };
    
    return this.createChart(element, options, chartId);
  }
  
  /**
   * Create industry breach chart
   */
  createIndustryBreachChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.ApexCharts) return;
    
    // Sample data for industry breach costs
    const industries = ['Healthcare', 'Financial', 'Retail', 'Manufacturing', 'Government', 'Education', 'Energy'];
    const breachCosts = [9230000, 5970000, 3280000, 4740000, 8750000, 3580000, 4650000];
    
    const options = {
      ...this.getCommonOptions(),
      series: [{
        name: 'Average Breach Cost',
        data: breachCosts
      }],
      chart: {
        ...this.getCommonOptions().chart,
        type: 'bar',
        height: 350
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
          return '$' + Math.round(val / 1000000) + 'M';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: industries,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Average Breach Cost ($)',
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
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [50, 100]
        }
      },
      colors: [this.colors.danger],
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      }
    };
    
    return this.createChart(element, options, chartId);
  }
}

// Create global instance
window.apexChartManager = new ApexChartManager();
