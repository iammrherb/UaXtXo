/**
 * Comprehensive Fix for Portnox Total Cost Analyzer
 * Fixes various issues and applies UI improvements
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing comprehensive fixes...');
  
  // Apply all fixes
  initializeFixes();
});

function initializeFixes() {
  // Add modern styles
  addModernStyles();
  
  // Fix vendor data
  ensureVendorData();
  
  // Fix Tab Navigator
  ensureTabNavigator();
  
  // Fix view initialization
  ensureViewInitialization();
  
  // Fix UI manager
  fixUIManager();
  
  // Fix calculator
  fixCalculator();
  
  // Make UI cleaner and more modern
  enhanceUI();
  
  console.log('All fixes applied successfully!');
}

/**
 * Add modern styles to the page
 */
function addModernStyles() {
  if (!document.getElementById('modern-styles')) {
    const link = document.createElement('link');
    link.id = 'modern-styles';
    link.rel = 'stylesheet';
    link.href = './css/modern-styles.css';
    document.head.appendChild(link);
    
    // Add Font Awesome if not already present
    if (!document.querySelector('link[href*="fontawesome"]')) {
      const fontAwesome = document.createElement('link');
      fontAwesome.rel = 'stylesheet';
      fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
      document.head.appendChild(fontAwesome);
    }
    
    console.log('Modern styles added');
  }
}

/**
 * Ensure vendor data is available
 */
function ensureVendorData() {
  // Check if VENDORS is defined
  if (typeof window.VENDORS === 'undefined') {
    console.warn('VENDORS is not defined, attempting to load vendor-data.js');
    
    // Load vendor-data.js
    const script = document.createElement('script');
    script.src = './js/data/vendor-data.js';
    script.onload = function() {
      console.log('Vendor data loaded successfully');
    };
    script.onerror = function() {
      console.error('Failed to load vendor data from js/data/vendor-data.js');
      // Try alternative location
      const altScript = document.createElement('script');
      altScript.src = './js/models/vendor-data.js';
      document.body.appendChild(altScript);
    };
    document.body.appendChild(script);
  } else {
    console.log('VENDORS is already defined with', Object.keys(window.VENDORS).length, 'vendors');
  }
}

/**
 * Ensure Tab Navigator is properly initialized
 */
function ensureTabNavigator() {
  // Check if Tab Navigator exists
  if (typeof window.TabNavigator === 'undefined' || !window.tabNavigator) {
    console.warn('TabNavigator not found, loading tab-navigator-enhanced.js');
    
    // Load tab-navigator-enhanced.js
    const script = document.createElement('script');
    script.src = './js/components/tab-navigator-enhanced.js';
    script.onload = function() {
      // Initialize Tab Navigator after script loads
      if (typeof window.TabNavigator !== 'undefined') {
        window.tabNavigator = new TabNavigator().init();
        console.log('TabNavigator initialized');
        
        // Load other required components
        loadComponentScripts();
      }
    };
    document.body.appendChild(script);
  } else {
    console.log('TabNavigator is already defined');
    // Load other required components
    loadComponentScripts();
  }
}

/**
 * Load additional component scripts
 */
function loadComponentScripts() {
  // Load VendorComparison
  if (typeof window.VendorComparison === 'undefined') {
    const vendorCompScript = document.createElement('script');
    vendorCompScript.src = './js/components/vendorComparison.js';
    document.body.appendChild(vendorCompScript);
  }
  
  // Load NistCSFVisualization
  if (typeof window.NistCSFVisualization === 'undefined') {
    const nistScript = document.createElement('script');
    nistScript.src = './js/components/nistCsfVisualization.js';
    document.body.appendChild(nistScript);
  }
}

/**
 * Ensure view initialization is properly handled
 */
function ensureViewInitialization() {
  // Check if there's at least one view
  const views = document.querySelectorAll('.view-content');
  if (views.length === 0) {
    console.warn('No views found, waiting for tabNavigator to be ready');
    
    // Wait for tabNavigator to be fully initialized
    const checkInterval = setInterval(function() {
      if (window.tabNavigator && typeof window.tabNavigator.createViewContent === 'function') {
        // TabNavigator is ready, create first view
        clearInterval(checkInterval);
        
        // Make sure we have a view container
        let viewContainer = document.querySelector('.view-container');
        if (!viewContainer) {
          viewContainer = document.createElement('div');
          viewContainer.className = 'view-container';
          
          // Find tab container and insert after it
          const tabContainer = document.querySelector('.tab-container');
          if (tabContainer) {
            tabContainer.after(viewContainer);
          } else {
            // Insert in content area
            const contentArea = document.querySelector('.content-area');
            if (contentArea) {
              contentArea.appendChild(viewContainer);
            }
          }
        }
        
        // Create executive summary view
        window.tabNavigator.createViewContent('executive', 'summary');
        console.log('Initial view created');
      }
    }, 500);
    
    // Set timeout to avoid infinite checking
    setTimeout(function() {
      clearInterval(checkInterval);
    }, 10000);
  }
}

/**
 * Fix UI Manager
 */
function fixUIManager() {
  if (typeof window.UIManager === 'undefined') {
    console.warn('UIManager not defined, creating minimal version');
    
    // Create minimal UIManager
    window.UIManager = class UIManager {
      constructor(app) {
        this.app = app;
        this.initialized = false;
      }
      
      init() {
        if (this.initialized) return this;
        
        // Initialize animations
        this.initAnimations();
        
        this.initialized = true;
        return this;
      }
      
      initAnimations() {
        // Add entrance animations to dashboard cards
        const dashboardCards = document.querySelectorAll('.dashboard-card, .stat-card');
        dashboardCards.forEach((card, index) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            card.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100 + (index * 50));
        });
      }
      
      showToast(message, type = 'info') {
        // Create toast container if it doesn't exist
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
          toastContainer = document.createElement('div');
          toastContainer.id = 'toast-container';
          toastContainer.style.position = 'fixed';
          toastContainer.style.top = '20px';
          toastContainer.style.right = '20px';
          toastContainer.style.zIndex = '1000';
          document.body.appendChild(toastContainer);
        }
        
        // Create toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.backgroundColor = type === 'error' ? '#f44336' : 
                                     type === 'success' ? '#4CAF50' : 
                                     type === 'warning' ? '#ff9800' : '#2196F3';
        toast.style.color = 'white';
        toast.style.padding = '12px 16px';
        toast.style.marginBottom = '10px';
        toast.style.borderRadius = '0px';
        toast.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        toast.style.minWidth = '250px';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        
        // Add message
        toast.textContent = message;
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Show with animation
        setTimeout(() => {
          toast.style.opacity = '1';
        }, 10);
        
        // Auto-hide after delay
        setTimeout(() => {
          toast.style.opacity = '0';
          setTimeout(() => {
            if (toast.parentNode) {
              toast.parentNode.removeChild(toast);
            }
          }, 300);
        }, 5000);
      }
    };
    
    // Create global instance
    window.uiManager = new UIManager({}).init();
    console.log('Minimal UIManager created');
  }
}

/**
 * Fix Calculator
 */
function fixCalculator() {
  if (typeof window.TcoCalculator === 'undefined') {
    console.warn('TcoCalculator not defined, loading calculator-fix.js');
    
    // Try to load various calculator fixes
    loadScript('./js/models/calculator-fix.js');
  } else {
    console.log('TcoCalculator already defined');
  }
}

/**
 * Load script with fallbacks
 */
function loadScript(url, fallbacks = [], callback) {
  const script = document.createElement('script');
  script.src = url;
  
  script.onload = function() {
    console.log(`Loaded script: ${url}`);
    if (callback) callback();
  };
  
  script.onerror = function() {
    console.error(`Failed to load: ${url}`);
    
    // Try fallbacks if available
    if (fallbacks && fallbacks.length > 0) {
      const nextUrl = fallbacks.shift();
      loadScript(nextUrl, fallbacks, callback);
    } else if (callback) {
      callback();
    }
  };
  
  document.body.appendChild(script);
}

/**
 * Enhance UI to make it cleaner and more modern
 */
function enhanceUI() {
  // Adjust sidebar styles
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.style.borderRight = 'none';
    sidebar.style.boxShadow = '0 0 10px rgba(0,0,0,0.05)';
  }
  
  // Adjust card styles
  const cards = document.querySelectorAll('.dashboard-card, .stat-card, .vendor-card, .chart-wrapper');
  cards.forEach(card => {
    card.style.borderRadius = '0px';
    card.style.boxShadow = '0 2px 3px rgba(0,0,0,0.05)';
    card.style.border = '1px solid #eee';
  });
  
  // Make buttons flat
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.style.borderRadius = '0px';
    button.style.textTransform = 'uppercase';
    button.style.fontWeight = '500';
    button.style.letterSpacing = '0.5px';
  });
  
  // Create improved chart loader mechanism
  window.chartLoader = {
    queue: [],
    processing: false,
    
    // Queue a chart for loading
    queueChart: function(type, containerId, chartId) {
      this.queue.push({
        type: type,
        containerId: containerId,
        chartId: chartId
      });
      
      if (!this.processing) {
        this.processQueue();
      }
    },
    
    // Process the queue
    processQueue: function() {
      if (this.queue.length === 0) {
        this.processing = false;
        return;
      }
      
      this.processing = true;
      const nextChart = this.queue.shift();
      this.loadChart(nextChart.type, nextChart.containerId, nextChart.chartId);
    },
    
    // Load a specific chart
    loadChart: function(type, containerId, chartId) {
      const container = document.getElementById(containerId);
      if (!container) {
        console.warn(`Chart container ${containerId} not found`);
        this.processQueue();
        return;
      }
      
      // Clear placeholder
      container.innerHTML = '';
      
      // Create chart based on type
      switch (type) {
        case 'apex-tco':
          this.createTcoComparisonChart(container, chartId);
          break;
        case 'apex-cost':
          this.createCumulativeCostChart(container, chartId);
          break;
        case 'apex-breach':
          this.createBreachImpactChart(container, chartId);
          break;
        case 'treemap-security':
          this.createSecurityTreemapChart(container, chartId);
          break;
        case 'd3-security':
          this.createSecurityFrameworksChart(container, chartId);
          break;
        default:
          console.warn(`Unknown chart type: ${type}`);
          container.innerHTML = `<div class="chart-placeholder">
            <p>Chart type '${type}' not supported</p>
          </div>`;
          break;
      }
      
      // Process next chart in queue
      setTimeout(() => {
        this.processQueue();
      }, 100);
    },
    
    // Create TCO comparison chart
    createTcoComparisonChart: function(container, chartId) {
      if (typeof ApexCharts === 'undefined') {
        this.loadApexCharts(() => this.createTcoComparisonChart(container, chartId));
        return;
      }
      
      // Get vendor data
      const vendors = window.VENDORS || {};
      const vendorIds = Object.keys(vendors).filter(id => id !== 'no-nac').slice(0, 5);
      
      // Prepare chart data
      const series = [{
        name: 'Total 3-Year TCO',
        data: vendorIds.map(id => vendors[id]?.costs?.tco3Year || 0)
      }];
      
      const options = {
        chart: {
          type: 'bar',
          height: 250,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '70%',
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: vendorIds.map(id => vendors[id]?.shortName || id),
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Cost ($)'
          },
          labels: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        },
        colors: ['#1a5a96', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c'],
        tooltip: {
          y: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        }
      };
      
      // Create chart
      const chart = new ApexCharts(container, options);
      chart.render();
      
      // Store chart reference
      window[chartId] = chart;
    },
    
    // Create cumulative cost chart
    createCumulativeCostChart: function(container, chartId) {
      if (typeof ApexCharts === 'undefined') {
        this.loadApexCharts(() => this.createCumulativeCostChart(container, chartId));
        return;
      }
      
      // Get vendor data
      const vendors = window.VENDORS || {};
      const vendorIds = Object.keys(vendors).filter(id => id !== 'no-nac').slice(0, 3);
      
      // Prepare chart data
      const series = vendorIds.map(id => ({
        name: vendors[id]?.shortName || id,
        data: [
          vendors[id]?.costs?.implementation || 0,
          (vendors[id]?.costs?.implementation || 0) + (vendors[id]?.costs?.yearlySubscription || 0),
          (vendors[id]?.costs?.implementation || 0) + ((vendors[id]?.costs?.yearlySubscription || 0) * 2),
          (vendors[id]?.costs?.implementation || 0) + ((vendors[id]?.costs?.yearlySubscription || 0) * 3)
        ]
      }));
      
      const options = {
        chart: {
          type: 'line',
          height: 250,
          toolbar: {
            show: false
          }
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },
        xaxis: {
          categories: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Cumulative Cost ($)'
          },
          labels: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        },
        colors: ['#1a5a96', '#e74c3c', '#f39c12'],
        tooltip: {
          y: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        },
        legend: {
          position: 'top'
        }
      };
      
      // Create chart
      const chart = new ApexCharts(container, options);
      chart.render();
      
      // Store chart reference
      window[chartId] = chart;
    },
    
    // Create breach impact chart
    createBreachImpactChart: function(container, chartId) {
      if (typeof ApexCharts === 'undefined') {
        this.loadApexCharts(() => this.createBreachImpactChart(container, chartId));
        return;
      }
      
      // Get vendor data
      const vendors = window.VENDORS || {};
      const vendorIds = Object.keys(vendors).filter(id => id !== 'no-nac').slice(0, 3);
      
      // Calculate breach costs (simplified example)
      const breachCost = 4800000; // Average cost of a data breach
      const series = vendorIds.map(id => {
        const vendor = vendors[id];
        return Math.round(breachCost * ((vendor?.security?.breachReduction || 0) / 100));
      });
      
      const options = {
        chart: {
          type: 'bar',
          height: 250,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '70%',
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: vendorIds.map(id => vendors[id]?.shortName || id),
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Potential Savings ($)'
          },
          labels: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        },
        colors: ['#2ecc71', '#27ae60', '#16a085'],
        tooltip: {
          y: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        }
      };
      
      // Create chart
      const chart = new ApexCharts(container, options);
      chart.render();
      
      // Store chart reference
      window[chartId] = chart;
    },
    
    // Create security treemap chart
    createSecurityTreemapChart: function(container, chartId) {
      if (typeof ApexCharts === 'undefined') {
        this.loadApexCharts(() => this.createSecurityTreemapChart(container, chartId));
        return;
      }
      
      // Get vendor data
      const vendors = window.VENDORS || {};
      const portnox = vendors['portnox'] || {};
      
      // Prepare chart data
      const series = [{
        data: [
          {
            x: 'Zero Trust',
            y: portnox.security?.zeroTrust || 0
          },
          {
            x: 'Device Authentication',
            y: portnox.security?.deviceAuth || 0
          },
          {
            x: 'Risk Assessment',
            y: portnox.security?.riskAssessment || 0
          },
          {
            x: 'Compliance Coverage',
            y: portnox.security?.complianceCoverage || 0
          },
          {
            x: 'Continuous Monitoring',
            y: portnox.security?.continuousMonitoring ? 90 : 0
          },
          {
            x: 'Automated Response',
            y: portnox.security?.automatedResponse ? 85 : 0
          }
        ]
      }];
      
      const options = {
        chart: {
          type: 'treemap',
          height: 350,
          toolbar: {
            show: false
          }
        },
        title: {
          text: 'Portnox Security Capabilities',
          align: 'center'
        },
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: true
          }
        },
        colors: [
          '#1a5a96',
          '#2980b9',
          '#3498db',
          '#2ecc71',
          '#27ae60',
          '#16a085'
        ],
        tooltip: {
          y: {
            formatter: function(val) {
              return val + '% Coverage';
            }
          }
        }
      };
      
      // Create chart
      const chart = new ApexCharts(container, options);
      chart.render();
      
      // Store chart reference
      window[chartId] = chart;
    },
    
    // Create security frameworks chart
    createSecurityFrameworksChart: function(container, chartId) {
      if (typeof ApexCharts === 'undefined') {
        this.loadApexCharts(() => this.createSecurityFrameworksChart(container, chartId));
        return;
      }
      
      // Get vendor data
      const vendors = window.VENDORS || {};
      const vendorIds = Object.keys(vendors).filter(id => id !== 'no-nac').slice(0, 3);
      
      // Prepare chart data
      const frameworks = ['NIST CSF', 'PCI DSS', 'HIPAA', 'GDPR', 'ISO 27001'];
      const series = vendorIds.map(id => {
        const vendor = vendors[id] || {};
        return {
          name: vendor.shortName || id,
          data: frameworks.map(framework => {
            const frameworkKey = framework.toLowerCase().replace(/[^a-z0-9]/g, '');
            return vendor.compliance?.[frameworkKey] || vendor.compliance?.[framework] || 0;
          })
        };
      });
      
      const options = {
        chart: {
          type: 'radar',
          height: 250,
          toolbar: {
            show: false
          }
        },
        series: series,
        xaxis: {
          categories: frameworks
        },
        yaxis: {
          max: 100
        },
        colors: ['#1a5a96', '#e74c3c', '#f39c12'],
        markers: {
          size: 4
        },
        stroke: {
          width: 2
        },
        fill: {
          opacity: 0.2
        }
      };
      
      // Create chart
      const chart = new ApexCharts(container, options);
      chart.render();
      
      // Store chart reference
      window[chartId] = chart;
    },
    
    // Load ApexCharts library
    loadApexCharts: function(callback) {
      console.log('Loading ApexCharts library...');
      
      // Check if ApexCharts is already loaded
      if (typeof ApexCharts !== 'undefined') {
        callback();
        return;
      }
      
      // Load ApexCharts
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
      script.onload = function() {
        console.log('ApexCharts loaded successfully');
        callback();
      };
      document.body.appendChild(script);
    }
  };
  
  console.log('UI enhancements applied');
}
