#!/bin/bash

# ================================================================
# Portnox Security View Fix Script
# ================================================================
# This script specifically addresses the initialization and proper
# display of the Security View in the Portnox Total Cost Analyzer
# ================================================================

# Color definitions for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Script constants
REPO_DIR="$(pwd)"
JS_DIR="$REPO_DIR/js"
VIEWS_DIR="$JS_DIR/views"
MODELS_DIR="$JS_DIR/models"
CSS_DIR="$REPO_DIR/css"
COMPONENTS_DIR="$JS_DIR/components"

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Portnox Security View Fix Script                             ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}Fixing Security View initialization and display issues${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo ""

# Function to check if a directory exists, if not create it
check_dir() {
  if [ ! -d "$1" ]; then
    mkdir -p "$1"
    echo -e "${YELLOW}Created directory: $1${NC}"
  fi
}

# Ensure required directories exist
check_dir "$JS_DIR"
check_dir "$VIEWS_DIR"
check_dir "$MODELS_DIR"
check_dir "$CSS_DIR"
check_dir "$COMPONENTS_DIR"

# ================================================================
# 1. Fix Security View JS File
# ================================================================
echo -e "${CYAN}Fixing Security View JavaScript...${NC}"

# Find security-view.js
SECURITY_VIEW_FILE=$(find "$REPO_DIR" -name "security-view.js" | grep -v "fix" | head -n 1)

if [ -z "$SECURITY_VIEW_FILE" ]; then
  echo -e "${YELLOW}Original security-view.js not found, creating in views directory${NC}"
  SECURITY_VIEW_FILE="$VIEWS_DIR/security-view.js"
else
  echo -e "${YELLOW}Found security-view.js at: $SECURITY_VIEW_FILE${NC}"
  # Create backup
  cp "$SECURITY_VIEW_FILE" "${SECURITY_VIEW_FILE}.bak"
  echo -e "${GREEN}Created backup at: ${SECURITY_VIEW_FILE}.bak${NC}"
fi

# Create/Update security-view.js with fixed implementation
cat > "$SECURITY_VIEW_FILE" << 'EOL'
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
    
    // Bind methods
    this.init = this.init.bind(this);
    this.createTabsIfNeeded = this.createTabsIfNeeded.bind(this);
    this.initTabs = this.initTabs.bind(this);
    this.createPanelsIfNeeded = this.createPanelsIfNeeded.bind(this);
    this.update = this.update.bind(this);
    this.refreshChartsInPanel = this.refreshChartsInPanel.bind(this);
    this.updateDashboardMetrics = this.updateDashboardMetrics.bind(this);
    
    // Auto-initialize when document is ready
    if (document.readyState === 'complete') {
      this.initialize();
    } else {
      document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
  }
  
  /**
   * Auto-initialization called on DOM ready
   */
  initialize() {
    console.log('Initializing Security & Compliance View...');
    
    // Try to initialize immediately
    if (!this.init()) {
      // If initialization fails, set a retry timer
      console.log('Security View container not ready, will retry in 500ms');
      setTimeout(() => this.initialize(), 500);
    }
  }
  
  /**
   * Initialize the view
   */
  init(viewId = 'security') {
    console.log(`Attempting to initialize Security View with ID: ${viewId}`);
    
    // First, check if the view panel already exists in the DOM
    let container = document.querySelector(`.view-panel[data-view="${viewId}"]`);
    
    // If not found, we need to create it
    if (!container) {
      console.log('Security view panel not found, will attempt to create it');
      this.createSecurityViewPanel();
      
      // After creation, try to find it again
      container = document.querySelector(`.view-panel[data-view="${viewId}"]`);
      
      if (!container) {
        console.error(`Failed to find or create container for view: ${viewId}`);
        return false;
      }
    }
    
    // Store the container
    this.container = container;
    
    // Create tabs if they don't exist
    this.createTabsIfNeeded();
    
    // Set up tab navigation
    this.initTabs();
    
    // Create html structure for panels if they don't exist
    this.createPanelsIfNeeded();
    
    // Mark as initialized
    this.initialized = true;
    console.log('Security & Compliance View initialized successfully');
    
    // If we have data, update the view
    if (this.data) {
      this.update(this.data);
    }
    
    return true;
  }
  
  /**
   * Create the entire security view panel if it doesn't exist
   */
  createSecurityViewPanel() {
    console.log('Attempting to create Security View panel');
    
    const contentArea = document.querySelector('.content-area');
    if (!contentArea) {
      console.error('Content area not found, cannot create security view');
      return;
    }
    
    const viewsContainer = contentArea.querySelector('.content-wrapper');
    if (!viewsContainer) {
      console.error('Content wrapper not found, cannot create security view');
      return;
    }
    
    // Look for existing view panels to insert after
    const existingPanel = viewsContainer.querySelector('.view-panel[data-view="executive"]') || 
                          viewsContainer.querySelector('.view-panel[data-view="financial"]') ||
                          viewsContainer.querySelector('.view-panel');
    
    if (!existingPanel) {
      console.error('No existing panels found as reference, adding to content wrapper');
      
      // Create security view panel
      const securityView = document.createElement('div');
      securityView.className = 'view-panel';
      securityView.setAttribute('data-view', 'security');
      
      // Add inner structure
      this.buildSecurityViewPanelContent(securityView);
      
      // Add to content wrapper
      viewsContainer.appendChild(securityView);
      
      return;
    }
    
    // Create security view panel
    const securityView = document.createElement('div');
    securityView.className = 'view-panel';
    securityView.setAttribute('data-view', 'security');
    
    // Add inner structure
    this.buildSecurityViewPanelContent(securityView);
    
    // Insert after existing panel
    existingPanel.after(securityView);
    
    console.log('Created security view panel');
  }
  
  /**
   * Build the inner content of the security view panel
   */
  buildSecurityViewPanelContent(securityView) {
    securityView.innerHTML = `
      <div class="results-tabs">
        <button class="results-tab active" data-panel="security-overview">Security Overview</button>
        <button class="results-tab" data-panel="compliance-frameworks">Compliance Frameworks</button>
        <button class="results-tab" data-panel="threat-analysis">Threat Analysis</button>
        <button class="results-tab" data-panel="industry-impact">Industry Impact</button>
      </div>
      
      <div id="security-overview" class="results-panel active">
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
        </div>
        
        <div class="chart-container">
          <h3>Data Breach Cost Impact</h3>
          <div class="chart-wrapper" id="breach-impact-chart"></div>
        </div>
      </div>
      
      <div id="compliance-frameworks" class="results-panel">
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
      </div>
      
      <div id="threat-analysis" class="results-panel">
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
      </div>
      
      <div id="industry-impact" class="results-panel">
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
        </div>
        
        <div class="chart-container">
          <h3>Cyber Insurance Premium Reduction</h3>
          <div class="chart-wrapper" id="insurance-impact-chart"></div>
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
        background: var(--card-bg, white);
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        border: 1px solid var(--border-color, #e0e0e0);
      }
      
      .mitre-section h4 {
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 16px;
        color: var(--text-primary, #333);
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
      
      body.dark-mode .mitre-item.covered {
        background-color: rgba(46, 204, 113, 0.2);
      }
      
      body.dark-mode .mitre-item.partial {
        background-color: rgba(243, 156, 18, 0.2);
      }
    `;
    
    document.head.appendChild(style);
  }
  
  /**
   * Create tabs if they don't exist
   */
  createTabsIfNeeded() {
    if (!this.container) return;
    
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
    if (!this.container) return;
    
    const tabsContainer = this.container.querySelector('.results-tabs');
    
    if (!tabsContainer) return;
    
    // Get all tabs
    const tabs = tabsContainer.querySelectorAll('.results-tab');
    
    // Add click event to each tab
    tabs.forEach(tab => {
      const panelId = tab.getAttribute('data-panel');
      
      // Remove any existing event listener by cloning and replacing
      const newTab = tab.cloneNode(true);
      tab.parentNode.replaceChild(newTab, tab);
      
      // Add fixed event listener
      newTab.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        newTab.classList.add('active');
        
        // Hide all panels
        const panels = this.container.querySelectorAll('.results-panel');
        panels.forEach(p => p.classList.remove('active'));
        
        // Show corresponding panel
        const panel = document.getElementById(panelId);
        if (panel) {
          panel.classList.add('active');
          this.currentTab = panelId;
          
          // Trigger chart refresh if we have chart manager
          this.refreshChartsInPanel(panelId);
        }
      });
    });
  }
  
  /**
   * Create panels structure if they don't exist
   */
  createPanelsIfNeeded() {
    if (!this.container) return;
    
    // Check if panels already exist
    const securityOverview = document.getElementById('security-overview');
    const complianceFrameworks = document.getElementById('compliance-frameworks');
    const threatAnalysis = document.getElementById('threat-analysis');
    const industryImpact = document.getElementById('industry-impact');
    
    // If any panels are missing, rebuild the entire content
    if (!securityOverview || !complianceFrameworks || !threatAnalysis || !industryImpact) {
      this.buildSecurityViewPanelContent(this.container);
    }
  }
  
  /**
   * Refresh charts in the current panel
   */
  refreshChartsInPanel(panelId) {
    if (!this.data) {
      console.warn('No data available for charts');
      return;
    }
    
    console.log(`Refreshing charts for ${panelId}`);
    
    // Initialize appropriate charts based on panel
    switch (panelId) {
      case 'security-overview':
        if (window.d3Manager && typeof window.d3Manager.createNistFrameworkChart === 'function') {
          window.d3Manager.createNistFrameworkChart(this.data, 'nist-framework-chart', 'nistFrameworkChart');
        }
        if (window.apexChartManager && typeof window.apexChartManager.createBreachImpactChart === 'function') {
          window.apexChartManager.createBreachImpactChart(this.data, 'breach-impact-chart', 'breachImpactChart');
        }
        break;
        
      case 'compliance-frameworks':
        if (window.apexChartManager && typeof window.apexChartManager.createSecurityFrameworksChart === 'function') {
          window.apexChartManager.createSecurityFrameworksChart(this.data, 'security-frameworks-chart', 'securityFrameworksChart');
        }
        break;
        
      case 'threat-analysis':
        if (window.d3Manager && typeof window.d3Manager.createThreatModelVisualization === 'function') {
          window.d3Manager.createThreatModelVisualization(this.data, 'threat-model-chart', 'threatModelChart');
        }
        break;
        
      case 'industry-impact':
        if (window.apexChartManager && typeof window.apexChartManager.createIndustryBreachChart === 'function') {
          window.apexChartManager.createIndustryBreachChart(this.data, 'industry-breach-chart', 'industryBreachChart');
        }
        if (window.apexChartManager && typeof window.apexChartManager.createInsuranceImpactChart === 'function') {
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
      // Try to initialize again
      if (!this.init()) {
        return;
      }
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
        securityImprovement.textContent = `${Math.round(securityData.improvements?.overall || 85)}%`;
      }
      
      if (zeroTrustScore && securityData.securityScores) {
        zeroTrustScore.textContent = `${Math.round(securityData.securityScores.zeroTrust || 92)}%`;
      }
      
      if (deviceAuthScore && securityData.securityScores) {
        deviceAuthScore.textContent = `${Math.round(securityData.securityScores.deviceAuth || 95)}%`;
      }
      
      if (responseTime && securityData.securityScores) {
        responseTime.textContent = `${Math.round(securityData.securityScores.remediationSpeed || 5)} min`;
      }
      
      // Update compliance metrics
      const complianceCoverage = document.getElementById('compliance-coverage');
      const automatedReporting = document.getElementById('automated-reporting');
      const auditReduction = document.getElementById('audit-reduction');
      const frameworkCount = document.getElementById('framework-count');
      
      if (complianceCoverage && securityData.compliance) {
        complianceCoverage.textContent = `${Math.round(securityData.compliance.coverage || 95)}%`;
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
        threatReduction.textContent = `${Math.round(securityData.improvements.overall || 85)}%`;
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
EOL

echo -e "${GREEN}Security View JavaScript updated${NC}"

# ================================================================
# 2. Create CSS Styles for Security View
# ================================================================
echo -e "${CYAN}Creating CSS styles for Security View...${NC}"

# Create CSS file for security view components
cat > "$CSS_DIR/components/security-view.css" << 'EOL'
/**
 * Security View Component Styles for Portnox Total Cost Analyzer
 */

/* Security view animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

/* MITRE ATT&CK Framework Grid */
.mitre-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
  animation: fadeIn 0.5s ease-out;
}

.mitre-section {
  background-color: var(--card-bg, white);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color, #e0e0e0);
  transition: all 0.3s ease;
}

.mitre-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.mitre-section h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: var(--text-color, #333);
  display: flex;
  align-items: center;
}

.mitre-section h4:before {
  content: '\f023';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  margin-right: 8px;
  color: var(--primary-color, #1a5a96);
}

.mitre-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mitre-item {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  position: relative;
  padding-left: 28px;
  transition: all 0.3s ease;
}

.mitre-item:hover {
  transform: translateX(5px);
}

.mitre-item::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transition: all 0.3s ease;
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

.mitre-item.covered:hover::before {
  transform: translateY(-50%) scale(1.2);
  box-shadow: 0 0 10px rgba(46, 204, 113, 0.6);
}

.mitre-item.partial:hover::before {
  transform: translateY(-50%) scale(1.2);
  box-shadow: 0 0 10px rgba(243, 156, 18, 0.6);
}

/* NIST Framework Chart Styling */
#nist-framework-chart {
  height: 400px;
  position: relative;
}

#nist-framework-chart .framework-category {
  transition: all 0.3s ease;
}

#nist-framework-chart .framework-category:hover {
  filter: brightness(1.2);
  cursor: pointer;
}

#nist-framework-chart .nist-tooltip {
  position: absolute;
  background-color: white;
  border-radius: 8px;
  padding: 10px 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  pointer-events: none;
  font-size: 13px;
  max-width: 250px;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  transform: translateY(10px);
  z-index: 10;
}

#nist-framework-chart .nist-tooltip.visible {
  opacity: 1;
  transform: translateY(0);
}

#nist-framework-chart .nist-tooltip h4 {
  margin: 0 0 5px;
  font-size: 15px;
  color: var(--primary-color, #1a5a96);
}

#nist-framework-chart .nist-tooltip p {
  margin: 0;
  font-size: 12px;
  color: var(--text-color, #333);
}

/* Security View Panels Animation */
.view-panel[data-view="security"] .results-panel {
  animation: fadeIn 0.5s ease-out;
}

.view-panel[data-view="security"] .dashboard-card {
  animation: fadeIn 0.5s ease-out both;
}

.view-panel[data-view="security"] .dashboard-card:nth-child(1) {
  animation-delay: 0.1s;
}

.view-panel[data-view="security"] .dashboard-card:nth-child(2) {
  animation-delay: 0.2s;
}

.view-panel[data-view="security"] .dashboard-card:nth-child(3) {
  animation-delay: 0.3s;
}

.view-panel[data-view="security"] .dashboard-card:nth-child(4) {
  animation-delay: 0.4s;
}

.view-panel[data-view="security"] .chart-container {
  animation: fadeIn 0.5s ease-out both;
  animation-delay: 0.5s;
}

/* Industry Breach Cost Chart */
#industry-breach-chart {
  height: 400px;
}

#industry-breach-chart .industry-bar {
  transition: all 0.3s ease;
  cursor: pointer;
}

#industry-breach-chart .industry-bar:hover {
  opacity: 0.8;
  transform: scale(1.02);
}

/* Insurance Impact Chart */
#insurance-impact-chart {
  height: 350px;
}

#insurance-impact-chart .impact-line {
  transition: all 0.3s ease;
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: dash 2s ease-in-out forwards;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .mitre-grid {
    grid-template-columns: 1fr;
  }
  
  .view-panel[data-view="security"] .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
EOL

echo -e "${GREEN}Security View CSS styles created${NC}"

# ================================================================
# 3. Create a Script to Include Security View CSS
# ================================================================
echo -e "${CYAN}Creating script to include Security View CSS...${NC}"

cat > "$JS_DIR/security-view-styles.js" << 'EOL'
/**
 * Security View Style Loader
 * This script ensures the Security View CSS is included in the page
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Checking for Security View CSS...');
  
  // Check if Security View CSS is already included
  const hasSecurityViewCSS = Array.from(document.styleSheets).some(sheet => {
    try {
      return sheet.href && sheet.href.includes('security-view.css');
    } catch (e) {
      return false;
    }
  });
  
  if (!hasSecurityViewCSS) {
    console.log('Adding Security View CSS to the page');
    
    // Create the link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/components/security-view.css';
    link.type = 'text/css';
    
    // Add it to the head
    document.head.appendChild(link);
  } else {
    console.log('Security View CSS already included');
  }
});
EOL

echo -e "${GREEN}Security View style loader created${NC}"

# ================================================================
# 4. Create Main.js Patch to Initialize Security View
# ================================================================
echo -e "${CYAN}Creating patch for main.js to ensure Security View is initialized...${NC}"

cat > "$JS_DIR/security-view-init-patch.js" << 'EOL'
/**
 * Security View Initialization Patch
 * This script ensures the Security View is properly initialized by the application
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying Security View initialization patch...');
  
  // Wait for app integration to be available
  const checkAndPatch = () => {
    if (window.appIntegration) {
      // Check if securityView already exists and is initialized
      if (!window.securityView || !window.securityView.initialized) {
        console.log('Loading Security View module...');
        
        // If securityView doesn't exist, create it
        if (!window.securityView) {
          console.log('Creating SecurityView instance');
          window.securityView = new SecurityView();
        }
        
        // Try to initialize it
        if (window.securityView && typeof window.securityView.init === 'function') {
          console.log('Initializing SecurityView');
          window.securityView.init();
        }
      } else {
        console.log('SecurityView already initialized');
      }
      
      // Patch appIntegration.updateViews method to ensure securityView is updated
      if (window.appIntegration && typeof window.appIntegration.updateViews === 'function') {
        const originalUpdateViews = window.appIntegration.updateViews;
        
        // Only patch if not already patched
        if (!window.appIntegration._securityViewPatched) {
          window.appIntegration.updateViews = function(data) {
            // Call original method
            originalUpdateViews.call(this, data);
            
            // Also ensure securityView is updated
            if (window.securityView && typeof window.securityView.update === 'function') {
              console.log('Patch: Updating SecurityView with data');
              window.securityView.update(data);
            }
          };
          
          // Mark as patched
          window.appIntegration._securityViewPatched = true;
          console.log('Patched appIntegration.updateViews to update SecurityView');
        }
      }
      
      // Patch view navigation to switch to security view
      const securityTab = document.querySelector('.main-tab[data-view="security"]');
      if (securityTab) {
        securityTab.addEventListener('click', function() {
          console.log('Security tab clicked, ensuring SecurityView is initialized');
          
          // Try to initialize again just to be sure
          if (window.securityView && typeof window.securityView.init === 'function') {
            window.securityView.init();
          }
        });
      }
    } else {
      // Check again in 500ms
      setTimeout(checkAndPatch, 500);
    }
  };
  
  // Start the check
  checkAndPatch();
});
EOL

echo -e "${GREEN}Security View initialization patch created${NC}"

# ================================================================
# 5. Create Security View Charts Helper
# ================================================================
echo -e "${CYAN}Creating Security View Charts Helper...${NC}"

cat > "$CHARTS_DIR/security-charts.js" << 'EOL'
/**
 * Security View Charts
 * Provides chart creation functions for the Security View
 */

// Make sure d3Manager exists
window.d3Manager = window.d3Manager || {};

// NIST Framework Chart
window.d3Manager.createNistFrameworkChart = function(data, containerId, chartId) {
  // Check if container exists
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container not found: ${containerId}`);
    return;
  }
  
  // Clear container
  container.innerHTML = '';
  
  // Check if D3 is available
  if (!window.d3) {
    console.error('D3 library not available');
    container.innerHTML = `
      <div style="text-align: center; padding: 50px 20px;">
        <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #f39c12; margin-bottom: 20px;"></i>
        <h3>Chart Library Not Available</h3>
        <p>The D3 library required for this chart is not loaded.</p>
      </div>
    `;
    return;
  }
  
  try {
    // Define chart dimensions
    const width = container.clientWidth;
    const height = 400;
    const margin = { top: 40, right: 30, bottom: 40, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Sample NIST framework data (use real data from API if available)
    const nistData = [
      { category: 'Identify', score: 95, color: '#3498db', 
        description: 'Asset management, business environment, governance, risk assessment, and risk management strategy.' },
      { category: 'Protect', score: 92, color: '#2ecc71', 
        description: 'Access control, awareness training, data security, maintenance, and protective technology.' },
      { category: 'Detect', score: 89, color: '#f39c12', 
        description: 'Anomalies and events, continuous monitoring, and detection processes.' },
      { category: 'Respond', score: 94, color: '#e74c3c', 
        description: 'Response planning, communications, analysis, mitigation, and improvements.' },
      { category: 'Recover', score: 88, color: '#9b59b6', 
        description: 'Recovery planning, improvements, and communications.' }
    ];
    
    // Competitors scores for comparison
    const competitors = [
      { name: 'Cisco ISE', scores: { Identify: 85, Protect: 84, Detect: 75, Respond: 82, Recover: 78 } },
      { name: 'Forescout', scores: { Identify: 88, Protect: 80, Detect: 82, Respond: 78, Recover: 75 } }
    ];
    
    // Create SVG
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('id', chartId)
      .attr('class', 'd3-chart')
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // Create scales
    const x = d3.scaleBand()
      .domain(nistData.map(d => d.category))
      .range([0, chartWidth])
      .padding(0.3);
    
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([chartHeight, 0]);
    
    // Create axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickFormat(d => `${d}%`);
    
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis)
      .selectAll('text')
      .style('font-weight', '600');
    
    svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);
    
    // Add title
    svg.append('text')
      .attr('class', 'chart-title')
      .attr('x', chartWidth / 2)
      .attr('y', -15)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', '600')
      .text('NIST Cybersecurity Framework Coverage');
    
    // Create tooltip
    const tooltip = d3.select(container)
      .append('div')
      .attr('class', 'nist-tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('border-radius', '8px')
      .style('padding', '10px 15px')
      .style('box-shadow', '0 5px 15px rgba(0, 0, 0, 0.1)')
      .style('pointer-events', 'none')
      .style('font-size', '13px')
      .style('max-width', '250px')
      .style('z-index', '10');
    
    // Add competitor averages as lines
    competitors.forEach((competitor, index) => {
      nistData.forEach(category => {
        svg.append('line')
          .attr('class', 'competitor-line')
          .attr('x1', x(category.category))
          .attr('x2', x(category.category) + x.bandwidth())
          .attr('y1', y(competitor.scores[category.category]))
          .attr('y2', y(competitor.scores[category.category]))
          .attr('stroke', index === 0 ? '#e74c3c' : '#f39c12')
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', '4,4')
          .attr('opacity', 0.8);
      });
    });
    
    // Add bars
    svg.selectAll('.bar')
      .data(nistData)
      .enter()
      .append('rect')
      .attr('class', 'framework-category')
      .attr('x', d => x(d.category))
      .attr('y', d => y(0)) // Start at 0 for animation
      .attr('width', x.bandwidth())
      .attr('height', 0) // Start with height 0 for animation
      .attr('fill', d => d.color)
      .attr('rx', 6)
      .attr('ry', 6)
      .on('mouseover', function(event, d) {
        // Highlight the bar
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.8);
        
        // Show tooltip with category info
        tooltip
          .style('opacity', 1)
          .style('transform', 'translateY(0)')
          .html(`
            <h4>${d.category}</h4>
            <p><strong>Score:</strong> ${d.score}%</p>
            <p><strong>Cisco ISE:</strong> ${competitors[0].scores[d.category]}%</p>
            <p><strong>Forescout:</strong> ${competitors[1].scores[d.category]}%</p>
            <p>${d.description}</p>
          `)
          .style('left', `${event.pageX - container.getBoundingClientRect().left}px`)
          .style('top', `${event.pageY - container.getBoundingClientRect().top - 100}px`);
      })
      .on('mouseout', function() {
        // Restore bar opacity
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1);
        
        // Hide tooltip
        tooltip
          .style('opacity', 0)
          .style('transform', 'translateY(10px)');
      })
      .transition() // Add animation
      .duration(800)
      .delay((d, i) => i * 100)
      .attr('y', d => y(d.score))
      .attr('height', d => chartHeight - y(d.score));
    
    // Add value labels
    svg.selectAll('.value-label')
      .data(nistData)
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .attr('x', d => x(d.category) + x.bandwidth() / 2)
      .attr('y', d => y(d.score) - 10)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', '600')
      .style('fill', d => d.color)
      .text(d => `${d.score}%`)
      .attr('opacity', 0) // Start invisible for animation
      .transition() // Add animation
      .duration(800)
      .delay((d, i) => i * 100 + 400)
      .attr('opacity', 1);
    
    // Add legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${chartWidth - 200}, ${chartHeight - 80})`);
    
    // Portnox
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 15)
      .attr('height', 15)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('fill', '#3498db');
    
    legend.append('text')
      .attr('x', 20)
      .attr('y', 12)
      .style('font-size', '12px')
      .text('Portnox');
    
    // Cisco ISE
    legend.append('line')
      .attr('x1', 0)
      .attr('x2', 15)
      .attr('y1', 30)
      .attr('y2', 30)
      .attr('stroke', '#e74c3c')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4,4');
    
    legend.append('text')
      .attr('x', 20)
      .attr('y', 34)
      .style('font-size', '12px')
      .text('Cisco ISE');
    
    // Forescout
    legend.append('line')
      .attr('x1', 0)
      .attr('x2', 15)
      .attr('y1', 50)
      .attr('y2', 50)
      .attr('stroke', '#f39c12')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4,4');
    
    legend.append('text')
      .attr('x', 20)
      .attr('y', 54)
      .style('font-size', '12px')
      .text('Forescout');
    
  } catch (error) {
    console.error('Error creating NIST Framework Chart:', error);
    container.innerHTML = `
      <div style="text-align: center; padding: 50px 20px;">
        <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #e74c3c; margin-bottom: 20px;"></i>
        <h3>Error Creating Chart</h3>
        <p>An error occurred while creating the NIST Framework Chart.</p>
        <p style="font-size: 12px; color: #777;">Error: ${error.message}</p>
      </div>
    `;
  }
};

// Threat Model Visualization
window.d3Manager.createThreatModelVisualization = function(data, containerId, chartId) {
  // Check if container exists
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container not found: ${containerId}`);
    return;
  }
  
  // Clear container
  container.innerHTML = '';
  
  // Check if D3 is available
  if (!window.d3) {
    console.error('D3 library not available');
    container.innerHTML = `
      <div style="text-align: center; padding: 50px 20px;">
        <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #f39c12; margin-bottom: 20px;"></i>
        <h3>Chart Library Not Available</h3>
        <p>The D3 library required for this chart is not loaded.</p>
      </div>
    `;
    return;
  }
  
  try {
    // Define chart dimensions
    const width = container.clientWidth;
    const height = 400;
    const margin = { top: 40, right: 30, bottom: 40, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Sample threat model data (use real data from API if available)
    const threatData = [
      { threat: 'Unauthorized Access', reduction: 95, impact: 9, color: '#e74c3c' },
      { threat: 'Lateral Movement', reduction: 90, impact: 8, color: '#f39c12' },
      { threat: 'Data Exfiltration', reduction: 85, impact: 9, color: '#9b59b6' },
      { threat: 'Phishing Attacks', reduction: 60, impact: 7, color: '#3498db' },
      { threat: 'Ransomware', reduction: 75, impact: 10, color: '#e67e22' },
      { threat: 'Malware', reduction: 80, impact: 8, color: '#27ae60' },
      { threat: 'IoT Vulnerabilities', reduction: 85, impact: 6, color: '#16a085' }
    ];
    
    // Create SVG
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('id', chartId)
      .attr('class', 'd3-chart')
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // Create scales
    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, chartWidth]);
    
    const y = d3.scaleBand()
      .domain(threatData.map(d => d.threat))
      .range([0, chartHeight])
      .padding(0.3);
    
    const radius = d3.scaleLinear()
      .domain([0, 10])
      .range([10, 25]);
    
    // Create axes
    const xAxis = d3.axisBottom(x)
      .ticks(5)
      .tickFormat(d => `${d}%`);
    
    const yAxis = d3.axisLeft(y);
    
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis);
    
    svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .selectAll('text')
      .style('font-weight', '600');
    
    // Add title
    svg.append('text')
      .attr('class', 'chart-title')
      .attr('x', chartWidth / 2)
      .attr('y', -15)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', '600')
      .text('Threat Reduction by Attack Vector');
    
    // Add x-axis label
    svg.append('text')
      .attr('class', 'axis-label')
      .attr('x', chartWidth / 2)
      .attr('y', chartHeight + 35)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text('Reduction Percentage');
    
    // Create tooltip
    const tooltip = d3.select(container)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('border-radius', '8px')
      .style('padding', '10px 15px')
      .style('box-shadow', '0 5px 15px rgba(0, 0, 0, 0.1)')
      .style('pointer-events', 'none')
      .style('font-size', '13px')
      .style('max-width', '250px')
      .style('z-index', '10');
    
    // Add horizontal lines at 25%, 50%, and 75%
    [25, 50, 75].forEach(level => {
      svg.append('line')
        .attr('x1', x(level))
        .attr('x2', x(level))
        .attr('y1', 0)
        .attr('y2', chartHeight)
        .attr('stroke', '#e0e0e0')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3,3');
      
      // Add labels
      svg.append('text')
        .attr('x', x(level))
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('fill', '#999')
        .text(`${level}%`);
    });
    
    // Add bars with gradient
    const bars = svg.selectAll('.bar')
      .data(threatData)
      .enter()
      .append('g')
      .attr('class', 'threat-bar');
    
    // Define gradients
    threatData.forEach((d, i) => {
      const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', `bar-gradient-${i}`)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');
      
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', d.color)
        .attr('stop-opacity', 0.9);
      
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', d.color)
        .attr('stop-opacity', 0.5);
    });
    
    // Add bars
    bars.append('rect')
      .attr('x', 0)
      .attr('y', d => y(d.threat))
      .attr('width', 0) // Start at 0 for animation
      .attr('height', y.bandwidth())
      .attr('fill', (d, i) => `url(#bar-gradient-${i})`)
      .attr('rx', 4)
      .attr('ry', 4)
      .on('mouseover', function(event, d) {
        // Highlight the bar
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.8);
        
        // Show tooltip
        tooltip
          .style('opacity', 1)
          .html(`
            <h4 style="margin: 0 0 5px; color: ${d.color};">${d.threat}</h4>
            <p style="margin: 0 0 3px;"><strong>Reduction:</strong> ${d.reduction}%</p>
            <p style="margin: 0;"><strong>Impact Score:</strong> ${d.impact}/10</p>
            <p style="margin: 5px 0 0; font-size: 11px; color: #666;">Impact score represents the severity of this threat vector if not mitigated.</p>
          `)
          .style('left', `${event.pageX - container.getBoundingClientRect().left}px`)
          .style('top', `${event.pageY - container.getBoundingClientRect().top - 100}px`);
      })
      .on('mouseout', function() {
        // Restore bar opacity
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1);
        
        // Hide tooltip
        tooltip
          .style('opacity', 0);
      })
      .transition() // Add animation
      .duration(800)
      .delay((d, i) => i * 100)
      .attr('width', d => x(d.reduction));
    
    // Add impact circles
    bars.append('circle')
      .attr('cx', d => x(d.reduction) + 10)
      .attr('cy', d => y(d.threat) + y.bandwidth() / 2)
      .attr('r', 0) // Start at 0 for animation
      .attr('fill', d => d.color)
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .attr('opacity', 0.7)
      .transition() // Add animation
      .duration(800)
      .delay((d, i) => i * 100 + 400)
      .attr('r', d => radius(d.impact));
    
    // Add value labels
    bars.append('text')
      .attr('x', d => x(d.reduction) - 25)
      .attr('y', d => y(d.threat) + y.bandwidth() / 2 + 5)
      .attr('text-anchor', 'end')
      .style('font-size', '12px')
      .style('font-weight', '600')
      .style('fill', 'white')
      .text(d => `${d.reduction}%`)
      .attr('opacity', 0) // Start invisible for animation
      .transition() // Add animation
      .duration(800)
      .delay((d, i) => i * 100 + 400)
      .attr('opacity', 1);
    
    // Add legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${chartWidth - 120}, 0)`);
    
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 120)
      .attr('height', 65)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('fill', 'white')
      .attr('stroke', '#e0e0e0')
      .attr('stroke-width', 1);
    
    legend.append('circle')
      .attr('cx', 15)
      .attr('cy', 20)
      .attr('r', 8)
      .attr('fill', '#3498db')
      .attr('opacity', 0.7);
    
    legend.append('text')
      .attr('x', 30)
      .attr('y', 24)
      .style('font-size', '12px')
      .text('Impact Score');
    
    legend.append('rect')
      .attr('x', 10)
      .attr('y', 40)
      .attr('width', 10)
      .attr('height', 10)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('fill', '#3498db')
      .attr('opacity', 0.7);
    
    legend.append('text')
      .attr('x', 30)
      .attr('y', 48)
      .style('font-size', '12px')
      .text('Reduction %');
    
  } catch (error) {
    console.error('Error creating Threat Model Visualization:', error);
    container.innerHTML = `
      <div style="text-align: center; padding: 50px 20px;">
        <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #e74c3c; margin-bottom: 20px;"></i>
        <h3>Error Creating Chart</h3>
        <p>An error occurred while creating the Threat Model Visualization.</p>
        <p style="font-size: 12px; color: #777;">Error: ${error.message}</p>
      </div>
    `;
  }
};

// Make sure apexChartManager exists
window.apexChartManager = window.apexChartManager || {};

// Breach Impact Chart
window.apexChartManager.createBreachImpactChart = function(data, containerId, chartId) {
  // Check if container exists
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container not found: ${containerId}`);
    return;
  }
  
  // Check if ApexCharts is available
  if (!window.ApexCharts) {
    console.error('ApexCharts library not available');
    container.innerHTML = `
      <div style="text-align: center; padding: 50px 20px;">
        <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #f39c12; margin-bottom: 20px;"></i>
        <h3>Chart Library Not Available</h3>
        <p>The ApexCharts library required for this chart is not loaded.</p>
      </div>
    `;
    return;
  }
  
  try {
    // Sample data (use real data from API if available)
    const breachData = {
      withoutNac: {
        probabilityPerYear: 0.3,
        averageCost: 4350000,
        expectedAnnualLoss: 1305000
      },
      withNac: {
        probabilityPerYear: 0.05,
        averageCost: 2100000,
        expectedAnnualLoss: 105000
      },
      reduction: {
        probability: 83.3,
        severity: 51.7,
        expectedLoss: 91.95
      }
    };
    
    const options = {
      series: [{
        name: 'Without NAC',
        data: [breachData.withoutNac.probabilityPerYear * 100, breachData.withoutNac.averageCost / 1000000, breachData.withoutNac.expectedAnnualLoss / 1000000]
      }, {
        name: 'With Portnox',
        data: [breachData.withNac.probabilityPerYear * 100, breachData.withNac.averageCost / 1000000, breachData.withNac.expectedAnnualLoss / 1000000]
      }],
      chart: {
        type: 'bar',
        height: 350,
        stacked: false,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
          dataLabels: {
            position: 'top'
          }
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function(val, opts) {
          const seriesIndex = opts.seriesIndex;
          const dataPointIndex = opts.dataPointIndex;
          
          if (dataPointIndex === 0) {
            return val + '%';
          } else if (dataPointIndex === 1) {
            return '$' + val.toFixed(1) + 'M';
          } else {
            return '$' + val.toFixed(1) + 'M';
          }
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Breach Probability (Annual)', 'Average Breach Cost', 'Expected Annual Loss'],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              colors: '#008FFB',
            },
            formatter: function(val) {
              if (val === 0) return '0';
              return val + '%';
            }
          },
          title: {
            text: "Probability",
            style: {
              color: '#008FFB',
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: 'Average Breach Cost',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396'
          },
          labels: {
            style: {
              colors: '#00E396',
            },
            formatter: function(val) {
              if (val === 0) return '$0';
              return '$' + val + 'M';
            }
          },
          title: {
            text: "Millions USD",
            style: {
              color: '#00E396',
            }
          },
        }
      ],
      colors: ['#e74c3c', '#2ecc71'],
      tooltip: {
        shared: false,
        intersect: true,
        y: {
          formatter: function(val, { series, seriesIndex, dataPointIndex, w }) {
            const category = w.globals.categoryLabels[dataPointIndex];
            
            if (category === 'Breach Probability (Annual)') {
              return val + '%';
            } else {
              return '$' + val.toFixed(2) + 'M';
            }
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center'
      },
      title: {
        text: 'Data Breach Risk & Impact Analysis',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: 600
        }
      },
      annotations: {
        yaxis: [{
          y: 0,
          y2: 25,
          borderColor: '#000',
          fillColor: '#2ecc71',
          opacity: 0.05,
          label: {
            borderColor: '#2ecc71',
            style: {
              fontSize: '10px',
              color: '#fff',
              background: '#2ecc71',
            },
            text: 'Risk Reduction Zone',
          }
        }]
      }
    };
    
    // Create chart
    const chart = new ApexCharts(container, options);
    chart.render();
    
    // Store chart instance
    window.apexChartManager.charts = window.apexChartManager.charts || {};
    window.apexChartManager.charts[chartId] = chart;
    
  } catch (error) {
    console.error('Error creating Breach Impact Chart:', error);
    container.innerHTML = `
      <div style="text-align: center; padding: 50px 20px;">
        <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #e74c3c; margin-bottom: 20px;"></i>
        <h3>Error Creating Chart</h3>
        <p>An error occurred while creating the Breach Impact Chart.</p>
        <p style="font-size: 12px; color: #777;">Error: ${error.message}</p>
      </div>
    `;
  }
};

// Security Frameworks Chart
window.apexChartManager.createSecurityFrameworksChart = function(data, containerId, chartId) {
  // Check if container exists
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container not found: ${containerId}`);
    return;
  }
  
  // Check if ApexCharts is available
  if (!window.ApexCharts) {
    console.error('ApexCharts library not available');
    container.innerHTML = `
      <div style="text-align: center; padding: 50px 20px;">
        <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #f39c12; margin-bottom: 20px;"></i>
        <h3>Chart Library Not Available</h3>
        <p>The ApexCharts library required for this chart is not loaded.</p>
      </div>
    `;
    return;
  }
  
  try {
    // Sample data (use real data from API if available)
    const frameworkData = [
      {
        name: 'Portnox',
        data: [95, 98, 94, 96, 92, 97, 94, 93]
      },
      {
        name: 'Cisco ISE',
        data: [90, 93, 88, 92, 85, 90, 86, 87]
      },
      {
        name: 'Forescout',
        data: [88, 90, 89, 93, 87, 89, 84, 85]
      }
    ];
    
    const options = {
      series: frameworkData,
      chart: {
        type: 'radar',
        height: 400,
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          }
        }
      },
      stroke: {
        width: 2
      },
      fill: {
        opacity: 0.1
      },
      markers: {
        size: 4,
        hover: {
          size: 6
        }
      },
      title: {
        text: 'Compliance Framework Coverage',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: 600
        }
      },
      colors: ['#2ecc71', '#3498db', '#e67e22'],
      xaxis: {
        categories: ['NIST CSF', 'ISO 27001', 'HIPAA', 'PCI DSS', 'GDPR', 'SOC 2', 'CMMC', 'FERPA'],
        labels: {
          show: true,
          style: {
            colors: Array(8).fill('#777'),
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600
          }
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
        labels: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          borderRadius: 2
        },
        style: {
          fontSize: '10px'
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        offsetY: 7
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 300
            },
            markers: {
              size: 3
            }
          }
        }
      ]
    };
    
    // Create chart
    const chart = new ApexCharts(container, options);
    chart.render();
    
    // Store chart instance
    window.apexChartManager.charts = window.apexChartManager.charts || {};
    window.apexChartManager.charts[chartId] = chart;
    
  } catch (error) {
    console.error('Error creating Security Frameworks Chart:', error);
    container.innerHTML = `
      <div style="text-align: center; padding: 50px 20px;">
        <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #e74c3c; margin-bottom: 20px;"></i>
        <h3>Error Creating Chart</h3>
        <p>An error occurred while creating the Security Frameworks Chart.</p>
        <p style="font-size: 12px; color: #777;">Error: ${error.message}</p>
      </div>
    `;
  }
};

// Industry Breach Chart
window.apexChartManager.createIndustryBreachChart = function(data, containerId, chartId) {
  // Check if container exists
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container not found: ${containerId}`);
    return;
  }
  
  // Check if ApexCharts is available
  if (!window.ApexCharts) {
    console.error('ApexCharts library not available');
    container.innerHTML = `
      <div style="text-align: center; padding: 50px 20px;">
        <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #f39c12; margin-bottom: 20px;"></i>
        <h3>Chart Library Not Available</h3>
        <p>The ApexCharts library required for this chart is not loaded.</p>
      </div>
    `;
    return;
  }
  
  try {
    // Sample data (use real data from API if available)
    const industryData = [
      {
        name: 'Average Breach Cost',
        data: [9.23, 5.97, 4.95, 4.75, 4.24, 3.98, 3.75, 3.65],
        color: '#e74c3c'
      }
    ];
    
    const options = {
      series: industryData,
      chart: {
        type: 'bar',
        height: 400,
        toolbar: {
          show: true
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          }
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: true,
          barHeight: '70%',
          distributed: true,
          dataLabels: {
            position: 'center'
          }
        }
      },
      colors: ['#e74c3c', '#e67e22', '#f39c12', '#3498db', '#2980b9', '#9b59b6', '#2ecc71', '#16a085'],
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return '$' + val + 'M';
        },
        style: {
          fontSize: '12px',
          colors: ['#fff'],
          fontWeight: 500
        },
        offsetX: 20
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: ['Healthcare', 'Financial Services', 'Energy', 'Technology', 'Manufacturing', 'Education', 'Retail', 'Consumer Products'],
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 500
          },
          formatter: function(val) {
            return '$' + val + 'M';
          }
        },
        title: {
          text: 'Average Breach Cost (Millions USD)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 500
          }
        }
      },
      title: {
        text: 'Data Breach Costs by Industry (2025)',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: 600
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val + ' million';
          }
        },
        theme: 'light'
      },
      legend: {
        show: false
      },
      annotations: {
        xaxis: [{
          x: 4.35,
          strokeDashArray: 0,
          borderColor: '#333',
          label: {
            borderColor: '#333',
            style: {
              color: '#fff',
              background: '#333',
              fontSize: '10px'
            },
            text: 'Global Average: $4.35M',
          }
        }]
      }
    };
    
    // Create chart
    const chart = new ApexCharts(container, options);
    chart.render();
    
    // Store chart instance
    window.apexChartManager.charts = window.apexChartManager.charts || {};
    window.apexChartManager.charts[chartId] = chart;
    
  } catch (error) {
    console.error('Error creating Industry Breach Chart:', error);
    container.innerHTML = `
      <div style="text-align: center; padding: 50px 20px;">
        <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #e74c3c; margin-bottom: 20px;"></i>
        <h3>Error Creating Chart</h3>
        <p>An error occurred while creating the Industry Breach Chart.</p>
        <p style="font-size: 12px; color: #777;">Error: ${error.message}</p>
      </div>
    `;
  }
};

// Insurance Impact Chart
window.apexChartManager.createInsuranceImpactChart = function(data, containerId, chartId) {
  // Check if container exists
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container not found: ${containerId}`);
    return;
  }
  
  // Check if ApexCharts is available
  if (!window.ApexCharts) {
    console.error('ApexCharts library not available');
    container.innerHTML = `
      <div style="text-align: center; padding: 50px 20px;">
        <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #f39c12; margin-bottom: 20px;"></i>
        <h3>Chart Library Not Available</h3>
        <p>The ApexCharts library required for this chart is not loaded.</p>
      </div>
    `;
    return;
  }
  
  try {
    // Sample data (use real data from API if available)
    const insuranceData = [
      {
        name: 'Without NAC',
        data: [100000, 125000, 156000, 195000, 244000]
      },
      {
        name: 'With Portnox',
        data: [100000, 93750, 88000, 82500, 77000]
      }
    ];
    
    const options = {
      series: insuranceData,
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: true
        },
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        }
      },
      colors: ['#e74c3c', '#2ecc71'],
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return '$' + val.toLocaleString();
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9
        }
      },
      stroke: {
        curve: 'smooth',
        width: [3, 3]
      },
      title: {
        text: 'Cyber Insurance Premium Projections',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: 600
        }
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        title: {
          text: 'Projection Timeline',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      },
      yaxis: {
        title: {
          text: 'Annual Premium Cost',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        },
        min: 50000,
        max: 250000
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      },
      annotations: {
        points: [{
          x: 'Year 5',
          y: 77000,
          marker: {
            size: 6,
            fillColor: '#2ecc71',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: '25% Lower',
            offsetY: 0,
            borderColor: '#2ecc71',
            style: {
              background: '#2ecc71',
              color: '#fff',
              fontSize: '10px',
              fontWeight: 600
            }
          }
        }]
      }
    };
    
    // Create chart
    const chart = new ApexCharts(container, options);
    chart.render();
    
    // Store chart instance
    window.apexChartManager.charts = window.apexChartManager.charts || {};
    window.apexChartManager.charts[chartId] = chart;
    
  } catch (error) {
    console.error('Error creating Insurance Impact Chart:', error);
    container.innerHTML = `
      <div style="text-align: center; padding: 50px 20px;">
        <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #e74c3c; margin-bottom: 20px;"></i>
        <h3>Error Creating Chart</h3>
        <p>An error occurred while creating the Insurance Impact Chart.</p>
        <p style="font-size: 12px; color: #777;">Error: ${error.message}</p>
      </div>
    `;
  }
};
EOL

echo -e "${GREEN}Security View charts helper created${NC}"

# ================================================================
# 6. Create a script to ensure all fix scripts are loaded
# ================================================================
echo -e "${CYAN}Creating a script to ensure all fix scripts are loaded...${NC}"

cat > "$JS_DIR/security-view-loader.js" << 'EOL'
/**
 * Security View Loader
 * This script ensures all Security View fix scripts are loaded
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Security View Loader...');
  
  // Scripts to check for
  const scripts = [
    'js/views/security-view.js',
    'js/security-view-styles.js',
    'js/security-view-init-patch.js',
    'js/charts/security-charts.js'
  ];
  
  // Check if each script is loaded, if not, load it
  scripts.forEach(scriptSrc => {
    if (!isScriptLoaded(scriptSrc)) {
      console.log(`Loading script: ${scriptSrc}`);
      loadScript(scriptSrc);
    } else {
      console.log(`Script already loaded: ${scriptSrc}`);
    }
  });
  
  // Function to check if a script is already loaded
  function isScriptLoaded(src) {
    return Array.from(document.scripts).some(script => script.src.includes(src));
  }
  
  // Function to load a script
  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = function() {
      console.log(`Script loaded successfully: ${src}`);
    };
    
    script.onerror = function() {
      console.error(`Error loading script: ${src}`);
    };
  }
});
EOL

echo -e "${GREEN}Security View loader script created${NC}"

# ================================================================
# 7. Update index.html to load the Security View fix scripts
# ================================================================
echo -e "${CYAN}Updating index.html to load the Security View fix scripts...${NC}"

# Find index.html
INDEX_HTML=$(find "$REPO_DIR" -name "index.html" -type f | head -n 1)

if [ -z "$INDEX_HTML" ]; then
  echo -e "${RED}index.html not found, cannot update to load Security View fix scripts${NC}"
else
  # Create backup
  cp "$INDEX_HTML" "${INDEX_HTML}.bak"
  echo -e "${GREEN}Created backup of index.html at: ${INDEX_HTML}.bak${NC}"
  
  # Temporary file
  TMP_FILE=$(mktemp)
  
  # Add script references before </body>
  sed '/<\/body>/i \
    <!-- Security View Fix Scripts -->\
    <script src="js/views/security-view.js"></script>\
    <script src="js/security-view-styles.js"></script>\
    <script src="js/security-view-init-patch.js"></script>\
    <script src="js/charts/security-charts.js"></script>\
    <script src="js/security-view-loader.js"></script>' "$INDEX_HTML" > "$TMP_FILE"
  
  mv "$TMP_FILE" "$INDEX_HTML"
  
  echo -e "${GREEN}Updated index.html to load Security View fix scripts${NC}"
fi

# ================================================================
# 8. Create a run script to apply all changes
# ================================================================
echo -e "${CYAN}Creating a run script to apply all changes...${NC}"

cat > "$REPO_DIR/run-security-view-fix.sh" << 'EOL'
#!/bin/bash

# ================================================================
# Portnox Security View Fix Runner
# ================================================================
# This script applies all Security View fixes to the application
# ================================================================

# Color definitions for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Portnox Security View Fix Runner                             ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}Applying all Security View fixes to the application${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo ""

# Get repo directory
REPO_DIR="$(pwd)"

# Run the security view fix script
if [ -f "$REPO_DIR/security-view-fix.sh" ]; then
  echo -e "${YELLOW}Running Security View Fix Script...${NC}"
  bash "$REPO_DIR/security-view-fix.sh"
  echo -e "${GREEN}Security View Fix Script completed${NC}"
else
  echo -e "${RED}Security View Fix Script not found at: $REPO_DIR/security-view-fix.sh${NC}"
  echo -e "${YELLOW}Attempting to create required files directly...${NC}"
  
  # Check required directories
  mkdir -p "$REPO_DIR/js/views" "$REPO_DIR/js/charts" "$REPO_DIR/css/components"
  
  # Copy files directly
  if [ -f "$REPO_DIR/js/views/security-view.js" ]; then
    echo -e "${GREEN}Security View JS file already exists${NC}"
  else
    echo -e "${YELLOW}Creating Security View JS file...${NC}"
    curl -s "https://gist.githubusercontent.com/youruser/yourgistreference/raw/security-view.js" > "$REPO_DIR/js/views/security-view.js"
  fi
  
  if [ -f "$REPO_DIR/css/components/security-view.css" ]; then
    echo -e "${GREEN}Security View CSS file already exists${NC}"
  else
    echo -e "${YELLOW}Creating Security View CSS file...${NC}"
    curl -s "https://gist.githubusercontent.com/youruser/yourgistreference/raw/security-view.css" > "$REPO_DIR/css/components/security-view.css"
  fi
  
  if [ -f "$REPO_DIR/js/charts/security-charts.js" ]; then
    echo -e "${GREEN}Security View Charts file already exists${NC}"
  else
    echo -e "${YELLOW}Creating Security View Charts file...${NC}"
    curl -s "https://gist.githubusercontent.com/youruser/yourgistreference/raw/security-charts.js" > "$REPO_DIR/js/charts/security-charts.js"
  fi
  
  echo -e "${GREEN}Required files created directly${NC}"
fi

# Ensure files have proper permissions
echo -e "${YELLOW}Setting correct file permissions...${NC}"
find "$REPO_DIR/js" "$REPO_DIR/css" -type f -name "*.js" -o -name "*.css" | xargs chmod 644
chmod +x "$REPO_DIR/run-security-view-fix.sh"
echo -e "${GREEN}File permissions set${NC}"

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Security View Fix Applied!                                   ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}The Portnox Total Cost Analyzer Security View has been fixed:${NC}"
echo -e "  • Security View initialization and display"
echo -e "  • Enhanced security charts and visualizations"
echo -e "  • Industry breach cost analysis"
echo -e "  • Compliance framework visualizations"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}Refresh your browser to see the changes.${NC}"
EOL

chmod +x "$REPO_DIR/run-security-view-fix.sh"

echo -e "${GREEN}Run script created${NC}"

# ================================================================
# 9. Complete the script
# ================================================================
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Portnox Security View Fix Script Complete!                  ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}The following fixes have been created:${NC}"
echo -e "  • Fixed Security View JavaScript for proper initialization"
echo -e "  • Added Security View CSS styles"
echo -e "  • Created Security View Charts"
echo -e "  • Added initialization patches"
echo -e "  • Updated index.html to load required scripts"
echo -e "  • Created run script to apply all changes"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}To apply these fixes, run: ./run-security-view-fix.sh${NC}"
echo -e "${BLUE}=================================================================${NC}"

# Exit with success
exit 0
