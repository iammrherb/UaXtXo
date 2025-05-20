/**
 * Enhanced Security & Compliance View for Portnox Total Cost Analyzer
 * Provides comprehensive security analysis and compliance mappings
 */

class SecurityView {
  constructor() {
    this.initialized = false;
    this.container = null;
    this.currentTab = 'security-overview';
    this.data = null;
  }
  
  /**
   * Initialize the view
   */
  init(viewId = 'security') {
    console.log('Initializing Security & Compliance View...');
    
    // Find container
    this.container = document.querySelector(`.view-panel[data-view="${viewId}"]`);
    
    if (!this.container) {
      console.error(`Container not found for view: ${viewId}`);
      return false;
    }
    
    // Create tabs if they don't exist
    this.createTabsIfNeeded();
    
    // Set up tab navigation
    this.initTabs();
    
    // Create html structure for panels if they don't exist
    this.createPanelsIfNeeded();
    
    this.initialized = true;
    return true;
  }
  
  /**
   * Create tabs if they don't exist
   */
  createTabsIfNeeded() {
    let tabsContainer = this.container.querySelector('.results-tabs');
    
    if (!tabsContainer) {
      tabsContainer = document.createElement('div');
      tabsContainer.className = 'results-tabs';
      
      tabsContainer.innerHTML = `
        <button class="results-tab active" data-panel="security-overview">Security Overview</button>
        <button class="results-tab" data-panel="compliance-frameworks">Compliance Frameworks</button>
        <button class="results-tab" data-panel="threat-analysis">Threat Analysis</button>
        <button class="results-tab" data-panel="industry-impact">Industry Impact</button>
      `;
      
      // Insert tabs at the beginning of the container
      this.container.prepend(tabsContainer);
    }
  }
  
  /**
   * Set up tab navigation
   */
  initTabs() {
    const tabsContainer = this.container.querySelector('.results-tabs');
    
    if (!tabsContainer) return;
    
    // Get all tabs
    const tabs = tabsContainer.querySelectorAll('.results-tab');
    
    // Add click event to each tab
    tabs.forEach(tab => {
      const panel = tab.getAttribute('data-panel');
      
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all tabs and panels
        tabs.forEach(t => t.classList.remove('active'));
        
        const panels = this.container.querySelectorAll('.results-panel');
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding panel
        const activePanel = this.container.querySelector(`#${panel}`);
        if (activePanel) {
          activePanel.classList.add('active');
          this.currentTab = panel;
          
          // Refresh charts in this panel
          this.refreshChartsInPanel(panel);
        }
      });
    });
  }
  
  /**
   * Create panels structure if they don't exist
   */
  createPanelsIfNeeded() {
    // Check if panels already exist
    const securityOverview = this.container.querySelector('#security-overview');
    const complianceFrameworks = this.container.querySelector('#compliance-frameworks');
    const threatAnalysis = this.container.querySelector('#threat-analysis');
    const industryImpact = this.container.querySelector('#industry-impact');
    
    // Create security overview panel if needed
    if (!securityOverview) {
      this.createSecurityOverviewPanel();
    }
    
    // Create compliance frameworks panel if needed
    if (!complianceFrameworks) {
      this.createComplianceFrameworksPanel();
    }
    
    // Create threat analysis panel if needed
    if (!threatAnalysis) {
      this.createThreatAnalysisPanel();
    }
    
    // Create industry impact panel if needed
    if (!industryImpact) {
      this.createIndustryImpactPanel();
    }
  }
  
  /**
   * Create security overview panel
   */
  createSecurityOverviewPanel() {
    const panel = document.createElement('div');
    panel.id = 'security-overview';
    panel.className = 'results-panel active';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Security Overview</h2>
        <p class="subtitle">Comprehensive analysis of security capabilities and risk reduction</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card highlight-card">
          <h3>Overall Security Improvement</h3>
          <div class="metric-value highlight-value" id="security-improvement">85%</div>
          <div class="metric-label">Risk reduction with NAC implementation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Industry-leading protection
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Zero Trust Coverage</h3>
          <div class="metric-value" id="zero-trust-score">92%</div>
          <div class="metric-label">Zero Trust principles implementation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 15% above competitors
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Device Authentication</h3>
          <div class="metric-value" id="device-auth-score">95%</div>
          <div class="metric-label">Robust device identification and validation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Comprehensive coverage
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Incident Response Time</h3>
          <div class="metric-value" id="response-time">5 min</div>
          <div class="metric-label">Average time to detect and isolate threats</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 3x faster than competitors
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>NIST Cybersecurity Framework Coverage</h3>
        <div class="chart-wrapper" id="nist-framework-chart"></div>
        <div class="chart-legend" id="nist-framework-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Security Architecture Benefits</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h4>Zero Trust Architecture</h4>
            <p>Never trust, always verify approach to network security with continuous authentication</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-fingerprint"></i>
            </div>
            <h4>Device Identity</h4>
            <p>Strong device identification and continuous verification of device posture</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-laptop-code"></i>
            </div>
            <h4>Agentless Design</h4>
            <p>No endpoint agents required, simplifying deployment and reducing complexity</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-lock"></i>
            </div>
            <h4>Least Privilege Access</h4>
            <p>Granular access controls based on device identity, risk, and security posture</p>
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Data Breach Cost Impact</h3>
        <div class="chart-wrapper" id="breach-impact-chart"></div>
        <div class="chart-legend" id="breach-impact-legend"></div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create compliance frameworks panel
   */
  createComplianceFrameworksPanel() {
    const panel = document.createElement('div');
    panel.id = 'compliance-frameworks';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Compliance Frameworks</h2>
        <p class="subtitle">Coverage of major regulatory and industry compliance frameworks</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card highlight-card">
          <h3>Overall Compliance Coverage</h3>
          <div class="metric-value highlight-value" id="compliance-coverage">95%</div>
          <div class="metric-label">Average framework coverage</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Comprehensive compliance
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Automated Reporting</h3>
          <div class="metric-value" id="automated-reporting">85%</div>
          <div class="metric-label">Compliance evidence automation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Reduces audit overhead
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Audit Time Reduction</h3>
          <div class="metric-value" id="audit-reduction">65%</div>
          <div class="metric-label">Time saved in compliance audits</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Significant efficiency
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Compliance Frameworks</h3>
          <div class="metric-value" id="framework-count">7+</div>
          <div class="metric-label">Major frameworks supported</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Comprehensive coverage
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Industry Compliance Framework Coverage</h3>
        <div class="chart-wrapper" id="security-frameworks-chart"></div>
        <div class="chart-legend" id="security-frameworks-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Key Compliance Frameworks</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-tasks"></i>
            </div>
            <h4>NIST Cybersecurity Framework</h4>
            <p>Identifies, protects, detects, responds to, and recovers from cyber threats</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-hospital"></i>
            </div>
            <h4>HIPAA</h4>
            <p>Ensures protection of sensitive patient health information</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-credit-card"></i>
            </div>
            <h4>PCI DSS</h4>
            <p>Secures credit card data and payment processing environments</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-globe-europe"></i>
            </div>
            <h4>GDPR</h4>
            <p>Protects personal data and privacy for EU citizens</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-lock"></i>
            </div>
            <h4>ISO 27001</h4>
            <p>Information security management system framework</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h4>SOC 2</h4>
            <p>Controls for security, availability, and confidentiality</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-fighter-jet"></i>
            </div>
            <h4>CMMC</h4>
            <p>Cybersecurity standards for defense contractors</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-university"></i>
            </div>
            <h4>FERPA</h4>
            <p>Protection of student education records</p>
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Compliance Automation Benefits</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-file-alt"></i>
            </div>
            <h4>Automatic Evidence Collection</h4>
            <p>Continuously collects and stores compliance evidence for audits</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-chart-bar"></i>
            </div>
            <h4>Real-Time Compliance Dashboards</h4>
            <p>Monitors compliance status with real-time visibility</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h4>Proactive Gap Identification</h4>
            <p>Identifies and alerts on compliance gaps before audits</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-clock"></i>
            </div>
            <h4>Reduced Audit Overhead</h4>
            <p>Streamlines audit processes and reduces preparation time</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create threat analysis panel
   */
  createThreatAnalysisPanel() {
    const panel = document.createElement('div');
    panel.id = 'threat-analysis';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Threat Analysis</h2>
        <p class="subtitle">Comprehensive threat modeling and risk mitigation assessment</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card highlight-card">
          <h3>Overall Threat Reduction</h3>
          <div class="metric-value highlight-value" id="threat-reduction">85%</div>
          <div class="metric-label">Reduction in vulnerability exposure</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Significant risk reduction
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Unauthorized Access Prevention</h3>
          <div class="metric-value" id="unauthorized-prevention">95%</div>
          <div class="metric-label">Reduction in unauthorized access attempts</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Strong boundary protection
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Lateral Movement Reduction</h3>
          <div class="metric-value" id="lateral-reduction">90%</div>
          <div class="metric-label">Prevention of threat propagation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Effective segmentation
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Shadow IT Elimination</h3>
          <div class="metric-value" id="shadow-it">95%</div>
          <div class="metric-label">Detection of unauthorized devices</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Complete visibility
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Threat Impact Analysis</h3>
        <div class="chart-wrapper" id="threat-model-chart"></div>
        <div class="chart-legend" id="threat-model-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>MITRE ATT&CK Coverage</h3>
        <div class="mitre-grid">
          <div class="mitre-section">
            <h4>Initial Access</h4>
            <div class="mitre-items">
              <div class="mitre-item covered">Drive-by Compromise</div>
              <div class="mitre-item covered">External Remote Services</div>
              <div class="mitre-item covered">Hardware Additions</div>
              <div class="mitre-item covered">Replication Through Removable Media</div>
              <div class="mitre-item covered">Trusted Relationship</div>
              <div class="mitre-item covered">Valid Accounts</div>
            </div>
          </div>
          
          <div class="mitre-section">
            <h4>Execution</h4>
            <div class="mitre-items">
              <div class="mitre-item covered">Command and Scripting Interpreter</div>
              <div class="mitre-item covered">Native API</div>
              <div class="mitre-item covered">System Services</div>
              <div class="mitre-item covered">Windows Management Instrumentation</div>
              <div class="mitre-item partial">Software Deployment Tools</div>
            </div>
          </div>
          
          <div class="mitre-section">
            <h4>Persistence</h4>
            <div class="mitre-items">
              <div class="mitre-item covered">Account Manipulation</div>
              <div class="mitre-item covered">Boot or Logon Autostart Execution</div>
              <div class="mitre-item covered">Create Account</div>
              <div class="mitre-item covered">External Remote Services</div>
              <div class="mitre-item covered">Valid Accounts</div>
            </div>
          </div>
          
          <div class="mitre-section">
            <h4>Privilege Escalation</h4>
            <div class="mitre-items">
              <div class="mitre-item covered">Access Token Manipulation</div>
              <div class="mitre-item covered">Boot or Logon Autostart Execution</div>
              <div class="mitre-item covered">Valid Accounts</div>
              <div class="mitre-item partial">Exploitation for Privilege Escalation</div>
            </div>
          </div>
          
          <div class="mitre-section">
            <h4>Defense Evasion</h4>
            <div class="mitre-items">
              <div class="mitre-item covered">Disable or Modify Tools</div>
              <div class="mitre-item covered">Impair Defenses</div>
              <div class="mitre-item covered">Indicator Removal</div>
              <div class="mitre-item covered">Valid Accounts</div>
              <div class="mitre-item partial">Masquerading</div>
            </div>
          </div>
          
          <div class="mitre-section">
            <h4>Lateral Movement</h4>
            <div class="mitre-items">
              <div class="mitre-item covered">Internal Spearphishing</div>
              <div class="mitre-item covered">Lateral Tool Transfer</div>
              <div class="mitre-item covered">Remote Services</div>
              <div class="mitre-item covered">Valid Accounts</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Advanced Threat Protection</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-user-shield"></i>
            </div>
            <h4>Zero Trust Authentication</h4>
            <p>Continuous authentication and verification of all network access attempts</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-network-wired"></i>
            </div>
            <h4>Micro-Segmentation</h4>
            <p>Granular network segmentation to contain lateral movement of threats</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-laptop-medical"></i>
            </div>
            <h4>Device Posture Assessment</h4>
            <p>Real-time evaluation of device security status and compliance</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-robot"></i>
            </div>
            <h4>Automated Remediation</h4>
            <p>Immediate automated response to security incidents and policy violations</p>
          </div>
        </div>
      </div>
    `;
    
    // Add custom styles for MITRE ATT&CK grid
    const style = document.createElement('style');
    style.textContent = `
      .mitre-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }
      
      .mitre-section {
        background: var(--card-bg);
        border-radius: 8px;
        padding: 15px;
        box-shadow: var(--shadow-sm);
        border: 1px solid var(--border-color);
      }
      
      .mitre-section h4 {
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 16px;
        color: var(--text-primary);
      }
      
      .mitre-items {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      .mitre-item {
        padding: 6px 10px;
        border-radius: 4px;
        font-size: 13px;
        position: relative;
        padding-left: 25px;
      }
      
      .mitre-item::before {
        content: '';
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      
      .mitre-item.covered {
        background-color: rgba(46, 204, 113, 0.1);
        border: 1px solid rgba(46, 204, 113, 0.3);
      }
      
      .mitre-item.covered::before {
        background-color: #2ecc71;
      }
      
      .mitre-item.partial {
        background-color: rgba(243, 156, 18, 0.1);
        border: 1px solid rgba(243, 156, 18, 0.3);
      }
      
      .mitre-item.partial::before {
        background-color: #f39c12;
      }
      
      .dark-mode .mitre-item.covered {
        background-color: rgba(46, 204, 113, 0.2);
      }
      
      .dark-mode .mitre-item.partial {
        background-color: rgba(243, 156, 18, 0.2);
      }
    `;
    
    document.head.appendChild(style);
    this.container.appendChild(panel);
  }
  
  /**
   * Create industry impact panel
   */
  createIndustryImpactPanel() {
    const panel = document.createElement('div');
    panel.id = 'industry-impact';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Industry Impact Analysis</h2>
        <p class="subtitle">Industry-specific security challenges and breach impact analysis</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card highlight-card">
          <h3>Average Breach Cost</h3>
          <div class="metric-value highlight-value" id="avg-breach-cost">$4.35M</div>
          <div class="metric-label">Average data breach cost in 2025</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 12% increase from 2024
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Healthcare Breach Cost</h3>
          <div class="metric-value" id="healthcare-breach-cost">$9.23M</div>
          <div class="metric-label">Highest industry breach costs</div>
          <div class="metric-trend down">
            <i class="fas fa-arrow-down"></i> High regulatory impact
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Financial Services Breach</h3>
          <div class="metric-value" id="financial-breach-cost">$5.97M</div>
          <div class="metric-label">High-value target for attackers</div>
          <div class="metric-trend down">
            <i class="fas fa-arrow-down"></i> Significant exposure
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Mean Time to Identify</h3>
          <div class="metric-value" id="mtti-value">287</div>
          <div class="metric-label">Average days to identify a breach</div>
          <div class="metric-trend down">
            <i class="fas fa-arrow-down"></i> Too slow for modern threats
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Data Breach Costs by Industry</h3>
        <div class="chart-wrapper" id="industry-breach-chart"></div>
        <div class="chart-legend" id="industry-breach-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Cyber Insurance Premium Reduction</h3>
        <div class="chart-wrapper" id="insurance-impact-chart"></div>
        <div class="chart-legend" id="insurance-impact-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Industry-Specific Security Considerations</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-hospital"></i>
            </div>
            <h4>Healthcare</h4>
            <p>Protection of electronic health records, medical devices, and HIPAA compliance</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-university"></i>
            </div>
            <h4>Financial Services</h4>
            <p>Securing financial transactions, customer data, and meeting regulatory requirements</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-industry"></i>
            </div>
            <h4>Manufacturing</h4>
            <p>Securing operational technology, IoT devices, and protecting intellectual property</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <h4>Education</h4>
            <p>Protecting student data, research information, and managing BYOD environments</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <h4>Retail</h4>
            <p>Securing payment systems, customer data, and meeting PCI DSS requirements</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-government"></i>
            </div>
            <h4>Government</h4>
            <p>Protecting sensitive information, critical infrastructure, and citizen data</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-plug"></i>
            </div>
            <h4>Energy & Utilities</h4>
            <p>Securing critical infrastructure, industrial control systems, and SCADA networks</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-plane"></i>
            </div>
            <h4>Transportation</h4>
            <p>Protecting transportation systems, passenger data, and operational technology</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Refresh charts in the current panel
   */
  refreshChartsInPanel(panelId) {
    if (!this.data) {
      console.warn('No data available for charts');
      return;
    }
    
    console.log(`Refreshing charts in panel: ${panelId}`);
    
    // Initialize appropriate charts based on panel
    switch (panelId) {
      case 'security-overview':
        if (window.d3Manager) {
          window.d3Manager.createNistFrameworkChart(this.data, 'nist-framework-chart', 'nistFrameworkChart');
        }
        if (window.apexChartManager) {
          window.apexChartManager.createBreachImpactChart(this.data, 'breach-impact-chart', 'breachImpactChart');
        }
        break;
        
      case 'compliance-frameworks':
        if (window.apexChartManager) {
          window.apexChartManager.createSecurityFrameworksChart(this.data, 'security-frameworks-chart', 'securityFrameworksChart');
        }
        break;
        
      case 'threat-analysis':
        if (window.d3Manager) {
          window.d3Manager.createThreatModelVisualization(this.data, 'threat-model-chart', 'threatModelChart');
        }
        break;
        
      case 'industry-impact':
        if (window.apexChartManager) {
          window.apexChartManager.createIndustryBreachChart(this.data, 'industry-breach-chart', 'industryBreachChart');
          window.apexChartManager.createInsuranceImpactChart(this.data, 'insurance-impact-chart', 'insuranceImpactChart');
        }
        break;
    }
  }
  
  /**
   * Update the view with results data
   */
  update(data) {
    console.log('Updating Security View with data');
    this.data = data;
    
    if (!this.initialized) {
      console.warn('Security View not initialized');
      return;
    }
    
    // Update dashboard metrics
    this.updateDashboardMetrics(data);
    
    // Refresh charts in current tab
    this.refreshChartsInPanel(this.currentTab);
  }
  
  /**
   * Update dashboard metrics with calculated values
   */
  updateDashboardMetrics(data) {
    // Only proceed if we have valid data
    if (!data || !data.security) return;
    
    try {
      // Get security data for Portnox
      const securityData = data.security.portnox;
      
      if (!securityData) return;
      
      // Update security overview metrics
      const securityImprovement = document.getElementById('security-improvement');
      const zeroTrustScore = document.getElementById('zero-trust-score');
      const deviceAuthScore = document.getElementById('device-auth-score');
      const responseTime = document.getElementById('response-time');
      
      if (securityImprovement) {
        securityImprovement.textContent = `${Math.round(securityData.improvements.overall)}%`;
      }
      
      if (zeroTrustScore && securityData.securityScores) {
        zeroTrustScore.textContent = `${Math.round(securityData.securityScores.zeroTrust)}%`;
      }
      
      if (deviceAuthScore && securityData.securityScores) {
        deviceAuthScore.textContent = `${Math.round(securityData.securityScores.deviceAuth)}%`;
      }
      
      if (responseTime && securityData.securityScores) {
        responseTime.textContent = `${Math.round(securityData.securityScores.remediationSpeed)} min`;
      }
      
      // Update compliance metrics
      const complianceCoverage = document.getElementById('compliance-coverage');
      const automatedReporting = document.getElementById('automated-reporting');
      const auditReduction = document.getElementById('audit-reduction');
      const frameworkCount = document.getElementById('framework-count');
      
      if (complianceCoverage && securityData.compliance) {
        complianceCoverage.textContent = `${Math.round(securityData.compliance.coverage)}%`;
      }
      
      if (automatedReporting && securityData.compliance) {
        const automationScore = securityData.compliance.automationLevel || 85;
        automatedReporting.textContent = `${automationScore}%`;
      }
      
      if (auditReduction && securityData.compliance) {
        const reductionPercent = securityData.compliance.auditTimeReduction || 65;
        auditReduction.textContent = `${reductionPercent}%`;
      }
      
      if (frameworkCount && securityData.compliance) {
        const frameworks = securityData.compliance.frameworks || 7;
        frameworkCount.textContent = `${frameworks}+`;
      }
      
      // Update threat analysis metrics
      const threatReduction = document.getElementById('threat-reduction');
      const unauthorizedPrevention = document.getElementById('unauthorized-prevention');
      const lateralReduction = document.getElementById('lateral-reduction');
      const shadowIt = document.getElementById('shadow-it');
      
      if (threatReduction && securityData.improvements) {
        threatReduction.textContent = `${Math.round(securityData.improvements.overall)}%`;
      }
      
      if (unauthorizedPrevention && securityData.threatReduction) {
        const unauthorizedScore = securityData.threatReduction.unauthorizedAccess || 95;
        unauthorizedPrevention.textContent = `${unauthorizedScore}%`;
      }
      
      if (lateralReduction && securityData.threatReduction) {
        const lateralScore = securityData.threatReduction.lateralMovement || 90;
        lateralReduction.textContent = `${lateralScore}%`;
      }
      
      if (shadowIt && securityData.threatReduction) {
        const shadowItScore = securityData.threatReduction.shadowIt || 95;
        shadowIt.textContent = `${shadowItScore}%`;
      }
      
      // Update industry impact metrics
      const avgBreachCost = document.getElementById('avg-breach-cost');
      const healthcareBreachCost = document.getElementById('healthcare-breach-cost');
      const financialBreachCost = document.getElementById('financial-breach-cost');
      const mttiValue = document.getElementById('mtti-value');
      
      if (avgBreachCost) {
        avgBreachCost.textContent = '$4.35M';
      }
      
      if (healthcareBreachCost) {
        healthcareBreachCost.textContent = '$9.23M';
      }
      
      if (financialBreachCost) {
        financialBreachCost.textContent = '$5.97M';
      }
      
      if (mttiValue) {
        mttiValue.textContent = '287';
      }
      
    } catch (error) {
      console.error('Error updating security dashboard metrics:', error);
    }
  }
}

// Create global instance
window.securityView = new SecurityView();

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SecurityView };
}
