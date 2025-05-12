/**
 * NAC TCO Enhancer
 * Master integration file for NAC Total Cost Analyzer
 * Version: 2.1
 */

(function() {
  // Configuration
  const config = {
    debug: true,
    appVersion: '2.1.0',
    components: [
      { name: 'chart-utilities.js', required: true },
      { name: 'chart-initializers.js', required: true },
      { name: 'wizard-utilities.js', required: true },
      { name: 'vendor-data.js', required: true, path: 'data/vendors/' },
      { name: 'industry-data.js', required: true, path: 'data/industry/' },
      { name: 'compliance-data.js', required: true, path: 'data/compliance/' },
      { name: 'industry-compliance-tab.js', required: false }
    ],
    styles: [
      { name: 'industry-compliance.css', required: false }
    ]
  };
  
  // Logger
  const logger = {
    info: function(message) {
      if (config.debug) {
        console.log(`[NAC TCO Enhancer] ${message}`);
      }
    },
    error: function(message, err) {
      console.error(`[NAC TCO Enhancer] ERROR: ${message}`, err);
    },
    warn: function(message) {
      console.warn(`[NAC TCO Enhancer] WARNING: ${message}`);
    }
  };
  
  // Load a JavaScript file
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      logger.info(`Loading script: ${url}`);
      
      const script = document.createElement('script');
      script.src = url;
      script.addEventListener('load', () => {
        logger.info(`Loaded script: ${url}`);
        resolve();
      });
      script.addEventListener('error', (e) => {
        logger.error(`Failed to load script: ${url}`, e);
        reject(new Error(`Failed to load script: ${url}`));
      });
      document.head.appendChild(script);
    });
  }
  
  // Load a CSS file
  function loadStyle(url) {
    return new Promise((resolve, reject) => {
      logger.info(`Loading stylesheet: ${url}`);
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.addEventListener('load', () => {
        logger.info(`Loaded stylesheet: ${url}`);
        resolve();
      });
      link.addEventListener('error', (e) => {
        logger.error(`Failed to load stylesheet: ${url}`, e);
        reject(new Error(`Failed to load stylesheet: ${url}`));
      });
      document.head.appendChild(link);
    });
  }
  
  // Load all components
  async function loadComponents() {
    logger.info(`Starting component loading (version ${config.appVersion})...`);
    
    // Track load results
    const results = {
      success: [],
      failed: [],
      skipped: []
    };
    
    // Load required components first
    for (const component of config.components) {
      if (component.required) {
        try {
          const path = component.path || 'js/';
          await loadScript(`${path}${component.name}`);
          results.success.push(component.name);
        } catch (err) {
          results.failed.push(component.name);
          logger.error(`Failed to load required component: ${component.name}`, err);
          throw new Error(`Failed to load required component: ${component.name}`);
        }
      }
    }
    
    // Then load optional components
    for (const component of config.components) {
      if (!component.required) {
        try {
          const path = component.path || 'js/';
          await loadScript(`${path}${component.name}`);
          results.success.push(component.name);
        } catch (err) {
          results.skipped.push(component.name);
          logger.warn(`Skipped optional component: ${component.name}`);
        }
      }
    }
    
    // Load stylesheets
    for (const style of config.styles) {
      try {
        await loadStyle(`css/${style.name}`);
        results.success.push(style.name);
      } catch (err) {
        if (style.required) {
          results.failed.push(style.name);
          logger.error(`Failed to load required stylesheet: ${style.name}`, err);
        } else {
          results.skipped.push(style.name);
          logger.warn(`Skipped optional stylesheet: ${style.name}`);
        }
      }
    }
    
    logger.info(`Component loading completed: ${results.success.length} loaded, ${results.skipped.length} skipped, ${results.failed.length} failed`);
    return results;
  }
  
  // Verify component availability
  function verifyComponents() {
    const requiredGlobals = [
      { name: 'ChartUtils', type: 'object' },
      { name: 'ChartFactory', type: 'object' },
      { name: 'WizardUtils', type: 'object' },
      { name: 'VendorData', type: 'object' },
      { name: 'IndustryData', type: 'object' },
      { name: 'ComplianceData', type: 'object' }
    ];
    
    const missingComponents = [];
    
    requiredGlobals.forEach(component => {
      if (typeof window[component.name] !== component.type) {
        missingComponents.push(component.name);
        logger.error(`Missing required global: ${component.name}`);
      }
    });
    
    return {
      success: missingComponents.length === 0,
      missing: missingComponents
    };
  }
  
  // Initialize the TCO Analyzer enhancements
  async function initialize() {
    try {
      logger.info('Starting initialization...');
      
      // Load required components
      await loadComponents();
      
      // Verify components were loaded correctly
      const verification = verifyComponents();
      if (!verification.success) {
        throw new Error(`Missing required components: ${verification.missing.join(', ')}`);
      }
      
      // Initialize charts
      initializeCharts();
      
      // Set up global API
      setupGlobalApi();
      
      // Trigger initialization complete event
      const event = new CustomEvent('nacTcoEnhancerReady', {
        detail: { version: config.appVersion }
      });
      document.dispatchEvent(event);
      
      logger.info('Initialization completed successfully');
      return true;
    } catch (err) {
      logger.error('Initialization failed', err);
      // Show error notification to user
      showErrorNotification('Failed to initialize NAC TCO Enhancer. Please refresh the page or contact support.');
      return false;
    }
  }
  
  // Initialize charts
  function initializeCharts() {
    logger.info('Initializing charts...');
    
    // Make sure chart factory is available
    if (typeof ChartFactory === 'undefined') {
      logger.error('Chart Factory not available');
      return;
    }
    
    // Find all chart containers
    const chartContainers = document.querySelectorAll('.chart-container');
    if (chartContainers.length === 0) {
      logger.info('No chart containers found in DOM');
      return;
    }
    
    // Initialize available charts
    chartContainers.forEach(container => {
      const canvas = container.querySelector('canvas');
      if (!canvas) return;
      
      const chartId = canvas.id;
      if (!chartId) return;
      
      logger.info(`Found chart: ${chartId}`);
      
      // Initialize based on chart type
      if (chartId === 'tco-comparison-chart') {
        initializeTcoComparisonChart();
      } else if (chartId === 'current-breakdown-chart' || chartId === 'alternative-breakdown-chart') {
        initializeBreakdownChart(chartId);
      } else if (chartId === 'cumulative-cost-chart') {
        initializeCumulativeCostChart();
      } else if (chartId === 'feature-comparison-chart') {
        initializeFeatureComparisonChart();
      } else if (chartId === 'implementation-comparison-chart') {
        initializeImplementationComparisonChart();
      } else if (chartId === 'roi-chart') {
        initializeRoiComparisonChart();
      }
    });
    
    logger.info('Chart initialization completed');
  }
  
  // Initialize TCO comparison chart
  function initializeTcoComparisonChart() {
    if (!ChartFactory.createTcoComparisonChart) return;
    
    // Get sample data for demonstration
    const sampleData = getSampleTcoData();
    ChartFactory.createTcoComparisonChart('tco-comparison-chart', sampleData);
  }
  
  // Initialize breakdown charts
  function initializeBreakdownChart(chartId) {
    if (!ChartFactory.createBreakdownChart) return;
    
    const title = chartId === 'current-breakdown-chart' ? 
      'Current Solution Cost Breakdown' : 
      'Portnox Cloud Cost Breakdown';
    
    // Get sample data for demonstration
    const sampleData = getSampleBreakdownData(chartId);
    ChartFactory.createBreakdownChart(chartId, sampleData, title);
  }
  
  // Initialize cumulative cost chart
  function initializeCumulativeCostChart() {
    if (!ChartFactory.createCumulativeCostChart) return;
    
    // Get sample data for demonstration
    const sampleData = getSampleCumulativeData();
    ChartFactory.createCumulativeCostChart('cumulative-cost-chart', sampleData);
  }
  
  // Initialize feature comparison chart
  function initializeFeatureComparisonChart() {
    if (!ChartFactory.createFeatureComparisonChart) return;
    
    // Use VendorData if available
    if (VendorData && VendorData.getFeatureComparisonData) {
      const data = VendorData.getFeatureComparisonData();
      ChartFactory.createFeatureComparisonChart('feature-comparison-chart', data);
    } else {
      // Fallback to sample data
      const sampleData = getSampleFeatureData();
      ChartFactory.createFeatureComparisonChart('feature-comparison-chart', sampleData);
    }
  }
  
  // Initialize implementation comparison chart
  function initializeImplementationComparisonChart() {
    if (!ChartFactory.createImplementationChart) return;
    
    // Use VendorData if available
    if (VendorData && VendorData.getImplementationComparisonData) {
      const data = VendorData.getImplementationComparisonData('medium');
      ChartFactory.createImplementationChart('implementation-comparison-chart', data);
    } else {
      // Fallback to sample data
      const sampleData = getSampleImplementationData();
      ChartFactory.createImplementationChart('implementation-comparison-chart', sampleData);
    }
  }
  
  // Initialize ROI comparison chart
  function initializeRoiComparisonChart() {
    if (!ChartFactory.createRoiChart) return;
    
    // Use VendorData if available
    if (VendorData && VendorData.getRoiComparisonData) {
      const data = VendorData.getRoiComparisonData();
      ChartFactory.createRoiChart('roi-chart', data);
    } else {
      // Fallback to sample data
      const sampleData = getSampleRoiData();
      ChartFactory.createRoiChart('roi-chart', sampleData);
    }
  }
  
  // Set up global API for TCO Analyzer
  function setupGlobalApi() {
    // Create global namespace
    window.NacTcoAnalyzer = {
      version: config.appVersion,
      
      // TCO calculations
      calculateTco: function(vendor, deviceCount, years, additionalParams) {
        if (typeof VendorData !== 'undefined' && typeof VendorData.calculateTCO === 'function') {
          return VendorData.calculateTCO(vendor, deviceCount, years, additionalParams);
        }
        logger.warn('VendorData.calculateTCO not available');
        return null;
      },
      
      // Comparison data generation
      getComparisonData: function(deviceCount, years, additionalParams) {
        if (typeof VendorData !== 'undefined' && typeof VendorData.getComparisonData === 'function') {
          return VendorData.getComparisonData(deviceCount, years, additionalParams);
        }
        logger.warn('VendorData.getComparisonData not available');
        return null;
      },
      
      // Industry analysis
      getIndustryData: function(industryId) {
        if (typeof IndustryData !== 'undefined' && typeof IndustryData.getIndustryData === 'function') {
          return IndustryData.getIndustryData(industryId);
        }
        logger.warn('IndustryData.getIndustryData not available');
        return null;
      },
      
      // Compliance analysis
      getComplianceData: function(frameworkId) {
        if (typeof ComplianceData !== 'undefined' && typeof ComplianceData.getFramework === 'function') {
          return ComplianceData.getFramework(frameworkId);
        }
        logger.warn('ComplianceData.getFramework not available');
        return null;
      },
      
      // Chart creation
      createChart: function(type, canvasId, data, options) {
        if (typeof ChartFactory === 'undefined') {
          logger.warn('ChartFactory not available');
          return null;
        }
        
        // Map chart type to factory method
        const factoryMethod = {
          'tco': ChartFactory.createTcoComparisonChart,
          'breakdown': ChartFactory.createBreakdownChart,
          'cumulative': ChartFactory.createCumulativeCostChart,
          'feature': ChartFactory.createFeatureComparisonChart,
          'implementation': ChartFactory.createImplementationChart,
          'roi': ChartFactory.createRoiChart,
          'compliance': ChartFactory.createIndustryComplianceChart,
          'risk': ChartFactory.createRiskReductionChart,
          'sensitivity': ChartFactory.createSensitivityChart
        }[type];
        
        if (typeof factoryMethod !== 'function') {
          logger.warn(`Unknown chart type: ${type}`);
          return null;
        }
        
        return factoryMethod(canvasId, data, options);
      },
      
      // Refresh charts
      refreshCharts: function() {
        if (typeof ChartUtils !== 'undefined' && typeof ChartUtils.instances === 'object') {
          Object.keys(ChartUtils.instances).forEach(chartId => {
            logger.info(`Refreshing chart: ${chartId}`);
            ChartUtils.refreshChart(chartId);
          });
          return true;
        }
        logger.warn('ChartUtils not available');
        return false;
      }
    };
    
    logger.info('Global API set up successfully');
  }
  
  // Show error notification to user
  function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">
          <i class="fas fa-exclamation-circle"></i>
        </div>
        <div class="notification-message">${message}</div>
        <button class="notification-close">&times;</button>
      </div>
    `;
    
    // Style the notification
    const style = document.createElement('style');
    style.textContent = `
      .error-notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        background-color: #f8d7da;
        color: #721c24;
        padding: 10px 15px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        max-width: 90%;
        animation: slide-in 0.3s ease-out;
      }
      .notification-content {
        display: flex;
        align-items: center;
      }
      .notification-icon {
        margin-right: 10px;
        font-size: 24px;
      }
      .notification-close {
        margin-left: 15px;
        background: none;
        border: none;
        color: #721c24;
        font-size: 20px;
        cursor: pointer;
      }
      @keyframes slide-in {
        0% { transform: translate(-50%, -100%); opacity: 0; }
        100% { transform: translate(-50%, 0); opacity: 1; }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Add close button functionality
    const closeButton = notification.querySelector('.notification-close');
    if (closeButton) {
      closeButton.addEventListener('click', function() {
        notification.remove();
      });
    }
    
    // Auto-close after 10 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.remove();
      }
    }, 10000);
  }
  
  // Helper functions for sample data
  function getSampleTcoData() {
    return {
      vendors: ['Portnox', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'],
      initialCosts: [5000, 125000, 100000, 115000, 75000],
      operationalCosts: [36000, 150000, 105000, 120000, 90000],
      maintenanceCosts: [84000, 210000, 180000, 195000, 150000]
    };
  }
  
  function getSampleBreakdownData(chartId) {
    if (chartId === 'current-breakdown-chart') {
      return {
        labels: ['Hardware', 'Software', 'Implementation', 'Staffing', 'Maintenance'],
        values: [120000, 150000, 80000, 210000, 60000]
      };
    } else {
      return {
        labels: ['Subscription', 'Implementation', 'Staffing', 'Maintenance'],
        values: [96000, 5000, 36000, 0]
      };
    }
  }
  
  function getSampleCumulativeData() {
    return {
      years: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
      solutions: [
        {
          name: 'Portnox',
          color: '#1E88E5',
          cumulativeCosts: [125000, 220000, 315000, 410000, 505000]
        },
        {
          name: 'Cisco ISE',
          color: '#E53935',
          cumulativeCosts: [300000, 450000, 600000, 750000, 900000]
        },
        {
          name: 'Aruba ClearPass',
          color: '#FB8C00',
          cumulativeCosts: [250000, 375000, 500000, 625000, 750000]
        }
      ]
    };
  }
  
  function getSampleFeatureData() {
    return {
      features: [
        'Device Visibility',
        'Policy Management',
        'Guest Access',
        'BYOD Support',
        'Cloud Integration',
        'Automated Remediation',
        'Third-Party Integration',
        'Scalability',
        'Ease of Use',
        'Reporting'
      ],
      vendors: [
        {
          name: 'Portnox',
          color: '#1E88E5',
          scores: [8, 9, 8, 9, 10, 9, 9, 9, 9, 8]
        },
        {
          name: 'Cisco ISE',
          color: '#E53935',
          scores: [8, 9, 8, 8, 6, 8, 9, 9, 5, 8]
        },
        {
          name: 'Aruba ClearPass',
          color: '#FB8C00',
          scores: [8, 8, 9, 9, 7, 8, 8, 8, 6, 8]
        }
      ]
    };
  }
  
  function getSampleImplementationData() {
    return {
      vendors: ['Portnox', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'],
      implementationTimes: [3, 45, 35, 25, 30],
      colors: ['#1E88E5', '#E53935', '#FB8C00', '#7E57C2', '#43A047']
    };
  }
  
  function getSampleRoiData() {
    return {
      vendors: ['Portnox', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'],
      roiValues: [145, 87, 78, 65, 92],
      colors: ['#1E88E5', '#E53935', '#FB8C00', '#7E57C2', '#43A047']
    };
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // DOM already loaded, initialize immediately
    initialize();
  }
})();
