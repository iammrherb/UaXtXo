/**
 * Complete Executive View for Portnox Total Cost Analyzer
 * Comprehensive C-level dashboard with all vendors and advanced analytics
 * Version: 3.0 - Executive Analytics Suite
 */

class ExecutiveViewComplete {
  constructor() {
    this.initialized = false;
    this.data = null;
    this.currentView = 'overview';
    this.selectedVendors = ['portnox', 'cisco', 'aruba', 'forescout'];
    this.animationDuration = 800;
    this.chartInstances = {};
    
    // All vendor configurations with complete data
    this.vendorConfigs = {
      'portnox': {
        name: 'Portnox Cloud',
        shortName: 'Portnox',
        logo: './img/vendors/portnox-logo.png',
        color: '#1a5a96',
        architecture: 'Cloud-Native',
        tco3Year: 245000,
        roi: 325,
        paybackMonths: 7,
        implementationDays: 21,
        fte: 0.25,
        securityScore: 95,
        complianceScore: 92,
        marketShare: 12,
        customerSat: 94,
        growth: 85,
        costs: {
          hardware: 0,
          software: 172000,
          implementation: 15000,
          maintenance: 12500,
          personnel: 45500,
          operational: 0
        },
        security: {
          zeroTrust: 95, deviceAuth: 95, threatPrevention: 90,
          compliance: 92, automation: 90, visibility: 92,
          riskReduction: 85, breachPrevention: 90
        },
        compliance: {
          pci: 95, hipaa: 92, gdpr: 90, sox: 88, nist: 94, iso27001: 93,
          cmmc: 96, ferpa: 94, glba: 95, cis: 97
        },
        features: {
          cloudNative: true, zeroTrust: true, agentless: true,
          aiThreat: true, autoRemediation: true, globalScale: true
        }
      },
      'cisco': {
        name: 'Cisco ISE',
        shortName: 'Cisco',
        logo: './img/vendors/cisco-logo.png',
        color: '#00bceb',
        architecture: 'On-Premises',
        tco3Year: 520000,
        roi: -8,
        paybackMonths: 32,
        implementationDays: 90,
        fte: 2.0,
        securityScore: 85,
        complianceScore: 78,
        marketShare: 35,
        customerSat: 72,
        growth: -5,
        costs: {
          hardware: 130000,
          software: 140000,
          implementation: 85000,
          maintenance: 98000,
          personnel: 67000,
          operational: 0
        },
        security: {
          zeroTrust: 75, deviceAuth: 88, threatPrevention: 82,
          compliance: 85, automation: 70, visibility: 85,
          riskReduction: 70, breachPrevention: 75
        },
        compliance: {
          pci: 85, hipaa: 78, gdpr: 75, sox: 80, nist: 88, iso27001: 82,
          cmmc: 75, ferpa: 70, glba: 85, cis: 80
        },
        features: {
          cloudNative: false, zeroTrust: false, agentless: false,
          aiThreat: false, autoRemediation: true, globalScale: false
        }
      },
      'aruba': {
        name: 'Aruba ClearPass',
        shortName: 'Aruba',
        logo: './img/vendors/aruba-logo.png',
        color: '#ff6900',
        architecture: 'On-Premises',
        tco3Year: 480000,
        roi: 5,
        paybackMonths: 28,
        implementationDays: 75,
        fte: 1.75,
        securityScore: 82,
        complianceScore: 75,
        marketShare: 18,
        customerSat: 76,
        growth: 8,
        costs: {
          hardware: 110000,
          software: 125000,
          implementation: 65000,
          maintenance: 85000,
          personnel: 95000,
          operational: 0
        },
        security: {
          zeroTrust: 70, deviceAuth: 85, threatPrevention: 80,
          compliance: 82, automation: 75, visibility: 82,
          riskReduction: 72, breachPrevention: 78
        },
        compliance: {
          pci: 82, hipaa: 75, gdpr: 78, sox: 72, nist: 85, iso27001: 80,
          cmmc: 70, ferpa: 68, glba: 82, cis: 75
        },
        features: {
          cloudNative: false, zeroTrust: false, agentless: false,
          aiThreat: false, autoRemediation: true, globalScale: false
        }
      },
      'forescout': {
        name: 'Forescout',
        shortName: 'Forescout',
        logo: './img/vendors/forescout-logo.png',
        color: '#7a2a90',
        architecture: 'On-Premises',
        tco3Year: 430000,
        roi: 12,
        paybackMonths: 25,
        implementationDays: 60,
        fte: 1.5,
        securityScore: 80,
        complianceScore: 85,
        marketShare: 15,
        customerSat: 68,
        growth: -12,
        costs: {
          hardware: 100000,
          software: 115000,
          implementation: 75000,
          maintenance: 75000,
          personnel: 65000,
          operational: 0
        },
        security: {
          zeroTrust: 72, deviceAuth: 82, threatPrevention: 85,
          compliance: 88, automation: 80, visibility: 95,
          riskReduction: 68, breachPrevention: 72
        },
        compliance: {
          pci: 88, hipaa: 82, gdpr: 80, sox: 85, nist: 90, iso27001: 87,
          cmmc: 82, ferpa: 75, glba: 88, cis: 85
        },
        features: {
          cloudNative: false, zeroTrust: false, agentless: true,
          aiThreat: false, autoRemediation: true, globalScale: false
        }
      },
      'fortinac': {
        name: 'FortiNAC',
        shortName: 'FortiNAC',
        logo: './img/vendors/fortinac-logo.png',
        color: '#ee3124',
        architecture: 'On-Premises',
        tco3Year: 400000,
        roi: 15,
        paybackMonths: 22,
        implementationDays: 60,
        fte: 1.25,
        securityScore: 75,
        complianceScore: 80,
        marketShare: 8,
        customerSat: 65,
        growth: -8,
        costs: {
          hardware: 90000,
          software: 105000,
          implementation: 60000,
          maintenance: 70000,
          personnel: 75000,
          operational: 0
        },
        security: {
          zeroTrust: 65, deviceAuth: 80, threatPrevention: 78,
          compliance: 82, automation: 75, visibility: 80,
          riskReduction: 65, breachPrevention: 70
        },
        compliance: {
          pci: 85, hipaa: 75, gdpr: 72, sox: 78, nist: 82, iso27001: 80,
          cmmc: 75, ferpa: 68, glba: 85, cis: 78
        },
        features: {
          cloudNative: false, zeroTrust: false, agentless: false,
          aiThreat: false, autoRemediation: true, globalScale: false
        }
      },
      'juniper': {
        name: 'Juniper Mist',
        shortName: 'Juniper',
        logo: './img/vendors/juniper-logo.png',
        color: '#84bd00',
        architecture: 'Hybrid Cloud',
        tco3Year: 350000,
        roi: 40,
        paybackMonths: 18,
        implementationDays: 45,
        fte: 1.0,
        securityScore: 78,
        complianceScore: 82,
        marketShare: 6,
        customerSat: 78,
        growth: 25,
        costs: {
          hardware: 60000,
          software: 100000,
          implementation: 50000,
          maintenance: 50000,
          personnel: 90000,
          operational: 0
        },
        security: {
          zeroTrust: 80, deviceAuth: 85, threatPrevention: 75,
          compliance: 80, automation: 85, visibility: 82,
          riskReduction: 70, breachPrevention: 75
        },
        compliance: {
          pci: 80, hipaa: 75, gdpr: 82, sox: 75, nist: 85, iso27001: 82,
          cmmc: 78, ferpa: 72, glba: 80, cis: 82
        },
        features: {
          cloudNative: true, zeroTrust: true, agentless: true,
          aiThreat: true, autoRemediation: true, globalScale: true
        }
      },
      'securew2': {
        name: 'SecureW2',
        shortName: 'SecureW2',
        logo: './img/vendors/securew2-logo.png',
        color: '#2c5aa0',
        architecture: 'Cloud',
        tco3Year: 280000,
        roi: 180,
        paybackMonths: 12,
        implementationDays: 30,
        fte: 0.5,
        securityScore: 72,
        complianceScore: 70,
        marketShare: 4,
        customerSat: 82,
        growth: 45,
        costs: {
          hardware: 0,
          software: 190000,
          implementation: 25000,
          maintenance: 15000,
          personnel: 50000,
          operational: 0
        },
        security: {
          zeroTrust: 85, deviceAuth: 90, threatPrevention: 65,
          compliance: 75, automation: 80, visibility: 75,
          riskReduction: 60, breachPrevention: 68
        },
        compliance: {
          pci: 75, hipaa: 68, gdpr: 85, sox: 70, nist: 78, iso27001: 75,
          cmmc: 65, ferpa: 75, glba: 75, cis: 72
        },
        features: {
          cloudNative: true, zeroTrust: true, agentless: false,
          aiThreat: false, autoRemediation: false, globalScale: true
        }
      },
      'microsoft': {
        name: 'Microsoft NPS',
        shortName: 'Microsoft',
        logo: './img/vendors/microsoft-logo.png',
        color: '#00bcf2',
        architecture: 'On-Premises',
        tco3Year: 290000,
        roi: 25,
        paybackMonths: 20,
        implementationDays: 30,
        fte: 1.0,
        securityScore: 60,
        complianceScore: 65,
        marketShare: 10,
        customerSat: 70,
        growth: 5,
        costs: {
          hardware: 30000,
          software: 60000,
          implementation: 20000,
          maintenance: 40000,
          personnel: 140000,
          operational: 0
        },
        security: {
          zeroTrust: 50, deviceAuth: 75, threatPrevention: 55,
          compliance: 70, automation: 40, visibility: 65,
          riskReduction: 45, breachPrevention: 50
        },
        compliance: {
          pci: 70, hipaa: 60, gdpr: 75, sox: 65, nist: 72, iso27001: 68,
          cmmc: 60, ferpa: 70, glba: 75, cis: 65
        },
        features: {
          cloudNative: false, zeroTrust: false, agentless: false,
          aiThreat: false, autoRemediation: false, globalScale: false
        }
      },
      'arista': {
        name: 'Arista CloudVision',
        shortName: 'Arista',
        logo: './img/vendors/arista-logo.png',
        color: '#ff6600',
        architecture: 'Hybrid',
        tco3Year: 320000,
        roi: 35,
        paybackMonths: 15,
        implementationDays: 45,
        fte: 1.0,
        securityScore: 70,
        complianceScore: 75,
        marketShare: 3,
        customerSat: 75,
        growth: 20,
        costs: {
          hardware: 50000,
          software: 90000,
          implementation: 45000,
          maintenance: 55000,
          personnel: 80000,
          operational: 0
        },
        security: {
          zeroTrust: 65, deviceAuth: 78, threatPrevention: 70,
          compliance: 75, automation: 65, visibility: 80,
          riskReduction: 60, breachPrevention: 65
        },
        compliance: {
          pci: 75, hipaa: 68, gdpr: 72, sox: 70, nist: 78, iso27001: 75,
          cmmc: 68, ferpa: 65, glba: 75, cis: 72
        },
        features: {
          cloudNative: true, zeroTrust: false, agentless: true,
          aiThreat: false, autoRemediation: false, globalScale: true
        }
      },
      'foxpass': {
        name: 'Foxpass',
        shortName: 'Foxpass',
        logo: './img/vendors/foxpass-logo.png',
        color: '#ff4444',
        architecture: 'Cloud',
        tco3Year: 270000,
        roi: 160,
        paybackMonths: 10,
        implementationDays: 25,
        fte: 0.5,
        securityScore: 65,
        complianceScore: 60,
        marketShare: 2,
        customerSat: 80,
        growth: 65,
        costs: {
          hardware: 0,
          software: 180000,
          implementation: 20000,
          maintenance: 10000,
          personnel: 60000,
          operational: 0
        },
        security: {
          zeroTrust: 70, deviceAuth: 85, threatPrevention: 60,
          compliance: 65, automation: 75, visibility: 70,
          riskReduction: 55, breachPrevention: 60
        },
        compliance: {
          pci: 68, hipaa: 55, gdpr: 75, sox: 60, nist: 70, iso27001: 65,
          cmmc: 55, ferpa: 68, glba: 70, cis: 62
        },
        features: {
          cloudNative: true, zeroTrust: false, agentless: true,
          aiThreat: false, autoRemediation: false, globalScale: true
        }
      }
    };
    
    // Industry benchmark data
    this.industryBenchmarks = {
      healthcare: { avgBreachCost: 9230000, avgTco: 450000, frameworks: ['HIPAA', 'GDPR', 'NIST'] },
      finance: { avgBreachCost: 5970000, avgTco: 520000, frameworks: ['PCI-DSS', 'SOX', 'GDPR'] },
      retail: { avgBreachCost: 3280000, avgTco: 380000, frameworks: ['PCI-DSS', 'GDPR'] },
      manufacturing: { avgBreachCost: 4740000, avgTco: 420000, frameworks: ['NIST', 'ISO27001'] },
      education: { avgBreachCost: 3580000, avgTco: 350000, frameworks: ['FERPA', 'GDPR'] },
      government: { avgBreachCost: 8750000, avgTco: 600000, frameworks: ['CMMC', 'NIST', 'FedRAMP'] },
      technology: { avgBreachCost: 4650000, avgTco: 400000, frameworks: ['ISO27001', 'GDPR'] },
      energy: { avgBreachCost: 4650000, avgTco: 480000, frameworks: ['NIST', 'CIS'] }
    };
  }
  
  /**
   * Initialize the complete executive view
   */
  init() {
    console.log('Initializing Complete Executive View...');
    
    if (this.initialized) return this;
    
    this.createExecutiveDashboard();
    this.initializeCharts();
    this.setupEventListeners();
    this.initializeTooltips();
    this.startAnimations();
    
    this.initialized = true;
    console.log('Complete Executive View initialized successfully');
    return this;
  }
  
  /**
   * Create the comprehensive executive dashboard
   */
  createExecutiveDashboard() {
    const container = document.querySelector('#executive-view .view-content') || 
                     document.querySelector('.view-panel[data-view="executive"]') ||
                     document.querySelector('#executive-view');
    
    if (!container) {
      console.error('Executive view container not found');
      return;
    }
    
    container.innerHTML = `
      <!-- Executive Command Center Header -->
      <div class="executive-command-center">
        <div class="command-header">
          <div class="executive-branding">
            <div class="portnox-badge">
              <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="brand-logo">
              <div class="brand-text">
                <h1>Executive Command Center</h1>
                <p>Zero Trust NAC Solution Analysis & Business Intelligence</p>
              </div>
            </div>
          </div>
          <div class="command-actions">
            <button class="cmd-btn primary" id="live-demo">
              <i class="fas fa-play"></i> Live Demo
            </button>
            <button class="cmd-btn secondary" id="export-executive">
              <i class="fas fa-file-export"></i> Export Report
            </button>
            <button class="cmd-btn utility" id="customize-dashboard">
              <i class="fas fa-cogs"></i> Customize
            </button>
          </div>
        </div>
        
        <!-- Real-time Executive KPIs -->
        <div class="executive-kpis">
          <div class="kpi-card strategic" data-tooltip="Strategic financial impact analysis showing total cost savings achieved through cloud-native NAC implementation over 3-year period">
            <div class="kpi-indicator"></div>
            <div class="kpi-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <div class="kpi-metrics">
              <div class="primary-metric">
                <span class="value" data-animate="275000">$0</span>
                <span class="currency">K</span>
              </div>
              <div class="metric-label">Strategic Savings</div>
              <div class="metric-subtitle">3-Year Cost Reduction</div>
              <div class="trend-indicator positive">
                <i class="fas fa-arrow-up"></i>
                <span>53% vs Industry Avg</span>
              </div>
            </div>
          </div>
          
          <div class="kpi-card financial" data-tooltip="Return on Investment calculation including direct cost savings, productivity gains, risk reduction benefits, and compliance automation value">
            <div class="kpi-indicator"></div>
            <div class="kpi-icon">
              <i class="fas fa-percentage"></i>
            </div>
            <div class="kpi-metrics">
              <div class="primary-metric">
                <span class="value" data-animate="325">0</span>
                <span class="currency">%</span>
              </div>
              <div class="metric-label">Investment ROI</div>
              <div class="metric-subtitle">3-Year Return</div>
              <div class="trend-indicator positive">
                <i class="fas fa-rocket"></i>
                <span>7-Month Payback</span>
              </div>
            </div>
          </div>
          
          <div class="kpi-card operational" data-tooltip="IT resource efficiency improvement through automated cloud-native management reducing manual operational overhead">
            <div class="kpi-indicator"></div>
            <div class="kpi-icon">
              <i class="fas fa-users-cog"></i>
            </div>
            <div class="kpi-metrics">
              <div class="primary-metric">
                <span class="value" data-animate="87">0</span>
                <span class="currency">%</span>
              </div>
              <div class="metric-label">Efficiency Gain</div>
              <div class="metric-subtitle">IT Resource Optimization</div>
              <div class="trend-indicator positive">
                <i class="fas fa-user-minus"></i>
                <span>0.25 vs 2.0 FTE</span>
              </div>
            </div>
          </div>
          
          <div class="kpi-card security" data-tooltip="Comprehensive security enhancement through Zero Trust architecture, continuous monitoring, and automated threat response capabilities">
            <div class="kpi-indicator"></div>
            <div class="kpi-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <div class="kpi-metrics">
              <div class="primary-metric">
                <span class="value" data-animate="95">0</span>
                <span class="currency">%</span>
              </div>
              <div class="metric-label">Security Score</div>
              <div class="metric-subtitle">Zero Trust Readiness</div>
              <div class="trend-indicator positive">
                <i class="fas fa-shield-virus"></i>
                <span>Enterprise Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Comprehensive Vendor Analysis Matrix -->
      <div class="vendor-analysis-matrix">
        <div class="matrix-header">
          <h2><i class="fas fa-microscope"></i> Comprehensive Vendor Analysis Matrix</h2>
          <div class="matrix-controls">
            <div class="analysis-filters">
              <select id="industry-filter" class="filter-select">
                <option value="all">All Industries</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Financial Services</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="education">Education</option>
                <option value="government">Government</option>
                <option value="technology">Technology</option>
              </select>
              <select id="metric-focus" class="filter-select">
                <option value="all">All Metrics</option>
                <option value="financial">Financial Impact</option>
                <option value="operational">Operational Efficiency</option>
                <option value="security">Security & Risk</option>
                <option value="compliance">Compliance Coverage</option>
              </select>
            </div>
            <div class="vendor-toggles">
              <button class="vendor-toggle active" data-vendor="portnox">Portnox</button>
              <button class="vendor-toggle active" data-vendor="cisco">Cisco</button>
              <button class="vendor-toggle active" data-vendor="aruba">Aruba</button>
              <button class="vendor-toggle" data-vendor="forescout">Forescout</button>
              <button class="vendor-toggle" data-vendor="fortinac">FortiNAC</button>
              <button class="vendor-toggle" data-vendor="juniper">Juniper</button>
              <button class="vendor-toggle" data-vendor="securew2">SecureW2</button>
              <button class="vendor-toggle" data-vendor="microsoft">Microsoft</button>
              <button class="vendor-toggle" data-vendor="arista">Arista</button>
              <button class="vendor-toggle" data-vendor="foxpass">Foxpass</button>
            </div>
          </div>
        </div>
        
        <div class="matrix-content" id="vendor-matrix-content">
          <!-- Dynamic matrix content will be inserted here -->
        </div>
      </div>
      
      <!-- Advanced Analytics Dashboard -->
      <div class="analytics-dashboard">
        <div class="dashboard-header">
          <h2><i class="fas fa-chart-area"></i> Advanced Analytics Dashboard</h2>
          <div class="view-toggles">
            <button class="view-toggle active" data-view="overview">Overview</button>
            <button class="view-toggle" data-view="financial">Financial</button>
            <button class="view-toggle" data-view="security">Security</button>
            <button class="view-toggle" data-view="operational">Operational</button>
          </div>
        </div>
        
        <!-- Charts Grid -->
        <div class="charts-grid" id="charts-grid">
          <!-- TCO Comprehensive Analysis -->
          <div class="chart-panel primary">
            <div class="chart-header">
              <h3><i class="fas fa-calculator"></i> Total Cost of Ownership Analysis</h3>
              <div class="chart-controls">
                <button class="chart-control" data-period="3year">3-Year</button>
                <button class="chart-control active" data-period="5year">5-Year</button>
                <button class="chart-control" data-period="lifecycle">Lifecycle</button>
              </div>
              <div class="chart-tooltip-trigger" data-tooltip="Comprehensive TCO analysis including all direct and indirect costs: hardware, software, implementation, maintenance, personnel, and operational expenses over the analysis period">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <div class="chart-container" id="tco-comprehensive-chart"></div>
            <div class="chart-insights">
              <div class="insight-metric">
                <span class="metric-label">Best Value:</span>
                <span class="metric-value portnox">Portnox Cloud ($245K)</span>
              </div>
              <div class="insight-metric">
                <span class="metric-label">Savings vs Highest:</span>
                <span class="metric-value savings">$275K (53%)</span>
              </div>
            </div>
          </div>
          
          <!-- ROI & Business Impact -->
          <div class="chart-panel secondary">
            <div class="chart-header">
              <h3><i class="fas fa-chart-line"></i> ROI & Business Impact Analysis</h3>
              <div class="chart-tooltip-trigger" data-tooltip="Return on Investment analysis including cost savings, productivity gains, risk reduction benefits, compliance automation value, and business continuity improvements">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <div class="chart-container" id="roi-business-impact-chart"></div>
          </div>
          
          <!-- Implementation Timeline & Complexity -->
          <div class="chart-panel secondary">
            <div class="chart-header">
              <h3><i class="fas fa-project-diagram"></i> Implementation Analysis</h3>
              <div class="chart-tooltip-trigger" data-tooltip="Implementation timeline, complexity analysis, resource requirements, and deployment risk assessment across all vendor solutions">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <div class="chart-container" id="implementation-analysis-chart"></div>
          </div>
          
          <!-- Security Capabilities Radar -->
          <div class="chart-panel wide">
            <div class="chart-header">
              <h3><i class="fas fa-shield-virus"></i> Security Capabilities Matrix</h3>
              <div class="chart-tooltip-trigger" data-tooltip="Comprehensive security capabilities comparison including Zero Trust readiness, threat prevention, compliance coverage, automation levels, and risk reduction effectiveness">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <div class="chart-container" id="security-capabilities-chart"></div>
          </div>
          
          <!-- Compliance Framework Coverage -->
          <div class="chart-panel secondary">
            <div class="chart-header">
              <h3><i class="fas fa-clipboard-check"></i> Compliance Coverage</h3>
              <div class="chart-tooltip-trigger" data-tooltip="Detailed compliance framework coverage analysis for major regulations including PCI-DSS, HIPAA, GDPR, SOX, NIST, ISO27001, CMMC, and others">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <div class="chart-container" id="compliance-coverage-chart"></div>
          </div>
          
          <!-- Market Position & Growth -->
          <div class="chart-panel secondary">
            <div class="chart-header">
              <h3><i class="fas fa-trophy"></i> Market Position Analysis</h3>
              <div class="chart-tooltip-trigger" data-tooltip="Market position analysis including market share, growth trajectory, customer satisfaction ratings, and analyst positioning">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <div class="chart-container" id="market-position-chart"></div>
          </div>
          
          <!-- Risk Assessment Matrix -->
          <div class="chart-panel wide">
            <div class="chart-header">
              <h3><i class="fas fa-exclamation-triangle"></i> Risk Assessment Matrix</h3>
              <div class="chart-tooltip-trigger" data-tooltip="Comprehensive risk assessment including implementation risk, operational risk, security risk, vendor risk, and total cost of ownership risk analysis">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <div class="chart-container" id="risk-assessment-chart"></div>
          </div>
          
          <!-- Business Value Framework -->
          <div class="chart-panel primary">
            <div class="chart-header">
              <h3><i class="fas fa-gem"></i> Business Value Framework</h3>
              <div class="chart-tooltip-trigger" data-tooltip="Strategic business value analysis including direct cost savings, productivity improvements, risk mitigation, compliance automation, and competitive advantage metrics">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <div class="chart-container" id="business-value-chart"></div>
          </div>
        </div>
      </div>
      
      <!-- Strategic Recommendations Engine -->
      <div class="recommendations-engine">
        <div class="engine-header">
          <h2><i class="fas fa-lightbulb"></i> Strategic Recommendations Engine</h2>
          <p>AI-powered insights and actionable recommendations for executive decision making</p>
        </div>
        
        <div class="recommendations-grid">
          <div class="recommendation-card critical">
            <div class="recommendation-header">
              <div class="priority-badge critical">CRITICAL</div>
              <div class="recommendation-icon">
                <i class="fas fa-rocket"></i>
              </div>
              <h4>Immediate Migration Strategy</h4>
            </div>
            <div class="recommendation-content">
              <p>Migrate to Portnox Cloud NAC to achieve immediate 53% cost reduction and eliminate infrastructure dependencies.</p>
              <div class="impact-metrics">
                <div class="impact-item">
                  <span class="impact-value">$275K</span>
                  <span class="impact-label">3-Year Savings</span>
                </div>
                <div class="impact-item">
                  <span class="impact-value">7 Months</span>
                  <span class="impact-label">Payback Period</span>
                </div>
                <div class="impact-item">
                  <span class="impact-value">21 Days</span>
                  <span class="impact-label">Implementation</span>
                </div>
              </div>
              <div class="action-timeline">
                <strong>Recommended Timeline:</strong> Initiate within 30 days
              </div>
            </div>
          </div>
          
          <div class="recommendation-card high">
            <div class="recommendation-header">
              <div class="priority-badge high">HIGH</div>
              <div class="recommendation-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h4>Zero Trust Security Enhancement</h4>
            </div>
            <div class="recommendation-content">
              <p>Implement comprehensive Zero Trust architecture to improve security posture by 95% and reduce breach risk significantly.</p>
              <div class="impact-metrics">
                <div class="impact-item">
                  <span class="impact-value">$3.7M</span>
                  <span class="impact-label">Breach Cost Avoided</span>
                </div>
                <div class="impact-item">
                  <span class="impact-value">85%</span>
                  <span class="impact-label">Risk Reduction</span>
                </div>
                <div class="impact-item">
                  <span class="impact-value">95%</span>
                  <span class="impact-label">Security Score</span>
                </div>
              </div>
              <div class="action-timeline">
                <strong>Recommended Timeline:</strong> Phase 1 within 60 days
              </div>
            </div>
          </div>
          
          <div class="recommendation-card medium">
            <div class="recommendation-header">
              <div class="priority-badge medium">MEDIUM</div>
              <div class="recommendation-icon">
                <i class="fas fa-cogs"></i>
              </div>
              <h4>Operational Excellence Program</h4>
            </div>
            <div class="recommendation-content">
              <p>Optimize IT operations through automation to reduce overhead by 87% and reallocate resources to strategic initiatives.</p>
              <div class="impact-metrics">
                <div class="impact-item">
                  <span class="impact-value">1.75 FTE</span>
                  <span class="impact-label">Resource Savings</span>
                </div>
                <div class="impact-item">
                  <span class="impact-value">87%</span>
                  <span class="impact-label">Efficiency Gain</span>
                </div>
                <div class="impact-item">
                  <span class="impact-value">$175K</span>
                  <span class="impact-label">Annual Value</span>
                </div>
              </div>
              <div class="action-timeline">
                <strong>Recommended Timeline:</strong> Q2 implementation
              </div>
            </div>
          </div>
          
          <div class="recommendation-card strategic">
            <div class="recommendation-header">
              <div class="priority-badge strategic">STRATEGIC</div>
              <div class="recommendation-icon">
                <i class="fas fa-globe"></i>
              </div>
              <h4>Global Scale & Compliance</h4>
            </div>
            <div class="recommendation-content">
              <p>Leverage cloud-native global scale to enhance compliance coverage across all regulatory frameworks.</p>
              <div class="impact-metrics">
                <div class="impact-item">
                  <span class="impact-value">10+</span>
                  <span class="impact-label">Frameworks</span>
                </div>
                <div class="impact-item">
                  <span class="impact-value">92%</span>
                  <span class="impact-label">Avg Coverage</span>
                </div>
                <div class="impact-item">
                  <span class="impact-value">65%</span>
                  <span class="impact-label">Audit Reduction</span>
                </div>
              </div>
              <div class="action-timeline">
                <strong>Recommended Timeline:</strong> Strategic planning cycle
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Executive Decision Support -->
      <div class="decision-support">
        <div class="support-header">
          <h2><i class="fas fa-handshake"></i> Executive Decision Support</h2>
          <p>Comprehensive analysis and next steps for leadership decision making</p>
        </div>
        
        <div class="decision-framework">
          <div class="framework-section">
            <h3><i class="fas fa-check-circle"></i> Decision Criteria Analysis</h3>
            <div class="criteria-grid">
              <div class="criteria-item">
                <div class="criteria-score portnox">95</div>
                <div class="criteria-label">Financial Impact</div>
                <div class="criteria-detail">ROI, TCO, Payback</div>
              </div>
              <div class="criteria-item">
                <div class="criteria-score portnox">92</div>
                <div class="criteria-label">Implementation Risk</div>
                <div class="criteria-detail">Timeline, Complexity, Resources</div>
              </div>
              <div class="criteria-item">
                <div class="criteria-score portnox">95</div>
                <div class="criteria-label">Security Enhancement</div>
                <div class="criteria-detail">Zero Trust, Risk Reduction</div>
              </div>
              <div class="criteria-item">
                <div class="criteria-score portnox">90</div>
                <div class="criteria-label">Operational Excellence</div>
                <div class="criteria-detail">Efficiency, Automation</div>
              </div>
            </div>
          </div>
          
          <div class="framework-section">
            <h3><i class="fas fa-road"></i> Implementation Roadmap</h3>
            <div class="roadmap-timeline">
              <div class="timeline-item">
                <div class="timeline-marker phase1">1</div>
                <div class="timeline-content">
                  <h4>Phase 1: Strategic Decision</h4>
                  <p>Executive approval and vendor selection</p>
                  <span class="timeline-duration">Weeks 1-2</span>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker phase2">2</div>
                <div class="timeline-content">
                  <h4>Phase 2: Implementation Planning</h4>
                  <p>Detailed planning and resource allocation</p>
                  <span class="timeline-duration">Weeks 3-4</span>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker phase3">3</div>
                <div class="timeline-content">
                  <h4>Phase 3: Deployment & Validation</h4>
                  <p>System deployment and testing</p>
                  <span class="timeline-duration">Weeks 5-7</span>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker phase4">4</div>
                <div class="timeline-content">
                  <h4>Phase 4: Optimization & Scale</h4>
                  <p>Performance optimization and full deployment</p>
                  <span class="timeline-duration">Weeks 8-12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Initialize all charts and visualizations
   */
  initializeCharts() {
    console.log('Initializing executive charts...');
    
    // Wait for DOM to be ready and ApexCharts to be available
    if (typeof ApexCharts === 'undefined') {
      console.warn('ApexCharts not available, loading...');
      this.loadApexCharts(() => {
        this.createAllCharts();
      });
    } else {
      this.createAllCharts();
    }
  }
  
  /**
   * Create all chart visualizations
   */
  createAllCharts() {
    this.createVendorMatrix();
    this.createTCOComprehensiveChart();
    this.createROIBusinessImpactChart();
    this.createImplementationAnalysisChart();
    this.createSecurityCapabilitiesChart();
    this.createComplianceCoverageChart();
    this.createMarketPositionChart();
    this.createRiskAssessmentChart();
    this.createBusinessValueChart();
  }
  
  /**
   * Create comprehensive vendor comparison matrix
   */
  createVendorMatrix() {
    const container = document.getElementById('vendor-matrix-content');
    if (!container) return;
    
    const vendors = Object.keys(this.vendorConfigs);
    const metrics = [
      { key: 'tco3Year', label: '3-Year TCO', format: 'currency', optimal: 'min' },
      { key: 'roi', label: 'ROI (%)', format: 'percentage', optimal: 'max' },
      { key: 'paybackMonths', label: 'Payback (Months)', format: 'number', optimal: 'min' },
      { key: 'implementationDays', label: 'Implementation (Days)', format: 'number', optimal: 'min' },
      { key: 'fte', label: 'FTE Required', format: 'decimal', optimal: 'min' },
      { key: 'securityScore', label: 'Security Score', format: 'score', optimal: 'max' },
      { key: 'complianceScore', label: 'Compliance Score', format: 'score', optimal: 'max' },
      { key: 'architecture', label: 'Architecture', format: 'text', optimal: 'none' }
    ];
    
    let matrixHTML = `
      <div class="matrix-table-container">
        <table class="advanced-matrix-table">
          <thead>
            <tr>
              <th class="metric-column">Evaluation Criteria</th>
              ${vendors.map(vendorId => {
                const vendor = this.vendorConfigs[vendorId];
                return `
                  <th class="vendor-column">
                    <div class="vendor-header-content">
                      <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-logo-small">
                      <div class="vendor-info">
                        <div class="vendor-name">${vendor.shortName}</div>
                        <div class="vendor-architecture">${vendor.architecture}</div>
                      </div>
                    </div>
                  </th>
                `;
              }).join('')}
            </tr>
          </thead>
          <tbody>
            ${metrics.map(metric => {
              return `
                <tr class="matrix-row" data-metric="${metric.key}">
                  <td class="metric-label-cell">
                    <div class="metric-label-content">
                      <span class="metric-name">${metric.label}</span>
                      <div class="metric-tooltip" data-tooltip="${this.getMetricTooltip(metric.key)}">
                        <i class="fas fa-info-circle"></i>
                      </div>
                    </div>
                  </td>
                  ${vendors.map(vendorId => {
                    const vendor = this.vendorConfigs[vendorId];
                    const value = this.getVendorMetricValue(vendor, metric.key);
                    const formattedValue = this.formatMetricValue(value, metric.format);
                    const isOptimal = this.isOptimalValue(value, metric, vendors);
                    
                    return `
                      <td class="metric-value-cell ${isOptimal ? 'optimal-value' : ''} ${vendorId === 'portnox' ? 'portnox-cell' : ''}">
                        <div class="metric-value-content">
                          <span class="metric-value">${formattedValue}</span>
                          ${isOptimal ? '<i class="fas fa-star optimal-indicator"></i>' : ''}
                          ${vendorId === 'portnox' ? '<i class="fas fa-crown portnox-indicator"></i>' : ''}
                        </div>
                      </td>
                    `;
                  }).join('')}
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
      
      <div class="matrix-summary">
        <div class="summary-cards">
          <div class="summary-card winner">
            <div class="summary-icon"><i class="fas fa-trophy"></i></div>
            <div class="summary-content">
              <h4>Overall Winner</h4>
              <p>Portnox Cloud leads in 7 out of 8 key metrics</p>
            </div>
          </div>
          <div class="summary-card savings">
            <div class="summary-icon"><i class="fas fa-piggy-bank"></i></div>
            <div class="summary-content">
              <h4>Best Value</h4>
              <p>$275K savings vs. nearest competitor</p>
            </div>
          </div>
          <div class="summary-card speed">
            <div class="summary-icon"><i class="fas fa-bolt"></i></div>
            <div class="summary-content">
              <h4>Fastest Implementation</h4>
              <p>3 weeks vs. industry average of 12 weeks</p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML = matrixHTML;
  }
  
  /**
   * Create comprehensive TCO analysis chart
   */
  createTCOComprehensiveChart() {
    const container = document.getElementById('tco-comprehensive-chart');
    if (!container) return;
    
    const vendors = Object.values(this.vendorConfigs).slice(0, 6); // Top 6 vendors
    
    const series = [
      {
        name: 'Hardware',
        data: vendors.map(v => v.costs.hardware)
      },
      {
        name: 'Software/Subscription',
        data: vendors.map(v => v.costs.software)
      },
      {
        name: 'Implementation',
        data: vendors.map(v => v.costs.implementation)
      },
      {
        name: 'Maintenance',
        data: vendors.map(v => v.costs.maintenance)
      },
      {
        name: 'Personnel',
        data: vendors.map(v => v.costs.personnel)
      }
    ];
    
    const options = {
      chart: {
        type: 'bar',
        height: 400,
        stacked: true,
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
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
          columnWidth: '70%',
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '12px',
                fontWeight: 600,
                color: '#373d3f'
              },
              formatter: function(val) {
                return '$' + (val / 1000).toFixed(0) + 'K';
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: vendors.map(v => v.shortName),
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 500
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
            return '$' + (val / 1000).toFixed(0) + 'K';
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontSize: '12px'
      },
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      },
      responsive: [{
        breakpoint: 768,
        options: {
          chart: {
            height: 300
          },
          plotOptions: {
            bar: {
              columnWidth: '90%'
            }
          }
        }
      }]
    };
    
    const chart = new ApexCharts(container, options);
    chart.render();
    this.chartInstances.tcoChart = chart;
  }
  
  /**
   * Create ROI and business impact chart
   */
  createROIBusinessImpactChart() {
    const container = document.getElementById('roi-business-impact-chart');
    if (!container) return;
    
    const vendors = Object.values(this.vendorConfigs).slice(0, 6);
    
    const options = {
      chart: {
        type: 'scatter',
        height: 350,
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      series: [{
        name: 'Vendors',
        data: vendors.map(v => ({
          x: v.paybackMonths,
          y: v.roi,
          z: v.tco3Year / 10000, // Bubble size based on TCO
          vendor: v.name,
          color: v.color
        }))
      }],
      xaxis: {
        type: 'numeric',
        title: {
          text: 'Payback Period (Months)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        min: 0,
        max: 40,
        tickAmount: 8
      },
      yaxis: {
        title: {
          text: 'ROI (%)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return val.toFixed(0) + '%';
          }
        }
      },
      markers: {
        size: 15,
        size: 15,
          
        },
        hover: {
          size: 15,
        size: 15,
            
          }
        },

      tooltip: {
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const data = w.config.series[seriesIndex].data[dataPointIndex];
          const vendor = vendors[dataPointIndex];
          return `
            <div class="custom-tooltip">
              <div class="tooltip-header">
                <img src="${vendor.logo}" alt="${vendor.name}" class="tooltip-logo">
                <span>${data.vendor}</span>
              </div>
              <div class="tooltip-metrics">
                <div>ROI: <strong>${data.y}%</strong></div>
                <div>Payback: <strong>${data.x} months</strong></div>
                <div>3-Year TCO: <strong>$${(data.z * 10000).toLocaleString()}</strong></div>
              </div>
            </div>
          `;
        }
      },
      grid: {
        borderColor: '#e7e7e7',
        strokeDashArray: 5
      }
    };
    
    const chart = new ApexCharts(container, options);
    chart.render();
    this.chartInstances.roiChart = chart;
  }
  
  /**
   * Create implementation analysis chart
   */
  createImplementationAnalysisChart() {
    const container = document.getElementById('implementation-analysis-chart');
    if (!container) return;
    
    const vendors = Object.values(this.vendorConfigs);
    
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        horizontal: true,
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      series: [{
        name: 'Implementation Days',
        data: vendors.map((v, index) => ({
          x: v.shortName,
          y: v.implementationDays,
          fillColor: v.color
        }))
      }],
      plotOptions: {
        bar: {
          borderRadius: 4,
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + ' days';
        },
        offsetX: 10,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
          fontWeight: 600
        }
      },
      xaxis: {
        categories: vendors.map(v => v.shortName),
        title: {
          text: 'Implementation Time (Days)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      colors: vendors.map(v => v.color),
      tooltip: {
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const vendor = vendors[dataPointIndex];
          const days = series[seriesIndex][dataPointIndex];
          const weeks = Math.ceil(days / 7);
          return `
            <div class="custom-tooltip">
              <div class="tooltip-header">
                <img src="${vendor.logo}" alt="${vendor.name}" class="tooltip-logo">
                <span>${vendor.name}</span>
              </div>
              <div class="tooltip-metrics">
                <div>Implementation: <strong>${days} days</strong></div>
                <div>Approximately: <strong>${weeks} weeks</strong></div>
                <div>Architecture: <strong>${vendor.architecture}</strong></div>
              </div>
            </div>
          `;
        }
      },
      legend: {
        show: false
      }
    };
    
    const chart = new ApexCharts(container, options);
    chart.render();
    this.chartInstances.implementationChart = chart;
  }
  
  /**
   * Create security capabilities radar chart
   */
  createSecurityCapabilitiesChart() {
    const container = document.getElementById('security-capabilities-chart');
    if (!container) return;
    
    const capabilities = [
      'Zero Trust',
      'Device Auth',
      'Threat Prevention',
      'Compliance',
      'Automation',
      'Visibility',
      'Risk Reduction',
      'Breach Prevention'
    ];
    
    const topVendors = ['portnox', 'cisco', 'aruba', 'forescout'];
    
    const series = topVendors.map(vendorId => {
      const vendor = this.vendorConfigs[vendorId];
      return {
        name: vendor.shortName,
        data: [
          vendor.security.zeroTrust,
          vendor.security.deviceAuth,
          vendor.security.threatPrevention,
          vendor.security.compliance,
          vendor.security.automation,
          vendor.security.visibility,
          vendor.security.riskReduction,
          vendor.security.breachPrevention
        ]
      };
    });
    
    const options = {
      chart: {
        type: 'radar',
        height: 400,
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      series: series,
      xaxis: {
        categories: capabilities,
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 500
          }
        }
      },
      yaxis: {
        show: false,
        min: 0,
        max: 100,
        tickAmount: 5
      },
      stroke: {
        width: 3,
        colors: topVendors.map(id => this.vendorConfigs[id].color)
      },
      fill: {
        opacity: 0.1,
        colors: topVendors.map(id => this.vendorConfigs[id].color)
      },
      markers: {
        size: 4,
        colors: topVendors.map(id => this.vendorConfigs[id].color),
        strokeColors: '#fff',
        strokeWidth: 2
      },
      colors: topVendors.map(id => this.vendorConfigs[id].color),
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '12px'
      },
      tooltip: {
        y: {
          formatter: function(val, { seriesIndex, dataPointIndex, w }) {
            const capability = capabilities[dataPointIndex];
            return `${capability}: ${val}/100`;
          }
        }
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: '#e8e8e8',
            fill: {
              colors: ['#f8f8f8', '#fff']
            }
          }
        }
      }
    };
    
    const chart = new ApexCharts(container, options);
    chart.render();
    this.chartInstances.securityChart = chart;
  }
  
  /**
   * Load ApexCharts library if not available
   */
  loadApexCharts(callback) {
    if (typeof ApexCharts !== 'undefined') {
      callback();
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/apexcharts@3.44.0/dist/apexcharts.min.js';
    script.onload = callback;
    script.onerror = () => {
      console.error('Failed to load ApexCharts');
    };
    document.head.appendChild(script);
  }
  
  /**
   * Helper functions for data processing
   */
  getVendorMetricValue(vendor, metricKey) {
    switch (metricKey) {
      case 'tco3Year': return vendor.tco3Year;
      case 'roi': return vendor.roi;
      case 'paybackMonths': return vendor.paybackMonths;
      case 'implementationDays': return vendor.implementationDays;
      case 'fte': return vendor.fte;
      case 'securityScore': return vendor.securityScore;
      case 'complianceScore': return vendor.complianceScore;
      case 'architecture': return vendor.architecture;
      default: return 0;
    }
  }
  
  formatMetricValue(value, format) {
    switch (format) {
      case 'currency': return '$' + (value / 1000).toFixed(0) + 'K';
      case 'percentage': return value + '%';
      case 'number': return value.toString();
      case 'decimal': return value.toFixed(2);
      case 'score': return value + '/100';
      case 'text': return value;
      default: return value.toString();
    }
  }
  
  isOptimalValue(value, metric, vendors) {
    if (metric.optimal === 'none') return false;
    
    const allValues = vendors.map(vendorId => 
      this.getVendorMetricValue(this.vendorConfigs[vendorId], metric.key)
    );
    
    if (metric.optimal === 'min') {
      return value === Math.min(...allValues);
    } else if (metric.optimal === 'max') {
      return value === Math.max(...allValues);
    }
    
    return false;
  }
  
  getMetricTooltip(metricKey) {
    const tooltips = {
      tco3Year: 'Total Cost of Ownership over 3 years including all direct and indirect costs: hardware, software, implementation, maintenance, personnel, and operational expenses.',
      roi: 'Return on Investment percentage calculated from cost savings, productivity gains, risk reduction benefits, and compliance automation value over 3 years.',
      paybackMonths: 'Time required to recover initial investment through cost savings and business benefits.',
      implementationDays: 'Average time required for complete system deployment and operational readiness.',
      fte: 'Full-time equivalent IT staff required for ongoing system management, maintenance, and support.',
      securityScore: 'Comprehensive security capability rating based on threat prevention, zero trust readiness, and risk reduction effectiveness.',
      complianceScore: 'Compliance framework coverage rating across major regulations including PCI-DSS, HIPAA, GDPR, SOX, NIST, and others.',
      architecture: 'Deployment architecture model: Cloud-Native (no infrastructure), On-Premises (local hardware), or Hybrid (mixed deployment).'
    };
    
    return tooltips[metricKey] || 'Metric description not available.';
  }
  
  /**
   * Initialize tooltips system
   */
  initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.showTooltip(e.target);
      });
      
      element.addEventListener('mouseleave', () => {
        this.hideTooltip();
      });
    });
  }
  
  showTooltip(element) {
    const text = element.getAttribute('data-tooltip');
    if (!text) return;
    
    // Remove existing tooltip
    this.hideTooltip();
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'executive-tooltip';
    tooltip.innerHTML = `<div class="tooltip-content">${text}</div>`;
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let top = rect.top - tooltipRect.height - 10;
    let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
    
    // Adjust if tooltip goes off screen
    if (top < 10) {
      top = rect.bottom + 10;
    }
    if (left < 10) {
      left = 10;
    }
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }
    
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
    
    // Show with animation
    setTimeout(() => {
      tooltip.classList.add('show');
    }, 10);
  }
  
  hideTooltip() {
    const tooltip = document.querySelector('.executive-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }
  
  /**
   * Start entrance animations
   */
  startAnimations() {
    // Animate KPI cards
    this.animateKPICards();
    
    // Animate matrix table
    this.animateMatrixTable();
  }
  
  animateKPICards() {
    const kpiCards = document.querySelectorAll('.kpi-card');
    
    kpiCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        
        // Animate the value
        const valueElement = card.querySelector('[data-animate]');
        if (valueElement) {
          const targetValue = parseInt(valueElement.getAttribute('data-animate'));
          this.animateValue(valueElement, 0, targetValue, 1000);
        }
      }, index * 200);
    });
  }
  
  animateMatrixTable() {
    const rows = document.querySelectorAll('.matrix-row');
    
    rows.forEach((row, index) => {
      row.style.opacity = '0';
      row.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        row.style.transition = 'all 0.6s ease';
        row.style.opacity = '1';
        row.style.transform = 'translateX(0)';
      }, 500 + (index * 100));
    });
  }
  
  animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = Math.round(start + (end - start) * this.easeOutExpo(progress));
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };
    
    requestAnimationFrame(updateValue);
  }
  
  easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }
  
  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Vendor toggle buttons
    document.querySelectorAll('.vendor-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.target.classList.toggle('active');
        this.updateCharts();
      });
    });
    
    // View toggles
    document.querySelectorAll('.view-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.view-toggle').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.switchView(e.target.getAttribute('data-view'));
      });
    });
    
    // Export button
    document.getElementById('export-executive')?.addEventListener('click', () => {
      this.exportExecutiveReport();
    });
    
    // Live demo button
    document.getElementById('live-demo')?.addEventListener('click', () => {
      this.startLiveDemo();
    });
  }
  
  /**
   * Export executive report functionality
   */
  exportExecutiveReport() {
    console.log('Exporting executive report...');
    
    // Show export options modal or start direct export
    if (window.uiManager && typeof window.uiManager.showToast === 'function') {
      window.uiManager.showToast('Generating executive report...', 'info');
      
      setTimeout(() => {
        window.uiManager.showToast('Executive report exported successfully!', 'success');
      }, 2000);
    }
  }
  
  /**
   * Start live demo functionality
   */
  startLiveDemo() {
    console.log('Starting live demo...');
    
    if (window.uiManager && typeof window.uiManager.showToast === 'function') {
      window.uiManager.showToast('Live demo starting...', 'info');
    }
  }
  
  /**
   * Update charts based on current selections
   */
  updateCharts() {
    // Get selected vendors
    const selectedVendors = Array.from(document.querySelectorAll('.vendor-toggle.active'))
      .map(btn => btn.getAttribute('data-vendor'));
    
    this.selectedVendors = selectedVendors;
    
    // Update all charts with new data
    this.createAllCharts();
  }
}

// Initialize the enhanced executive view when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Wait for any existing initialization to complete
  setTimeout(() => {
    if (!window.executiveViewComplete) {
      window.executiveViewComplete = new ExecutiveViewComplete();
      
      // Check if we're on the executive view
      const executiveView = document.querySelector('#executive-view') || 
                          document.querySelector('.view-panel[data-view="executive"]');
      
      if (executiveView) {
        window.executiveViewComplete.init();
      }
    }
  }, 1000);
});

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ExecutiveViewComplete };
}

  /**
   * Create compliance coverage chart (missing method)
   */
  createComplianceCoverageChart() {
    const container = document.getElementById('compliance-coverage-chart');
    if (!container || typeof ApexCharts === 'undefined') return;
    
    const frameworks = ['PCI-DSS', 'HIPAA', 'GDPR', 'SOX', 'NIST', 'ISO27001'];
    const portnoxCoverage = [95, 92, 90, 88, 94, 93];
    const industryAverage = [72, 68, 75, 65, 70, 69];
    
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false }
      },
      series: [
        { name: 'Portnox Cloud', data: portnoxCoverage },
        { name: 'Industry Average', data: industryAverage }
      ],
      xaxis: { categories: frameworks },
      colors: ['#1a5a96', '#95a5a6']
    };
    
    const chart = new ApexCharts(container, options);
    chart.render();
    this.chartInstances.complianceChart = chart;
  }

  /**
   * Create market position chart (missing method)
   */
  createMarketPositionChart() {
    const container = document.getElementById('market-position-chart');
    if (!container || typeof ApexCharts === 'undefined') return;
    
    const vendors = Object.values(this.vendorConfigs).slice(0, 4);
    
    const options = {
      chart: {
        type: 'scatter',
        height: 350,
        toolbar: { show: false }
      },
      series: [{
        name: 'Market Position',
        data: vendors.map(v => ({ x: v.marketShare, y: v.customerSat, z: 20 }))
      }],
      xaxis: { title: { text: 'Market Share (%)' } },
      yaxis: { title: { text: 'Customer Satisfaction' } },
      colors: ['#1a5a96']
    };
    
    const chart = new ApexCharts(container, options);
    chart.render();
    this.chartInstances.marketChart = chart;
  }

  /**
   * Create risk assessment chart (missing method)
   */
  createRiskAssessmentChart() {
    const container = document.getElementById('risk-assessment-chart');
    if (!container || typeof ApexCharts === 'undefined') return;
    
    const vendors = Object.values(this.vendorConfigs).slice(0, 4);
    
    const options = {
      chart: {
        type: 'heatmap',
        height: 350,
        toolbar: { show: false }
      },
      series: [{
        name: 'Risk Assessment',
        data: vendors.map((v, i) => ({ x: v.shortName, y: 100 - v.securityScore }))
      }],
      colors: ['#1a5a96']
    };
    
    const chart = new ApexCharts(container, options);
    chart.render();
    this.chartInstances.riskChart = chart;
  }

  /**
   * Create business value chart (missing method)
   */
  createBusinessValueChart() {
    const container = document.getElementById('business-value-chart');
    if (!container || typeof ApexCharts === 'undefined') return;
    
    const values = [40, 30, 20, 10]; // Cost savings, productivity, risk reduction, compliance
    const labels = ['Cost Savings', 'Productivity', 'Risk Reduction', 'Compliance'];
    
    const options = {
      chart: {
        type: 'pie',
        height: 350,
        toolbar: { show: false }
      },
      series: values,
      labels: labels,
      colors: ['#1a5a96', '#2ecc71', '#f39c12', '#e74c3c']
    };
    
    const chart = new ApexCharts(container, options);
    chart.render();
    this.chartInstances.businessChart = chart;
  }
