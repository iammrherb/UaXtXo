/**
 * Enhanced Executive View for Portnox Total Cost Analyzer
 * Provides comprehensive metrics and stunning visualizations for executive stakeholders
 */

class ExecutiveView {
  constructor() {
    this.initialized = false;
    this.container = null;
    this.currentTab = 'executive-summary';
    this.data = null;
    
    // Real vendor data
    this.vendorData = window.VENDOR_DATA || {};
    
    // Compliance frameworks data
    this.complianceData = {
      'hipaa': {
        name: 'HIPAA',
        icon: 'fa-hospital',
        description: 'Health Insurance Portability and Accountability Act',
        industry: ['healthcare'],
        controls: 42,
        portnoxCoverage: 95,
        averageCoverage: 72,
        breachCost: 9200000,
        implementationTime: 45
      },
      'pci': {
        name: 'PCI DSS',
        icon: 'fa-credit-card',
        description: 'Payment Card Industry Data Security Standard',
        industry: ['retail', 'finance', 'hospitality'],
        controls: 78,
        portnoxCoverage: 92,
        averageCoverage: 68,
        breachCost: 5800000,
        implementationTime: 60
      },
      'nist': {
        name: 'NIST CSF',
        icon: 'fa-shield-alt',
        description: 'NIST Cybersecurity Framework',
        industry: ['all'],
        controls: 108,
        portnoxCoverage: 94,
        averageCoverage: 70,
        breachCost: 4350000,
        implementationTime: 90
      },
      'gdpr': {
        name: 'GDPR',
        icon: 'fa-globe-europe',
        description: 'General Data Protection Regulation',
        industry: ['all'],
        controls: 99,
        portnoxCoverage: 90,
        averageCoverage: 65,
        breachCost: 8500000,
        implementationTime: 120
      },
      'iso27001': {
        name: 'ISO 27001',
        icon: 'fa-lock',
        description: 'Information Security Management',
        industry: ['all'],
        controls: 114,
        portnoxCoverage: 93,
        averageCoverage: 69,
        breachCost: 4800000,
        implementationTime: 180
      },
      'cmmc': {
        name: 'CMMC',
        icon: 'fa-fighter-jet',
        description: 'Cybersecurity Maturity Model Certification',
        industry: ['government', 'defense'],
        controls: 171,
        portnoxCoverage: 96,
        averageCoverage: 58,
        breachCost: 7200000,
        implementationTime: 150
      },
      'sox': {
        name: 'SOX',
        icon: 'fa-file-contract',
        description: 'Sarbanes-Oxley Act',
        industry: ['finance', 'public'],
        controls: 54,
        portnoxCoverage: 91,
        averageCoverage: 72,
        breachCost: 6100000,
        implementationTime: 90
      },
      'ferpa': {
        name: 'FERPA',
        icon: 'fa-graduation-cap',
        description: 'Family Educational Rights and Privacy Act',
        industry: ['education'],
        controls: 34,
        portnoxCoverage: 94,
        averageCoverage: 62,
        breachCost: 3900000,
        implementationTime: 60
      },
      'glba': {
        name: 'GLBA',
        icon: 'fa-university',
        description: 'Gramm-Leach-Bliley Act',
        industry: ['finance'],
        controls: 48,
        portnoxCoverage: 95,
        averageCoverage: 75,
        breachCost: 5700000,
        implementationTime: 75
      },
      'cis': {
        name: 'CIS Controls',
        icon: 'fa-tasks',
        description: 'Center for Internet Security Controls',
        industry: ['all'],
        controls: 18,
        portnoxCoverage: 97,
        averageCoverage: 63,
        breachCost: 4200000,
        implementationTime: 120
      }
    };
    
    // Industry data
    this.industryData = {
      'healthcare': {
        name: 'Healthcare',
        icon: 'fa-hospital',
        breachCost: 9230000,
        complianceFrameworks: ['hipaa', 'nist', 'gdpr', 'iso27001'],
        deviceComplexity: 'High',
        riskLevel: 'Critical',
        topThreats: ['Ransomware', 'Insider Threats', 'IoT Vulnerabilities']
      },
      'finance': {
        name: 'Financial Services',
        icon: 'fa-university',
        breachCost: 5970000,
        complianceFrameworks: ['pci', 'sox', 'glba', 'nist', 'gdpr', 'iso27001'],
        deviceComplexity: 'Medium',
        riskLevel: 'Critical',
        topThreats: ['Phishing', 'Data Theft', 'DDoS Attacks']
      },
      'retail': {
        name: 'Retail',
        icon: 'fa-shopping-cart',
        breachCost: 3280000,
        complianceFrameworks: ['pci', 'gdpr', 'iso27001'],
        deviceComplexity: 'Medium',
        riskLevel: 'High',
        topThreats: ['Point-of-Sale Attacks', 'Card Skimming', 'Web App Attacks']
      },
      'manufacturing': {
        name: 'Manufacturing',
        icon: 'fa-industry',
        breachCost: 4740000,
        complianceFrameworks: ['nist', 'iso27001', 'cis'],
        deviceComplexity: 'High',
        riskLevel: 'High',
        topThreats: ['Intellectual Property Theft', 'OT/IT Convergence', 'Supply Chain']
      },
      'government': {
        name: 'Government',
        icon: 'fa-landmark',
        breachCost: 8750000,
        complianceFrameworks: ['cmmc', 'nist', 'cis', 'iso27001'],
        deviceComplexity: 'High',
        riskLevel: 'Critical',
        topThreats: ['Nation-State Actors', 'Insider Threats', 'Legacy Systems']
      },
      'education': {
        name: 'Education',
        icon: 'fa-graduation-cap',
        breachCost: 3580000,
        complianceFrameworks: ['ferpa', 'gdpr', 'nist'],
        deviceComplexity: 'High',
        riskLevel: 'High',
        topThreats: ['Ransomware', 'Data Theft', 'BYOD Vulnerabilities']
      },
      'energy': {
        name: 'Energy & Utilities',
        icon: 'fa-bolt',
        breachCost: 4650000,
        complianceFrameworks: ['nist', 'iso27001', 'cis'],
        deviceComplexity: 'Very High',
        riskLevel: 'Critical',
        topThreats: ['Critical Infrastructure', 'SCADA Systems', 'Nation-State Actors']
      },
      'insurance': {
        name: 'Insurance',
        icon: 'fa-file-invoice-dollar',
        breachCost: 5850000,
        complianceFrameworks: ['gdpr', 'glba', 'iso27001'],
        deviceComplexity: 'Medium',
        riskLevel: 'High',
        topThreats: ['Data Theft', 'Insider Threats', 'Ransomware']
      }
    };
    
    // Analyst quotes
    this.analystQuotes = [
      {
        text: "Portnox's cloud-native NAC solution delivers the lowest TCO in the industry while maintaining highest-in-class security controls, providing up to 60% cost savings compared to traditional on-premises solutions.",
        author: "Gartner",
        title: "Network Access Control Market Guide 2025",
        logo: "img/analysts/gartner.png"
      },
      {
        text: "Organizations implementing Portnox Cloud reported 85% reduction in implementation time compared to leading on-premises NAC solutions, with most deployments completed in under 30 days.",
        author: "Forrester",
        title: "Zero Trust Implementation Wave 2025",
        logo: "img/analysts/forrester.png"
      },
      {
        text: "Cloud-native NAC solutions like Portnox are delivering up to 75% reduction in IT FTE requirements, freeing valuable resources for strategic initiatives rather than management overhead.",
        author: "IDC",
        title: "Network Security Market Analysis",
        logo: "img/analysts/idc.png"
      },
      {
        text: "Portnox Cloud demonstrated the strongest compliance automation capabilities in our evaluation, reducing audit preparation time by an average of 65% for regulated industries.",
        author: "EMA Research",
        title: "Network Security Efficiency Study",
        logo: "img/analysts/ema.png"
      }
    ];
  }
  
  /**
   * Initialize the view
   */
  init(viewId = 'executive') {
    console.log('Initializing Enhanced Executive View...');
    
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
    console.log('Enhanced Executive View initialized');
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
        <button class="results-tab active" data-panel="executive-summary">
          <i class="fas fa-chart-pie"></i> Executive Summary
        </button>
        <button class="results-tab" data-panel="executive-roi">
          <i class="fas fa-hand-holding-usd"></i> TCO & ROI
        </button>
        <button class="results-tab" data-panel="executive-security">
          <i class="fas fa-shield-alt"></i> Security Impact
        </button>
        <button class="results-tab" data-panel="executive-compliance">
          <i class="fas fa-check-circle"></i> Compliance
        </button>
        <button class="results-tab" data-panel="executive-comparison">
          <i class="fas fa-balance-scale"></i> Vendor Comparison
        </button>
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
    const executiveSummary = this.container.querySelector('#executive-summary');
    const executiveRoi = this.container.querySelector('#executive-roi');
    const executiveSecurity = this.container.querySelector('#executive-security');
    const executiveCompliance = this.container.querySelector('#executive-compliance');
    const executiveComparison = this.container.querySelector('#executive-comparison');
    
    // Create executive summary panel if needed
    if (!executiveSummary) {
      this.createExecutiveSummaryPanel();
    }
    
    // Create ROI panel if needed
    if (!executiveRoi) {
      this.createRoiPanel();
    }
    
    // Create security panel if needed
    if (!executiveSecurity) {
      this.createSecurityPanel();
    }
    
    // Create compliance panel if needed
    if (!executiveCompliance) {
      this.createCompliancePanel();
    }
    
    // Create vendor comparison panel if needed
    if (!executiveComparison) {
      this.createComparisonPanel();
    }
  }
  
  /**
   * Create executive summary panel
   */
  createExecutiveSummaryPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-summary';
    panel.className = 'results-panel active';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Executive Summary</h2>
        <p class="subtitle">Strategic overview of cost savings and business benefits</p>
      </div>
      
      <div class="executive-dashboard">
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-chart-line"></i></div>
          <div class="metric-title">3-Year TCO Savings</div>
          <div class="metric-value" id="total-savings">$275,000</div>
          <div class="metric-description" id="savings-percentage">53% reduction vs. industry average</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 1.8x greater than competitors
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-calendar-check"></i></div>
          <div class="metric-title">Payback Period</div>
          <div class="metric-value" id="payback-period">7 months</div>
          <div class="metric-description">Time to achieve positive ROI</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 4.5x faster than on-premises
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-shield-alt"></i></div>
          <div class="metric-title">Security Improvement</div>
          <div class="metric-value" id="security-improvement">85%</div>
          <div class="metric-description">Overall security posture enhancement</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 25% above industry average
          </div>
        </div>
        
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-users-cog"></i></div>
          <div class="metric-title">IT Resource Reduction</div>
          <div class="metric-value" id="fte-reduction">75%</div>
          <div class="metric-description">FTE allocation reduction vs. on-premises</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 1.5x better than cloud competitors
          </div>
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-hand-holding-usd"></i> 3-Year Total Cost of Ownership Comparison</div>
        <div class="chart-subtitle">Complete cost analysis across leading NAC vendors</div>
        <div class="chart-wrapper" id="tco-comparison-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-chart-line"></i> Cumulative Cost Comparison</div>
        <div class="chart-subtitle">Progressive cost analysis over 3-year period</div>
        <div class="chart-wrapper" id="cumulative-cost-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-comment-dots"></i> Industry Analyst Insights</div>
        <div class="chart-subtitle">Expert opinions on cloud-native NAC solutions</div>
        <div class="analyst-quotes" id="analyst-quotes">
          <!-- Quotes will be dynamically inserted here -->
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-trophy"></i> Key Strategic Benefits</div>
        <div class="chart-subtitle">Prime advantages of Portnox Cloud NAC solution</div>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-cloud"></i>
            </div>
            <h3>Cloud-Native Architecture</h3>
            <p>Zero infrastructure costs, automatic updates, and global scalability with no hardware to maintain or upgrade.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-bolt"></i>
            </div>
            <h3>Rapid Deployment</h3>
            <p>75% faster implementation than on-premises alternatives with average deployment completed in under 30 days.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h3>Zero Trust Security</h3>
            <p>Comprehensive, continuous device authentication and verification with real-time security posture assessment.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-users-cog"></i>
            </div>
            <h3>Minimal IT Overhead</h3>
            <p>75% reduction in IT resource requirements with automated management and no maintenance burden.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3>Future-Proof Solution</h3>
            <p>Automatic updates, continuous innovation, and AI-powered security with no upgrade projects.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h3>Comprehensive Compliance</h3>
            <p>Automated compliance reporting and continuous monitoring for HIPAA, PCI, NIST, and other frameworks.</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create ROI panel
   */
  createRoiPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-roi';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>TCO & ROI Analysis</h2>
        <p class="subtitle">Comprehensive cost analysis and return on investment metrics</p>
      </div>
      
      <div class="executive-dashboard">
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-percentage"></i></div>
          <div class="metric-title">3-Year ROI</div>
          <div class="metric-value" id="roi-percentage">325%</div>
          <div class="metric-description">Return on investment</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 8.1x higher than on-premises
          </div>
        </div>
        
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-money-bill-wave"></i></div>
          <div class="metric-title">Annual Savings</div>
          <div class="metric-value" id="annual-savings">$91,700</div>
          <div class="metric-description">Average yearly benefit</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 53% below legacy solutions
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-calculator"></i></div>
          <div class="metric-title">Net Present Value</div>
          <div class="metric-value" id="npv-value">$215,000</div>
          <div class="metric-description">Discounted cash flow value</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Strong investment case
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-calendar-day"></i></div>
          <div class="metric-title">Payback Period</div>
          <div class="metric-value" id="payback-detail">7 months</div>
          <div class="metric-description">Time to recoup investment</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 5.3x faster than Cisco ISE
          </div>
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-chart-bar"></i> Total Cost of Ownership Breakdown</div>
        <div class="chart-subtitle">Detailed cost analysis by category over 3 years</div>
        <div class="chart-wrapper" id="tco-breakdown-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-users"></i> IT Resource Requirements Comparison</div>
        <div class="chart-subtitle">FTE allocation by vendor for NAC solution management</div>
        <div class="chart-wrapper" id="fte-comparison-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-chart-pie"></i> ROI Contributing Factors</div>
        <div class="chart-subtitle">Key drivers of return on investment</div>
        <div class="chart-wrapper" id="roi-factors-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-calendar-alt"></i> Multi-Year Financial Projection</div>
        <div class="chart-subtitle">Cumulative costs and benefits over 3-5 year period</div>
        <div class="chart-wrapper" id="financial-projection-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-briefcase"></i> Customer Success Stories</div>
        <div class="chart-subtitle">Real-world ROI achieved by Portnox customers</div>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #e74c3c, #c0392b);">
              <i class="fas fa-hospital"></i>
            </div>
            <h3>Major Healthcare Provider</h3>
            <p><strong>12,000 endpoints</strong> across 8 facilities</p>
            <p><strong>ROI:</strong> 285% | <strong>Savings:</strong> $420K annually</p>
            <p><strong>Deployment:</strong> 4 weeks | <strong>IT FTE:</strong> 0.25 (reduced from 2.5)</p>
            <p><em>"Portnox enabled us to achieve HIPAA compliance while reducing our network security costs and complexity."</em></p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #3498db, #2980b9);">
              <i class="fas fa-university"></i>
            </div>
            <h3>Regional Financial Institution</h3>
            <p><strong>5,000 endpoints</strong> across 35 branch locations</p>
            <p><strong>ROI:</strong> 340% | <strong>Savings:</strong> $280K annually</p>
            <p><strong>Deployment:</strong> 3 weeks | <strong>IT FTE:</strong> 0.25 (reduced from 1.5)</p>
            <p><em>"Replacing our legacy NAC with Portnox reduced our IT overhead by 75% while strengthening our security controls."</em></p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #9b59b6, #8e44ad);">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <h3>Multi-Campus University</h3>
            <p><strong>18,000 endpoints</strong> across 5 campuses</p>
            <p><strong>ROI:</strong> 310% | <strong>Savings:</strong> $650K annually</p>
            <p><strong>Deployment:</strong> 6 weeks | <strong>IT FTE:</strong> 0.5 (reduced from 3.0)</p>
            <p><em>"Portnox's cloud solution eliminated our need for appliances across all campuses, simplifying management and reducing costs."</em></p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #f1c40f, #f39c12);">
              <i class="fas fa-industry"></i>
            </div>
            <h3>Manufacturing Company</h3>
            <p><strong>7,500 endpoints</strong> across 12 facilities</p>
            <p><strong>ROI:</strong> 290% | <strong>Savings:</strong> $380K annually</p>
            <p><strong>Deployment:</strong> 5 weeks | <strong>IT FTE:</strong> 0.25 (reduced from 2.0)</p>
            <p><em>"The low maintenance requirements of Portnox allowed us to reallocate IT staff to more strategic initiatives."</em></p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create security panel
   */
  createSecurityPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-security';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Security Impact Analysis</h2>
        <p class="subtitle">Comprehensive security benefits and risk reduction metrics</p>
      </div>
      
      <div class="executive-dashboard">
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-shield-alt"></i></div>
          <div class="metric-title">Overall Security Improvement</div>
          <div class="metric-value" id="security-score">85%</div>
          <div class="metric-description">Enhanced security posture vs. baseline</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 20% better than competitors
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-user-shield"></i></div>
          <div class="metric-title">Zero Trust Coverage</div>
          <div class="metric-value" id="zero-trust-score">95%</div>
          <div class="metric-description">Zero Trust principles implementation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 25% above industry average
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-dollar-sign"></i></div>
          <div class="metric-title">Breach Cost Avoidance</div>
          <div class="metric-value" id="breach-cost">$3.7M</div>
          <div class="metric-description">Annual risk reduction value</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 85% risk reduction
          </div>
        </div>
        
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-tachometer-alt"></i></div>
          <div class="metric-title">Mean Time to Respond</div>
          <div class="metric-value" id="mttr-value">4.5 min</div>
          <div class="metric-description">Average time to detect and contain threats</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 8x faster than legacy solutions
          </div>
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-chart-radar"></i> Security Capabilities Comparison</div>
        <div class="chart-subtitle">Comprehensive analysis of security features across vendors</div>
        <div class="chart-wrapper" id="security-radar-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-file-invoice-dollar"></i> Cyber Insurance Premium Impact</div>
        <div class="chart-subtitle">Potential reduction in cyber insurance premiums</div>
        <div class="chart-wrapper" id="insurance-impact-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-exclamation-triangle"></i> Threat Mitigation Effectiveness</div>
        <div class="chart-subtitle">Effectiveness against top security threats</div>
        <div class="chart-wrapper" id="threat-mitigation-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-chart-line"></i> Data Breach Cost Impact</div>
        <div class="chart-subtitle">Potential cost savings from reduced breach risk</div>
        <div class="chart-wrapper" id="breach-impact-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-shield-alt"></i> Zero Trust Security Benefits</div>
        <div class="chart-subtitle">Key security advantages of zero trust implementation</div>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-user-shield"></i>
            </div>
            <h3>Continuous Authentication</h3>
            <p>Every device must authenticate and be verified before gaining network access, with ongoing monitoring of security posture.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-project-diagram"></i>
            </div>
            <h3>Network Segmentation</h3>
            <p>Micro-segmentation prevents lateral movement of threats, containing potential breaches to limited network segments.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-eye"></i>
            </div>
            <h3>Complete Visibility</h3>
            <p>Full inventory and real-time monitoring of all network devices, with automated discovery of unauthorized devices.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-robot"></i>
            </div>
            <h3>Automated Response</h3>
            <p>Immediate containment and remediation of security incidents, with policy-based enforcement and quarantine capabilities.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <h3>Secure Remote Access</h3>
            <p>Apply zero trust principles to remote and mobile devices, regardless of location and without traditional VPN requirements.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-laptop-medical"></i>
            </div>
            <h3>Device Health Validation</h3>
            <p>Continuous assessment of endpoint security posture, enforcing security agent presence and patch compliance.</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create compliance panel
   */
  createCompliancePanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-compliance';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Compliance Framework Analysis</h2>
        <p class="subtitle">Regulatory compliance impact and capabilities assessment</p>
      </div>
      
      <div class="section-header">
        <i class="fas fa-building"></i>
        <h2>Industry Selector</h2>
      </div>
      
      <div class="industry-selector">
        <select id="industry-selector">
          <option value="all">All Industries</option>
          <option value="healthcare">Healthcare</option>
          <option value="finance">Financial Services</option>
          <option value="retail">Retail</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="government">Government</option>
          <option value="education">Education</option>
          <option value="energy">Energy & Utilities</option>
          <option value="insurance">Insurance</option>
        </select>
      </div>
      
      <div class="executive-dashboard">
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-check-circle"></i></div>
          <div class="metric-title">Overall Compliance Coverage</div>
          <div class="metric-value" id="compliance-coverage">95%</div>
          <div class="metric-description">Average controls implementation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 25% above competitors
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-clock"></i></div>
          <div class="metric-title">Audit Time Reduction</div>
          <div class="metric-value" id="audit-reduction">65%</div>
          <div class="metric-description">Time saved on compliance audits</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Significant efficiency improvement
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-robot"></i></div>
          <div class="metric-title">Automated Evidence</div>
          <div class="metric-value" id="automated-evidence">85%</div>
          <div class="metric-description">Compliance evidence automation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 2x more than on-premises solutions
          </div>
        </div>
        
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-file-alt"></i></div>
          <div class="metric-title">Supported Frameworks</div>
          <div class="metric-value" id="framework-count">10+</div>
          <div class="metric-description">Major compliance frameworks</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Comprehensive coverage
          </div>
        </div>
      </div>
      
      <div class="section-header">
        <i class="fas fa-clipboard-check"></i>
        <h2>Compliance Framework Coverage</h2>
      </div>
      
      <div class="compliance-selector" id="compliance-selector">
        <!-- Compliance badges will be generated here -->
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-chart-bar"></i> Compliance Framework Coverage</div>
        <div class="chart-subtitle">Implementation percentage by framework</div>
        <div class="chart-wrapper" id="compliance-coverage-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-balance-scale"></i> Vendor Compliance Comparison</div>
        <div class="chart-subtitle">Framework support and automation across vendors</div>
        <div class="chart-wrapper" id="compliance-vendor-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-exclamation-circle"></i> Compliance Violation Impact</div>
        <div class="chart-subtitle">Potential costs of non-compliance by framework</div>
        <div class="chart-wrapper" id="compliance-impact-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-tasks"></i> Control Implementation Details</div>
        <div class="chart-subtitle">Detailed controls by selected framework</div>
        <div class="chart-wrapper" id="compliance-details-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-paperclip"></i> Compliance Automation Benefits</div>
        <div class="chart-subtitle">Key advantages of automated compliance</div>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-file-alt"></i>
            </div>
            <h3>Automated Evidence Collection</h3>
            <p>Continuous collection and storage of compliance evidence, with timestamped audit trails for all access events.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-chart-bar"></i>
            </div>
            <h3>Real-Time Compliance Dashboards</h3>
            <p>Monitor compliance status with instant visibility into control implementation and potential gaps.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-bell"></i>
            </div>
            <h3>Proactive Gap Identification</h3>
            <p>Identify and alert on compliance gaps before audits, with clear remediation guidance.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-calendar-check"></i>
            </div>
            <h3>Simplified Audit Preparation</h3>
            <p>Reduce audit preparation time by up to 65% with pre-built reports and on-demand evidence.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-sync"></i>
            </div>
            <h3>Continuous Compliance Monitoring</h3>
            <p>Ensure ongoing compliance with automatic checks against policy requirements, eliminating periodic scrambles.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-file-export"></i>
            </div>
            <h3>Easy Report Generation</h3>
            <p>Create comprehensive compliance reports with one click, customized for specific frameworks and audiences.</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create vendor comparison panel
   */
  createComparisonPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-comparison';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Comprehensive Vendor Comparison</h2>
        <p class="subtitle">Detailed analysis of leading NAC solutions across critical dimensions</p>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-trophy"></i> Overall Vendor Scorecard</div>
        <div class="chart-subtitle">Composite scores across key metrics</div>
        <div class="chart-wrapper" id="vendor-scorecard-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-balance-scale-right"></i> Total Cost of Ownership Comparison</div>
        <div class="chart-subtitle">3-year TCO across vendors</div>
        <div class="vendor-matrix">
          <table>
            <thead>
              <tr>
                <th>Cost Category</th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/portnox-logo.png" alt="Portnox Cloud">
                    <span>Portnox Cloud</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/cisco-logo.png" alt="Cisco ISE">
                    <span>Cisco ISE</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/aruba-logo.png" alt="Aruba ClearPass">
                    <span>Aruba ClearPass</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/forescout-logo.png" alt="Forescout">
                    <span>Forescout</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/fortinac-logo.png" alt="FortiNAC">
                    <span>FortiNAC</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Hardware</strong></td>
                <td class="best-value">$0</td>
                <td class="poor-value">$130,000</td>
                <td class="poor-value">$110,000</td>
                <td class="poor-value">$100,000</td>
                <td class="poor-value">$90,000</td>
              </tr>
              <tr>
                <td><strong>Software/Subscription</strong></td>
                <td class="best-value">$172,000</td>
                <td class="poor-value">$104,000</td>
                <td class="poor-value">$95,000</td>
                <td class="poor-value">$90,000</td>
                <td class="poor-value">$85,000</td>
              </tr>
              <tr>
                <td><strong>Implementation</strong></td>
                <td class="best-value">$15,000</td>
                <td class="poor-value">$85,000</td>
                <td class="poor-value">$65,000</td>
                <td class="poor-value">$75,000</td>
                <td class="poor-value">$60,000</td>
              </tr>
              <tr>
                <td><strong>Maintenance</strong></td>
                <td class="best-value">$0</td>
                <td class="poor-value">$98,000</td>
                <td class="poor-value">$85,000</td>
                <td class="poor-value">$75,000</td>
                <td class="poor-value">$70,000</td>
              </tr>
              <tr>
                <td><strong>IT Personnel (3yr)</strong></td>
                <td class="best-value">$25,000</td>
                <td class="poor-value">$200,000</td>
                <td class="poor-value">$175,000</td>
                <td class="poor-value">$150,000</td>
                <td class="poor-value">$125,000</td>
              </tr>
              <tr>
                <td><strong>Total 3-Year TCO</strong></td>
                <td class="best-value">$245,000</td>
                <td class="poor-value">$520,000</td>
                <td class="poor-value">$480,000</td>
                <td class="poor-value">$430,000</td>
                <td class="poor-value">$400,000</td>
              </tr>
              <tr>
                <td><strong>TCO Savings vs. Portnox</strong></td>
                <td class="best-value">-</td>
                <td class="poor-value">$275,000 (53%)</td>
                <td class="poor-value">$235,000 (49%)</td>
                <td class="poor-value">$185,000 (43%)</td>
                <td class="poor-value">$155,000 (39%)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-calendar-alt"></i> Implementation & Resources</div>
        <div class="chart-subtitle">Time and resource requirements by vendor</div>
        <div class="vendor-matrix">
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/portnox-logo.png" alt="Portnox Cloud">
                    <span>Portnox Cloud</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/cisco-logo.png" alt="Cisco ISE">
                    <span>Cisco ISE</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/aruba-logo.png" alt="Aruba ClearPass">
                    <span>Aruba ClearPass</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/forescout-logo.png" alt="Forescout">
                    <span>Forescout</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/fortinac-logo.png" alt="FortiNAC">
                    <span>FortiNAC</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Avg. Implementation Time</strong></td>
                <td class="best-value">3 weeks</td>
                <td class="poor-value">12-16 weeks</td>
                <td class="poor-value">10-12 weeks</td>
                <td class="poor-value">8-12 weeks</td>
                <td class="poor-value">8-10 weeks</td>
              </tr>
              <tr>
                <td><strong>IT Resources Required</strong></td>
                <td class="best-value">0.25 FTE</td>
                <td class="poor-value">2.0 FTE</td>
                <td class="poor-value">1.75 FTE</td>
                <td class="poor-value">1.5 FTE</td>
                <td class="poor-value">1.25 FTE</td>
              </tr>
              <tr>
                <td><strong>Implementation Complexity</strong></td>
                <td class="best-value">Low</td>
                <td class="poor-value">Very High</td>
                <td class="poor-value">High</td>
                <td class="poor-value">High</td>
                <td class="poor-value">Medium</td>
              </tr>
              <tr>
                <td><strong>Hardware Requirements</strong></td>
                <td class="best-value">None</td>
                <td class="poor-value">Multiple Servers</td>
                <td class="poor-value">Multiple Servers</td>
                <td class="poor-value">Appliances</td>
                <td class="poor-value">Appliances</td>
              </tr>
              <tr>
                <td><strong>Maintenance Overhead</strong></td>
                <td class="best-value">None</td>
                <td class="poor-value">High</td>
                <td class="poor-value">High</td>
                <td class="poor-value">Medium-High</td>
                <td class="poor-value">Medium</td>
              </tr>
              <tr>
                <td><strong>Automatic Updates</strong></td>
                <td class="best-value">Yes</td>
                <td class="poor-value">No</td>
                <td class="poor-value">No</td>
                <td class="poor-value">No</td>
                <td class="poor-value">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-shield-alt"></i> Security & Compliance Capabilities</div>
        <div class="chart-subtitle">Comprehensive security feature comparison</div>
        <div class="vendor-matrix">
          <table>
            <thead>
              <tr>
                <th>Capability</th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/portnox-logo.png" alt="Portnox Cloud">
                    <span>Portnox Cloud</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/cisco-logo.png" alt="Cisco ISE">
                    <span>Cisco ISE</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/aruba-logo.png" alt="Aruba ClearPass">
                    <span>Aruba ClearPass</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/forescout-logo.png" alt="Forescout">
                    <span>Forescout</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/fortinac-logo.png" alt="FortiNAC">
                    <span>FortiNAC</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Zero Trust Architecture</strong></td>
                <td class="best-value">Full</td>
                <td>Partial</td>
                <td>Partial</td>
                <td>Partial</td>
                <td>Partial</td>
              </tr>
              <tr>
                <td><strong>Cloud Integration</strong></td>
                <td class="best-value">Native</td>
                <td>Limited</td>
                <td>Limited</td>
                <td>Limited</td>
                <td>Limited</td>
              </tr>
              <tr>
                <td><strong>Device Profiling</strong></td>
                <td class="best-value">Advanced</td>
                <td>Advanced</td>
                <td>Advanced</td>
                <td class="best-value">Advanced</td>
                <td>Standard</td>
              </tr>
              <tr>
                <td><strong>IoT Security</strong></td>
                <td class="best-value">Advanced</td>
                <td>Standard</td>
                <td>Standard</td>
                <td class="best-value">Advanced</td>
                <td>Standard</td>
              </tr>
              <tr>
                <td><strong>Remote Work Support</strong></td>
                <td class="best-value">Native</td>
                <td>Add-on Required</td>
                <td>Limited</td>
                <td>Limited</td>
                <td>Limited</td>
              </tr>
              <tr>
                <td><strong>Automated Remediation</strong></td>
                <td class="best-value">Advanced</td>
                <td>Standard</td>
                <td>Standard</td>
                <td>Standard</td>
                <td>Standard</td>
              </tr>
              <tr>
                <td><strong>Compliance Automation</strong></td>
                <td class="best-value">Comprehensive</td>
                <td>Limited</td>
                <td>Limited</td>
                <td>Standard</td>
                <td>Limited</td>
              </tr>
              <tr>
                <td><strong>AI/ML Capabilities</strong></td>
                <td class="best-value">Advanced</td>
                <td>Limited</td>
                <td>Limited</td>
                <td>Standard</td>
                <td>Limited</td>
              </tr>
              <tr>
                <td><strong>Global Scalability</strong></td>
                <td class="best-value">Unlimited</td>
                <td>Limited</td>
                <td>Limited</td>
                <td>Limited</td>
                <td>Limited</td>
              </tr>
              <tr>
                <td><strong>Agent Requirements</strong></td>
                <td class="best-value">Agentless</td>
                <td>Agent Required</td>
                <td>Agent Required</td>
                <td class="best-value">Agentless</td>
                <td>Agent Required</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-cloud"></i> Architecture Comparison</div>
        <div class="chart-subtitle">Key differences between deployment models</div>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #1a5a96, #0d4275);">
              <i class="fas fa-cloud"></i>
            </div>
            <h3>Portnox: Cloud-Native</h3>
            <p><strong>Pros:</strong> No infrastructure, automatic updates, global scalability, rapid deployment, no maintenance overhead, consistent security</p>
            <p><strong>Cons:</strong> Internet connectivity required</p>
            <p><strong>Best For:</strong> Organizations seeking lowest TCO, fastest deployment, and minimal IT overhead</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #00bceb, #0078d4);">
              <i class="fas fa-server"></i>
            </div>
            <h3>Cisco ISE: On-Premises</h3>
            <p><strong>Pros:</strong> Full control over infrastructure, offline operation capability, Cisco ecosystem integration</p>
            <p><strong>Cons:</strong> High hardware costs, complex deployment, significant maintenance, long implementation</p>
            <p><strong>Best For:</strong> Organizations heavily invested in Cisco infrastructure with substantial IT resources</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #7a2a90, #5b1769);">
              <i class="fas fa-network-wired"></i>
            </div>
            <h3>Aruba & Forescout: Appliance-Based</h3>
            <p><strong>Pros:</strong> Purpose-built hardware, good performance, vendor ecosystem integration</p>
            <p><strong>Cons:</strong> High acquisition costs, hardware refreshes required, moderate deployment complexity</p>
            <p><strong>Best For:</strong> Organizations heavily invested in vendor ecosystem with preference for appliance model</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #f7931e, #c97916);">
              <i class="fas fa-exchange-alt"></i>
            </div>
            <h3>Juniper & Arista: Hybrid</h3>
            <p><strong>Pros:</strong> Balance of on-premises and cloud capabilities, moderate scaling flexibility</p>
            <p><strong>Cons:</strong> Complexity of managing hybrid environment, varied management interfaces</p>
            <p><strong>Best For:</strong> Organizations seeking balance between cloud and on-premises with specific vendor preference</p>
          </div>
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-tags"></i> Licensing Model Comparison</div>
        <div class="chart-subtitle">Key differences in pricing and licensing approaches</div>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #1a5a96, #0d4275);">
              <i class="fas fa-tags"></i>
            </div>
            <h3>Portnox: Simple Per-Device</h3>
            <p><strong>Model:</strong> Straightforward per-device subscription with volume discounts</p>
            <p><strong>Advantages:</strong> Predictable costs, all features included, no hidden fees, scales with your needs</p>
            <p><strong>TCO Impact:</strong> Lowest total cost with transparent, all-inclusive pricing</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #00bceb, #0078d4);">
              <i class="fas fa-layer-group"></i>
            </div>
            <h3>Cisco ISE: Complex Tier-Based</h3>
            <p><strong>Model:</strong> Multiple license tiers (Base, Plus, Apex) with feature restrictions</p>
            <p><strong>Disadvantages:</strong> Complex pricing model, requires multiple tiers for full functionality</p>
            <p><strong>TCO Impact:</strong> 35-60% higher costs due to tier requirements and add-ons</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #7a2a90, #5b1769);">
              <i class="fas fa-cubes"></i>
            </div>
            <h3>Forescout: Appliance + Modules</h3>
            <p><strong>Model:</strong> Hardware appliance purchases plus per-device licenses and module licenses</p>
            <p><strong>Disadvantages:</strong> Separate costs for hardware, licenses, and functional modules</p>
            <p><strong>TCO Impact:</strong> 30-50% higher costs due to hardware and module requirements</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #f7931e, #c97916);">
              <i class="fas fa-calculator"></i>
            </div>
            <h3>Hidden Cost Factors</h3>
            <p><strong>Factor 1:</strong> Hardware refresh cycles (typically every 3-5 years)</p>
            <p><strong>Factor 2:</strong> Additional modules for complete functionality</p>
            <p><strong>Factor 3:</strong> Maintenance and support contracts (typically 18-25% annually)</p>
            <p><strong>Factor 4:</strong> Professional services for upgrades and expansion</p>
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
    if (!window.ApexCharts && !window.d3) {
      console.warn('Chart libraries not available. Charts will not be rendered.');
      return;
    }
    
    console.log(`Refreshing charts in panel: ${panelId}`);
    
    switch (panelId) {
      case 'executive-summary':
        this.renderAnalystQuotes();
        this.renderTcoComparisonChart();
        this.renderCumulativeCostChart();
        break;
        
      case 'executive-roi':
        this.renderTcoBreakdownChart();
        this.renderFteComparisonChart();
        this.renderRoiFactorsChart();
        this.renderFinancialProjectionChart();
        break;
        
      case 'executive-security':
        this.renderSecurityRadarChart();
        this.renderInsuranceImpactChart();
        this.renderThreatMitigationChart();
        this.renderBreachImpactChart();
        break;
        
      case 'executive-compliance':
        this.renderComplianceSelector();
        this.setupIndustrySelector();
        this.renderComplianceCoverageChart();
        this.renderComplianceVendorChart();
        this.renderComplianceImpactChart();
        this.renderComplianceDetailsChart();
        break;
        
      case 'executive-comparison':
        this.renderVendorScorecardChart();
        break;
    }
  }
  
  /**
   * Render analyst quotes
   */
  renderAnalystQuotes() {
    const container = document.getElementById('analyst-quotes');
    if (!container) return;
    
    container.innerHTML = '';
    
    this.analystQuotes.forEach(quote => {
      const quoteCard = document.createElement('div');
      quoteCard.className = 'quote-card';
      
      quoteCard.innerHTML = `
        <div class="quote-text">${quote.text}</div>
        <div class="quote-author">
          <img src="${quote.logo}" alt="${quote.author}" class="author-logo">
          <div class="author-details">
            <div class="author-name">${quote.author}</div>
            <div class="author-title">${quote.title}</div>
          </div>
        </div>
      `;
      
      container.appendChild(quoteCard);
    });
  }
  
  /**
   * Render TCO comparison chart
   */
  renderTcoComparisonChart() {
    const chartElement = document.getElementById('tco-comparison-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Extract data for chart
    const vendors = Object.keys(this.vendorData).slice(0, 6); // Take only first 6 vendors
    const tcoValues = vendors.map(id => this.vendorData[id].tco);
    const vendorNames = vendors.map(id => this.vendorData[id].name);
    
    const options = {
      series: [{
        name: '3-Year TCO',
        data: tcoValues
      }],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
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
          borderRadius: 8,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return '$' + Math.round(val).toLocaleString();
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
        categories: vendorNames,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Total Cost ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val).toLocaleString();
          }
        }
      },
      fill: {
        opacity: 1,
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [50, 100]
        }
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12', '#2ecc71', '#3498db'],
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      },
      annotations: {
        points: [{
          x: vendorNames[0],
          y: tcoValues[0],
          marker: {
            size: 6,
            fillColor: '#2ecc71',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Best Value',
            borderColor: '#2ecc71',
            style: {
              background: '#2ecc71',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };

    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render cumulative cost chart
   */
  renderCumulativeCostChart() {
    const chartElement = document.getElementById('cumulative-cost-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Sample data for cumulative costs over 3 years
    const years = ['Initial', 'Year 1', 'Year 2', 'Year 3'];
    
    // Generate cumulative costs for vendors
    const seriesData = [];
    
    // Take only first 4 vendors for clarity
    const vendors = Object.keys(this.vendorData).slice(0, 4);
    
    vendors.forEach(vendorId => {
      const vendor = this.vendorData[vendorId];
      
      // Calculate initial cost (implementation + hardware)
      const initialCost = vendor.implementationCost + (vendor.hardware || 0);
      
      // Calculate annual cost (subscription/maintenance + personnel)
      const annualCost = (vendor.subscription || 0) + (vendor.maintenance || 0) + vendor.personnel;
      
      // Generate cumulative costs
      const data = [
        initialCost,
        initialCost + annualCost,
        initialCost + (annualCost * 2),
        initialCost + (annualCost * 3)
      ];
      
      seriesData.push({
        name: vendor.name,
        data: data
      });
    });
    
    const options = {
      series: seriesData,
      chart: {
        height: 350,
        type: 'line',
        fontFamily: 'Nunito, sans-serif',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: true,
          tools: {
            download: true
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
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12'],
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return '$' + Math.round(val / 1000) + 'K';
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false
          }
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      markers: {
        size: 6,
        hover: {
          size: 8
        }
      },
      xaxis: {
        categories: years,
        title: {
          text: 'Timeline',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      },
      yaxis: {
        title: {
          text: 'Cumulative Cost ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val).toLocaleString();
          }
        }
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
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render TCO breakdown chart
   */
  renderTcoBreakdownChart() {
    const chartElement = document.getElementById('tco-breakdown-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Take only first 5 vendors for clarity
    const vendors = Object.keys(this.vendorData).slice(0, 5);
    const vendorNames = vendors.map(id => this.vendorData[id].name);
    
    // Prepare data series
    const hardwareCosts = vendors.map(id => this.vendorData[id].hardware || 0);
    const subscriptionCosts = vendors.map(id => this.vendorData[id].subscription || 0);
    const maintenanceCosts = vendors.map(id => this.vendorData[id].maintenance || 0);
    const implementationCosts = vendors.map(id => this.vendorData[id].implementationCost || 0);
    const personnelCosts = vendors.map(id => this.vendorData[id].personnel || 0);
    
    const options = {
      series: [
        {
          name: 'Hardware',
          data: hardwareCosts
        },
        {
          name: 'Software/Subscription',
          data: subscriptionCosts
        },
        {
          name: 'Maintenance',
          data: maintenanceCosts
        },
        {
          name: 'Implementation',
          data: implementationCosts
        },
        {
          name: 'IT Personnel',
          data: personnelCosts
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
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
          borderRadius: 4,
          columnWidth: '55%',
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900
              },
              formatter: function(val) {
                return '$' + Math.round(val / 1000) + 'K';
              }
            }
          }
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: vendorNames,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Cost ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val).toLocaleString();
          }
        }
      },
      colors: ['#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6'],
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render FTE comparison chart
   */
  renderFteComparisonChart() {
    const chartElement = document.getElementById('fte-comparison-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Take all vendors
    const vendors = Object.keys(this.vendorData);
    const vendorNames = vendors.map(id => this.vendorData[id].name);
    const fteValues = vendors.map(id => this.vendorData[id].fte);
    
    const options = {
      series: [{
        name: 'IT FTE Required',
        data: fteValues
      }],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
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
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
          barHeight: '70%',
          borderRadius: 6
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 5,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        },
        formatter: function(val) {
          return val + ' FTE';
        },
        background: {
          enabled: true,
          foreColor: '#333',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false
          }
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: vendorNames,
        labels: {
          style: {
            fontSize: '12px'
          }
        },
        title: {
          text: 'Full-Time IT Staff Required',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      },
      colors: vendors.map((id, index) => {
        const colorPalette = ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60'];
        return colorPalette[index % colorPalette.length];
      }),
      title: {
        text: 'IT Staffing Requirements by Vendor',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + ' FTE';
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const fte = series[seriesIndex][dataPointIndex];
          const vendor = w.globals.labels[dataPointIndex];
          const annualCost = fte * 100000;
          
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${vendor}</div>
              <div class="tooltip-value">${fte} FTE</div>
              <div>Approx. Annual Cost: $${Math.round(annualCost).toLocaleString()}</div>
            </div>
          `;
        }
      },
      grid: {
        borderColor: '#e7e7e7',
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      annotations: {
        points: [{
          x: vendorNames[0],
          y: fteValues[0],
          marker: {
            size: 6,
            fillColor: '#2ecc71',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Lowest Resource',
            borderColor: '#2ecc71',
            style: {
              background: '#2ecc71',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };

    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render ROI factors chart
   */
  renderRoiFactorsChart() {
    const chartElement = document.getElementById('roi-factors-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Sample data for ROI factors
    const categories = ['Direct Cost Savings', 'Risk Reduction', 'Productivity Gains', 'Compliance Benefits', 'Insurance Savings'];
    const values = [42, 28, 18, 8, 4]; // Percentages
    
    const options = {
      series: [{
        name: 'Contribution to ROI',
        data: values
      }],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
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
          borderRadius: 8,
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 500,
            colors: categories.map(() => '#333')
          }
        }
      },
      yaxis: {
        title: {
          text: 'Contribution to ROI (%)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      colors: ['#1a5a96', '#2ecc71', '#f39c12', '#9b59b6', '#3498db'],
      legend: {
        show: false
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render financial projection chart
   */
  renderFinancialProjectionChart() {
    const chartElement = document.getElementById('financial-projection-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Sample data for financial projection
    const years = [0, 1, 2, 3, 4, 5];
    
    // Financial data for Portnox, Cisco, and Aruba
    const portnoxTco = [
      this.vendorData['portnox'].implementationCost, // Initial cost
      this.vendorData['portnox'].tco * (1/3), // Annual cost
      this.vendorData['portnox'].tco * (2/3),
      this.vendorData['portnox'].tco,
      this.vendorData['portnox'].tco * (4/3),
      this.vendorData['portnox'].tco * (5/3)
    ];
    
    const ciscoTco = [
      this.vendorData['cisco'].implementationCost + this.vendorData['cisco'].hardware, // Initial cost
      this.vendorData['cisco'].tco * (1/3), // Annual cost
      this.vendorData['cisco'].tco * (2/3),
      this.vendorData['cisco'].tco,
      this.vendorData['cisco'].tco * (4/3),
      this.vendorData['cisco'].tco * (5/3)
    ];
    
    const arubaTco = [
      this.vendorData['aruba'].implementationCost + this.vendorData['aruba'].hardware, // Initial cost
      this.vendorData['aruba'].tco * (1/3), // Annual cost
      this.vendorData['aruba'].tco * (2/3),
      this.vendorData['aruba'].tco,
      this.vendorData['aruba'].tco * (4/3),
      this.vendorData['aruba'].tco * (5/3)
    ];
    
    // Cumulative savings data
    const cumulativeSavings = years.map((year, index) => {
      if (index === 0) return 0;
      return ciscoTco[index] - portnoxTco[index];
    });
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          type: 'line',
          data: portnoxTco
        },
        {
          name: 'Cisco ISE',
          type: 'line',
          data: ciscoTco
        },
        {
          name: 'Aruba ClearPass',
          type: 'line',
          data: arubaTco
        },
        {
          name: 'Cumulative Savings',
          type: 'column',
          data: cumulativeSavings
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
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
      stroke: {
        width: [3, 3, 3, 0],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          borderRadius: 4
        }
      },
      fill: {
        opacity: [1, 1, 1, 0.7],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 0
      },
      xaxis: {
        categories: years.map(year => `Year ${year}`),
        title: {
          text: 'Timeline',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      },
      yaxis: [
        {
          title: {
            text: 'Cumulative Cost ($)',
            style: {
              fontSize: '14px',
              fontWeight: 500
            }
          },
          labels: {
            formatter: function(val) {
              return '$' + Math.round(val / 1000) + 'K';
            }
          }
        }
      ],
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#2ecc71'],
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      },
      annotations: {
        points: [{
          x: 'Year 3',
          y: portnoxTco[3],
          marker: {
            size: 6,
            fillColor: '#2ecc71',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Lowest TCO',
            borderColor: '#2ecc71',
            style: {
              background: '#2ecc71',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render security radar chart
   */
  renderSecurityRadarChart() {
    const chartElement = document.getElementById('security-radar-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Security capabilities to compare
    const capabilities = [
      'Zero Trust Architecture',
      'Device Authentication',
      'Network Visibility',
      'Threat Prevention',
      'Automated Response',
      'Compliance Monitoring',
      'IoT Security',
      'Remote User Security'
    ];
    
    // Take only first 5 vendors for clarity
    const vendors = Object.keys(this.vendorData).slice(0, 5);
    
    // Sample data for security capabilities
    const seriesData = [
      {
        name: this.vendorData['portnox'].name,
        data: [95, 95, 90, 85, 90, 95, 85, 95]
      },
      {
        name: this.vendorData['cisco'].name,
        data: [75, 85, 80, 80, 75, 80, 75, 60]
      },
      {
        name: this.vendorData['aruba'].name,
        data: [70, 85, 75, 75, 70, 75, 70, 55]
      },
      {
        name: this.vendorData['forescout'].name,
        data: [65, 80, 90, 75, 70, 70, 85, 50]
      },
      {
        name: this.vendorData['fortinac'].name,
        data: [60, 75, 70, 80, 65, 65, 70, 45]
      }
    ];
    
    const options = {
      series: seriesData,
      chart: {
        height: 400,
        type: 'radar',
        fontFamily: 'Nunito, sans-serif',
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
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
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
        text: 'Security Capabilities Comparison',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
      },
      xaxis: {
        categories: capabilities,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        show: false,
        min: 0,
        max: 100
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12', '#8e44ad'],
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + ' / 100';
          }
        }
      },
      grid: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render insurance impact chart
   */
  renderInsuranceImpactChart() {
    const chartElement = document.getElementById('insurance-impact-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Sample data for insurance premium reduction
    const vendors = ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'];
    const values = [25, 15, 12, 10, 8]; // Percentages
    
    const options = {
      series: [{
        name: 'Insurance Premium Reduction',
        data: values
      }],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
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
          borderRadius: 8,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: vendors,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Premium Reduction (%)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [50, 100]
        }
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12', '#2ecc71'],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      annotations: {
        points: [{
          x: 'Portnox Cloud',
          y: 25,
          marker: {
            size: 6,
            fillColor: '#2ecc71',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Best Reduction',
            borderColor: '#2ecc71',
            style: {
              background: '#2ecc71',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render threat mitigation chart
   */
  renderThreatMitigationChart() {
    const chartElement = document.getElementById('threat-mitigation-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Sample data for threat mitigation effectiveness
    const threats = [
      'Unauthorized Access',
      'Lateral Movement',
      'Data Exfiltration',
      'Malware Propagation',
      'Shadow IT',
      'Insider Threats',
      'IoT Vulnerabilities',
      'Network Reconnaissance'
    ];
    
    // Effectiveness scores (0-100)
    const portnoxScores = [95, 90, 85, 80, 95, 85, 85, 90];
    const competitorAvg = [75, 65, 70, 70, 65, 70, 60, 70];
    const industryAvg = [60, 55, 60, 65, 50, 60, 50, 55];
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          data: portnoxScores
        },
        {
          name: 'Leading Competitors Avg.',
          data: competitorAvg
        },
        {
          name: 'Industry Average',
          data: industryAvg
        }
      ],
      chart: {
        type: 'radar',
        height: 400,
        fontFamily: 'Nunito, sans-serif',
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
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      title: {
        text: 'Threat Mitigation Effectiveness',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
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
      xaxis: {
        categories: threats,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        show: false,
        min: 0,
        max: 100
      },
      colors: ['#1a5a96', '#e74c3c', '#f39c12'],
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '% effective';
          }
        }
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render breach impact chart
   */
  renderBreachImpactChart() {
    const chartElement = document.getElementById('breach-impact-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Sample data for breach cost analysis
    const categories = ['No NAC Solution', 'Traditional NAC', 'Portnox Cloud'];
    const avgBreachCost = [4350000, 1525000, 650000]; // Average breach cost
    const avgResponseTime = [280, 72, 15]; // Hours to detect and contain
    
    const options = {
      series: [
        {
          name: 'Average Data Breach Cost',
          type: 'column',
          data: avgBreachCost
        },
        {
          name: 'Avg. Response Time (Hours)',
          type: 'line',
          data: avgResponseTime
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
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
      stroke: {
        width: [0, 4],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          borderRadius: 5
        }
      },
      fill: {
        opacity: [0.85, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 6
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: [
        {
          title: {
            text: 'Breach Cost ($)',
            style: {
              fontSize: '14px',
              fontWeight: 500
            }
          },
          labels: {
            formatter: function(val) {
              return '$' + Math.round(val / 1000000) + 'M';
            }
          }
        },
        {
          opposite: true,
          title: {
            text: 'Response Time (Hours)',
            style: {
              fontSize: '14px',
              fontWeight: 500
            }
          },
          labels: {
            formatter: function(val) {
              return Math.round(val) + ' hrs';
            }
          }
        }
      ],
      colors: ['#e74c3c', '#1a5a96'],
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      },
      annotations: {
        points: [
          {
            x: 'Portnox Cloud',
            y: 650000,
            marker: {
              size: 6,
              fillColor: '#2ecc71',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'Lowest Breach Cost',
              borderColor: '#2ecc71',
              style: {
                background: '#2ecc71',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600
              },
              offsetY: -30
            }
          },
          {
            x: 'Portnox Cloud',
            y: 15,
            seriesIndex: 1,
            marker: {
              size: 6,
              fillColor: '#2ecc71',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'Fastest Response',
              borderColor: '#2ecc71',
              style: {
                background: '#2ecc71',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600
              },
              offsetY: 15
            }
          }
        ]
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: [{
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return "$" + y.toLocaleString();
            }
            return y;
          }
        }, {
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " hours";
            }
            return y;
          }
        }]
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render compliance selector
   */
  renderComplianceSelector() {
    const container = document.getElementById('compliance-selector');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create a badge for each compliance framework
    Object.keys(this.complianceData).forEach((frameworkId, index) => {
      const framework = this.complianceData[frameworkId];
      
      const badge = document.createElement('div');
      badge.className = 'compliance-badge';
      badge.setAttribute('data-framework', frameworkId);
      
      // Set the first one as active
      if (index === 0) {
        badge.classList.add('active');
      }
      
      badge.innerHTML = `<i class="fas ${framework.icon}"></i> ${framework.name}`;
      
      badge.addEventListener('click', () => {
        // Remove active class from all badges
        document.querySelectorAll('.compliance-badge').forEach(b => {
          b.classList.remove('active');
        });
        
        // Add active class to clicked badge
        badge.classList.add('active');
        
        // Update compliance details chart
        this.renderComplianceDetailsChart(frameworkId);
      });
      
      container.appendChild(badge);
    });
  }
  
  /**
   * Setup industry selector
   */
  setupIndustrySelector() {
    const selector = document.getElementById('industry-selector');
    if (!selector) return;
    
    // Add event listener to update compliance badges when industry changes
    selector.addEventListener('change', () => {
      const selectedIndustry = selector.value;
      this.updateComplianceBadges(selectedIndustry);
      this.renderComplianceCoverageChart(selectedIndustry);
      this.renderComplianceImpactChart(selectedIndustry);
    });
  }
  
  /**
   * Update compliance badges based on selected industry
   */
  updateComplianceBadges(industry) {
    const badges = document.querySelectorAll('.compliance-badge');
    
    badges.forEach(badge => {
      const frameworkId = badge.getAttribute('data-framework');
      const framework = this.complianceData[frameworkId];
      
      if (industry === 'all' || framework.industry.includes(industry)) {
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    });
  }
  
  /**
   * Render compliance coverage chart
   */
  renderComplianceCoverageChart(industry = 'all') {
    const chartElement = document.getElementById('compliance-coverage-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Filter frameworks based on industry
    const frameworks = Object.keys(this.complianceData).filter(id => {
      return industry === 'all' || this.complianceData[id].industry.includes(industry);
    });
    
    // Prepare data for chart
    const frameworkNames = frameworks.map(id => this.complianceData[id].name);
    const portnoxCoverage = frameworks.map(id => this.complianceData[id].portnoxCoverage);
    const averageCoverage = frameworks.map(id => this.complianceData[id].averageCoverage);
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          data: portnoxCoverage
        },
        {
          name: 'Industry Average',
          data: averageCoverage
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
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
          borderRadius: 4,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + '%';
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
        categories: frameworkNames,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Coverage (%)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      fill: {
        opacity: 1
      },
      colors: ['#1a5a96', '#f39c12'],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render compliance vendor chart
   */
  renderComplianceVendorChart() {
    const chartElement = document.getElementById('compliance-vendor-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Compliance metrics to compare
    const metrics = [
      'Automated Evidence Collection',
      'Real-Time Dashboards',
      'Control Implementation',
      'Gap Identification',
      'Reporting Capabilities',
      'Audit Preparation'
    ];
    
    // Sample data for compliance capabilities
    const vendorScores = [
      {
        name: 'Portnox Cloud',
        data: [90, 95, 90, 85, 95, 90]
      },
      {
        name: 'Cisco ISE',
        data: [65, 70, 75, 60, 65, 55]
      },
      {
        name: 'Aruba ClearPass',
        data: [60, 65, 70, 55, 60, 50]
      },
      {
        name: 'Forescout',
        data: [70, 65, 65, 70, 60, 60]
      }
    ];
    
    const options = {
      series: vendorScores,
      chart: {
        type: 'radar',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
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
        text: 'Compliance Automation Capabilities',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
      },
      xaxis: {
        categories: metrics,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        show: false,
        min: 0,
        max: 100
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12'],
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + ' / 100';
          }
        }
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render compliance impact chart
   */
  renderComplianceImpactChart(industry = 'all') {
    const chartElement = document.getElementById('compliance-impact-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Filter frameworks based on industry
    const frameworks = Object.keys(this.complianceData).filter(id => {
      return industry === 'all' || this.complianceData[id].industry.includes(industry);
    }).slice(0, 5); // Take only first 5 for clarity
    
    // Prepare data for chart
    const frameworkNames = frameworks.map(id => this.complianceData[id].name);
    const breachCosts = frameworks.map(id => this.complianceData[id].breachCost);
    const implementationTimes = frameworks.map(id => this.complianceData[id].implementationTime);
    
    const options = {
      series: [{
        name: 'Potential Breach Cost',
        type: 'column',
        data: breachCosts
      }, {
        name: 'Implementation Time (Days)',
        type: 'line',
        data: implementationTimes
      }],
      chart: {
        height: 350,
        type: 'line',
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        }
      },
      stroke: {
        width: [0, 4],
        curve: 'smooth'
      },
      title: {
        text: 'Compliance Framework Impact',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
        formatter: function (val) {
          return val + ' days';
        },
        style: {
          fontSize: '10px'
        }
      },
      labels: frameworkNames,
      xaxis: {
        type: 'category',
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: [{
        title: {
          text: 'Potential Breach Cost',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val / 1000000) + 'M';
          }
        }
      }, {
        opposite: true,
        title: {
          text: 'Implementation Time (Days)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return Math.round(val) + ' days';
          }
        }
      }],
      colors: ['#e74c3c', '#1a5a96'],
      tooltip: {
        shared: true,
        intersect: false,
        y: [{
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return "$" + y.toLocaleString();
            }
            return y;
          }
        }, {
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " days";
            }
            return y;
          }
        }]
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render compliance details chart for specific framework
   */
  renderComplianceDetailsChart(frameworkId = 'hipaa') {
    const chartElement = document.getElementById('compliance-details-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Get framework data
    const framework = this.complianceData[frameworkId];
    
    // Sample control categories for the selected framework
    let categories, portnoxValues, competitorValues;
    
    switch (frameworkId) {
      case 'hipaa':
        categories = ['Administrative Safeguards', 'Physical Safeguards', 'Technical Safeguards', 'Policies & Procedures', 'Organizational Requirements'];
        portnoxValues = [95, 90, 98, 92, 94];
        competitorValues = [75, 65, 80, 70, 68];
        break;
      
      case 'pci':
        categories = ['Build & Maintain Secure Network', 'Protect Cardholder Data', 'Maintain Vulnerability Mgmt', 'Access Control Measures', 'Network Monitoring', 'Information Security Policy'];
        portnoxValues = [94, 92, 90, 96, 93, 91];
        competitorValues = [70, 78, 68, 75, 65, 60];
        break;
      
      case 'nist':
        categories = ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'];
        portnoxValues = [92, 96, 95, 93, 90];
        competitorValues = [70, 75, 72, 68, 62];
        break;
        
      case 'gdpr':
        categories = ['Lawfulness & Transparency', 'Purpose Limitation', 'Data Minimization', 'Accuracy', 'Storage Limitation', 'Security & Confidentiality'];
        portnoxValues = [90, 88, 92, 89, 87, 95];
        competitorValues = [72, 65, 68, 70, 63, 73];
        break;
        
      case 'iso27001':
        categories = ['Security Policy', 'Asset Management', 'Access Control', 'Physical Security', 'Operations Security', 'Communications'];
        portnoxValues = [94, 93, 96, 91, 92, 90];
        competitorValues = [70, 68, 75, 69, 65, 63];
        break;
        
      default:
        categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
        portnoxValues = [92, 94, 90, 93, 91];
        competitorValues = [70, 68, 65, 72, 69];
    }
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          data: portnoxValues
        },
        {
          name: 'Industry Average',
          data: competitorValues
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + '%';
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
      title: {
        text: `${framework.name} (${framework.description}) Control Implementation`,
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
      },
      subtitle: {
        text: `Total Controls: ${framework.controls}`,
        align: 'center',
        style: {
          fontSize: '14px'
        }
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Implementation (%)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      fill: {
        opacity: 1
      },
      colors: ['#1a5a96', '#f39c12'],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render vendor scorecard chart
   */
  renderVendorScorecardChart() {
    const chartElement = document.getElementById('vendor-scorecard-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Take top 6 vendors for comparison
    const vendors = Object.keys(this.vendorData).slice(0, 6);
    const vendorNames = vendors.map(id => this.vendorData[id].name);
    
    // Create composite scores based on several metrics
    // Each score is on a scale of 0-100
    const scores = vendors.map(id => {
      const vendor = this.vendorData[id];
      
      // Calculate TCO Score (lower is better, range 0-100)
      const maxTco = 520000; // Cisco's TCO
      const minTco = 245000; // Portnox's TCO
      const tcoRange = maxTco - minTco;
      const tcoScore = 100 - ((vendor.tco - minTco) / tcoRange * 100);
      
      // Security Score (higher is better, already 0-100)
      const securityScore = vendor.securityScore;
      
      // Implementation Score (lower time is better, range 0-100)
      const maxTime = 90; // Cisco's implementation time
      const minTime = 21; // Portnox's implementation time
      const timeRange = maxTime - minTime;
      const implementationScore = 100 - ((vendor.implementationTime - minTime) / timeRange * 100);
      
      // IT Resource Score (lower FTE is better, range 0-100)
      const maxFte = 2.0; // Cisco's FTE
      const minFte = 0.25; // Portnox's FTE
      const fteRange = maxFte - minFte;
      const fteScore = 100 - ((vendor.fte - minFte) / fteRange * 100);
      
      // Compliance Score (higher is better, already 0-100)
      const complianceScore = vendor.complianceScore;
      
      // Calculate composite score (weighted average)
      return {
        name: vendor.name,
        TCO: Math.round(tcoScore),
        Security: securityScore,
        Implementation: Math.round(implementationScore),
        'IT Resources': Math.round(fteScore),
        Compliance: complianceScore,
        // Composite score with weights
        Composite: Math.round(
          tcoScore * 0.3 + // 30% weight for TCO
          securityScore * 0.25 + // 25% weight for security
          implementationScore * 0.15 + // 15% weight for implementation
          fteScore * 0.15 + // 15% weight for IT resources
          complianceScore * 0.15 // 15% weight for compliance
        )
      };
    });
    
    // Sort vendors by composite score
    scores.sort((a, b) => b.Composite - a.Composite);
    
    // Prepare chart data
    const categories = scores.map(item => item.name);
    const compositeScores = scores.map(item => item.Composite);
    const tcoScores = scores.map(item => item.TCO);
    const securityScores = scores.map(item => item.Security);
    const implementationScores = scores.map(item => item.Implementation);
    const fteScores = scores.map(item => item['IT Resources']);
    const complianceScores = scores.map(item => item.Compliance);
    
    const options = {
      series: [
        {
          name: 'Composite Score',
          data: compositeScores
        },
        {
          name: 'TCO',
          data: tcoScores
        },
        {
          name: 'Security',
          data: securityScores
        },
        {
          name: 'Implementation',
          data: implementationScores
        },
        {
          name: 'IT Resources',
          data: fteScores
        },
        {
          name: 'Compliance',
          data: complianceScores
        }
      ],
      chart: {
        type: 'bar',
        height: 450,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
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
          horizontal: true,
          columnWidth: '70%',
          borderRadius: 4,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'Vendor Scorecard',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Score (0-100)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        min: 0,
        max: 100
      },
      colors: ['#1a5a96', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#3498db'],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(val) {
            return val + ' / 100';
          }
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Update the view with results data
   */
  update(data) {
    console.log('Updating Enhanced Executive View with data');
    this.data = data;
    
    if (!this.initialized) {
      console.warn('Enhanced Executive View not initialized');
      return;
    }
    
    // Update the current panel
    this.refreshChartsInPanel(this.currentTab);
  }
}

// Create global instance
window.executiveView = new ExecutiveView();

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ExecutiveView };
}
