/**
 * Zero Trust Total Cost Analyzer - Executive Intelligence Platform
 * Complete analytics platform with advanced visualizations and comprehensive data
 */

class ZeroTrustExecutivePlatform {
    constructor() {
        this.initialized = false;
        this.currentTab = 'overview';
        this.selectedVendors = ['portnox', 'cisco', 'aruba', 'forescout'];
        this.chartInstances = {};
        this.animationQueue = [];
        this.eventListeners = [];
        
        // Configuration parameters
        this.config = {
            deviceCount: 1000,
            analysisPeriod: 3,
            riskFactor: 1.0,
            industry: 'technology',
            companySize: 'medium',
            fteCost: 100000,
            breachCost: 4350000,
            downtimeCost: 5000
        };
        
        // Initialize comprehensive data
        this.vendorData = this.initializeComprehensiveVendorData();
        this.industryData = this.initializeIndustryData();
        this.complianceData = this.initializeComplianceData();
        this.riskProfiles = this.initializeRiskProfiles();
        this.chartTypes = this.initializeChartTypes();
    }
    
    initializeComprehensiveVendorData() {
        return {
            'portnox': {
                name: 'Portnox Cloud',
                shortName: 'Portnox',
                logo: './img/vendors/portnox-logo.png',
                color: '#1a5a96',
                architecture: 'Cloud-Native',
                marketPosition: 'Visionary',
                founded: 2014,
                employees: '100-500',
                headquarters: 'New York, USA',
                costs: {
                    tco1Year: 85000,
                    tco3Year: 245000,
                    tco5Year: 390000,
                    licensePerDevice: 45,
                    implementationCost: 15000,
                    maintenanceCost: 0,
                    personnelCostPerYear: 25000,
                    trainingCost: 5000
                },
                metrics: {
                    roi1Year: 180,
                    roi3Year: 325,
                    roi5Year: 485,
                    paybackMonths: 7,
                    implementationDays: 21,
                    fteRequired: 0.25,
                    securityScore: 95,
                    complianceScore: 92,
                    performanceScore: 94,
                    reliabilityScore: 98,
                    userSatisfaction: 92,
                    marketShare: 12
                },
                capabilities: {
                    zeroTrust: 95,
                    deviceAuth: 98,
                    riskAssessment: 92,
                    automatedRemediation: 90,
                    cloudIntegration: 98,
                    mobileSupport: 95,
                    iotSupport: 88,
                    byodSupport: 96,
                    aiMl: 85,
                    reporting: 92
                },
                compliance: {
                    nistCsf: 94,
                    pciDss: 91,
                    hipaa: 89,
                    gdpr: 93,
                    iso27001: 90,
                    sox: 88,
                    fedramp: 85,
                    fisma: 87,
                    ccpa: 91,
                    cis: 93
                },
                integrations: {
                    azure: true,
                    aws: true,
                    googleWorkspace: true,
                    okta: true,
                    activedirectory: true,
                    radius: true,
                    siem: true,
                    mdm: true,
                    serviceNow: true,
                    splunk: true
                },
                deployment: {
                    cloud: true,
                    onPremises: false,
                    hybrid: true,
                    saas: true,
                    requiresHardware: false,
                    requiresAgents: false,
                    remoteWorkSupport: true
                },
                technical: {
                    maxDevices: 'Unlimited',
                    performanceImpact: 'Minimal',
                    reliability: 99.9,
                    updateFrequency: 'Continuous',
                    apiAvailable: true,
                    restApi: true,
                    webhook: true
                }
            },
            'cisco': {
                name: 'Cisco Identity Services Engine (ISE)',
                shortName: 'Cisco ISE',
                logo: './img/vendors/cisco-logo.png',
                color: '#00bceb',
                architecture: 'On-Premises',
                marketPosition: 'Leader',
                costs: {
                    tco1Year: 185000,
                    tco3Year: 520000,
                    tco5Year: 780000,
                    licensePerDevice: 85,
                    implementationCost: 75000,
                    maintenanceCost: 45000,
                    personnelCostPerYear: 85000,
                    trainingCost: 25000
                },
                metrics: {
                    roi1Year: -15,
                    roi3Year: 45,
                    roi5Year: 125,
                    paybackMonths: 32,
                    implementationDays: 90,
                    fteRequired: 2.0,
                    securityScore: 85,
                    complianceScore: 82,
                    performanceScore: 78,
                    reliabilityScore: 88,
                    userSatisfaction: 75,
                    marketShare: 35
                },
                capabilities: {
                    zeroTrust: 75,
                    deviceAuth: 88,
                    riskAssessment: 80,
                    automatedRemediation: 70,
                    cloudIntegration: 65,
                    mobileSupport: 75,
                    iotSupport: 82,
                    byodSupport: 78,
                    aiMl: 60,
                    reporting: 85
                },
                compliance: {
                    nistCsf: 85,
                    pciDss: 88,
                    hipaa: 82,
                    gdpr: 75,
                    iso27001: 85,
                    sox: 80,
                    fedramp: 90,
                    fisma: 88,
                    ccpa: 78,
                    cis: 82
                }
            },
            'aruba': {
                name: 'Aruba ClearPass',
                shortName: 'Aruba',
                logo: './img/vendors/aruba-logo.png',
                color: '#ff6900',
                architecture: 'On-Premises/Hybrid',
                marketPosition: 'Strong Performer',
                costs: {
                    tco1Year: 165000,
                    tco3Year: 480000,
                    tco5Year: 720000,
                    licensePerDevice: 75,
                    implementationCost: 65000,
                    maintenanceCost: 38000,
                    personnelCostPerYear: 75000,
                    trainingCost: 20000
                },
                metrics: {
                    roi1Year: 5,
                    roi3Year: 85,
                    roi5Year: 165,
                    paybackMonths: 28,
                    implementationDays: 75,
                    fteRequired: 1.75,
                    securityScore: 82,
                    complianceScore: 78,
                    performanceScore: 85,
                    reliabilityScore: 82,
                    userSatisfaction: 78,
                    marketShare: 18
                },
                capabilities: {
                    zeroTrust: 70,
                    deviceAuth: 85,
                    riskAssessment: 78,
                    automatedRemediation: 65,
                    cloudIntegration: 70,
                    mobileSupport: 80,
                    iotSupport: 75,
                    byodSupport: 82,
                    aiMl: 55,
                    reporting: 80
                }
            },
            'forescout': {
                name: 'Forescout Platform',
                shortName: 'Forescout',
                logo: './img/vendors/forescout-logo.png',
                color: '#7a2a90',
                architecture: 'On-Premises',
                costs: {
                    tco1Year: 155000,
                    tco3Year: 430000,
                    tco5Year: 650000,
                    licensePerDevice: 70,
                    implementationCost: 55000,
                    maintenanceCost: 35000,
                    personnelCostPerYear: 65000,
                    trainingCost: 18000
                },
                metrics: {
                    roi1Year: 12,
                    roi3Year: 95,
                    roi5Year: 185,
                    paybackMonths: 25,
                    implementationDays: 60,
                    fteRequired: 1.5,
                    securityScore: 88,
                    complianceScore: 85,
                    performanceScore: 80,
                    reliabilityScore: 85,
                    userSatisfaction: 80,
                    marketShare: 15
                },
                capabilities: {
                    zeroTrust: 80,
                    deviceAuth: 90,
                    riskAssessment: 88,
                    automatedRemediation: 75,
                    cloudIntegration: 60,
                    mobileSupport: 70,
                    iotSupport: 92,
                    byodSupport: 75,
                    aiMl: 70,
                    reporting: 88
                }
            },
            'fortinac': {
                name: 'Fortinet FortiNAC',
                shortName: 'FortiNAC',
                logo: './img/vendors/fortinet-logo.png',
                color: '#ee3124',
                architecture: 'On-Premises',
                costs: {
                    tco1Year: 145000,
                    tco3Year: 400000,
                    tco5Year: 600000,
                    licensePerDevice: 65,
                    implementationCost: 50000,
                    maintenanceCost: 30000,
                    personnelCostPerYear: 60000,
                    trainingCost: 15000
                },
                metrics: {
                    roi1Year: 15,
                    roi3Year: 105,
                    roi5Year: 195,
                    paybackMonths: 22,
                    implementationDays: 60,
                    fteRequired: 1.25,
                    securityScore: 80,
                    complianceScore: 82,
                    performanceScore: 75,
                    reliabilityScore: 80,
                    userSatisfaction: 75,
                    marketShare: 8
                }
            },
            'juniper': {
                name: 'Juniper Mist Access Assurance',
                shortName: 'Juniper',
                logo: './img/vendors/juniper-logo.png',
                color: '#84bd00',
                architecture: 'Cloud-Managed',
                costs: {
                    tco1Year: 125000,
                    tco3Year: 350000,
                    tco5Year: 525000,
                    licensePerDevice: 55,
                    implementationCost: 35000,
                    maintenanceCost: 20000,
                    personnelCostPerYear: 45000,
                    trainingCost: 12000
                },
                metrics: {
                    roi1Year: 40,
                    roi3Year: 125,
                    roi5Year: 225,
                    paybackMonths: 18,
                    implementationDays: 45,
                    fteRequired: 1.0,
                    securityScore: 78,
                    complianceScore: 75,
                    performanceScore: 88,
                    reliabilityScore: 85,
                    userSatisfaction: 82,
                    marketShare: 6
                }
            },
            'arista': {
                name: 'Arista CloudVision',
                shortName: 'Arista',
                logo: './img/vendors/arista-logo.png',
                color: '#ff6600',
                architecture: 'Hybrid',
                costs: {
                    tco1Year: 135000,
                    tco3Year: 320000,
                    tco5Year: 480000,
                    licensePerDevice: 50,
                    implementationCost: 40000,
                    maintenanceCost: 25000,
                    personnelCostPerYear: 50000,
                    trainingCost: 10000
                },
                metrics: {
                    roi1Year: 35,
                    roi3Year: 115,
                    roi5Year: 205,
                    paybackMonths: 15,
                    implementationDays: 45,
                    fteRequired: 1.0,
                    securityScore: 75,
                    complianceScore: 78,
                    performanceScore: 85,
                    reliabilityScore: 88,
                    userSatisfaction: 79,
                    marketShare: 3
                }
            },
            'microsoft': {
                name: 'Microsoft Network Policy Server',
                shortName: 'Microsoft',
                logo: './img/vendors/microsoft-logo.png',
                color: '#00bcf2',
                architecture: 'On-Premises',
                costs: {
                    tco1Year: 105000,
                    tco3Year: 290000,
                    tco5Year: 435000,
                    licensePerDevice: 40,
                    implementationCost: 25000,
                    maintenanceCost: 15000,
                    personnelCostPerYear: 55000,
                    trainingCost: 8000
                },
                metrics: {
                    roi1Year: 25,
                    roi3Year: 95,
                    roi5Year: 175,
                    paybackMonths: 20,
                    implementationDays: 30,
                    fteRequired: 1.0,
                    securityScore: 65,
                    complianceScore: 70,
                    performanceScore: 70,
                    reliabilityScore: 75,
                    userSatisfaction: 68,
                    marketShare: 10
                }
            },
            'securew2': {
                name: 'SecureW2 JoinNow',
                shortName: 'SecureW2',
                logo: './img/vendors/securew2-logo.png',
                color: '#2c5aa0',
                architecture: 'Cloud',
                costs: {
                    tco1Year: 95000,
                    tco3Year: 280000,
                    tco5Year: 420000,
                    licensePerDevice: 35,
                    implementationCost: 20000,
                    maintenanceCost: 10000,
                    personnelCostPerYear: 35000,
                    trainingCost: 6000
                },
                metrics: {
                    roi1Year: 180,
                    roi3Year: 285,
                    roi5Year: 395,
                    paybackMonths: 12,
                    implementationDays: 30,
                    fteRequired: 0.5,
                    securityScore: 72,
                    complianceScore: 68,
                    performanceScore: 78,
                    reliabilityScore: 80,
                    userSatisfaction: 76,
                    marketShare: 4
                }
            },
            'foxpass': {
                name: 'Foxpass RADIUS',
                shortName: 'Foxpass',
                logo: './img/vendors/foxpass-logo.png',
                color: '#ff4444',
                architecture: 'Cloud',
                costs: {
                    tco1Year: 85000,
                    tco3Year: 270000,
                    tco5Year: 405000,
                    licensePerDevice: 30,
                    implementationCost: 15000,
                    maintenanceCost: 8000,
                    personnelCostPerYear: 30000,
                    trainingCost: 5000
                },
                metrics: {
                    roi1Year: 160,
                    roi3Year: 265,
                    roi5Year: 375,
                    paybackMonths: 10,
                    implementationDays: 25,
                    fteRequired: 0.5,
                    securityScore: 68,
                    complianceScore: 65,
                    performanceScore: 75,
                    reliabilityScore: 78,
                    userSatisfaction: 73,
                    marketShare: 2
                }
            }
        };
    }
    
    initializeIndustryData() {
        return {
            'technology': {
                name: 'Technology',
                riskMultiplier: 1.2,
                complianceWeight: 0.9,
                breachCost: 4350000,
                avgDevices: 2500,
                regulatoryRequirements: ['GDPR', 'CCPA', 'SOX']
            },
            'healthcare': {
                name: 'Healthcare',
                riskMultiplier: 1.8,
                complianceWeight: 1.5,
                breachCost: 7800000,
                avgDevices: 1800,
                regulatoryRequirements: ['HIPAA', 'GDPR', 'NIST CSF']
            },
            'finance': {
                name: 'Financial Services',
                riskMultiplier: 2.0,
                complianceWeight: 1.8,
                breachCost: 5720000,
                avgDevices: 3200,
                regulatoryRequirements: ['PCI DSS', 'SOX', 'GDPR', 'NIST CSF']
            },
            'government': {
                name: 'Government',
                riskMultiplier: 1.5,
                complianceWeight: 2.0,
                breachCost: 4100000,
                avgDevices: 2800,
                regulatoryRequirements: ['FedRAMP', 'FISMA', 'NIST CSF']
            },
            'education': {
                name: 'Education',
                riskMultiplier: 1.1,
                complianceWeight: 1.2,
                breachCost: 3200000,
                avgDevices: 1500,
                regulatoryRequirements: ['FERPA', 'GDPR']
            },
            'retail': {
                name: 'Retail',
                riskMultiplier: 1.3,
                complianceWeight: 1.1,
                breachCost: 3800000,
                avgDevices: 2200,
                regulatoryRequirements: ['PCI DSS', 'GDPR', 'CCPA']
            },
            'manufacturing': {
                name: 'Manufacturing',
                riskMultiplier: 1.4,
                complianceWeight: 1.0,
                breachCost: 4200000,
                avgDevices: 1900,
                regulatoryRequirements: ['ISO 27001', 'NIST CSF']
            },
            'energy': {
                name: 'Energy & Utilities',
                riskMultiplier: 1.6,
                complianceWeight: 1.4,
                breachCost: 6500000,
                avgDevices: 2600,
                regulatoryRequirements: ['NERC CIP', 'NIST CSF', 'ISO 27001']
            }
        };
    }
    
    initializeComplianceData() {
        return {
            'nist-csf': {
                name: 'NIST Cybersecurity Framework',
                priority: 'High',
                categories: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
                applicableIndustries: 'All',
                penaltyRange: '$100K - $10M'
            },
            'pci-dss': {
                name: 'PCI DSS',
                priority: 'Critical',
                categories: ['Build', 'Maintain', 'Protect', 'Monitor', 'Test'],
                applicableIndustries: 'Retail, Finance',
                penaltyRange: '$5K - $100K per month'
            },
            'hipaa': {
                name: 'HIPAA',
                priority: 'Critical',
                categories: ['Administrative', 'Physical', 'Technical'],
                applicableIndustries: 'Healthcare',
                penaltyRange: '$100 - $50K per violation'
            },
            'gdpr': {
                name: 'GDPR',
                priority: 'High',
                categories: ['Lawfulness', 'Purpose', 'Minimization', 'Accuracy'],
                applicableIndustries: 'Global',
                penaltyRange: '4% of annual revenue'
            },
            'iso27001': {
                name: 'ISO 27001',
                priority: 'Medium',
                categories: ['Context', 'Leadership', 'Planning', 'Support'],
                applicableIndustries: 'All',
                penaltyRange: 'Certification costs'
            },
            'sox': {
                name: 'Sarbanes-Oxley',
                priority: 'High',
                categories: ['Financial', 'IT Controls', 'Documentation'],
                applicableIndustries: 'Public Companies',
                penaltyRange: '$1M - $25M'
            },
            'fedramp': {
                name: 'FedRAMP',
                priority: 'Critical',
                categories: ['Low', 'Moderate', 'High'],
                applicableIndustries: 'Government',
                penaltyRange: 'Contract termination'
            },
            'fisma': {
                name: 'FISMA',
                priority: 'Critical',
                categories: ['Categorize', 'Select', 'Implement', 'Assess'],
                applicableIndustries: 'Government',
                penaltyRange: 'Legal penalties'
            },
            'ccpa': {
                name: 'CCPA',
                priority: 'High',
                categories: ['Notice', 'Choice', 'Access', 'Deletion'],
                applicableIndustries: 'California businesses',
                penaltyRange: '$2,500 - $7,500 per violation'
            },
            'cis': {
                name: 'CIS Controls',
                priority: 'Medium',
                categories: ['Basic', 'Foundational', 'Organizational'],
                applicableIndustries: 'All',
                penaltyRange: 'Best practice framework'
            }
        };
    }
    
    initializeRiskProfiles() {
        return {
            'dataBreachCost': {
                name: 'Data Breach Cost',
                averageCost: 4350000,
                industryMultipliers: {
                    healthcare: 1.8,
                    finance: 1.3,
                    technology: 1.0,
                    government: 0.9,
                    retail: 0.9,
                    education: 0.7,
                    manufacturing: 1.0,
                    energy: 1.5
                }
            },
            'downtimeCost': {
                name: 'Network Downtime',
                costPerHour: 5000,
                industryMultipliers: {
                    finance: 2.5,
                    healthcare: 2.0,
                    technology: 1.5,
                    retail: 1.2,
                    manufacturing: 1.8,
                    energy: 2.2,
                    government: 1.0,
                    education: 0.8
                }
            },
            'compliancePenalty': {
                name: 'Compliance Penalties',
                averageCost: 2500000,
                frameworkMultipliers: {
                    'hipaa': 2.0,
                    'pci-dss': 1.5,
                    'gdpr': 3.0,
                    'sox': 2.5,
                    'fedramp': 1.0,
                    'nist-csf': 1.2
                }
            },
            'reputationImpact': {
                name: 'Reputation Damage',
                multiplier: 1.5,
                recoveryTimeMonths: 18,
                customerLossPercentage: 15
            }
        };
    }
    
    initializeChartTypes() {
        return {
            'highcharts': {
                column: 'Column Chart',
                bar: 'Bar Chart',
                line: 'Line Chart',
                area: 'Area Chart',
                pie: 'Pie Chart',
                scatter: 'Scatter Plot',
                bubble: 'Bubble Chart',
                heatmap: 'Heatmap',
                treemap: 'Treemap',
                funnel: 'Funnel Chart',
                waterfall: 'Waterfall Chart',
                gantt: 'Gantt Chart',
                networkgraph: 'Network Graph',
                sankey: 'Sankey Diagram'
            },
            'd3': {
                radar: 'Radar Chart',
                chord: 'Chord Diagram',
                sunburst: 'Sunburst Chart',
                force: 'Force-Directed Graph',
                timeline: 'Timeline',
                kanban: 'Kanban Board',
                calendar: 'Calendar Heatmap'
            }
        };
    }
    
    init() {
        if (this.initialized) return this;
        
        console.log("🚀 Initializing Zero Trust Executive Platform...");
        
        this.createExecutiveCommandCenter();
        this.createVendorSelection();
        this.createExecutiveKPIs();
        this.createCostAnalysisControls();
        this.createTabNavigation();
        this.createTabContent();
        this.setupEventListeners();
        this.initializeParticles();
        this.startAnimations();
        this.bindCalculationEvents();
        
        this.initialized = true;
        console.log("✅ Zero Trust Executive Platform initialized successfully");
        return this;
    }
    
    createExecutiveCommandCenter() {
        const container = document.querySelector('#executive-view .view-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="executive-command-center fade-in">
                <!-- Executive Command Center Header -->
                <div class="command-header">
                    <div class="executive-branding">
                        <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="brand-logo">
                        <div class="brand-text">
                            <h1>Executive Command Center</h1>
                            <p>Zero Trust NAC Solution Analysis & Strategic Intelligence Platform</p>
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
                        <button class="cmd-btn utility" id="schedule-meeting">
                            <i class="fas fa-calendar-plus"></i> Schedule
                        </button>
                    </div>
                </div>
                
                <!-- Vendor Selection -->
                <div id="vendor-selection-container"></div>
                
                <!-- Cost Analysis Controls -->
                <div id="cost-analysis-container"></div>
                
                <!-- Executive KPIs -->
                <div id="executive-kpis-container"></div>
                
                <!-- Tab Navigation -->
                <div id="tab-navigation-container"></div>
                
                <!-- Tab Content -->
                <div id="tab-content-container"></div>
            </div>
        `;
    }
    
    createVendorSelection() {
        const container = document.getElementById('vendor-selection-container');
        if (!container) return;
        
        const vendorButtons = Object.keys(this.vendorData).map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const isActive = this.selectedVendors.includes(vendorId);
            
            return `
                <button class="vendor-btn ${isActive ? 'active' : ''}" data-vendor="${vendorId}">
                    <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-btn-logo">
                    <span class="vendor-btn-name">${vendor.shortName}</span>
                </button>
            `;
        }).join('');
        
        container.innerHTML = `
            <div class="vendor-selection-bar slide-up">
                <div class="vendor-label">
                    <i class="fas fa-balance-scale"></i>
                    Compare Solutions:
                </div>
                <div class="vendor-buttons">
                    ${vendorButtons}
                </div>
                <div class="vendor-stats">
                    <span class="selected-count">${this.selectedVendors.length}</span> vendors selected
                    <span style="margin-left: 1rem; color: #666;">|</span>
                    <span style="margin-left: 1rem;">Market Coverage: ${this.calculateMarketCoverage()}%</span>
                </div>
            </div>
        `;
    }
    
    createCostAnalysisControls() {
        const container = document.getElementById('cost-analysis-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="cost-analysis-controls slide-up">
                <div class="chart-header">
                    <h3 class="chart-title">
                        <i class="fas fa-sliders-h"></i>
                        Cost Analysis & Configuration
                    </h3>
                    <div class="chart-subtitle">Customize analysis parameters for accurate TCO calculations</div>
                </div>
                
                <div class="controls-grid">
                    <div class="control-group">
                        <label for="device-count-slider">Device Count</label>
                        <input type="range" id="device-count-slider" min="100" max="10000" value="${this.config.deviceCount}" step="100">
                        <span class="control-value" id="device-count-value">${this.config.deviceCount.toLocaleString()}</span>
                    </div>
                    
                    <div class="control-group">
                        <label for="analysis-period-slider">Analysis Period (Years)</label>
                        <input type="range" id="analysis-period-slider" min="1" max="5" value="${this.config.analysisPeriod}" step="1">
                        <span class="control-value" id="analysis-period-value">${this.config.analysisPeriod}</span>
                    </div>
                    
                    <div class="control-group">
                        <label for="risk-factor-slider">Risk Factor</label>
                        <input type="range" id="risk-factor-slider" min="0.5" max="2.0" value="${this.config.riskFactor}" step="0.1">
                        <span class="control-value" id="risk-factor-value">${this.config.riskFactor}x</span>
                    </div>
                    
                    <div class="control-group">
                        <label for="industry-select">Industry</label>
                        <select id="industry-select" class="control-value">
                            ${Object.keys(this.industryData).map(industryId => 
                                `<option value="${industryId}" ${industryId === this.config.industry ? 'selected' : ''}>${this.industryData[industryId].name}</option>`
                            ).join('')}
                        </select>
                    </div>
                    
                    <div class="control-group">
                        <label for="fte-cost-slider">FTE Cost ($/year)</label>
                        <input type="range" id="fte-cost-slider" min="60000" max="180000" value="${this.config.fteCost}" step="5000">
                        <span class="control-value" id="fte-cost-value">$${this.config.fteCost.toLocaleString()}</span>
                    </div>
                    
                    <div class="control-group">
                        <label for="breach-cost-slider">Breach Cost ($)</label>
                        <input type="range" id="breach-cost-slider" min="1000000" max="10000000" value="${this.config.breachCost}" step="100000">
                        <span class="control-value" id="breach-cost-value">$${(this.config.breachCost / 1000000).toFixed(1)}M</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    createExecutiveKPIs() {
        const container = document.getElementById('executive-kpis-container');
        if (!container) return;
        
        const portnoxData = this.vendorData.portnox;
        const averageCompetitor = this.calculateAverageCompetitor();
        const industryData = this.industryData[this.config.industry];
        
        // Calculate dynamic values based on configuration
        const adjustedBreachCost = this.config.breachCost * industryData.riskMultiplier;
        const costSavings = Math.round((averageCompetitor.tco3Year - portnoxData.costs.tco3Year) / 1000);
        const riskReduction = Math.round((portnoxData.metrics.securityScore - averageCompetitor.securityScore));
        const efficiencyGain = Math.round(((averageCompetitor.fteRequired - portnoxData.metrics.fteRequired) / averageCompetitor.fteRequired) * 100);
        
        container.innerHTML = `
            <div class="executive-kpis slide-up">
                <div class="kpi-card strategic">
                    <div class="kpi-icon">
                        <i class="fas fa-piggy-bank"></i>
                    </div>
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${costSavings}">0</span>
                            <span class="currency">K</span>
                        </div>
                        <div class="metric-label">Strategic Savings</div>
                        <div class="metric-subtitle">3-Year TCO Reduction vs Competition</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-arrow-down"></i>
                            <span>${Math.round(((averageCompetitor.tco3Year - portnoxData.costs.tco3Year) / averageCompetitor.tco3Year) * 100)}% Lower Cost</span>
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card financial">
                    <div class="kpi-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${portnoxData.metrics.roi3Year}">0</span>
                            <span class="currency">%</span>
                        </div>
                        <div class="metric-label">Investment ROI</div>
                        <div class="metric-subtitle">3-Year Return on Investment</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-rocket"></i>
                            <span>${portnoxData.metrics.paybackMonths}-Month Payback</span>
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card operational">
                    <div class="kpi-icon">
                        <i class="fas fa-users-cog"></i>
                    </div>
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${efficiencyGain}">0</span>
                            <span class="currency">%</span>
                        </div>
                        <div class="metric-label">Efficiency Gain</div>
                        <div class="metric-subtitle">IT Resource Optimization</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-user-minus"></i>
                            <span>${portnoxData.metrics.fteRequired} vs ${averageCompetitor.fteRequired.toFixed(1)} FTE</span>
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card security">
                    <div class="kpi-icon">
                        <i class="fas fa-shield-check"></i>
                    </div>
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${portnoxData.metrics.securityScore}">0</span>
                            <span class="currency">%</span>
                        </div>
                        <div class="metric-label">Security Score</div>
                        <div class="metric-subtitle">Zero Trust Readiness Level</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-shield-virus"></i>
                            <span>+${riskReduction}% vs Industry</span>
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card financial">
                    <div class="kpi-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${Math.round(adjustedBreachCost / 1000000)}">0</span>
                            <span class="currency">M</span>
                        </div>
                        <div class="metric-label">Breach Risk</div>
                        <div class="metric-subtitle">Potential ${industryData.name} Impact</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-shield-alt"></i>
                            <span>${riskReduction}% Risk Reduction</span>
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card operational">
                    <div class="kpi-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${portnoxData.metrics.implementationDays}">0</span>
                            <span class="currency">Days</span>
                        </div>
                        <div class="metric-label">Time to Value</div>
                        <div class="metric-subtitle">Implementation Speed</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>${Math.round(((averageCompetitor.implementationDays - portnoxData.metrics.implementationDays) / averageCompetitor.implementationDays) * 100)}% Faster Deploy</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    calculateMarketCoverage() {
        const totalMarketShare = this.selectedVendors.reduce((total, vendorId) => {
            return total + (this.vendorData[vendorId]?.metrics?.marketShare || 0);
        }, 0);
        return Math.round(totalMarketShare);
    }
    
    calculateAverageCompetitor() {
        const competitors = Object.keys(this.vendorData).filter(id => id !== 'portnox');
        const totals = competitors.reduce((acc, vendorId) => {
            const vendor = this.vendorData[vendorId];
            return {
                tco3Year: acc.tco3Year + vendor.costs.tco3Year,
                implementationDays: acc.implementationDays + vendor.metrics.implementationDays,
                securityScore: acc.securityScore + vendor.metrics.securityScore,
                fteRequired: acc.fteRequired + vendor.metrics.fteRequired
            };
        }, { tco3Year: 0, implementationDays: 0, securityScore: 0, fteRequired: 0 });
        
        return {
            tco3Year: totals.tco3Year / competitors.length,
            implementationDays: totals.implementationDays / competitors.length,
            securityScore: totals.securityScore / competitors.length,
            fteRequired: totals.fteRequired / competitors.length
        };
    }
    
    createTabNavigation() {
        const container = document.getElementById('tab-navigation-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="tab-navigation fade-in">
                <div class="main-tabs">
                    <button class="main-tab active" data-tab="overview">
                        <div class="tab-icon"><i class="fas fa-tachometer-alt"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Overview</span>
                            <span class="tab-subtitle">Executive Dashboard</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="financial">
                        <div class="tab-icon"><i class="fas fa-chart-line"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Financial</span>
                            <span class="tab-subtitle">TCO & ROI Analysis</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="security">
                        <div class="tab-icon"><i class="fas fa-shield-alt"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Security</span>
                            <span class="tab-subtitle">Risk & Compliance</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="vendors">
                        <div class="tab-icon"><i class="fas fa-balance-scale"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Vendors</span>
                            <span class="tab-subtitle">Competitive Matrix</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="compliance">
                        <div class="tab-icon"><i class="fas fa-clipboard-check"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Compliance</span>
                            <span class="tab-subtitle">Regulatory Coverage</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="insurance">
                        <div class="tab-icon"><i class="fas fa-umbrella"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Insurance</span>
                            <span class="tab-subtitle">Cyber Risk Impact</span>
                        </div>
                    </button>
                </div>
            </div>
        `;
    }
    
    createTabContent() {
        const container = document.getElementById('tab-content-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="tab-content-area">
                <!-- Overview Tab -->
                <div class="tab-panel active" data-panel="overview">
                    ${this.createOverviewContent()}
                </div>
                
                <!-- Financial Tab -->
                <div class="tab-panel" data-panel="financial">
                    ${this.createFinancialContent()}
                </div>
                
                <!-- Security Tab -->
                <div class="tab-panel" data-panel="security">
                    ${this.createSecurityContent()}
                </div>
                
                <!-- Vendors Tab -->
                <div class="tab-panel" data-panel="vendors">
                    ${this.createVendorsContent()}
                </div>
                
                <!-- Compliance Tab -->
                <div class="tab-panel" data-panel="compliance">
                    ${this.createComplianceContent()}
                </div>
                
                <!-- Insurance Tab -->
                <div class="tab-panel" data-panel="insurance">
                    ${this.createInsuranceContent()}
                </div>
            </div>
        `;
    }
    
    createOverviewContent() {
        return `
            <div class="chart-grid">
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-bar"></i>
                            Total Cost of Ownership Comparison
                        </h3>
                        <div class="chart-subtitle">3-Year TCO analysis across selected NAC solutions with cost breakdown</div>
                    </div>
                    <div class="chart-wrapper" id="overview-tco-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-clock"></i>
                            Implementation Timeline Analysis
                        </h3>
                        <div class="chart-subtitle">Time to deployment and value realization comparison</div>
                    </div>
                    <div class="chart-wrapper" id="overview-timeline-chart"></div>
                </div>
                
                <div class="chart-container full-width">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-area"></i>
                            Multi-Year ROI Projection & Break-Even Analysis
                        </h3>
                        <div class="chart-subtitle">Return on investment trajectory over 5-year period with break-even points</div>
                    </div>
                    <div class="chart-wrapper" id="overview-roi-projection-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-pie"></i>
                            Market Share Distribution
                        </h3>
                        <div class="chart-subtitle">NAC market coverage by vendor</div>
                    </div>
                    <div class="chart-wrapper" id="overview-market-share-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-radar"></i>
                            Capability Radar Analysis
                        </h3>
                        <div class="chart-subtitle">Multi-dimensional capability comparison</div>
                    </div>
                    <div class="chart-wrapper" id="overview-capability-radar-chart"></div>
                </div>
            </div>
            
            ${this.createExecutiveInsightsPanel()}
        `;
    }
    
    createFinancialContent() {
        return `
            <div class="chart-grid">
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-dollar-sign"></i>
                            Per Device Cost Analysis
                        </h3>
                        <div class="chart-subtitle">License cost per device across vendors</div>
                    </div>
                    <div class="chart-wrapper" id="financial-per-device-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-users"></i>
                            FTE Requirements & Cost Impact
                        </h3>
                        <div class="chart-subtitle">Full-time equivalent staff requirements</div>
                    </div>
                    <div class="chart-wrapper" id="financial-fte-chart"></div>
                </div>
                
                <div class="chart-container full-width">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-waterfall"></i>
                            TCO Waterfall Analysis
                        </h3>
                        <div class="chart-subtitle">Cost component breakdown showing how savings accumulate</div>
                    </div>
                    <div class="chart-wrapper" id="financial-waterfall-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-gantt"></i>
                            Implementation Cost Timeline
                        </h3>
                        <div class="chart-subtitle">Cost distribution over implementation phases</div>
                    </div>
                    <div class="chart-wrapper" id="financial-gantt-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-funnel-dollar"></i>
                            Cost Savings Funnel
                        </h3>
                        <div class="chart-subtitle">How Portnox savings accumulate by category</div>
                    </div>
                    <div class="chart-wrapper" id="financial-funnel-chart"></div>
                </div>
            </div>
        `;
    }
    
    createSecurityContent() {
        return `
            <div class="chart-grid">
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-shield-alt"></i>
                            Security Capabilities Heatmap
                        </h3>
                        <div class="chart-subtitle">Comprehensive security feature comparison</div>
                    </div>
                    <div class="chart-wrapper" id="security-heatmap-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-exclamation-triangle"></i>
                            Risk Reduction Impact Analysis
                        </h3>
                        <div class="chart-subtitle">Quantified risk reduction by vendor</div>
                    </div>
                    <div class="chart-wrapper" id="security-risk-reduction-chart"></div>
                </div>
                
                <div class="chart-container full-width">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-network"></i>
                            Zero Trust Architecture Comparison
                        </h3>
                        <div class="chart-subtitle">Network diagram showing architectural differences</div>
                    </div>
                    <div class="chart-wrapper" id="security-architecture-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-treemap"></i>
                            Threat Landscape Coverage
                        </h3>
                        <div class="chart-subtitle">Coverage of threat categories by solution</div>
                    </div>
                    <div class="chart-wrapper" id="security-treemap-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-bubble"></i>
                            Security vs Usability Matrix
                        </h3>
                        <div class="chart-subtitle">Balance between security strength and user experience</div>
                    </div>
                    <div class="chart-wrapper" id="security-bubble-chart"></div>
                </div>
            </div>
        `;
    }
    
    createVendorsContent() {
        return `
            <div class="chart-container">
                <div class="chart-header">
                    <h3 class="chart-title">
                        <i class="fas fa-table"></i>
                        Comprehensive Vendor Comparison Matrix
                    </h3>
                    <div class="chart-subtitle">Side-by-side analysis of all key metrics and capabilities</div>
                </div>
                <div id="vendor-comparison-matrix"></div>
            </div>
            
            <div class="chart-grid">
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-scatter"></i>
                            Value vs Cost Positioning
                        </h3>
                        <div class="chart-subtitle">Vendor positioning based on value delivered vs total cost</div>
                    </div>
                    <div class="chart-wrapper" id="vendors-value-cost-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-growth"></i>
                            Market Growth Trajectory
                        </h3>
                        <div class="chart-subtitle">Year-over-year growth rates and market momentum</div>
                    </div>
                    <div class="chart-wrapper" id="vendors-growth-chart"></div>
                </div>
                
                <div class="chart-container full-width">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-sankey"></i>
                            Feature Capability Flow
                        </h3>
                        <div class="chart-subtitle">Flow diagram showing capability relationships across vendors</div>
                    </div>
                    <div class="chart-wrapper" id="vendors-sankey-chart"></div>
                </div>
            </div>
        `;
    }
    
    createComplianceContent() {
        return `
            <div class="chart-grid">
                <div class="chart-container full-width">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-clipboard-check"></i>
                            Regulatory Framework Coverage Matrix
                        </h3>
                        <div class="chart-subtitle">Comprehensive compliance coverage across all major frameworks</div>
                    </div>
                    <div class="chart-wrapper" id="compliance-matrix-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-radar"></i>
                            NIST CSF Deep Dive
                        </h3>
                        <div class="chart-subtitle">Detailed NIST Cybersecurity Framework analysis</div>
                    </div>
                    <div class="chart-wrapper" id="compliance-nist-radar-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-industry"></i>
                            Industry-Specific Requirements
                        </h3>
                        <div class="chart-subtitle">Compliance requirements by industry vertical</div>
                    </div>
                    <div class="chart-wrapper" id="compliance-industry-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-timeline"></i>
                            Compliance Implementation Timeline
                        </h3>
                        <div class="chart-subtitle">Time to achieve compliance by framework</div>
                    </div>
                    <div class="chart-wrapper" id="compliance-timeline-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-gavel"></i>
                            Penalty Risk Assessment
                        </h3>
                        <div class="chart-subtitle">Financial risk exposure from non-compliance</div>
                    </div>
                    <div class="chart-wrapper" id="compliance-penalty-chart"></div>
                </div>
            </div>
        `;
    }
    
    createInsuranceContent() {
        return `
            <div class="chart-grid">
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-umbrella"></i>
                            Cyber Insurance Premium Impact
                        </h3>
                        <div class="chart-subtitle">Premium reduction potential by vendor solution</div>
                    </div>
                    <div class="chart-wrapper" id="insurance-premium-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-calculator"></i>
                            Premium Reduction Calculator
                        </h3>
                        <div class="chart-subtitle">Interactive calculator for insurance savings</div>
                    </div>
                    <div class="chart-wrapper" id="insurance-calculator"></div>
                </div>
                
                <div class="chart-container full-width">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-line"></i>
                            Risk Score Improvement Timeline
                        </h3>
                        <div class="chart-subtitle">How security posture improves over time with each solution</div>
                    </div>
                    <div class="chart-wrapper" id="insurance-risk-timeline-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-kanban"></i>
                            Risk Mitigation Kanban
                        </h3>
                        <div class="chart-subtitle">Risk categories and mitigation status</div>
                    </div>
                    <div class="chart-wrapper" id="insurance-kanban-chart"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-calendar"></i>
                            Risk Calendar Heatmap
                        </h3>
                        <div class="chart-subtitle">Risk exposure patterns throughout the year</div>
                    </div>
                    <div class="chart-wrapper" id="insurance-calendar-chart"></div>
                </div>
            </div>
        `;
    }
    
    createExecutiveInsightsPanel() {
        return `
            <div class="insights-panel">
                <h3><i class="fas fa-lightbulb"></i> Executive Strategic Insights</h3>
                <div class="insights-grid">
                    <div class="insight-card">
                        <div class="insight-icon"><i class="fas fa-trophy"></i></div>
                        <div class="insight-content">
                            <h4>Market Leadership Position</h4>
                            <p>Portnox Cloud demonstrates superior TCO performance with 53% cost reduction compared to traditional NAC solutions, positioning as the clear value leader in the Zero Trust NAC market.</p>
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon"><i class="fas fa-rocket"></i></div>
                        <div class="insight-content">
                            <h4>Accelerated Digital Transformation</h4>
                            <p>Cloud-native architecture enables 21-day implementation versus 90+ days for on-premises solutions, accelerating digital transformation initiatives by 4.3x.</p>
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon"><i class="fas fa-shield-check"></i></div>
                        <div class="insight-content">
                            <h4>Enhanced Security Posture</h4>
                            <p>95% security score with comprehensive Zero Trust capabilities reduces breach risk by 35% and potential cyber insurance premiums by up to 25%.</p>
                        </div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon"><i class="fas fa-chart-growth"></i></div>
                        <div class="insight-content">
                            <h4>Sustainable Competitive Advantage</h4>
                            <p>87% operational efficiency gain through automation and reduced FTE requirements creates sustainable competitive advantage and strategic cost optimization.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupEventListeners() {
        this.bindVendorSelection();
        this.bindTabNavigation();
        this.bindCostAnalysisControls();
        this.bindActionButtons();
    }
    
    bindVendorSelection() {
        document.querySelectorAll('.vendor-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                this.updateSelectedVendors();
                this.updateSelectedCount();
                this.refreshCurrentTab();
                this.dispatchConfigurationChange();
            });
        });
    }
    
    bindTabNavigation() {
        document.querySelectorAll('.main-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                this.switchToTab(tabId);
            });
        });
    }
    
    bindCostAnalysisControls() {
        // Device count slider
        const deviceSlider = document.getElementById('device-count-slider');
        if (deviceSlider) {
            deviceSlider.addEventListener('input', (e) => {
                this.config.deviceCount = parseInt(e.target.value);
                document.getElementById('device-count-value').textContent = this.config.deviceCount.toLocaleString();
                this.refreshKPIs();
                this.refreshCurrentTab();
                this.dispatchConfigurationChange();
            });
        }
        
        // Analysis period slider
        const periodSlider = document.getElementById('analysis-period-slider');
        if (periodSlider) {
            periodSlider.addEventListener('input', (e) => {
                this.config.analysisPeriod = parseInt(e.target.value);
                document.getElementById('analysis-period-value').textContent = this.config.analysisPeriod;
                this.refreshKPIs();
                this.refreshCurrentTab();
                this.dispatchConfigurationChange();
            });
        }
        
        // Risk factor slider
        const riskSlider = document.getElementById('risk-factor-slider');
        if (riskSlider) {
            riskSlider.addEventListener('input', (e) => {
                this.config.riskFactor = parseFloat(e.target.value);
                document.getElementById('risk-factor-value').textContent = this.config.riskFactor + 'x';
                this.refreshKPIs();
                this.refreshCurrentTab();
                this.dispatchConfigurationChange();
            });
        }
        
        // Industry select
        const industrySelect = document.getElementById('industry-select');
        if (industrySelect) {
            industrySelect.addEventListener('change', (e) => {
                this.config.industry = e.target.value;
                this.refreshKPIs();
                this.refreshCurrentTab();
                this.dispatchConfigurationChange();
            });
        }
        
        // FTE cost slider
        const fteSlider = document.getElementById('fte-cost-slider');
        if (fteSlider) {
            fteSlider.addEventListener('input', (e) => {
                this.config.fteCost = parseInt(e.target.value);
                document.getElementById('fte-cost-value').textContent = '$' + this.config.fteCost.toLocaleString();
                this.refreshKPIs();
                this.refreshCurrentTab();
                this.dispatchConfigurationChange();
            });
        }
        
        // Breach cost slider
        const breachSlider = document.getElementById('breach-cost-slider');
        if (breachSlider) {
            breachSlider.addEventListener('input', (e) => {
                this.config.breachCost = parseInt(e.target.value);
                document.getElementById('breach-cost-value').textContent = '$' + (this.config.breachCost / 1000000).toFixed(1) + 'M';
                this.refreshKPIs();
                this.refreshCurrentTab();
                this.dispatchConfigurationChange();
            });
        }
    }
    
    bindActionButtons() {
        // Export functionality
        document.getElementById('export-executive')?.addEventListener('click', () => {
            this.handleExport();
        });
        
        // Live demo
        document.getElementById('live-demo')?.addEventListener('click', () => {
            this.handleLiveDemo();
        });
        
        // Customize dashboard
        document.getElementById('customize-dashboard')?.addEventListener('click', () => {
            this.handleCustomize();
        });
        
        // Schedule meeting
        document.getElementById('schedule-meeting')?.addEventListener('click', () => {
            this.handleScheduleMeeting();
        });
    }
    
    bindCalculationEvents() {
        // Listen for calculation events from other components
        document.addEventListener('calculationComplete', (event) => {
            this.updateFromCalculation(event.detail);
        });
        
        document.addEventListener('configurationChanged', (event) => {
            this.updateFromConfiguration(event.detail);
        });
    }
    
    updateSelectedVendors() {
        this.selectedVendors = Array.from(document.querySelectorAll('.vendor-btn.active'))
            .map(btn => btn.getAttribute('data-vendor'));
    }
    
    updateSelectedCount() {
        const counter = document.querySelector('.selected-count');
        if (counter) {
            counter.textContent = this.selectedVendors.length;
        }
        
        // Update market coverage
        const marketCoverage = document.querySelector('.vendor-stats span:last-child');
        if (marketCoverage) {
            marketCoverage.textContent = `Market Coverage: ${this.calculateMarketCoverage()}%`;
        }
    }
    
    switchToTab(tabId) {
        // Update tab UI
        document.querySelectorAll('.main-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        // Update panel UI
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.querySelector(`[data-panel="${tabId}"]`).classList.add('active');
        
        this.currentTab = tabId;
        this.refreshCurrentTab();
    }
    
    refreshKPIs() {
        // Recreate KPIs with updated values
        this.createExecutiveKPIs();
        this.startAnimations();
    }
    
    refreshCurrentTab() {
        setTimeout(() => {
            switch(this.currentTab) {
                case 'overview':
                    this.createOverviewCharts();
                    break;
                case 'financial':
                    this.createFinancialCharts();
                    break;
                case 'security':
                    this.createSecurityCharts();
                    break;
                case 'vendors':
                    this.createVendorCharts();
                    break;
                case 'compliance':
                    this.createComplianceCharts();
                    break;
                case 'insurance':
                    this.createInsuranceCharts();
                    break;
            }
        }, 100);
    }
    
    createOverviewCharts() {
        this.createTCOChart();
        this.createTimelineChart();
        this.createROIProjectionChart();
        this.createMarketShareChart();
        this.createCapabilityRadarChart();
    }
    
    createTCOChart() {
        const container = document.getElementById('overview-tco-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const selectedData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const adjustedCost = this.calculateAdjustedTCO(vendor, this.config.analysisPeriod);
            return {
                name: vendor.shortName,
                y: adjustedCost,
                color: vendor.color,
                logo: vendor.logo
            };
        });
        
        this.chartInstances.tcoChart = Highcharts.chart(container, {
            chart: { type: 'column', height: 450 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: {
                title: { text: `${this.config.analysisPeriod}-Year TCO ($)` },
                labels: {
                    formatter: function() {
                        return '$' + Highcharts.numberFormat(this.value / 1000, 0) + 'K';
                    }
                }
            },
            series: [{
                name: 'TCO',
                data: selectedData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return '$' + Highcharts.numberFormat(this.y / 1000, 0) + 'K';
                    }
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false },
            plotOptions: {
                column: {
                    borderRadius: 4,
                    borderWidth: 0
                }
            }
        });
    }
    
    calculateAdjustedTCO(vendor, years) {
        const baseCost = vendor.costs[`tco${years}Year`] || vendor.costs.tco3Year;
        const industryMultiplier = this.industryData[this.config.industry].riskMultiplier;
        const deviceMultiplier = this.config.deviceCount / 1000;
        
        return Math.round(baseCost * industryMultiplier * deviceMultiplier * this.config.riskFactor);
    }
    
    createTimelineChart() {
        const container = document.getElementById('overview-timeline-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const selectedData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                y: vendor.metrics.implementationDays,
                color: vendor.color
            };
        });
        
        this.chartInstances.timelineChart = Highcharts.chart(container, {
            chart: { type: 'bar', height: 450 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: { 
                title: { text: 'Implementation Days' },
                max: Math.max(...selectedData.map(d => d.y)) * 1.1
            },
            series: [{
                name: 'Days to Deploy',
                data: selectedData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.y + ' days';
                    }
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    borderWidth: 0
                }
            }
        });
    }
    
    createROIProjectionChart() {
        const container = document.getElementById('overview-roi-projection-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const series = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const data = [];
            for (let year = 0; year <= 5; year++) {
                if (year === 0) {
                    data.push(0);
                } else {
                    const roi = this.calculateROIForYear(vendor, year);
                    data.push(roi);
                }
            }
            return {
                name: vendor.shortName,
                color: vendor.color,
                data: data,
                marker: {
                    symbol: 'circle',
                    radius: 5
                }
            };
        });
        
        this.chartInstances.roiChart = Highcharts.chart(container, {
            chart: { type: 'line', height: 450 },
            title: { text: null },
            xAxis: {
                categories: ['Initial', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
                title: { text: 'Timeline' }
            },
            yAxis: {
                title: { text: 'ROI (%)' },
                labels: {
                    formatter: function() {
                        return this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    color: '#000',
                    dashStyle: 'dash',
                    width: 1,
                    label: {
                        text: 'Break-even',
                        align: 'right'
                    }
                }]
            },
            series: series,
            credits: { enabled: false },
            tooltip: {
                shared: true,
                formatter: function() {
                    let tooltip = '<b>' + this.x + '</b><br/>';
                    this.points.forEach(point => {
                        tooltip += '<span style="color:' + point.color + '">' + point.series.name + '</span>: ' + point.y + '%<br/>';
                    });
                    return tooltip;
                }
            }
        });
    }
    
    calculateROIForYear(vendor, year) {
        if (year === 1) return vendor.metrics.roi1Year || 0;
        if (year === 3) return vendor.metrics.roi3Year || 0;
        if (year === 5) return vendor.metrics.roi5Year || 0;
        
        // Interpolate for other years
        if (year === 2) {
            return (vendor.metrics.roi1Year + vendor.metrics.roi3Year) / 2;
        }
        if (year === 4) {
            return (vendor.metrics.roi3Year + vendor.metrics.roi5Year) / 2;
        }
        
        return 0;
    }
    
    createMarketShareChart() {
        const container = document.getElementById('overview-market-share-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const marketData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                y: vendor.metrics.marketShare || 0,
                color: vendor.color
            };
        });
        
        // Add "Others" if total doesn't equal 100%
        const totalShown = marketData.reduce((sum, item) => sum + item.y, 0);
        if (totalShown < 100) {
            marketData.push({
                name: 'Others',
                y: 100 - totalShown,
                color: '#cccccc'
            });
        }
        
        this.chartInstances.marketShareChart = Highcharts.chart(container, {
            chart: { type: 'pie', height: 450 },
            title: { text: null },
            series: [{
                name: 'Market Share',
                data: marketData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.point.name + ': ' + this.y + '%';
                    }
                }
            }],
            credits: { enabled: false },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true
                }
            }
        });
    }
    
    createCapabilityRadarChart() {
        const container = document.getElementById('overview-capability-radar-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const categories = ['Zero Trust', 'Device Auth', 'Risk Assessment', 'Auto Remediation', 'Cloud Integration', 'Mobile Support', 'IoT Support', 'BYOD Support'];
        
        const series = this.selectedVendors.slice(0, 4).map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const capabilities = vendor.capabilities || {};
            return {
                name: vendor.shortName,
                color: vendor.color,
                data: [
                    capabilities.zeroTrust || 0,
                    capabilities.deviceAuth || 0,
                    capabilities.riskAssessment || 0,
                    capabilities.automatedRemediation || 0,
                    capabilities.cloudIntegration || 0,
                    capabilities.mobileSupport || 0,
                    capabilities.iotSupport || 0,
                    capabilities.byodSupport || 0
                ]
            };
        });
        
        this.chartInstances.capabilityRadar = Highcharts.chart(container, {
            chart: { polar: true, height: 450 },
            title: { text: null },
            pane: { size: '70%' },
            xAxis: {
                categories: categories,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max: 100,
                labels: {
                    formatter: function() {
                        return this.value + '%';
                    }
                }
            },
            series: series,
            credits: { enabled: false },
            legend: {
                enabled: true,
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            }
        });
    }
    
    createFinancialCharts() {
        this.createPerDeviceChart();
        this.createFTEChart();
        this.createWaterfallChart();
        this.createGanttChart();
        this.createFunnelChart();
    }
    
    createPerDeviceChart() {
        const container = document.getElementById('financial-per-device-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const selectedData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                y: vendor.costs.licensePerDevice,
                color: vendor.color
            };
        });
        
        this.chartInstances.perDeviceChart = Highcharts.chart(container, {
            chart: { type: 'column', height: 400 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: {
                title: { text: 'Cost per Device ($)' },
                labels: {
                    formatter: function() {
                        return '$' + this.value;
                    }
                }
            },
            series: [{
                name: 'Per Device Cost',
                data: selectedData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return '$' + this.y;
                    }
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    createFTEChart() {
        const container = document.getElementById('financial-fte-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const selectedData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                y: vendor.metrics.fteRequired,
                color: vendor.color
            };
        });
        
        this.chartInstances.fteChart = Highcharts.chart(container, {
            chart: { type: 'column', height: 400 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: {
                title: { text: 'FTE Required' },
                min: 0
            },
            series: [{
                name: 'FTE',
                data: selectedData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.y + ' FTE';
                    }
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    createWaterfallChart() {
        const container = document.getElementById('financial-waterfall-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        // Load waterfall module if available
        if (Highcharts.seriesTypes.waterfall) {
            const portnoxVendor = this.vendorData.portnox;
            const competitorAvg = this.calculateAverageCompetitor();
            
            const waterfallData = [
                { name: 'Traditional NAC Cost', y: competitorAvg.tco3Year, color: '#ff6b6b' },
                { name: 'Hardware Savings', y: -120000, color: '#4ecdc4' },
                { name: 'Implementation Savings', y: -60000, color: '#45b7d1' },
                { name: 'Maintenance Savings', y: -90000, color: '#96ceb4' },
                { name: 'Personnel Savings', y: -130000, color: '#ffeaa7' },
                { name: 'Portnox Total Cost', y: portnoxVendor.costs.tco3Year, isSum: true, color: '#1a5a96' }
            ];
            
            this.chartInstances.waterfallChart = Highcharts.chart(container, {
                chart: { type: 'waterfall', height: 400 },
                title: { text: null },
                xAxis: { type: 'category' },
                yAxis: {
                    title: { text: 'Cost ($)' },
                    labels: {
                        formatter: function() {
                            return '$' + Highcharts.numberFormat(this.value / 1000, 0) + 'K';
                        }
                    }
                },
                series: [{
                    name: 'Cost Analysis',
                    data: waterfallData,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + Highcharts.numberFormat(Math.abs(this.y) / 1000, 0) + 'K';
                        }
                    }
                }],
                credits: { enabled: false },
                legend: { enabled: false }
            });
        }
    }
    
    createGanttChart() {
        const container = document.getElementById('financial-gantt-chart');
        if (!container) return;
        
        // Create a simplified Gantt chart using HTML/CSS
        const portnoxPhases = [
            { name: 'Planning', start: 0, duration: 3, cost: 5000 },
            { name: 'Deployment', start: 3, duration: 14, cost: 8000 },
            { name: 'Testing', start: 17, duration: 4, cost: 2000 }
        ];
        
        const competitorPhases = [
            { name: 'Planning', start: 0, duration: 14, cost: 15000 },
            { name: 'Hardware Setup', start: 14, duration: 21, cost: 35000 },
            { name: 'Implementation', start: 35, duration: 35, cost: 20000 },
            { name: 'Testing', start: 70, duration: 20, cost: 5000 }
        ];
        
        container.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <h4 style="color: #1a5a96; margin-bottom: 1rem;">Portnox Cloud (21 days)</h4>
                <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                    ${portnoxPhases.map(phase => `
                        <div style="
                            background: linear-gradient(135deg, #1a5a96, #2980b9);
                            color: white;
                            padding: 0.5rem;
                            border-radius: 4px;
                            flex: ${phase.duration};
                            text-align: center;
                            font-size: 0.8rem;
                            font-weight: 600;
                        ">
                            ${phase.name}<br>
                            ${phase.duration}d - $${phase.cost.toLocaleString()}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div>
                <h4 style="color: #ff6b6b; margin-bottom: 1rem;">Traditional NAC (90 days)</h4>
                <div style="display: flex; gap: 0.5rem;">
                    ${competitorPhases.map(phase => `
                        <div style="
                            background: linear-gradient(135deg, #ff6b6b, #ff5252);
                            color: white;
                            padding: 0.5rem;
                            border-radius: 4px;
                            flex: ${phase.duration};
                            text-align: center;
                            font-size: 0.8rem;
                            font-weight: 600;
                        ">
                            ${phase.name}<br>
                            ${phase.duration}d - $${phase.cost.toLocaleString()}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    createFunnelChart() {
        const container = document.getElementById('financial-funnel-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        // Load funnel module if available
        if (Highcharts.seriesTypes.funnel) {
            const funnelData = [
                ['Total Market Cost', 615000],
                ['After Hardware Elimination', 495000],
                ['After Implementation Savings', 435000],
                ['After Maintenance Reduction', 345000],
                ['After Personnel Optimization', 245000]
            ];
            
            this.chartInstances.funnelChart = Highcharts.chart(container, {
                chart: { type: 'funnel', height: 400 },
                title: { text: null },
                series: [{
                    name: 'Cost Reduction',
                    data: funnelData,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return this.point.name + ': $' + Highcharts.numberFormat(this.y / 1000, 0) + 'K';
                        }
                    }
                }],
                credits: { enabled: false },
                legend: { enabled: false }
            });
        }
    }
    
    createSecurityCharts() {
        console.log("Creating security charts...");
        // Implement security-specific charts
    }
    
    createVendorCharts() {
        console.log("Creating vendor charts...");
        this.createVendorMatrix();
        // Implement additional vendor charts
    }
    
    createVendorMatrix() {
        const container = document.getElementById('vendor-comparison-matrix');
        if (!container) return;
        
        const metrics = [
            { key: 'tco3Year', label: '3-Year TCO', category: 'costs', format: 'currency' },
            { key: 'roi3Year', label: 'ROI (%)', category: 'metrics', format: 'percentage' },
            { key: 'implementationDays', label: 'Implementation', category: 'metrics', format: 'days' },
            { key: 'fteRequired', label: 'FTE Required', category: 'metrics', format: 'number' },
            { key: 'securityScore', label: 'Security Score', category: 'metrics', format: 'percentage' },
            { key: 'complianceScore', label: 'Compliance', category: 'metrics', format: 'percentage' },
            { key: 'reliabilityScore', label: 'Reliability', category: 'metrics', format: 'percentage' },
            { key: 'userSatisfaction', label: 'User Satisfaction', category: 'metrics', format: 'percentage' }
        ];
        
        let tableHTML = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th style="min-width: 150px;">Metric</th>
                        ${this.selectedVendors.map(vendorId => {
                            const vendor = this.vendorData[vendorId];
                            return `<th style="text-align: center; min-width: 120px;">
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                                    <img src="${vendor.logo}" alt="${vendor.shortName}" style="width: 32px; height: 32px; object-fit: contain;">
                                    <span>${vendor.shortName}</span>
                                </div>
                            </th>`;
                        }).join('')}
                    </tr>
                </thead>
                <tbody>
        `;
        
        metrics.forEach(metric => {
            tableHTML += `<tr><td style="font-weight: 600;">${metric.label}</td>`;
            
            this.selectedVendors.forEach(vendorId => {
                const vendor = this.vendorData[vendorId];
                const value = vendor[metric.category]?.[metric.key] || 0;
                
                let formattedValue;
                let cellClass = '';
                
                switch(metric.format) {
                    case 'currency':
                        formattedValue = '$' + (value / 1000).toLocaleString() + 'K';
                        cellClass = value < 300000 ? 'highlight-positive' : value > 500000 ? 'highlight-negative' : '';
                        break;
                    case 'percentage':
                        formattedValue = value + '%';
                        cellClass = value > 90 ? 'highlight-positive' : value < 70 ? 'highlight-negative' : '';
                        break;
                    case 'days':
                        formattedValue = value + ' days';
                        cellClass = value < 30 ? 'highlight-positive' : value > 60 ? 'highlight-negative' : '';
                        break;
                    case 'number':
                        formattedValue = value.toString();
                        cellClass = value < 1 ? 'highlight-positive' : value > 1.5 ? 'highlight-negative' : '';
                        break;
                    default:
                        formattedValue = value.toString();
                }
                
                tableHTML += `<td class="${cellClass}" style="text-align: center;">${formattedValue}</td>`;
            });
            
            tableHTML += `</tr>`;
        });
        
        tableHTML += `</tbody></table>`;
        container.innerHTML = tableHTML;
    }
    
    createComplianceCharts() {
        console.log("Creating compliance charts...");
        // Implement compliance-specific charts
    }
    
    createInsuranceCharts() {
        console.log("Creating insurance charts...");
        // Implement insurance-specific charts
    }
    
    initializeParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-header', {
                particles: {
                    number: { value: 60,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: { value: '#ffffff' },
                    shape: { 
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: { 
                        value: 0.4, 
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: { 
                        value: 4, 
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#ffffff',
                        opacity: 0.3,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { 
                            enable: true, 
                            mode: 'bubble' 
                        },
                        onclick: { 
                            enable: true, 
                            mode: 'push' 
                        },
                        resize: true
                    },
                    modes: {
                        bubble: {
                            distance: 200,
                            size: 6,
                            duration: 2,
                            opacity: 0.6,
                            speed: 3
                        },
                        push: {
                            particles_nb: 3
                        }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    startAnimations() {
        // Animate KPI values with staggered timing
        const kpiValues = document.querySelectorAll('[data-animate]');
        kpiValues.forEach((element, index) => {
            setTimeout(() => {
                const targetValue = parseInt(element.getAttribute('data-animate'));
                this.animateValue(element, 0, targetValue, 2500);
            }, index * 300);
        });
        
        // Add staggered animations to cards
        const cards = document.querySelectorAll('.kpi-card, .chart-container, .vendor-btn');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('scale-in');
            }, index * 100);
        });
    }
    
    animateValue(element, start, end, duration) {
        const startTime = performance.now();
        
        const updateValue = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const current = Math.round(start + (end - start) * easeOut);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        };
        
        requestAnimationFrame(updateValue);
    }
    
    dispatchConfigurationChange() {
        // Dispatch custom event for configuration changes
        const event = new CustomEvent('configurationChanged', {
            detail: {
                config: this.config,
                selectedVendors: this.selectedVendors,
                timestamp: new Date()
            }
        });
        document.dispatchEvent(event);
    }
    
    updateFromCalculation(data) {
        // Update platform based on calculation results
        if (data && data.results) {
            this.refreshKPIs();
            this.refreshCurrentTab();
        }
    }
    
    updateFromConfiguration(config) {
        // Update platform based on configuration changes
        if (config) {
            Object.assign(this.config, config);
            this.refreshKPIs();
            this.refreshCurrentTab();
        }
    }
    
    handleExport() {
        console.log("📤 Exporting executive report...");
        
        try {
            // Create comprehensive export data
            const exportData = {
                timestamp: new Date().toISOString(),
                configuration: this.config,
                selectedVendors: this.selectedVendors,
                vendorData: this.selectedVendors.map(id => this.vendorData[id]),
                industryData: this.industryData[this.config.industry],
                calculations: this.generateCalculationSummary(),
                insights: this.generateExecutiveInsights(),
                recommendations: this.generateRecommendations()
            };
            
            // Generate downloadable report
            this.generatePDFReport(exportData);
            this.generateExcelReport(exportData);
            this.generateJSONReport(exportData);
            
            // Show success message
            this.showNotification('Executive report exported successfully!', 'success');
            
        } catch (error) {
            console.error('Export failed:', error);
            this.showNotification('Export failed. Please try again.', 'error');
        }
    }
    
    generateCalculationSummary() {
        const portnox = this.vendorData.portnox;
        const avgCompetitor = this.calculateAverageCompetitor();
        
        return {
            costSavings: {
                absolute: avgCompetitor.tco3Year - portnox.costs.tco3Year,
                percentage: ((avgCompetitor.tco3Year - portnox.costs.tco3Year) / avgCompetitor.tco3Year) * 100,
                perDevice: (avgCompetitor.tco3Year - portnox.costs.tco3Year) / this.config.deviceCount
            },
            roi: {
                year1: portnox.metrics.roi1Year,
                year3: portnox.metrics.roi3Year,
                year5: portnox.metrics.roi5Year,
                paybackMonths: portnox.metrics.paybackMonths
            },
            efficiency: {
                implementationSpeedup: ((avgCompetitor.implementationDays - portnox.metrics.implementationDays) / avgCompetitor.implementationDays) * 100,
                fteReduction: ((avgCompetitor.fteRequired - portnox.metrics.fteRequired) / avgCompetitor.fteRequired) * 100,
                securityImprovement: portnox.metrics.securityScore - avgCompetitor.securityScore
            }
        };
    }
    
    generateExecutiveInsights() {
        const calculations = this.generateCalculationSummary();
        const industryData = this.industryData[this.config.industry];
        
        return [
            {
                title: "Strategic Cost Leadership",
                insight: `Portnox Cloud delivers ${Math.round(calculations.costSavings.percentage)}% cost reduction compared to traditional NAC solutions, representing ${Math.round(calculations.costSavings.absolute / 1000)}K in savings over 3 years.`,
                impact: "High",
                category: "Financial"
            },
            {
                title: "Accelerated Time to Value",
                insight: `Implementation speed advantage of ${Math.round(calculations.efficiency.implementationSpeedup)}% enables faster digital transformation and quicker ROI realization.`,
                impact: "High",
                category: "Operational"
            },
            {
                title: "Enhanced Security Posture",
                insight: `Superior security score of ${this.vendorData.portnox.metrics.securityScore}% provides ${Math.round(calculations.efficiency.securityImprovement)}% improvement over industry average, reducing breach risk significantly.`,
                impact: "Critical",
                category: "Security"
            },
            {
                title: "Industry-Specific Value",
                insight: `${industryData.name} sector benefits from specialized compliance coverage and ${Math.round(industryData.riskMultiplier * 100 - 100)}% adjusted risk protection.`,
                impact: "Medium",
                category: "Compliance"
            }
        ];
    }
    
    generateRecommendations() {
        return [
            {
                priority: "Immediate",
                recommendation: "Initiate Portnox Cloud pilot program with 100-200 devices to validate projected savings and performance metrics.",
                timeline: "2-4 weeks",
                expectedOutcome: "Proof of concept validation and stakeholder buy-in"
            },
            {
                priority: "Short-term",
                recommendation: "Develop migration strategy from existing NAC solution to Portnox Cloud with minimal business disruption.",
                timeline: "1-2 months",
                expectedOutcome: "Detailed implementation roadmap and risk mitigation plan"
            },
            {
                priority: "Medium-term",
                recommendation: "Implement comprehensive Zero Trust architecture leveraging Portnox Cloud as the foundational NAC component.",
                timeline: "3-6 months",
                expectedOutcome: "Enhanced security posture and compliance readiness"
            },
            {
                priority: "Long-term",
                recommendation: "Leverage cost savings and efficiency gains to fund additional cybersecurity initiatives and digital transformation projects.",
                timeline: "6-12 months",
                expectedOutcome: "Strategic competitive advantage and operational excellence"
            }
        ];
    }
    
    generatePDFReport(data) {
        // Create PDF report content
        const reportContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h1>Zero Trust NAC Executive Report</h1>
                <h2>Generated: ${new Date().toLocaleDateString()}</h2>
                
                <h3>Executive Summary</h3>
                <p>Cost Savings: ${Math.round(data.calculations.costSavings.absolute / 1000)}K over 3 years</p>
                <p>ROI: ${data.calculations.roi.year3}% (3-year)</p>
                <p>Payback Period: ${data.calculations.roi.paybackMonths} months</p>
                
                <h3>Key Insights</h3>
                ${data.insights.map(insight => `
                    <div style="margin-bottom: 15px;">
                        <h4>${insight.title} (${insight.impact} Impact)</h4>
                        <p>${insight.insight}</p>
                    </div>
                `).join('')}
                
                <h3>Recommendations</h3>
                ${data.recommendations.map(rec => `
                    <div style="margin-bottom: 15px;">
                        <h4>${rec.priority} Priority</h4>
                        <p><strong>Action:</strong> ${rec.recommendation}</p>
                        <p><strong>Timeline:</strong> ${rec.timeline}</p>
                        <p><strong>Expected Outcome:</strong> ${rec.expectedOutcome}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Trigger PDF download
        const blob = new Blob([reportContent], { type: 'text/html' });
        this.downloadFile(blob, 'zero-trust-executive-report.html');
    }
    
    generateExcelReport(data) {
        // Create Excel-compatible CSV data
        const csvContent = [
            ['Zero Trust NAC Executive Report'],
            ['Generated:', new Date().toLocaleDateString()],
            [''],
            ['Configuration'],
            ['Device Count', data.configuration.deviceCount],
            ['Industry', data.industryData.name],
            ['Analysis Period', data.configuration.analysisPeriod + ' years'],
            [''],
            ['Financial Summary'],
            ['3-Year Cost Savings', ' + Math.round(data.calculations.costSavings.absolute).toLocaleString()],
            ['Cost Savings Percentage', Math.round(data.calculations.costSavings.percentage) + '%'],
            ['3-Year ROI', data.calculations.roi.year3 + '%'],
            ['Payback Period', data.calculations.roi.paybackMonths + ' months'],
            [''],
            ['Vendor Comparison'],
            ['Vendor', 'TCO (3-Year)', 'ROI (%)', 'Implementation (Days)', 'FTE Required', 'Security Score'],
            ...data.vendorData.map(vendor => [
                vendor.shortName,
                ' + vendor.costs.tco3Year.toLocaleString(),
                vendor.metrics.roi3Year + '%',
                vendor.metrics.implementationDays,
                vendor.metrics.fteRequired,
                vendor.metrics.securityScore + '%'
            ])
        ].map(row => row.join(',')).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        this.downloadFile(blob, 'zero-trust-executive-report.csv');
    }
    
    generateJSONReport(data) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        this.downloadFile(blob, 'zero-trust-executive-report.json');
    }
    
    downloadFile(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    handleLiveDemo() {
        console.log("🎬 Starting live demo...");
        this.showNotification('Live demo session initiated. A Portnox specialist will contact you shortly.', 'info');
        
        // Simulate demo request
        const demoData = {
            timestamp: new Date().toISOString(),
            configuration: this.config,
            selectedVendors: this.selectedVendors,
            contactInfo: 'Demo requested via Executive Command Center'
        };
        
        // In a real implementation, this would send data to a CRM or booking system
        console.log('Demo request data:', demoData);
    }
    
    handleCustomize() {
        console.log("⚙️ Opening customization options...");
        this.showNotification('Customization panel coming soon! Contact your Portnox representative for custom configurations.', 'info');
    }
    
    handleScheduleMeeting() {
        console.log("📅 Opening meeting scheduler...");
        this.showNotification('Redirecting to meeting scheduler...', 'info');
        
        // In a real implementation, this would integrate with a calendar system
        setTimeout(() => {
            window.open('https://calendly.com/portnox-demo', '_blank');
        }, 1000);
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-weight: 600;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
    
    // Cleanup method
    destroy() {
        // Remove event listeners
        this.eventListeners.forEach(listener => {
            listener.element.removeEventListener(listener.event, listener.handler);
        });
        
        // Destroy chart instances
        Object.values(this.chartInstances).forEach(chart => {
            if (chart && chart.destroy) {
                chart.destroy();
            }
        });
        
        this.initialized = false;
        console.log("🧹 Zero Trust Executive Platform cleaned up");
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for all dependencies to load
    setTimeout(() => {
        if (!window.zeroTrustExecutivePlatform) {
            window.zeroTrustExecutivePlatform = new ZeroTrustExecutivePlatform();
            
            const executiveView = document.querySelector('#executive-view');
            if (executiveView) {
                window.zeroTrustExecutivePlatform.init();
                console.log("🚀 Zero Trust Executive Platform fully loaded and ready");
            }
        }
    }, 1200);
});

// Global access and cleanup
window.ZeroTrustExecutivePlatform = ZeroTrustExecutivePlatform;

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.zeroTrustExecutivePlatform) {
        window.zeroTrustExecutivePlatform.destroy();
    }
});
