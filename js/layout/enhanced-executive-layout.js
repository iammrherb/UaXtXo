/**
 * Enhanced Executive Layout - Vendor selection at top, full tab functionality
 */

function enhanceExecutiveLayout() {
  console.log('🎨 Enhancing executive layout...');
  
  // Move vendor selection to the top of executive view
  moveVendorSelectionToTop();
  
  // Implement full tab switching functionality
  implementTabSwitching();
  
  // Add all vendor buttons
  addAllVendorButtons();
  
  // Enhance industry filter
  enhanceIndustryFilter();
  
  console.log('✅ Executive layout enhanced');
}

function moveVendorSelectionToTop() {
  const executiveView = document.getElementById('executive-view');
  if (!executiveView) return;
  
  // Create top vendor bar
  const topVendorBar = document.createElement('div');
  topVendorBar.className = 'executive-top-bar';
  topVendorBar.innerHTML = `
    <div class="top-bar-content">
      <div class="industry-section">
        <label for="executive-industry-filter">Industry:</label>
        <select id="executive-industry-filter" class="industry-select">
          <option value="all">All Industries</option>
          <option value="healthcare">Healthcare & Life Sciences</option>
          <option value="finance">Financial Services & Banking</option>
          <option value="retail">Retail & E-commerce</option>
          <option value="manufacturing">Manufacturing & Industrial</option>
          <option value="education">Education & Research</option>
          <option value="government">Government & Public Sector</option>
          <option value="technology" selected>Technology & Software</option>
          <option value="energy">Energy & Utilities</option>
          <option value="transportation">Transportation & Logistics</option>
          <option value="media">Media & Entertainment</option>
          <option value="telecom">Telecommunications</option>
          <option value="insurance">Insurance</option>
          <option value="legal">Legal Services</option>
          <option value="consulting">Professional Services</option>
          <option value="real-estate">Real Estate</option>
          <option value="non-profit">Non-Profit Organization</option>
          <option value="aerospace">Aerospace & Defense</option>
          <option value="automotive">Automotive</option>
          <option value="pharmaceuticals">Pharmaceuticals</option>
          <option value="hospitality">Hospitality & Tourism</option>
        </select>
      </div>
      
      <div class="vendor-selection-section">
        <div class="vendor-pills" id="top-vendor-pills">
          <!-- Vendor pills will be populated here -->
        </div>
      </div>
    </div>
  `;
  
  // Insert at the beginning of executive view
  const viewContent = executiveView.querySelector('.view-content');
  if (viewContent) {
    viewContent.insertBefore(topVendorBar, viewContent.firstChild);
  }
}

function addAllVendorButtons() {
  const vendorPillsContainer = document.getElementById('top-vendor-pills');
  if (!vendorPillsContainer) return;
  
  const vendors = [
    { id: 'portnox', name: 'Portnox', logo: './img/vendors/portnox-logo.png', active: true },
    { id: 'cisco', name: 'Cisco ISE', logo: './img/vendors/cisco-logo.png', active: true },
    { id: 'aruba', name: 'Aruba', logo: './img/vendors/aruba-logo.png', active: true },
    { id: 'forescout', name: 'Forescout', logo: './img/vendors/forescout-logo.png', active: false },
    { id: 'fortinac', name: 'FortiNAC', logo: './img/vendors/fortinac-logo.png', active: false },
    { id: 'juniper', name: 'Juniper', logo: './img/vendors/juniper-logo.png', active: false },
    { id: 'securew2', name: 'SecureW2', logo: './img/vendors/securew2-logo.png', active: false },
    { id: 'microsoft', name: 'Microsoft NPS', logo: './img/vendors/microsoft-logo.png', active: false },
    { id: 'arista', name: 'Arista', logo: './img/vendors/arista-logo.png', active: false },
    { id: 'foxpass', name: 'Foxpass', logo: './img/vendors/foxpass-logo.png', active: false },
    { id: 'extreme', name: 'Extreme Networks', logo: './img/vendors/extreme-logo.png', active: false }
  ];
  
  vendorPillsContainer.innerHTML = vendors.map(vendor => `
    <button class="vendor-pill ${vendor.active ? 'active' : ''}" data-vendor="${vendor.id}">
      <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-pill-logo">
      <span class="vendor-pill-name">${vendor.name}</span>
    </button>
  `).join('');
  
  // Add click handlers
  document.querySelectorAll('.vendor-pill').forEach(pill => {
    pill.addEventListener('click', function() {
      this.classList.toggle('active');
      updateVendorSelection();
      updateDashboardContent();
    });
  });
}

function implementTabSwitching() {
  // Create tab content structure
  const executiveView = document.getElementById('executive-view');
  if (!executiveView) return;
  
  // Create tab content container if it doesn't exist
  let tabContainer = executiveView.querySelector('.executive-tab-container');
  if (!tabContainer) {
    tabContainer = document.createElement('div');
    tabContainer.className = 'executive-tab-container';
    
    // Tab navigation
    const tabNav = document.createElement('div');
    tabNav.className = 'executive-tab-nav';
    tabNav.innerHTML = `
      <button class="exec-tab active" data-tab="overview">
        <i class="fas fa-tachometer-alt"></i>
        <span>Overview</span>
      </button>
      <button class="exec-tab" data-tab="financial">
        <i class="fas fa-chart-line"></i>
        <span>Financial Analysis</span>
      </button>
      <button class="exec-tab" data-tab="security">
        <i class="fas fa-shield-alt"></i>
        <span>Security & Risk</span>
      </button>
      <button class="exec-tab" data-tab="compliance">
        <i class="fas fa-check-circle"></i>
        <span>Compliance</span>
      </button>
      <button class="exec-tab" data-tab="vendors">
        <i class="fas fa-balance-scale"></i>
        <span>Vendor Matrix</span>
      </button>
      <button class="exec-tab" data-tab="insurance">
        <i class="fas fa-umbrella"></i>
        <span>Cyber Insurance</span>
      </button>
    `;
    
    // Tab content
    const tabContent = document.createElement('div');
    tabContent.className = 'executive-tab-content';
    tabContent.innerHTML = `
      <!-- Overview Tab -->
      <div class="exec-tab-panel active" data-panel="overview">
        <div class="kpi-dashboard">
          <div class="kpi-cards-grid">
            <div class="kpi-card primary">
              <div class="kpi-icon"><i class="fas fa-piggy-bank"></i></div>
              <div class="kpi-content">
                <div class="kpi-value" data-value="275">$275K</div>
                <div class="kpi-label">Cost Savings</div>
                <div class="kpi-trend positive">↗ 53% vs competitors</div>
              </div>
            </div>
            <div class="kpi-card secondary">
              <div class="kpi-icon"><i class="fas fa-percentage"></i></div>
              <div class="kpi-content">
                <div class="kpi-value" data-value="325">325%</div>
                <div class="kpi-label">ROI</div>
                <div class="kpi-trend positive">↗ 7 month payback</div>
              </div>
            </div>
            <div class="kpi-card tertiary">
              <div class="kpi-icon"><i class="fas fa-users-cog"></i></div>
              <div class="kpi-content">
                <div class="kpi-value" data-value="87">87%</div>
                <div class="kpi-label">Efficiency Gain</div>
                <div class="kpi-trend positive">↗ 0.25 vs 2.0 FTE</div>
              </div>
            </div>
            <div class="kpi-card quaternary">
              <div class="kpi-icon"><i class="fas fa-shield-alt"></i></div>
              <div class="kpi-content">
                <div class="kpi-value" data-value="95">95%</div>
                <div class="kpi-label">Security Score</div>
                <div class="kpi-trend positive">↗ Zero Trust ready</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="overview-charts">
          <div class="chart-row">
            <div class="chart-panel half">
              <div class="chart-header">
                <h3><i class="fas fa-chart-bar"></i> TCO Comparison</h3>
              </div>
              <div class="chart-container" id="overview-tco-chart"></div>
            </div>
            <div class="chart-panel half">
              <div class="chart-header">
                <h3><i class="fas fa-clock"></i> Implementation Timeline</h3>
              </div>
              <div class="chart-container" id="overview-timeline-chart"></div>
            </div>
          </div>
          
          <div class="chart-row">
            <div class="chart-panel full">
              <div class="chart-header">
                <h3><i class="fas fa-chart-area"></i> ROI Analysis</h3>
              </div>
              <div class="chart-container" id="overview-roi-chart"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Financial Analysis Tab -->
      <div class="exec-tab-panel" data-panel="financial">
        <div class="financial-content">
          <h2><i class="fas fa-calculator"></i> Comprehensive Financial Analysis</h2>
          <div class="chart-container" id="financial-breakdown-chart"></div>
          <div class="financial-metrics">
            <div class="metric-card">
              <h4>3-Year TCO Breakdown</h4>
              <div class="metric-details">Detailed cost analysis across all vendors</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Security & Risk Tab -->
      <div class="exec-tab-panel" data-panel="security">
        <div class="security-content">
          <h2><i class="fas fa-shield-virus"></i> Security & Risk Assessment</h2>
          <div class="chart-container" id="security-radar-chart"></div>
          <div class="security-metrics">
            <div class="metric-card">
              <h4>Zero Trust Readiness</h4>
              <div class="metric-details">Comprehensive security capability analysis</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Compliance Tab -->
      <div class="exec-tab-panel" data-panel="compliance">
        <div class="compliance-content">
          <h2><i class="fas fa-clipboard-check"></i> Compliance Framework Coverage</h2>
          <div class="chart-container" id="compliance-coverage-chart"></div>
          <div class="compliance-frameworks">
            <div class="framework-grid">
              <div class="framework-card">
                <h4>PCI DSS</h4>
                <div class="coverage-score">96%</div>
              </div>
              <div class="framework-card">
                <h4>HIPAA</h4>
                <div class="coverage-score">94%</div>
              </div>
              <div class="framework-card">
                <h4>GDPR</h4>
                <div class="coverage-score">92%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Vendor Matrix Tab -->
      <div class="exec-tab-panel" data-panel="vendors">
        <div class="vendor-matrix-content">
          <h2><i class="fas fa-table"></i> Comprehensive Vendor Matrix</h2>
          <div class="matrix-container" id="vendor-comparison-matrix"></div>
        </div>
      </div>
      
      <!-- Cyber Insurance Tab -->
      <div class="exec-tab-panel" data-panel="insurance">
        <div class="insurance-content">
          <h2><i class="fas fa-umbrella"></i> Cyber Insurance Impact</h2>
          <div class="insurance-benefits">
            <div class="benefit-card">
              <div class="benefit-icon"><i class="fas fa-percentage"></i></div>
              <div class="benefit-content">
                <div class="benefit-value">25%</div>
                <div class="benefit-label">Premium Reduction</div>
              </div>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon"><i class="fas fa-shield-alt"></i></div>
              <div class="benefit-content">
                <div class="benefit-value">40%</div>
                <div class="benefit-label">Coverage Increase</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    tabContainer.appendChild(tabNav);
    tabContainer.appendChild(tabContent);
    
    // Insert into executive view
    const viewContent = executiveView.querySelector('.view-content');
    if (viewContent) {
      viewContent.appendChild(tabContainer);
    }
  }
  
  // Add tab click handlers
  document.querySelectorAll('.exec-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      switchToTab(tabId);
    });
  });
}

function switchToTab(tabId) {
  // Update active tab
  document.querySelectorAll('.exec-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  
  // Update active panel
  document.querySelectorAll('.exec-tab-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  document.querySelector(`[data-panel="${tabId}"]`).classList.add('active');
  
  // Trigger chart refresh for the active tab
  refreshChartsForTab(tabId);
  
  console.log(`📱 Switched to ${tabId} tab`);
}

function enhanceIndustryFilter() {
  const industryFilter = document.getElementById('executive-industry-filter');
  if (industryFilter) {
    industryFilter.addEventListener('change', function() {
      const selectedIndustry = this.value;
      updateDashboardForIndustry(selectedIndustry);
    });
  }
}

function updateVendorSelection() {
  const activeVendors = Array.from(document.querySelectorAll('.vendor-pill.active'))
    .map(pill => pill.getAttribute('data-vendor'));
  
  console.log('🏪 Active vendors:', activeVendors);
  
  // Sync with existing vendor toggles if they exist
  document.querySelectorAll('.vendor-toggle').forEach(toggle => {
    const vendorId = toggle.getAttribute('data-vendor');
    if (activeVendors.includes(vendorId)) {
      toggle.classList.add('active');
    } else {
      toggle.classList.remove('active');
    }
  });
  
  // Dispatch vendor selection change event
  document.dispatchEvent(new CustomEvent('vendorSelectionChanged', {
    detail: activeVendors
  }));
}

function updateDashboardContent() {
  // Update all charts and content based on current selection
  const activeTab = document.querySelector('.exec-tab.active')?.getAttribute('data-tab');
  if (activeTab) {
    refreshChartsForTab(activeTab);
  }
}

function updateDashboardForIndustry(industry) {
  console.log(`🏭 Industry changed to: ${industry}`);
  
  // Update industry-specific metrics and benchmarks
  updateIndustryBenchmarks(industry);
  
  // Refresh current tab content
  updateDashboardContent();
}

function updateIndustryBenchmarks(industry) {
  // Industry-specific benchmark updates
  const industryBenchmarks = {
    healthcare: { avgBreachCost: '$10.9M', riskLevel: 'Critical', devices: '2,500 avg' },
    finance: { avgBreachCost: '$5.97M', riskLevel: 'Critical', devices: '1,800 avg' },
    retail: { avgBreachCost: '$3.28M', riskLevel: 'High', devices: '1,200 avg' },
    technology: { avgBreachCost: '$4.65M', riskLevel: 'High', devices: '950 avg' }
  };
  
  const benchmark = industryBenchmarks[industry] || industryBenchmarks.technology;
  console.log(`📊 Industry benchmark for ${industry}:`, benchmark);
}

function refreshChartsForTab(tabId) {
  // Placeholder for chart refresh logic
  console.log(`📊 Refreshing charts for tab: ${tabId}`);
  
  // This would call the appropriate chart creation functions
  if (window.ultimateExecutiveView) {
    setTimeout(() => {
      if (typeof window.ultimateExecutiveView.refreshChartsForTab === 'function') {
        window.ultimateExecutiveView.refreshChartsForTab(tabId);
      }
    }, 100);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Wait for other components to load
  setTimeout(enhanceExecutiveLayout, 1500);
});

// Export for global access
window.enhanceExecutiveLayout = enhanceExecutiveLayout;
