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
