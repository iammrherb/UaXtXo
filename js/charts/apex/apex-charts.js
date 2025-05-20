/**
 * ApexCharts implementation for Portnox Total Cost Analyzer
 * Creates vibrant, interactive charts with animations
 */

class ApexChartManager {
  constructor(config = {}) {
    this.config = {
      colors: ChartConfig.colors,
      ...config
    };
    
    this.charts = {};
  }
  
  // Initialize charts for Executive View
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
  
  // Initialize charts for Financial View
  initFinancialCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['costStructureChart', 'costProjectionChart']);
    
    // Create cost structure chart
    this.createCostStructureChart(resultsData, 'cost-structure-chart', 'costStructureChart');
    
    // Create cost projection chart
    this.createCostProjectionChart(resultsData, 'cost-projection-chart', 'costProjectionChart');
    
    return this.charts;
  }
  
  // Initialize charts for Security View
  initSecurityCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['riskComparisonChart', 'breachImpactChart', 'insuranceImpactChart', 'nistFrameworkChart']);
    
    // Create risk comparison chart
    this.createRiskComparisonChart(resultsData, 'risk-comparison-chart', 'riskComparisonChart');
    
    // Create breach impact chart
    this.createBreachImpactChart(resultsData, 'breach-impact-chart', 'breachImpactChart');
    
    // Create insurance impact chart
    this.createInsuranceImpactChart(resultsData, 'insurance-impact-chart', 'insuranceImpactChart');
    
    // Create NIST framework chart
    this.createNistFrameworkChart(resultsData, 'nist-framework-chart', 'nistFrameworkChart');
    
    return this.charts;
  }
  
  // Initialize charts for Technical View
  initTechnicalCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['architectureChart', 'featureRadarChart']);
    
    // Create architecture chart
    this.createArchitectureChart(resultsData, 'architecture-chart', 'architectureChart');
    
    // Create feature radar chart
    this.createFeatureRadarChart(resultsData, 'feature-radar-chart', 'featureRadarChart');
    
    return this.charts;
  }
  
  // Helper method to destroy charts
  destroyCharts(chartIds) {
    chartIds.forEach(id => {
      if (this.charts[id]) {
        this.charts[id].destroy();
        delete this.charts[id];
      }
    });
  }
  
  // Create TCO comparison chart with ApexCharts
  createTcoComparisonChart(data, elementId, chartId) {
    const vendors = Object.keys(data.vendors).filter(v => v !== 'no-nac');
    const tcoValues = vendors.map(v => data.vendors[v].totalTco);
    const colors = vendors.map(v => ChartConfig.getVendorColor(v));
    
    const options = {
      series: [{
        name: 'Total Cost of Ownership',
        data: tcoValues
      }],
      chart: {
        type: 'bar',
        height: 400,
        fontFamily: ChartConfig.defaults.fontFamily,
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
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          borderRadius: 6,
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      colors: colors,
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return ChartConfig.formatCurrency(val);
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          fontFamily: ChartConfig.defaults.fontFamily,
          fontWeight: 600,
          colors: ['#555']
        }
      },
      xaxis: {
        categories: vendors.map(v => VENDORS[v].name),
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: ChartConfig.defaults.fontFamily
          }
        }
      },
      yaxis: {
        title: {
          text: '3-Year TCO ($)',
          style: {
            fontSize: '13px',
            fontFamily: ChartConfig.defaults.fontFamily
          }
        },
        labels: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
          },
          style: {
            fontSize: '12px',
            fontFamily: ChartConfig.defaults.fontFamily
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
        text: '3-Year Total Cost of Ownership',
        align: 'center',
        style: {
          fontSize: '16px',
          fontFamily: ChartConfig.defaults.fontFamily,
          fontWeight: 600
        }
      },
      theme: {
        mode: 'light'
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
  }
  
  // Create Cumulative Cost Chart with ApexCharts
  createCumulativeCostChart(data, elementId, chartId) {
    const vendors = Object.keys(data.vendors).filter(v => v !== 'no-nac');
    const years = data.vendors[vendors[0]].yearlyBreakdown.map(y => `Year ${y.year}`);
    
    const series = vendors.map(vendorId => {
      return {
        name: VENDORS[vendorId].name,
        data: data.vendors[vendorId].yearlyBreakdown.map(year => year.cumulativeCost)
      };
    });
    
    const options = {
      series: series,
      chart: {
        type: 'line',
        height: 400,
        fontFamily: ChartConfig.defaults.fontFamily,
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
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        }
      },
      colors: vendors.map(v => ChartConfig.getVendorColor(v)),
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      markers: {
        size: 5,
        hover: {
          size: 7
        }
      },
      xaxis: {
        categories: years,
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: ChartConfig.defaults.fontFamily
          }
        }
      },
      yaxis: {
        title: {
          text: 'Cumulative Cost ($)',
          style: {
            fontSize: '13px',
            fontFamily: ChartConfig.defaults.fontFamily
          }
        },
        labels: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
          },
          style: {
            fontSize: '12px',
            fontFamily: ChartConfig.defaults.fontFamily
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
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '12px',
        fontFamily: ChartConfig.defaults.fontFamily,
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
          fontSize: '16px',
          fontFamily: ChartConfig.defaults.fontFamily,
          fontWeight: 600
        }
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
  }
  
  // Create ROI Chart
  createRoiChart(data, elementId, chartId) {
    const vendors = Object.keys(data.roi).filter(v => v !== 'no-nac');
    const roiValues = vendors.map(v => data.roi[v].roiPercentage);
    const colors = vendors.map(v => ChartConfig.getVendorColor(v));
    
    const options = {
      series: [{
        name: 'Return on Investment',
        data: roiValues
      }],
      chart: {
        type: 'bar',
        height: 400,
        fontFamily: ChartConfig.defaults.fontFamily,
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
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          borderRadius: 6,
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      colors: colors,
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return Math.round(val) + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          fontFamily: ChartConfig.defaults.fontFamily,
          fontWeight: 600,
          colors: ['#555']
        }
      },
      xaxis: {
        categories: vendors.map(v => VENDORS[v].name),
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: ChartConfig.defaults.fontFamily
          }
        }
      },
      yaxis: {
        title: {
          text: '3-Year ROI (%)',
          style: {
            fontSize: '13px',
            fontFamily: ChartConfig.defaults.fontFamily
          }
        },
        labels: {
          formatter: function(val) {
            return Math.round(val) + '%';
          },
          style: {
            fontSize: '12px',
            fontFamily: ChartConfig.defaults.fontFamily
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return Math.round(val) + '%';
          }
        }
      },
      legend: {
        show: false
      },
      title: {
        text: '3-Year Return on Investment',
        align: 'center',
        style: {
          fontSize: '16px',
          fontFamily: ChartConfig.defaults.fontFamily,
          fontWeight: 600
        }
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
  }
  
  // Create Value Drivers Chart
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
      series: series,
      chart: {
        type: 'bar',
        height: 300,
        fontFamily: ChartConfig.defaults.fontFamily,
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
          fontSize: '12px',
          fontFamily: ChartConfig.defaults.fontFamily,
          fontWeight: 600,
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
          style: {
            fontSize: '12px',
            fontFamily: ChartConfig.defaults.fontFamily
          }
        }
      },
      yaxis: {
        labels: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
          },
          style: {
            fontSize: '12px',
            fontFamily: ChartConfig.defaults.fontFamily
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
          fontSize: '16px',
          fontFamily: ChartConfig.defaults.fontFamily,
          fontWeight: 600
        }
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
  }
  
  // Create Cost Structure Chart
  createCostStructureChart(data, elementId, chartId) {
    const vendors = Object.keys(data.vendors).filter(v => v !== 'no-nac');
    
    // Prepare series data for a stacked bar chart
    const seriesData = {
      hardware: { name: 'Hardware', data: [] },
      software: { name: 'Software', data: [] },
      subscription: { name: 'Subscription', data: [] },
      implementation: { name: 'Implementation', data: [] },
      maintenance: { name: 'Maintenance', data: [] },
      personnel: { name: 'Personnel', data: [] },
      operational: { name: 'Operational', data: [] },
      downtime: { name: 'Downtime', data: [] }
    };
    
    const categories = [];
    
    vendors.forEach(vendorId => {
      const vendor = data.vendors[vendorId];
      categories.push(VENDORS[vendorId].name);
      
      // Add each cost component to the series
      seriesData.hardware.data.push(vendor.breakdown.hardware || 0);
      seriesData.software.data.push(vendor.breakdown.software || 0);
      seriesData.subscription.data.push(vendor.breakdown.subscription || 0);
      seriesData.implementation.data.push(vendor.breakdown.implementation || 0);
      seriesData.maintenance.data.push(vendor.breakdown.maintenance || 0);
      seriesData.personnel.data.push(vendor.breakdown.personnel || 0);
      seriesData.operational.data.push(vendor.breakdown.operational || 0);
      seriesData.downtime.data.push(vendor.breakdown.downtime || 0);
    });
    
    // Convert to array and filter out empty series
    const series = Object.values(seriesData).filter(series => series.data.some(v => v > 0));
    
    const options = {
      series: series,
      chart: {
        type: 'bar',
        height: 400,
        stacked: true,
        fontFamily: ChartConfig.defaults.fontFamily,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        },
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          borderRadius: 0,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 600
              }
            }
          }
        }
      },
      colors: [
        '#3498db', '#2ecc71', '#1abc9c', '#9b59b6',
        '#f39c12', '#e74c3c', '#34495e', '#d35400'
      ],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: ChartConfig.defaults.fontFamily
          }
        }
      },
      yaxis: {
        title: {
          text: 'Cost Breakdown ($)',
          style: {
            fontSize: '13px',
            fontFamily: ChartConfig.defaults.fontFamily
          }
        },
        labels: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
          },
          style: {
            fontSize: '12px',
            fontFamily: ChartConfig.defaults.fontFamily
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
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '12px',
        fontFamily: ChartConfig.defaults.fontFamily,
        offsetY: 10,
        itemMargin: {
          horizontal: 10,
          vertical: 5
        }
      },
      title: {
        text: 'Cost Structure Breakdown',
        align: 'center',
        style: {
          fontSize: '16px',
          fontFamily: ChartConfig.defaults.fontFamily,
          fontWeight: 600
        }
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
  }
  
  // Create Cost Projection Chart
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
      series: series,
      chart: {
        type: 'line',
        height: 400,
        fontFamily: ChartConfig.defaults.fontFamily,
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
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        }
      },
      colors: vendors.map(v => ChartConfig.getVendorColor(v)),
      dataLabels: {
        enabled: false
      },
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
          style: {
            fontSize: '12px',
            fontFamily: ChartConfig.defaults.fontFamily
          }
        }
      },
      yaxis: {
        title: {
          text: 'Annual Cost ($)',
          style: {
            fontSize: '13px',
            fontFamily: ChartConfig.defaults.fontFamily
          }
        },
        labels: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
          },
          style: {
            fontSize: '12px',
            fontFamily: ChartConfig.defaults.fontFamily
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
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '12px',
        fontFamily: ChartConfig.defaults.fontFamily,
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
          fontSize: '16px',
          fontFamily: ChartConfig.defaults.fontFamily,
          fontWeight: 600
        }
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
  }
  
  // Other chart methods will be implemented here
  // ...
  
  // Method to initialize all charts
  initAllCharts(resultsData) {
    this.initExecutiveCharts(resultsData);
    this.initFinancialCharts(resultsData);
    this.initSecurityCharts(resultsData);
    this.initTechnicalCharts(resultsData);
    
    return this.charts;
  }
}

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ApexChartManager };
}
