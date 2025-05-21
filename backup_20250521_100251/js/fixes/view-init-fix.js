/**
 * View Initialization Fix for Portnox Total Cost Analyzer
 * Ensures each view is properly initialized with its container
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying view initialization fix...');
  
  // Wait for content to be properly loaded
  setTimeout(initializeViews, 800);
  
  function initializeViews() {
    // Initialize executive view
    if (window.executiveView) {
      const executivePanel = document.querySelector('.view-panel[data-view="executive"]');
      if (executivePanel) {
        console.log('Re-initializing executive view with proper container...');
        
        // Save current tab if already initialized
        const currentTab = window.executiveView.currentTab || 'executive-summary';
        
        // Re-initialize with correct container
        window.executiveView.container = executivePanel;
        window.executiveView.currentTab = currentTab;
        window.executiveView.initialized = true;
        
        // Initialize tabs if needed
        if (!executivePanel.querySelector('.results-tabs')) {
          window.executiveView.createTabsIfNeeded();
        }
        
        // Initialize panels if needed
        window.executiveView.createPanelsIfNeeded();
        
        // Refresh current panel
        window.executiveView.refreshChartsInPanel(currentTab);
        
        console.log('Executive view re-initialized successfully');
      }
    }
    
    // Initialize security view
    if (window.securityView) {
      const securityPanel = document.querySelector('.view-panel[data-view="security"]');
      if (securityPanel) {
        console.log('Re-initializing security view with proper container...');
        
        // Save current tab if already initialized
        const currentTab = window.securityView.currentTab || 'security-overview';
        
        // Re-initialize with correct container
        window.securityView.container = securityPanel;
        window.securityView.currentTab = currentTab;
        window.securityView.initialized = true;
        
        // Initialize tabs if needed
        if (!securityPanel.querySelector('.results-tabs')) {
          window.securityView.createTabsIfNeeded();
        }
        
        // Initialize panels if needed
        window.securityView.createPanelsIfNeeded();
        
        // Refresh current panel
        window.securityView.refreshChartsInPanel(currentTab);
        
        console.log('Security view re-initialized successfully');
      }
    }
    
    // Initialize financial view if needed
    initializeFinancialView();
    
    // Initialize technical view if needed
    initializeTechnicalView();
    
    // Setup main tab navigation
    setupMainTabsNavigation();
  }
  
  function initializeFinancialView() {
    const financialPanel = document.querySelector('.view-panel[data-view="financial"]');
    if (!financialPanel) return;
    
    // Check if any content exists
    if (financialPanel.children.length === 0) {
      console.log('Creating basic financial view content...');
      
      // Create tabs
      const tabsContainer = document.createElement('div');
      tabsContainer.className = 'results-tabs';
      tabsContainer.innerHTML = `
        <button class="results-tab active" data-panel="financial-summary">
          <i class="fas fa-chart-line"></i> Financial Summary
        </button>
        <button class="results-tab" data-panel="financial-tco">
          <i class="fas fa-money-bill-wave"></i> TCO Analysis
        </button>
        <button class="results-tab" data-panel="financial-roi">
          <i class="fas fa-percentage"></i> ROI Calculation
        </button>
        <button class="results-tab" data-panel="financial-projections">
          <i class="fas fa-chart-area"></i> Projections
        </button>
      `;
      financialPanel.appendChild(tabsContainer);
      
      // Create first panel
      const summaryPanel = document.createElement('div');
      summaryPanel.id = 'financial-summary';
      summaryPanel.className = 'results-panel active';
      summaryPanel.innerHTML = `
        <div class="panel-header">
          <h2>Financial Summary</h2>
          <p class="subtitle">Comprehensive financial analysis and TCO breakdown</p>
        </div>
        
        <div class="dashboard-grid">
          <div class="metric-card primary">
            <div class="card-icon"><i class="fas fa-dollar-sign"></i></div>
            <div class="metric-title">3-Year TCO</div>
            <div class="metric-value" id="financial-tco-value">$245,000</div>
            <div class="metric-description">Total cost of ownership</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> 53% below competitors
            </div>
          </div>
          
          <div class="metric-card secondary">
            <div class="card-icon"><i class="fas fa-percentage"></i></div>
            <div class="metric-title">ROI</div>
            <div class="metric-value" id="financial-roi-value">325%</div>
            <div class="metric-description">Return on investment</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> Industry leading returns
            </div>
          </div>
          
          <div class="metric-card accent">
            <div class="card-icon"><i class="fas fa-calendar-check"></i></div>
            <div class="metric-title">Payback Period</div>
            <div class="metric-value" id="financial-payback-value">7 months</div>
            <div class="metric-description">Time to positive ROI</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> 4.5x faster than on-premises
            </div>
          </div>
          
          <div class="metric-card">
            <div class="card-icon"><i class="fas fa-money-bill-alt"></i></div>
            <div class="metric-title">Annual Savings</div>
            <div class="metric-value" id="financial-savings-value">$91,700</div>
            <div class="metric-description">Average yearly benefit</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> Significant cost reduction
            </div>
          </div>
        </div>
        
        <div class="chart-container">
          <div class="chart-title"><i class="fas fa-chart-bar"></i> Total Cost of Ownership Breakdown</div>
          <div class="chart-subtitle">Detailed cost analysis by category over 3 years</div>
          <div class="chart-wrapper" id="financial-tco-breakdown-chart"></div>
        </div>
      `;
      
      financialPanel.appendChild(summaryPanel);
      
      // Setup tab navigation
      setupTabsNavigation(financialPanel);
    }
  }
  
  function initializeTechnicalView() {
    const technicalPanel = document.querySelector('.view-panel[data-view="technical"]');
    if (!technicalPanel) return;
    
    // Check if any content exists
    if (technicalPanel.children.length === 0) {
      console.log('Creating basic technical view content...');
      
      // Create tabs
      const tabsContainer = document.createElement('div');
      tabsContainer.className = 'results-tabs';
      tabsContainer.innerHTML = `
        <button class="results-tab active" data-panel="technical-overview">
          <i class="fas fa-cogs"></i> Technical Overview
        </button>
        <button class="results-tab" data-panel="technical-architecture">
          <i class="fas fa-network-wired"></i> Architecture
        </button>
        <button class="results-tab" data-panel="technical-deployment">
          <i class="fas fa-rocket"></i> Deployment
        </button>
        <button class="results-tab" data-panel="technical-integrations">
          <i class="fas fa-plug"></i> Integrations
        </button>
      `;
      technicalPanel.appendChild(tabsContainer);
      
      // Create first panel
      const overviewPanel = document.createElement('div');
      overviewPanel.id = 'technical-overview';
      overviewPanel.className = 'results-panel active';
      overviewPanel.innerHTML = `
        <div class="panel-header">
          <h2>Technical Overview</h2>
          <p class="subtitle">Comprehensive technical analysis and comparison</p>
        </div>
        
        <div class="dashboard-grid">
          <div class="metric-card primary">
            <div class="card-icon"><i class="fas fa-server"></i></div>
            <div class="metric-title">Architecture</div>
            <div class="metric-value">Cloud-Native</div>
            <div class="metric-description">No on-premises infrastructure required</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> Zero hardware maintenance
            </div>
          </div>
          
          <div class="metric-card secondary">
            <div class="card-icon"><i class="fas fa-clock"></i></div>
            <div class="metric-title">Deployment Time</div>
            <div class="metric-value">3 weeks</div>
            <div class="metric-description">Average implementation timeframe</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> 75% faster than competitors
            </div>
          </div>
          
          <div class="metric-card accent">
            <div class="card-icon"><i class="fas fa-users-cog"></i></div>
            <div class="metric-title">IT Resources</div>
            <div class="metric-value">0.25 FTE</div>
            <div class="metric-description">IT staff allocation required</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> 8x less than on-premises
            </div>
          </div>
          
          <div class="metric-card">
            <div class="card-icon"><i class="fas fa-sync-alt"></i></div>
            <div class="metric-title">Updates</div>
            <div class="metric-value">Automatic</div>
            <div class="metric-description">No manual updates required</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> Always up-to-date
            </div>
          </div>
        </div>
        
        <div class="chart-container">
          <div class="chart-title"><i class="fas fa-network-wired"></i> Architecture Comparison</div>
          <div class="chart-subtitle">Key differences between deployment models</div>
          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon" style="background: linear-gradient(135deg, #1a5a96, #0d4275);">
                <i class="fas fa-cloud"></i>
              </div>
              <h3>Portnox: Cloud-Native</h3>
              <p><strong>Pros:</strong> No infrastructure, automatic updates, global scalability, rapid deployment, no maintenance overhead</p>
              <p><strong>Cons:</strong> Internet connectivity required</p>
            </div>
            
            <div class="benefit-card">
              <div class="benefit-icon" style="background: linear-gradient(135deg, #00bceb, #0078d4);">
                <i class="fas fa-server"></i>
              </div>
              <h3>Competitors: On-Premises</h3>
              <p><strong>Pros:</strong> Full control over infrastructure, offline operation capability</p>
              <p><strong>Cons:</strong> High hardware costs, complex deployment, significant maintenance, long implementation</p>
            </div>
          </div>
        </div>
      `;
      
      technicalPanel.appendChild(overviewPanel);
      
      // Setup tab navigation
      setupTabsNavigation(technicalPanel);
    }
  }
  
  function setupTabsNavigation(panel) {
    const tabs = panel.querySelectorAll('.results-tab');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const panelId = this.getAttribute('data-panel');
        
        // Remove active class from all tabs and panels
        tabs.forEach(t => t.classList.remove('active'));
        const panels = panel.querySelectorAll('.results-panel');
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding panel
        const targetPanel = document.getElementById(panelId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        } else {
          // Create panel if it doesn't exist
          const newPanel = document.createElement('div');
          newPanel.id = panelId;
          newPanel.className = 'results-panel active';
          
          // Add basic content based on panel id
          newPanel.innerHTML = `
            <div class="panel-header">
              <h2>${getPanelTitle(panelId)}</h2>
              <p class="subtitle">${getPanelSubtitle(panelId)}</p>
            </div>
            
            <div class="chart-container">
              <div class="chart-title"><i class="fas fa-info-circle"></i> Panel Content</div>
              <div class="chart-subtitle">This panel content will be populated with data</div>
              <div class="chart-wrapper" id="${panelId}-chart"></div>
            </div>
          `;
          
          panel.appendChild(newPanel);
        }
      });
    });
  }
  
  function getPanelTitle(panelId) {
    switch(panelId) {
      case 'financial-tco': return 'TCO Analysis';
      case 'financial-roi': return 'ROI Calculation';
      case 'financial-projections': return 'Financial Projections';
      case 'technical-architecture': return 'Technical Architecture';
      case 'technical-deployment': return 'Deployment Process';
      case 'technical-integrations': return 'Integration Capabilities';
      default: return panelId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  }
  
  function getPanelSubtitle(panelId) {
    switch(panelId) {
      case 'financial-tco': return 'Detailed total cost of ownership breakdown and analysis';
      case 'financial-roi': return 'Return on investment calculation and value drivers';
      case 'financial-projections': return 'Multi-year financial projections and forecasts';
      case 'technical-architecture': return 'Technical architecture details and comparison';
      case 'technical-deployment': return 'Deployment process and implementation timeline';
      case 'technical-integrations': return 'Integration capabilities with existing systems';
      default: return 'Detailed analysis and metrics';
    }
  }
  
  function setupMainTabsNavigation() {
    // Add click event to main tabs if not already set up
    const mainTabs = document.querySelectorAll('.main-tab');
    if (!mainTabs || mainTabs.length === 0) return;
    
    mainTabs.forEach(tab => {
      // Check if event listener is already attached (by presence of data attribute)
      if (tab.getAttribute('data-event-attached') === 'true') return;
      
      // Clone to remove any existing event listeners
      const newTab = tab.cloneNode(true);
      tab.parentNode.replaceChild(newTab, tab);
      
      // Add new event listener
      newTab.addEventListener('click', function() {
        const view = this.getAttribute('data-view');
        
        // Remove active class from all tabs
        mainTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding panel
        const viewPanels = document.querySelectorAll('.view-panel');
        viewPanels.forEach(p => p.classList.remove('active'));
        
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
      
      // Mark as event attached
      newTab.setAttribute('data-event-attached', 'true');
    });
  }
});
