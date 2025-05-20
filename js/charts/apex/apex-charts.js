/**
 * Enhanced ApexCharts implementation for Portnox Total Cost Analyzer
 * Creates modern, interactive charts with advanced features
 */

class ApexChartManager {
  constructor(config = {}) {
    this.config = {
      colors: ChartConfig.colors,
      theme: ChartConfig.apexTheme,
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
    // Update theme in config
    this.config.theme.chart.foreColor = isDarkMode ? '#e0e0e0' : '#333333';
    this.config.theme.tooltip.theme = isDarkMode ? 'dark' : 'light';
    this.config.theme.grid.borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
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
      if (chart) {
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
    const colors = vendors.map(v => ChartConfig.getVendorColor(v));
    
    // Find index of Portnox for highlighting
    const portnoxIndex = vendors.indexOf('portnox');
    
    // Create distributed colors array with Portnox highlighted
    const distributedColors = vendors.map((v, i) => {
      if (i === portnoxIndex) {
        return {
          // Portnox gets a gradient fill
          fillType: 'gradient',
          opacity: 1,
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.2,
          gradientToColors: [ChartConfig.adjustColor(ChartConfig.getVendorColor(v), -15)],
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
          return ChartConfig.formatCurrency(val);
        },
        offsetY: -20,
        style: {
          ...this.config.theme.dataLabels.style,
          colors: ['#555']
        }
      },
      xaxis: {
        categories: vendors.map(v => VENDORS[v].name),
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
            return ChartConfig.formatCurrency(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const vendorId = vendors[dataPointIndex];
          const vendor = VENDORS[vendorId];
          const tcoValue = series[seriesIndex][dataPointIndex];
          
          // Calculate savings compared to most expensive option
          const maxTco = Math.max(...series[seriesIndex]);
          const savings = maxTco - tcoValue;
          const savingsPercent = Math.round((savings / maxTco) * 100);
          
          // Create custom tooltip
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${vendor.name}</div>
              <div class="tooltip-value">${ChartConfig.formatCurrency(tcoValue)}</div>
              ${savings > 0 ? 
                `<div class="tooltip-savings">
                  <span style="color:#2ecc71">Save ${ChartConfig.formatCurrency(savings)}</span>
                  <span style="color:#2ecc71">(${savingsPercent}%)</span>
                 </div>` : ''
              }
              <div class="tooltip-arch">${vendor.architecture === 'cloud' ? 'Cloud Solution' : 
                                         vendor.architecture === 'hybrid' ? 'Hybrid Solution' : 
                                         'On-Premises Solution'}</div>
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
            x: VENDORS[vendors[portnoxIndex]].name,
            y: tcoValues[portnoxIndex],
            marker: {
              size: 0
            },
            label: {
              text: 'Best Value',
              borderColor: ChartConfig.getVendorColor(vendors[portnoxIndex]),
              style: {
                background: ChartConfig.getVendorColor(vendors[portnoxIndex]),
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
        name: VENDORS[vendorId].name,
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
          show: false
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
      colors: vendors.map(v => ChartConfig.getVendorColor(v)),
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
            return ChartConfig.formatCurrency(val);
          }
        }
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
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
              fillColor: ChartConfig.getVendorColor('portnox'),
              strokeColor: '#fff',
              strokeWidth: 2,
              radius: 2
            },
            label: {
              text: `${ChartConfig.formatCurrency(portnoxSeries.data[portnoxSeries.data.length - 1])}`,
              borderColor: ChartConfig.getVendorColor('portnox'),
              style: {
                background: ChartConfig.getVendorColor('portnox'),
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
    const colors = vendors.map(v => ChartConfig.getVendorColor(v));
    
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
        height: 400
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
        categories: vendors.map(v => VENDORS[v].name),
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
          const vendor = VENDORS[vendorId];
          const roiValue = series[seriesIndex][dataPointIndex];
          const payback = data.roi[vendorId].paybackPeriod;
          
          // Create custom tooltip
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${vendor.name}</div>
              <div class="tooltip-value">${Math.round(roiValue)}% ROI</div>
              <div class="tooltip-payback">Payback in ${Math.round(payback)} months</div>
              <div class="tooltip-arch">${vendor.architecture === 'cloud' ? 'Cloud Solution' : 
                                         vendor.architecture === 'hybrid' ? 'Hybrid Solution' : 
                                         'On-Premises Solution'}</div>
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
            x: VENDORS[vendors[portnoxIndex]].name,
            y: roiValues[portnoxIndex],
            marker: {
              size: 0
            },
            label: {
              text: 'Best ROI',
              borderColor: ChartConfig.getVendorColor(vendors[portnoxIndex]),
              style: {
                background: ChartConfig.getVendorColor(vendors[portnoxIndex]),
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
          show: false
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
        ChartConfig.colors.chart[0],
        ChartConfig.colors.chart[1],
        ChartConfig.colors.chart[2],
        ChartConfig.colors.chart[3],
        ChartConfig.colors.chart[4]
      ],
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return ChartConfig.formatCurrency(val);
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
            return ChartConfig.formatCurrency(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
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
   * Create Cost Structure Chart
   * Stacked bar chart showing cost breakdown by component
   */
  createCostStructureChart(data, elementId, chartId) {
    const vendors = Object.keys(data.vendors).filter(v => v !== 'no-nac');
    
    // Prepare series data for a stacked bar chart
    const series = [
      { name: 'Hardware', data: [] },
      { name: 'Software', data: [] },
      { name: 'Subscription', data: [] },
      { name: 'Implementation', data: [] },
      { name: 'Maintenance', data: [] },
      { name: 'Personnel', data: [] },
      { name: 'Operational', data: [] },
      { name: 'Downtime', data: [] }
    ];
    
    const categories = [];
    
    vendors.forEach(vendorId => {
      const vendor = data.vendors[vendorId];
      categories.push(VENDORS[vendorId].name);
      
      // Add each cost component to the series
      series[0].data.push(vendor.breakdown.hardware || 0);
      series[1].data.push(vendor.breakdown.software || 0);
      series[2].data.push(vendor.breakdown.subscription || 0);
      series[3].data.push(vendor.breakdown.implementation || 0);
      series[4].data.push(vendor.breakdown.maintenance || 0);
      series[5].data.push(vendor.breakdown.personnel || 0);
      series[6].data.push(vendor.breakdown.operational || 0);
      series[7].data.push(vendor.breakdown.downtime || 0);
    });
    
    // Filter out empty series
    const filteredSeries = series.filter(s => s.data.some(v => v > 0));
    
    const options = {
      ...this.config.theme,
      series: filteredSeries,
      chart: {
        ...this.config.theme.chart,
        type: 'bar',
        height: 450,
        stacked: true
      },
      colors: [
        '#3498db', // Hardware
        '#2ecc71', // Software
        '#1abc9c', // Subscription
        '#9b59b6', // Implementation
        '#f39c12', // Maintenance
        '#e74c3c', // Personnel
        '#34495e', // Operational
        '#d35400'  // Downtime
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          borderRadius: 0
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: categories,
        labels: {
          ...this.config.theme.xaxis.labels
        }
      },
      yaxis: {
        title: {
          text: 'Cost Breakdown ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '13px',
        offsetY: 10,
        markers: {
          fillColors: [
            '#3498db', '#2ecc71', '#1abc9c', '#9b59b6',
            '#f39c12', '#e74c3c', '#34495e', '#d35400'
          ]
        }
      },
      title: {
        text: 'Cost Structure Breakdown',
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
   * Create Cost Projection Chart
   * Line chart showing yearly costs for different vendors
   */
  createCostProjectionChart(data, elementId, chartId) {
    const vendors = Object.keys(data.vendors).filter(v => v !== 'no-nac');
    const series = [];
    
    vendors.forEach(vendorId => {
      const vendor = data.vendors[vendorId];
      const yearlyData = vendor.yearlyBreakdown.map(y => y.cost);
      
      series.push({
        name: VENDORS[vendorId].name,
        data: yearlyData
      });
    });
    
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
        }
      },
      colors: vendors.map(v => ChartConfig.getVendorColor(v)),
      stroke: {
        curve: 'straight',
        width: 3
      },
      markers: {
        size: 5,
        hover: {
          size: 7
        }
      },
      grid: {
        padding: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        }
      },
      xaxis: {
        categories: data.vendors[vendors[0]].yearlyBreakdown.map(y => `Year ${y.year}`),
        labels: {
          ...this.config.theme.xaxis.labels
        }
      },
      yaxis: {
        title: {
          text: 'Annual Cost ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
          }
        }
      },
      tooltip: {
        shared: true,
        y: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
          }
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '13px',
        offsetY: 10,
        itemMargin: {
          horizontal: 10,
          vertical: 5
        }
      },
      title: {
        text: '3-Year Cost Projection',
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
   * Initialize charts for Financial View
   */
  initFinancialCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['costStructureChart', 'costProjectionChart']);
    
    // Create cost structure chart
    this.createCostStructureChart(resultsData, 'cost-structure-chart', 'costStructureChart');
    
    // Create cost projection chart
    this.createCostProjectionChart(resultsData, 'cost-projection-chart', 'costProjectionChart');
    
    return this.charts;
  }
  
  /**
   * Helper method to destroy charts
   */
  destroyCharts(chartIds) {
    chartIds.forEach(id => {
      if (this.charts[id]) {
        this.charts[id].destroy();
        delete this.charts[id];
      }
    });
  }
}

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ApexChartManager };
}
