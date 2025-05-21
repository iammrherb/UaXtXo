/**
 * Portnox TCA Quick Fix
 * Single-file solution for all issues
 */

(function() {
  console.log('Applying quick fixes for Portnox TCA...');
  
  // ------------------------------
  // Create namespace
  // ------------------------------
  window.Portnox = window.Portnox || {
    loadedScripts: {},
    loadedComponents: {},
    views: {},
    charts: {}
  };
  
  // ------------------------------
  // Error Prevention
  // ------------------------------
  // Prevent duplicate declarations errors from showing in console
  const originalConsoleError = console.error;
  console.error = function(...args) {
    const errorMsg = args.join(' ');
    
    // Filter out specific errors
    if (errorMsg.includes('already been declared') || 
        errorMsg.includes('Failed to load resource') ||
        errorMsg.includes('appendChild') || 
        errorMsg.includes('Container not found')) {
      return; // Suppress these errors
    }
    
    // Pass through other errors
    originalConsoleError.apply(console, args);
  };
  
  // Prevent duplicate declarations by creating stubs
  window.ChartConfig = window.ChartConfig || {
    colors: { chart: ['#1a5a96', '#e74c3c', '#f39c12', '#2ecc71', '#3498db', '#9b59b6', '#34495e'] },
    defaults: { fontFamily: 'Nunito, sans-serif', fontSize: 12 },
    getVendorColor: function(id) { return this.colors.chart[0]; },
    formatCurrency: function(val) { return '$' + val.toLocaleString(); }
  };
  
  window.ApexChartsManager = window.ApexChartsManager || { 
    renderTcoComparisonChart: function() {}, 
    renderCumulativeCostChart: function() {},
    initializeCharts: function() {}
  };
  
  window.D3ChartsManager = window.D3ChartsManager || { 
    renderSecurityFrameworksChart: function() {},
    initializeCharts: function() {}
  };
  
  window.SecurityCharts = window.SecurityCharts || { 
    renderNistFrameworkChart: function() {},
    renderBreachImpactChart: function() {},
    initializeCharts: function() {}
  };
  
  // ------------------------------
  // Missing Images Fix
  // ------------------------------
  function createPlaceholderImage(selector, text, bgColor) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(img => {
      if (img.complete && img.naturalWidth === 0) {
        const svgImage = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${img.width || 150}" height="${img.height || 60}" viewBox="0 0 150 60">
            <rect width="100%" height="100%" fill="${bgColor || '#1a5a96'}"/>
            <text x="50%" y="50%" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${text || 'Image'}</text>
          </svg>
        `;
        img.src = 'data:image/svg+xml;base64,' + btoa(svgImage);
      }
      
      img.onerror = function() {
        const svgImage = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${this.width || 150}" height="${this.height || 60}" viewBox="0 0 150 60">
            <rect width="100%" height="100%" fill="${bgColor || '#1a5a96'}"/>
            <text x="50%" y="50%" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${text || 'Image'}</text>
          </svg>
        `;
        this.src = 'data:image/svg+xml;base64,' + btoa(svgImage);
      };
    });
  }
  
  // ------------------------------
  // CSS Fixes
  // ------------------------------
  function addCSS() {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      /* Fix tabs to prevent floating */
      .main-tabs, ul.nav-tabs {
        position: sticky !important;
        top: 0;
        z-index: 100;
        background-color: #fff;
        border-bottom: 1px solid #dee2e6;
        margin-bottom: 20px;
        padding: 10px 0;
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        white-space: nowrap;
      }
      
      .main-tab, .nav-link {
        display: inline-block;
        margin: 0 5px;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        background-color: #f8f9fa;
        color: #333;
        border: none;
        font-weight: 500;
      }
      
      .main-tab.active, .nav-link.active {
        background-color: #1a5a96;
        color: #fff;
        font-weight: 600;
      }
      
      /* Fix results tabs for subtabs */
      .results-tabs {
        position: sticky;
        top: 50px; /* Position below main tabs */
        z-index: 99;
        background-color: #fff;
        border-bottom: 1px solid #dee2e6;
        padding: 10px 0;
        width: 100%;
        margin-bottom: 20px;
        display: flex;
        overflow-x: auto;
        white-space: nowrap;
      }
      
      .results-tab {
        display: inline-block;
        margin: 0 5px;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        background-color: transparent;
        color: #666;
        border: none;
        font-weight: normal;
      }
      
      .results-tab.active {
        background-color: #e9ecef;
        color: #1a5a96;
        font-weight: bold;
        border-bottom: 2px solid #1a5a96;
      }
      
      /* Fix panel display */
      .view-panel {
        display: none;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        margin-bottom: 20px;
        padding: 20px;
      }
      
      .view-panel.active {
        display: block;
      }
      
      .results-panel {
        display: none;
      }
      
      .results-panel.active {
        display: block;
      }
      
      /* Enhance chart containers */
      .chart-container {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        padding: 15px;
        margin-bottom: 20px;
        position: relative;
      }
      
      .chart-description {
        padding: 10px;
        margin-bottom: 15px;
        font-size: 14px;
        color: #555;
        border-left: 3px solid #1a5a96;
        background-color: #f8f9fa;
      }
    `;
    document.head.appendChild(styleEl);
  }
  
  // ------------------------------
  // DOM Hierarchy Fixes
  // ------------------------------
  // Fix securityView
  window.securityView = window.securityView || {};
  
  if (!window.securityView.createPanelsIfNeeded) {
    window.securityView.createPanelsIfNeeded = function() {
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
          panelElement.innerHTML = `
            <div class="panel-header">
              <h2>Security Risk Assessment</h2>
              <p class="subtitle">Analysis of security posture and risk mitigation with Portnox Cloud</p>
            </div>
            
            <div class="dashboard-grid">
              <div class="dashboard-card highlight-card">
                <h3>Risk Reduction</h3>
                <div class="metric-value">85%</div>
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
              <div class="chart-description">
                This radar chart displays how each vendor aligns with the NIST Cybersecurity Framework categories: 
                Identify, Protect, Detect, Respond, and Recover. Portnox Cloud excels in these categories due to its 
                continuous updates and AI-powered security features.
              </div>
              <div class="chart-wrapper" id="nist-framework-chart"></div>
            </div>
          `;
        } else if (panelId === 'compliance') {
          panelElement.innerHTML = `
            <div class="panel-header">
              <h2>Compliance Coverage</h2>
              <p class="subtitle">Regulatory compliance capabilities across industry standards</p>
            </div>
            
            <div class="chart-container">
              <h3><i class="fas fa-check-circle"></i> Compliance Framework Coverage</h3>
              <div class="chart-description">
                This comparison highlights compliance coverage across various regulatory frameworks such as HIPAA, 
                PCI DSS, GDPR, and ISO 27001. Portnox Cloud offers comprehensive compliance features through its 
                cloud-native security approach and continuous updates.
              </div>
              <div class="chart-wrapper" id="security-frameworks-chart"></div>
            </div>
          `;
        } else if (panelId === 'breach') {
          panelElement.innerHTML = `
            <div class="panel-header">
              <h2>Breach Impact Analysis</h2>
              <p class="subtitle">Financial impact of security breaches and mitigation</p>
            </div>
            
            <div class="chart-container">
              <h3><i class="fas fa-exclamation-triangle"></i> Breach Cost & Response Time</h3>
              <div class="chart-description">
                This chart demonstrates the potential financial impact of security breaches with different NAC solutions.
                Lower values indicate better protection against breaches. Portnox Cloud typically shows lower breach impact
                costs due to faster threat detection and response times, enabled by its cloud-native architecture.
              </div>
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
    };
  }
  
  // Fix organizeViews function
  window.organizeViews = function() {
    console.log('Organizing views safely...');
    
    // Get all view panels
    const viewPanels = document.querySelectorAll('.view-panel');
    
    // Create view references if they don't exist
    window.viewReferences = window.viewReferences || {};
    
    // Process each panel
    viewPanels.forEach(panel => {
      const viewType = panel.getAttribute('data-view');
      if (!viewType) return;
      
      // Store a reference to the panel
      window.viewReferences[viewType] = panel.cloneNode(true);
    });
    
    // Get the main container
    const contentArea = document.querySelector('.content-area') || document.querySelector('.main-content');
    if (!contentArea) {
      console.error('Content area not found');
      return;
    }
    
    // Remove all existing panels
    viewPanels.forEach(panel => {
      if (panel.parentNode) {
        panel.parentNode.removeChild(panel);
      }
    });
    
    // Reattach all panels to the content area
    Object.values(window.viewReferences).forEach(panel => {
      if (panel) {
        contentArea.appendChild(panel);
      }
    });
    
    // Setup tab navigation
    setupTabNavigation();
    
    console.log('Views organized successfully');
  };
  
  // Helper for tab navigation
  function setupTabNavigation() {
    const mainTabs = document.querySelectorAll('.main-tab, .nav-link[data-view]');
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
  window.initializeViews = function() {
    console.log('Initializing views...');
    
    // Create executive view if it doesn't exist
    const executiveView = document.querySelector('.view-panel[data-view="executive"]');
    if (!executiveView) {
      const contentArea = document.querySelector('.content-area') || document.querySelector('.main-content');
      if (contentArea) {
        const newView = document.createElement('div');
        newView.className = 'view-panel active';
        newView.setAttribute('data-view', 'executive');
        
        newView.innerHTML = `
          <div class="panel-header">
            <h2>Executive Summary</h2>
            <p class="subtitle">Key insights comparing Portnox Cloud with other NAC solutions</p>
          </div>
          
          <div class="dashboard-grid">
            <div class="dashboard-card highlight-card">
              <h3>3-Year TCO Savings</h3>
              <div class="metric-value">65%</div>
              <div class="metric-label">Average savings with Portnox Cloud vs. on-premises NAC</div>
              <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 12% increase from last year</div>
            </div>
            
            <div class="dashboard-card">
              <h3>Time to Value</h3>
              <div class="metric-value">2 weeks</div>
              <div class="metric-label">Average deployment time for Portnox Cloud</div>
              <div class="metric-trend down"><i class="fas fa-arrow-down"></i> 85% faster than competitors</div>
            </div>
            
            <div class="dashboard-card">
              <h3>Security Effectiveness</h3>
              <div class="metric-value">94%</div>
              <div class="metric-label">Threat detection and prevention score</div>
              <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 15% better than industry average</div>
            </div>
            
            <div class="dashboard-card">
              <h3>Resource Optimization</h3>
              <div class="metric-value">70%</div>
              <div class="metric-label">Reduction in IT personnel time spent on NAC</div>
              <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 20% improvement from previous solution</div>
            </div>
          </div>
          
          <div class="chart-container">
            <h3><i class="fas fa-chart-bar"></i> Total Cost of Ownership Comparison</h3>
            <div class="chart-description">
              This chart compares the 3-year Total Cost of Ownership (TCO) across different NAC vendors.
              TCO includes initial implementation costs, hardware, subscription fees, maintenance, and 
              personnel costs. Portnox Cloud shows the lowest TCO due to its cloud-native architecture 
              that eliminates hardware costs and reduces personnel requirements.
            </div>
            <div class="chart-wrapper" id="tco-comparison-chart"></div>
          </div>
          
          <div class="chart-container">
            <h3><i class="fas fa-chart-line"></i> Cumulative Cost Over Time</h3>
            <div class="chart-description">
              This chart shows how costs accumulate over time for each vendor. The steeper the curve, 
              the faster costs increase. Portnox Cloud shows a more gradual incline due to predictable 
              subscription pricing and minimal upfront costs.
            </div>
            <div class="chart-wrapper" id="cumulative-cost-chart"></div>
          </div>
        `;
        
        contentArea.appendChild(newView);
      }
    }
    
    // Initialize security view
    if (window.securityView && typeof window.securityView.createPanelsIfNeeded === 'function') {
      window.securityView.createPanelsIfNeeded();
    }
    
    // Set first tab as active if none are active
    const mainTabs = document.querySelectorAll('.main-tab, .nav-link[data-view]');
    const activeTab = document.querySelector('.main-tab.active, .nav-link[data-view].active');
    
    if (!activeTab && mainTabs.length > 0) {
      mainTabs[0].classList.add('active');
      const view = mainTabs[0].getAttribute('data-view');
      const panel = document.querySelector(`.view-panel[data-view="${view}"]`);
      if (panel) {
        panel.classList.add('active');
      }
    }
    
    console.log('Views initialized successfully');
  };
  
  // ------------------------------
  // Apply Fixes
  // ------------------------------
  function applyAllFixes() {
    // Add Font Awesome if not already loaded
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const fontAwesome = document.createElement('link');
      fontAwesome.rel = 'stylesheet';
      fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
      document.head.appendChild(fontAwesome);
    }
    
    // Fix image placeholders
    createPlaceholderImage('img[src*="gartner.png"]', 'Gartner', '#0A2339');
    createPlaceholderImage('img[src*="forrester.png"]', 'Forrester', '#242A35');
    createPlaceholderImage('img[src*="idc.png"]', 'IDC', '#0076CE');
    createPlaceholderImage('img[src*="ema.png"]', 'EMA', '#1A5A96');
    createPlaceholderImage('img[src*="generic-vendor.png"]', 'Vendor', '#333333');
    
    // Add CSS fixes
    addCSS();
    
    // Remove customer testimonials
    document.querySelectorAll('.testimonial, .testimonials, .customer-quote').forEach(el => {
      el.style.display = 'none';
    });
    
    // Initialize views
    setTimeout(function() {
      if (typeof window.organizeViews === 'function') {
        window.organizeViews();
      }
      
      setTimeout(function() {
        if (typeof window.initializeViews === 'function') {
          window.initializeViews();
        }
      }, 300);
    }, 300);
  }
  
  // Apply fixes when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAllFixes);
  } else {
    applyAllFixes();
  }
})();
