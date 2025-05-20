/**
 * Chart Loader for Portnox Total Cost Analyzer
 * Manages loading and integration of different chart libraries
 */

class ChartLoader {
  constructor() {
    this.apexChartManager = null;
    this.highchartsManager = null;
    this.d3Manager = null;
    
    this.activeCharts = {};
  }
  
  /**
   * Initialize chart managers
   */
  init() {
    // Initialize ApexCharts manager
    this.apexChartManager = new ApexChartManager();
    
    // Initialize Highcharts manager
    this.highchartsManager = new HighchartsManager();
    
    // Initialize D3 manager
    this.d3Manager = new D3Manager();
    
    return this;
  }
  
  /**
   * Load charts for the executive view
   */
  loadExecutiveCharts(resultsData) {
    console.log('Loading executive charts...');
    
    // Use ApexCharts for basic financial charts
    this.activeCharts.executive = {
      ...this.apexChartManager.initExecutiveCharts(resultsData),
      // Use D3 for the radar chart (more customizable)
      ...this.d3Manager.initExecutiveCharts(resultsData)
    };
    
    return this.activeCharts.executive;
  }
  
  /**
   * Load charts for the financial view
   */
  loadFinancialCharts(resultsData) {
    console.log('Loading financial charts...');
    
    // Use ApexCharts for financial view (simpler charts)
    this.activeCharts.financial = {
      ...this.apexChartManager.initFinancialCharts(resultsData)
    };
    
    return this.activeCharts.financial;
  }
  
  /**
   * Load charts for the security view
   */
  loadSecurityCharts(resultsData) {
    console.log('Loading security charts...');
    
    // Use Highcharts for complex security charts
    this.activeCharts.security = {
      ...this.highchartsManager.initSecurityCharts(resultsData),
      // Use D3 for heatmaps (better interactivity)
      ...this.d3Manager.initSecurityCharts(resultsData)
    };
    
    return this.activeCharts.security;
  }
  
  /**
   * Load charts for the technical view
   */
  loadTechnicalCharts(resultsData) {
    console.log('Loading technical charts...');
    
    // Use Highcharts for technical view
    this.activeCharts.technical = {
      ...this.highchartsManager.initTechnicalCharts(resultsData)
    };
    
    return this.activeCharts.technical;
  }
  
  /**
   * Reload charts for the active view
   */
  reloadChartsForView(view, resultsData) {
    switch (view) {
      case 'executive':
        return this.loadExecutiveCharts(resultsData);
      case 'financial':
        return this.loadFinancialCharts(resultsData);
      case 'security':
        return this.loadSecurityCharts(resultsData);
      case 'technical':
        return this.loadTechnicalCharts(resultsData);
      default:
        console.warn(`Unknown view: ${view}`);
        return {};
    }
  }
  
  /**
   * Destroy all charts
   */
  destroyAllCharts() {
    if (this.apexChartManager) {
      // Destroy specific charts
      // Add specific chart IDs as needed
      this.apexChartManager.destroyCharts([
        'tcoComparisonChart', 
        'cumulativeCostChart', 
        'roiChart',
        'valueDriversChart',
        'costStructureChart',
        'costProjectionChart'
      ]);
    }
    
    if (this.highchartsManager) {
      this.highchartsManager.destroyCharts([
        'riskComparisonChart',
        'breachImpactChart',
        'insuranceImpactChart',
        'nistFrameworkChart',
        'architectureChart',
        'featureRadarChart'
      ]);
    }
    
    if (this.d3Manager) {
      this.d3Manager.destroyCharts([
        'securityHeatmap',
        'riskHeatmap',
        'vendorRadarChart'
      ]);
    }
    
    this.activeCharts = {};
  }
}

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChartLoader };
}
