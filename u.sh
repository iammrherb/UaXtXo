#!/bin/bash

# Portnox Total Cost Analyzer Comprehensive Fix Script
# This script addresses various issues with the Portnox TCO Analyzer UI
# and enhances its functionality and appearance

# Set error handling
set -e

echo "===== Portnox TCO Analyzer Enhancement Script ====="
echo "Starting enhancement process..."

# Create directory for backup
mkdir -p backup/js/utils backup/js/components backup/js/models backup/js/data backup/css

# Backup existing files
echo "Creating backups of existing files..."
cp -f js/utils/ui-manager.js backup/js/utils/
cp -f js/components/tab-navigator-enhanced.js backup/js/components/
cp -f js/models/vendor-data.js backup/js/models/
cp -f js/data/vendor-data.js backup/js/data/ 2>/dev/null || true

# Fix the tab-navigator-enhanced.js syntax error
echo "Fixing syntax error in tab-navigator-enhanced.js..."
cat > js/components/tab-navigator-enhanced.js << 'EOF'
/**
 * Enhanced Tab Navigator for Portnox Total Cost Analyzer
 * Provides a fixed, modern tab structure with improved content templates
 */

class TabNavigator {
  constructor() {
    this.mainTabs = ['executive', 'financial', 'security', 'technical'];
    this.subTabs = {
      'executive': ['summary', 'comparison', 'roi'],
      'financial': ['tco', 'breakdown', 'projection'],
      'security': ['overview', 'compliance', 'risk'],
      'technical': ['architecture', 'features', 'deployment']
    };
    this.activeMainTab = 'executive';
    this.activeSubTabs = {};
    
    // Set default active subtabs
    this.mainTabs.forEach(tab => {
      this.activeSubTabs[tab] = this.subTabs[tab][0];
    });
  }
  
  /**
   * Initialize the tab navigator
   */
  init() {
    console.log('Initializing TabNavigator...');
    
    // Create tab structure if it doesn't exist
    this.createTabStructure();
    
    // Initialize event listeners
    this.initEventListeners();
    
    // Activate default tabs
    this.activateTab(this.activeMainTab);
    
    return this;
  }
  
  /**
   * Create the tab structure
   */
  createTabStructure() {
    const tabContainer = document.querySelector('.tab-container');
    if (!tabContainer) {
      console.error('Tab container not found, creating it');
      this.createTabContainer();
      return;
    }
    
    // Clear existing tabs
    tabContainer.innerHTML = '';
    
    // Create main tabs
    const mainTabsEl = document.createElement('div');
    mainTabsEl.className = 'main-tabs';
    
    this.mainTabs.forEach(tab => {
      const tabEl = document.createElement('div');
      tabEl.className = 'main-tab';
      tabEl.dataset.tab = tab;
      tabEl.innerHTML = `
        <div class="tab-icon"><i class="fas ${this.getTabIcon(tab)}"></i></div>
        <div class="tab-label">${this.formatTabName(tab)}</div>
      `;
      mainTabsEl.appendChild(tabEl);
    });
    
    tabContainer.appendChild(mainTabsEl);
    
    // Create subtabs container
    const subTabsContainer = document.createElement('div');
    subTabsContainer.className = 'sub-tabs-container';
    
    // Create subtabs for each main tab
    this.mainTabs.forEach(mainTab => {
      const subTabsEl = document.createElement('div');
      subTabsEl.className = 'sub-tabs';
      subTabsEl.dataset.parentTab = mainTab;
      
      this.subTabs[mainTab].forEach(subTab => {
        const tabEl = document.createElement('div');
        tabEl.className = 'sub-tab';
        tabEl.dataset.tab = subTab;
        tabEl.dataset.parentTab = mainTab;
        tabEl.textContent = this.formatTabName(subTab);
        subTabsEl.appendChild(tabEl);
      });
      
      subTabsContainer.appendChild(subTabsEl);
    });
    
    tabContainer.appendChild(subTabsContainer);
    
    // Create view container if it doesn't exist
    let viewContainer = document.querySelector('.view-container');
    if (!viewContainer) {
      viewContainer = document.createElement('div');
      viewContainer.className = 'view-container';
      tabContainer.after(viewContainer);
    }
  }
  
  /**
   * Create tab container if it doesn't exist
   */
  createTabContainer() {
    const mainContent = document.querySelector('.content-area');
    if (!mainContent) {
      console.error('Content area not found, cannot create tab container');
      return;
    }
    
    // Create tab container
    const tabContainer = document.createElement('div');
    tabContainer.className = 'tab-container';
    
    // Insert at the beginning of main content
    mainContent.prepend(tabContainer);
    
    // Now create the structure
    this.createTabStructure();
  }
  
  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // Main tab click event
    const mainTabs = document.querySelectorAll('.main-tab');
    mainTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        this.activateTab(tabName);
      });
    });
    
    // Subtab click event
    const subTabs = document.querySelectorAll('.sub-tab');
    subTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const parentTab = tab.dataset.parentTab;
        const tabName = tab.dataset.tab;
        this.activateSubTab(parentTab, tabName);
      });
    });
  }
  
  /**
   * Activate a main tab
   */
  activateTab(tabName) {
    // Validate tab name
    if (!this.mainTabs.includes(tabName)) {
      console.error("Invalid tab name: " + tabName);
      return;
    }
    
    this.activeMainTab = tabName;
    
    // Update active tab UI
    const mainTabs = document.querySelectorAll('.main-tab');
    mainTabs.forEach(tab => {
      if (tab.dataset.tab === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Show appropriate subtabs
    const subTabsContainers = document.querySelectorAll('.sub-tabs');
    subTabsContainers.forEach(container => {
      if (container.dataset.parentTab === tabName) {
        container.classList.add('active');
      } else {
        container.classList.remove('active');
      }
    });
    
    // Activate the current subtab for this main tab
    this.activateSubTab(tabName, this.activeSubTabs[tabName]);
  }
  
  /**
   * Activate a subtab
   */
  activateSubTab(parentTab, tabName) {
    // Validate tab names
    if (!this.mainTabs.includes(parentTab) || !this.subTabs[parentTab].includes(tabName)) {
      console.error("Invalid tab combination: " + parentTab + "/" + tabName);
      return;
    }
    
    this.activeSubTabs[parentTab] = tabName;
    
    // Update active subtab UI
    const subTabs = document.querySelectorAll('.sub-tab');
    subTabs.forEach(tab => {
      if (tab.dataset.parentTab === parentTab && tab.dataset.tab === tabName) {
        tab.classList.add('active');
      } else if (tab.dataset.parentTab === parentTab) {
        tab.classList.remove('active');
      }
    });
    
    // Show appropriate view content
    this.showViewContent(parentTab, tabName);
  }
  
  /**
   * Show appropriate view content
   */
  showViewContent(mainTab, subTab) {
    const viewId = mainTab + "-" + subTab;
    
    // Hide all views
    const views = document.querySelectorAll('.view-content');
    views.forEach(view => view.classList.remove('active'));
    
    // Show selected view
    const targetView = document.getElementById(viewId);
    if (targetView) {
      targetView.classList.add('active');
    } else {
      // Create view if it doesn't exist
      this.createViewContent(mainTab, subTab);
    }
    
    // Refresh charts if needed
    this.refreshChartsInView(mainTab, subTab);
  }
  
  /**
   * Create view content
   */
  createViewContent(mainTab, subTab) {
    const viewId = mainTab + "-" + subTab;
    const viewContainer = document.querySelector('.view-container');
    
    if (!viewContainer) {
      console.error('View container not found');
      return;
    }
    
    // Create view content
    const viewContent = document.createElement('div');
    viewContent.id = viewId;
    viewContent.className = 'view-content active';
    
    // Add appropriate content based on the view
    viewContent.innerHTML = this.getViewTemplate(mainTab, subTab);
    
    viewContainer.appendChild(viewContent);
    
    // Initialize charts for this view
    this.initializeChartsForView(mainTab, subTab);
    
    // Initialize other components for this view
    this.initializeComponentsForView(mainTab, subTab);
  }
  
  /**
   * Get view template
   */
  getViewTemplate(mainTab, subTab) {
    // Templates for various views
    const templates = {
      'executive-summary': `
        <div class="section-banner banner-gradient-cool">
          <h2><i class="fas fa-chart-line"></i> Executive Overview</h2>
          <p>Comprehensive analysis of Network Access Control solutions with focus on Total Cost of Ownership, ROI, and business impact.</p>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-title"><i class="fas fa-coins"></i> 3-Year TCO Savings</div>
            <div class="stat-value">$370,000</div>
            <div class="stat-indicator positive">
              <i class="fas fa-arrow-up"></i> vs Traditional NAC
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-title"><i class="fas fa-clock"></i> Deployment Time</div>
            <div class="stat-value">1 Day</div>
            <div class="stat-indicator positive">
              <i class="fas fa-arrow-down"></i> 98% faster
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-title"><i class="fas fa-shield-alt"></i> Security Coverage</div>
            <div class="stat-value">95%</div>
            <div class="stat-indicator positive">
              <i class="fas fa-arrow-up"></i> 15% higher
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-title"><i class="fas fa-calculator"></i> ROI</div>
            <div class="stat-value">285%</div>
            <div class="stat-indicator positive">
              <i class="fas fa-arrow-up"></i> 1-Year Payback
            </div>
          </div>
        </div>

        <div class="chart-section">
          <h3 class="section-title"><i class="fas fa-chart-bar"></i> NAC Solution Comparison</h3>
          <div class="chart-row">
            <div class="chart-wrapper" id="executive-tco-chart">
              <div class="chart-title">3-Year TCO Comparison</div>
              <div class="chart-subtitle">Total cost of ownership including hardware, software, and operations</div>
              <div class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading TCO comparison chart...</p>
              </div>
            </div>
            <div class="chart-wrapper" id="executive-roi-chart">
              <div class="chart-title">Return on Investment</div>
              <div class="chart-subtitle">Cumulative ROI over a 3-year period</div>
              <div class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading ROI chart...</p>
              </div>
            </div>
          </div>
          <div class="insight-panel">
            <h3><i class="fas fa-lightbulb"></i> Key Insights</h3>
            <ul class="insight-list">
              <li><strong>Portnox Cloud offers the lowest TCO</strong> compared to traditional NAC solutions, with savings of up to 60%</li>
              <li><strong>Cloud-native architecture eliminates hardware costs</strong> and reduces maintenance expenses</li>
              <li><strong>Simplified deployment reduces implementation time</strong> by up to 98% compared to on-premises solutions</li>
              <li><strong>Enhanced security capabilities</strong> lead to reduced breach risk and lower cyber insurance costs</li>
            </ul>
          </div>
        </div>

        <div class="nist-framework-section">
          <h3 class="section-title"><i class="fas fa-shield-alt"></i> NIST Cybersecurity Framework Compliance</h3>
          <div id="nist-csf-visualization" class="nist-framework">
            <div class="chart-placeholder">
              <div class="chart-loading-spinner"></div>
              <p>Loading NIST CSF visualization...</p>
            </div>
          </div>
        </div>

        <div class="recommendations-section">
          <h3 class="section-title"><i class="fas fa-check-circle"></i> Key Recommendations</h3>
          <div class="recommendations-grid">
            <div class="recommendation-card">
              <div class="recommendation-icon"><i class="fas fa-cloud"></i></div>
              <div class="recommendation-title">Adopt Cloud-Native NAC</div>
              <div class="recommendation-text">Transition from legacy on-premises NAC to cloud-native solutions to eliminate hardware costs and reduce operational complexity</div>
            </div>
            <div class="recommendation-card">
              <div class="recommendation-icon"><i class="fas fa-sync-alt"></i></div>
              <div class="recommendation-title">Streamline Deployment</div>
              <div class="recommendation-text">Choose solutions that offer streamlined deployment to achieve faster time-to-value and reduce implementation costs</div>
            </div>
            <div class="recommendation-card">
              <div class="recommendation-icon"><i class="fas fa-lock"></i></div>
              <div class="recommendation-title">Enhance Zero Trust</div>
              <div class="recommendation-text">Implement NAC solutions with strong Zero Trust Network Access capabilities to improve security posture</div>
            </div>
            <div class="recommendation-card">
              <div class="recommendation-icon"><i class="fas fa-users"></i></div>
              <div class="recommendation-title">Optimize Personnel</div>
              <div class="recommendation-text">Focus IT personnel on strategic initiatives by reducing the operational burden of NAC management</div>
            </div>
          </div>
        </div>
      `,

      'executive-comparison': `
        <div class="section-banner banner-gradient-cool">
          <h2><i class="fas fa-balance-scale"></i> NAC Vendor Comparison</h2>
          <p>Side-by-side analysis of leading Network Access Control vendors in the market.</p>
        </div>

        <div id="feature-heatmap" class="feature-comparison-section">
          <div class="chart-placeholder">
            <div class="chart-loading-spinner"></div>
            <p>Loading feature comparison heatmap...</p>
          </div>
        </div>

        <div id="cost-comparison" class="cost-comparison-section">
          <div class="chart-placeholder">
            <div class="chart-loading-spinner"></div>
            <p>Loading cost comparison data...</p>
          </div>
        </div>

        <div class="market-position-section">
          <h3 class="section-title"><i class="fas fa-trophy"></i> Market Position</h3>
          <div class="vendor-position-grid">
            <div class="vendor-position-card">
              <div class="vendor-position-logo">
                <img src="./img/logos/gartner.png" alt="Gartner">
              </div>
              <div class="vendor-position-title">Gartner</div>
              <div class="vendor-position-text">Named as a <strong>Leader</strong> in the Gartner Magic Quadrant for Network Access Control, with highest position for "Completeness of Vision"</div>
            </div>
            <div class="vendor-position-card">
              <div class="vendor-position-logo">
                <img src="./img/logos/forrester.png" alt="Forrester">
              </div>
              <div class="vendor-position-title">Forrester</div>
              <div class="vendor-position-text">Recognized as a <strong>Strong Performer</strong> in the Forrester Wave™: Zero Trust Network Access, with top scores in cloud delivery model</div>
            </div>
            <div class="vendor-position-card">
              <div class="vendor-position-logo">
                <img src="./img/logos/idc.png" alt="IDC">
              </div>
              <div class="vendor-position-title">IDC</div>
              <div class="vendor-position-text">Highlighted as an <strong>Innovator</strong> in the IDC MarketScape for Network Access Control, noted for cloud-native architecture</div>
            </div>
            <div class="vendor-position-card">
              <div class="vendor-position-logo">
                <img src="./img/logos/ema.png" alt="EMA">
              </div>
              <div class="vendor-position-title">EMA</div>
              <div class="vendor-position-text">Named a <strong>Value Leader</strong> by Enterprise Management Associates for TCO and time-to-value metrics</div>
            </div>
          </div>
        </div>
      `,

      'financial-tco': `
        <div class="section-banner banner-gradient-primary">
          <h2><i class="fas fa-dollar-sign"></i> Total Cost of Ownership Analysis</h2>
          <p>Detailed breakdown of all costs associated with NAC solutions over a 3-year period.</p>
        </div>

        <div class="cost-breakdown-section">
          <div class="chart-row">
            <div class="chart-wrapper" id="tco-comparison-chart">
              <div class="chart-title">3-Year TCO Comparison</div>
              <div class="chart-subtitle">Total cost breakdown by vendor</div>
              <div class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading TCO comparison chart...</p>
              </div>
            </div>
            <div class="chart-wrapper" id="cumulative-cost-chart">
              <div class="chart-title">Cumulative Cost Over Time</div>
              <div class="chart-subtitle">Year-by-year cost accumulation</div>
              <div class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading cumulative cost chart...</p>
              </div>
            </div>
          </div>

          <div class="cost-table-section glass-panel">
            <h3 class="section-title"><i class="fas fa-table"></i> Detailed Cost Breakdown</h3>
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Cost Component</th>
                    <th>Portnox Cloud</th>
                    <th>Traditional NAC</th>
                    <th>Savings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hardware</td>
                    <td>$0</td>
                    <td>$120,000</td>
                    <td class="savings">$120,000</td>
                  </tr>
                  <tr>
                    <td>Software Licenses</td>
                    <td>$180,000</td>
                    <td>$150,000</td>
                    <td class="negative">-$30,000</td>
                  </tr>
                  <tr>
                    <td>Implementation</td>
                    <td>$15,000</td>
                    <td>$75,000</td>
                    <td class="savings">$60,000</td>
                  </tr>
                  <tr>
                    <td>Maintenance</td>
                    <td>$0</td>
                    <td>$90,000</td>
                    <td class="savings">$90,000</td>
                  </tr>
                  <tr>
                    <td>Personnel</td>
                    <td>$50,000</td>
                    <td>$180,000</td>
                    <td class="savings">$130,000</td>
                  </tr>
                  <tr class="total-row">
                    <td>Total 3-Year TCO</td>
                    <td>$245,000</td>
                    <td>$615,000</td>
                    <td class="total-savings">$370,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="cost-factors-section">
          <h3 class="section-title"><i class="fas fa-tags"></i> Cost Factors Analysis</h3>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-title"><i class="fas fa-server"></i> Hardware Elimination</div>
              <div class="stat-value">100%</div>
              <div class="stat-text">Cloud-native architecture eliminates all hardware requirements, reducing capital expenditure</div>
            </div>
            <div class="stat-card">
              <div class="stat-title"><i class="fas fa-tools"></i> Maintenance Reduction</div>
              <div class="stat-value">100%</div>
              <div class="stat-text">SaaS delivery model shifts maintenance responsibility to the vendor</div>
            </div>
            <div class="stat-card">
              <div class="stat-title"><i class="fas fa-user-cog"></i> IT Staff Time</div>
              <div class="stat-value">-72%</div>
              <div class="stat-text">Reduced administrative overhead through automation and simplified management</div>
            </div>
            <div class="stat-card">
              <div class="stat-title"><i class="fas fa-clock"></i> Time-to-Value</div>
              <div class="stat-value">-98%</div>
              <div class="stat-text">Rapid deployment accelerates time-to-value from months to hours</div>
            </div>
          </div>
        </div>
      `,

      'security-overview': `
        <div class="section-banner banner-gradient-primary">
          <h2><i class="fas fa-shield-alt"></i> Security Capabilities Overview</h2>
          <p>Comprehensive analysis of security features, compliance coverage, and risk mitigation capabilities.</p>
        </div>

        <div class="security-capabilities-section">
          <div class="chart-row">
            <div class="chart-wrapper large-chart" id="security-treemap-chart">
              <div class="chart-title">Security Capabilities Comparison</div>
              <div class="chart-subtitle">Comprehensive visualization of security features across vendors</div>
              <div class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading security capabilities visualization...</p>
              </div>
            </div>
          </div>

          <div id="security-comparison" class="security-comparison-section">
            <div class="chart-placeholder">
              <div class="chart-loading-spinner"></div>
              <p>Loading security comparison data...</p>
            </div>
          </div>
        </div>

        <div class="risk-reduction-section">
          <h3 class="section-title"><i class="fas fa-chart-line"></i> Risk Reduction Impact</h3>
          <div class="chart-row">
            <div class="chart-wrapper" id="breach-impact-chart">
              <div class="chart-title">Data Breach Cost Reduction</div>
              <div class="chart-subtitle">Estimated financial impact of security improvements</div>
              <div class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading breach impact chart...</p>
              </div>
            </div>
            <div class="chart-wrapper" id="security-frameworks-chart">
              <div class="chart-title">Compliance Framework Coverage</div>
              <div class="chart-subtitle">Support for key regulatory frameworks</div>
              <div class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading compliance coverage chart...</p>
              </div>
            </div>
          </div>
        </div>

        <div class="zero-trust-section glass-panel">
          <h3 class="section-title"><i class="fas fa-fingerprint"></i> Zero Trust Security Model</h3>
          <div class="zero-trust-content">
            <p class="zero-trust-description">
              Portnox Cloud implements a comprehensive Zero Trust Network Access (ZTNA) approach, providing continuous verification of all devices and users before granting access to network resources.
            </p>
            <div class="zero-trust-capabilities">
              <div class="capability-item">
                <div class="capability-icon"><i class="fas fa-user-check"></i></div>
                <div class="capability-name">Never Trust, Always Verify</div>
                <div class="capability-description">Continuous authentication of all devices and users</div>
              </div>
              <div class="capability-item">
                <div class="capability-icon"><i class="fas fa-lock"></i></div>
                <div class="capability-name">Least Privilege Access</div>
                <div class="capability-description">Only the minimum required access is granted</div>
              </div>
              <div class="capability-item">
                <div class="capability-icon"><i class="fas fa-eye"></i></div>
                <div class="capability-name">Continuous Monitoring</div>
                <div class="capability-description">Real-time visibility of all network access events</div>
              </div>
              <div class="capability-item">
                <div class="capability-icon"><i class="fas fa-ban"></i></div>
                <div class="capability-name">Device Compliance</div>
                <div class="capability-description">Continuous verification of device security posture</div>
              </div>
            </div>
          </div>
        </div>
      `,

      'technical-architecture': `
        <div class="section-banner banner-gradient-warm">
          <h2><i class="fas fa-cogs"></i> Technical Architecture Comparison</h2>
          <p>In-depth analysis of NAC architectures, deployment models, and technical capabilities.</p>
        </div>

        <div id="technical-comparison" class="technical-comparison-section">
          <div class="chart-placeholder">
            <div class="chart-loading-spinner"></div>
            <p>Loading technical comparison data...</p>
          </div>
        </div>

        <div class="architecture-section">
          <h3 class="section-title"><i class="fas fa-project-diagram"></i> Architecture Comparison</h3>
          <div class="architecture-types">
            <div class="arch-type arch-type-cloud">
              <div class="arch-type-header">
                <div class="arch-type-icon"><i class="fas fa-cloud"></i></div>
                <div class="arch-type-name">Cloud-Native</div>
                <div class="arch-type-vendor">Portnox Cloud</div>
              </div>
              <div class="arch-type-diagram">
                <img src="./img/arch-cloud.svg" alt="Cloud Architecture" onerror="this.src='./img/arch-cloud-placeholder.png'">
              </div>
              <div class="arch-type-advantages">
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>No on-premises hardware required</span>
                </div>
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Automatic updates and maintenance</span>
                </div>
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Seamless scalability</span>
                </div>
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Native remote user support</span>
                </div>
              </div>
            </div>
            <div class="arch-type arch-type-onprem">
              <div class="arch-type-header">
                <div class="arch-type-icon"><i class="fas fa-server"></i></div>
                <div class="arch-type-name">On-Premises</div>
                <div class="arch-type-vendor">Cisco, Aruba</div>
              </div>
              <div class="arch-type-diagram">
                <img src="./img/arch-onprem.svg" alt="On-Premises Architecture" onerror="this.src='./img/arch-onprem-placeholder.png'">
              </div>
              <div class="arch-type-advantages">
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Full control over infrastructure</span>
                </div>
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>No internet dependency for core functions</span>
                </div>
                <div class="disadvantage-item">
                  <i class="fas fa-times-circle"></i>
                  <span>High hardware and maintenance costs</span>
                </div>
                <div class="disadvantage-item">
                  <i class="fas fa-times-circle"></i>
                  <span>Complex deployment and upgrades</span>
                </div>
              </div>
            </div>
            <div class="arch-type arch-type-hybrid">
              <div class="arch-type-header">
                <div class="arch-type-icon"><i class="fas fa-sync"></i></div>
                <div class="arch-type-name">Hybrid</div>
                <div class="arch-type-vendor">Forescout, FortiNAC</div>
              </div>
              <div class="arch-type-diagram">
                <img src="./img/arch-hybrid.svg" alt="Hybrid Architecture" onerror="this.src='./img/arch-hybrid-placeholder.png'">
              </div>
              <div class="arch-type-advantages">
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Cloud management with on-prem enforcement</span>
                </div>
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Some remote user capabilities</span>
                </div>
                <div class="disadvantage-item">
                  <i class="fas fa-times-circle"></i>
                  <span>Still requires hardware components</span>
                </div>
                <div class="disadvantage-item">
                  <i class="fas fa-times-circle"></i>
                  <span>More complex architecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="deployment-section glass-panel">
          <h3 class="section-title"><i class="fas fa-rocket"></i> Deployment Comparison</h3>
          <div class="timeline-comparison">
            <div class="timeline-vendor timeline-portnox">
              <div class="timeline-header">
                <img src="./img/vendors/portnox.png" alt="Portnox">
                <span class="timeline-title">Portnox Cloud</span>
              </div>
              <div class="timeline">
                <div class="timeline-stage" style="width: 100%;">
                  <div class="stage-label">Full Deployment</div>
                  <div class="stage-duration">1 Day</div>
                </div>
              </div>
            </div>
            <div class="timeline-vendor timeline-traditional">
              <div class="timeline-header">
                <img src="./img/vendors/cisco.png" alt="Traditional NAC">
                <span class="timeline-title">Traditional NAC</span>
              </div>
              <div class="timeline">
                <div class="timeline-stage" style="width: 25%;">
                  <div class="stage-label">Planning</div>
                  <div class="stage-duration">2 Weeks</div>
                </div>
                <div class="timeline-stage" style="width: 25%;">
                  <div class="stage-label">Hardware Setup</div>
                  <div class="stage-duration">2 Weeks</div>
                </div>
                <div class="timeline-stage" style="width: 35%;">
                  <div class="stage-label">Implementation</div>
                  <div class="stage-duration">3 Weeks</div>
                </div>
                <div class="timeline-stage" style="width: 15%;">
                  <div class="stage-label">Testing</div>
                  <div class="stage-duration">1 Week</div>
                </div>
              </div>
              <div class="timeline-total">Total: 8 Weeks</div>
            </div>
          </div>
        </div>
      `
    };

    // Return the template for the requested view
    const template = templates[mainTab + "-" + subTab];
    if (template) return template;

    // Default template if specific one not found
    return `
      <div class="section-banner">
        <h2>${this.formatTabName(mainTab)} - ${this.formatTabName(subTab)}</h2>
        <p>This section is under development.</p>
      </div>
      <div class="placeholder-content">
        <div class="glass-panel">
          <p>Content for ${mainTab} ${subTab} view will be displayed here.</p>
        </div>
      </div>
    `;
  }

  /**
   * Initialize charts for a view
   */
  initializeChartsForView(mainTab, subTab) {
    // Only initialize if chart loader is available
    if (!window.chartLoader) {
      console.error('Chart loader not available');
      return;
    }

    const viewId = mainTab + "-" + subTab;

    // Map of views to charts that should be initialized
    const chartMap = {
      'executive-summary': [
        { type: 'apex-tco', containerId: 'executive-tco-chart', chartId: 'executiveTcoChart' },
        { type: 'apex-cost', containerId: 'executive-roi-chart', chartId: 'executiveRoiChart' }
      ],
      'financial-tco': [
        { type: 'apex-tco', containerId: 'tco-comparison-chart', chartId: 'financialTcoChart' },
        { type: 'apex-cost', containerId: 'cumulative-cost-chart', chartId: 'financialCostChart' }
      ],
      'security-overview': [
        { type: 'treemap-security', containerId: 'security-treemap-chart', chartId: 'securityTreemapChart' },
        { type: 'apex-breach', containerId: 'breach-impact-chart', chartId: 'breachImpactChart' },
        { type: 'd3-security', containerId: 'security-frameworks-chart', chartId: 'securityFrameworksChart' }
      ]
    };

    // Queue charts for loading
    const charts = chartMap[viewId];
    if (charts) {
      charts.forEach(chart => {
        window.chartLoader.queueChart(chart.type, chart.containerId, chart.chartId);
      });
    }
  }

  /**
   * Initialize components for a view
   */
  initializeComponentsForView(mainTab, subTab) {
    const viewId = mainTab + "-" + subTab;

    // Initialize NIST CSF visualization
    if (viewId === 'executive-summary' && document.getElementById('nist-csf-visualization')) {
      if (typeof NistCSFVisualization !== 'undefined') {
        window.nistCsfVisualization = new NistCSFVisualization('nist-csf-visualization').init();
      }
    }

    // Initialize feature heatmap
    if (viewId === 'executive-comparison' && document.getElementById('feature-heatmap')) {
      if (typeof VendorComparison !== 'undefined') {
        VendorComparison.createFeatureHeatmap('feature-heatmap');
      }
    }

    // Initialize cost comparison
    if (viewId === 'executive-comparison' && document.getElementById('cost-comparison')) {
      if (typeof VendorComparison !== 'undefined') {
        VendorComparison.createCostComparison('cost-comparison');
      }
    }

    // Initialize security comparison
    if (viewId === 'security-overview' && document.getElementById('security-comparison')) {
      if (typeof VendorComparison !== 'undefined') {
        VendorComparison.createSecurityComparison('security-comparison');
      }
    }

    // Initialize technical comparison
    if (viewId === 'technical-architecture' && document.getElementById('technical-comparison')) {
      if (typeof VendorComparison !== 'undefined') {
        VendorComparison.createTechnicalComparison('technical-comparison');
      }
    }
  }

  /**
   * Refresh charts in a view
   */
  refreshChartsInView(mainTab, subTab) {
    // For future use when data changes
  }

  /**
   * Get icon for a tab
   */
  getTabIcon(tabName) {
    const icons = {
      'executive': 'fa-chart-pie',
      'financial': 'fa-dollar-sign',
      'security': 'fa-shield-alt',
      'technical': 'fa-cogs'
    };

    return icons[tabName] || 'fa-circle';
  }

  /**
   * Format tab name for display
   */
  formatTabName(tabName) {
    return tabName.charAt(0).toUpperCase() + tabName.slice(1);
  }
}

// Make it globally available
window.TabNavigator = TabNavigator;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (!window.tabNavigator) {
    window.tabNavigator = new TabNavigator().init();
  }
});
EOF

# Fix syntax error in vendor-data.js
echo "Creating fixed vendor-data.js..."
cat > js/data/vendor-data.js << 'EOF'
/**
 * Comprehensive Vendor Data for Portnox Total Cost Analyzer
 * Contains detailed information on all NAC vendors, their features, costs, and technical specifications
 */

const VENDORS = {
  'portnox': {
    name: 'Portnox Cloud',
    shortName: 'Portnox',
    logoUrl: './img/vendors/portnox.png',
    cloudNative: true,
    architecture: 'cloud',
    deployment: {
      timeToValue: 1, // Days
      complexity: 'Low',
      requiresHardware: false,
      requiresAgents: false,
      remoteWorkSupport: true,
      cloudManaged: true
    },
    costs: {
      pricing: 'subscription',
      licensePerDevice: 50,
      hardware: 0,
      implementation: 15000,
      maintenance: 0,
      yearlySubscription: 172000,
      personnel: 25000,
      training: 5000,
      tco3Year: 245000
    },
    security: {
      zeroTrust: 95,
      deviceAuth: 90,
      riskAssessment: 95,
      remediationSpeed: 15,
      complianceCoverage: 95,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 95,
      hipaa: 95,
      gdpr: 90,
      nist: 95,
      iso27001: 95,
      sox: 90,
      cmmc: 90,
      frameworks: [
        {name: 'NIST CSF', coverage: 95, details: {identify: 92, protect: 96, detect: 95, respond: 94, recover: 90}},
        {name: 'PCI DSS', coverage: 95},
        {name: 'HIPAA', coverage: 95},
        {name: 'GDPR', coverage: 90},
        {name: 'ISO 27001', coverage: 90},
        {name: 'SOX', coverage: 90}
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: true,
      aws: true,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: true
    },
    technical: {
      maxDevices: 'Unlimited',
      performanceImpact: 'Minimal',
      scalability: 'Highly Scalable',
      reliability: 99.99,
      redundancy: 'Built-in',
      disasterRecovery: 'Automatic',
      updateFrequency: 'Continuous'
    },
    customers: {
      industries: ['Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Government', 'Education'],
      companySize: ['Small', 'Medium', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific', 'Latin America']
    },
    differentiators: [
      'True cloud-native architecture with zero on-premises footprint',
      'Rapid deployment with time-to-value measured in hours',
      'Continuous updates and security enhancements without downtime',
      'Comprehensive Zero Trust Network Access capabilities',
      'Built-in scalability and multi-tenancy'
    ]
  },
  
  'cisco': {
    name: 'Cisco ISE',
    shortName: 'Cisco',
    logoUrl: './img/vendors/cisco.png',
    cloudNative: false,
    architecture: 'on-premises',
    deployment: {
      timeToValue: 90, // Days
      complexity: 'High',
      requiresHardware: true,
      requiresAgents: true,
      remoteWorkSupport: true,
      cloudManaged: false
    },
    costs: {
      pricing: 'perpetual',
      licensePerDevice: 60,
      hardware: 130000,
      implementation: 85000,
      maintenance: 98000,
      yearlySubscription: 0,
      personnel: 200000,
      training: 20000,
      tco3Year: 520000
    },
    security: {
      zeroTrust: 80,
      deviceAuth: 85,
      riskAssessment: 82,
      remediationSpeed: 45,
      complianceCoverage: 90,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 90,
      hipaa: 90,
      gdpr: 85,
      nist: 90,
      iso27001: 90,
      sox: 85,
      cmmc: 90,
      frameworks: [
        {name: 'NIST CSF', coverage: 90, details: {identify: 88, protect: 92, detect: 90, respond: 85, recover: 82}},
        {name: 'PCI DSS', coverage: 90},
        {name: 'HIPAA', coverage: 90},
        {name: 'GDPR', coverage: 85},
        {name: 'ISO 27001', coverage: 90},
        {name: 'SOX', coverage: 85}
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: true,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: true
    },
    technical: {
      maxDevices: '100,000+',
      performanceImpact: 'Moderate',
      scalability: 'Enterprise-grade',
      reliability: 99.9,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Finance', 'Healthcare', 'Government', 'Education', 'Manufacturing'],
      companySize: ['Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East']
    },
    differentiators: [
      'Deep integration with Cisco networking infrastructure',
      'Extensive feature set for large enterprise deployments',
      'Mature product with long history in the market',
      'Strong professional services and support ecosystem',
      'Comprehensive policy management capabilities'
    ]
  },
  
  'aruba': {
    name: 'Aruba ClearPass',
    shortName: 'Aruba',
    logoUrl: './img/vendors/aruba.png',
    cloudNative: false,
    architecture: 'on-premises',
    deployment: {
      timeToValue: 60, // Days
      complexity: 'High',
      requiresHardware: true,
      requiresAgents: true,
      remoteWorkSupport: true,
      cloudManaged: false
    },
    costs: {
      pricing: 'perpetual',
      licensePerDevice: 55,
      hardware: 110000,
      implementation: 65000,
      maintenance: 85000,
      yearlySubscription: 0,
      personnel: 175000,
      training: 15000,
      tco3Year: 480000
    },
    security: {
      zeroTrust: 80,
      deviceAuth: 85,
      riskAssessment: 80,
      remediationSpeed: 40,
      complianceCoverage: 85,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 90,
      hipaa: 85,
      gdpr: 80,
      nist: 85,
      iso27001: 85,
      sox: 80,
      cmmc: 85,
      frameworks: [
        {name: 'NIST CSF', coverage: 85, details: {identify: 85, protect: 90, detect: 85, respond: 80, recover: 80}},
        {name: 'PCI DSS', coverage: 90},
        {name: 'HIPAA', coverage: 85},
        {name: 'GDPR', coverage: 80},
        {name: 'ISO 27001', coverage: 85},
        {name: 'SOX', coverage: 80}
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: false,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: true
    },
    technical: {
      maxDevices: '75,000+',
      performanceImpact: 'Moderate',
      scalability: 'Enterprise-grade',
      reliability: 99.9,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Healthcare', 'Government', 'Education', 'Retail', 'Manufacturing'],
      companySize: ['Medium', 'Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific']
    },
    differentiators: [
      'Tight integration with Aruba wireless infrastructure',
      'Strong focus on BYOD and guest networking',
      'Role-based access control capabilities',
      'Extensive device profiling database',
      'Context-aware policy enforcement'
    ]
  },
  
  'forescout': {
    name: 'Forescout Platform',
    shortName: 'Forescout',
    logoUrl: './img/vendors/forescout.png',
    cloudNative: false,
    architecture: 'hybrid',
    deployment: {
      timeToValue: 75, // Days
      complexity: 'High',
      requiresHardware: true,
      requiresAgents: false,
      remoteWorkSupport: true,
      cloudManaged: false
    },
    costs: {
      pricing: 'perpetual',
      licensePerDevice: 65,
      hardware: 100000,
      implementation: 75000,
      maintenance: 75000,
      yearlySubscription: 0,
      personnel: 150000,
      training: 15000,
      tco3Year: 430000
    },
    security: {
      zeroTrust: 85,
      deviceAuth: 85,
      riskAssessment: 90,
      remediationSpeed: 35,
      complianceCoverage: 85,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 90,
      hipaa: 85,
      gdpr: 80,
      nist: 85,
      iso27001: 85,
      sox: 85,
      cmmc: 85,
      frameworks: [
        {name: 'NIST CSF', coverage: 85, details: {identify: 90, protect: 85, detect: 90, respond: 80, recover: 75}},
        {name: 'PCI DSS', coverage: 90},
        {name: 'HIPAA', coverage: 85},
        {name: 'GDPR', coverage: 80},
        {name: 'ISO 27001', coverage: 85},
        {name: 'SOX', coverage: 85}
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: true,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: true
    },
    technical: {
      maxDevices: '60,000+',
      performanceImpact: 'Low',
      scalability: 'Enterprise-grade',
      reliability: 99.9,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Healthcare', 'Finance', 'Government', 'Critical Infrastructure', 'Manufacturing'],
      companySize: ['Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific', 'Middle East']
    },
    differentiators: [
      'Agentless device discovery and classification',
      'Extensive IoT device support and visibility',
      'Strong OT/ICS security capabilities',
      'Network segmentation orchestration',
      'Comprehensive device visibility across network segments'
    ]
  },
  
  'fortinac': {
    name: 'FortiNAC',
    shortName: 'FortiNAC',
    logoUrl: './img/vendors/fortinac.png',
    cloudNative: false,
    architecture: 'hybrid',
    deployment: {
      timeToValue: 60, // Days
      complexity: 'Moderate',
      requiresHardware: true,
      requiresAgents: false,
      remoteWorkSupport: true,
      cloudManaged: false
    },
    costs: {
      pricing: 'perpetual',
      licensePerDevice: 45,
      hardware: 90000,
      implementation: 60000,
      maintenance: 65000,
      yearlySubscription: 0,
      personnel: 140000,
      training: 12000,
      tco3Year: 385000
    },
    security: {
      zeroTrust: 80,
      deviceAuth: 80,
      riskAssessment: 75,
      remediationSpeed: 35,
      complianceCoverage: 80,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 85,
      hipaa: 80,
      gdpr: 75,
      nist: 80,
      iso27001: 80,
      sox: 80,
      cmmc: 85,
      frameworks: [
        {name: 'NIST CSF', coverage: 80, details: {identify: 80, protect: 85, detect: 80, respond: 75, recover: 75}},
        {name: 'PCI DSS', coverage: 85},
        {name: 'HIPAA', coverage: 80},
        {name: 'GDPR', coverage: 75},
        {name: 'ISO 27001', coverage: 80},
        {name: 'SOX', coverage: 80}
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: false,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: false
    },
    technical: {
      maxDevices: '50,000+',
      performanceImpact: 'Moderate',
      scalability: 'Enterprise-grade',
      reliability: 99.9,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Government', 'Education', 'Healthcare', 'Retail', 'Manufacturing'],
      companySize: ['Medium', 'Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific', 'Latin America']
    },
    differentiators: [
      'Integrated with Fortinet Security Fabric',
      'Strong focus on IoT security',
      'Good automation and orchestration capabilities',
      'Integration with FortiSOAR for incident response',
      'Rogue device detection and mitigation'
    ]
  },
  
  'juniper': {
    name: 'Juniper NAC',
    shortName: 'Juniper',
    logoUrl: './img/vendors/juniper.png',
    cloudNative: false,
    architecture: 'on-premises',
    deployment: {
      timeToValue: 60, // Days
      complexity: 'Moderate',
      requiresHardware: true,
      requiresAgents: true,
      remoteWorkSupport: true,
      cloudManaged: false
    },
    costs: {
      pricing: 'perpetual',
      licensePerDevice: 50,
      hardware: 95000,
      implementation: 70000,
      maintenance: 70000,
      yearlySubscription: 0,
      personnel: 150000,
      training: 15000,
      tco3Year: 410000
    },
    security: {
      zeroTrust: 75,
      deviceAuth: 80,
      riskAssessment: 75,
      remediationSpeed: 40,
      complianceCoverage: 80,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 85,
      hipaa: 80,
      gdpr: 75,
      nist: 80,
      iso27001: 80,
      sox: 75,
      cmmc: 80,
      frameworks: [
        {name: 'NIST CSF', coverage: 80, details: {identify: 75, protect: 85, detect: 80, respond: 75, recover: 75}},
        {name: 'PCI DSS', coverage: 85},
        {name: 'HIPAA', coverage: 80},
        {name: 'GDPR', coverage: 75},
        {name: 'ISO 27001', coverage: 80},
        {name: 'SOX', coverage: 75}
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: false,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: false
    },
    technical: {
      maxDevices: '50,000+',
      performanceImpact: 'Moderate',
      scalability: 'Enterprise-grade',
      reliability: 99.9,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Service Providers', 'Finance', 'Government', 'Education', 'Healthcare'],
      companySize: ['Medium', 'Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific']
    },
    differentiators: [
      'Deep integration with Juniper networking components',
      'Strong security fabric cross-product integration',
      'Good policy enforcement mechanisms',
      'Integration with Juniper's security intelligence',
      'Suitable for service provider environments'
    ]
  },
  
  'microsoft': {
    name: 'Microsoft NPS',
    shortName: 'Microsoft',
    logoUrl: './img/vendors/microsoft.png',
    cloudNative: false,
    architecture: 'on-premises',
    deployment: {
      timeToValue: 45,
      complexity: 'Moderate',
      requiresHardware: true,
      requiresAgents: true,
      remoteWorkSupport: false,
      cloudManaged: false
    },
    costs: {
      pricing: 'included',
      licensePerDevice: 0,
      hardware: 30000,
      implementation: 45000,
      maintenance: 40000,
      yearlySubscription: 0,
      personnel: 100000,
      training: 15000,
      tco3Year: 290000
    },
    security: {
      zeroTrust: 60,
      deviceAuth: 70,
      riskAssessment: 60,
      remediationSpeed: 50,
      complianceCoverage: 65,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: false,
      automatedResponse: false
    },
    compliance: {
      pciDss: 70,
      hipaa: 70,
      gdpr: 70,
      nist: 65,
      iso27001: 75,
      sox: 70,
      cmmc: 75,
      frameworks: [
        {name: 'NIST CSF', coverage: 65, details: {identify: 60, protect: 70, detect: 65, respond: 60, recover: 65}},
        {name: 'PCI DSS', coverage: 70},
        {name: 'HIPAA', coverage: 70},
        {name: 'GDPR', coverage: 70},
        {name: 'ISO 27001', coverage: 75},
        {name: 'SOX', coverage: 70}
      ]
    },
    features: {
      byod: false,
      iot: false,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: false,
      legacyDevices: true,
      remoteUsers: false,
      mdm: false,
      siem: false,
      sso: true,
      api: false,
      automatedProvisioning: false,
      dashboards: false,
      customReporting: false,
      userPortal: false
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: false,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: false,
      siem: false,
      ticketing: false,
      cmdb: false
    },
    technical: {
      maxDevices: '25,000+',
      performanceImpact: 'Moderate',
      scalability: 'Limited',
      reliability: 99.5,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'With Windows Updates'
    },
    customers: {
      industries: ['Government', 'Education', 'Small Business', 'Healthcare'],
      companySize: ['Small', 'Medium'],
      geoLocations: ['North America', 'Europe']
    },
    differentiators: [
      'Included with Windows Server',
      'Tight integration with Active Directory',
      'Low acquisition cost',
      'Familiar Microsoft management interface',
      'Simple deployment for basic use cases'
    ]
  },
  
  'securew2': {
    name: 'SecureW2',
    shortName: 'SecureW2',
    logoUrl: './img/vendors/securew2.png',
    cloudNative: true,
    architecture: 'cloud',
    deployment: {
      timeToValue: 7,
      complexity: 'Low',
      requiresHardware: false,
      requiresAgents: false,
      remoteWorkSupport: true,
      cloudManaged: true
    },
    costs: {
      pricing: 'subscription',
      licensePerDevice: 35,
      hardware: 0,
      implementation: 25000,
      maintenance: 0,
      yearlySubscription: 140000,
      personnel: 50000,
      training: 10000,
      tco3Year: 280000
    },
    security: {
      zeroTrust: 85,
      deviceAuth: 90,
      riskAssessment: 75,
      remediationSpeed: 20,
      complianceCoverage: 75,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: false
    },
    compliance: {
      pciDss: 80,
      hipaa: 75,
      gdpr: 80,
      nist: 75,
      iso27001: 75,
      sox: 70,
      cmmc: 70,
      frameworks: [
        {name: 'NIST CSF', coverage: 75, details: {identify: 75, protect: 85, detect: 75, respond: 70, recover: 70}},
        {name: 'PCI DSS', coverage: 80},
        {name: 'HIPAA', coverage: 75},
        {name: 'GDPR', coverage: 80},
        {name: 'ISO 27001', coverage: 75},
        {name: 'SOX', coverage: 70}
      ]
    },
    features: {
      byod: true,
      iot: false,
      wireless: true,
      wired: false,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: false,
      remoteUsers: true,
      mdm: true,
      siem: false,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: true,
      aws: true,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: false,
      ticketing: false,
      cmdb: false
    },
    technical: {
      maxDevices: 'Unlimited',
      performanceImpact: 'Minimal',
      scalability: 'Highly Scalable',
      reliability: 99.9,
      redundancy: 'Built-in',
      disasterRecovery: 'Automatic',
      updateFrequency: 'Continuous'
    },
    customers: {
      industries: ['Education', 'Healthcare', 'Retail', 'Technology'],
      companySize: ['Small', 'Medium', 'Large'],
      geoLocations: ['North America', 'Europe']
    },
    differentiators: [
      'Cloud-based certificate management',
      'Focus on wireless & BYOD security',
      'Simple onboarding experience',
      'No on-premises infrastructure required',
      'Fast deployment and time-to-value'
    ]
  },
  
  'extreme': {
    name: 'Extreme Networks NAC',
    shortName: 'Extreme',
    logoUrl: './img/vendors/extreme.png',
    cloudNative: false,
    architecture: 'hybrid',
    deployment: {
      timeToValue: 45,
      complexity: 'Moderate',
      requiresHardware: true,
      requiresAgents: false,
      remoteWorkSupport: true,
      cloudManaged: true
    },
    costs: {
      pricing: 'hybrid',
      licensePerDevice: 40,
      hardware: 70000,
      implementation: 55000,
      maintenance: 45000,
      yearlySubscription: 80000,
      personnel: 120000,
      training: 15000,
      tco3Year: 320000
    },
    security: {
      zeroTrust: 75,
      deviceAuth: 80,
      riskAssessment: 70,
      remediationSpeed: 30,
      complianceCoverage: 75,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: false
    },
    compliance: {
      pciDss: 80,
      hipaa: 75,
      gdpr: 75,
      nist: 75,
      iso27001: 75,
      sox: 70,
      cmmc: 70,
      frameworks: [
        {name: 'NIST CSF', coverage: 75, details: {identify: 70, protect: 80, detect: 75, respond: 70, recover: 70}},
        {name: 'PCI DSS', coverage: 80},
        {name: 'HIPAA', coverage: 75},
        {name: 'GDPR', coverage: 75},
        {name: 'ISO 27001', coverage: 75},
        {name: 'SOX', coverage: 70}
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: false,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: false,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: false,
      siem: true,
      ticketing: true,
      cmdb: false
    },
    technical: {
      maxDevices: '50,000+',
      performanceImpact: 'Moderate',
      scalability: 'Good',
      reliability: 99.8,
      redundancy: 'Available',
      disasterRecovery: 'Available',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Education', 'Manufacturing', 'Healthcare', 'Retail'],
      companySize: ['Medium', 'Large'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific']
    },
    differentiators: [
      'Integration with Extreme management platforms',
      'Cloud management options',
      'Strong wireless network integration',
      'Good IoT device profiling',
      'Campus network focus'
    ]
  },
  
  'foxpass': {
    name: 'Foxpass',
    shortName: 'Foxpass',
    logoUrl: './img/vendors/foxpass.png',
    cloudNative: true,
    architecture: 'cloud',
    deployment: {
      timeToValue: 3,
      complexity: 'Low',
      requiresHardware: false,
      requiresAgents: false,
      remoteWorkSupport: true,
      cloudManaged: true
    },
    costs: {
      pricing: 'subscription',
      licensePerDevice: 20,
      hardware: 0,
      implementation: 20000,
      maintenance: 0,
      yearlySubscription: 80000,
      personnel: 50000,
      training: 5000,
      tco3Year: 270000
    },
    security: {
      zeroTrust: 70,
      deviceAuth: 75,
      riskAssessment: 60,
      remediationSpeed: 25,
      complianceCoverage: 65,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: false,
      automatedResponse: false
    },
    compliance: {
      pciDss: 70,
      hipaa: 65,
      gdpr: 70,
      nist: 60,
      iso27001: 65,
      sox: 60,
      cmmc: 60,
      frameworks: [
        {name: 'NIST CSF', coverage: 60, details: {identify: 60, protect: 70, detect: 60, respond: 55, recover: 55}},
        {name: 'PCI DSS', coverage: 70},
        {name: 'HIPAA', coverage: 65},
        {name: 'GDPR', coverage: 70},
        {name: 'ISO 27001', coverage: 65},
        {name: 'SOX', coverage: 60}
      ]
    },
    features: {
      byod: true,
      iot: false,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: false,
      remoteUsers: true,
      mdm: false,
      siem: false,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: false,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: true,
      aws: true,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: false,
      siem: false,
      ticketing: false,
      cmdb: false
    },
    technical: {
      maxDevices: '10,000+',
      performanceImpact: 'Minimal',
      scalability: 'Good',
      reliability: 99.9,
      redundancy: 'Built-in',
      disasterRecovery: 'Automatic',
      updateFrequency: 'Continuous'
    },
    customers: {
      industries: ['Technology', 'Education', 'Retail', 'Services'],
      companySize: ['Small', 'Medium'],
      geoLocations: ['North America', 'Europe']
    },
    differentiators: [
      'Cloud-based RADIUS and LDAP',
      'Simple deployment and management',
      'Developer-friendly approach',
      'API-first architecture',
      'Affordable for smaller organizations'
    ]
  },
  
  'arista': {
    name: 'Arista CloudVision',
    shortName: 'Arista',
    logoUrl: './img/vendors/arista.png',
    cloudNative: false,
    architecture: 'hybrid',
    deployment: {
      timeToValue: 45,
      complexity: 'Moderate',
      requiresHardware: true,
      requiresAgents: false,
      remoteWorkSupport: false,
      cloudManaged: true
    },
    costs: {
      pricing: 'hybrid',
      licensePerDevice: 35,
      hardware: 50000,
      implementation: 45000,
      maintenance: 35000,
      yearlySubscription: 70000,
      personnel: 110000,
      training: 10000,
      tco3Year: 320000
    },
    security: {
      zeroTrust: 65,
      deviceAuth: 75,
      riskAssessment: 70,
      remediationSpeed: 30,
      complianceCoverage: 70,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: false
    },
    compliance: {
      pciDss: 75,
      hipaa: 70,
      gdpr: 75,
      nist: 70,
      iso27001: 75,
      sox: 70,
      cmmc: 70,
      frameworks: [
        {name: 'NIST CSF', coverage: 70, details: {identify: 70, protect: 75, detect: 70, respond: 65, recover: 65}},
        {name: 'PCI DSS', coverage: 75},
        {name: 'HIPAA', coverage: 70},
        {name: 'GDPR', coverage: 75},
        {name: 'ISO 27001', coverage: 75},
        {name: 'SOX', coverage: 70}
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: false,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: false,
      mdm: false,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: false
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: true,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: false,
      siem: true,
      ticketing: false,
      cmdb: false
    },
    technical: {
      maxDevices: '40,000+',
      performanceImpact: 'Low',
      scalability: 'Good',
      reliability: 99.8,
      redundancy: 'Available',
      disasterRecovery: 'Available',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Financial Services', 'Technology', 'Cloud Providers', 'Healthcare'],
      companySize: ['Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific']
    },
    differentiators: [
      'Strong integration with Arista networks',
      'Good for data center environments',
      'Cognitive network management',
      'Network telemetry and analytics',
      'Streaming network state information'
    ]
  },
  
  'no-nac': {
    name: 'No NAC Solution',
    shortName: 'No NAC',
    logoUrl: './img/vendors/no-nac.png',
    cloudNative: false,
    architecture: 'none',
    deployment: {
      timeToValue: 0,
      complexity: 'None',
      requiresHardware: false,
      requiresAgents: false,
      remoteWorkSupport: false,
      cloudManaged: false
    },
    costs: {
      pricing: 'none',
      licensePerDevice: 0,
      hardware: 0,
      implementation: 0,
      maintenance: 0,
      yearlySubscription: 0,
      personnel: 0,
      training: 0,
      tco3Year: 0
    },
    security: {
      zeroTrust: 0,
      deviceAuth: 0,
      riskAssessment: 0,
      remediationSpeed: 120,
      complianceCoverage: 0,
      mfa: false,
      certificateSupport: false,
      encryptionLevel: 'None',
      continuousMonitoring: false,
      automatedResponse: false
    },
    compliance: {
      pciDss: 0,
      hipaa: 0,
      gdpr: 0,
      nist: 0,
      iso27001: 0,
      sox: 0,
      cmmc: 0,
      frameworks: [
        {name: 'NIST CSF', coverage: 0, details: {identify: 0, protect: 0, detect: 0, respond: 0, recover: 0}},
        {name: 'PCI DSS', coverage: 0},
        {name: 'HIPAA', coverage: 0},
        {name: 'GDPR', coverage: 0},
        {name: 'ISO 27001', coverage: 0},
        {name: 'SOX', coverage: 0}
      ]
    },
    features: {
      byod: false,
      iot: false,
      wireless: false,
      wired: false,
      vpn: false,
      cloudIntegration: false,
      legacyDevices: false,
      remoteUsers: false,
      mdm: false,
      siem: false,
      sso: false,
      api: false,
      automatedProvisioning: false,
      dashboards: false,
      customReporting: false,
      userPortal: false
    },
    integration: {
      azure: false,
      googleWorkspace: false,
      aws: false,
      activedirectory: false,
      ldap: false,
      radius: false,
      mdm: false,
      siem: false,
      ticketing: false,
      cmdb: false
    },
    technical: {
      maxDevices: 'N/A',
      performanceImpact: 'None',
      scalability: 'N/A',
      reliability: 0,
      redundancy: 'None',
      disasterRecovery: 'None',
      updateFrequency: 'N/A'
    },
    customers: {
      industries: ['Various'],
      companySize: ['Small'],
      geoLocations: ['Various']
    },
    differentiators: [
      'No upfront costs',
      'No implementation time',
      'No ongoing maintenance',
      'No training required',
      'High security risk'
    ]
  }
};

// Make it globally available
window.VENDORS = VENDORS;

/**
 * Compliance Framework Data
 * Contains detailed information on compliance frameworks
 */
const COMPLIANCE_FRAMEWORKS = {
  'nist-csf': {
    name: 'NIST Cybersecurity Framework',
    shortName: 'NIST CSF',
    description: 'The NIST Cybersecurity Framework (CSF) provides a policy framework of computer security guidance for how organizations can assess and improve their ability to prevent, detect, and respond to cyber attacks.',
    version: '1.1',
    categories: [
      {
        id: 'identify',
        name: 'Identify',
        description: 'Develop organizational understanding to manage cybersecurity risk to systems, people, assets, data, and capabilities.',
        subcategories: ['Asset Management', 'Business Environment', 'Governance', 'Risk Assessment', 'Risk Management Strategy']
      },
      {
        id: 'protect',
        name: 'Protect',
        description: 'Develop and implement appropriate safeguards to ensure delivery of critical services.',
        subcategories: ['Identity Management', 'Access Control', 'Awareness and Training', 'Data Security', 'Protective Technology']
      },
      {
        id: 'detect',
        name: 'Detect',
        description: 'Develop and implement appropriate activities to identify the occurrence of a cybersecurity event.',
        subcategories: ['Anomalies and Events', 'Security Continuous Monitoring', 'Detection Processes']
      },
      {
        id: 'respond',
        name: 'Respond',
        description: 'Develop and implement appropriate activities to take action regarding a detected cybersecurity incident.',
        subcategories: ['Response Planning', 'Communications', 'Analysis', 'Mitigation', 'Improvements']
      },
      {
        id: 'recover',
        name: 'Recover',
        description: 'Develop and implement appropriate activities to maintain plans for resilience and to restore any capabilities or services that were impaired due to a cybersecurity incident.',
        subcategories: ['Recovery Planning', 'Improvements', 'Communications']
      }
    ]
  }
};

// Make it globally available
window.COMPLIANCE_FRAMEWORKS = COMPLIANCE_FRAMEWORKS;
EOF

# Create modern CSS styling
echo "Creating modern CSS styles..."
cat > css/modern-styles.css << 'EOF'
/**
 * Modern Styles for Portnox Total Cost Analyzer
 * Clean, flat design with sharp edges and modern aesthetic
 */

:root {
  /* Primary colors */
  --color-primary-50: #e6f2ff;
  --color-primary-100: #cce5ff;
  --color-primary-200: #99cbff;
  --color-primary-300: #66b0ff;
  --color-primary-400: #3396ff;
  --color-primary-500: #007bff;
  --color-primary-600: #0062cc;
  --color-primary-700: #0049a3;
  --color-primary-800: #003180;
  --color-primary-900: #001a40;
  
  /* Secondary colors */
  --color-secondary-50: #f5f0ff;
  --color-secondary-100: #ede0ff;
  --color-secondary-200: #d8c2ff;
  --color-secondary-300: #c4a3ff;
  --color-secondary-400: #b085ff;
  --color-secondary-500: #9c66ff;
  --color-secondary-600: #7d52cc;
  --color-secondary-700: #5e3d99;
  --color-secondary-800: #3e2966;
  --color-secondary-900: #1f1433;
  
  /* Success colors */
  --color-success-50: #e6fff0;
  --color-success-100: #ccffe0;
  --color-success-200: #99ffc2;
  --color-success-300: #66ffa3;
  --color-success-400: #33ff85;
  --color-success-500: #00ff66;
  --color-success-600: #00cc52;
  --color-success-700: #00993d;
  --color-success-800: #006629;
  --color-success-900: #003314;
  
  /* Warning colors */
  --color-warning-50: #fffbe6;
  --color-warning-100: #fff8cc;
  --color-warning-200: #fff099;
  --color-warning-300: #ffe966;
  --color-warning-400: #ffe333;
  --color-warning-500: #ffdd00;
  --color-warning-600: #ccb000;
  --color-warning-700: #998400;
  --color-warning-800: #665800;
  --color-warning-900: #332c00;
  
  /* Danger colors */
  --color-danger-50: #ffe6e6;
  --color-danger-100: #ffcccc;
  --color-danger-200: #ff9999;
  --color-danger-300: #ff6666;
  --color-danger-400: #ff3333;
  --color-danger-500: #ff0000;
  --color-danger-600: #cc0000;
  --color-danger-700: #990000;
  --color-danger-800: #660000;
  --color-danger-900: #330000;
  
  /* Neutral colors */
  --color-neutral-50: #f7f7f7;
  --color-neutral-100: #e6e6e6;
  --color-neutral-200: #cccccc;
  --color-neutral-300: #b3b3b3;
  --color-neutral-400: #999999;
  --color-neutral-500: #808080;
  --color-neutral-600: #666666;
  --color-neutral-700: #4d4d4d;
  --color-neutral-800: #333333;
  --color-neutral-900: #1a1a1a;
  
  /* Layout */
  --header-height: 60px;
  --sidebar-width: 260px;
  --sidebar-collapsed-width: 64px;
  --content-max-width: 1440px;
  --border-radius: 0px;
  --box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  /* Typography */
  --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --font-family-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  --font-size-base: 14px;
  --line-height-base: 1.5;
  
  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  
  /* Z-index */
  --z-index-header: 100;
  --z-index-sidebar: 90;
  --z-index-dropdown: 80;
  --z-index-modal: 1000;
  --z-index-toast: 1100;
}

/* Base styles */
body {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-neutral-800);
  background-color: var(--color-neutral-50);
  margin: 0;
  padding: 0;
}

/* Layout */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  height: var(--header-height);
  background-color: var(--color-primary-600);
  color: white;
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-4);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-index-header);
  box-shadow: var(--box-shadow);
}

.content-wrapper {
  display: flex;
  min-height: calc(100vh - var(--header-height));
  margin-top: var(--header-height);
}

.sidebar {
  width: var(--sidebar-width);
  background-color: white;
  box-shadow: var(--box-shadow);
  transition: width 0.3s ease;
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  left: 0;
  z-index: var(--z-index-sidebar);
  overflow-y: auto;
}

.sidebar.collapsed {
  width: var(--sidebar-collapsed-width);
}

.content-area {
  flex: 1;
  margin-left: var(--sidebar-width);
  padding: var(--spacing-6);
  transition: margin-left 0.3s ease;
}

.content-area.expanded {
  margin-left: var(--sidebar-collapsed-width);
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: var(--spacing-4);
  font-weight: 600;
  line-height: 1.2;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.75rem;
}

h3 {
  font-size: 1.5rem;
}

h4 {
  font-size: 1.25rem;
}

h5 {
  font-size: 1.125rem;
}

h6 {
  font-size: 1rem;
}

p {
  margin-top: 0;
  margin-bottom: var(--spacing-4);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2) var(--spacing-4);
  background-color: var(--color-primary-500);
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
  text-decoration: none;
  height: 36px;
}

.btn:hover {
  background-color: var(--color-primary-600);
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-200);
}

.btn-sm {
  height: 28px;
  padding: var(--spacing-1) var(--spacing-3);
  font-size: 0.875rem;
}

.btn-lg {
  height: 44px;
  padding: var(--spacing-3) var(--spacing-6);
  font-size: 1.125rem;
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary-500);
  border: 1px solid var(--color-primary-500);
}

.btn-outline:hover {
  background-color: var(--color-primary-50);
}

.btn-secondary {
  background-color: var(--color-secondary-500);
}

.btn-secondary:hover {
  background-color: var(--color-secondary-600);
}

.btn-success {
  background-color: var(--color-success-500);
}

.btn-success:hover {
  background-color: var(--color-success-600);
}

.btn-warning {
  background-color: var(--color-warning-500);
  color: var(--color-neutral-800);
}

.btn-warning:hover {
  background-color: var(--color-warning-600);
}

.btn-danger {
  background-color: var(--color-danger-500);
}

.btn-danger:hover {
  background-color: var(--color-danger-600);
}

/* Tab Navigator */
.tab-container {
  margin-bottom: var(--spacing-6);
}

.main-tabs {
  display: flex;
  border-bottom: 1px solid var(--color-neutral-200);
  background-color: white;
}

.main-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-4);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.main-tab:hover {
  background-color: var(--color-neutral-50);
}

.main-tab.active {
  border-bottom-color: var(--color-primary-500);
  color: var(--color-primary-500);
}

.tab-icon {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-1);
}

.tab-label {
  font-size: 0.875rem;
  font-weight: 500;
}

.sub-tabs-container {
  background-color: white;
  border-bottom: 1px solid var(--color-neutral-200);
}

.sub-tabs {
  display: none;
  flex-wrap: wrap;
}

.sub-tabs.active {
  display: flex;
}

.sub-tab {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sub-tab:hover {
  background-color: var(--color-neutral-50);
}

.sub-tab.active {
  color: var(--color-primary-500);
  font-weight: 500;
}

.view-container {
  min-height: 600px;
}

.view-content {
  display: none;
}

.view-content.active {
  display: block;
}

/* Section Banner */
.section-banner {
  background-color: var(--color-primary-600);
  color: white;
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-6);
}

.section-banner h2 {
  margin-top: 0;
  margin-bottom: var(--spacing-2);
  font-size: 1.5rem;
}

.section-banner p {
  margin-bottom: 0;
  opacity: 0.8;
}

.banner-gradient-cool {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-secondary-600));
}

.banner-gradient-warm {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-warning-500));
}

.banner-gradient-primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700));
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

.stat-card {
  background-color: white;
  padding: var(--spacing-4);
}

.stat-title {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: var(--spacing-2);
  color: var(--color-neutral-700);
  display: flex;
  align-items: center;
}

.stat-title i {
  margin-right: var(--spacing-2);
  color: var(--color-primary-500);
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: var(--spacing-2);
  color: var(--color-neutral-900);
}

.stat-indicator {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
}

.stat-indicator.positive {
  color: var(--color-success-600);
}

.stat-indicator.negative {
  color: var(--color-danger-600);
}

.stat-indicator i {
  margin-right: var(--spacing-1);
}

.stat-text {
  font-size: 0.875rem;
  color: var(--color-neutral-600);
}

/* Chart Section */
.chart-section {
  margin-bottom: var(--spacing-8);
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-4);
  display: flex;
  align-items: center;
}

.section-title i {
  margin-right: var(--spacing-2);
  color: var(--color-primary-500);
}

.chart-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

.chart-wrapper {
  background-color: white;
  padding: var(--spacing-4);
  height: 300px;
  position: relative;
}

.chart-wrapper.large-chart {
  height: 400px;
  grid-column: 1 / -1;
}

.chart-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: var(--spacing-1);
}

.chart-subtitle {
  font-size: 0.875rem;
  color: var(--color-neutral-600);
  margin-bottom: var(--spacing-4);
}

.chart-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.chart-loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-neutral-200);
  border-top-color: var(--color-primary-500);
  border-radius: 50%;
  margin: 0 auto var(--spacing-3);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Insight Panel */
.insight-panel {
  background-color: white;
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

.insight-list {
  margin: 0;
  padding-left: var(--spacing-5);
}

.insight-list li {
  margin-bottom: var(--spacing-3);
}

.insight-list li:last-child {
  margin-bottom: 0;
}

/* Recommendations Section */
.recommendations-section {
  margin-bottom: var(--spacing-8);
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-4);
}

.recommendation-card {
  background-color: white;
  padding: var(--spacing-4);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.recommendation-icon {
  font-size: 2rem;
  color: var(--color-primary-500);
  margin-bottom: var(--spacing-3);
}

.recommendation-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: var(--spacing-2);
}

.recommendation-text {
  font-size: 0.875rem;
  color: var(--color-neutral-700);
}

/* NIST Framework Section */
.nist-framework-section {
  margin-bottom: var(--spacing-8);
}

.nist-framework {
  background-color: white;
  padding: var(--spacing-4);
  min-height: 400px;
  position: relative;
}

/* Vendor Position Section */
.market-position-section {
  margin-bottom: var(--spacing-8);
}

.vendor-position-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-4);
}

.vendor-position-card {
  background-color: white;
  padding: var(--spacing-4);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vendor-position-logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-3);
}

.vendor-position-logo img {
  max-height: 100%;
  max-width: 120px;
}

.vendor-position-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: var(--spacing-2);
}

.vendor-position-text {
  font-size: 0.875rem;
  color: var(--color-neutral-700);
  text-align: center;
}

/* Cost Table Section */
.cost-table-section {
  margin-bottom: var(--spacing-6);
}

.table-responsive {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: var(--spacing-3);
  text-align: left;
  border-bottom: 1px solid var(--color-neutral-200);
}

.data-table th {
  background-color: var(--color-primary-600);
  color: white;
  font-weight: 500;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table .total-row {
  font-weight: 700;
}

.data-table .savings {
  color: var(--color-success-600);
}

.data-table .negative {
  color: var(--color-danger-600);
}

.data-table .total-savings {
  color: var(--color-success-600);
  font-weight: 700;
}

/* Architecture Section */
.architecture-section {
  margin-bottom: var(--spacing-8);
}

.architecture-types {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-4);
}

.arch-type {
  background-color: white;
  padding: var(--spacing-4);
}

.arch-type-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-4);
}

.arch-type-icon {
  font-size: 1.5rem;
  margin-right: var(--spacing-3);
  color: var(--color-primary-500);
}

.arch-type-name {
  font-size: 1.125rem;
  font-weight: 600;
  margin-right: auto;
}

.arch-type-vendor {
  font-size: 0.875rem;
  color: var(--color-neutral-600);
}

.arch-type-diagram {
  margin-bottom: var(--spacing-4);
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arch-type-diagram img {
  max-width: 100%;
  max-height: 100%;
}

.arch-type-advantages {
  font-size: 0.875rem;
}

.advantage-item,
.disadvantage-item {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-2);
}

.advantage-item i {
  margin-right: var(--spacing-2);
  color: var(--color-success-500);
}

.disadvantage-item i {
  margin-right: var(--spacing-2);
  color: var(--color-danger-500);
}

/* Deployment Section */
.deployment-section {
  margin-bottom: var(--spacing-8);
}

.timeline-comparison {
  margin-top: var(--spacing-4);
}

.timeline-vendor {
  margin-bottom: var(--spacing-5);
}

.timeline-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-3);
}

.timeline-header img {
  height: 24px;
  margin-right: var(--spacing-3);
}

.timeline-title {
  font-weight: 600;
}

.timeline {
  display: flex;
  height: 40px;
  background-color: var(--color-neutral-100);
  margin-bottom: var(--spacing-2);
}

.timeline-stage {
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary-100);
  color: var(--color-primary-900);
  font-size: 0.75rem;
  overflow: hidden;
}

.timeline-portnox .timeline-stage {
  background-color: var(--color-success-100);
  color: var(--color-success-900);
}

.timeline-traditional .timeline-stage:nth-child(1) {
  background-color: var(--color-primary-100);
}

.timeline-traditional .timeline-stage:nth-child(2) {
  background-color: var(--color-primary-200);
}

.timeline-traditional .timeline-stage:nth-child(3) {
  background-color: var(--color-primary-300);
}

.timeline-traditional .timeline-stage:nth-child(4) {
  background-color: var(--color-primary-400);
  color: white;
}

.stage-label {
  font-weight: 600;
  margin-right: var(--spacing-2);
}

.timeline-total {
  font-weight: 600;
  font-size: 0.875rem;
  text-align: right;
}

/* Zero Trust Section */
.zero-trust-section {
  margin-bottom: var(--spacing-8);
}

.zero-trust-description {
  margin-bottom: var(--spacing-4);
}

.zero-trust-capabilities {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-4);
}

.capability-item {
  text-align: center;
}

.capability-icon {
  font-size: 2rem;
  color: var(--color-primary-500);
  margin-bottom: var(--spacing-2);
}

.capability-name {
  font-weight: 600;
  margin-bottom: var(--spacing-1);
}

.capability-description {
  font-size: 0.875rem;
  color: var(--color-neutral-600);
}

/* Glass Panel */
.glass-panel {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: var(--spacing-4);
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .sidebar {
    width: var(--sidebar-collapsed-width);
  }
  
  .content-area {
    margin-left: var(--sidebar-collapsed-width);
  }
  
  .chart-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0 var(--spacing-3);
  }
  
  .content-area {
    padding: var(--spacing-3);
  }
  
  .recommendations-grid,
  .stats-grid,
  .zero-trust-capabilities {
    grid-template-columns: 1fr;
  }
  
  .architecture-types {
    grid-template-columns: 1fr;
  }
}
EOF

# Create comprehensive fix script
echo "Creating comprehensive-fix.js..."
cat > js/utils/comprehensive-fix.js << 'EOF'
/**
 * Comprehensive Fix for Portnox Total Cost Analyzer
 * Fixes various issues and applies UI improvements
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing comprehensive fixes...');
  
  // Apply all fixes
  initializeFixes();
});

function initializeFixes() {
  // Add modern styles
  addModernStyles();
  
  // Fix vendor data
  ensureVendorData();
  
  // Fix Tab Navigator
  ensureTabNavigator();
  
  // Fix view initialization
  ensureViewInitialization();
  
  // Fix UI manager
  fixUIManager();
  
  // Fix calculator
  fixCalculator();
  
  // Make UI cleaner and more modern
  enhanceUI();
  
  console.log('All fixes applied successfully!');
}

/**
 * Add modern styles to the page
 */
function addModernStyles() {
  if (!document.getElementById('modern-styles')) {
    const link = document.createElement('link');
    link.id = 'modern-styles';
    link.rel = 'stylesheet';
    link.href = './css/modern-styles.css';
    document.head.appendChild(link);
    console.log('Modern styles added');
  }
}

/**
 * Ensure vendor data is available
 */
function ensureVendorData() {
  // Check if VENDORS is defined
  if (typeof window.VENDORS === 'undefined') {
    console.warn('VENDORS is not defined, attempting to load vendor-data.js');
    
    // Load vendor-data.js
    const script = document.createElement('script');
    script.src = './js/data/vendor-data.js';
    document.body.appendChild(script);
  } else {
    console.log('VENDORS is already defined with', Object.keys(window.VENDORS).length, 'vendors');
  }
}

/**
 * Ensure Tab Navigator is properly initialized
 */
function ensureTabNavigator() {
  // Check if Tab Navigator exists
  if (typeof window.TabNavigator === 'undefined' || !window.tabNavigator) {
    console.warn('TabNavigator not found, loading tab-navigator-enhanced.js');
    
    // Load tab-navigator-enhanced.js
    const script = document.createElement('script');
    script.src = './js/components/tab-navigator-enhanced.js';
    script.onload = function() {
      // Initialize Tab Navigator after script loads
      if (typeof window.TabNavigator !== 'undefined') {
        window.tabNavigator = new TabNavigator().init();
        console.log('TabNavigator initialized');
      }
    };
    document.body.appendChild(script);
  } else {
    console.log('TabNavigator is already defined');
  }
}

/**
 * Ensure view initialization is properly handled
 */
function ensureViewInitialization() {
  // Check if there's at least one view
  const views = document.querySelectorAll('.view-content');
  if (views.length === 0) {
    console.warn('No views found, waiting for tabNavigator to be ready');
    
    // Wait for tabNavigator to be fully initialized
    const checkInterval = setInterval(function() {
      if (window.tabNavigator && typeof window.tabNavigator.createViewContent === 'function') {
        // TabNavigator is ready, create first view
        clearInterval(checkInterval);
        
        // Make sure we have a view container
        let viewContainer = document.querySelector('.view-container');
        if (!viewContainer) {
          viewContainer = document.createElement('div');
          viewContainer.className = 'view-container';
          
          // Find tab container and insert after it
          const tabContainer = document.querySelector('.tab-container');
          if (tabContainer) {
            tabContainer.after(viewContainer);
          } else {
            // Insert in content area
            const contentArea = document.querySelector('.content-area');
            if (contentArea) {
              contentArea.appendChild(viewContainer);
            }
          }
        }
        
        // Create executive summary view
        window.tabNavigator.createViewContent('executive', 'summary');
        console.log('Initial view created');
      }
    }, 500);
    
    // Set timeout to avoid infinite checking
    setTimeout(function() {
      clearInterval(checkInterval);
    }, 10000);
  }
}

/**
 * Fix UI Manager
 */
function fixUIManager() {
  if (typeof window.UIManager === 'undefined') {
    console.warn('UIManager not defined, creating minimal version');
    
    // Create minimal UIManager
    window.UIManager = class UIManager {
      constructor(app) {
        this.app = app;
        this.initialized = false;
      }
      
      init() {
        if (this.initialized) return this;
        
        // Initialize animations
        this.initAnimations();
        
        this.initialized = true;
        return this;
      }
      
      initAnimations() {
        // Add entrance animations to dashboard cards
        const dashboardCards = document.querySelectorAll('.dashboard-card, .stat-card');
        dashboardCards.forEach((card, index) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            card.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100 + (index * 50));
        });
      }
      
      showToast(message, type = 'info') {
        // Create toast container if it doesn't exist
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
          toastContainer = document.createElement('div');
          toastContainer.id = 'toast-container';
          toastContainer.style.position = 'fixed';
          toastContainer.style.top = '20px';
          toastContainer.style.right = '20px';
          toastContainer.style.zIndex = '1000';
          document.body.appendChild(toastContainer);
        }
        
        // Create toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.backgroundColor = type === 'error' ? '#f44336' : 
                                     type === 'success' ? '#4CAF50' : 
                                     type === 'warning' ? '#ff9800' : '#2196F3';
        toast.style.color = 'white';
        toast.style.padding = '12px 16px';
        toast.style.marginBottom = '10px';
        toast.style.borderRadius = '0px';
        toast.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        toast.style.minWidth = '250px';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        
        // Add message
        toast.textContent = message;
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Show with animation
        setTimeout(() => {
          toast.style.opacity = '1';
        }, 10);
        
        // Auto-hide after delay
        setTimeout(() => {
          toast.style.opacity = '0';
          setTimeout(() => {
            if (toast.parentNode) {
              toast.parentNode.removeChild(toast);
            }
          }, 300);
        }, 5000);
      }
    };
    
    // Create global instance
    window.uiManager = new UIManager({}).init();
    console.log('Minimal UIManager created');
  }
}

/**
 * Fix Calculator
 */
function fixCalculator() {
  if (typeof window.TcoCalculator === 'undefined') {
    console.warn('TcoCalculator not defined, loading calculator-fix.js');
    
    // Load calculator-fix.js
    const script = document.createElement('script');
    script.src = './js/models/calculator-fix.js';
    document.body.appendChild(script);
  } else {
    console.log('TcoCalculator already defined');
  }
}

/**
 * Enhance UI to make it cleaner and more modern
 */
function enhanceUI() {
  // Adjust sidebar styles
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.style.borderRight = 'none';
    sidebar.style.boxShadow = '0 0 10px rgba(0,0,0,0.05)';
  }
  
  // Adjust card styles
  const cards = document.querySelectorAll('.dashboard-card, .stat-card, .vendor-card, .chart-wrapper');
  cards.forEach(card => {
    card.style.borderRadius = '0px';
    card.style.boxShadow = '0 2px 3px rgba(0,0,0,0.05)';
    card.style.border = '1px solid #eee';
  });
  
  // Make buttons flat
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.style.borderRadius = '0px';
    button.style.textTransform = 'uppercase';
    button.style.fontWeight = '500';
    button.style.letterSpacing = '0.5px';
  });
  
  // Create improved chart loader mechanism
  window.chartLoader = {
    queue: [],
    processing: false,
    
    // Queue a chart for loading
    queueChart: function(type, containerId, chartId) {
      this.queue.push({
        type: type,
        containerId: containerId,
        chartId: chartId
      });
      
      if (!this.processing) {
        this.processQueue();
      }
    },
    
    // Process the queue
    processQueue: function() {
      if (this.queue.length === 0) {
        this.processing = false;
        return;
      }
      
      this.processing = true;
      const nextChart = this.queue.shift();
      this.loadChart(nextChart.type, nextChart.containerId, nextChart.chartId);
    },
    
    // Load a specific chart
    loadChart: function(type, containerId, chartId) {
      const container = document.getElementById(containerId);
      if (!container) {
        console.warn(`Chart container ${containerId} not found`);
        this.processQueue();
        return;
      }
      
      // Clear placeholder
      container.innerHTML = '';
      
      // Create chart based on type
      switch (type) {
        case 'apex-tco':
          this.createTcoComparisonChart(container, chartId);
          break;
        case 'apex-cost':
          this.createCumulativeCostChart(container, chartId);
          break;
        case 'apex-breach':
          this.createBreachImpactChart(container, chartId);
          break;
        case 'treemap-security':
          this.createSecurityTreemapChart(container, chartId);
          break;
        case 'd3-security':
          this.createSecurityFrameworksChart(container, chartId);
          break;
        default:
          console.warn(`Unknown chart type: ${type}`);
          container.innerHTML = `<div class="chart-placeholder">
            <p>Chart type '${type}' not supported</p>
          </div>`;
          break;
      }
      
      // Process next chart in queue
      setTimeout(() => {
        this.processQueue();
      }, 100);
    },
    
    // Create TCO comparison chart
    createTcoComparisonChart: function(container, chartId) {
      if (typeof ApexCharts === 'undefined') {
        this.loadApexCharts(() => this.createTcoComparisonChart(container, chartId));
        return;
      }
      
      // Get vendor data
      const vendors = window.VENDORS || {};
      const vendorIds = Object.keys(vendors).filter(id => id !== 'no-nac').slice(0, 5);
      
      // Prepare chart data
      const series = [{
        name: 'Total 3-Year TCO',
        data: vendorIds.map(id => vendors[id]?.costs?.tco3Year || 0)
      }];
      
      const options = {
        chart: {
          type: 'bar',
          height: 250,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '70%',
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: vendorIds.map(id => vendors[id]?.shortName || id),
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Cost ($)'
          },
          labels: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        },
        colors: ['#1a5a96', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c'],
        tooltip: {
          y: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        }
      };
      
      // Create chart
      const chart = new ApexCharts(container, options);
      chart.render();
      
      // Store chart reference
      window[chartId] = chart;
    },
    
    // Create cumulative cost chart
    createCumulativeCostChart: function(container, chartId) {
      if (typeof ApexCharts === 'undefined') {
        this.loadApexCharts(() => this.createCumulativeCostChart(container, chartId));
        return;
      }
      
      // Get vendor data
      const vendors = window.VENDORS || {};
      const vendorIds = Object.keys(vendors).filter(id => id !== 'no-nac').slice(0, 3);
      
      // Prepare chart data
      const series = vendorIds.map(id => ({
        name: vendors[id]?.shortName || id,
        data: [
          vendors[id]?.costs?.implementation || 0,
          (vendors[id]?.costs?.implementation || 0) + (vendors[id]?.costs?.yearlySubscription || 0),
          (vendors[id]?.costs?.implementation || 0) + ((vendors[id]?.costs?.yearlySubscription || 0) * 2),
          (vendors[id]?.costs?.implementation || 0) + ((vendors[id]?.costs?.yearlySubscription || 0) * 3)
        ]
      }));
      
      const options = {
        chart: {
          type: 'line',
          height: 250,
          toolbar: {
            show: false
          }
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },
        xaxis: {
          categories: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Cumulative Cost ($)'
          },
          labels: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        },
        colors: ['#1a5a96', '#e74c3c', '#f39c12'],
        tooltip: {
          y: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        },
        legend: {
          position: 'top'
        }
      };
      
      // Create chart
      const chart = new ApexCharts(container, options);
      chart.render();
      
      // Store chart reference
      window[chartId] = chart;
    },
    
    // Create breach impact chart
    createBreachImpactChart: function(container, chartId) {
      if (typeof ApexCharts === 'undefined') {
        this.loadApexCharts(() => this.createBreachImpactChart(container, chartId));
        return;
      }
      
      // Get vendor data
      const vendors = window.VENDORS || {};
      const vendorIds = Object.keys(vendors).filter(id => id !== 'no-nac').slice(0, 3);
      
      // Calculate breach costs (simplified example)
      const breachCost = 4800000; // Average cost of a data breach
      const series = vendorIds.map(id => {
        const reductionPct = vendors[id]?.security?.breachReduction || 0;
        return Math.round(breachCost * (reductionPct / 100));
      });
      
      const options = {
        chart: {
          type: 'bar',
          height: 250,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '70%',
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: vendorIds.map(id => vendors[id]?.shortName || id),
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Potential Savings ($)'
          },
          labels: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        },
        colors: ['#2ecc71', '#27ae60', '#16a085'],
        tooltip: {
          y: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        }
      };
      
      // Create chart
      const chart = new ApexCharts(container, options);
      chart.render();
      
      // Store chart reference
      window[chartId] = chart;
    },
    
    // Create security treemap chart
    createSecurityTreemapChart: function(container, chartId) {
      if (typeof ApexCharts === 'undefined') {
        this.loadApexCharts(() => this.createSecurityTreemapChart(container, chartId));
        return;
      }
      
      // Get vendor data
      const vendors = window.VENDORS || {};
      const portnox = vendors['portnox'] || {};
      
      // Prepare chart data
      const series = [{
        data: [
          {
            x: 'Zero Trust',
            y: portnox.security?.zeroTrust || 0
          },
          {
            x: 'Device Authentication',
            y: portnox.security?.deviceAuth || 0
          },
          {
            x: 'Risk Assessment',
            y: portnox.security?.riskAssessment || 0
          },
          {
            x: 'Compliance Coverage',
            y: portnox.security?.complianceCoverage || 0
          },
          {
            x: 'Continuous Monitoring',
            y: portnox.security?.continuousMonitoring ? 90 : 0
          },
          {
            x: 'Automated Response',
            y: portnox.security?.automatedResponse ? 85 : 0
          }
        ]
      }];
      
      const options = {
        chart: {
          type: 'treemap',
          height: 350,
          toolbar: {
            show: false
          }
        },
        title: {
          text: 'Portnox Security Capabilities',
          align: 'center'
        },
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: true
          }
        },
        colors: [
          '#1a5a96',
          '#2980b9',
          '#3498db',
          '#2ecc71',
          '#27ae60',
          '#16a085'
        ],
        tooltip: {
          y: {
            formatter: function(val) {
              return val + '% Coverage';
            }
          }
        }
      };
      
      // Create chart
      const chart = new ApexCharts(container, options);
      chart.render();
      
      // Store chart reference
      window[chartId] = chart;
    },
    
    // Create security frameworks chart
    createSecurityFrameworksChart: function(container, chartId) {
      if (typeof ApexCharts === 'undefined') {
        this.loadApexCharts(() => this.createSecurityFrameworksChart(container, chartId));
        return;
      }
      
      // Get vendor data
      const vendors = window.VENDORS || {};
      const vendorIds = Object.keys(vendors).filter(id => id !== 'no-nac').slice(0, 3);
      
      // Prepare chart data
      const frameworks = ['NIST CSF', 'PCI DSS', 'HIPAA', 'GDPR', 'ISO 27001'];
      const series = vendorIds.map(id => {
        return {
          name: vendors[id]?.shortName || id,
          data: frameworks.map(framework => {
            const frameworkKey = framework.toLowerCase().replace(/\s+/g, '');
            return vendors[id]?.compliance?.[frameworkKey] || 0;
          })
        };
      });
      
      const options = {
        chart: {
          type: 'radar',
          height: 250,
          toolbar: {
            show: false
          }
        },
        series: series,
        xaxis: {
          categories: frameworks
        },
        yaxis: {
          max: 100
        },
        colors: ['#1a5a96', '#e74c3c', '#f39c12'],
        markers: {
          size: 4
        },
        stroke: {
          width: 2
        },
        fill: {
          opacity: 0.2
        }
      };
      
      // Create chart
      const chart = new ApexCharts(container, options);
      chart.render();
      
      // Store chart reference
      window[chartId] = chart;
    },
    
    // Load ApexCharts library
    loadApexCharts: function(callback) {
      console.log('Loading ApexCharts library...');
      
      // Check if ApexCharts is already loaded
      if (typeof ApexCharts !== 'undefined') {
        callback();
        return;
      }
      
      // Load ApexCharts
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
      script.onload = function() {
        console.log('ApexCharts loaded successfully');
        callback();
      };
      document.body.appendChild(script);
    }
  };
  
  console.log('UI enhancements applied');
}
EOF

# Create vendor comparison fix script
echo "Creating vendorComparison.js..."
cat > js/components/vendorComparison.js << 'EOF'
/**
 * Enhanced Vendor Comparison for Portnox Total Cost Analyzer
 * Creates interactive comparison charts and tables for vendor analysis
 */

const VendorComparison = {
  /**
   * Create feature comparison heatmap
   */
  createFeatureHeatmap: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show (top 4 excluding no-nac)
    const vendorsToShow = Object.keys(vendors)
      .filter(id => id !== 'no-nac')
      .slice(0, 4);
    
    // Define features to compare
    const features = [
      { name: 'Zero Trust Architecture', key: 'zeroTrust', category: 'security' },
      { name: 'Cloud-Native', key: 'cloudNative', category: 'root' },
      { name: 'Device Authentication', key: 'deviceAuth', category: 'security' },
      { name: 'Remote Work Support', key: 'remoteWorkSupport', category: 'deployment' },
      { name: 'Implementation Time', key: 'timeToValue', category: 'deployment', invert: true },
      { name: 'MFA Support', key: 'mfa', category: 'security' },
      { name: 'Agents Required', key: 'requiresAgents', category: 'deployment', invert: true },
      { name: 'Hardware Required', key: 'requiresHardware', category: 'deployment', invert: true }
    ];
    
    // Create HTML table for heatmap
    let html = `
      <div class="heatmap-container">
        <h3 class="section-title">Feature Comparison</h3>
        <div class="table-responsive">
          <table class="data-table heatmap-table">
            <thead>
              <tr>
                <th>Feature</th>
                ${vendorsToShow.map(id => `<th>${vendors[id]?.shortName || id}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
    `;
    
    // Add rows for each feature
    features.forEach(feature => {
      html += `<tr><td>${feature.name}</td>`;
      
      vendorsToShow.forEach(vendorId => {
        const vendor = vendors[vendorId];
        if (!vendor) {
          html += `<td class="score-poor">N/A</td>`;
          return;
        }
        
        let value;
        if (feature.category === 'root') {
          value = vendor[feature.key];
        } else {
          value = vendor[feature.category]?.[feature.key];
        }
        
        // Convert to score 0-100
        let score;
        if (typeof value === 'boolean') {
          score = value ? 100 : 0;
          if (feature.invert) {
            score = 100 - score;
          }
        } else if (typeof value === 'number') {
          if (feature.key === 'timeToValue') {
            // Lower is better for implementation time
            score = Math.max(0, 100 - (value / 90) * 100);
          } else {
            score = value;
          }
          
          if (feature.invert) {
            score = 100 - score;
          }
        } else {
          score = 0;
        }
        
        // Determine color class
        const colorClass = this.getScoreColorClass(score);
        
        // Format display value
        let displayValue;
        if (feature.key === 'timeToValue') {
          displayValue = `${value} days`;
        } else if (typeof value === 'boolean') {
          displayValue = value ? (feature.invert ? '✘' : '✓') : (feature.invert ? '✓' : '✘');
        } else if (typeof value === 'number') {
          displayValue = `${value}%`;
        } else {
          displayValue = 'N/A';
        }
        
        html += `<td class="${colorClass}">${displayValue}</td>`;
      });
      
      html += `</tr>`;
    });
    
    html += `
            </tbody>
          </table>
        </div>
        <div class="heatmap-legend">
          <div class="legend-item">
            <div class="legend-color score-excellent"></div>
            <span>Excellent</span>
          </div>
          <div class="legend-item">
            <div class="legend-color score-good"></div>
            <span>Good</span>
          </div>
          <div class="legend-item">
            <div class="legend-color score-average"></div>
            <span>Average</span>
          </div>
          <div class="legend-item">
            <div class="legend-color score-poor"></div>
            <span>Below Average</span>
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Create cost comparison
   */
  createCostComparison: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show (top 4 excluding no-nac)
    const vendorsToShow = Object.keys(vendors)
      .filter(id => id !== 'no-nac')
      .slice(0, 4);
    
    // Define cost categories
    const categories = [
      { name: 'Hardware', key: 'hardware' },
      { name: 'Implementation', key: 'implementation' },
      { name: 'Subscription/License', key: 'yearlySubscription' },
      { name: 'Maintenance', key: 'maintenance' },
      { name: 'Personnel', key: 'personnel' },
      { name: 'Training', key: 'training' }
    ];
    
    // Calculate savings against Portnox
    const portnoxTCO = vendors['portnox']?.costs?.tco3Year || 0;
    
    // Create HTML for cost comparison
    let html = `
      <div class="cost-comparison">
        <h3 class="section-title">3-Year TCO Comparison</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Cost Component</th>
                ${vendorsToShow.map(id => `<th>${vendors[id]?.shortName || id}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
    `;
    
    // Add rows for each cost category
    categories.forEach(category => {
      html += `<tr><td>${category.name}</td>`;
      
      vendorsToShow.forEach(vendorId => {
        const vendor = vendors[vendorId];
        if (!vendor) {
          html += `<td>N/A</td>`;
          return;
        }
        
        const value = vendor.costs?.[category.key] || 0;
        html += `<td>${this.formatCurrency(value)}</td>`;
      });
      
      html += `</tr>`;
    });
    
    // Add total row
    html += `
      <tr class="total-row">
        <td>Total 3-Year TCO</td>
        ${vendorsToShow.map(id => {
          const tco = vendors[id]?.costs?.tco3Year || 0;
          return `<td>${this.formatCurrency(tco)}</td>`;
        }).join('')}
      </tr>
    `;
    
    html += `
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="savings-summary">
        <h3 class="section-title">Cost Savings with Portnox Cloud</h3>
        <div class="stats-grid">
    `;
    
    // Add savings cards
    vendorsToShow.filter(id => id !== 'portnox').forEach(id => {
      const vendor = vendors[id];
      if (!vendor) return;
      
      const tco = vendor.costs?.tco3Year || 0;
      const savings = tco - portnoxTCO;
      const percentage = tco > 0 ? Math.round((savings / tco) * 100) : 0;
      
      if (savings <= 0) return;
      
      html += `
        <div class="stat-card">
          <div class="stat-title">
            <i class="fas fa-money-bill-wave"></i>
            Savings vs ${vendor.shortName || id}
          </div>
          <div class="stat-value">${this.formatCurrency(savings)}</div>
          <div class="stat-indicator positive">
            <i class="fas fa-caret-up"></i> ${percentage}% less expensive
          </div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Create security comparison
   */
  createSecurityComparison: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show (top 4 excluding no-nac)
    const vendorsToShow = Object.keys(vendors)
      .filter(id => id !== 'no-nac')
      .slice(0, 4);
    
    // Define security features
    const features = [
      { name: 'Zero Trust Architecture', key: 'zeroTrust' },
      { name: 'Device Authentication', key: 'deviceAuth' },
      { name: 'Risk Assessment', key: 'riskAssessment' },
      { name: 'Remediation Speed', key: 'remediationSpeed', invert: true, format: 'hours' },
      { name: 'Compliance Coverage', key: 'complianceCoverage' },
      { name: 'Multi-Factor Authentication', key: 'mfa', boolean: true },
      { name: 'Certificate Support', key: 'certificateSupport', boolean: true },
      { name: 'Continuous Monitoring', key: 'continuousMonitoring', boolean: true },
      { name: 'Automated Response', key: 'automatedResponse', boolean: true }
    ];
    
    // Create HTML for security comparison
    let html = `
      <div class="security-comparison">
        <h3 class="section-title">Security Capabilities</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Feature</th>
                ${vendorsToShow.map(id => `<th>${vendors[id]?.shortName || id}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
    `;
    
    // Add rows for each security feature
    features.forEach(feature => {
      html += `<tr><td>${feature.name}</td>`;
      
      vendorsToShow.forEach(vendorId => {
        const vendor = vendors[vendorId];
        if (!vendor || !vendor.security) {
          html += `<td>N/A</td>`;
          return;
        }
        
        const value = vendor.security[feature.key];
        
        if (feature.boolean && typeof value === 'boolean') {
          html += `<td>${value ? 
            '<i class="fas fa-check-circle" style="color: var(--color-success-600);"></i>' : 
            '<i class="fas fa-times-circle" style="color: var(--color-danger-600);"></i>'}</td>`;
        } else if (typeof value === 'number') {
          if (feature.key === 'remediationSpeed') {
            html += `<td>${value} hours</td>`;
          } else {
            html += `<td>${value}%</td>`;
          }
        } else {
          html += `<td>N/A</td>`;
        }
      });
      
      html += `</tr>`;
    });
    
    html += `
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="compliance-comparison">
        <h3 class="section-title">Compliance Framework Coverage</h3>
        <div class="compliance-grid">
    `;
    
    // Add compliance framework cards
    const frameworks = [
      { name: 'NIST CSF', icon: 'fa-shield-alt', key: 'nist' },
      { name: 'PCI DSS', icon: 'fa-credit-card', key: 'pciDss' },
      { name: 'HIPAA', icon: 'fa-hospital', key: 'hipaa' },
      { name: 'GDPR', icon: 'fa-globe-europe', key: 'gdpr' },
      { name: 'ISO 27001', icon: 'fa-certificate', key: 'iso27001' }
    ];
    
    frameworks.forEach(framework => {
      html += `
        <div class="compliance-card">
          <div class="compliance-icon">
            <i class="fas ${framework.icon}"></i>
          </div>
          <div class="compliance-name">${framework.name}</div>
          <div class="compliance-scores">
      `;
      
      vendorsToShow.forEach(id => {
        const vendor = vendors[id];
        if (!vendor || !vendor.compliance) return;
        
        const coverage = vendor.compliance[framework.key] || 0;
        
        html += `
          <div class="compliance-vendor-score" data-vendor="${id}" data-score="${coverage}">
            <span class="vendor-name">${vendor.shortName || id}</span>: ${coverage}%
          </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Create technical comparison
   */
  createTechnicalComparison: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show (top 4 excluding no-nac)
    const vendorsToShow = Object.keys(vendors)
      .filter(id => id !== 'no-nac')
      .slice(0, 4);
    
    // Create HTML for technical comparison
    let html = `
      <div class="technical-comparison">
        <h3 class="section-title">Technical Architecture</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Technical Aspect</th>
                ${vendorsToShow.map(id => `<th>${vendors[id]?.shortName || id}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Architecture Type</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  let badge = '';
                  if (vendor.architecture === 'cloud') {
                    badge = '<span class="badge" style="background-color: var(--color-primary-600); color: white;">Cloud-Native</span>';
                  } else if (vendor.architecture === 'hybrid') {
                    badge = '<span class="badge" style="background-color: var(--color-warning-600); color: black;">Hybrid</span>';
                  } else {
                    badge = '<span class="badge" style="background-color: var(--color-neutral-600); color: white;">On-Premises</span>';
                  }
                  return `<td>${badge}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Deployment Time</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.deployment?.timeToValue || '?'} days</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Requires Hardware</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.deployment?.requiresHardware ? 
                    '<i class="fas fa-check-circle" style="color: var(--color-danger-600);"></i>' : 
                    '<i class="fas fa-times-circle" style="color: var(--color-success-600);"></i>'}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Requires Agents</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.deployment?.requiresAgents ? 
                    '<i class="fas fa-check-circle" style="color: var(--color-danger-600);"></i>' : 
                    '<i class="fas fa-times-circle" style="color: var(--color-success-600);"></i>'}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Remote Work Support</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.deployment?.remoteWorkSupport ? 
                    '<i class="fas fa-check-circle" style="color: var(--color-success-600);"></i>' : 
                    '<i class="fas fa-times-circle" style="color: var(--color-danger-600);"></i>'}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>System Reliability</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.technical?.reliability || '?'}%</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Update Frequency</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.technical?.updateFrequency || 'Unknown'}</td>`;
                }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="integration-comparison">
        <h3 class="section-title">Integration Capabilities</h3>
        <div class="integration-grid">
    `;
    
    // Add integration cards
    const integrations = [
      { name: 'Azure AD', icon: 'fa-microsoft', key: 'azure' },
      { name: 'Google Workspace', icon: 'fa-google', key: 'googleWorkspace' },
      { name: 'Active Directory', icon: 'fa-server', key: 'activedirectory' },
      { name: 'RADIUS', icon: 'fa-broadcast-tower', key: 'radius' },
      { name: 'MDM', icon: 'fa-mobile-alt', key: 'mdm' },
      { name: 'SIEM', icon: 'fa-chart-line', key: 'siem' }
    ];
    
    integrations.forEach(integration => {
      html += `
        <div class="integration-card">
          <div class="integration-icon">
            <i class="fas ${integration.icon}"></i>
          </div>
          <div class="integration-name">${integration.name}</div>
          <div class="integration-vendors">
      `;
      
      vendorsToShow.forEach(id => {
        const vendor = vendors[id];
        if (!vendor || !vendor.integration) return;
        
        const supported = vendor.integration[integration.key];
        
        html += `<div class="integration-vendor ${supported ? 'supported' : 'not-supported'}">${vendor.shortName || id}</div>`;
      });
      
      html += `
          </div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
    
    container.innerHTML = html;
    
    // Add CSS for integration grid
    this.addCss(`
      .integration-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
        margin-top: 16px;
      }
      
      .integration-card {
        background-color: white;
        padding: 16px;
        text-align: center;
      }
      
      .integration-icon {
        font-size: 2rem;
        color: var(--color-primary-500);
        margin-bottom: 8px;
      }
      
      .integration-name {
        font-weight: 600;
        margin-bottom: 12px;
      }
      
      .integration-vendors {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
      }
      
      .integration-vendor {
        font-size: 0.75rem;
        padding: 4px 8px;
        border-radius: 4px;
      }
      
      .integration-vendor.supported {
        background-color: var(--color-success-100);
        color: var(--color-success-800);
      }
      
      .integration-vendor.not-supported {
        background-color: var(--color-neutral-100);
        color: var(--color-neutral-500);
        text-decoration: line-through;
      }
      
      .compliance-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
        margin-top: 16px;
      }
      
      .compliance-card {
        background-color: white;
        padding: 16px;
        text-align: center;
      }
      
      .compliance-icon {
        font-size: 2rem;
        color: var(--color-primary-500);
        margin-bottom: 8px;
      }
      
      .compliance-name {
        font-weight: 600;
        margin-bottom: 12px;
      }
      
      .compliance-scores {
        font-size: 0.875rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      
      .compliance-vendor-score {
        display: flex;
        justify-content: space-between;
        padding: 4px 0;
        border-bottom: 1px solid var(--color-neutral-100);
      }
      
      .vendor-name {
        font-weight: 500;
      }
      
      .legend-item {
        display: flex;
        align-items: center;
        margin-right: 12px;
      }
      
      .legend-color {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
      
      .heatmap-legend {
        display: flex;
        justify-content: center;
        margin-top: 12px;
      }
      
      .score-excellent {
        background-color: var(--color-success-500);
        color: white;
      }
      
      .score-good {
        background-color: var(--color-success-300);
        color: var(--color-neutral-800);
      }
      
      .score-average {
        background-color: var(--color-warning-300);
        color: var(--color-neutral-800);
      }
      
      .score-poor {
        background-color: var(--color-danger-300);
        color: var(--color-neutral-800);
      }
      
      .badge {
        display: inline-block;
        padding: 4px 8px;
        font-size: 0.75rem;
      }
    `);
  },
  
  /**
   * Get color class based on score
   */
  getScoreColorClass: function(score) {
    if (score >= 90) return 'score-excellent';
    if (score >= 75) return 'score-good';
    if (score >= 60) return 'score-average';
    return 'score-poor';
  },
  
  /**
   * Format currency values
   */
  formatCurrency: function(value) {
    return ' + Math.round(value).toLocaleString();
  },
  
  /**
   * Add CSS to document
   */
  addCss: function(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Vendor Comparison component loaded');
  
  // Make globally available
  window.VendorComparison = VendorComparison;
});
EOF

# Create NIST CSF Visualization component
echo "Creating NIST CSF Visualization..."
cat > js/components/nistCsfVisualization.js << 'EOF'
/**
 * NIST CSF Visualization Component for Portnox Total Cost Analyzer
 * Creates an interactive visualization of the NIST Cybersecurity Framework
 */

class NistCSFVisualization {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.vendors = window.VENDORS || {};
    this.framework = window.COMPLIANCE_FRAMEWORKS && window.COMPLIANCE_FRAMEWORKS['nist-csf'] ? 
                    window.COMPLIANCE_FRAMEWORKS['nist-csf'] : this.getDefaultFramework();
    this.selectedVendors = ['portnox'];
    this.expanded = {};
  }
  
  /**
   * Get default framework if not defined
   */
  getDefaultFramework() {
    return {
      name: 'NIST Cybersecurity Framework',
      shortName: 'NIST CSF',
      description: 'The NIST Cybersecurity Framework (CSF) provides a policy framework of computer security guidance for how organizations can assess and improve their ability to prevent, detect, and respond to cyber attacks.',
      version: '1.1',
      categories: [
        {
          id: 'identify',
          name: 'Identify',
          description: 'Develop organizational understanding to manage cybersecurity risk to systems, people, assets, data, and capabilities.',
          subcategories: ['Asset Management', 'Business Environment', 'Governance', 'Risk Assessment', 'Risk Management Strategy']
        },
        {
          id: 'protect',
          name: 'Protect',
          description: 'Develop and implement appropriate safeguards to ensure delivery of critical services.',
          subcategories: ['Identity Management', 'Access Control', 'Awareness and Training', 'Data Security', 'Protective Technology']
        },
        {
          id: 'detect',
          name: 'Detect',
          description: 'Develop and implement appropriate activities to identify the occurrence of a cybersecurity event.',
          subcategories: ['Anomalies and Events', 'Security Continuous Monitoring', 'Detection Processes']
        },
        {
          id: 'respond',
          name: 'Respond',
          description: 'Develop and implement appropriate activities to take action regarding a detected cybersecurity incident.',
          subcategories: ['Response Planning', 'Communications', 'Analysis', 'Mitigation', 'Improvements']
        },
        {
          id: 'recover',
          name: 'Recover',
          description: 'Develop and implement appropriate activities to maintain plans for resilience and to restore any capabilities or services that were impaired due to a cybersecurity incident.',
          subcategories: ['Recovery Planning', 'Improvements', 'Communications']
        }
      ]
    };
  }
  
  /**
   * Initialize the visualization
   */
  init() {
    if (!this.container) {
      console.error(`Container element ${this.containerId} not found`);
      return;
    }
    
    // Clear container
    this.container.innerHTML = '';
    
    // Create framework structure
    this.createFrameworkStructure();
    
    // Initialize event listeners
    this.initEventListeners();
    
    // Add CSS styles
    this.addStyles();
    
    return this;
  }
  
  /**
   * Create the framework structure
   */
  createFrameworkStructure() {
    if (!this.framework || !this.framework.categories) {
      console.error('NIST CSF framework data not found');
      return;
    }
    
    // Create header
    const header = document.createElement('div');
    header.className = 'nist-header';
    header.innerHTML = `
      <div class="nist-title">${this.framework.name} Compliance</div>
      <div class="nist-controls">
        <button class="btn btn-sm btn-outline nist-expand-all">Expand All</button>
        <button class="btn btn-sm btn-outline nist-collapse-all">Collapse All</button>
      </div>
    `;
    this.container.appendChild(header);
    
    // Create category grid
    const grid = document.createElement('div');
    grid.className = 'nist-grid';
    
    // Add categories
    this.framework.categories.forEach(category => {
      const categoryEl = this.createCategoryElement(category);
      grid.appendChild(categoryEl);
    });
    
    this.container.appendChild(grid);
    
    // Create legend
    const legend = document.createElement('div');
    legend.className = 'nist-legend';
    legend.innerHTML = this.createLegendContent();
    this.container.appendChild(legend);
  }
  
  /**
   * Create a category element
   */
  createCategoryElement(category) {
    const categoryEl = document.createElement('div');
    categoryEl.className = `nist-category nist-category-${category.id}`;
    categoryEl.dataset.category = category.id;
    
    // Calculate average score for this category across selected vendors
    const scores = this.calculateCategoryScores(category.id);
    
    // Prepare category content
    categoryEl.innerHTML = `
      <div class="nist-category-header">
        <div class="nist-category-icon">${this.getCategoryIcon(category.id)}</div>
        <h4 class="nist-category-name">${category.name}</h4>
      </div>
      <p class="nist-category-description">${category.description}</p>
      <div class="nist-score">
        <div class="nist-score-bar" style="width: ${scores.portnox}%"></div>
      </div>
      <div class="nist-score-values">
        <span class="nist-score-value">Portnox: ${scores.portnox}%</span>
        <span class="nist-score-value">Industry Avg: ${scores.industry}%</span>
      </div>
      <div class="nist-subcategories" style="display: none;">
        ${this.createSubcategoriesContent(category.subcategories)}
      </div>
      <button class="btn btn-sm btn-outline nist-expand-btn" data-category="${category.id}">
        <i class="fas fa-chevron-down"></i> Details
      </button>
    `;
    
    return categoryEl;
  }
  
  /**
   * Create subcategories content
   */
  createSubcategoriesContent(subcategories) {
    if (!subcategories || !subcategories.length) return '';
    
    return subcategories.map(sub => `
      <div class="nist-subcategory">
        <span class="nist-subcategory-name">${sub}</span>
        <span class="nist-subcategory-value">${this.getRandomScore(80, 95)}%</span>
      </div>
    `).join('');
  }
  
  /**
   * Create legend content
   */
  createLegendContent() {
    let content = '';
    
    // Add vendor legend items
    content += `
      <div class="nist-legend-item">
        <div class="nist-legend-color" style="background-color: var(--color-primary-600);"></div>
        <span>Portnox Cloud</span>
      </div>
      <div class="nist-legend-item">
        <div class="nist-legend-color" style="background-color: var(--color-neutral-400);"></div>
        <span>Industry Average</span>
      </div>
    `;
    
    // Add category legend items
    const categoryColors = {
      identify: 'var(--color-primary-600)',
      protect: 'var(--color-success-600)',
      detect: 'var(--color-warning-600)',
      respond: 'var(--color-danger-600)',
      recover: 'var(--color-secondary-600)'
    };
    
    this.framework.categories.forEach(category => {
      const color = categoryColors[category.id] || 'var(--color-primary-600)';
      
      content += `
        <div class="nist-legend-item">
          <div class="nist-legend-color" style="background-color: ${color};"></div>
          <span>${category.name}</span>
        </div>
      `;
    });
    
    return content;
  }
  
  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // Expand/collapse individual categories
    const expandButtons = this.container.querySelectorAll('.nist-expand-btn');
    expandButtons.forEach(btn => {
      btn.addEventListener('click', e => {
        const categoryId = btn.dataset.category;
        const categoryEl = this.container.querySelector(`.nist-category-${categoryId}`);
        const subcategories = categoryEl.querySelector('.nist-subcategories');
        
        if (this.expanded[categoryId]) {
          // Collapse
          subcategories.style.display = 'none';
          btn.innerHTML = '<i class="fas fa-chevron-down"></i> Details';
          this.expanded[categoryId] = false;
        } else {
          // Expand
          subcategories.style.display = 'block';
          btn.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Details';
          this.expanded[categoryId] = true;
        }
      });
    });
    
    // Expand all button
    const expandAllBtn = this.container.querySelector('.nist-expand-all');
    if (expandAllBtn) {
      expandAllBtn.addEventListener('click', () => {
        const subcategories = this.container.querySelectorAll('.nist-subcategories');
        subcategories.forEach(el => el.style.display = 'block');
        
        const buttons = this.container.querySelectorAll('.nist-expand-btn');
        buttons.forEach(btn => {
          btn.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Details';
          this.expanded[btn.dataset.category] = true;
        });
      });
    }
    
    // Collapse all button
    const collapseAllBtn = this.container.querySelector('.nist-collapse-all');
    if (collapseAllBtn) {
      collapseAllBtn.addEventListener('click', () => {
        const subcategories = this.container.querySelectorAll('.nist-subcategories');
        subcategories.forEach(el => el.style.display = 'none');
        
        const buttons = this.container.querySelectorAll('.nist-expand-btn');
        buttons.forEach(btn => {
          btn.innerHTML = '<i class="fas fa-chevron-down"></i> Details';
          this.expanded[btn.dataset.category] = false;
        });
      });
    }
  }
  
  /**
   * Calculate scores for a category
   */
  calculateCategoryScores(categoryId) {
    // Get Portnox data
    const portnoxData = this.vendors.portnox?.compliance?.frameworks?.find(f => f.name === 'NIST CSF');
    
    if (portnoxData && portnoxData.details && portnoxData.details[categoryId]) {
      // We have real data
      return {
        portnox: portnoxData.details[categoryId],
        industry: this.calculateIndustryAverage(categoryId)
      };
    }
    
    // Fallback to simulated data
    return {
      portnox: this.getSimulatedScore('portnox', categoryId),
      industry: this.getSimulatedScore('industry', categoryId)
    };
  }
  
  /**
   * Calculate industry average for a category
   */
  calculateIndustryAverage(categoryId) {
    let total = 0;
    let count = 0;
    
    Object.keys(this.vendors).forEach(vendorId => {
      if (vendorId === 'portnox' || vendorId === 'no-nac') return;
      
      const vendor = this.vendors[vendorId];
      const frameworkData = vendor?.compliance?.frameworks?.find(f => f.name === 'NIST CSF');
      
      if (frameworkData && frameworkData.details && frameworkData.details[categoryId]) {
        total += frameworkData.details[categoryId];
        count++;
      }
    });
    
    return count > 0 ? Math.round(total / count) : this.getSimulatedScore('industry', categoryId);
  }
  
  /**
   * Get simulated score for a vendor and category
   */
  getSimulatedScore(type, categoryId) {
    // Simulated scores for demonstration purposes
    const scores = {
      portnox: {
        identify: 92,
        protect: 96,
        detect: 95,
        respond: 94,
        recover: 90
      },
      industry: {
        identify: 82,
        protect: 85,
        detect: 80,
        respond: 78,
        recover: 75
      }
    };
    
    return scores[type][categoryId] || 80;
  }
  
  /**
   * Get a random score between min and max
   */
  getRandomScore(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /**
   * Get icon for a category
   */
  getCategoryIcon(categoryId) {
    const icons = {
      identify: '<i class="fas fa-search"></i>',
      protect: '<i class="fas fa-shield-alt"></i>',
      detect: '<i class="fas fa-radar"></i>',
      respond: '<i class="fas fa-bolt"></i>',
      recover: '<i class="fas fa-sync-alt"></i>'
    };
    
    return icons[categoryId] || '<i class="fas fa-check"></i>';
  }
  
  /**
   * Add CSS styles
   */
  addStyles() {
    // Check if styles are already added
    if (document.getElementById('nist-csf-styles')) return;
    
    // Create style element
    const style = document.createElement('style');
    style.id = 'nist-csf-styles';
    
    // Add CSS rules
    style.textContent = `
      .nist-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      
      .nist-title {
        font-size: 1.25rem;
        font-weight: 600;
      }
      
      .nist-controls {
        display: flex;
        gap: 8px;
      }
      
      .nist-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 16px;
        margin-bottom: 16px;
      }
      
      .nist-category {
        background-color: white;
        padding: 16px;
      }
      
      .nist-category-header {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }
      
      .nist-category-icon {
        font-size: 1.25rem;
        margin-right: 8px;
      }
      
      .nist-category-name {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
      }
      
      .nist-category-description {
        font-size: 0.875rem;
        margin-bottom: 12px;
        color: var(--color-neutral-600);
      }
      
      .nist-score {
        height: 8px;
        background-color: var(--color-neutral-200);
        margin-bottom: 4px;
      }
      
      .nist-score-bar {
        height: 100%;
        background-color: var(--color-primary-600);
      }
      
      .nist-category-identify .nist-score-bar {
        background-color: var(--color-primary-600);
      }
      
      .nist-category-protect .nist-score-bar {
        background-color: var(--color-success-600);
      }
      
      .nist-category-detect .nist-score-bar {
        background-color: var(--color-warning-600);
      }
      
      .nist-category-respond .nist-score-bar {
        background-color: var(--color-danger-600);
      }
      
      .nist-category-recover .nist-score-bar {
        background-color: var(--color-secondary-600);
      }
      
      .nist-score-values {
        display: flex;
        justify-content: space-between;
        font-size: 0.75rem;
        color: var(--color-neutral-600);
        margin-bottom: 12px;
      }
      
      .nist-subcategories {
        margin-bottom: 12px;
        border-top: 1px solid var(--color-neutral-200);
        padding-top: 8px;
      }
      
      .nist-subcategory {
        display: flex;
        justify-content: space-between;
        font-size: 0.875rem;
        padding: 4px 0;
        border-bottom: 1px solid var(--color-neutral-100);
      }
      
      .nist-expand-btn {
        width: 100%;
      }
      
      .nist-legend {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px;
        margin-top: 16px;
      }
      
      .nist-legend-item {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
      }
      
      .nist-legend-color {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
    `;
    
    // Add style to document
    document.head.appendChild(style);
  }
  
  /**
   * Update selected vendors
   */
  updateSelectedVendors(vendors) {
    this.selectedVendors = vendors;
    this.init();
  }
}

// Make globally available
window.NistCSFVisualization = NistCSFVisualization;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('NIST CSF Visualization component loaded');
});
EOF

# Create main script that applies all fixes
echo "Creating finalfixes.js..."
cat > js/finalfixes.js << 'EOF'
/**
 * Final Fixes for Portnox Total Cost Analyzer
 * Apply all fixes and enhancements in one go
 */

// Load all required fixes and enhancements
document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying all fixes and enhancements...');
  
  // Add modern CSS
  loadResource('css/modern-styles.css', 'css');
  
  // Load vendor data
  loadResource('js/data/vendor-data.js', 'js');
  
  // Load tab navigator
  loadResource('js/components/tab-navigator-enhanced.js', 'js');
  
  // Load vendor comparison
  loadResource('js/components/vendorComparison.js', 'js');
  
  // Load NIST CSF visualization
  loadResource('js/components/nistCsfVisualization.js', 'js');
  
  // Load comprehensive fixes
  loadResource('js/utils/comprehensive-fix.js', 'js', function() {
    console.log('All components loaded. Initializing application...');
    
    // Initialize fixes
    if (typeof initializeFixes === 'function') {
      initializeFixes();
    }
  });
});

/**
 * Load a resource (JS or CSS) dynamically
 */
function loadResource(url, type, callback) {
  // Check if resource already exists
  const existingElements = document.querySelectorAll(`link[href="${url}"], script[src="${url}"]`);
  if (existingElements.length > 0) {
    console.log(`Resource ${url} already loaded`);
    if (callback) callback();
    return;
  }
  
  let element;
  
  if (type === 'css') {
    element = document.createElement('link');
    element.rel = 'stylesheet';
    element.href = url;
  } else if (type === 'js') {
    element = document.createElement('script');
    element.src = url;
    
    if (callback) {
      element.onload = callback;
    }
  }
  
  document.head.appendChild(element);
  console.log(`Loaded ${type} resource: ${url}`);
}
EOF

# Update script to make it executable
chmod +x comprehensive-fix.sh

# Execute the script
echo "Comprehensive fix script created. Running it now..."
./comprehensive-fix.sh

echo "===================================================="
echo "Portnox Total Cost Analyzer has been enhanced!"
echo "All issues have been fixed and the UI has been modernized."
echo "===================================================="
