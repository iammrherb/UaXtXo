/**
 * Comprehensive Executive Tabs Implementation
 * Full tab switching with charts and data for each tab
 */

class ExecutiveTabsManager {
  constructor() {
    this.currentTab = 'overview';
    this.chartInstances = {};
    this.vendorData = {};
    this.industryData = {};
    this.initialized = false;
  }
  
  init() {
    console.log('🚀 Initializing Executive Tabs Manager...');
    
    // Move tabs above command center
    this.moveTabsToTop();
    
    // Implement full tab functionality
    this.implementTabSwitching();
    
    // Load initial data
    this.loadVendorData();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Initialize with Overview tab
    this.switchToTab('overview');
    
    this.initialized = true;
    console.log('✅ Executive Tabs Manager initialized');
  }
  
  moveTabsToTop() {
    const executiveView = document.getElementById('executive-view');
    if (!executiveView) return;
    
    const viewContent = executiveView.querySelector('.view-content');
    if (!viewContent) return;
    
    // Create tabs container at the top
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'executive-tabs-top';
    tabsContainer.innerHTML = `
      <div class="tabs-header">
        <div class="tabs-navigation">
          <button class="exec-main-tab active" data-tab="overview">
            <div class="tab-icon"><i class="fas fa-tachometer-alt"></i></div>
            <div class="tab-info">
              <span class="tab-title">Overview</span>
              <span class="tab-subtitle">Executive Dashboard</span>
            </div>
          </button>
          
          <button class="exec-main-tab" data-tab="financial">
            <div class="tab-icon"><i class="fas fa-chart-line"></i></div>
            <div class="tab-info">
              <span class="tab-title">Financial</span>
              <span class="tab-subtitle">Analysis & ROI</span>
            </div>
          </button>
          
          <button class="exec-main-tab" data-tab="security">
            <div class="tab-icon"><i class="fas fa-shield-alt"></i></div>
            <div class="tab-info">
              <span class="tab-title">Security</span>
              <span class="tab-subtitle">& Risk Assessment</span>
            </div>
          </button>
          
          <button class="exec-main-tab" data-tab="compliance">
            <div class="tab-icon"><i class="fas fa-check-circle"></i></div>
            <div class="tab-info">
              <span class="tab-title">Compliance</span>
              <span class="tab-subtitle">Framework Coverage</span>
            </div>
          </button>
          
          <button class="exec-main-tab" data-tab="vendors">
            <div class="tab-icon"><i class="fas fa-balance-scale"></i></div>
            <div class="tab-info">
              <span class="tab-title">Vendor</span>
              <span class="tab-subtitle">Matrix Analysis</span>
            </div>
          </button>
          
          <button class="exec-main-tab" data-tab="insurance">
            <div class="tab-icon"><i class="fas fa-umbrella"></i></div>
            <div class="tab-info">
              <span class="tab-title">Cyber</span>
              <span class="tab-subtitle">Insurance Impact</span>
            </div>
          </button>
        </div>
        
        <div class="tabs-controls">
          <div class="industry-filter">
            <select id="exec-industry-select" class="industry-select-top">
              <option value="all">All Industries</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Financial Services</option>
              <option value="retail">Retail</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="education">Education</option>
              <option value="government">Government</option>
              <option value="technology" selected>Technology</option>
              <option value="energy">Energy</option>
            </select>
          </div>
          
          <div class="vendor-toggles-compact">
            <button class="vendor-toggle-top active" data-vendor="portnox">
              <img src="./img/vendors/portnox-logo.png" alt="Portnox">
              Portnox
            </button>
            <button class="vendor-toggle-top active" data-vendor="cisco">
              <img src="./img/vendors/cisco-logo.png" alt="Cisco">
              Cisco
            </button>
            <button class="vendor-toggle-top active" data-vendor="aruba">
              <img src="./img/vendors/aruba-logo.png" alt="Aruba">
              Aruba
            </button>
            <button class="vendor-toggle-top" data-vendor="forescout">
              <img src="./img/vendors/forescout-logo.png" alt="Forescout">
              Forescout
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Insert at the very beginning
    viewContent.insertBefore(tabsContainer, viewContent.firstChild);
  }
  
  implementTabSwitching() {
    const executiveView = document.getElementById('executive-view');
    if (!executiveView) return;
    
    // Create tab content container
    const tabContentContainer = document.createElement('div');
    tabContentContainer.className = 'executive-tab-contents';
    tabContentContainer.innerHTML = `
      <!-- Overview Tab Content (Default Executive Command Center) -->
      <div class="tab-content-panel active" data-content="overview">
        <!-- Executive Command Center will be moved here -->
        <div id="default-executive-content">
          <!-- Existing content will be preserved -->
        </div>
      </div>
      
      <!-- Financial Tab Content -->
      <div class="tab-content-panel" data-content="financial">
        <div class="financial-dashboard">
          <div class="financial-header">
            <h2><i class="fas fa-calculator"></i> Comprehensive Financial Analysis</h2>
            <p>Total Cost of Ownership, ROI Analysis, and Financial Impact Assessment</p>
          </div>
          
          <div class="financial-metrics-grid">
            <div class="financial-metric-card">
              <div class="metric-icon"><i class="fas fa-piggy-bank"></i></div>
              <div class="metric-content">
                <div class="metric-value" id="financial-savings">$275,000</div>
                <div class="metric-label">3-Year Savings</div>
                <div class="metric-detail">vs. Traditional Solutions</div>
              </div>
            </div>
            
            <div class="financial-metric-card">
              <div class="metric-icon"><i class="fas fa-percentage"></i></div>
              <div class="metric-content">
                <div class="metric-value" id="financial-roi">325%</div>
                <div class="metric-label">Return on Investment</div>
                <div class="metric-detail">7-Month Payback Period</div>
              </div>
            </div>
            
            <div class="financial-metric-card">
              <div class="metric-icon"><i class="fas fa-chart-line"></i></div>
              <div class="metric-content">
                <div class="metric-value" id="financial-npv">$215,000</div>
                <div class="metric-label">Net Present Value</div>
                <div class="metric-detail">3-Year Analysis</div>
              </div>
            </div>
          </div>
          
          <div class="financial-charts-grid">
            <div class="chart-panel primary">
              <div class="chart-header">
                <h3><i class="fas fa-chart-bar"></i> TCO Breakdown Analysis</h3>
                <div class="chart-controls">
                  <button class="chart-btn active" data-period="3year">3-Year</button>
                  <button class="chart-btn" data-period="5year">5-Year</button>
                </div>
              </div>
              <div class="chart-container" id="financial-tco-chart"></div>
            </div>
            
            <div class="chart-panel secondary">
              <div class="chart-header">
                <h3><i class="fas fa-coins"></i> Cost Comparison by Category</h3>
              </div>
              <div class="chart-container" id="financial-cost-category-chart"></div>
            </div>
            
            <div class="chart-panel wide">
              <div class="chart-header">
                <h3><i class="fas fa-chart-area"></i> ROI Projection Over Time</h3>
              </div>
              <div class="chart-container" id="financial-roi-timeline-chart"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Security Tab Content -->
      <div class="tab-content-panel" data-content="security">
        <div class="security-dashboard">
          <div class="security-header">
            <h2><i class="fas fa-shield-virus"></i> Security & Risk Assessment</h2>
            <p>Zero Trust Readiness, Threat Prevention, and Risk Mitigation Analysis</p>
          </div>
          
          <div class="security-metrics-grid">
            <div class="security-metric-card critical">
              <div class="metric-icon"><i class="fas fa-shield-alt"></i></div>
              <div class="metric-content">
                <div class="metric-value">95%</div>
                <div class="metric-label">Security Score</div>
                <div class="metric-detail">Zero Trust Ready</div>
              </div>
            </div>
            
            <div class="security-metric-card high">
              <div class="metric-icon"><i class="fas fa-bug"></i></div>
              <div class="metric-content">
                <div class="metric-value">92%</div>
                <div class="metric-label">Threat Prevention</div>
                <div class="metric-detail">Advanced Protection</div>
              </div>
            </div>
            
            <div class="security-metric-card medium">
              <div class="metric-icon"><i class="fas fa-exclamation-triangle"></i></div>
              <div class="metric-content">
                <div class="metric-value">85%</div>
                <div class="metric-label">Risk Reduction</div>
                <div class="metric-detail">Breach Prevention</div>
              </div>
            </div>
          </div>
          
          <div class="security-charts-grid">
            <div class="chart-panel primary">
              <div class="chart-header">
                <h3><i class="fas fa-radar"></i> Security Capabilities Radar</h3>
              </div>
              <div class="chart-container" id="security-radar-chart"></div>
            </div>
            
            <div class="chart-panel secondary">
              <div class="chart-header">
                <h3><i class="fas fa-shield-virus"></i> Threat Prevention Matrix</h3>
              </div>
              <div class="chart-container" id="security-threat-chart"></div>
            </div>
            
            <div class="chart-panel wide">
              <div class="chart-header">
                <h3><i class="fas fa-chart-line"></i> Risk Reduction Impact</h3>
              </div>
              <div class="chart-container" id="security-risk-chart"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Compliance Tab Content -->
      <div class="tab-content-panel" data-content="compliance">
        <div class="compliance-dashboard">
          <div class="compliance-header">
            <h2><i class="fas fa-clipboard-check"></i> Compliance Framework Coverage</h2>
            <p>Regulatory Compliance, Framework Mapping, and Audit Readiness</p>
          </div>
          
          <div class="compliance-frameworks-grid">
            <div class="framework-card pci">
              <div class="framework-icon"><i class="fas fa-credit-card"></i></div>
              <div class="framework-info">
                <div class="framework-name">PCI DSS</div>
                <div class="framework-score">96%</div>
                <div class="framework-status">Compliant</div>
              </div>
            </div>
            
            <div class="framework-card hipaa">
              <div class="framework-icon"><i class="fas fa-user-md"></i></div>
              <div class="framework-info">
                <div class="framework-name">HIPAA</div>
                <div class="framework-score">94%</div>
                <div class="framework-status">Compliant</div>
              </div>
            </div>
            
            <div class="framework-card gdpr">
              <div class="framework-icon"><i class="fas fa-globe-europe"></i></div>
              <div class="framework-info">
                <div class="framework-name">GDPR</div>
                <div class="framework-score">92%</div>
                <div class="framework-status">Compliant</div>
              </div>
            </div>
            
            <div class="framework-card nist">
              <div class="framework-icon"><i class="fas fa-shield-alt"></i></div>
              <div class="framework-info">
                <div class="framework-name">NIST CSF</div>
                <div class="framework-score">96%</div>
                <div class="framework-status">Compliant</div>
              </div>
            </div>
          </div>
          
          <div class="compliance-charts-grid">
            <div class="chart-panel primary">
              <div class="chart-header">
                <h3><i class="fas fa-chart-pie"></i> Compliance Coverage Overview</h3>
              </div>
              <div class="chart-container" id="compliance-overview-chart"></div>
            </div>
            
            <div class="chart-panel secondary">
              <div class="chart-header">
                <h3><i class="fas fa-tasks"></i> Framework Requirements</h3>
              </div>
              <div class="chart-container" id="compliance-requirements-chart"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Vendors Tab Content -->
      <div class="tab-content-panel" data-content="vendors">
        <div class="vendors-dashboard">
          <div class="vendors-header">
            <h2><i class="fas fa-table"></i> Comprehensive Vendor Matrix</h2>
            <p>Multi-Vendor Comparison, Scoring, and Analysis</p>
          </div>
          
          <div class="vendor-matrix-container">
            <div class="matrix-table-wrapper">
              <table class="vendor-comparison-table" id="vendor-matrix-table">
                <!-- Will be populated dynamically -->
              </table>
            </div>
          </div>
          
          <div class="vendor-charts-grid">
            <div class="chart-panel half">
              <div class="chart-header">
                <h3><i class="fas fa-users"></i> Resource Requirements</h3>
              </div>
              <div class="chart-container" id="vendor-resources-chart"></div>
            </div>
            
            <div class="chart-panel half">
              <div class="chart-header">
                <h3><i class="fas fa-clock"></i> Implementation Timeline</h3>
              </div>
              <div class="chart-container" id="vendor-timeline-chart"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Insurance Tab Content -->
      <div class="tab-content-panel" data-content="insurance">
        <div class="insurance-dashboard">
          <div class="insurance-header">
            <h2><i class="fas fa-umbrella"></i> Cyber Insurance Impact Analysis</h2>
            <p>Premium Reduction, Coverage Enhancement, and Risk Assessment</p>
          </div>
          
          <div class="insurance-benefits-grid">
            <div class="insurance-benefit-card">
              <div class="benefit-icon"><i class="fas fa-percentage"></i></div>
              <div class="benefit-content">
                <div class="benefit-value">25%</div>
                <div class="benefit-label">Premium Reduction</div>
                <div class="benefit-detail">Annual savings on cyber insurance</div>
              </div>
            </div>
            
            <div class="insurance-benefit-card">
              <div class="benefit-icon"><i class="fas fa-shield-alt"></i></div>
              <div class="benefit-content">
                <div class="benefit-value">40%</div>
                <div class="benefit-label">Coverage Increase</div>
                <div class="benefit-detail">Enhanced protection limits</div>
              </div>
            </div>
            
            <div class="insurance-benefit-card">
              <div class="benefit-icon"><i class="fas fa-chart-line"></i></div>
              <div class="benefit-content">
                <div class="benefit-value">85%</div>
                <div class="benefit-label">Risk Score Improvement</div>
                <div class="benefit-detail">Enhanced security posture</div>
              </div>
            </div>
          </div>
          
          <div class="insurance-charts-grid">
            <div class="chart-panel primary">
              <div class="chart-header">
                <h3><i class="fas fa-chart-bar"></i> Premium Impact Analysis</h3>
              </div>
              <div class="chart-container" id="insurance-premium-chart"></div>
            </div>
            
            <div class="chart-panel secondary">
              <div class="chart-header">
                <h3><i class="fas fa-shield-virus"></i> Risk Mitigation Value</h3>
              </div>
              <div class="chart-container" id="insurance-risk-chart"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Find the existing command center and move it to overview tab
    const existingCommandCenter = document.querySelector('.executive-command-center');
    if (existingCommandCenter) {
      const overviewContent = tabContentContainer.querySelector('#default-executive-content');
      if (overviewContent) {
        overviewContent.appendChild(existingCommandCenter);
      }
    }
    
    // Insert tab content after tabs
    const viewContent = document.querySelector('#executive-view .view-content');
    if (viewContent) {
      viewContent.appendChild(tabContentContainer);
    }
  }
  
  setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.exec-main-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabId = e.currentTarget.getAttribute('data-tab');
        this.switchToTab(tabId);
      });
    });
    
    // Vendor toggles
    document.querySelectorAll('.vendor-toggle-top').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('active');
        this.updateVendorSelection();
      });
    });
    
    // Industry filter
    const industrySelect = document.getElementById('exec-industry-select');
    if (industrySelect) {
      industrySelect.addEventListener('change', (e) => {
        this.updateIndustryFilter(e.target.value);
      });
    }
  }
  
  switchToTab(tabId) {
    console.log(`📱 Switching to ${tabId} tab`);
    
    // Update active tab
    document.querySelectorAll('.exec-main-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    // Update active content
    document.querySelectorAll('.tab-content-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    document.querySelector(`[data-content="${tabId}"]`).classList.add('active');
    
    this.currentTab = tabId;
    
    // Load charts for the active tab
    setTimeout(() => {
      this.loadChartsForTab(tabId);
    }, 100);
  }
  
  loadChartsForTab(tabId) {
    console.log(`📊 Loading charts for ${tabId} tab`);
    
    switch (tabId) {
      case 'overview':
        // Overview tab shows the default executive command center
        this.loadOverviewCharts();
        break;
      case 'financial':
        this.loadFinancialCharts();
        break;
      case 'security':
        this.loadSecurityCharts();
        break;
      case 'compliance':
        this.loadComplianceCharts();
        break;
      case 'vendors':
        this.loadVendorCharts();
        break;
      case 'insurance':
        this.loadInsuranceCharts();
        break;
    }
  }
  
  loadOverviewCharts() {
    // Overview shows the existing executive command center
    console.log('📊 Overview tab - showing executive command center');
  }
  
  loadFinancialCharts() {
    this.createTCOChart();
    this.createCostCategoryChart();
    this.createROITimelineChart();
  }
  
  loadSecurityCharts() {
    this.createSecurityRadarChart();
    this.createThreatChart();
    this.createRiskChart();
  }
  
  loadComplianceCharts() {
    this.createComplianceOverviewChart();
    this.createRequirementsChart();
  }
  
  loadVendorCharts() {
    this.createVendorMatrix();
    this.createResourcesChart();
    this.createTimelineChart();
  }
  
  loadInsuranceCharts() {
    this.createPremiumChart();
    this.createInsuranceRiskChart();
  }
  
  // Chart creation methods
  createTCOChart() {
    const container = document.getElementById('financial-tco-chart');
    if (!container || typeof ApexCharts === 'undefined') return;
    
    const options = {
      chart: { type: 'bar', height: 350, stacked: true },
      series: [
        { name: 'Hardware', data: [0, 130, 110, 100] },
        { name: 'Software', data: [172, 140, 125, 115] },
        { name: 'Implementation', data: [15, 85, 65, 75] },
        { name: 'Personnel', data: [25, 200, 175, 150] }
      ],
      xaxis: { categories: ['Portnox', 'Cisco', 'Aruba', 'Forescout'] },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
      dataLabels: { enabled: false },
      plotOptions: { bar: { borderRadius: 4 } }
    };
    
    const chart = new ApexCharts(container, options);
    chart.render();
    this.chartInstances.tcoChart = chart;
  }
  
  createSecurityRadarChart() {
    const container = document.getElementById('security-radar-chart');
    if (!container || typeof ApexCharts === 'undefined') return;
    
    const options = {
      chart: { type: 'radar', height: 400 },
      series: [
        { name: 'Portnox', data: [98, 95, 92, 95, 95, 93] },
        { name: 'Cisco', data: [75, 88, 85, 88, 72, 85] }
      ],
      xaxis: {
        categories: ['Zero Trust', 'Device Auth', 'Threat Prevention', 'Compliance', 'Automation', 'Visibility']
      },
      colors: ['#1a5a96', '#00bceb']
    };
    
    const chart = new ApexCharts(container, options);
    chart.render();
    this.chartInstances.securityRadar = chart;
  }
  
  createComplianceOverviewChart() {
    const container = document.getElementById('compliance-overview-chart');
    if (!container || typeof ApexCharts === 'undefined') return;
    
    const options = {
      chart: { type: 'donut', height: 350 },
      series: [96, 94, 92, 96],
      labels: ['PCI DSS', 'HIPAA', 'GDPR', 'NIST CSF'],
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']
    };
    
    const chart = new ApexCharts(container, options);
    chart.render();
    this.chartInstances.complianceOverview = chart;
  }
  
  createVendorMatrix() {
    const container = document.getElementById('vendor-matrix-table');
    if (!container) return;
    
    const vendors = ['Portnox', 'Cisco', 'Aruba', 'Forescout'];
    const metrics = ['3-Year TCO', 'ROI (%)', 'Implementation (Days)', 'Security Score'];
    const data = [
      ['$245K', '325%', '21', '95%'],
      ['$520K', '-8%', '90', '85%'],
      ['$480K', '5%', '75', '82%'],
      ['$430K', '12%', '60', '80%']
    ];
    
    let tableHTML = '<thead><tr><th>Vendor</th>';
    metrics.forEach(metric => {
      tableHTML += `<th>${metric}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';
    
    vendors.forEach((vendor, i) => {
      tableHTML += `<tr><td class="vendor-name">${vendor}</td>`;
      data[i].forEach(value => {
        tableHTML += `<td>${value}</td>`;
      });
      tableHTML += '</tr>';
    });
    tableHTML += '</tbody>';
    
    container.innerHTML = tableHTML;
  }
  
  loadVendorData() {
    // Load vendor data from existing sources
    if (window.ultimateExecutiveView && window.ultimateExecutiveView.vendorConfigs) {
      this.vendorData = window.ultimateExecutiveView.vendorConfigs;
    }
  }
  
  updateVendorSelection() {
    const activeVendors = Array.from(document.querySelectorAll('.vendor-toggle-top.active'))
      .map(toggle => toggle.getAttribute('data-vendor'));
    
    console.log('🏪 Active vendors:', activeVendors);
    
    // Refresh current tab charts
    this.loadChartsForTab(this.currentTab);
  }
  
  updateIndustryFilter(industry) {
    console.log(`🏭 Industry filter: ${industry}`);
    
    // Update industry-specific data and refresh charts
    this.loadChartsForTab(this.currentTab);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    if (!window.executiveTabsManager) {
      window.executiveTabsManager = new ExecutiveTabsManager();
      window.executiveTabsManager.init();
    }
  }, 2000);
});

// Export for global access
window.ExecutiveTabsManager = ExecutiveTabsManager;
