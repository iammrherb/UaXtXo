/**
 * Enhanced ApexCharts implementation for Portnox Total Cost Analyzer
 * Creates modern, interactive charts with advanced features
 */

class ApexChartManager {
  constructor(config = {}) {
    this.config = {
      colors: window.ChartConfig ? window.ChartConfig.colors : {
        chart: ['#1a5a96', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6', '#3498db']
      },
      theme: window.ChartConfig ? window.ChartConfig.apexTheme : {
        chart: { fontFamily: "'Nunito', sans-serif" }
      },
      ...config
    };
    
    this.charts = {};
    this.animations = true;
    
    // Initialize event listeners
    this.initEventListeners();
  }
  
  /**
   * Initialize event listeners for theme changes and responsiveness
   */
  initEventListeners() {
    // Listen for theme changes
    window.addEventListener('themechange', (event) => {
      const isDarkMode = event.detail.theme === 'dark';
      this.updateChartsTheme(isDarkMode);
    });
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resizeAllCharts();
      }, 250);
    });
  }
  
  /**
   * Update all charts when theme changes
   */
  updateChartsTheme(isDarkMode) {
    if (!window.ChartConfig) return;
    
    // Update theme in config
    this.config.theme.chart.foreColor = isDarkMode ? window.ChartConfig.colors.dark.textColor : window.ChartConfig.colors.light.textColor;
    this.config.theme.tooltip.theme = isDarkMode ? 'dark' : 'light';
    this.config.theme.grid.borderColor = isDarkMode ? window.ChartConfig.colors.dark.gridColor : window.ChartConfig.colors.light.gridColor;
    
    // Update all active charts
    Object.keys(this.charts).forEach(chartId => {
      const chart = this.charts[chartId];
      if (chart && chart.updateOptions) {
        chart.updateOptions({
          chart: {
            foreColor: this.config.theme.chart.foreColor
          },
          tooltip: {
            theme: this.config.theme.tooltip.theme
          },
          grid: {
            borderColor: this.config.theme.grid.borderColor
          }
        }, false, true);
      }
    });
  }
  
  /**
   * Resize all charts
   */
  resizeAllCharts() {
    Object.keys(this.charts).forEach(chartId => {
      const chart = this.charts[chartId];
      if (chart && chart.render) {
        try {
          chart.render();
        } catch (e) {
          console.error(`Error resizing chart ${chartId}:`, e);
        }
      }
    });
  }
  
  /**
   * Create TCO comparison chart with ApexCharts
   * Enhanced bar chart with animations and tooltips
   */
  createTcoComparisonChart(data, elementId, chartId) {
    const vendors = Object.keys(data.vendors).filter(v => v !== 'no-nac');
    const tcoValues = vendors.map(v => data.vendors[v].totalTco);
    const colors = vendors.map(v => window.ChartConfig ? window.ChartConfig.getVendorColor(v) : this.config.colors.chart[0]);
    
    // Find index of Portnox for highlighting
    const portnoxIndex = vendors.indexOf('portnox');
    
    // Create distributed colors array with Portnox highlighted
    const distributedColors = vendors.map((v, i) => {
      if (i === portnoxIndex) {
        // Portnox gets a gradient fill
        return {
          fillType: 'gradient',
          opacity: 1,
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.2,
          gradientToColors: [window.ChartConfig ? window.ChartConfig.adjustColor(window.ChartConfig.getVendorColor(v), -15) : colors[i]],
          inverseColors: false,
          stops: [0, 100]
        };
      } else {
        // Other vendors get solid colors with less opacity
        return {
          fillType: 'solid',
          opacity: 0.85
        };
      }
    });
    
    const options = {
      ...this.config.theme,
      series: [{
        name: 'Total Cost of Ownership',
        data: tcoValues
      }],
      chart: {
        ...this.config.theme.chart,
        type: 'bar',
        height: 400,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            // Handle bar click for drill-down
            const vendorId = vendors[config.dataPointIndex];
            // Example: Trigger vendor detail view
            document.dispatchEvent(new CustomEvent('showVendorDetail', {
              detail: { vendorId }
            }));
          }
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          ...this.config.theme.plotOptions.bar,
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      fill: {
        opacity: distributedColors.map(d => d.opacity),
        type: distributedColors.map(d => d.fillType),
        gradient: distributedColors.map((d, i) => {
          if (d.fillType === 'gradient') {
            return {
              shade: d.shade,
              type: d.type,
              shadeIntensity: d.shadeIntensity,
              gradientToColors: d.gradientToColors,
              inverseColors: d.inverseColors,
              opacityFrom: 1,
              opacityTo: 1,
              stops: d.stops
            };
          }
          return null;
        }).filter(g => g !== null)
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return window.ChartConfig ? 
            window.ChartConfig.formatCurrency(val) : 
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(val);
        },
        offsetY: -20,
        style: {
          ...this.config.theme.dataLabels.style,
          colors: ['#555']
        }
      },
      xaxis: {
        categories: vendors.map(v => window.VENDORS ? window.VENDORS[v].name : v),
        labels: {
          ...this.config.theme.xaxis.labels,
          style: {
            ...this.config.theme.xaxis.labels.style,
            colors: vendors.map((v, i) => i === portnoxIndex ? colors[i] : this.config.theme.chart.foreColor)
          }
        }
      },
      yaxis: {
        title: {
          text: '3-Year TCO ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const vendorId = vendors[dataPointIndex];
          const vendorName = window.VENDORS ? window.VENDORS[vendorId].name : vendorId;
          const tcoValue = series[seriesIndex][dataPointIndex];
          
          // Calculate savings compared to most expensive option
          const maxTco = Math.max(...series[seriesIndex]);
          const savings = maxTco - tcoValue;
          const savingsPercent = Math.round((savings / maxTco) * 100);
          
          const formatCurrency = val => window.ChartConfig ? 
            window.ChartConfig.formatCurrency(val) : 
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(val);
          
          // Create custom tooltip
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${vendorName}</div>
              <div class="tooltip-value">${formatCurrency(tcoValue)}</div>
              ${savings > 0 ? 
                `<div class="tooltip-savings">
                  <span style="color:#2ecc71">Save ${formatCurrency(savings)}</span>
                  <span style="color:#2ecc71">(${savingsPercent}%)</span>
                 </div>` : ''
              }
              <div class="tooltip-arch">${window.VENDORS ? 
                (window.VENDORS[vendorId].architecture === 'cloud' ? 'Cloud Solution' : 
                 window.VENDORS[vendorId].architecture === 'hybrid' ? 'Hybrid Solution' : 
                 'On-Premises Solution') : 'Solution'}</div>
            </div>
          `;
        }
      },
      legend: {
        show: false
      },
      title: {
        text: '3-Year Total Cost of Ownership',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      },
      annotations: {
        points: portnoxIndex >= 0 ? [
          {
            x: window.VENDORS ? window.VENDORS[vendors[portnoxIndex]].name : vendors[portnoxIndex],
            y: tcoValues[portnoxIndex],
            marker: {
              size: 0
            },
            label: {
              text: 'Best Value',
              borderColor: window.ChartConfig ? window.ChartConfig.getVendorColor(vendors[portnoxIndex]) : colors[portnoxIndex],
              style: {
                background: window.ChartConfig ? window.ChartConfig.getVendorColor(vendors[portnoxIndex]) : colors[portnoxIndex],
                color: '#fff',
                fontSize: '11px',
                fontWeight: 600
              },
              offsetY: -15
            }
          }
        ] : []
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create Cumulative Cost Chart with ApexCharts
   * Line chart showing cost over time for different vendors
   */
  createCumulativeCostChart(data, elementId, chartId) {
    const vendors = Object.keys(data.vendors).filter(v => v !== 'no-nac');
    const years = data.vendors[vendors[0]].yearlyBreakdown.map(y => `Year ${y.year}`);
    
    const series = vendors.map(vendorId => {
      return {
        name: window.VENDORS ? window.VENDORS[vendorId].name : vendorId,
        data: data.vendors[vendorId].yearlyBreakdown.map(year => year.cumulativeCost)
      };
    });
    
    // Find Portnox series for annotations
    const portnoxIndex = vendors.indexOf('portnox');
    const portnoxSeries = portnoxIndex >= 0 ? series[portnoxIndex] : null;
    
    const options = {
      ...this.config.theme,
      series: series,
      chart: {
        ...this.config.theme.chart,
        type: 'line',
        height: 400,
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.1
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
        },
        animations: {
          enabled: this.animations,
          easing: 'easeinout',
          speed: 900,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 450
          }
        }
      },
      colors: vendors.map(v => window.ChartConfig ? window.ChartConfig.getVendorColor(v) : this.config.colors.chart[0]),
      stroke: {
        width: 3,
        curve: 'smooth',
        dashArray: vendors.map(v => v === 'portnox' ? 0 : 0)
      },
      markers: {
        size: 5,
        shape: "circle",
        strokeWidth: 1,
        hover: {
          size: 7
        }
      },
      xaxis: {
        categories: years,
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: "'Nunito', sans-serif"
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
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '14px',
        offsetY: 10,
        itemMargin: {
          horizontal: 10,
          vertical: 5
        }
      },
      title: {
        text: 'Cumulative Cost Over Time',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      },
      grid: {
        borderColor: '#e0e0e0',
        row: {
          colors: ['transparent', 'transparent'],
          opacity: 0.2
        }
      },
      annotations: portnoxSeries ? {
        points: [
          {
            x: `Year ${years.length}`,
            y: portnoxSeries.data[portnoxSeries.data.length - 1],
            marker: {
              size: 6,
              fillColor: window.ChartConfig ? window.ChartConfig.getVendorColor('portnox') : this.config.colors.chart[0],
              strokeColor: '#fff',
              strokeWidth: 2,
              radius: 2
            },
            label: {
              text: `${window.ChartConfig ? 
                window.ChartConfig.formatCurrency(portnoxSeries.data[portnoxSeries.data.length - 1]) : 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(portnoxSeries.data[portnoxSeries.data.length - 1])}`,
              borderColor: window.ChartConfig ? window.ChartConfig.getVendorColor('portnox') : this.config.colors.chart[0],
              style: {
                background: window.ChartConfig ? window.ChartConfig.getVendorColor('portnox') : this.config.colors.chart[0],
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600,
                padding: {
                  left: 10,
                  right: 10,
                  top: 5,
                  bottom: 5
                }
              },
              offsetY: -15
            }
          }
        ]
      } : {}
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create ROI Chart with ApexCharts
   * Bar chart showing Return on Investment for different vendors
   */
  createRoiChart(data, elementId, chartId) {
    const vendors = Object.keys(data.roi).filter(v => v !== 'no-nac');
    const roiValues = vendors.map(v => data.roi[v].roiPercentage);
    const colors = vendors.map(v => window.ChartConfig ? window.ChartConfig.getVendorColor(v) : this.config.colors.chart[0]);
    
    // Find index of Portnox for highlighting
    const portnoxIndex = vendors.indexOf('portnox');
    
    const options = {
      ...this.config.theme,
      series: [{
        name: 'Return on Investment',
        data: roiValues
      }],
      chart: {
        ...this.config.theme.chart,
        type: 'bar',
        height: 400,
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
      },
      colors: colors,
      plotOptions: {
        bar: {
          ...this.config.theme.plotOptions.bar,
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return Math.round(val) + '%';
        },
        offsetY: -20,
        style: {
          ...this.config.theme.dataLabels.style,
          colors: ['#555']
        }
      },
      xaxis: {
        categories: vendors.map(v => window.VENDORS ? window.VENDORS[v].name : v),
        labels: {
          ...this.config.theme.xaxis.labels,
          style: {
            ...this.config.theme.xaxis.labels.style,
            colors: vendors.map((v, i) => i === portnoxIndex ? colors[i] : this.config.theme.chart.foreColor)
          }
        }
      },
      yaxis: {
        title: {
          text: '3-Year ROI (%)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return Math.round(val) + '%';
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return Math.round(val) + '%';
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const vendorId = vendors[dataPointIndex];
          const vendorName = window.VENDORS ? window.VENDORS[vendorId].name : vendorId;
          const roiValue = series[seriesIndex][dataPointIndex];
          const payback = data.roi[vendorId].paybackPeriod;
          
          // Create custom tooltip
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${vendorName}</div>
              <div class="tooltip-value">${Math.round(roiValue)}% ROI</div>
              <div class="tooltip-payback">Payback in ${Math.round(payback)} months</div>
              <div class="tooltip-arch">${window.VENDORS ? 
                (window.VENDORS[vendorId].architecture === 'cloud' ? 'Cloud Solution' : 
                 window.VENDORS[vendorId].architecture === 'hybrid' ? 'Hybrid Solution' : 
                 'On-Premises Solution') : 'Solution'}</div>
            </div>
          `;
        }
      },
      legend: {
        show: false
      },
      title: {
        text: '3-Year Return on Investment',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      },
      annotations: portnoxIndex >= 0 && roiValues[portnoxIndex] === Math.max(...roiValues) ? {
        points: [
          {
            x: window.VENDORS ? window.VENDORS[vendors[portnoxIndex]].name : vendors[portnoxIndex],
            y: roiValues[portnoxIndex],
            marker: {
              size: 0
            },
            label: {
              text: 'Best ROI',
              borderColor: window.ChartConfig ? window.ChartConfig.getVendorColor(vendors[portnoxIndex]) : colors[portnoxIndex],
              style: {
                background: window.ChartConfig ? window.ChartConfig.getVendorColor(vendors[portnoxIndex]) : colors[portnoxIndex],
                color: '#fff',
                fontSize: '11px',
                fontWeight: 600
              },
              offsetY: -15
            }
          }
        ]
      } : {}
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create Value Drivers Chart
   * Horizontal bar chart showing ROI value drivers
   */
  createValueDriversChart(data, elementId, chartId) {
    const portnoxRoi = data.roi.portnox;
    
    if (!portnoxRoi) return;
    
    const series = [{
      name: 'Value',
      data: [
        portnoxRoi.costSavings,
        portnoxRoi.riskReductionBenefit,
        portnoxRoi.productivityBenefit,
        portnoxRoi.complianceSavings,
        portnoxRoi.insuranceSavings
      ]
    }];
    
    const options = {
      ...this.config.theme,
      series: series,
      chart: {
        ...this.config.theme.chart,
        type: 'bar',
        height: 350,
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
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '70%',
          borderRadius: 6,
          distributed: true,
          dataLabels: {
            position: 'right'
          }
        }
      },
      colors: [
        '#1a5a96',
        '#2ecc71',
        '#f39c12',
        '#e74c3c',
        '#9b59b6'
      ],
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return window.ChartConfig ? 
            window.ChartConfig.formatCurrency(val) : 
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(val);
        },
        textAnchor: 'start',
        offsetX: 10,
        style: {
          ...this.config.theme.dataLabels.style,
          colors: ['#555']
        }
      },
      xaxis: {
        categories: [
          'Direct Cost Savings',
          'Risk Reduction',
          'Productivity Gains',
          'Compliance Automation',
          'Insurance Savings'
        ],
        labels: {
          ...this.config.theme.xaxis.labels
        }
      },
      yaxis: {
        labels: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      legend: {
        show: false
      },
      title: {
        text: 'Value Drivers',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create Security Framework Coverage Chart
   * Horizontal bar chart showing compliance framework coverage
   */
  createSecurityFrameworksChart(data, elementId, chartId) {
    // Framework coverage for Portnox
    const frameworkData = {
      'NIST CSF': 95,
      'ISO 27001': 88,
      'SOC 2': 92,
      'HIPAA': 85,
      'PCI DSS': 90,
      'GDPR': 80,
      'CMMC': 82
    };
    
    // For competitor comparison
    const competitorData = {
      'cisco': {
        'NIST CSF': 85,
        'ISO 27001': 85,
        'SOC 2': 82,
        'HIPAA': 80,
        'PCI DSS': 85,
        'GDPR': 75,
        'CMMC': 78
      },
      'forescout': {
        'NIST CSF': 83,
        'ISO 27001': 80,
        'SOC 2': 85,
        'HIPAA': 78,
        'PCI DSS': 82,
        'GDPR': 72,
        'CMMC': 75
      }
    };
    
    // Create series array for all vendors to compare
    const series = [
      {
        name: 'Portnox',
        data: Object.values(frameworkData)
      }
    ];
    
    // Add competitors if selected
    const selectedVendors = window.sidebarManager ? window.sidebarManager.getSelectedVendors() : [];
    
    if (selectedVendors.includes('cisco')) {
      series.push({
        name: 'Cisco ISE',
        data: Object.values(competitorData.cisco)
      });
    }
    
    if (selectedVendors.includes('forescout')) {
      series.push({
        name: 'Forescout',
        data: Object.values(competitorData.forescout)
      });
    }
    
    const options = {
      ...this.config.theme,
      series: series,
      chart: {
        ...this.config.theme.chart,
        type: 'bar',
        height: 450,
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
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
          barHeight: '80%',
          borderRadius: 4
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
          return val + '%';
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: Object.keys(frameworkData),
        labels: {
          ...this.config.theme.xaxis.labels
        },
        max: 100
      },
      yaxis: {
        title: {
          text: 'Compliance Frameworks',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      },
      colors: [
        window.ChartConfig ? window.ChartConfig.getVendorColor('portnox') : '#1a5a96',
        window.ChartConfig ? window.ChartConfig.getVendorColor('cisco') : '#00bceb',
        window.ChartConfig ? window.ChartConfig.getVendorColor('forescout') : '#7a2a90'
      ],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '% Coverage';
          }
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        offsetY: 10
      },
      title: {
        text: 'Industry Compliance Framework Coverage',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create Cyber Insurance Impact Chart
   * Bar chart showing insurance premium reductions
   */
  createInsuranceImpactChart(data, elementId, chartId) {
    // Insurance data - percentage reduction in premiums
    const insuranceData = {
      'portnox': 25,
      'cisco': 18,
      'aruba': 15,
      'forescout': 20,
      'fortinac': 15
    };
    
    // Filter to selected vendors
    const selectedVendors = window.sidebarManager ? 
      window.sidebarManager.getSelectedVendors() : 
      Object.keys(insuranceData);
    
    const vendors = selectedVendors.filter(v => insuranceData[v] !== undefined);
    
    // Annual premium before reductions
    const annualPremium = 150000;
    
    // Calculate actual dollar savings
    const series = [{
      name: 'Annual Premium Savings',
      data: vendors.map(v => (insuranceData[v] / 100) * annualPremium)
    }];
    
    const options = {
      ...this.config.theme,
      series: series,
      chart: {
        ...this.config.theme.chart,
        type: 'bar',
        height: 400,
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
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: '60%',
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      colors: vendors.map(v => window.ChartConfig ? window.ChartConfig.getVendorColor(v) : this.config.colors.chart[0]),
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return window.ChartConfig ? 
            window.ChartConfig.formatCurrency(val) : 
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(val);
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#333"]
        }
      },
      xaxis: {
        categories: vendors.map(v => window.VENDORS ? window.VENDORS[v].name : v),
        labels: {
          ...this.config.theme.xaxis.labels
        }
      },
      yaxis: {
        title: {
          text: 'Annual Premium Savings ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const vendorId = vendors[dataPointIndex];
          const vendorName = window.VENDORS ? window.VENDORS[vendorId].name : vendorId;
          const value = series[seriesIndex][dataPointIndex];
          const percent = insuranceData[vendorId];
          
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${vendorName}</div>
              <div class="tooltip-value">${window.ChartConfig ? 
                window.ChartConfig.formatCurrency(value) : 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(value)}</div>
              <div>Premium reduction: ${percent}%</div>
              <div>Base premium: ${window.ChartConfig ? 
                window.ChartConfig.formatCurrency(annualPremium) : 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(annualPremium)}</div>
            </div>
          `;
        }
      },
      legend: {
        show: false
      },
      title: {
        text: 'Cyber Insurance Premium Reduction',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      },
      annotations: {
        points: vendors.indexOf('portnox') >= 0 ? [
          {
            x: window.VENDORS ? window.VENDORS['portnox'].name : 'portnox',
            y: (insuranceData['portnox'] / 100) * annualPremium,
            marker: {
              size: 0
            },
            label: {
              text: 'Highest Savings',
              borderColor: window.ChartConfig ? window.ChartConfig.getVendorColor('portnox') : this.config.colors.chart[0],
              style: {
                background: window.ChartConfig ? window.ChartConfig.getVendorColor('portnox') : this.config.colors.chart[0],
                color: '#fff',
                fontSize: '11px',
                fontWeight: 600
              },
              offsetY: -15
            }
          }
        ] : []
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create Breach Impact Chart
   * Bar chart comparing data breach costs with and without NAC
   */
  createBreachImpactChart(data, elementId, chartId) {
    // Define breach impact data
    const breachCost = 4800000; // Average cost of a data breach
    const breachProbability = 0.32; // Probability of a breach without NAC
    
    // Reduction percentages for different vendors
    const riskReduction = {
      'portnox': 0.89,
      'cisco': 0.76,
      'aruba': 0.74,
      'forescout': 0.81,
      'fortinac': 0.72
    };
    
    // Filter to selected vendors
    const selectedVendors = window.sidebarManager ? 
      window.sidebarManager.getSelectedVendors() : 
      Object.keys(riskReduction);
    
    const vendors = selectedVendors.filter(v => riskReduction[v] !== undefined);
    
    // Calculate expected annual loss (EAL)
    const withoutNac = breachCost * breachProbability;
    const vendorEALs = vendors.map(v => withoutNac * (1 - riskReduction[v]));
    
    // Create series data
    const series = [
      {
        name: 'Expected Annual Loss',
        data: [...vendorEALs, withoutNac]
      }
    ];
    
    const options = {
      ...this.config.theme,
      series: series,
      chart: {
        ...this.config.theme.chart,
        type: 'bar',
        height: 400,
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
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: '60%',
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      colors: [
        ...vendors.map(v => window.ChartConfig ? window.ChartConfig.getVendorColor(v) : this.config.colors.chart[0]), 
        '#777777' // color for "No NAC"
      ],
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return window.ChartConfig ? 
            window.ChartConfig.formatCurrency(val) : 
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(val);
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#333"]
        }
      },
      xaxis: {
        categories: [
          ...vendors.map(v => window.VENDORS ? window.VENDORS[v].name : v),
          'No NAC'
        ],
        labels: {
          ...this.config.theme.xaxis.labels
        }
      },
      yaxis: {
        title: {
          text: 'Expected Annual Loss ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const categories = [
            ...vendors.map(v => window.VENDORS ? window.VENDORS[v].name : v),
            'No NAC'
          ];
          
          const vendorName = categories[dataPointIndex];
          const value = series[seriesIndex][dataPointIndex];
          
          let reduction = 0;
          let reductionPercent = 0;
          
          if (dataPointIndex < vendors.length) {
            reduction = withoutNac - value;
            reductionPercent = riskReduction[vendors[dataPointIndex]] * 100;
          }
          
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${vendorName}</div>
              <div class="tooltip-value">${window.ChartConfig ? 
                window.ChartConfig.formatCurrency(value) : 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(value)}</div>
              ${dataPointIndex < vendors.length ? `
                <div style="color:#2ecc71">Risk reduction: ${reductionPercent.toFixed(0)}%</div>
                <div style="color:#2ecc71">Savings: ${window.ChartConfig ? 
                  window.ChartConfig.formatCurrency(reduction) : 
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(reduction)}</div>
              ` : ''}
              <div>Based on an average breach cost of ${window.ChartConfig ? 
                window.ChartConfig.formatCurrency(breachCost) : 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(breachCost)}</div>
            </div>
          `;
        }
      },
      legend: {
        show: false
      },
      title: {
        text: 'Data Breach Cost Impact Analysis',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create Industry Breach Data Chart
   * Shows breach statistics across different industries
   */
  createIndustryBreachChart(data, elementId, chartId) {
    // Industry breach data
    const industryData = [
      { industry: 'Healthcare', breachCost: 9230000, records: 29000 },
      { industry: 'Financial', breachCost: 5850000, records: 22000 },
      { industry: 'Technology', breachCost: 5150000, records: 25000 },
      { industry: 'Energy & Utilities', breachCost: 4770000, records: 21000 },
      { industry: 'Education', breachCost: 3850000, records: 28000 },
      { industry: 'Retail', breachCost: 3270000, records: 19000 },
      { industry: 'Manufacturing', breachCost: 4100000, records: 17000 }
    ];
    
    const series = [{
      name: 'Average Breach Cost',
      data: industryData.map(item => item.breachCost)
    }];
    
    const options = {
      ...this.config.theme,
      series: series,
      chart: {
        ...this.config.theme.chart,
        type: 'bar',
        height: 400,
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
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          borderRadius: 6,
          colors: {
            ranges: [{
              from: 0,
              to: 4000000,
              color: '#2ecc71'
            }, {
              from: 4000001,
              to: 6000000,
              color: '#f39c12'
            }, {
              from: 6000001,
              to: 10000000,
              color: '#e74c3c'
            }]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: industryData.map(item => item.industry),
        labels: {
          ...this.config.theme.xaxis.labels
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
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const industry = industryData[dataPointIndex].industry;
          const cost = industryData[dataPointIndex].breachCost;
          const records = industryData[dataPointIndex].records;
          
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${industry}</div>
              <div class="tooltip-value">${window.ChartConfig ? 
                window.ChartConfig.formatCurrency(cost) : 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(cost)}</div>
              <div>Average records exposed: ${records.toLocaleString()}</div>
              <div>Per record cost: ${window.ChartConfig ? 
                window.ChartConfig.formatCurrency(cost / records) : 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(cost / records)}</div>
            </div>
          `;
        }
      },
      colors: ['#1a5a96'],
      title: {
        text: 'Data Breach Costs by Industry',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      },
      annotations: {
        points: [{
          x: 'Healthcare',
          y: 9230000,
          marker: {
            size: 5,
            fillColor: '#e74c3c',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Highest Risk',
            borderColor: '#e74c3c',
            style: {
              background: '#e74c3c',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create Technical Impact Radar Chart
   * Compares technical capabilities across vendors
   */
  createTechnicalRadarChart(data, elementId, chartId) {
    // Technical dimensions for comparison
    const dimensions = [
      'Cloud Integration', 
      'Legacy Support', 
      'Wireless', 
      'BYOD', 
      'IoT', 
      'Remote Access'
    ];
    
    // Selected vendors for comparison
    const selectedVendors = window.sidebarManager ? 
      window.sidebarManager.getSelectedVendors() : 
      ['portnox', 'cisco', 'forescout'];
    
    // Technical ratings (0-100 scale)
    const vendorRatings = {
      'portnox': [95, 85, 90, 95, 90, 95],
      'cisco': [75, 90, 85, 80, 75, 80],
      'forescout': [70, 85, 80, 85, 90, 75],
      'aruba': [70, 80, 95, 85, 80, 80],
      'fortinac': [65, 85, 80, 75, 80, 70]
    };
    
    // Create series from selected vendors
    const series = selectedVendors
      .filter(v => vendorRatings[v] !== undefined)
      .map(vendorId => ({
        name: window.VENDORS ? window.VENDORS[vendorId].name : vendorId,
        data: vendorRatings[vendorId]
      }));
    
    const options = {
      ...this.config.theme,
      series: series,
      chart: {
        ...this.config.theme.chart,
        type: 'radar',
        height: 500,
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        },
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
        size: 5,
        hover: {
          size: 7
        }
      },
      xaxis: {
        categories: dimensions
      },
      yaxis: {
        max: 100,
        labels: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      colors: selectedVendors
        .filter(v => vendorRatings[v] !== undefined)
        .map(v => window.ChartConfig ? window.ChartConfig.getVendorColor(v) : this.config.colors.chart[0]),
      title: {
        text: 'Technical Capabilities Comparison',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        offsetY: 10
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Initialize charts for Executive View
   */
  initExecutiveCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['tcoComparisonChart', 'cumulativeCostChart', 'roiChart', 'valueDriversChart']);
    
    // Create TCO comparison chart
    this.createTcoComparisonChart(resultsData, 'tco-comparison-chart', 'tcoComparisonChart');
    
    // Create cumulative cost chart
    this.createCumulativeCostChart(resultsData, 'cumulative-cost-chart', 'cumulativeCostChart');
    
    // Create ROI chart
    this.createRoiChart(resultsData, 'roi-chart', 'roiChart');
    
    // Create value drivers chart
    this.createValueDriversChart(resultsData, 'value-drivers-chart', 'valueDriversChart');
    
    return this.charts;
  }
  
  /**
   * Initialize charts for Security & Compliance View
   */
  initSecurityCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['securityFrameworksChart', 'breachImpactChart', 'insuranceImpactChart', 'industryBreachChart']);
    
    // Create security frameworks chart
    this.createSecurityFrameworksChart(resultsData, 'security-frameworks-chart', 'securityFrameworksChart');
    
    // Create breach impact chart
    this.createBreachImpactChart(resultsData, 'breach-impact-chart', 'breachImpactChart');
    
    // Create insurance impact chart
    this.createInsuranceImpactChart(resultsData, 'insurance-impact-chart', 'insuranceImpactChart');
    
    // Create industry breach chart
    this.createIndustryBreachChart(resultsData, 'industry-breach-chart', 'industryBreachChart');
    
    return this.charts;
  }
  
  /**
   * Initialize charts for Technical View
   */
  initTechnicalCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['technicalRadarChart']);
    
    // Create technical radar chart
    this.createTechnicalRadarChart(resultsData, 'technical-radar-chart', 'technicalRadarChart');
    
    return this.charts;
  }
  
  /**
   * Helper method to destroy charts
   */
  destroyCharts(chartIds) {
    chartIds.forEach(id => {
      if (this.charts[id]) {
        try {
          this.charts[id].destroy();
        } catch (e) {
          console.error(`Error destroying chart ${id}:`, e);
        }
        delete this.charts[id];
      }
    });
  }
}

// Create global instance
window.apexChartManager = new ApexChartManager();

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ApexChartManager };
}
