/**
 * UI Controller Fix
 * - Fixes "Cannot read properties of null (reading 'style')" errors
 * - Improves chart visibility handling
 * - Makes UI more robust against missing elements
 */
(function() {
  // Execute on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing UI controller fixes...');
    
    // Wait for UIController initialization
    const checkUIController = setInterval(function() {
      if (window.UIController) {
        clearInterval(checkUIController);
        fixUIController();
      }
    }, 100);
    
    function fixUIController() {
      // Fix the updateChartVisibility method
      const originalUpdateChartVisibility = window.UIController.prototype.updateChartVisibility;
      
      window.UIController.prototype.updateChartVisibility = function(view) {
        // Define which charts to show for each view
        const chartVisibility = {
          'executive': ['tco-comparison-chart', 'roi-chart'],
          'financial': ['tco-comparison-chart', 'cumulative-cost-chart', 'roi-chart', 'waterfall-chart', 'resource-utilization-chart'],
          'technical': ['tco-comparison-chart', 'cumulative-cost-chart', 'feature-comparison-chart', 'implementation-comparison-chart', 'roi-chart']
        };
        
        // Show/hide chart containers safely
        document.querySelectorAll('.chart-container').forEach(container => {
          const chartId = container.querySelector('canvas')?.id;
          if (chartId) {
            const isVisible = !chartVisibility[view] || chartVisibility[view].includes(chartId);
            const card = container.closest('.result-card');
            
            // Check if card exists before setting style
            if (card) {
              card.style.display = isVisible ? '' : 'none';
            }
          }
        });
      };
      
      // Fix setActiveView to handle missing elements
      const originalSetActiveView = window.UIController.prototype.setActiveView;
      
      window.UIController.prototype.setActiveView = function(view) {
        try {
          this.activeView = view;
          
          // Update UI based on view
          const resultsContainer = document.querySelector('.results-container');
          if (resultsContainer) {
            resultsContainer.className = 'results-container ' + view + '-view';
          }
          
          // Update visibility of sections based on view
          const sections = {
            'executive': ['summary-tab', 'implementation-tab'],
            'financial': ['summary-tab', 'financial-tab', 'implementation-tab'],
            'technical': ['summary-tab', 'financial-tab', 'implementation-tab', 'comparison-tab', 'migration-tab']
          };
          
          // Show/hide sections based on view
          document.querySelectorAll('.tab-button').forEach(tab => {
            if (!tab) return; // Safety check
            
            const tabId = tab.getAttribute('data-tab');
            const isVisible = !sections[view] || sections[view].includes(tabId);
            
            if (tab.style) {
              tab.style.display = isVisible ? '' : 'none';
            }
          });
          
          // If current active tab is not visible in this view, switch to first visible tab
          const activeTab = document.querySelector('.tab-button.active');
          if (activeTab && activeTab.style && activeTab.style.display === 'none') {
            const firstVisibleTab = document.querySelector('.tab-button:not([style*="display: none"])');
            if (firstVisibleTab && window.tabManager) {
              const tabId = firstVisibleTab.getAttribute('data-tab');
              if (tabId) {
                window.tabManager.setActiveTab(tabId);
              }
            }
          }
          
          // Update chart visibility based on view
          this.updateChartVisibility(view);
        } catch (error) {
          console.error('Error in setActiveView:', error);
          // Continue gracefully without failing
        }
      };
      
      // Fix other potential UI controller issues
      
      // Make updateResults more resilient
      const originalUpdateResults = window.UIController.prototype.updateResults;
      
      window.UIController.prototype.updateResults = function(results) {
        try {
          // Call original method inside try-catch
          originalUpdateResults.call(this, results);
        } catch (error) {
          console.error('Error in updateResults:', error);
          // Try to show notification of error
          if (window.notificationManager) {
            window.notificationManager.error('Error updating results: ' + error.message);
          }
        }
      };
      
      console.log('UI controller fixes applied successfully');
    }
  });
})();
