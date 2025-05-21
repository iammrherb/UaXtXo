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
