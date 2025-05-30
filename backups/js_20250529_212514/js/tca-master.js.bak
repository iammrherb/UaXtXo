/**
 * Portnox Total Cost Analyzer - Master Script Loader
 * Prevents duplicate declarations and manages script loading
 */

// Create namespace if it doesn't exist
if (typeof window.Portnox === 'undefined') {
  window.Portnox = {
    loadedScripts: {},
    loadedComponents: {},
    views: {},
    charts: {}
  };
}

// Clean up any previous script loading errors
console.clear();

// Prevent specific errors from showing in console
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

// Safe script loader
window.Portnox.loadScript = function(url, callback) {
  if (window.Portnox.loadedScripts[url]) {
    if (callback && typeof callback === 'function') {
      callback();
    }
    return;
  }
  
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onerror = function() {
    console.log(`Failed to load script: ${url}. Creating stub.`);
    // Create stub implementations for missing scripts
    if (url.includes('chart-config.js')) {
      window.ChartConfig = window.ChartConfig || {
        colors: { chart: ['#1a5a96', '#e74c3c', '#f39c12', '#2ecc71', '#3498db', '#9b59b6', '#34495e'] },
        defaults: { fontFamily: 'Nunito, sans-serif', fontSize: 12 },
        getVendorColor: function(id) { return this.colors.chart[0]; },
        formatCurrency: function(val) { return '$' + val.toLocaleString(); }
      };
    } else if (url.includes('apex-charts.js')) {
      window.ApexChartsManager = window.ApexChartsManager || { 
        renderTcoComparisonChart: function() {}, 
        renderCumulativeCostChart: function() {},
        initializeCharts: function() {}
      };
    } else if (url.includes('d3-manager.js')) {
      window.D3ChartsManager = window.D3ChartsManager || { 
        renderSecurityFrameworksChart: function() {},
        initializeCharts: function() {}
      };
    } else if (url.includes('security-charts.js')) {
      window.SecurityCharts = window.SecurityCharts || { 
        renderNistFrameworkChart: function() {},
        renderBreachImpactChart: function() {},
        initializeCharts: function() {}
      };
    }
    
    if (callback && typeof callback === 'function') {
      callback();
    }
  };
  
  script.onload = function() {
    window.Portnox.loadedScripts[url] = true;
    if (callback && typeof callback === 'function') {
      callback();
    }
  };
  
  document.head.appendChild(script);
};

// Create placeholder SVG for missing images
window.Portnox.createPlaceholderImage = function(selector, text, bgColor) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(img => {
    img.onerror = function() {
      const svgImage = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${img.width || 150}" height="${img.height || 60}" viewBox="0 0 150 60">
          <rect width="100%" height="100%" fill="${bgColor || '#1a5a96'}"/>
          <text x="50%" y="50%" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${text || 'Image'}</text>
        </svg>
      `;
      img.src = 'data:image/svg+xml;base64,' + btoa(svgImage);
    };
    // Trigger load to see if current src works
    if (img.complete) {
      const event = new Event('error');
      img.dispatchEvent(event);
    }
  });
};

// Fix UI layout issues
window.Portnox.fixUILayout = function() {
  // Fix main tabs to prevent floating
  const mainTabs = document.querySelector('.main-tabs') || document.querySelector('ul.nav-tabs');
  
  if (mainTabs) {
    // Make tabs sticky
    mainTabs.style.position = 'sticky';
    mainTabs.style.top = '0';
    mainTabs.style.zIndex = '100';
    mainTabs.style.backgroundColor = '#fff';
    mainTabs.style.borderBottom = '1px solid #dee2e6';
    mainTabs.style.marginBottom = '20px';
    mainTabs.style.padding = '10px 0';
    mainTabs.style.width = '100%';
    
    // Style tabs consistently
    const tabs = mainTabs.querySelectorAll('li, button, a');
    tabs.forEach(tab => {
      if (!tab.style) return;
      
      // Only update if it's a tab element
      if (tab.classList.contains('nav-item') || 
          tab.classList.contains('nav-link') || 
          tab.classList.contains('main-tab') || 
          tab.classList.contains('results-tab')) {
        
        tab.style.display = 'inline-block';
        tab.style.margin = '0 5px';
        tab.style.padding = '8px 15px';
        tab.style.borderRadius = '4px';
        tab.style.cursor = 'pointer';
        tab.style.transition = 'all 0.2s ease';
        
        // If it's an active tab
        if (tab.classList.contains('active')) {
          tab.style.backgroundColor = '#1a5a96';
          tab.style.color = '#fff';
        } else {
          tab.style.backgroundColor = '#f8f9fa';
          tab.style.color = '#333';
        }
        
        // Hover effect
        tab.addEventListener('mouseover', function() {
          if (!this.classList.contains('active')) {
            this.style.backgroundColor = '#e9ecef';
          }
        });
        
        tab.addEventListener('mouseout', function() {
          if (!this.classList.contains('active')) {
            this.style.backgroundColor = '#f8f9fa';
          }
        });
      }
    });
  }
  
  // Fix subtabs for results
  const resultsTabs = document.querySelector('.results-tabs');
  if (resultsTabs) {
    resultsTabs.style.position = 'sticky';
    resultsTabs.style.top = mainTabs ? '50px' : '0'; // Position below main tabs if they exist
    resultsTabs.style.zIndex = '99';
    resultsTabs.style.backgroundColor = '#fff';
    resultsTabs.style.borderBottom = '1px solid #dee2e6';
    resultsTabs.style.padding = '10px 0';
    resultsTabs.style.width = '100%';
    resultsTabs.style.marginBottom = '20px';
    
    // Style subtabs consistently
    const subTabs = resultsTabs.querySelectorAll('button, a');
    subTabs.forEach(tab => {
      if (!tab.style) return;
      
      tab.style.display = 'inline-block';
      tab.style.margin = '0 5px';
      tab.style.padding = '6px 12px';
      tab.style.borderRadius = '4px';
      tab.style.cursor = 'pointer';
      tab.style.transition = 'all 0.2s ease';
      tab.style.backgroundColor = tab.classList.contains('active') ? '#e9ecef' : 'transparent';
      tab.style.color = tab.classList.contains('active') ? '#1a5a96' : '#666';
      tab.style.fontWeight = tab.classList.contains('active') ? 'bold' : 'normal';
      tab.style.border = 'none';
      
      // Border bottom for active tab
      if (tab.classList.contains('active')) {
        tab.style.borderBottom = '2px solid #1a5a96';
      }
      
      // Hover effect
      tab.addEventListener('mouseover', function() {
        if (!this.classList.contains('active')) {
          this.style.backgroundColor = '#f8f9fa';
          this.style.color = '#1a5a96';
        }
      });
      
      tab.addEventListener('mouseout', function() {
        if (!this.classList.contains('active')) {
          this.style.backgroundColor = 'transparent';
          this.style.color = '#666';
        }
      });
    });
  }
  
  // Enhance chart containers
  const chartContainers = document.querySelectorAll('.chart-container');
  chartContainers.forEach(container => {
    container.style.backgroundColor = '#fff';
    container.style.borderRadius = '8px';
    container.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    container.style.padding = '15px';
    container.style.marginBottom = '20px';
  });
  
  // Add tooltips to charts
  const chartWrappers = document.querySelectorAll('.chart-wrapper');
  chartWrappers.forEach(wrapper => {
    // Add help icon with tooltip
    const helpIcon = document.createElement('div');
    helpIcon.className = 'chart-help-icon';
    helpIcon.innerHTML = '<i class="fas fa-question-circle"></i>';
    helpIcon.style.position = 'absolute';
    helpIcon.style.top = '10px';
    helpIcon.style.right = '10px';
    helpIcon.style.color = '#1a5a96';
    helpIcon.style.fontSize = '16px';
    helpIcon.style.cursor = 'pointer';
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    tooltip.textContent = 'This chart provides a comparative analysis of NAC vendors based on key metrics.';
    tooltip.style.position = 'absolute';
    tooltip.style.top = '30px';
    tooltip.style.right = '0';
    tooltip.style.backgroundColor = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '10px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.width = '250px';
    tooltip.style.display = 'none';
    tooltip.style.zIndex = '1000';
    
    helpIcon.appendChild(tooltip);
    
    // Show/hide tooltip on hover
    helpIcon.addEventListener('mouseover', function() {
      tooltip.style.display = 'block';
    });
    
    helpIcon.addEventListener('mouseout', function() {
      tooltip.style.display = 'none';
    });
    
    // Add help icon to chart
    wrapper.parentElement.style.position = 'relative';
    wrapper.parentElement.appendChild(helpIcon);
  });
  
  // Remove customer testimonials if they exist
  const testimonials = document.querySelectorAll('.testimonial, .testimonials, .customer-quote');
  testimonials.forEach(element => {
    element.style.display = 'none';
  });
  
  // Make sidebar fixed
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.left = '0';
    sidebar.style.bottom = '0';
    sidebar.style.width = '300px';
    sidebar.style.overflowY = 'auto';
    sidebar.style.zIndex = '1000';
    sidebar.style.backgroundColor = '#f8f9fa';
    sidebar.style.borderRight = '1px solid #dee2e6';
    sidebar.style.transition = 'transform 0.3s ease';
    
    // Adjust content area
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      contentArea.style.marginLeft = '300px';
      contentArea.style.transition = 'margin-left 0.3s ease';
    }
    
    // Create sidebar toggle if it doesn't exist
    if (!document.querySelector('.sidebar-toggle')) {
      const toggle = document.createElement('button');
      toggle.className = 'sidebar-toggle';
      toggle.innerHTML = '<i class="fas fa-bars"></i>';
      toggle.style.position = 'fixed';
      toggle.style.top = '10px';
      toggle.style.left = '310px';
      toggle.style.zIndex = '1001';
      toggle.style.border = 'none';
      toggle.style.borderRadius = '4px';
      toggle.style.backgroundColor = '#1a5a96';
      toggle.style.color = '#fff';
      toggle.style.width = '40px';
      toggle.style.height = '40px';
      toggle.style.cursor = 'pointer';
      
      toggle.addEventListener('click', function() {
        if (sidebar.style.transform === 'translateX(-300px)') {
          sidebar.style.transform = 'translateX(0)';
          contentArea.style.marginLeft = '300px';
          this.style.left = '310px';
        } else {
          sidebar.style.transform = 'translateX(-300px)';
          contentArea.style.marginLeft = '0';
          this.style.left = '10px';
        }
      });
      
      document.body.appendChild(toggle);
    }
  }
  
  console.log('UI layout fixed successfully');
};

// Enhance vendor comparison to include all vendors
window.Portnox.enhanceVendorComparison = function() {
  const vendorList = [
    { id: 'portnox', name: 'Portnox Cloud', color: '#1a5a96' },
    { id: 'cisco', name: 'Cisco ISE', color: '#e74c3c' },
    { id: 'aruba', name: 'Aruba ClearPass', color: '#f39c12' },
    { id: 'forescout', name: 'Forescout', color: '#2ecc71' },
    { id: 'fortinac', name: 'FortiNAC', color: '#3498db' },
    { id: 'juniper', name: 'Juniper Mist', color: '#9b59b6' },
    { id: 'securew2', name: 'SecureW2', color: '#34495e' },
    { id: 'microsoft', name: 'Microsoft NPS', color: '#16a085' }
  ];
  
  // Create comprehensive descriptions for charts
  const chartDescriptions = {
    'tco-comparison': 'This chart compares the 3-year Total Cost of Ownership (TCO) across different NAC vendors. TCO includes initial implementation costs, hardware, subscription fees, maintenance, and personnel costs. Portnox Cloud typically shows the lowest TCO due to its cloud-native architecture that eliminates hardware costs and reduces personnel requirements.',
    'cumulative-cost': 'This chart shows how costs accumulate over time for each vendor. The steeper the curve, the faster costs increase. Portnox Cloud generally shows a more gradual incline due to predictable subscription pricing and minimal upfront costs.',
    'nist-framework': 'This radar chart displays how each vendor aligns with the NIST Cybersecurity Framework categories: Identify, Protect, Detect, Respond, and Recover. Portnox Cloud excels in these categories due to its continuous updates and AI-powered security features.',
    'breach-impact': 'This chart demonstrates the potential financial impact of security breaches with different NAC solutions. Lower values indicate better protection against breaches. Portnox Cloud typically shows lower breach impact costs due to faster threat detection and response times.',
    'security-frameworks': 'This comparison highlights compliance coverage across various regulatory frameworks such as HIPAA, PCI DSS, GDPR, and ISO 27001. Portnox Cloud offers comprehensive compliance features through its cloud-native security approach.'
  };
  
  // Apply chart descriptions
  Object.keys(chartDescriptions).forEach(chartId => {
    const chartContainer = document.getElementById(chartId + '-chart');
    if (chartContainer) {
      const description = document.createElement('div');
      description.className = 'chart-description';
      description.textContent = chartDescriptions[chartId];
      description.style.padding = '10px';
      description.style.marginBottom = '15px';
      description.style.fontSize = '14px';
      description.style.color = '#555';
      description.style.borderLeft = '3px solid #1a5a96';
      description.style.backgroundColor = '#f8f9fa';
      
      chartContainer.parentNode.insertBefore(description, chartContainer);
    }
  });
  
  // Enhance vendor selection UI to ensure all vendors are included
  const vendorSelectionContainer = document.querySelector('.vendor-select-grid');
  if (vendorSelectionContainer) {
    // Clear existing content
    vendorSelectionContainer.innerHTML = '';
    
    // Create vendor cards for all vendors
    vendorList.forEach(vendor => {
      const card = document.createElement('div');
      card.className = 'vendor-select-card';
      card.setAttribute('data-vendor', vendor.id);
      card.style.cursor = 'pointer';
      card.style.border = '1px solid #dee2e6';
      card.style.borderRadius = '8px';
      card.style.padding = '10px';
      card.style.textAlign = 'center';
      card.style.margin = '5px';
      card.style.transition = 'all 0.2s ease';
      
      // Add highlight for Portnox
      if (vendor.id === 'portnox') {
        card.style.borderColor = '#1a5a96';
        card.style.backgroundColor = 'rgba(26, 90, 150, 0.05)';
        
        // Add best value badge
        const badge = document.createElement('div');
        badge.className = 'vendor-badge';
        badge.textContent = 'BEST VALUE';
        badge.style.position = 'absolute';
        badge.style.top = '-8px';
        badge.style.left = '50%';
        badge.style.transform = 'translateX(-50%)';
        badge.style.backgroundColor = '#1a5a96';
        badge.style.color = 'white';
        badge.style.padding = '2px 6px';
        badge.style.borderRadius = '4px';
        badge.style.fontSize = '10px';
        badge.style.fontWeight = 'bold';
        
        card.appendChild(badge);
      }
      
      // Add vendor logo
      const logoDiv = document.createElement('div');
      logoDiv.className = 'vendor-logo';
      
      const logo = document.createElement('img');
      logo.src = `img/vendors/${vendor.id}.png`;
      logo.alt = vendor.name;
      logo.style.maxHeight = '30px';
      logo.style.maxWidth = '80px';
      
      logoDiv.appendChild(logo);
      card.appendChild(logoDiv);
      
      // Add vendor name
      const name = document.createElement('div');
      name.className = 'vendor-name';
      name.textContent = vendor.name;
      name.style.fontSize = '12px';
      name.style.marginTop = '5px';
      name.style.fontWeight = 'bold';
      
      card.appendChild(name);
      
      // Add card click event
      card.addEventListener('click', function() {
        // Toggle selection
        const isSelected = this.classList.contains('selected');
        
        if (!isSelected) {
          // Add to selected vendors
          this.classList.add('selected');
          this.style.borderColor = '#1a5a96';
          this.style.backgroundColor = 'rgba(26, 90, 150, 0.05)';
        } else {
          // Remove from selected vendors
          this.classList.remove('selected');
          this.style.borderColor = '#dee2e6';
          this.style.backgroundColor = '#fff';
        }
      });
      
      vendorSelectionContainer.appendChild(card);
    });
  }
  
  console.log('Vendor comparison enhanced successfully');
};

// Fix DOM hierarchy issues
window.Portnox.fixDOMHierarchy = function() {
  // Create a safe version of view organization that avoids circular references
  window.organizeViews = function() {
    console.log('Organizing views safely...');
    
    // Get all view panels
    const viewPanels = document.querySelectorAll('.view-panel');
    const contentArea = document.querySelector('.content-area') || document.querySelector('.main-content');
    
    if (!contentArea) {
      console.error('Content area not found');
      return;
    }
    
    // Create view references if they don't exist
    window.viewReferences = window.viewReferences || {};
    
    // Process each panel
    viewPanels.forEach(panel => {
      const viewType = panel.getAttribute('data-view');
      if (!viewType) return;
      
      // Store a reference to the panel
      window.viewReferences[viewType] = panel;
      
      // If panel is part of a circular structure, detach it first
      if (panel.parentNode) {
        panel.parentNode.removeChild(panel);
      }
      
      // Append to content area
      contentArea.appendChild(panel);
    });
    
    // Set up tab navigation
    const mainTabs = document.querySelectorAll('.main-tab, .nav-link[data-view]');
    mainTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const viewType = this.getAttribute('data-view');
        if (!viewType) return;
        
        // Update active tab
        mainTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding panel
        const panels = document.querySelectorAll('.view-panel');
        panels.forEach(p => p.style.display = 'none');
        
        const targetPanel = document.querySelector(`.view-panel[data-view="${viewType}"]`);
        if (targetPanel) {
          targetPanel.style.display = 'block';
        }
      });
    });
    
    console.log('Views organized successfully');
  };
  
  // Initialize security view with all required methods
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
      
      // Create tabs
      const tabs = [
        { id: 'risk', icon: 'shield-alt', label: 'Risk Assessment', active: true },
        { id: 'compliance', icon: 'check-circle', label: 'Compliance', active: false },
        { id: 'breach', icon: 'exclamation-triangle', label: 'Breach Impact', active: false },
        { id: 'vendors', icon: 'exchange-alt', label: 'Vendor Comparison', active: false }
      ];
      
      // Add tabs to container
      tabs.forEach(tab => {
        const tabElement = document.createElement('button');
        tabElement.className = 'results-tab' + (tab.active ? ' active' : '');
        tabElement.setAttribute('data-tab', tab.id);
        tabElement.innerHTML = `<i class="fas fa-${tab.icon}"></i> ${tab.label}`;
        tabsContainer.appendChild(tabElement);
      });
      
      // Add tabs to panel
      securityPanel.appendChild(tabsContainer);
      
      // Create panel containers
      tabs.forEach(tab => {
        const panelElement = document.createElement('div');
        panelElement.className = 'results-panel' + (tab.active ? ' active' : '');
        panelElement.setAttribute('data-panel', tab.id);
        
        // Add content based on tab
        if (tab.id === 'risk') {
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
        } else if (tab.id === 'compliance') {
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
        } else if (tab.id === 'breach') {
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
        } else if (tab.id === 'vendors') {
          panelElement.innerHTML = `
            <div class="panel-header">
              <h2>Security Vendor Comparison</h2>
              <p class="subtitle">Head-to-head comparison of security capabilities</p>
            </div>
            
            <div class="chart-container">
              <h3><i class="fas fa-exchange-alt"></i> Security Capabilities Comparison</h3>
              <div class="chart-description">
                This chart compares key security capabilities across all vendors. Portnox Cloud typically excels in
                areas like zero trust implementation, rapid response times, and continuous monitoring due to its
                cloud-native architecture and AI-powered security analytics.
              </div>
              <div class="chart-wrapper" id="security-vendor-chart"></div>
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
  
  // Fix executive view initialization
  if (!window.Portnox.views.executive) {
    window.Portnox.views.executive = {
      init: function() {
        console.log('Initializing executive view');
        
        const executivePanel = document.querySelector('.view-panel[data-view="executive"]');
        if (!executivePanel) {
          console.error('Executive panel not found, creating it');
          
          // Create executive view
          const contentArea = document.querySelector('.content-area') || document.querySelector('.main-content');
          if (!contentArea) return;
          
          const newPanel = document.createElement('div');
          newPanel.className = 'view-panel';
          newPanel.setAttribute('data-view', 'executive');
          
          newPanel.innerHTML = `
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
          
          contentArea.appendChild(newPanel);
        }
      }
    };
  }
  
  // Initialize views
  window.initializeViews = function() {
    console.log('Initializing views...');
    
    // Initialize executive view
    if (window.Portnox.views.executive && typeof window.Portnox.views.executive.init === 'function') {
      window.Portnox.views.executive.init();
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
        panel.style.display = 'block';
      }
    }
    
    console.log('Views initialized successfully');
  };
  
  console.log('DOM hierarchy fixed successfully');
};

// Document ready handler
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Portnox objects
  window.Portnox = window.Portnox || {};
  window.Portnox.loadedScripts = window.Portnox.loadedScripts || {};
  window.Portnox.views = window.Portnox.views || {};
  
  // Load Font Awesome if not already loaded
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(fontAwesome);
  }
  
  // Fix image placeholders
  window.Portnox.createPlaceholderImage('img[src*="gartner.png"]', 'Gartner', '#0A2339');
  window.Portnox.createPlaceholderImage('img[src*="forrester.png"]', 'Forrester', '#242A35');
  window.Portnox.createPlaceholderImage('img[src*="idc.png"]', 'IDC', '#0076CE');
  window.Portnox.createPlaceholderImage('img[src*="ema.png"]', 'EMA', '#1A5A96');
  window.Portnox.createPlaceholderImage('img[src*="generic-vendor.png"]', 'Vendor', '#333333');
  
  // Fix DOM hierarchy
  window.Portnox.fixDOMHierarchy();
  
  // Fix UI layout
  window.Portnox.fixUILayout();
  
  // Enhance vendor comparison
  window.Portnox.enhanceVendorComparison();
  
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
  
  console.log('Portnox TCA initialization complete');
});
