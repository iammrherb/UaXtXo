/**
 * Fixed View Organization for Portnox Total Cost Analyzer
 * Ensures proper DOM hierarchy and prevents circular references
 */

// Store references to views
window.viewReferences = {
  executive: null,
  financial: null,
  security: null,
  technical: null
};

// Initialize security view with necessary methods
window.securityView = {
  createPanelsIfNeeded: function() {
    console.log('Creating security view panels');
    
    const securityPanel = document.querySelector('.view-panel[data-view="security"]');
    if (!securityPanel) return;
    
    // Check if panels already exist
    if (securityPanel.querySelector('.results-tabs')) return;
    
    // Create tabs container
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'results-tabs';
    
    // Create risk tab
    const riskTab = document.createElement('button');
    riskTab.className = 'results-tab active';
    riskTab.setAttribute('data-tab', 'risk');
    riskTab.innerHTML = '<i class="fas fa-shield-alt"></i> Risk Assessment';
    tabsContainer.appendChild(riskTab);
    
    // Create compliance tab
    const complianceTab = document.createElement('button');
    complianceTab.className = 'results-tab';
    complianceTab.setAttribute('data-tab', 'compliance');
    complianceTab.innerHTML = '<i class="fas fa-check-circle"></i> Compliance';
    tabsContainer.appendChild(complianceTab);
    
    // Create breach tab
    const breachTab = document.createElement('button');
    breachTab.className = 'results-tab';
    breachTab.setAttribute('data-tab', 'breach');
    breachTab.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Breach Impact';
    tabsContainer.appendChild(breachTab);
    
    // Add tabs to panel
    securityPanel.appendChild(tabsContainer);
    
    // Create panel containers
    const panels = ['risk', 'compliance', 'breach'];
    panels.forEach(panelId => {
      const panelElement = document.createElement('div');
      panelElement.className = 'results-panel';
      panelElement.setAttribute('data-panel', panelId);
      
      if (panelId === 'risk') {
        panelElement.classList.add('active');
        
        // Add risk assessment content
        panelElement.innerHTML = `
          <div class="panel-header">
            <h2>Security Risk Assessment</h2>
            <p class="subtitle">Analysis of security posture and risk mitigation with Portnox Cloud</p>
          </div>
          
          <div class="dashboard-grid">
            <div class="dashboard-card highlight-card">
              <h3>Risk Reduction</h3>
              <div class="metric-value highlight-value">85%</div>
              <div class="metric-label">Overall risk reduction with Portnox Cloud</div>
              <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 15% better than industry average</div>
            </div>
            
            <div class="dashboard-card">
              <h3>Threat Detection</h3>
              <div class="metric-value">97%</div>
              <div class="metric-label">Accuracy in identifying threats</div>
              <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 12% improvement</div>
            </div>
            
            <div class="dashboard-card">
              <h3>Response Time</h3>
              <div class="metric-value">4.5 min</div>
              <div class="metric-label">Average time to respond to incidents</div>
              <div class="metric-trend down"><i class="fas fa-arrow-down"></i> 68% faster</div>
            </div>
            
            <div class="dashboard-card">
              <h3>Compliance Score</h3>
              <div class="metric-value">94%</div>
              <div class="metric-label">Overall compliance status</div>
              <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 23% increase</div>
            </div>
          </div>
          
          <div class="chart-container">
            <h3><i class="fas fa-shield-alt"></i> NIST Cybersecurity Framework</h3>
            <div class="chart-wrapper" id="nist-framework-chart"></div>
          </div>
        `;
      } else if (panelId === 'compliance') {
        // Add compliance content
        panelElement.innerHTML = `
          <div class="panel-header">
            <h2>Compliance Coverage</h2>
            <p class="subtitle">Regulatory compliance capabilities across industry standards</p>
          </div>
          
          <div class="chart-container">
            <h3><i class="fas fa-check-circle"></i> Compliance Framework Coverage</h3>
            <div class="chart-wrapper" id="security-frameworks-chart"></div>
          </div>
        `;
      } else if (panelId === 'breach') {
        // Add breach impact content
        panelElement.innerHTML = `
          <div class="panel-header">
            <h2>Breach Impact Analysis</h2>
            <p class="subtitle">Financial impact of security breaches and mitigation</p>
          </div>
          
          <div class="chart-container">
            <h3><i class="fas fa-exclamation-triangle"></i> Breach Cost & Response Time</h3>
            <div class="chart-wrapper" id="breach-impact-chart"></div>
          </div>
        `;
      }
      
      securityPanel.appendChild(panelElement);
    });
    
    // Add event listeners to tabs
    tabsContainer.querySelectorAll('.results-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        tabsContainer.querySelectorAll('.results-tab').forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Hide all panels
        const panels = securityPanel.querySelectorAll('.results-panel');
        panels.forEach(p => p.classList.remove('active'));
        
        // Show selected panel
        const tabId = this.getAttribute('data-tab');
        securityPanel.querySelector(`.results-panel[data-panel="${tabId}"]`).classList.add('active');
      });
    });
  }
};

// Safe organizeViews function that avoids hierarchy issues
function organizeViews() {
  console.log('Organizing views safely...');
  
  // Get all view panels
  const viewPanels = document.querySelectorAll('.view-panel');
  
  // First, detach all panels from their parents to avoid hierarchy issues
  viewPanels.forEach(panel => {
    if (panel.parentNode) {
      window.viewReferences[panel.getAttribute('data-view')] = panel.cloneNode(true);
      panel.parentNode.removeChild(panel);
    }
  });
  
  // Get the main container
  const contentArea = document.querySelector('.content-area');
  if (!contentArea) {
    console.error('Content area not found');
    return;
  }
  
  // Reattach all panels to the content area
  Object.values(window.viewReferences).forEach(panel => {
    if (panel) {
      contentArea.appendChild(panel);
    }
  });
  
  // Setup tab navigation
  setupTabNavigation();
  
  console.log('Views organized successfully');
}

// Set up tab navigation
function setupTabNavigation() {
  const mainTabs = document.querySelectorAll('.main-tab');
  const viewPanels = document.querySelectorAll('.view-panel');
  
  mainTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      mainTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Hide all panels
      viewPanels.forEach(p => p.classList.remove('active'));
      
      // Show selected panel
      const view = this.getAttribute('data-view');
      const panel = document.querySelector(`.view-panel[data-view="${view}"]`);
      if (panel) {
        panel.classList.add('active');
        
        // If security view, create panels if needed
        if (view === 'security' && window.securityView && typeof window.securityView.createPanelsIfNeeded === 'function') {
          window.securityView.createPanelsIfNeeded();
        }
      }
    });
  });
}

// Initialize views
function initializeViews() {
  console.log('Initializing views...');
  
  // Set first tab as active if none are active
  const mainTabs = document.querySelectorAll('.main-tab');
  const activeTab = document.querySelector('.main-tab.active');
  
  if (!activeTab && mainTabs.length > 0) {
    mainTabs[0].classList.add('active');
    const view = mainTabs[0].getAttribute('data-view');
    const panel = document.querySelector(`.view-panel[data-view="${view}"]`);
    if (panel) {
      panel.classList.add('active');
    }
  }
  
  // Initialize security view if showing
  const activePanel = document.querySelector('.view-panel.active');
  if (activePanel && activePanel.getAttribute('data-view') === 'security') {
    if (window.securityView && typeof window.securityView.createPanelsIfNeeded === 'function') {
      window.securityView.createPanelsIfNeeded();
    }
  }
  
  console.log('Views initialized successfully');
}

// Attach to window to make accessible
window.organizeViews = organizeViews;
window.initializeViews = initializeViews;
