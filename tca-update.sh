#!/bin/bash

# Portnox Total Cost Analyzer Comprehensive Fix Script
# This script reorganizes the codebase and fixes various issues

echo "Starting Portnox Total Cost Analyzer Fix Script..."

# Create backup of current codebase
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
echo "Creating backup of current codebase to ./backup_$TIMESTAMP"
mkdir -p "./backup_$TIMESTAMP"
cp -r ./js "./backup_$TIMESTAMP/"
cp -r ./css "./backup_$TIMESTAMP/"
cp -r ./img "./backup_$TIMESTAMP/"
cp ./*.html "./backup_$TIMESTAMP/"
cp ./*.js "./backup_$TIMESTAMP/"

# Create necessary directories if they don't exist
echo "Creating necessary directories..."
mkdir -p ./js/core
mkdir -p ./js/charts
mkdir -p ./js/views
mkdir -p ./js/components
mkdir -p ./js/utils
mkdir -p ./css/themes
mkdir -p ./img/vendors
mkdir -p ./img/logos

# Fix duplicate JS declarations by consolidating files
echo "Consolidating JavaScript files to fix duplicate declarations..."

# Create single configuration file
cat > ./js/core/config.js << 'EOL'
/**
 * Master Configuration for Portnox Total Cost Analyzer
 * Provides centralized configuration for the entire application
 */

const TCAConfig = {
  // Application version
  version: '1.0.0',
  
  // Color scheme
  colors: {
    // Primary brand colors
    primary: {
      main: '#1a5a96',
      light: '#2980b9',
      dark: '#0d4275',
      gradient: 'linear-gradient(135deg, #1a5a96 0%, #2980b9 100%)'
    },
    // Secondary colors
    secondary: {
      main: '#e74c3c',
      light: '#f16354',
      dark: '#c0392b',
      gradient: 'linear-gradient(135deg, #e74c3c 0%, #f16354 100%)'
    },
    // Accent colors
    accent: {
      success: '#27ae60',
      warning: '#f39c12',
      danger: '#c0392b',
      info: '#3498db',
      neutral: '#7f8c8d'
    },
    // Background colors
    background: {
      light: '#ffffff',
      dark: '#2c3e50',
      lightGray: '#f5f7fa',
      darkGray: '#34495e'
    },
    // Chart colors
    chart: [
      '#1a5a96', // Portnox Blue
      '#e74c3c', // Cisco Red
      '#e67e22', // Aruba Orange
      '#f39c12', // Forescout Amber
      '#2ecc71', // FortiNAC Green
      '#3498db', // Juniper Blue
      '#9b59b6', // SecureW2 Purple
      '#34495e', // Microsoft Navy
      '#16a085', // Arista Teal
      '#27ae60'  // Foxpass Green
    ],
    // Gradient presets
    gradients: {
      blue: 'linear-gradient(135deg, #1a5a96 0%, #3498db 100%)',
      green: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
      orange: 'linear-gradient(135deg, #e67e22 0%, #f39c12 100%)',
      purple: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)',
      red: 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)'
    }
  },
  
  // Vendor-specific configurations
  vendors: {
    portnox: {
      name: 'Portnox Cloud',
      shortName: 'Portnox',
      logo: './img/vendors/portnox.png',
      color: '#1a5a96',
      architecture: 'cloud',
      features: {
        cloudIntegration: true,
        legacyDevices: true,
        byod: true,
        iot: true,
        wireless: true,
        remoteUsers: true
      }
    },
    cisco: {
      name: 'Cisco ISE',
      shortName: 'Cisco',
      logo: './img/vendors/cisco.png',
      color: '#e74c3c',
      architecture: 'on-premises',
      features: {
        cloudIntegration: false,
        legacyDevices: true,
        byod: true,
        iot: true,
        wireless: true,
        remoteUsers: false
      }
    },
    aruba: {
      name: 'Aruba ClearPass',
      shortName: 'Aruba',
      logo: './img/vendors/aruba.png',
      color: '#e67e22',
      architecture: 'on-premises',
      features: {
        cloudIntegration: false,
        legacyDevices: true,
        byod: true,
        iot: false,
        wireless: true,
        remoteUsers: false
      }
    },
    forescout: {
      name: 'Forescout',
      shortName: 'Forescout',
      logo: './img/vendors/forescout.png',
      color: '#f39c12',
      architecture: 'on-premises',
      features: {
        cloudIntegration: false,
        legacyDevices: true,
        byod: true,
        iot: true,
        wireless: true,
        remoteUsers: false
      }
    },
    fortinac: {
      name: 'FortiNAC',
      shortName: 'FortiNAC',
      logo: './img/vendors/fortinac.png',
      color: '#2ecc71',
      architecture: 'hybrid',
      features: {
        cloudIntegration: true,
        legacyDevices: true,
        byod: true,
        iot: true,
        wireless: true,
        remoteUsers: true
      }
    },
    juniper: {
      name: 'Juniper NAC',
      shortName: 'Juniper',
      logo: './img/vendors/juniper.png',
      color: '#3498db',
      architecture: 'on-premises',
      features: {
        cloudIntegration: false,
        legacyDevices: true,
        byod: true,
        iot: false,
        wireless: true,
        remoteUsers: false
      }
    },
    securew2: {
      name: 'SecureW2',
      shortName: 'SecureW2',
      logo: './img/vendors/securew2.png',
      color: '#9b59b6',
      architecture: 'cloud',
      features: {
        cloudIntegration: true,
        legacyDevices: false,
        byod: true,
        iot: false,
        wireless: true,
        remoteUsers: true
      }
    },
    microsoft: {
      name: 'Microsoft Intune',
      shortName: 'Microsoft',
      logo: './img/vendors/microsoft.png',
      color: '#34495e',
      architecture: 'cloud',
      features: {
        cloudIntegration: true,
        legacyDevices: false,
        byod: true,
        iot: false,
        wireless: true,
        remoteUsers: true
      }
    }
  },
  
  // Chart configurations
  charts: {
    defaults: {
      fontFamily: '"Nunito", sans-serif',
      fontSize: 12,
      titleFontSize: 16,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          reset: false
        }
      }
    }
  },
  
  // Tab configurations
  tabs: {
    primary: [
      { id: 'executive', label: 'Executive Overview', icon: 'fas fa-chart-pie' },
      { id: 'financial', label: 'Financial Analysis', icon: 'fas fa-dollar-sign' },
      { id: 'security', label: 'Security & Compliance', icon: 'fas fa-shield-alt' },
      { id: 'technical', label: 'Technical Comparison', icon: 'fas fa-cogs' }
    ],
    secondary: {
      executive: [
        { id: 'executive-summary', label: 'Summary', icon: 'fas fa-file-alt' },
        { id: 'executive-impact', label: 'Business Impact', icon: 'fas fa-chart-line' },
        { id: 'executive-recommendations', label: 'Recommendations', icon: 'fas fa-lightbulb' }
      ],
      financial: [
        { id: 'financial-tco', label: 'TCO Analysis', icon: 'fas fa-calculator' },
        { id: 'financial-roi', label: 'ROI & Payback', icon: 'fas fa-hand-holding-usd' },
        { id: 'financial-comparison', label: 'Cost Comparison', icon: 'fas fa-balance-scale' }
      ],
      security: [
        { id: 'security-overview', label: 'Security Overview', icon: 'fas fa-shield-alt' },
        { id: 'security-compliance', label: 'Compliance', icon: 'fas fa-clipboard-check' },
        { id: 'security-risk', label: 'Risk Reduction', icon: 'fas fa-exclamation-triangle' }
      ],
      technical: [
        { id: 'technical-architecture', label: 'Architecture', icon: 'fas fa-network-wired' },
        { id: 'technical-features', label: 'Features', icon: 'fas fa-tasks' },
        { id: 'technical-integrations', label: 'Integrations', icon: 'fas fa-plug' }
      ]
    }
  },
  
  // Helper methods
  getVendorColor: function(vendorId, opacity = 1) {
    const vendor = this.vendors[vendorId];
    if (!vendor) return this.colors.chart[0];
    
    const color = vendor.color;
    
    // If opacity is not 1, convert to rgba
    if (opacity < 1) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    return color;
  },
  
  formatCurrency: function(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  },
  
  formatPercentage: function(value) {
    return value + '%';
  }
};

// Make it globally available
window.TCAConfig = TCAConfig;
EOL

# Create unified chart manager
cat > ./js/charts/chart-manager.js << 'EOL'
/**
 * Unified Chart Manager for Portnox Total Cost Analyzer
 * Manages all chart rendering across the application
 */

class ChartManager {
  constructor() {
    this.charts = {};
    this.config = window.TCAConfig || {};
    
    // Initialize specific chart managers
    this.apexManager = new ApexChartManager();
    this.highchartsManager = new HighchartsManager();
    this.d3Manager = new D3Manager();
    
    // Initialize all chart types
    this.initializeChartLibraries();
  }
  
  /**
   * Initialize chart libraries with common configurations
   */
  initializeChartLibraries() {
    // ApexCharts global defaults
    if (window.ApexCharts) {
      window.ApexCharts.defaultOptions = {
        chart: {
          fontFamily: this.config.charts.defaults.fontFamily,
          toolbar: this.config.charts.defaults.toolbar,
          animations: this.config.charts.defaults.animations
        },
        colors: this.config.colors.chart,
        title: {
          style: {
            fontSize: this.config.charts.defaults.titleFontSize + 'px',
            fontWeight: 600
          }
        },
        tooltip: {
          style: {
            fontSize: this.config.charts.defaults.fontSize + 'px'
          }
        }
      };
    }
    
    // Highcharts global defaults
    if (window.Highcharts) {
      Highcharts.setOptions({
        colors: this.config.colors.chart,
        chart: {
          style: {
            fontFamily: this.config.charts.defaults.fontFamily,
            fontSize: this.config.charts.defaults.fontSize + 'px'
          },
          animation: this.config.charts.defaults.animations,
          backgroundColor: null,
          borderRadius: 8,
          spacing: [20, 20, 20, 20]
        },
        title: {
          style: {
            fontFamily: this.config.charts.defaults.fontFamily,
            fontSize: this.config.charts.defaults.titleFontSize + 'px',
            fontWeight: 600
          }
        },
        credits: {
          enabled: false
        }
      });
    }
    
    // D3 doesn't have global defaults, handled in chart creation
  }
  
  /**
   * Create a chart with the appropriate library
   * @param {string} library - The chart library to use (apex, highcharts, d3)
   * @param {string} chartType - The type of chart to create
   * @param {string} elementId - The DOM element ID to render into
   * @param {object} data - The data for the chart
   * @param {object} options - Additional options for the chart
   * @returns {object} - The created chart object
   */
  createChart(library, chartType, elementId, data, options = {}) {
    const chartId = options.chartId || elementId;
    
    // Destroy existing chart if any
    this.destroyChart(chartId);
    
    let chart;
    
    // Create chart with the specified library
    switch (library.toLowerCase()) {
      case 'apex':
        chart = this.apexManager.createChart(chartType, elementId, data, options);
        break;
      case 'highcharts':
        chart = this.highchartsManager.createChart(chartType, elementId, data, options);
        break;
      case 'd3':
        chart = this.d3Manager.createChart(chartType, elementId, data, options);
        break;
      default:
        console.error(`Unknown chart library: ${library}`);
        return null;
    }
    
    // Store the chart for later reference
    if (chart) {
      this.charts[chartId] = {
        chart: chart,
        library: library.toLowerCase(),
        type: chartType
      };
    }
    
    return chart;
  }
  
  /**
   * Update an existing chart with new data
   * @param {string} chartId - The ID of the chart to update
   * @param {object} data - The new data for the chart
   * @param {object} options - Additional options for the update
   * @returns {object} - The updated chart object
   */
  updateChart(chartId, data, options = {}) {
    const chartInfo = this.charts[chartId];
    if (!chartInfo) {
      console.error(`Chart ${chartId} not found`);
      return null;
    }
    
    let chart;
    
    // Update with the appropriate manager
    switch (chartInfo.library) {
      case 'apex':
        chart = this.apexManager.updateChart(chartInfo.chart, data, options);
        break;
      case 'highcharts':
        chart = this.highchartsManager.updateChart(chartInfo.chart, data, options);
        break;
      case 'd3':
        chart = this.d3Manager.updateChart(chartInfo.chart, data, options);
        break;
      default:
        console.error(`Unknown chart library: ${chartInfo.library}`);
        return null;
    }
    
    return chart;
  }
  
  /**
   * Destroy a chart and remove it from the DOM
   * @param {string} chartId - The ID of the chart to destroy
   */
  destroyChart(chartId) {
    const chartInfo = this.charts[chartId];
    if (!chartInfo) return;
    
    // Destroy with the appropriate manager
    switch (chartInfo.library) {
      case 'apex':
        this.apexManager.destroyChart(chartInfo.chart);
        break;
      case 'highcharts':
        this.highchartsManager.destroyChart(chartInfo.chart);
        break;
      case 'd3':
        this.d3Manager.destroyChart(chartInfo.chart);
        break;
      default:
        console.error(`Unknown chart library: ${chartInfo.library}`);
        break;
    }
    
    // Remove from charts registry
    delete this.charts[chartId];
  }
  
  /**
   * Destroy all charts
   */
  destroyAllCharts() {
    Object.keys(this.charts).forEach(chartId => {
      this.destroyChart(chartId);
    });
  }
  
  /**
   * Initialize Financial View charts
   * @param {object} data - The data for the charts
   */
  initFinancialCharts(data) {
    // TCO Comparison Chart (Bar Chart - ApexCharts)
    this.createChart('apex', 'bar', 'tco-comparison-chart', data, {
      chartId: 'tcoComparisonChart',
      title: '3-Year TCO Comparison',
      xField: 'name',
      yField: 'tco',
      formatter: val => this.config.formatCurrency(val)
    });
    
    // Cumulative Cost Chart (Line Chart - ApexCharts)
    this.createChart('apex', 'line', 'cumulative-cost-chart', data, {
      chartId: 'cumulativeCostChart',
      title: 'Cumulative Cost Over Time',
      xField: 'period',
      yField: 'cumulative',
      formatter: val => this.config.formatCurrency(val)
    });
    
    // Cost Structure Chart (Stacked Bar Chart - ApexCharts)
    this.createChart('apex', 'stacked-bar', 'cost-structure-chart', data, {
      chartId: 'costStructureChart',
      title: 'Cost Structure Breakdown',
      xField: 'name',
      yFields: ['hardware', 'subscription', 'personnel', 'implementation', 'maintenance'],
      formatter: val => this.config.formatCurrency(val)
    });
    
    // ROI Chart (Mixed Chart - Highcharts)
    this.createChart('highcharts', 'column-line', 'roi-chart', data, {
      chartId: 'roiChart',
      title: 'ROI & Payback Analysis',
      series: [
        { type: 'column', name: 'Investment', data: data.investment },
        { type: 'column', name: 'Savings', data: data.savings },
        { type: 'line', name: 'Payback Period', data: data.payback, yAxis: 1 }
      ],
      formatter: val => this.config.formatCurrency(val)
    });
  }
  
  /**
   * Initialize Security View charts
   * @param {object} data - The data for the charts
   */
  initSecurityCharts(data) {
    // Security Capability Comparison (Tree Map - D3)
    this.createChart('d3', 'treemap', 'security-capability-chart', data, {
      chartId: 'securityCapabilityChart',
      title: 'Security Capability Comparison',
      valueField: 'score',
      groupBy: 'vendor',
      colorBy: 'category',
      formatter: val => val + '%'
    });
    
    // NIST Framework Coverage (Horizontal Bar Chart - ApexCharts)
    this.createChart('apex', 'horizontal-bar', 'nist-framework-chart', data, {
      chartId: 'nistFrameworkChart',
      title: 'NIST Cybersecurity Framework Coverage',
      xField: 'category',
      yField: 'coverage',
      groupBy: 'vendor',
      formatter: val => val + '%'
    });
    
    // Breach Impact Analysis (Column Chart with Drilldown - Highcharts)
    this.createChart('highcharts', 'column-drilldown', 'breach-impact-chart', data, {
      chartId: 'breachImpactChart',
      title: 'Potential Breach Impact Analysis',
      series: data.breachImpact.series,
      drilldown: data.breachImpact.drilldown,
      formatter: val => this.config.formatCurrency(val)
    });
    
    // Compliance Coverage (Heat Map - D3)
    this.createChart('d3', 'heatmap', 'compliance-coverage-chart', data, {
      chartId: 'complianceCoverageChart',
      title: 'Regulatory Compliance Coverage',
      xField: 'regulation',
      yField: 'vendor',
      valueField: 'coverage',
      formatter: val => val + '%'
    });
  }
  
  /**
   * Initialize Technical View charts
   * @param {object} data - The data for the charts
   */
  initTechnicalCharts(data) {
    // Architecture Comparison (Column Chart - ApexCharts)
    this.createChart('apex', 'column', 'architecture-chart', data, {
      chartId: 'architectureChart',
      title: 'Architecture Comparison',
      xField: 'architecture',
      yField: 'count',
      formatter: val => val
    });
    
    // Feature Comparison (Heat Map - D3)
    this.createChart('d3', 'heatmap', 'feature-comparison-chart', data, {
      chartId: 'featureComparisonChart',
      title: 'Feature Comparison',
      xField: 'feature',
      yField: 'vendor',
      valueField: 'supported',
      formatter: val => val ? 'Yes' : 'No'
    });
    
    // Deployment Time (Horizontal Bar Chart - ApexCharts)
    this.createChart('apex', 'horizontal-bar', 'deployment-time-chart', data, {
      chartId: 'deploymentTimeChart',
      title: 'Average Deployment Time',
      xField: 'vendor',
      yField: 'deploymentDays',
      formatter: val => val + ' days'
    });
    
    // Integration Capabilities (Network Graph - D3)
    this.createChart('d3', 'network', 'integration-capabilities-chart', data, {
      chartId: 'integrationCapabilitiesChart',
      title: 'Integration Capabilities',
      nodes: data.integrations.nodes,
      links: data.integrations.links
    });
  }
  
  /**
   * Initialize Executive View charts
   * @param {object} data - The data for the charts
   */
  initExecutiveCharts(data) {
    // Executive Summary Chart (Radar Chart - ApexCharts)
    this.createChart('apex', 'radar', 'executive-summary-chart', data, {
      chartId: 'executiveSummaryChart',
      title: 'Solution Comparison',
      categories: ['TCO', 'Security', 'Features', 'Deployment', 'Support'],
      series: data.executiveSummary
    });
    
    // Business Impact Chart (Bubble Chart - Highcharts)
    this.createChart('highcharts', 'bubble', 'business-impact-chart', data, {
      chartId: 'businessImpactChart',
      title: 'Business Impact Analysis',
      series: data.businessImpact
    });
    
    // Value Drivers Chart (Horizontal Bar Chart - ApexCharts)
    this.createChart('apex', 'horizontal-bar', 'value-drivers-chart', data, {
      chartId: 'valueDriversChart',
      title: 'Value Drivers',
      xField: 'driver',
      yField: 'value',
      groupBy: 'vendor',
      formatter: val => val + '%'
    });
    
    // ROI Summary Chart (Pie Chart - ApexCharts)
    this.createChart('apex', 'pie', 'roi-summary-chart', data, {
      chartId: 'roiSummaryChart',
      title: 'ROI Components',
      labels: data.roiSummary.labels,
      series: data.roiSummary.values,
      formatter: val => this.config.formatCurrency(val)
    });
  }
}

// Specific Chart Managers

/**
 * ApexCharts Manager
 */
class ApexChartManager {
  createChart(chartType, elementId, data, options) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element ${elementId} not found`);
      return null;
    }
    
    // Clear existing chart
    element.innerHTML = '';
    
    // Chart options based on type
    let chartOptions;
    
    switch (chartType) {
      case 'bar':
        chartOptions = this.createBarChartOptions(data, options);
        break;
      case 'line':
        chartOptions = this.createLineChartOptions(data, options);
        break;
      case 'stacked-bar':
        chartOptions = this.createStackedBarChartOptions(data, options);
        break;
      case 'horizontal-bar':
        chartOptions = this.createHorizontalBarChartOptions(data, options);
        break;
      case 'pie':
        chartOptions = this.createPieChartOptions(data, options);
        break;
      case 'radar':
        chartOptions = this.createRadarChartOptions(data, options);
        break;
      default:
        console.error(`Unknown ApexCharts chart type: ${chartType}`);
        return null;
    }
    
    // Add chart title if provided
    if (options.title) {
      chartOptions.title = {
        text: options.title,
        align: 'center',
        margin: 15
      };
    }
    
    // Create and render the chart
    const chart = new ApexCharts(element, chartOptions);
    chart.render();
    
    return chart;
  }
  
  updateChart(chart, data, options) {
    // Update the chart with new data
    chart.updateSeries(data.series || data);
    
    // Update options if provided
    if (options && Object.keys(options).length > 0) {
      chart.updateOptions(options);
    }
    
    return chart;
  }
  
  destroyChart(chart) {
    if (chart && typeof chart.destroy === 'function') {
      chart.destroy();
    }
  }
  
  // ApexCharts options generators for each chart type
  createBarChartOptions(data, options) {
    // Implementation details for bar chart options
    // This would be a complete implementation based on the data structure
    return {
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
      series: [{
        name: options.yField || 'Value',
        data: data
      }],
      // Additional options specific to bar charts
      // Would be fully implemented in the actual code
    };
  }
  
  // Similar methods for other chart types
  // Each would implement the specific options for that chart type
  
  createLineChartOptions(data, options) {
    // Implementation for line chart options
    return { /* Options for line chart */ };
  }
  
  createStackedBarChartOptions(data, options) {
    // Implementation for stacked bar chart options
    return { /* Options for stacked bar chart */ };
  }
  
  createHorizontalBarChartOptions(data, options) {
    // Implementation for horizontal bar chart options
    return { /* Options for horizontal bar chart */ };
  }
  
  createPieChartOptions(data, options) {
    // Implementation for pie chart options
    return { /* Options for pie chart */ };
  }
  
  createRadarChartOptions(data, options) {
    // Implementation for radar chart options
    return { /* Options for radar chart */ };
  }
}

/**
 * Highcharts Manager
 */
class HighchartsManager {
  createChart(chartType, elementId, data, options) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element ${elementId} not found`);
      return null;
    }
    
    // Chart options based on type
    let chartOptions;
    
    switch (chartType) {
      case 'column-line':
        chartOptions = this.createColumnLineChartOptions(data, options);
        break;
      case 'column-drilldown':
        chartOptions = this.createColumnDrilldownChartOptions(data, options);
        break;
      case 'bubble':
        chartOptions = this.createBubbleChartOptions(data, options);
        break;
      default:
        console.error(`Unknown Highcharts chart type: ${chartType}`);
        return null;
    }
    
    // Add chart title if provided
    if (options.title) {
      chartOptions.title = {
        text: options.title
      };
    }
    
    // Create and render the chart
    const chart = Highcharts.chart(element, chartOptions);
    
    return chart;
  }
  
  updateChart(chart, data, options) {
    // Update series data
    if (data && data.series) {
      data.series.forEach((series, i) => {
        if (chart.series[i]) {
          chart.series[i].setData(series.data, false);
        }
      });
    }
    
    // Update other options if provided
    if (options) {
      // Implementation would depend on which options need to be updated
    }
    
    // Redraw the chart
    chart.redraw();
    
    return chart;
  }
  
  destroyChart(chart) {
    if (chart && typeof chart.destroy === 'function') {
      chart.destroy();
    }
  }
  
  // Highcharts options generators for each chart type
  createColumnLineChartOptions(data, options) {
    // Implementation for column-line combo chart options
    return { /* Options for column-line chart */ };
  }
  
  createColumnDrilldownChartOptions(data, options) {
    // Implementation for column chart with drilldown
    return { /* Options for column drilldown chart */ };
  }
  
  createBubbleChartOptions(data, options) {
    // Implementation for bubble chart
    return { /* Options for bubble chart */ };
  }
}

/**
 * D3 Charts Manager
 */
class D3Manager {
  createChart(chartType, elementId, data, options) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element ${elementId} not found`);
      return null;
    }
    
    // Clear existing chart
    element.innerHTML = '';
    
    // Create chart based on type
    let chart;
    
    switch (chartType) {
      case 'treemap':
        chart = this.createTreemap(element, data, options);
        break;
      case 'heatmap':
        chart = this.createHeatmap(element, data, options);
        break;
      case 'network':
        chart = this.createNetworkGraph(element, data, options);
        break;
      default:
        console.error(`Unknown D3 chart type: ${chartType}`);
        return null;
    }
    
    // Add title if provided
    if (options.title) {
      const title = document.createElement('h3');
      title.className = 'chart-title';
      title.textContent = options.title;
      element.insertBefore(title, element.firstChild);
    }
    
    return chart;
  }
  
  updateChart(chart, data, options) {
    // D3 charts typically need to be redrawn with new data
    // This implementation would depend on the specific chart
    
    // For simplicity, we'll just call the create method again
    // In a real implementation, we'd update the existing visualization
    
    return chart;
  }
  
  destroyChart(chart) {
    // D3 doesn't have a standard destroy method
    // For our custom charts, we'd implement this as needed
    
    // For example, remove all SVG elements
    if (chart && chart.container) {
      d3.select(chart.container).selectAll('*').remove();
    }
  }
  
  // D3 chart creation methods
  createTreemap(container, data, options) {
    // Implementation for treemap visualization
    // Would use D3's treemap layout
    return { /* D3 treemap chart */ };
  }
  
  createHeatmap(container, data, options) {
    // Implementation for heatmap visualization
    return { /* D3 heatmap chart */ };
  }
  
  createNetworkGraph(container, data, options) {
    // Implementation for network graph
    return { /* D3 network graph */ };
  }
}

// Initialize global chart manager
document.addEventListener('DOMContentLoaded', function() {
  window.chartManager = new ChartManager();
});
EOL

# Create view manager to handle tab navigation
cat > ./js/core/view-manager.js << 'EOL'
/**
 * View Manager for Portnox Total Cost Analyzer
 * Manages the tab navigation and view content
 */

class ViewManager {
  constructor() {
    this.config = window.TCAConfig || {};
    this.activeView = {
      primary: 'executive',
      secondary: 'executive-summary'
    };
    this.viewContent = {};
    this.initialized = false;
  }
  
  /**
   * Initialize the view manager
   */
  init() {
    console.log('Initializing View Manager...');
    
    // Create the tab navigation
    this.createTabNavigation();
    
    // Initialize the view content
    this.initializeViewContent();
    
    // Set up event listeners
    this.setupEventListeners();
    
    this.initialized = true;
    
    // Set initial active view
    this.showView(this.activeView.primary, this.activeView.secondary);
    
    return this;
  }
  
  /**
   * Create the tab navigation elements
   */
  createTabNavigation() {
    // Create primary tabs
    const primaryTabsContainer = document.getElementById('primary-tabs');
    if (!primaryTabsContainer) {
      console.error('Primary tabs container not found');
      return;
    }
    
    // Clear existing tabs
    primaryTabsContainer.innerHTML = '';
    
    // Add primary tabs
    this.config.tabs.primary.forEach(tab => {
      const tabElement = document.createElement('div');
      tabElement.className = 'tab-item';
      tabElement.dataset.tab = tab.id;
      
      const icon = document.createElement('i');
      icon.className = tab.icon;
      tabElement.appendChild(icon);
      
      const label = document.createElement('span');
      label.textContent = tab.label;
      tabElement.appendChild(label);
      
      primaryTabsContainer.appendChild(tabElement);
    });
    
    // Create secondary tabs containers for each primary tab
    const secondaryTabsContainer = document.getElementById('secondary-tabs');
    if (!secondaryTabsContainer) {
      console.error('Secondary tabs container not found');
      return;
    }
    
    // Clear existing secondary tabs containers
    secondaryTabsContainer.innerHTML = '';
    
    // Create a container for each primary tab's secondary tabs
    Object.keys(this.config.tabs.secondary).forEach(primaryTabId => {
      const secondaryTabs = this.config.tabs.secondary[primaryTabId];
      
      const tabContainer = document.createElement('div');
      tabContainer.className = 'secondary-tabs-container';
      tabContainer.id = `${primaryTabId}-tabs`;
      tabContainer.dataset.primaryTab = primaryTabId;
      
      // Add secondary tabs
      secondaryTabs.forEach(tab => {
        const tabElement = document.createElement('div');
        tabElement.className = 'tab-item';
        tabElement.dataset.tab = tab.id;
        
        const icon = document.createElement('i');
        icon.className = tab.icon;
        tabElement.appendChild(icon);
        
        const label = document.createElement('span');
        label.textContent = tab.label;
        tabElement.appendChild(label);
        
        tabContainer.appendChild(tabElement);
      });
      
      secondaryTabsContainer.appendChild(tabContainer);
    });
  }
  
  /**
   * Initialize view content containers
   */
  initializeViewContent() {
    // Get the main content container
    const contentContainer = document.getElementById('main-content');
    if (!contentContainer) {
      console.error('Main content container not found');
      return;
    }
    
    // Clear existing content
    contentContainer.innerHTML = '';
    
    // Create view containers for each secondary tab
    Object.keys(this.config.tabs.secondary).forEach(primaryTabId => {
      const secondaryTabs = this.config.tabs.secondary[primaryTabId];
      
      secondaryTabs.forEach(tab => {
        const viewContainer = document.createElement('div');
        viewContainer.className = 'view-container';
        viewContainer.id = `${tab.id}-container`;
        viewContainer.dataset.view = tab.id;
        
        // Add placeholder content
        viewContainer.innerHTML = `
          <div class="section-header">
            <h2>${tab.label}</h2>
            <div class="section-actions">
              <button class="btn btn-sm btn-primary refresh-view">
                <i class="fas fa-sync-alt"></i> Refresh
              </button>
              <button class="btn btn-sm btn-outline-primary export-view">
                <i class="fas fa-download"></i> Export
              </button>
            </div>
          </div>
          <div class="view-content" id="${tab.id}">
            <div class="loading-placeholder">
              <i class="fas fa-spinner fa-spin"></i>
              <p>Loading ${tab.label} view...</p>
            </div>
          </div>
        `;
        
        contentContainer.appendChild(viewContainer);
      });
    });
  }
  
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Primary tab click
    const primaryTabs = document.querySelectorAll('#primary-tabs .tab-item');
    primaryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.dataset.tab;
        const firstSecondaryTab = this.config.tabs.secondary[tabId][0].id;
        this.showView(tabId, firstSecondaryTab);
      });
    });
    
    // Secondary tab click
    const secondaryTabs = document.querySelectorAll('.secondary-tabs-container .tab-item');
    secondaryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.dataset.tab;
        const primaryTabId = tab.parentElement.dataset.primaryTab;
        this.showView(primaryTabId, tabId);
      });
    });
    
    // Refresh view button click
    const refreshButtons = document.querySelectorAll('.refresh-view');
    refreshButtons.forEach(button => {
      button.addEventListener('click', () => {
        const viewContainer = button.closest('.view-container');
        const viewId = viewContainer.dataset.view;
        this.refreshView(viewId);
      });
    });
    
    // Export view button click
    const exportButtons = document.querySelectorAll('.export-view');
    exportButtons.forEach(button => {
      button.addEventListener('click', () => {
        const viewContainer = button.closest('.view-container');
        const viewId = viewContainer.dataset.view;
        this.exportView(viewId);
      });
    });
  }
  
  /**
   * Show the specified view
   * @param {string} primaryTabId - The ID of the primary tab
   * @param {string} secondaryTabId - The ID of the secondary tab
   */
  showView(primaryTabId, secondaryTabId) {
    console.log(`Showing view: ${primaryTabId} / ${secondaryTabId}`);
    
    // Update active tab classes
    
    // Primary tabs
    const primaryTabs = document.querySelectorAll('#primary-tabs .tab-item');
    primaryTabs.forEach(tab => {
      if (tab.dataset.tab === primaryTabId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Secondary tabs containers
    const secondaryTabsContainers = document.querySelectorAll('.secondary-tabs-container');
    secondaryTabsContainers.forEach(container => {
      if (container.dataset.primaryTab === primaryTabId) {
        container.classList.add('active');
      } else {
        container.classList.remove('active');
      }
    });
    
    // Secondary tabs
    const secondaryTabs = document.querySelectorAll('.secondary-tabs-container .tab-item');
    secondaryTabs.forEach(tab => {
      if (tab.dataset.tab === secondaryTabId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Show the selected view container
    const viewContainers = document.querySelectorAll('.view-container');
    viewContainers.forEach(container => {
      if (container.dataset.view === secondaryTabId) {
        container.classList.add('active');
      } else {
        container.classList.remove('active');
      }
    });
    
    // Update active view
    this.activeView = {
      primary: primaryTabId,
      secondary: secondaryTabId
    };
    
    // Load view content if needed
    this.loadViewContent(secondaryTabId);
  }
  
  /**
   * Load the content for a view
   * @param {string} viewId - The ID of the view to load
   */
  loadViewContent(viewId) {
    // Check if content is already loaded
    if (this.viewContent[viewId]) {
      return;
    }
    
    console.log(`Loading content for view: ${viewId}`);
    
    // Get the view container
    const viewContainer = document.getElementById(viewId);
    if (!viewContainer) {
      console.error(`View container ${viewId} not found`);
      return;
    }
    
    // Show loading indicator
    viewContainer.innerHTML = `
      <div class="loading-indicator">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Loading content...</p>
      </div>
    `;
    
    // Load the view content based on the view ID
    switch (viewId) {
      case 'executive-summary':
        this.loadExecutiveSummary(viewContainer);
        break;
      case 'executive-impact':
        this.loadExecutiveImpact(viewContainer);
        break;
      case 'executive-recommendations':
        this.loadExecutiveRecommendations(viewContainer);
        break;
      case 'financial-tco':
        this.loadFinancialTCO(viewContainer);
        break;
      case 'financial-roi':
        this.loadFinancialROI(viewContainer);
        break;
      case 'financial-comparison':
        this.loadFinancialComparison(viewContainer);
        break;
      case 'security-overview':
        this.loadSecurityOverview(viewContainer);
        break;
      case 'security-compliance':
        this.loadSecurityCompliance(viewContainer);
        break;
      case 'security-risk':
        this.loadSecurityRisk(viewContainer);
        break;
      case 'technical-architecture':
        this.loadTechnicalArchitecture(viewContainer);
        break;
      case 'technical-features':
        this.loadTechnicalFeatures(viewContainer);
        break;
      case 'technical-integrations':
        this.loadTechnicalIntegrations(viewContainer);
        break;
      default:
        console.error(`Unknown view ID: ${viewId}`);
        viewContainer.innerHTML = `
          <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Unknown view: ${viewId}</p>
          </div>
        `;
        return;
    }
    
    // Mark as loaded
    this.viewContent[viewId] = true;
  }
  
  /**
   * Refresh the specified view
   * @param {string} viewId - The ID of the view to refresh
   */
  refreshView(viewId) {
    console.log(`Refreshing view: ${viewId}`);
    
    // Reset the view content
    delete this.viewContent[viewId];
    
    // Reload the view
    this.loadViewContent(viewId);
  }
  
  /**
   * Export the specified view
   * @param {string} viewId - The ID of the view to export
   */
  exportView(viewId) {
    console.log(`Exporting view: ${viewId}`);
    
    // Implementation would depend on the export format and requirements
    alert(`Export functionality for ${viewId} is not yet implemented`);
  }
  
  // View content loaders
  
  /**
   * Load Executive Summary content
   * @param {HTMLElement} container - The container to load into
   */
  loadExecutiveSummary(container) {
    // This would load the Executive Summary content
    // Implementation details would depend on the specific requirements
    
    // For demonstration, we'll create a simple layout
    container.innerHTML = `
      <div class="card mb-4">
        <div class="card-body">
          <h3 class="card-title">Key Findings</h3>
          <p class="card-text">
            The Portnox Cloud NAC solution offers the lowest TCO among all compared vendors,
            with superior security capabilities and fastest deployment time.
          </p>
          <div id="executive-summary-chart" class="chart-container" style="height: 400px;"></div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">TCO Highlights</h3>
              <div id="roi-summary-chart" class="chart-container" style="height: 300px;"></div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">Value Drivers</h3>
              <div id="value-drivers-chart" class="chart-container" style="height: 300px;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Initialize charts (would use real data in a complete implementation)
    setTimeout(() => {
      if (window.chartManager) {
        window.chartManager.initExecutiveCharts({
          // Sample data for charts
          executiveSummary: [
            { name: 'Portnox', data: [85, 95, 90, 95, 85] },
            { name: 'Cisco', data: [60, 80, 75, 55, 70] },
            { name: 'Other', data: [70, 65, 60, 60, 75] }
          ],
          roiSummary: {
            labels: ['Hardware Savings', 'Personnel Savings', 'Subscription', 'Implementation'],
            values: [125000, 200000, 150000, 25000]
          },
          valueDrivers: [
            { driver: 'Reduced Incidents', value: 85 },
            { driver: 'Faster Deployment', value: 90 },
            { driver: 'Lower Maintenance', value: 75 },
            { driver: 'Cloud Architecture', value: 95 }
          ]
        });
      }
    }, 500);
  }
  
  /**
   * Load Executive Impact content
   * @param {HTMLElement} container - The container to load into
   */
  loadExecutiveImpact(container) {
    // Implementation for Executive Impact content
    container.innerHTML = `
      <div class="card mb-4">
        <div class="card-body">
          <h3 class="card-title">Business Impact Analysis</h3>
          <div id="business-impact-chart" class="chart-container" style="height: 400px;"></div>
        </div>
      </div>
      
      <!-- Additional content would be implemented here -->
    `;
    
    // Initialize charts
    // Similar to Executive Summary implementation
  }
  
  // Other view content loaders would be implemented here
  // For brevity, I'll only show additional examples for Financial and Security views
  
  /**
   * Load Financial TCO content
   * @param {HTMLElement} container - The container to load into
   */
  loadFinancialTCO(container) {
    container.innerHTML = `
      <div class="row">
        <div class="col-lg-12">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">3-Year TCO Comparison</h3>
              <div id="tco-comparison-chart" class="chart-container" style="height: 400px;"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">Cost Structure Breakdown</h3>
              <div id="cost-structure-chart" class="chart-container" style="height: 300px;"></div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">Cumulative Cost Over Time</h3>
              <div id="cumulative-cost-chart" class="chart-container" style="height: 300px;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Initialize charts
    setTimeout(() => {
      if (window.chartManager) {
        window.chartManager.initFinancialCharts({
          // Sample data for charts
          // Would be replaced with real data in a complete implementation
        });
      }
    }, 500);
  }
  
  /**
   * Load Security Overview content
   * @param {HTMLElement} container - The container to load into
   */
  loadSecurityOverview(container) {
    container.innerHTML = `
      <div class="row">
        <div class="col-lg-12">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">Security Capability Comparison</h3>
              <div id="security-capability-chart" class="chart-container" style="height: 500px;"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">NIST Framework Coverage</h3>
              <div id="nist-framework-chart" class="chart-container" style="height: 400px;"></div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">Breach Impact Analysis</h3>
              <div id="breach-impact-chart" class="chart-container" style="height: 400px;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Initialize charts
    setTimeout(() => {
      if (window.chartManager) {
        window.chartManager.initSecurityCharts({
          // Sample data for security charts
        });
      }
    }, 500);
  }
}

// Initialize global view manager
document.addEventListener('DOMContentLoaded', function() {
  window.viewManager = new ViewManager();
  window.viewManager.init();
});
EOL

# Create modern CSS styles with vibrant colors
cat > ./css/themes/modern.css << 'EOL'
/**
 * Modern Theme for Portnox Total Cost Analyzer
 * Features vibrant colors, gradients, and a modern design
 */

:root {
  /* Primary Colors */
  --primary: #1a5a96;
  --primary-light: #2980b9;
  --primary-dark: #0d4275;
  --primary-gradient: linear-gradient(135deg, #1a5a96 0%, #2980b9 100%);
  
  /* Secondary Colors */
  --secondary: #e74c3c;
  --secondary-light: #f16354;
  --secondary-dark: #c0392b;
  --secondary-gradient: linear-gradient(135deg, #e74c3c 0%, #f16354 100%);
  
  /* Accent Colors */
  --success: #27ae60;
  --warning: #f39c12;
  --danger: #c0392b;
  --info: #3498db;
  --neutral: #7f8c8d;
  
  /* Gradient Presets */
  --gradient-blue: linear-gradient(135deg, #1a5a96 0%, #3498db 100%);
  --gradient-green: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  --gradient-orange: linear-gradient(135deg, #e67e22 0%, #f39c12 100%);
  --gradient-purple: linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%);
  --gradient-red: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
  
  /* Background Colors */
  --bg-light: #ffffff;
  --bg-dark: #2c3e50;
  --bg-light-gray: #f5f7fa;
  --bg-dark-gray: #34495e;
  
  /* Text Colors */
  --text-dark: #2c3e50;
  --text-light: #ffffff;
  --text-muted: #7f8c8d;
  
  /* Border Colors */
  --border-light: #e0e6ed;
  --border-dark: #c0c6d0;
  
  /* Shadow */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  
  /* Font */
  --font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Global Styles */
body {
  font-family: var(--font-family);
  color: var(--text-dark);
  background-color: var(--bg-light-gray);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

a {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--primary-light);
  text-decoration: none;
}

/* Header */
.app-header {
  background: var(--primary-gradient);
  color: var(--text-light);
  padding: var(--spacing-md) var(--spacing-lg);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.app-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%);
  pointer-events: none;
}

.app-title {
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.app-title i {
  font-size: 1.2em;
}

/* Tab Navigation */
.tab-navigation {
  background-color: var(--bg-light);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.primary-tabs {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  background: var(--bg-dark-gray);
  padding: 0;
  margin: 0;
  border-bottom: 3px solid var(--primary);
}

.tab-item {
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--text-light);
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: all 0.3s ease;
  white-space: nowrap;
  position: relative;
}

.primary-tabs .tab-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.primary-tabs .tab-item.active {
  color: var(--text-light);
  background-color: var(--primary);
}

.primary-tabs .tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: var(--primary-light);
}

.secondary-tabs-container {
  display: none;
  background-color: var(--bg-light);
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);
}

.secondary-tabs-container.active {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.secondary-tabs-container .tab-item {
  color: var(--text-dark);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-bottom: 3px solid transparent;
}

.secondary-tabs-container .tab-item:hover {
  color: var(--primary);
  background-color: rgba(0, 0, 0, 0.03);
}

.secondary-tabs-container .tab-item.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
  background-color: transparent;
}

/* Main Content */
.main-content {
  padding: var(--spacing-lg);
}

.view-container {
  display: none;
}

.view-container.active {
  display: block;
}

/* Cards */
.card {
  background-color: var(--bg-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-lg);
  border: none;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card-header {
  background-color: var(--bg-light);
  border-bottom: 1px solid var(--border-light);
  padding: var(--spacing-md) var(--spacing-lg);
  font-weight: 600;
}

.card-body {
  padding: var(--spacing-lg);
}

.card-title {
  margin-top: 0;
  margin-bottom: var(--spacing-md);
  font-weight: 600;
  color: var(--text-dark);
}

/* Section Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.section-header h2 {
  margin: 0;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--text-dark);
}

.section-actions {
  display: flex;
  gap: var(--spacing-sm);
}

/* Chart Container */
.chart-container {
  width: 100%;
  height: 300px;
  position: relative;
}

/* Loading Indicators */
.loading-placeholder, .loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  color: var(--text-muted);
}

.loading-placeholder i, .loading-indicator i {
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-weight: 600;
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.875rem;
}

.btn-primary {
  background: var(--primary-gradient);
  color: var(--text-light);
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-outline-primary {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.btn-outline-primary:hover {
  background-color: rgba(26, 90, 150, 0.1);
  transform: translateY(-2px);
}

/* Sidebar */
.sidebar {
  background-color: var(--bg-light);
  box-shadow: var(--shadow-md);
  width: 300px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 200;
  transition: transform 0.3s ease;
  overflow-y: auto;
  padding-top: 60px; /* Header height */
}

.sidebar.collapsed {
  transform: translateX(-300px);
}

.sidebar-header {
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-content {
  padding: var(--spacing-md);
}

.config-card {
  background-color: var(--bg-light);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-md);
  overflow: hidden;
}

.config-card-header {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--bg-light-gray);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.config-card-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.config-card-content {
  padding: var(--spacing-md);
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.config-card-content.collapsed {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
}

/* Vendor Selection */
.vendor-select-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
}

.vendor-select-card {
  height: 90px;
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  cursor: pointer;
}

.vendor-select-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-sm);
  border-color: var(--primary);
}

.vendor-select-card.selected {
  border-color: var(--primary);
  background-color: rgba(26, 90, 150, 0.05);
}

.vendor-logo {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vendor-logo img {
  max-height: 35px;
  max-width: 80px;
  object-fit: contain;
}

.vendor-name {
  font-size: 0.75rem;
  text-align: center;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* Range Sliders */
.range-slider {
  margin-bottom: var(--spacing-md);
}

.range-slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
}

.range-slider-label {
  font-size: 0.85rem;
  font-weight: 600;
}

.range-slider-value {
  font-weight: 600;
  color: var(--primary);
}

input[type="range"] {
  width: 100%;
  height: 5px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(to right, var(--primary) 0%, var(--primary) 50%, var(--border-light) 50%, var(--border-light) 100%);
  border-radius: 10px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  border: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 260px;
    transform: translateX(-260px);
  }
  
  .sidebar.active {
    transform: translateX(0);
  }
  
  .main-content {
    padding: var(--spacing-md);
  }
  
  .tab-item {
    padding: var(--spacing-sm) var(--spacing-md);
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes slideInUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.slide-in-up {
  animation: slideInUp 0.4s ease-in-out;
}

/* Chart Title */
.chart-title {
  text-align: center;
  margin-top: 0;
  margin-bottom: var(--spacing-md);
  font-weight: 600;
  font-size: 1.1rem;
}

/* Gradient Text */
.gradient-text {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

/* Custom Gradients for Cards */
.card-gradient-blue {
  background: linear-gradient(135deg, var(--bg-light) 0%, rgba(41, 128, 185, 0.1) 100%);
}

.card-gradient-green {
  background: linear-gradient(135deg, var(--bg-light) 0%, rgba(39, 174, 96, 0.1) 100%);
}

.card-gradient-orange {
  background: linear-gradient(135deg, var(--bg-light) 0%, rgba(243, 156, 18, 0.1) 100%);
}

.card-gradient-purple {
  background: linear-gradient(135deg, var(--bg-light) 0%, rgba(155, 89, 182, 0.1) 100%);
}
EOL

# Create core index.html with new structure
cat > ./index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portnox Total Cost Analyzer</title>
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet">
  
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  
  <!-- Chart Libraries -->
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/highcharts-more.js"></script>
  <script src="https://code.highcharts.com/modules/heatmap.js"></script>
  <script src="https://code.highcharts.com/modules/treemap.js"></script>
  <script src="https://code.highcharts.com/modules/drilldown.js"></script>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  
  <!-- Application Styles -->
  <link rel="stylesheet" href="./css/themes/modern.css">
</head>
<body>
  <div class="app-container">
    <!-- Header -->
    <header class="app-header">
      <h1 class="app-title">
        <i class="fas fa-chart-line"></i>
        Portnox Total Cost Analyzer
      </h1>
      
      <!-- Header Actions -->
      <div class="header-actions">
        <button id="sidebar-toggle" class="btn btn-sm btn-outline-light">
          <i class="fas fa-sliders-h"></i>
          <span>Configuration</span>
        </button>
      </div>
    </header>
    
    <!-- Tab Navigation -->
    <nav class="tab-navigation">
      <!-- Primary Tabs -->
      <div id="primary-tabs" class="primary-tabs"></div>
      
      <!-- Secondary Tabs -->
      <div id="secondary-tabs" class="secondary-tabs"></div>
    </nav>
    
    <!-- Main Content -->
    <main id="main-content" class="main-content"></main>
    
    <!-- Sidebar -->
    <aside id="sidebar" class="sidebar">
      <div class="sidebar-header">
        <h2>Configuration</h2>
        <button id="sidebar-close" class="btn btn-sm btn-text">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="sidebar-content">
        <!-- Organization Configuration -->
        <div id="organization-config" class="config-card">
          <div class="config-card-header">
            <h3><i class="fas fa-building"></i> Organization</h3>
            <i class="fas fa-chevron-up toggle-icon"></i>
          </div>
          <div class="config-card-content">
            <div class="form-group">
              <label for="organization-name">Organization Name</label>
              <input type="text" id="organization-name" class="form-control" value="Example Corp">
            </div>
            
            <div class="form-group">
              <label for="industry">Industry</label>
              <select id="industry" class="form-control">
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="technology" selected>Technology</option>
                <option value="government">Government</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="number-of-employees">Number of Employees</label>
              <input type="number" id="number-of-employees" class="form-control" value="1000">
            </div>
            
            <div class="form-group">
              <label for="number-of-devices">Number of Devices</label>
              <input type="number" id="number-of-devices" class="form-control" value="2000">
            </div>
          </div>
        </div>
        
        <!-- Cost Configuration -->
        <div id="cost-config" class="config-card">
          <div class="config-card-header">
            <h3><i class="fas fa-dollar-sign"></i> Cost Parameters</h3>
            <i class="fas fa-chevron-up toggle-icon"></i>
          </div>
          <div class="config-card-content">
            <div class="range-slider">
              <div class="range-slider-header">
                <span class="range-slider-label">License Cost ($/device/year)</span>
                <span class="range-slider-value" id="license-cost-value">$50</span>
              </div>
              <input type="range" id="license-cost" min="0" max="200" value="50" step="1">
            </div>
            
            <div class="range-slider">
              <div class="range-slider-header">
                <span class="range-slider-label">Hardware Cost ($/device)</span>
                <span class="range-slider-value" id="hardware-cost-value">$100</span>
              </div>
              <input type="range" id="hardware-cost" min="0" max="500" value="100" step="10">
            </div>
            
            <div class="range-slider">
              <div class="range-slider-header">
                <span class="range-slider-label">Implementation Cost ($)</span>
                <span class="range-slider-value" id="implementation-cost-value">$10,000</span>
              </div>
              <input type="range" id="implementation-cost" min="0" max="100000" value="10000" step="1000">
            </div>
            
            <div class="range-slider">
              <div class="range-slider-header">
                <span class="range-slider-label">Maintenance (% of license)</span>
                <span class="range-slider-value" id="maintenance-value">20%</span>
              </div>
              <input type="range" id="maintenance-percentage" min="0" max="40" value="20" step="1">
            </div>
            
            <div class="range-slider">
              <div class="range-slider-header">
                <span class="range-slider-label">FTE Cost ($/year)</span>
                <span class="range-slider-value" id="fte-cost-value">$100,000</span>
              </div>
              <input type="range" id="fte-cost" min="60000" max="180000" value="100000" step="5000">
            </div>
          </div>
        </div>
        
        <!-- Vendor Selection -->
        <div id="vendor-config" class="config-card">
          <div class="config-card-header">
            <h3><i class="fas fa-server"></i> Vendors</h3>
            <i class="fas fa-chevron-up toggle-icon"></i>
          </div>
          <div class="config-card-content">
            <p class="vendor-info">
              Select the vendors to include in the analysis:
              <span id="vendor-counter">
                <span id="vendor-counter-value">1</span> selected
              </span>
            </p>
            
            <div class="vendor-select-grid" id="vendor-select-grid">
              <!-- Vendor cards will be inserted here by JavaScript -->
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
  
  <!-- Application Scripts -->
  <script src="./js/core/config.js"></script>
  <script src="./js/charts/chart-manager.js"></script>
  <script src="./js/core/view-manager.js"></script>
  <script src="./js/components/sidebar-manager.js"></script>
  <script src="./js/components/vendor-manager.js"></script>
  <script src="./js/core/app.js"></script>
</body>
</html>
EOL

# Create initial vendor-manager.js
cat > ./js/components/vendor-manager.js << 'EOL'
/**
 * Vendor Manager for Portnox Total Cost Analyzer
 * Manages vendor selection and displays
 */

class VendorManager {
  constructor() {
    this.config = window.TCAConfig || {};
    this.selectedVendors = ['portnox']; // Always include Portnox
    this.initialized = false;
  }
  
  /**
   * Initialize the vendor manager
   */
  init() {
    console.log('Initializing Vendor Manager...');
    
    // Create vendor cards
    this.createVendorCards();
    
    // Set up event listeners
    this.setupEventListeners();
    
    this.initialized = true;
    
    return this;
  }
  
  /**
   * Create vendor selection cards
   */
  createVendorCards() {
    const vendorGrid = document.getElementById('vendor-select-grid');
    if (!vendorGrid) {
      console.error('Vendor grid not found');
      return;
    }
    
    // Clear existing cards
    vendorGrid.innerHTML = '';
    
    // Create a card for each vendor
    Object.keys(this.config.vendors).forEach(vendorId => {
      const vendor = this.config.vendors[vendorId];
      
      const card = document.createElement('div');
      card.className = 'vendor-select-card';
      card.dataset.vendor = vendorId;
      
      // Select Portnox by default
      if (vendorId === 'portnox') {
        card.classList.add('selected');
      }
      
      const logoContainer = document.createElement('div');
      logoContainer.className = 'vendor-logo';
      
      const logo = document.createElement('img');
      logo.src = vendor.logo;
      logo.alt = vendor.name;
      logo.onerror = function() {
        // If logo fails to load, show vendor name as text
        this.style.display = 'none';
        logoContainer.innerHTML = `<span>${vendor.shortName}</span>`;
      };
      
      logoContainer.appendChild(logo);
      
      const name = document.createElement('div');
      name.className = 'vendor-name';
      name.textContent = vendor.name;
      
      card.appendChild(logoContainer);
      card.appendChild(name);
      
      vendorGrid.appendChild(card);
    });
  }
  
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Vendor card click
    const vendorCards = document.querySelectorAll('.vendor-select-card');
    vendorCards.forEach(card => {
      card.addEventListener('click', () => {
        this.toggleVendorSelection(card.dataset.vendor, card);
      });
    });
  }
  
  /**
   * Toggle vendor selection
   * @param {string} vendorId - The ID of the vendor to toggle
   * @param {HTMLElement} card - The vendor card element
   */
  toggleVendorSelection(vendorId, card) {
    // Can't deselect Portnox
    if (vendorId === 'portnox') {
      if (!this.selectedVendors.includes(vendorId)) {
        this.selectedVendors.push(vendorId);
        card.classList.add('selected');
      }
      return;
    }
    
    // Toggle selection
    if (this.selectedVendors.includes(vendorId)) {
      // Remove from selected vendors
      this.selectedVendors = this.selectedVendors.filter(id => id !== vendorId);
      card.classList.remove('selected');
    } else {
      // Check if we're at the limit (3 vendors max)
      if (this.selectedVendors.length >= 3) {
        alert('You can select a maximum of 3 vendors to compare');
        return;
      }
      
      // Add to selected vendors
      this.selectedVendors.push(vendorId);
      card.classList.add('selected');
    }
    
    // Update counter
    this.updateVendorCounter();
    
    // Trigger event for other components
    this.triggerVendorSelectionChange();
  }
  
  /**
   * Update the vendor counter
   */
  updateVendorCounter() {
    const counterElement = document.getElementById('vendor-counter-value');
    if (counterElement) {
      counterElement.textContent = this.selectedVendors.length;
    }
  }
  
  /**
   * Trigger vendor selection change event
   */
  triggerVendorSelectionChange() {
    const event = new CustomEvent('vendorSelectionChange', {
      detail: {
        selectedVendors: this.selectedVendors
      }
    });
    
    document.dispatchEvent(event);
  }
  
  /**
   * Get selected vendors
   * @returns {string[]} - Array of selected vendor IDs
   */
  getSelectedVendors() {
    return this.selectedVendors;
  }
}

// Initialize global vendor manager
document.addEventListener('DOMContentLoaded', function() {
  window.vendorManager = new VendorManager();
  window.vendorManager.init();
});
EOL

# Create sidebar-manager.js 
cat > ./js/components/sidebar-manager.js << 'EOL'
/**
 * Sidebar Manager for Portnox Total Cost Analyzer
 * Manages sidebar behavior and configuration cards
 */

class SidebarManager {
  constructor() {
    this.sidebar = null;
    this.sidebarToggle = null;
    this.sidebarClose = null;
    this.initialized = false;
  }
  
  /**
   * Initialize the sidebar manager
   */
  init() {
    console.log('Initializing Sidebar Manager...');
    
    // Find sidebar elements
    this.sidebar = document.getElementById('sidebar');
    this.sidebarToggle = document.getElementById('sidebar-toggle');
    this.sidebarClose = document.getElementById('sidebar-close');
    
    if (!this.sidebar || !this.sidebarToggle) {
      console.error('Sidebar elements not found');
      return false;
    }
    
    // Set up sidebar toggle
    this.setupSidebarToggle();
    
    // Set up config cards
    this.setupConfigCards();
    
    // Set up range sliders
    this.setupRangeSliders();
    
    this.initialized = true;
    return true;
  }
  
  /**
   * Set up the sidebar toggle button
   */
  setupSidebarToggle() {
    // Toggle sidebar on toggle button click
    this.sidebarToggle.addEventListener('click', () => {
      this.toggleSidebar();
    });
    
    // Close sidebar on close button click
    if (this.sidebarClose) {
      this.sidebarClose.addEventListener('click', () => {
        this.sidebar.classList.add('collapsed');
      });
    }
    
    // Close sidebar when clicking outside (on mobile)
    document.addEventListener('click', (event) => {
      if (
        !this.sidebar.contains(event.target) && 
        !this.sidebarToggle.contains(event.target) &&
        window.innerWidth <= 768 &&
        !this.sidebar.classList.contains('collapsed')
      ) {
        this.sidebar.classList.add('collapsed');
      }
    });
  }
  
  /**
   * Toggle sidebar visibility
   */
  toggleSidebar() {
    this.sidebar.classList.toggle('collapsed');
  }
  
  /**
   * Set up config cards (collapse/expand)
   */
  setupConfigCards() {
    const configCards = document.querySelectorAll('.config-card');
    
    configCards.forEach(card => {
      const header = card.querySelector('.config-card-header');
      const content = card.querySelector('.config-card-content');
      const toggleIcon = card.querySelector('.toggle-icon');
      
      if (!header || !content) return;
      
      // Make sure transition styling is applied
      content.style.transition = 'max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease';
      
      // Add click handler
      header.addEventListener('click', () => {
        this.toggleConfigCard(content, toggleIcon);
      });
    });
  }
  
  /**
   * Toggle config card expansion/collapse
   * @param {HTMLElement} content - The content element
   * @param {HTMLElement} toggleIcon - The toggle icon element
   */
  toggleConfigCard(content, toggleIcon) {
    if (content.classList.contains('collapsed')) {
      // Expand
      content.classList.remove('collapsed');
      if (toggleIcon) toggleIcon.classList.remove('collapsed');
      
      // First set height to 0 then animate to full height
      content.style.maxHeight = '0px';
      
      // Force reflow
      content.offsetHeight;
      
      // Set target height
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.paddingTop = '';
      content.style.paddingBottom = '';
      content.style.opacity = '1';
      
      // Remove max-height after transition to allow content to grow if needed
      setTimeout(() => {
        content.style.maxHeight = '';
      }, 300);
    } else {
      // Collapse
      // First set explicit height for transition
      content.style.maxHeight = content.scrollHeight + 'px';
      
      // Force reflow
      content.offsetHeight;
      
      // Animate to collapsed state
      content.style.maxHeight = '0px';
      content.style.paddingTop = '0';
      content.style.paddingBottom = '0';
      content.style.opacity = '0';
      
      // Add collapsed class after transition
      setTimeout(() => {
        content.classList.add('collapsed');
        if (toggleIcon) toggleIcon.classList.add('collapsed');
      }, 300);
    }
  }
  
  /**
   * Set up range sliders
   */
  setupRangeSliders() {
    const rangeSliders = document.querySelectorAll('input[type="range"]');
    
    rangeSliders.forEach(slider => {
      // Get value display element
      const valueId = `${slider.id}-value`;
      const valueDisplay = document.getElementById(valueId);
      
      // Update initial value
      if (valueDisplay) {
        this.updateRangeSliderValue(slider, valueDisplay);
      }
      
      // Update background gradient
      this.updateRangeSliderBackground(slider);
      
      // Add input event listener
      slider.addEventListener('input', () => {
        if (valueDisplay) {
          this.updateRangeSliderValue(slider, valueDisplay);
        }
        this.updateRangeSliderBackground(slider);
        
        // Dispatch change event
        const event = new CustomEvent('configValueChange', {
          detail: {
            id: slider.id,
            value: slider.value
          }
        });
        document.dispatchEvent(event);
      });
    });
  }
  
  /**
   * Update range slider value display
   * @param {HTMLElement} slider - The range slider element
   * @param {HTMLElement} valueDisplay - The value display element
   */
  updateRangeSliderValue(slider, valueDisplay) {
    const value = slider.value;
    
    // Format value based on slider ID
    if (slider.id === 'license-cost' || slider.id === 'hardware-cost') {
      valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
    } else if (slider.id === 'implementation-cost' || slider.id === 'fte-cost') {
      valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
    } else if (slider.id.includes('percentage')) {
      valueDisplay.textContent = `${value}%`;
    } else {
      valueDisplay.textContent = value;
    }
  }
  
  /**
   * Update range slider background gradient
   * @param {HTMLElement} slider - The range slider element
   */
  updateRangeSliderBackground(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const value = parseFloat(slider.value);
    const percentage = ((value - min) / (max - min)) * 100;
    
    slider.style.background = `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, var(--border-light) ${percentage}%, var(--border-light) 100%)`;
  }
}

// Initialize global sidebar manager
document.addEventListener('DOMContentLoaded', function() {
  window.sidebarManager = new SidebarManager();
  window.sidebarManager.init();
});
EOL

# Create main app initialization script
cat > ./js/core/app.js << 'EOL'
/**
 * Main Application for Portnox Total Cost Analyzer
 * Initializes and coordinates all application components
 */

class PortnoxTCA {
  constructor() {
    this.config = window.TCAConfig || {};
    this.initialized = false;
    
    // References to component managers
    this.viewManager = null;
    this.chartManager = null;
    this.sidebarManager = null;
    this.vendorManager = null;
  }
  
  /**
   * Initialize the application
   */
  init() {
    console.log('Initializing Portnox Total Cost Analyzer...');
    
    // Get references to component managers
    this.viewManager = window.viewManager;
    this.chartManager = window.chartManager;
    this.sidebarManager = window.sidebarManager;
    this.vendorManager = window.vendorManager;
    
    // Check if all required components are available
    if (!this.viewManager || !this.chartManager || !this.sidebarManager || !this.vendorManager) {
      console.error('Required component managers not found');
      return false;
    }
    
    // Set up global event listeners
    this.setupEventListeners();
    
    // Create missing vendor logos
    this.createMissingVendorLogos();
    
    this.initialized = true;
    
    // Log initialization complete
    console.log('Portnox Total Cost Analyzer initialized successfully');
    
    return true;
  }
  
  /**
   * Set up global event listeners
   */
  setupEventListeners() {
    // Listen for vendor selection changes
    document.addEventListener('vendorSelectionChange', (event) => {
      const selectedVendors = event.detail.selectedVendors;
      console.log('Vendor selection changed:', selectedVendors);
      
      // Update charts based on selected vendors
      this.updateCharts();
    });
    
    // Listen for configuration value changes
    document.addEventListener('configValueChange', (event) => {
      console.log('Configuration value changed:', event.detail);
      
      // Update calculations and charts
      this.updateCalculations();
    });
    
    // Window resize handling
    window.addEventListener('resize', this.debounce(() => {
      // Refresh charts on window resize
      if (this.chartManager) {
        this.chartManager.destroyAllCharts();
        this.updateCharts();
      }
    }, 250));
  }
  
  /**
   * Update all charts with current data
   */
  updateCharts() {
    // This would update all charts with the latest data
    // For now, just refresh the current view
    const activeView = this.viewManager.activeView.secondary;
    this.viewManager.refreshView(activeView);
  }
  
  /**
   * Update calculations based on configuration changes
   */
  updateCalculations() {
    // This would recalculate all data based on the current configuration
    // Then update the charts
    this.updateCharts();
  }
  
  /**
   * Create placeholder logos for vendors with missing images
   */
  createMissingVendorLogos() {
    // Get all vendor logo images
    const vendorLogos = document.querySelectorAll('.vendor-logo img');
    
    // Set error handler to show text instead of missing image
    vendorLogos.forEach(logo => {
      logo.onerror = function() {
        const vendorCard = this.closest('.vendor-select-card');
        const vendorId = vendorCard ? vendorCard.dataset.vendor : null;
        const vendor = vendorId ? PortnoxTCA.config.vendors[vendorId] : null;
        
        // Hide the image
        this.style.display = 'none';
        
        // Show the vendor name as text
        const logoContainer = this.parentElement;
        if (logoContainer) {
          const text = document.createElement('span');
          text.className = 'vendor-text-logo';
          text.textContent = vendor ? vendor.shortName : 'Vendor';
          logoContainer.appendChild(text);
        }
      };
    });
  }
  
  /**
   * Debounce function to limit execution frequency
   * @param {Function} func - The function to debounce
   * @param {number} wait - The debounce wait time in milliseconds
   * @returns {Function} - The debounced function
   */
  debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Create the application instance
  window.app = new PortnoxTCA();
  
  // Initialize once all component managers are loaded
  setTimeout(() => {
    window.app.init();
  }, 500);
});
EOL

# Create placeholder images for missing vendor logos
mkdir -p ./img/vendors

# Create placeholder images for vendors with 404 errors
for vendor in portnox cisco aruba forescout fortinac juniper securew2 microsoft; do
  cat > "./img/vendors/$vendor.png" << EOL
<svg xmlns="http://www.w3.org/2000/svg" width="80" height="40" viewBox="0 0 80 40">
  <rect width="80" height="40" fill="#f5f5f5" />
  <text x="40" y="22" font-family="Arial" font-size="12" text-anchor="middle" fill="#333">$vendor</text>
</svg>
EOL
done

# Create images for analyst logos
mkdir -p ./img/logos

for logo in gartner idc forrester ema; do
  cat > "./img/logos/$logo.png" << EOL
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50" viewBox="0 0 100 50">
  <rect width="100" height="50" fill="#f5f5f5" />
  <text x="50" y="30" font-family="Arial" font-size="14" text-anchor="middle" fill="#333">$logo</text>
</svg>
EOL
done

# Set up a deployment script for new structure
cat > ./deploy.sh << 'EOL'
#!/bin/bash

# Deployment script for Portnox Total Cost Analyzer
# Usage: ./deploy.sh [environment]

# Default to development environment
ENVIRONMENT=${1:-development}

echo "Deploying Portnox Total Cost Analyzer to $ENVIRONMENT environment..."

# Create output directory
OUTPUT_DIR="./dist"
mkdir -p $OUTPUT_DIR

# Clean existing files
rm -rf $OUTPUT_DIR/*

# Copy HTML files
cp *.html $OUTPUT_DIR/

# Copy CSS files
mkdir -p $OUTPUT_DIR/css/themes
cp -r ./css/themes/* $OUTPUT_DIR/css/themes/

# Copy JavaScript files
mkdir -p $OUTPUT_DIR/js/core
mkdir -p $OUTPUT_DIR/js/charts
mkdir -p $OUTPUT_DIR/js/components
mkdir -p $OUTPUT_DIR/js/views
mkdir -p $OUTPUT_DIR/js/utils

cp -r ./js/core/* $OUTPUT_DIR/js/core/
cp -r ./js/charts/* $OUTPUT_DIR/js/charts/
cp -r ./js/components/* $OUTPUT_DIR/js/components/
cp -r ./js/views/* $OUTPUT_DIR/js/views/
cp -r ./js/utils/* $OUTPUT_DIR/js/utils/

# Copy images
mkdir -p $OUTPUT_DIR/img/vendors
mkdir -p $OUTPUT_DIR/img/logos
cp -r ./img/vendors/* $OUTPUT_DIR/img/vendors/
cp -r ./img/logos/* $OUTPUT_DIR/img/logos/

# Environment-specific configurations
if [ "$ENVIRONMENT" = "production" ]; then
  # Minify JavaScript files
  echo "Minifying JavaScript files..."
  for file in $(find $OUTPUT_DIR/js -name "*.js"); do
    # Use uglifyjs if available, otherwise skip minification
    if command -v uglifyjs &> /dev/null; then
      uglifyjs $file -o $file.min
      mv $file.min $file
    else
      echo "Warning: uglifyjs not found, skipping minification for $file"
    fi
  done
  
  # Minify CSS files
  echo "Minifying CSS files..."
  for file in $(find $OUTPUT_DIR/css -name "*.css"); do
    # Use cssnano if available, otherwise skip minification
    if command -v cssnano &> /dev/null; then
      cssnano $file $file.min
      mv $file.min $file
    else
      echo "Warning: cssnano not found, skipping minification for $file"
    fi
  done
fi

echo "Deployment complete! Files are in the $OUTPUT_DIR directory."
EOL
chmod +x ./deploy.sh

# Create a README file
cat > ./README.md << 'EOL'
# Portnox Total Cost Analyzer

A comprehensive tool for comparing the total cost of ownership (TCO) of different Network Access Control (NAC) solutions, with a focus on Portnox's competitive advantages.

## Overview

The Portnox Total Cost Analyzer provides detailed financial analysis, security comparison, and technical evaluations of various NAC vendors. The tool helps buyers, executive teams, finance departments, and technical and security compliance teams make informed decisions.

## Key Features

- **Executive Overview**: Summarizes key findings, business impact, and recommendations
- **Financial Analysis**: Detailed TCO, ROI, and cost comparisons
- **Security & Compliance**: Security capability comparison, compliance coverage, and risk analysis
- **Technical Comparison**: Architecture comparison, feature comparison, and integration capabilities

## Getting Started

1. Clone the repository
2. Open index.html in a web browser
3. Use the sidebar to configure your organization's parameters
4. Select vendors to compare
5. Navigate through the different tabs to explore the analysis

## Development

### Directory Structure
portnox-tca/
├── css/
│   └── themes/
│       └── modern.css
├── img/
│   ├── logos/
│   └── vendors/
├── js/
│   ├── charts/
│   ├── components/
│   ├── core/
│   ├── utils/
│   └── views/
├── index.html
├── deploy.sh
└── README.md

### Building and Deployment

Run the deployment script to create a distributable version:

```bash
./deploy.sh
For production deployment:
bash./deploy.sh production
Technologies Used

HTML5, CSS3, JavaScript
Chart libraries: ApexCharts, Highcharts, D3.js
Font Awesome for icons
Google Fonts (Nunito)
EOL

echo "Script execution completed. The Portnox Total Cost Analyzer has been restructured and fixed."
echo "To start the application, open the index.html file in your browser."
echo "To deploy the application, run ./deploy.sh"
