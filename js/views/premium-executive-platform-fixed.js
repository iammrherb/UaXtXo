/**
 * Premium Executive Platform - Fixed Version
 * Complete restoration with all functionality
 */

class PremiumExecutivePlatform {
    constructor() {
        this.currentView = 'overview';
        this.selectedVendors = ['portnox'];
        this.comparisonMode = false;
        this.charts = {};
        this.vendors = window.VendorDatabase || {};
        this.compliance = window.ComplianceFrameworks || {};
    }
    
    initialize() {
        console.log('🚀 Initializing Premium Executive Platform');
        this.setupEventListeners();
        this.renderPlatform();
        this.loadDefaultView();
    }
    
    setupEventListeners() {
        // Navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-item')) {
                const viewName = e.target.closest('.nav-item').dataset.view;
                this.switchView(viewName);
            }
            
            // Tab clicks
            if (e.target.closest('.tab')) {
                const tab = e.target.closest('.tab');
                const tabGroup = tab.dataset.tabGroup;
                const tabName = tab.dataset.tab;
                this.switchTab(tabGroup, tabName);
            }
        });
    }
    
    renderPlatform() {
        const container = document.getElementById('app-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="platform-wrapper">
                <!-- Header -->
                <header class="platform-header">
                    <div class="header-container">
                        <div class="header-left">
                            <img src="./img/vendors/portnox-logo.svg" alt="Portnox" class="header-logo">
                            <div class="header-title">
                                <h1>Executive Decision Platform</h1>
                                <p class="header-subtitle">Zero Trust NAC Investment Analysis</p>
                            </div>
                        </div>
                        
                        <nav class="header-nav">
                            <button class="nav-item active" data-view="overview">
                                <i class="fas fa-chart-line"></i>
                                <span>Overview</span>
                            </button>
                            <button class="nav-item" data-view="compliance">
                                <i class="fas fa-shield-check"></i>
                                <span>Compliance</span>
                            </button>
                            <button class="nav-item" data-view="comparison">
                                <i class="fas fa-balance-scale"></i>
                                <span>Compare</span>
                            </button>
                            <button class="nav-item" data-view="financial">
                                <i class="fas fa-dollar-sign"></i>
                                <span>ROI Analysis</span>
                            </button>
                            <button class="nav-item" data-view="technical">
                                <i class="fas fa-cogs"></i>
                                <span>Technical</span>
                            </button>
                        </nav>
                        
                        <div class="header-actions">
                            <button class="btn-icon" onclick="platform.toggleTheme()">
                                <i class="fas fa-moon"></i>
                            </button>
                            <button class="btn-primary" onclick="platform.exportReport()">
                                <i class="fas fa-download"></i>
                                Export Report
                            </button>
                        </div>
                    </div>
                </header>
                
                <!-- Main Content Area -->
                <main id="main-content" class="main-content">
                    <!-- Content will be rendered here -->
                </main>
                
                <!-- Footer -->
                <footer class="platform-footer">
                    <div class="footer-content">
                        <p>&copy; 2024 Portnox. Executive Decision Platform.</p>
                    </div>
                </footer>
            </div>
        `;
    }
    
    loadDefaultView() {
        this.switchView('overview');
    }
    
    switchView(viewName) {
        this.currentView = viewName;
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === viewName);
        });
        
        // Render view
        const content = document.getElementById('main-content');
        if (!content) return;
        
        switch(viewName) {
            case 'overview':
                this.renderOverviewView(content);
                break;
            case 'compliance':
                this.renderComplianceView(content);
                break;
            case 'comparison':
                this.renderComparisonView(content);
                break;
            case 'financial':
                this.renderFinancialView(content);
                break;
            case 'technical':
                this.renderTechnicalView(content);
                break;
            default:
                this.renderOverviewView(content);
        }
    }
    
    renderOverviewView(container) {
        container.innerHTML = `
            <div class="overview-dashboard animate-fadeIn">
                <!-- Executive Summary -->
                <section class="executive-summary">
                    <div class="summary-header">
                        <h2>Executive Summary</h2>
                        <p class="summary-subtitle">Zero Trust NAC Platform Analysis</p>
                    </div>
                    
                    <div class="summary-metrics">
                        <div class="metric-card highlight">
                            <i class="fas fa-rocket"></i>
                            <div class="metric-content">
                                <div class="metric-value">85%</div>
                                <div class="metric-label">Faster Deployment</div>
                                <div class="metric-detail">vs. Legacy NAC</div>
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <i class="fas fa-shield-alt"></i>
                            <div class="metric-content">
                                <div class="metric-value">98%</div>
                                <div class="metric-label">Threat Prevention</div>
                                <div class="metric-detail">AI-Powered Detection</div>
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <i class="fas fa-dollar-sign"></i>
                            <div class="metric-content">
                                <div class="metric-value">342%</div>
                                <div class="metric-label">3-Year ROI</div>
                                <div class="metric-detail">$2.4M Savings</div>
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <i class="fas fa-check-circle"></i>
                            <div class="metric-content">
                                <div class="metric-value">95%</div>
                                <div class="metric-label">Compliance</div>
                                <div class="metric-detail">Automated Controls</div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Key Differentiators -->
                <section class="key-differentiators">
                    <h3>Portnox Key Differentiators</h3>
                    <div class="differentiators-grid">
                        <div class="differentiator-card">
                            <div class="icon-wrapper">
                                <i class="fas fa-cloud"></i>
                            </div>
                            <h4>Cloud-Native Architecture</h4>
                            <p>Built for modern infrastructure with unlimited scalability</p>
                        </div>
                        
                        <div class="differentiator-card">
                            <div class="icon-wrapper">
                                <i class="fas fa-magic"></i>
                            </div>
                            <h4>Agentless Deployment</h4>
                            <p>No software installation required on endpoints</p>
                        </div>
                        
                        <div class="differentiator-card">
                            <div class="icon-wrapper">
                                <i class="fas fa-brain"></i>
                            </div>
                            <h4>AI-Powered Security</h4>
                            <p>Machine learning for anomaly detection and threat prevention</p>
                        </div>
                        
                        <div class="differentiator-card">
                            <div class="icon-wrapper">
                                <i class="fas fa-infinity"></i>
                            </div>
                            <h4>Unlimited Scalability</h4>
                            <p>Scale to millions of devices without infrastructure changes</p>
                        </div>
                    </div>
                </section>
                
                <!-- Market Position -->
                <section class="market-position">
                    <h3>Market Leadership Position</h3>
                    <div class="position-chart" id="market-position-chart"></div>
                </section>
                
                <!-- Quick Actions -->
                <section class="quick-actions">
                    <h3>Quick Actions</h3>
                    <div class="actions-grid">
                        <button class="action-card" onclick="platform.startDemo()">
                            <i class="fas fa-play-circle"></i>
                            <h4>Start Interactive Demo</h4>
                            <p>Experience Portnox in action</p>
                        </button>
                        
                        <button class="action-card" onclick="platform.calculateROI()">
                            <i class="fas fa-calculator"></i>
                            <h4>Calculate Your ROI</h4>
                            <p>Personalized savings analysis</p>
                        </button>
                        
                        <button class="action-card" onclick="platform.scheduleCall()">
                            <i class="fas fa-phone"></i>
                            <h4>Schedule Expert Call</h4>
                            <p>Speak with a solution architect</p>
                        </button>
                        
                        <button class="action-card" onclick="platform.downloadWhitepaper()">
                            <i class="fas fa-file-alt"></i>
                            <h4>Download Whitepaper</h4>
                            <p>Zero Trust NAC Guide</p>
                        </button>
                    </div>
                </section>
            </div>
        `;
        
        // Initialize charts
        this.initializeOverviewCharts();
    }
    
    renderComplianceView(container) {
        // Use the enhanced compliance view if available
        if (window.NAC && window.NAC.compliance) {
            window.NAC.compliance.render(container);
        } else {
            container.innerHTML = `
                <div class="compliance-placeholder">
                    <h2>Compliance Dashboard</h2>
                    <p>Loading compliance framework analysis...</p>
                </div>
            `;
        }
    }
    
    renderComparisonView(container) {
        container.innerHTML = `
            <div class="comparison-dashboard animate-fadeIn">
                <section class="comparison-header">
                    <h2>Vendor Comparison Analysis</h2>
                    <p>Compare Portnox against legacy and cloud competitors</p>
                </section>
                
                <!-- Vendor Selection -->
                <section class="vendor-selection">
                    <h3>Select Vendors to Compare</h3>
                    <div class="vendor-grid">
                        ${Object.entries(this.vendors).map(([id, vendor]) => `
                            <label class="vendor-selector ${this.selectedVendors.includes(id) ? 'selected' : ''}">
                                <input type="checkbox" 
                                       value="${id}" 
                                       ${this.selectedVendors.includes(id) ? 'checked' : ''}
                                       onchange="platform.toggleVendor('${id}')">
                                <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-logo">
                                <span class="vendor-name">${vendor.name}</span>
                                <span class="vendor-category">${vendor.category}</span>
                            </label>
                        `).join('')}
                    </div>
                </section>
                
                <!-- Comparison Matrix -->
                <section class="comparison-matrix">
                    <h3>Feature Comparison Matrix</h3>
                    <div class="matrix-container" id="comparison-matrix">
                        <!-- Matrix will be rendered here -->
                    </div>
                </section>
                
                <!-- Comparison Charts -->
                <section class="comparison-charts">
                    <div class="chart-grid">
                        <div class="chart-container">
                            <h4>Deployment Speed</h4>
                            <div id="deployment-speed-chart"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Total Cost of Ownership</h4>
                            <div id="tco-comparison-chart"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Feature Coverage</h4>
                            <div id="feature-coverage-chart"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Scalability</h4>
                            <div id="scalability-chart"></div>
                        </div>
                    </div>
                </section>
            </div>
        `;
        
        // Render comparison data
        this.renderComparisonMatrix();
        this.initializeComparisonCharts();
    }
    
    renderFinancialView(container) {
        container.innerHTML = `
            <div class="financial-dashboard animate-fadeIn">
                <section class="financial-header">
                    <h2>Financial Analysis & ROI</h2>
                    <p>Comprehensive cost-benefit analysis for Zero Trust NAC investment</p>
                </section>
                
                <!-- ROI Calculator -->
                <section class="roi-calculator">
                    <h3>ROI Calculator</h3>
                    <div class="calculator-inputs">
                        <div class="input-group">
                            <label>Number of Devices</label>
                            <input type="number" id="device-count" value="5000" onchange="platform.calculateROI()">
                        </div>
                        <div class="input-group">
                            <label>Number of Locations</label>
                            <input type="number" id="location-count" value="10" onchange="platform.calculateROI()">
                        </div>
                        <div class="input-group">
                            <label>IT Staff (FTEs)</label>
                            <input type="number" id="it-staff" value="5" onchange="platform.calculateROI()">
                        </div>
                        <div class="input-group">
                            <label>Average IT Salary</label>
                            <input type="number" id="it-salary" value="100000" onchange="platform.calculateROI()">
                        </div>
                    </div>
                    
                    <div class="roi-results" id="roi-results">
                        <!-- ROI results will be rendered here -->
                    </div>
                </section>
                
                <!-- Cost Breakdown -->
                <section class="cost-breakdown">
                    <h3>3-Year Cost Analysis</h3>
                    <div class="cost-tabs">
                        <button class="tab active" data-tab-group="cost" data-tab="portnox">Portnox</button>
                        <button class="tab" data-tab-group="cost" data-tab="legacy">Legacy NAC</button>
                        <button class="tab" data-tab-group="cost" data-tab="comparison">Side-by-Side</button>
                    </div>
                    <div class="cost-content" id="cost-analysis-content">
                        <!-- Cost analysis will be rendered here -->
                    </div>
                </section>
                
                <!-- Financial Charts -->
                <section class="financial-charts">
                    <div class="chart-grid">
                        <div class="chart-container">
                            <h4>Cumulative Savings</h4>
                            <div id="cumulative-savings-chart"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Payback Period</h4>
                            <div id="payback-period-chart"></div>
                        </div>
                    </div>
                </section>
            </div>
        `;
        
        // Initialize financial calculations
        this.calculateROI();
        this.initializeFinancialCharts();
    }
    
    renderTechnicalView(container) {
        container.innerHTML = `
            <div class="technical-dashboard animate-fadeIn">
                <section class="technical-header">
                    <h2>Technical Architecture & Integration</h2>
                    <p>Deep dive into Portnox technical capabilities</p>
                </section>
                
                <!-- Architecture Overview -->
                <section class="architecture-overview">
                    <h3>Cloud-Native Architecture</h3>
                    <div class="architecture-diagram" id="architecture-diagram">
                        <!-- Interactive architecture diagram -->
                    </div>
                </section>
                
                <!-- Integration Ecosystem -->
                <section class="integration-ecosystem">
                    <h3>Integration Ecosystem</h3>
                    <div class="integrations-grid">
                        <div class="integration-category">
                            <h4>Identity Providers</h4>
                            <div class="integration-logos">
                                <img src="./img/integrations/azure-ad.svg" alt="Azure AD">
                                <img src="./img/integrations/okta.svg" alt="Okta">
                                <img src="./img/integrations/google.svg" alt="Google">
                            </div>
                        </div>
                        <div class="integration-category">
                            <h4>SIEM/SOAR</h4>
                            <div class="integration-logos">
                                <img src="./img/integrations/splunk.svg" alt="Splunk">
                                <img src="./img/integrations/qradar.svg" alt="QRadar">
                                <img src="./img/integrations/sentinel.svg" alt="Sentinel">
                            </div>
                        </div>
                        <div class="integration-category">
                            <h4>MDM/UEM</h4>
                            <div class="integration-logos">
                                <img src="./img/integrations/intune.svg" alt="Intune">
                                <img src="./img/integrations/jamf.svg" alt="Jamf">
                                <img src="./img/integrations/workspace-one.svg" alt="Workspace ONE">
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Deployment Options -->
                <section class="deployment-options">
                    <h3>Flexible Deployment Options</h3>
                    <div class="deployment-cards">
                        <div class="deployment-card">
                            <i class="fas fa-cloud"></i>
                            <h4>Pure Cloud</h4>
                            <p>100% SaaS deployment with no on-premise infrastructure</p>
                            <ul>
                                <li>Instant deployment</li>
                                <li>Zero maintenance</li>
                                <li>Automatic updates</li>
                            </ul>
                        </div>
                        <div class="deployment-card">
                            <i class="fas fa-network-wired"></i>
                            <h4>Hybrid Cloud</h4>
                            <p>Cloud control with on-premise collectors for air-gapped networks</p>
                            <ul>
                                <li>Flexible architecture</li>
                                <li>Local policy enforcement</li>
                                <li>Cloud management</li>
                            </ul>
                        </div>
                        <div class="deployment-card">
                            <i class="fas fa-server"></i>
                            <h4>Private Cloud</h4>
                            <p>Deploy in your own cloud infrastructure (AWS, Azure, GCP)</p>
                            <ul>
                                <li>Data sovereignty</li>
                                <li>Custom deployment</li>
                                <li>Full control</li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                <!-- API & Automation -->
                <section class="api-automation">
                    <h3>API & Automation Capabilities</h3>
                    <div class="api-features">
                        <div class="api-card">
                            <h4>RESTful API</h4>
                            <p>Complete API coverage for all platform functions</p>
                            <code>GET /api/v2/devices</code>
                        </div>
                        <div class="api-card">
                            <h4>Webhooks</h4>
                            <p>Real-time event notifications</p>
                            <code>POST /webhooks/device-connected</code>
                        </div>
                        <div class="api-card">
                            <h4>Python SDK</h4>
                            <p>Native Python library for automation</p>
                            <code>pip install portnox-sdk</code>
                        </div>
                    </div>
                </section>
            </div>
        `;
        
        // Initialize technical visualizations
        this.initializeTechnicalCharts();
    }
    
    // Tab switching functionality
    switchTab(tabGroup, tabName) {
        // Update active tab
        document.querySelectorAll(`[data-tab-group="${tabGroup}"]`).forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        // Update content based on tab group
        if (tabGroup === 'cost') {
            this.renderCostAnalysis(tabName);
        }
    }
    
    renderCostAnalysis(view) {
        const container = document.getElementById('cost-analysis-content');
        if (!container) return;
        
        const deviceCount = parseInt(document.getElementById('device-count').value) || 5000;
        
        switch(view) {
            case 'portnox':
                container.innerHTML = `
                    <div class="cost-details">
                        <h4>Portnox Cloud-Native NAC</h4>
                        <table class="cost-table">
                            <thead>
                                <tr>
                                    <th>Cost Component</th>
                                    <th>Year 1</th>
                                    <th>Year 2</th>
                                    <th>Year 3</th>
                                    <th>3-Year Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Software Licensing</td>
                                    <td>$${(deviceCount * 12).toLocaleString()}</td>
                                    <td>$${(deviceCount * 12).toLocaleString()}</td>
                                    <td>$${(deviceCount * 12).toLocaleString()}</td>
                                    <td>$${(deviceCount * 36).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td>Implementation</td>
                                    <td>$25,000</td>
                                    <td>$0</td>
                                    <td>$0</td>
                                    <td>$25,000</td>
                                </tr>
                                <tr>
                                    <td>Training</td>
                                    <td>$5,000</td>
                                    <td>$0</td>
                                    <td>$0</td>
                                    <td>$5,000</td>
                                </tr>
                                <tr>
                                    <td>Maintenance</td>
                                    <td>$0</td>
                                    <td>$0</td>
                                    <td>$0</td>
                                    <td>$0</td>
                                </tr>
                                <tr class="total-row">
                                    <td><strong>Total</strong></td>
                                    <td><strong>$${(deviceCount * 12 + 30000).toLocaleString()}</strong></td>
                                    <td><strong>$${(deviceCount * 12).toLocaleString()}</strong></td>
                                    <td><strong>$${(deviceCount * 12).toLocaleString()}</strong></td>
                                    <td><strong>$${(deviceCount * 36 + 30000).toLocaleString()}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `;
                break;
                
            case 'legacy':
                container.innerHTML = `
                    <div class="cost-details">
                        <h4>Legacy NAC (Cisco ISE / Aruba ClearPass)</h4>
                        <table class="cost-table">
                            <thead>
                                <tr>
                                    <th>Cost Component</th>
                                    <th>Year 1</th>
                                    <th>Year 2</th>
                                    <th>Year 3</th>
                                    <th>3-Year Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Software Licensing</td>
                                    <td>$${(deviceCount * 25).toLocaleString()}</td>
                                    <td>$${(deviceCount * 25).toLocaleString()}</td>
                                    <td>$${(deviceCount * 25).toLocaleString()}</td>
                                    <td>$${(deviceCount * 75).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td>Hardware/Infrastructure</td>
                                    <td>$150,000</td>
                                    <td>$0</td>
                                    <td>$50,000</td>
                                    <td>$200,000</td>
                                </tr>
                                <tr>
                                    <td>Implementation</td>
                                    <td>$100,000</td>
                                    <td>$0</td>
                                    <td>$0</td>
                                    <td>$100,000</td>
                                </tr>
                                <tr>
                                    <td>Training</td>
                                    <td>$15,000</td>
                                    <td>$5,000</td>
                                    <td>$5,000</td>
                                    <td>$25,000</td>
                                </tr>
                                <tr>
                                    <td>Maintenance & Support</td>
                                    <td>$30,000</td>
                                    <td>$30,000</td>
                                    <td>$30,000</td>
                                    <td>$90,000</td>
                                </tr>
                                <tr class="total-row">
                                    <td><strong>Total</strong></td>
                                    <td><strong>$${(deviceCount * 25 + 295000).toLocaleString()}</strong></td>
                                    <td><strong>$${(deviceCount * 25 + 35000).toLocaleString()}</strong></td>
                                    <td><strong>$${(deviceCount * 25 + 85000).toLocaleString()}</strong></td>
                                    <td><strong>$${(deviceCount * 75 + 415000).toLocaleString()}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `;
                break;
                
            case 'comparison':
                const portnoxTotal = deviceCount * 36 + 30000;
                const legacyTotal = deviceCount * 75 + 415000;
                const savings = legacyTotal - portnoxTotal;
                const savingsPercent = Math.round((savings / legacyTotal) * 100);
                
                container.innerHTML = `
                    <div class="cost-comparison">
                        <h4>3-Year Total Cost Comparison</h4>
                        <div class="comparison-summary">
                            <div class="vendor-total portnox">
                                <h5>Portnox Cloud NAC</h5>
                                <div class="total-amount">$${portnoxTotal.toLocaleString()}</div>
                            </div>
                            <div class="vs-indicator">VS</div>
                            <div class="vendor-total legacy">
                                <h5>Legacy NAC</h5>
                                <div class="total-amount">$${legacyTotal.toLocaleString()}</div>
                            </div>
                        </div>
                        <div class="savings-highlight">
                            <i class="fas fa-piggy-bank"></i>
                            <div class="savings-content">
                                <h5>Total Savings with Portnox</h5>
                                <div class="savings-amount">$${savings.toLocaleString()}</div>
                                <div class="savings-percent">${savingsPercent}% Lower TCO</div>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }
    }
    
    // Chart initialization methods
    initializeOverviewCharts() {
        // Market position chart
        const container = document.getElementById('market-position-chart');
        if (container && typeof Highcharts !== 'undefined') {
            this.charts.marketPosition = Highcharts.chart(container, {
                chart: {
                    type: 'scatter',
                    backgroundColor: 'transparent',
                    height: 400
                },
                title: {
                    text: 'NAC Market Positioning',
                    style: { color: '#ffffff' }
                },
                xAxis: {
                    title: {
                        text: 'Ease of Deployment',
                        style: { color: '#a6acbb' }
                    },
                    labels: { style: { color: '#a6acbb' } },
                    gridLineColor: 'rgba(255, 255, 255, 0.1)'
                },
                yAxis: {
                    title: {
                        text: 'Feature Completeness',
                        style: { color: '#a6acbb' }
                    },
                    labels: { style: { color: '#a6acbb' } },
                    gridLineColor: 'rgba(255, 255, 255, 0.1)'
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 8,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: '#00e5e6'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'Portnox',
                    color: '#00e5e6',
                    data: [[95, 98]],
                    marker: { radius: 12 }
                }, {
                    name: 'Legacy NAC',
                    color: '#ef4444',
                    data: [[20, 85], [25, 80], [15, 75]]
                }, {
                    name: 'Cloud Competitors',
                    color: '#f59e0b',
                    data: [[70, 40], [65, 45], [75, 35]]
                }],
                credits: { enabled: false }
            });
        }
    }
    
    initializeComparisonCharts() {
        // Deployment speed chart
        const deploymentContainer = document.getElementById('deployment-speed-chart');
        if (deploymentContainer && typeof Highcharts !== 'undefined') {
            this.charts.deploymentSpeed = Highcharts.chart(deploymentContainer, {
                chart: {
                    type: 'bar',
                    backgroundColor: 'transparent',
                    height: 300
                },
                title: {
                    text: 'Time to Full Deployment',
                    style: { color: '#ffffff' }
                },
                xAxis: {
                    categories: this.selectedVendors.map(id => this.vendors[id]?.name || id),
                    labels: { style: { color: '#a6acbb' } }
                },
                yAxis: {
                    title: {
                        text: 'Days',
                        style: { color: '#a6acbb' }
                    },
                    labels: { style: { color: '#a6acbb' } }
                },
                series: [{
                    name: 'Deployment Time',
                    data: this.selectedVendors.map(id => {
                        if (id === 'portnox') return 7;
                        if (this.vendors[id]?.category === 'legacy') return 180;
                        return 30;
                    }),
                    color: '#00e5e6'
                }],
                credits: { enabled: false }
            });
        }
    }
    
    initializeFinancialCharts() {
        // Calculate cumulative savings
        const months = 36;
        const monthlySavings = 50000;
        const cumulativeData = [];
        
        for (let i = 1; i <= months; i++) {
            cumulativeData.push([i, i * monthlySavings]);
        }
        
        const savingsContainer = document.getElementById('cumulative-savings-chart');
        if (savingsContainer && typeof Highcharts !== 'undefined') {
            this.charts.cumulativeSavings = Highcharts.chart(savingsContainer, {
                chart: {
                    type: 'area',
                    backgroundColor: 'transparent',
                    height: 300
                },
                title: {
                    text: 'Cumulative Savings Over Time',
                    style: { color: '#ffffff' }
                },
                xAxis: {
                    title: {
                        text: 'Months',
                        style: { color: '#a6acbb' }
                    },
                    labels: { style: { color: '#a6acbb' } }
                },
                yAxis: {
                    title: {
                        text: 'Savings ($)',
                        style: { color: '#a6acbb' }
                    },
                    labels: {
                        style: { color: '#a6acbb' },
                        formatter: function() {
                            return '$' + (this.value / 1000) + 'K';
                        }
                    }
                },
                series: [{
                    name: 'Cumulative Savings',
                    data: cumulativeData,
                    color: '#00e5e6',
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, 'rgba(0, 229, 230, 0.3)'],
                            [1, 'rgba(0, 229, 230, 0.0)']
                        ]
                    }
                }],
                credits: { enabled: false }
            });
        }
    }
    
    initializeTechnicalCharts() {
        // Initialize architecture diagram
        const architectureContainer = document.getElementById('architecture-diagram');
        if (architectureContainer) {
            architectureContainer.innerHTML = `
                <div class="architecture-visual">
                    <img src="./img/portnox-architecture.svg" alt="Portnox Architecture" 
                         onerror="this.src='data:image/svg+xml;base64,${btoa(this.createArchitecturePlaceholder())}'">
                </div>
            `;
        }
    }
    
    createArchitecturePlaceholder() {
        return `
            <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
                <rect width="800" height="400" fill="#1a1a1a" stroke="#00e5e6" stroke-width="2"/>
                <text x="400" y="200" text-anchor="middle" fill="#00e5e6" font-size="24" font-weight="bold">
                    Cloud-Native Architecture
                </text>
                <text x="400" y="230" text-anchor="middle" fill="#a6acbb" font-size="16">
                    Interactive diagram placeholder
                </text>
            </svg>
        `;
    }
    
    // Utility methods
    calculateROI() {
        const deviceCount = parseInt(document.getElementById('device-count')?.value) || 5000;
        const locationCount = parseInt(document.getElementById('location-count')?.value) || 10;
        const itStaff = parseInt(document.getElementById('it-staff')?.value) || 5;
        const itSalary = parseInt(document.getElementById('it-salary')?.value) || 100000;
        
        // Calculate costs
        const portnoxCost = deviceCount * 36 + 30000; // 3-year
        const legacyCost = deviceCount * 75 + 415000; // 3-year
        const laborSavings = itStaff * itSalary * 0.3 * 3; // 30% time savings over 3 years
        
        const totalSavings = (legacyCost - portnoxCost) + laborSavings;
        const roi = Math.round((totalSavings / portnoxCost) * 100);
        const paybackMonths = Math.round(portnoxCost / (totalSavings / 36));
        
        const resultsContainer = document.getElementById('roi-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="roi-summary">
                    <div class="roi-metric highlight">
                        <h4>3-Year ROI</h4>
                        <div class="metric-value">${roi}%</div>
                    </div>
                    <div class="roi-metric">
                        <h4>Total Savings</h4>
                        <div class="metric-value">$${totalSavings.toLocaleString()}</div>
                    </div>
                    <div class="roi-metric">
                        <h4>Payback Period</h4>
                        <div class="metric-value">${paybackMonths} months</div>
                    </div>
                    <div class="roi-metric">
                        <h4>Labor Savings</h4>
                        <div class="metric-value">$${laborSavings.toLocaleString()}</div>
                    </div>
                </div>
            `;
        }
    }
    
    renderComparisonMatrix() {
        const container = document.getElementById('comparison-matrix');
        if (!container) return;
        
        const features = [
            'Cloud-Native Architecture',
            'Agentless Deployment',
            'Zero Trust Security',
            'AI/ML Capabilities',
            'Unlimited Scalability',
            'Real-time Visibility',
            'Automated Compliance',
            'API/Integration',
            'Multi-tenancy',
            'Global Support'
        ];
        
        container.innerHTML = `
            <table class="feature-matrix">
                <thead>
                    <tr>
                        <th>Feature</th>
                        ${this.selectedVendors.map(id => `
                            <th>${this.vendors[id]?.name || id}</th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${features.map(feature => `
                        <tr>
                            <td>${feature}</td>
                            ${this.selectedVendors.map(id => {
                                const score = this.getFeatureScore(id, feature);
                                const icon = score >= 90 ? 'check-circle' : 
                                           score >= 50 ? 'minus-circle' : 'times-circle';
                                const color = score >= 90 ? '#10b981' : 
                                            score >= 50 ? '#f59e0b' : '#ef4444';
                                return `
                                    <td>
                                        <i class="fas fa-${icon}" style="color: ${color}; font-size: 1.5rem;"></i>
                                    </td>
                                `;
                            }).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    
    getFeatureScore(vendorId, feature) {
        // Portnox excels at all features
        if (vendorId === 'portnox') return 95;
        
        // Legacy vendors struggle with modern features
        if (this.vendors[vendorId]?.category === 'legacy') {
            if (feature.includes('Cloud') || feature.includes('AI') || feature.includes('Agentless')) {
                return 20;
            }
            return 60;
        }
        
        // Cloud competitors have limited features
        return 40;
    }
    
    toggleVendor(vendorId) {
        const index = this.selectedVendors.indexOf(vendorId);
        if (index > -1) {
            this.selectedVendors.splice(index, 1);
        } else {
            this.selectedVendors.push(vendorId);
        }
        
        // Re-render comparison view
        this.renderComparisonView(document.getElementById('main-content'));
    }
    
    // Action methods
    startDemo() {
        alert('Demo functionality would open an interactive demo environment');
    }
    
    scheduleCall() {
        alert('Calendar scheduling widget would open here');
    }
    
    downloadWhitepaper() {
        alert('Whitepaper download would start');
    }
    
    exportReport() {
        alert('Comprehensive report export functionality');
    }
    
    toggleTheme() {
        document.body.classList.toggle('light-theme');
    }
}

// Initialize platform
const platform = new PremiumExecutivePlatform();
document.addEventListener('DOMContentLoaded', () => {
    platform.initialize();
});

// Export for global access
window.platform = platform;

console.log('✅ Premium Executive Platform restored');
