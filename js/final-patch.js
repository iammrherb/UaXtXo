/**
 * Final Patch Script
 * Resolves any remaining issues after all other scripts have loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("Final Patch: Starting application patches...");
  
  // Fix for CountUp reference error in wizard.js
  if (window.wizardManager && window.wizardManager.updateSummaryMetrics) {
    const originalUpdateSummaryMetrics = window.wizardManager.updateSummaryMetrics;
    
    window.wizardManager.updateSummaryMetrics = function(results) {
      try {
        // Try to use original function
        if (typeof CountUp !== 'undefined') {
          originalUpdateSummaryMetrics.call(this, results);
        } else {
          // Fallback if CountUp is not available
          console.warn("CountUp library not found. Using fallback for metrics display.");
          
          // Simple update function for metrics
          const updateMetric = (id, value, prefix = '', suffix = '') => {
            const element = document.getElementById(id);
            if (element) {
              if (typeof value === 'number') {
                element.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
              } else {
                element.textContent = `${prefix}${value}${suffix}`;
              }
            }
          };
          
          if (results) {
            updateMetric('total-savings', Math.round(results.savings.total), '$');
            updateMetric('savings-percentage', Math.round(results.savings.percentage), '', '%');
            updateMetric('breakeven-point', results.breakeven.month > 0 ? `${results.breakeven.month} months` : 'Immediate');
            updateMetric('risk-reduction', Math.round(results.riskReduction), '', '%');
            updateMetric('implementation-time', '75% less');
          }
        }
      } catch (error) {
        console.error("Error updating summary metrics:", error);
      }
    };
    
    console.log("Final Patch: Fixed CountUp reference issue in wizardManager.updateSummaryMetrics");
  }
  
  // Fix 'Chart is not defined' error when initializing charts
  if (window.chartManager && typeof Chart === 'undefined') {
    console.warn("Chart.js library not found. Creating placeholder Chart object.");
    
    // Create placeholder Chart class
    window.Chart = class Chart {
      constructor(ctx, config) {
        this.ctx = ctx;
        this.config = config;
        console.warn("Placeholder Chart created. Real Chart.js is required for visualization.");
      }
      
      update() {
        // Do nothing
      }
      
      destroy() {
        // Do nothing
      }
      
      static get defaults() {
        return {
          font: {},
          color: '',
          scale: {
            grid: {}
          }
        };
      }
      
      static register() {
        // Do nothing
      }
    };
    
    // Prevent real initialization when Chart.js is loaded
    window.chartManager.initializeCharts = function() {
      console.warn("Chart initialization skipped. Real Chart.js library is required.");
    };
    
    console.log("Final Patch: Created Chart placeholder to prevent errors");
  }
  
  // Fix for result tabs not switching
  document.querySelectorAll('.result-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.dataset.tab;
      
      // Update active tab
      document.querySelectorAll('.result-tab').forEach(t => {
        t.classList.remove('active');
      });
      this.classList.add('active');
      
      // Update active panel
      document.querySelectorAll('.result-panel').forEach(panel => {
        panel.classList.remove('active');
      });
      
      const targetPanel = document.getElementById(`${tabId}-panel`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
  
  // Fix calculate button to show results
  const calculateBtn = document.getElementById('calculate-btn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', function() {
      // Show results container and hide wizard
      const wizardContainer = document.getElementById('wizard-container');
      const resultsContainer = document.getElementById('results-container');
      const wizardNavigation = document.querySelector('.wizard-navigation');
      
      if (wizardContainer) wizardContainer.classList.add('hidden');
      if (resultsContainer) resultsContainer.classList.remove('hidden');
      if (wizardNavigation) wizardNavigation.classList.add('hidden');
      
      // Initialize charts if chartManager exists
      if (window.chartManager && typeof window.chartManager.initializeCharts === 'function') {
        window.chartManager.initializeCharts();
      }
      
      // Make overview panel active
      document.querySelectorAll('.result-tab').forEach(tab => {
        tab.classList.remove('active');
      });
      const overviewTab = document.querySelector('.result-tab[data-tab="overview"]');
      if (overviewTab) overviewTab.classList.add('active');
      
      document.querySelectorAll('.result-panel').forEach(panel => {
        panel.classList.remove('active');
      });
      const overviewPanel = document.getElementById('overview-panel');
      if (overviewPanel) overviewPanel.classList.add('active');
    });
  }
  
  // Add show/hide toggle for result panels if they don't exist yet
  const resultsContainer = document.getElementById('results-container');
  if (resultsContainer && resultsContainer.classList.contains('hidden')) {
    // Add button to demo the results view for testing
    const testButton = document.createElement('button');
    testButton.className = 'btn btn-primary';
    testButton.style.position = 'fixed';
    testButton.style.bottom = '20px';
    testButton.style.right = '20px';
    testButton.style.zIndex = '9999';
    testButton.textContent = 'Show TCO Results';
    testButton.addEventListener('click', function() {
      // Toggle visibility
      if (resultsContainer.classList.contains('hidden')) {
        resultsContainer.classList.remove('hidden');
        this.textContent = 'Hide TCO Results';
        
        // Hide wizard if showing
        const wizardContainer = document.getElementById('wizard-container');
        if (wizardContainer) wizardContainer.classList.add('hidden');
        
        // Initialize charts if chartManager exists
        if (window.chartManager && typeof window.chartManager.initializeCharts === 'function') {
          window.chartManager.initializeCharts();
        }
      } else {
        resultsContainer.classList.add('hidden');
        this.textContent = 'Show TCO Results';
        
        // Show wizard again
        const wizardContainer = document.getElementById('wizard-container');
        if (wizardContainer) wizardContainer.classList.remove('hidden');
      }
    });
    
    // Add button to body
    document.body.appendChild(testButton);
  }
  
  console.log("Final Patch: Application patches applied successfully");
});
