/**
 * View Organization Fix for Portnox Total Cost Analyzer
 * Ensures each view is properly placed under its correct tab
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying view organization fix...');
  
  // Wait for the DOM to be fully ready
  setTimeout(organizeViews, 500);
  
  function organizeViews() {
    // Get main content container
    const contentArea = document.querySelector('.content-area');
    if (!contentArea) {
      console.error('Content area not found, cannot organize views');
      return;
    }
    
    // Get all view panels
    const viewPanels = contentArea.querySelectorAll('.view-panel');
    if (!viewPanels || viewPanels.length === 0) {
      console.error('No view panels found, cannot organize views');
      return;
    }
    
    // Ensure each main tab exists
    const mainTabs = ['executive', 'financial', 'security', 'technical'];
    const mainTabsContainer = document.querySelector('.main-tabs');
    
    // Create main tabs if they don't exist
    if (!mainTabsContainer) {
      console.log('Creating main tabs container...');
      const newMainTabsContainer = document.createElement('div');
      newMainTabsContainer.className = 'main-tabs';
      
      mainTabs.forEach((tabId, index) => {
        const tabButton = document.createElement('button');
        tabButton.className = 'main-tab' + (index === 0 ? ' active' : '');
        tabButton.setAttribute('data-view', tabId);
        
        let icon, text;
        switch(tabId) {
          case 'executive':
            icon = 'chart-pie';
            text = 'Executive';
            break;
          case 'financial':
            icon = 'coins';
            text = 'Financial';
            break;
          case 'security':
            icon = 'shield-alt';
            text = 'Security';
            break;
          case 'technical':
            icon = 'cogs';
            text = 'Technical';
            break;
        }
        
        tabButton.innerHTML = `<i class="fas fa-${icon}"></i> ${text}`;
        newMainTabsContainer.appendChild(tabButton);
      });
      
      // Add to content area
      const contentWrapper = contentArea.querySelector('.content-wrapper');
      if (contentWrapper) {
        contentWrapper.prepend(newMainTabsContainer);
      } else {
        // Create content wrapper if it doesn't exist
        const newContentWrapper = document.createElement('div');
        newContentWrapper.className = 'content-wrapper';
        newContentWrapper.appendChild(newMainTabsContainer);
        contentArea.appendChild(newContentWrapper);
      }
      
      // Store for further use
      mainTabsContainer = newMainTabsContainer;
    }
    
    // Ensure each view panel exists
    mainTabs.forEach((viewId) => {
      let viewPanel = contentArea.querySelector(`.view-panel[data-view="${viewId}"]`);
      
      // Create the view panel if it doesn't exist
      if (!viewPanel) {
        console.log(`Creating view panel for ${viewId}...`);
        viewPanel = document.createElement('div');
        viewPanel.className = 'view-panel';
        viewPanel.setAttribute('data-view', viewId);
        
        // Add to content wrapper
        const contentWrapper = contentArea.querySelector('.content-wrapper');
        if (contentWrapper) {
          contentWrapper.appendChild(viewPanel);
        }
      }
      
      // Ensure only the first view panel is active
      if (viewId === 'executive') {
        viewPanel.classList.add('active');
      } else {
        viewPanel.classList.remove('active');
      }
    });
    
    // Move any misplaced panels to their correct locations
    viewPanels.forEach((panel) => {
      const panelId = panel.id || '';
      let targetViewId = '';
      
      // Determine which main view this panel belongs to
      if (panelId.startsWith('executive-') || panelId === 'executive-summary') {
        targetViewId = 'executive';
      } else if (panelId.startsWith('financial-') || panelId === 'financial-summary') {
        targetViewId = 'financial';
      } else if (panelId.startsWith('security-') || panelId === 'security-overview') {
        targetViewId = 'security';
      } else if (panelId.startsWith('technical-') || panelId === 'technical-overview') {
        targetViewId = 'technical';
      } else {
        // If no match, check the data-panel attribute instead
        const dataPanelAttr = panel.getAttribute('data-panel');
        if (dataPanelAttr) {
          if (dataPanelAttr.startsWith('executive-')) targetViewId = 'executive';
          else if (dataPanelAttr.startsWith('financial-')) targetViewId = 'financial';
          else if (dataPanelAttr.startsWith('security-')) targetViewId = 'security';
          else if (dataPanelAttr.startsWith('technical-')) targetViewId = 'technical';
        }
      }
      
      // Skip if we couldn't determine the target view
      if (!targetViewId) return;
      
      // Get the target view panel
      const targetPanel = contentArea.querySelector(`.view-panel[data-view="${targetViewId}"]`);
      if (!targetPanel) return;
      
      // Move the panel to the target view if it's not already there
      const currentParent = panel.parentElement;
      if (currentParent && !currentParent.classList.contains('view-panel')) {
        console.log(`Moving ${panelId} to ${targetViewId} view...`);
        targetPanel.appendChild(panel);
      }
    });
    
    // Set up tab navigation
    setupTabNavigation();
    console.log('Views organized successfully');
  }
  
  function setupTabNavigation() {
    // Add click event to main tabs
    const mainTabs = document.querySelectorAll('.main-tab');
    const viewPanels = document.querySelectorAll('.view-panel');
    
    mainTabs.forEach(tab => {
      // Remove existing event listeners by cloning
      const newTab = tab.cloneNode(true);
      tab.parentNode.replaceChild(newTab, tab);
      
      // Add new event listener
      newTab.addEventListener('click', function() {
        const view = this.getAttribute('data-view');
        
        // Remove active class from all tabs and panels
        mainTabs.forEach(t => t.classList.remove('active'));
        viewPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        this.classList.add('active');
        const viewPanel = document.querySelector(`.view-panel[data-view="${view}"]`);
        if (viewPanel) {
          viewPanel.classList.add('active');
          
          // Refresh charts in the active view
          if (view === 'executive' && window.executiveView) {
            window.executiveView.refreshChartsInPanel(window.executiveView.currentTab);
          } else if (view === 'security' && window.securityView) {
            window.securityView.refreshChartsInPanel(window.securityView.currentTab);
          }
        }
      });
    });
  }
});
