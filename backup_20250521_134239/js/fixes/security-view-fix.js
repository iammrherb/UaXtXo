/**
 * Security View Fix for Portnox Total Cost Analyzer
 * Ensures proper initialization of the Security View
 */

(function() {
  console.log("Applying Security View fix...");
  
  // Wait for DOM content to be loaded
  document.addEventListener('DOMContentLoaded', function() {
    fixSecurityView();
  });
  
  // If DOM already loaded, fix it now
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    fixSecurityView();
  }
  
  function fixSecurityView() {
    // Check if SecurityView is available in the window object
    if (!window.securityView) {
      console.log("Creating SecurityView object...");
      
      // Create a simplified SecurityView object
      window.securityView = {
        initialized: false,
        
        init: function(viewId = 'security') {
          console.log("Initializing Security View...");
          
          // Find container
          this.container = document.querySelector(`.view-panel[data-view="${viewId}"]`);
          
          if (!this.container) {
            console.error(`Container not found for view: ${viewId}`);
            return false;
          }
          
          // Initialize charts
          this.initializeCharts();
          
          this.initialized = true;
          console.log("Security View initialized successfully");
          return true;
        },
        
        initializeCharts: function() {
          console.log("Initializing security charts...");
          
          // Use SecurityCharts if available
          if (window.SecurityCharts && window.SecurityCharts.initializeCharts) {
            window.SecurityCharts.initializeCharts();
          } else {
            console.warn("SecurityCharts not available");
            
            // Try to ensure the script is loaded
            const script = document.createElement('script');
            script.src = 'js/charts/security-charts.js';
            script.onload = function() {
              if (window.SecurityCharts && window.SecurityCharts.initializeCharts) {
                window.SecurityCharts.initializeCharts();
              }
            };
            document.head.appendChild(script);
          }
        },
        
        update: function(data) {
          console.log("Updating Security View with data");
          
          // Refresh charts with new data
          this.initializeCharts();
          
          // Update dashboard metrics
          this.updateDashboardMetrics(data);
        },
        
        updateDashboardMetrics: function(data) {
          // Update metrics if they exist
          const elements = {
            securityImprovement: document.getElementById('security-improvement'),
            zeroTrustScore: document.getElementById('zero-trust-score'),
            deviceAuthScore: document.getElementById('device-auth-score'),
            responseTime: document.getElementById('response-time'),
            complianceCoverage: document.getElementById('compliance-coverage'),
            threatReduction: document.getElementById('threat-reduction'),
            avgBreachCost: document.getElementById('avg-breach-cost')
          };
          
          // If data is available, update from data
          if (data && data.portnox) {
            if (elements.securityImprovement) elements.securityImprovement.textContent = data.portnox.securityScore + '%';
            if (elements.zeroTrustScore) elements.zeroTrustScore.textContent = data.portnox.zeroTrustScore + '%';
            if (elements.complianceCoverage) elements.complianceCoverage.textContent = data.portnox.complianceScore + '%';
            if (elements.threatReduction) elements.threatReduction.textContent = data.portnox.breachReduction + '%';
          }
        }
      };
    }
    
    // Find the security view panel
    let viewPanel = document.querySelector('.view-panel[data-view="security"]');
    
    // If not found, look for the panel by ID
    if (!viewPanel) {
      viewPanel = document.getElementById('security-view');
    }
    
    // If security view is not initialized, initialize it
    if (!window.securityView.initialized) {
      console.log("Initializing security view...");
      const result = window.securityView.init('security');
      
      if (result) {
        console.log("Security view initialized successfully");
      } else {
        console.error("Failed to initialize security view");
      }
    } else {
      console.log("Security view already initialized");
    }
  }
})();

console.log("Security view fix script loaded");
