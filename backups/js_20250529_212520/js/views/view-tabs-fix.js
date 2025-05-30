/**
 * View Tabs Fix for Portnox Total Cost Analyzer
 * Resolves duplicate tabs issue and ensures proper view navigation
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying improved view tabs fix...');
  
  // Apply after a short delay to ensure DOM is loaded
  setTimeout(fixViewTabs, 500);
});

function fixViewTabs() {
  // Find all tab sets in the document
  const mainTabsContainers = document.querySelectorAll('.main-tabs');
  
  if (mainTabsContainers.length === 0) {
    console.warn('No main tabs found, will try again in 500ms');
    setTimeout(fixViewTabs, 500);
    return;
  }
  
  // If multiple main-tabs found, remove duplicates
  if (mainTabsContainers.length > 1) {
    console.log(`Found ${mainTabsContainers.length} main-tabs containers, removing duplicates`);
    
    // Keep only the first one
    for (let i = 1; i < mainTabsContainers.length; i++) {
      mainTabsContainers[i].remove();
    }
  }
  
  // Fix the remaining main-tabs container
  const mainTabsContainer = document.querySelector('.main-tabs');
  if (mainTabsContainer) {
    // Ensure we have exactly one of each required tab
    const requiredViews = ['executive', 'financial', 'security', 'technical'];
    const existingTabs = {};
    
    // First pass: identify existing tabs and remove duplicates
    const tabs = Array.from(mainTabsContainer.querySelectorAll('.main-tab'));
    tabs.forEach(tab => {
      const viewId = tab.getAttribute('data-view');
      if (viewId && requiredViews.includes(viewId)) {
        if (!existingTabs[viewId]) {
          existingTabs[viewId] = tab;
        } else {
          // Duplicate found, remove it
          tab.remove();
        }
      } else if (!viewId) {
        // Invalid tab with no data-view, remove it
        tab.remove();
      }
    });
    
    // Second pass: add missing tabs
    requiredViews.forEach(viewId => {
      if (!existingTabs[viewId]) {
        // Create missing tab
        const newTab = document.createElement('button');
        newTab.className = 'main-tab';
        newTab.setAttribute('data-view', viewId);
        
        // Set tab icon and text
        let icon = 'fa-chart-line';
        let text = 'Executive';
        
        switch(viewId) {
          case 'financial':
            icon = 'fa-dollar-sign';
            text = 'Financial';
            break;
          case 'security':
            icon = 'fa-shield-alt';
            text = 'Security';
            break;
          case 'technical':
            icon = 'fa-cogs';
            text = 'Technical';
            break;
        }
        
        newTab.innerHTML = `<i class="fas ${icon}"></i> ${text}`;
        
        // Add to container
        mainTabsContainer.appendChild(newTab);
        console.log(`Added missing tab for ${viewId} view`);
      }
    });
    
    // Remove any event listeners from all tabs and reattach them
    const updatedTabs = mainTabsContainer.querySelectorAll('.main-tab');
    
    updatedTabs.forEach(tab => {
      const viewId = tab.getAttribute('data-view');
      
      // Remove existing listeners
      const newTab = tab.cloneNode(true);
      tab.parentNode.replaceChild(newTab, tab);
      
      // Add new click listener
      newTab.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log(`Switching to view: ${viewId}`);
        
        // Update active tab
        updatedTabs.forEach(t => t.classList.remove('active'));
        newTab.classList.add('active');
        
        // Update active view panel
        const viewPanels = document.querySelectorAll('.view-panel');
        viewPanels.forEach(panel => panel.classList.remove('active'));
        
        const targetPanel = document.querySelector(`.view-panel[data-view="${viewId}"]`);
        if (targetPanel) {
          targetPanel.classList.add('active');
          
          // Refresh charts if needed
          if (window.refreshChartsInView && typeof window.refreshChartsInView === 'function') {
            window.refreshChartsInView(viewId);
          } else {
            // Create global function if not exists
            window.refreshChartsInView = function(viewId) {
              console.log(`Refreshing charts in view: ${viewId}`);
              
              // Find active panel in this view
              const viewPanel = document.querySelector(`.view-panel[data-view="${viewId}"]`);
              if (!viewPanel) return;
              
              const activeResultsPanel = viewPanel.querySelector('.results-panel.active');
              if (!activeResultsPanel) return;
              
              const panelId = activeResultsPanel.id;
              
              // Refresh charts in the active panel
              const chartContainers = activeResultsPanel.querySelectorAll('.chart-wrapper');
              
              chartContainers.forEach(container => {
                // Check for different chart libraries
                if (window.apexChartManager && typeof window.apexChartManager.refreshChart === 'function') {
                  window.apexChartManager.refreshChart(container.id);
                } else if (window.d3Manager && typeof window.d3Manager.refreshChart === 'function') {
                  window.d3Manager.refreshChart(container.id);
                } else if (window.chartManager && typeof window.chartManager.refreshChart === 'function') {
                  window.chartManager.refreshChart(container.id);
                }
              });
            };
          }
        } else {
          console.warn(`View panel not found for ${viewId}`);
        }
      });
    });
    
    // Set active tab to match active view panel
    let activeViewPanel = document.querySelector('.view-panel.active');
    if (activeViewPanel) {
      const activeViewId = activeViewPanel.getAttribute('data-view');
      if (activeViewId) {
        // Find and activate the corresponding tab
        const activeTab = mainTabsContainer.querySelector(`.main-tab[data-view="${activeViewId}"]`);
        if (activeTab) {
          updatedTabs.forEach(t => t.classList.remove('active'));
          activeTab.classList.add('active');
        }
      }
    } else {
      // No active panel, default to executive
      const executiveTab = mainTabsContainer.querySelector('.main-tab[data-view="executive"]');
      if (executiveTab) {
        updatedTabs.forEach(t => t.classList.remove('active'));
        executiveTab.classList.add('active');
        
        const executivePanel = document.querySelector('.view-panel[data-view="executive"]');
        if (executivePanel) {
          document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
          executivePanel.classList.add('active');
        }
      }
    }
    
    console.log('Main tabs fixed successfully');
  }
}
