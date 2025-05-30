/**
 * Ultimate Visual Platform
 * Complete implementation with Risk & Security, Compliance, and Operations
 */

class UltimateVisualPlatform {
    constructor() {
        // Portnox selected by default + up to 3 others
        this.selectedVendors = ['portnox'];
        this.maxAdditionalVendors = 3;
        this.vendorDatabase = window.ComprehensiveVendorDatabase || {};
        
        // Configuration with sensible defaults
        this.config = {
            // Basic Settings
            deviceCount: 500,
            locationCount: 1,
            
            // Financial Settings
            fteCost: 100000,
            breachCost: 4350000,
            downtimeCostPerHour: 5000,
            compliancePenaltyRisk: 250000,
            cyberInsurancePremium: 50000,
            
            // Operational Factors
            trainingEfficiency: 1.0,
            integrationComplexity: 1.0,
            maintenanceEfficiency: 1.0,
            existingInfrastructure: 'none',
            
            // Risk Profile
            annualBreachProbability: 0.23,
            complianceAuditFrequency: 2,
            acceptableDowntimeHours: 4,
            
            // Industry & Compliance
            industry: 'technology',
            complianceFrameworks: ['sox', 'gdpr', 'iso27001'],
            
            // Analysis Settings
            includeOpportunityLoss: true,
            includeProductivityGains: true,
            includeInsuranceSavings: true
        };
        
        // Dynamic Portnox pricing
        this.portnoxPricing = 3.50;
        
        // State
        this.settingsModalOpen = false;
        this.activeTab = 'financial-overview';
        this.calculationResults = null;
        
        this.init();
    }
    
    init() {
        console.log('🚀 Initializing Ultimate Visual Platform');
        this.setupUI();
        this.bindEvents();
        this.updateVendorSelection();
        this.calculate();
    }
    
    setupUI() {
        const app = document.getElementById('app-container') || document.body;
        app.innerHTML = `
            <div class="ultimate-visual-platform">
                <!-- Premium Header -->
                <header class="premium-header">
                    <div class="header-container">
                        <div class="brand-identity">
                            <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="portnox-logo">
                            <div class="platform-title">
                                <h1>Executive Decision Platform</h1>
                                <p>Zero Trust NAC Investment Analysis & Risk Assessment</p>
                            </div>
                        </div>
                        <div class="header-controls">
                            <button class="control-btn settings" onclick="platform.openSettings()">
                                <i class="fas fa-cog"></i>
                                <span>Settings</span>
                            </button>
                            <button class="control-btn calculate" onclick="platform.calculate()">
                                <i class="fas fa-calculator"></i>
                                <span>Recalculate</span>
                            </button>
                            <button class="control-btn export" onclick="platform.exportAnalysis()">
                                <i class="fas fa-download"></i>
                                <span>Export</span>
                            </button>
                        </div>
                    </div>
                </header>
                
                <!-- Vendor Selection Bar -->
                <div class="vendor-selection-bar">
                    <div class="selection-container">
                        <div class="selection-info">
                            <h3>Vendor Comparison</h3>
                            <p>Portnox + select up to ${this.maxAdditionalVendors} competitors</p>
                        </div>
                        <div class="selected-vendors" id="selected-vendors-display">
                            <!-- Selected vendors will be shown here -->
                        </div>
                        <button class="add-vendor-btn" onclick="platform.openVendorSelector()">
                            <i class="fas fa-plus-circle"></i>
                            Add Competitor
                        </button>
                    </div>
                </div>
                
                <!-- Analysis Tabs -->
                <div class="analysis-container">
                    <nav class="premium-nav">
                        <button class="nav-tab active" data-tab="financial-overview">
                            <i class="fas fa-chart-line"></i>
                            <span>Financial Overview</span>
                            <span class="tab-subtitle">TCO & ROI Analysis</span>
                        </button>
                        <button class="nav-tab" data-tab="risk-assessment">
                            <i class="fas fa-shield-virus"></i>
                            <span>Risk & Security</span>
                            <span class="tab-subtitle">Breach & Incident Impact</span>
                        </button>
                        <button class="nav-tab" data-tab="compliance-analysis">
                            <i class="fas fa-clipboard-check"></i>
                            <span>Compliance</span>
                            <span class="tab-subtitle">Regulatory Alignment</span>
                        </button>
                        <button class="nav-tab" data-tab="operational-impact">
                            <i class="fas fa-cogs"></i>
                            <span>Operational</span>
                            <span class="tab-subtitle">Efficiency & Timeline</span>
                        </button>
                    </nav>
                    
                    <div class="analysis-content" id="analysis-content">
                        <!-- Dynamic content -->
                    </div>
                </div>
                
                <!-- Settings Modal -->
                <div class="settings-modal" id="settings-modal" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>Configuration Settings</h2>
                            <button class="close-modal" onclick="platform.closeSettings()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="settings-grid">
                                <div class="settings-section">
                                    <h3><i class="fas fa-building"></i> Organization Profile</h3>
                                    <div class="setting-group">
                                        <label>Number of Devices</label>
                                        <input type="number" id="devices-input" value="500" min="100" max="10000">
                                    </div>
                                    <div class="setting-group">
                                        <label>Number of Locations</label>
                                        <input type="number" id="locations-input" value="1" min="1" max="100">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn-primary" onclick="platform.applySettings()">Apply Settings</button>
                        </div>
                    </div>
                </div>
                
                <!-- Vendor Selector Modal -->
                <div class="vendor-selector-modal" id="vendor-selector-modal" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>Select Competitors to Compare</h2>
                            <button class="close-modal" onclick="platform.closeVendorSelector()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="vendor-selector-grid" id="vendor-selector-grid">
                                <!-- Vendor options will be rendered here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-tab')) {
                const tab = e.target.closest('.nav-tab');
                this.switchTab(tab.dataset.tab);
            }
        });
    }
    
    openSettings() {
        document.getElementById('settings-modal').style.display = 'flex';
        this.settingsModalOpen = true;
    }
    
    closeSettings() {
        document.getElementById('settings-modal').style.display = 'none';
        this.settingsModalOpen = false;
    }
    
    applySettings() {
        this.config.deviceCount = parseInt(document.getElementById('devices-input').value);
        this.config.locationCount = parseInt(document.getElementById('locations-input').value);
        this.closeSettings();
        this.calculate();
    }
    
    updateVendorSelection() {
        const display = document.getElementById('selected-vendors-display');
        
        display.innerHTML = this.selectedVendors.map(vendorKey => {
            const vendor = this.vendorDatabase[vendorKey];
            const isPortnox = vendorKey === 'portnox';
            
            return `
                <div class="selected-vendor-chip ${isPortnox ? 'portnox-chip' : ''}">
                    <img src="./img/vendors/${vendorKey}-logo.png" alt="${vendor?.name}" onerror="this.style.display='none'">
                    <span>${vendor?.name || vendorKey}</span>
                    ${!isPortnox ? `<button class="remove-vendor" onclick="platform.removeVendor('${vendorKey}')"><i class="fas fa-times"></i></button>` : ''}
                </div>
            `;
        }).join('');
    }
    
    openVendorSelector() {
        const modal = document.getElementById('vendor-selector-modal');
        const grid = document.getElementById('vendor-selector-grid');
        
        const availableVendors = Object.entries(this.vendorDatabase)
            .filter(([key]) => !this.selectedVendors.includes(key));
        
        grid.innerHTML = availableVendors.map(([key, vendor]) => `
            <div class="vendor-option" data-vendor="${key}" onclick="platform.toggleVendor('${key}')">
                <h4>${vendor.name}</h4>
                <div class="vendor-metrics">
                    <span>$${vendor.pricing.perDevice.monthly.toFixed(2)}/device</span>
                    <span>Security: ${vendor.metrics.securityScore}/100</span>
                </div>
            </div>
        `).join('');
        
        modal.style.display = 'flex';
    }
    
    closeVendorSelector() {
        document.getElementById('vendor-selector-modal').style.display = 'none';
    }
    
    toggleVendor(vendorKey) {
        if (this.selectedVendors.length < this.maxAdditionalVendors + 1) {
            this.selectedVendors.push(vendorKey);
            this.updateVendorSelection();
            this.closeVendorSelector();
            this.calculate();
        }
    }
    
    removeVendor(vendorKey) {
        if (vendorKey !== 'portnox') {
            this.selectedVendors = this.selectedVendors.filter(v => v !== vendorKey);
            this.updateVendorSelection();
            this.calculate();
        }
    }
    
    calculate() {
        console.log('📊 Calculating comprehensive TCO/ROI analysis...');
        
        this.calculationResults = {};
        
        this.selectedVendors.forEach(vendorKey => {
            const vendor = this.vendorDatabase[vendorKey];
            if (!vendor) return;
            
            this.calculationResults[vendorKey] = this.calculateComprehensiveTCO(vendor, vendorKey);
        });
        
        this.switchTab(this.activeTab);
    }
    
    calculateComprehensiveTCO(vendor, vendorKey) {
        const devices = this.config.deviceCount;
        const locations = this.config.locationCount;
        
        const results = {};
        
        [1, 3].forEach(years => {
            const annualLicense = vendor.pricing.perDevice.annual * devices;
            const totalLicense = annualLicense * years;
            
            const baseImplementation = vendor.pricing.implementation.base + 
                                      (vendor.pricing.implementation.perDevice * devices);
            const implementationCost = baseImplementation * this.config.integrationComplexity;
            
            const annualSupport = vendor.pricing.support.annual * devices;
            const totalSupport = annualSupport * years;
            
            let infrastructureCost = 0;
            if (vendor.architecture !== 'SaaS') {
                infrastructureCost = vendor.pricing.infrastructure.servers * locations;
            }
            
            const totalDirectCosts = totalLicense + implementationCost + totalSupport + infrastructureCost;
            
            const breachRiskCost = this.config.breachCost * 
                                  (this.config.annualBreachProbability * years) * 
                                  ((100 - vendor.metrics.securityScore) / 100);
            
            const totalTCO = totalDirectCosts + breachRiskCost;
            
            results[`year${years}`] = {
                tco: {
                    total: totalTCO,
                    perDevice: totalTCO / devices,
                    breakdown: {
                        software: totalLicense,
                        implementation: implementationCost,
                        support: totalSupport,
                        hardware: infrastructureCost
                    }
                }
            };
        });
        
        results.vendor = vendor;
        results.scores = {
            security: vendor.metrics.securityScore,
            automation: vendor.metrics.automationLevel,
            zeroTrust: vendor.metrics.zeroTrustScore
        };
        
        return results;
    }
    
    switchTab(tabName) {
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        this.activeTab = tabName;
        const content = document.getElementById('analysis-content');
        
        switch(tabName) {
            case 'financial-overview':
                this.renderFinancialOverview(content);
                break;
            case 'risk-assessment':
                this.renderRiskAssessment(content);
                break;
            case 'compliance-analysis':
                this.renderComplianceAnalysis(content);
                break;
            case 'operational-impact':
                this.renderOperationalImpact(content);
                break;
        }
    }
    
    renderFinancialOverview(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            container.innerHTML = '<div class="no-data">Calculating financial analysis...</div>';
            return;
        }
        
        const portnoxResult = this.calculationResults.portnox;
        
        container.innerHTML = `
            <div class="financial-overview">
                <div class="executive-summary-card">
                    <h2>Executive Financial Summary</h2>
                    <div class="summary-grid">
                        <div class="summary-item">
                            <h3>1-Year TCO</h3>
                            <div class="value">$${(portnoxResult.year1.tco.total / 1000).toFixed(0)}K</div>
                        </div>
                        <div class="summary-item">
                            <h3>3-Year TCO</h3>
                            <div class="value">$${(portnoxResult.year3.tco.total / 1000).toFixed(0)}K</div>
                        </div>
                    </div>
                </div>
                
                <div class="chart-section">
                    <h3>Total Cost of Ownership Comparison</h3>
                    <div id="tco-chart" style="height: 400px;"></div>
                </div>
            </div>
        `;
        
        setTimeout(() => this.renderTCOChart(), 100);
    }
    
    renderRiskAssessment(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            container.innerHTML = '<div class="no-data">Calculating risk analysis...</div>';
            return;
        }
        
        const portnoxResult = this.calculationResults.portnox;
        
        container.innerHTML = `
            <div class="risk-assessment">
                <div class="risk-executive-summary">
                    <h2>Executive Risk & Security Impact Analysis</h2>
                    <p class="subtitle">Comprehensive breach, incident, and business continuity assessment</p>
                    
                    <div class="risk-summary-grid">
                        <div class="risk-metric critical">
                            <div class="metric-icon">
                                <i class="fas fa-shield-virus"></i>
                            </div>
                            <div class="metric-content">
                                <h3>Risk Reduction with Portnox</h3>
                                <div class="metric-value">${this.calculateRiskReduction()}%</div>
                                <p>Lower breach probability vs. competitors</p>
                            </div>
                        </div>
                        
                        <div class="risk-metric financial">
                            <div class="metric-icon">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div class="metric-content">
                                <h3>Avoided Breach Costs</h3>
                                <div class="metric-value">$${(this.calculateAvoidedBreachCosts() / 1000000).toFixed(1)}M</div>
                                <p>3-year risk-adjusted savings</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="chart-section">
                    <h3>Security Posture Analysis</h3>
                    <div id="security-radar-chart" style="height: 400px;"></div>
                </div>
                
                <div class="breach-scenarios">
                    <h4>Breach Scenario Analysis</h4>
                    <div class="scenario-grid">
                        ${this.generateBreachScenarios()}
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => this.renderSecurityRadarChart(), 100);
    }
    
    renderComplianceAnalysis(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            container.innerHTML = '<div class="no-data">Calculating compliance analysis...</div>';
            return;
        }
        
        container.innerHTML = `
            <div class="compliance-analysis">
                <div class="compliance-executive-summary">
                    <h2>Compliance & Regulatory Analysis</h2>
                    <p class="subtitle">Framework alignment and audit readiness assessment</p>
                    
                    <div class="compliance-summary-grid">
                        <div class="compliance-metric">
                            <div class="metric-icon">
                                <i class="fas fa-certificate"></i>
                            </div>
                            <div class="metric-content">
                                <h3>Overall Compliance Score</h3>
                                <div class="metric-value">${this.calculateOverallComplianceScore()}%</div>
                                <p>Regulatory alignment</p>
                            </div>
                        </div>
                        
                        <div class="compliance-metric">
                            <div class="metric-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="metric-content">
                                <h3>Audit Time Reduction</h3>
                                <div class="metric-value">${this.calculateAuditTimeReduction()}%</div>
                                <p>Faster audit completion</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="chart-section">
                    <h3>Compliance Framework Coverage</h3>
                    <div id="compliance-framework-chart" style="height: 400px;"></div>
                </div>
            </div>
        `;
        
        setTimeout(() => this.renderComplianceFrameworkChart(), 100);
    }
    
    renderOperationalImpact(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            container.innerHTML = '<div class="no-data">Calculating operational analysis...</div>';
            return;
        }
        
        const portnoxResult = this.calculationResults.portnox;
        
        container.innerHTML = `
            <div class="operational-impact">
                <div class="operational-executive-summary">
                    <h2>Operational Efficiency Analysis</h2>
                    <p class="subtitle">Timeline, resource requirements, and productivity impact</p>
                    
                    <div class="operational-summary-grid">
                        <div class="operational-metric">
                            <div class="metric-icon">
                                <i class="fas fa-tachometer-alt"></i>
                            </div>
                            <div class="metric-content">
                                <h3>Efficiency Gain</h3>
                                <div class="metric-value">${this.calculateEfficiencyGain()}%</div>
                                <p>Productivity improvement</p>
                            </div>
                        </div>
                        
                        <div class="operational-metric">
                            <div class="metric-icon">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <div class="metric-content">
                                <h3>Time to Value</h3>
                                <div class="metric-value">${portnoxResult.vendor.metrics.deploymentDays}</div>
                                <p>Days to deploy</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="chart-section">
                    <h3>Automation & Efficiency Gains</h3>
                    <div id="automation-impact-chart" style="height: 400px;"></div>
                </div>
            </div>
        `;
        
        setTimeout(() => this.renderAutomationImpactChart(), 100);
    }
    
    // Risk calculation methods
    calculateRiskReduction() {
        const portnoxScore = this.calculationResults.portnox?.vendor.metrics.securityScore || 0;
        const avgCompetitorScore = Object.entries(this.calculationResults)
            .filter(([k]) => k !== 'portnox')
            .reduce((sum, [, result]) => sum + result.vendor.metrics.securityScore, 0) / 
            Math.max(1, this.selectedVendors.length - 1);
        
        return Math.round(((portnoxScore - avgCompetitorScore) / Math.max(avgCompetitorScore, 1)) * 100);
    }
    
    calculateAvoidedBreachCosts() {
        const portnox = this.calculationResults.portnox;
        if (!portnox) return 0;
        
        const breachProbabilityReduction = (100 - portnox.vendor.metrics.securityScore) / 100;
        const avoidedCost = this.config.breachCost * this.config.annualBreachProbability * 
                           (1 - breachProbabilityReduction) * 3;
        return avoidedCost;
    }
    
    generateBreachScenarios() {
        const scenarios = [
            {
                type: 'Ransomware Attack',
                icon: 'fas fa-lock',
                withoutNAC: '$2.5M average loss',
                withPortnox: '$125K limited impact',
                reduction: '95%'
            },
            {
                type: 'Data Exfiltration',
                icon: 'fas fa-database',
                withoutNAC: '$4.35M avg breach cost',
                withPortnox: '$435K contained breach',
                reduction: '90%'
            }
        ];
        
        return scenarios.map(scenario => `
            <div class="scenario-card">
                <div class="scenario-header">
                    <i class="${scenario.icon}"></i>
                    <h5>${scenario.type}</h5>
                </div>
                <div class="scenario-impact">
                    <div class="impact-row without">
                        <span class="label">Without NAC:</span>
                        <span class="value danger">${scenario.withoutNAC}</span>
                    </div>
                    <div class="impact-row with">
                        <span class="label">With Portnox:</span>
                        <span class="value success">${scenario.withPortnox}</span>
                    </div>
                    <div class="reduction-badge">
                        <i class="fas fa-shield-alt"></i>
                        ${scenario.reduction} Risk Reduction
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Compliance methods
    calculateOverallComplianceScore() {
        const portnox = this.calculationResults.portnox?.vendor;
        return Math.round(portnox?.compliance.overallScore || 85);
    }
    
    calculateAuditTimeReduction() {
        const automationLevel = this.calculationResults.portnox?.vendor.metrics.automationLevel || 0;
        return Math.round(automationLevel * 0.8);
    }
    
    // Operational methods
    calculateEfficiencyGain() {
        const portnoxAutomation = this.calculationResults.portnox?.vendor.metrics.automationLevel || 0;
        const currentEfficiency = 60;
        return Math.round(((portnoxAutomation - currentEfficiency) / currentEfficiency) * 100);
    }
    
    // Chart rendering methods
    renderTCOChart() {
        const data = Object.entries(this.calculationResults).map(([key, result]) => ({
            name: this.vendorDatabase[key]?.name || key,
            y: result.year3.tco.total,
            color: key === 'portnox' ? '#28a745' : null
        }));
        
        Highcharts.chart('tco-chart', {
            chart: { type: 'column' },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: {
                title: { text: 'Total Cost ($)' },
                labels: {
                    formatter: function() {
                        return '$' + (this.value / 1000) + 'K';
                    }
                }
            },
            series: [{
                name: '3-Year TCO',
                data: data
            }],
            credits: { enabled: false }
        });
    }
    
    renderSecurityRadarChart() {
        const categories = ['Zero Trust', 'Threat Detection', 'Automation', 'Compliance', 'Scalability'];
        
        const series = Object.entries(this.calculationResults).map(([vendorKey, result]) => {
            const vendor = result.vendor;
            return {
                name: vendor.name,
                data: [
                    vendor.metrics.zeroTrustScore,
                    vendor.metrics.securityScore,
                    vendor.metrics.automationLevel,
                    vendor.compliance.overallScore,
                    vendor.metrics.scalabilityScore
                ],
                pointPlacement: 'on'
            };
        });
        
        Highcharts.chart('security-radar-chart', {
            chart: { polar: true, type: 'line' },
            title: { text: null },
            pane: { size: '80%' },
            xAxis: {
                categories: categories,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max: 100
            },
            series: series,
            credits: { enabled: false }
        });
    }
    
    renderComplianceFrameworkChart() {
        const frameworks = ['SOX', 'GDPR', 'HIPAA', 'PCI DSS', 'ISO 27001'];
        
        const series = Object.entries(this.calculationResults).map(([vendorKey, result]) => {
            const vendor = result.vendor;
            return {
                name: vendor.name,
                data: [
                    vendor.compliance.sox * 10,
                    vendor.compliance.gdpr * 10,
                    vendor.compliance.hipaa * 10,
                    vendor.compliance.pciDss * 10,
                    vendor.compliance.iso27001 * 10
                ]
            };
        });
        
        Highcharts.chart('compliance-framework-chart', {
            chart: { type: 'bar' },
            title: { text: null },
            xAxis: { categories: frameworks },
            yAxis: {
                title: { text: 'Compliance Score' },
                max: 100
            },
            series: series,
            credits: { enabled: false }
        });
    }
    
    renderAutomationImpactChart() {
        const processes = ['Device Onboarding', 'Policy Management', 'Incident Response', 'Compliance Reporting'];
        const manualTime = [120, 180, 240, 480];
        const automatedTime = [5, 10, 15, 30];
        
        Highcharts.chart('automation-impact-chart', {
            chart: { type: 'column' },
            title: { text: null },
            xAxis: { categories: processes },
            yAxis: {
                title: { text: 'Time Required (minutes)' },
                type: 'logarithmic'
            },
            series: [{
                name: 'Manual Process',
                data: manualTime,
                color: '#EF4444'
            }, {
                name: 'Automated with Portnox',
                data: automatedTime,
                color: '#10B981'
            }],
            credits: { enabled: false }
        });
    }
    
    exportAnalysis() {
        console.log('Exporting analysis...');
    }
}

// Initialize platform
window.platform = new UltimateVisualPlatform();
console.log('✅ Ultimate Visual Platform initialized');
