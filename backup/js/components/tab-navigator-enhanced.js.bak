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
# Continue with the enhanced tab-navigator-enhanced.js file
cat >> ./js/components/tab-navigator-enhanced.js << 'EOF'
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
