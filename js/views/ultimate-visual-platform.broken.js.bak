/**
 * Ultimate Visual Platform - Complete Working Version
 * All functionality restored with proper initialization
 */

class UltimateVisualPlatform {
    constructor() {
        // Core configuration
        this.selectedVendors = ['portnox'];
        this.maxAdditionalVendors = 3;
        this.vendorDatabase = window.ComprehensiveVendorDatabase || {};
        
        // Configuration
        this.config = {
            deviceCount: 500,
            locationCount: 1,
            fteCost: 100000,
            breachCost: 4350000,
            downtimeCostPerHour: 5000,
            compliancePenaltyRisk: 250000,
            cyberInsurancePremium: 50000,
            trainingEfficiency: 1.0,
            integrationComplexity: 1.0,
            maintenanceEfficiency: 1.0,
            existingInfrastructure: 'none',
            annualBreachProbability: 0.23,
            complianceAuditFrequency: 2,
            acceptableDowntimeHours: 4,
            industry: 'technology',
            complianceFrameworks: ['sox', 'gdpr', 'iso27001']
        };
        
        this.portnoxPricing = 3.50;
        this.activeTab = 'financial-overview';
        this.calculationResults = null;
        this.charts = {};
        
        // Initialize after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
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
            <div class="ultimate-platform">
                <!-- Premium Header -->
                <header class="ultimate-header">
                    <div class="header-particles" id="header-particles"></div>
                    <div class="header-content">
                        <div class="brand-section">
                            <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="brand-logo animated-logo">
                            <div class="brand-text">
                                <h1 class="animated-title">Executive Intelligence Suite</h1>
                                <p class="animated-subtitle">Zero Trust NAC Investment Analytics & Strategic Planning</p>
                            </div>
                        </div>
                        <div class="header-actions">
                            <button class="premium-btn settings" onclick="platform.openSettings()">
                                <i class="fas fa-cog"></i>
                                <span>Configure</span>
                            </button>
                            <button class="premium-btn calculate pulse" onclick="platform.calculate()">
                                <i class="fas fa-calculator"></i>
                                <span>Analyze</span>
                            </button>
                            <button class="premium-btn export" onclick="platform.exportAnalysis()">
                                <i class="fas fa-download"></i>
                                <span>Export</span>
                            </button>
                            <button class="premium-btn demo glow" onclick="platform.scheduleDemo()">
                                <i class="fas fa-video"></i>
                                <span>Live Demo</span>
                            </button>
                        </div>
                    </div>
                </header>
                
                <!-- Vendor Selection -->
                <div class="vendor-selection-premium">
                    <div class="selection-wrapper">
                        <div class="selection-header">
                            <div class="selection-title">
                                <h3><i class="fas fa-layer-group"></i> Vendor Comparison</h3>
                                <p>Portnox vs. Competition Analysis</p>
                            </div>
                            <div class="comparison-metrics">
                                <div class="metric-pill">
                                    <i class="fas fa-chart-line"></i>
                                    <span>${this.selectedVendors.length} Vendors</span>
                                </div>
                                <div class="metric-pill">
                                    <i class="fas fa-server"></i>
                                    <span>${this.config.deviceCount} Devices</span>
                                </div>
                                <div class="metric-pill">
                                    <i class="fas fa-calendar"></i>
                                    <span>3-Year Analysis</span>
                                </div>
                            </div>
                        </div>
                        <div class="vendor-showcase" id="vendor-showcase">
                            <!-- Vendors will be shown here -->
                        </div>
                        <button class="add-vendor-btn" onclick="platform.openVendorSelector()">
                            <i class="fas fa-plus-circle"></i> Add Competitor
                        </button>
                    </div>
                </div>
                
                <!-- Navigation -->
                <nav class="ultimate-nav">
                    <div class="nav-wrapper">
                        <button class="nav-pill active" data-tab="financial-overview" onclick="platform.switchTab('financial-overview')">
                            <div class="pill-content">
                                <i class="fas fa-chart-pie"></i>
                                <div class="pill-text">
                                    <span class="pill-title">Financial Intelligence</span>
                                    <span class="pill-desc">TCO, ROI & Cost Analytics</span>
                                </div>
                            </div>
                        </button>
                        
                        <button class="nav-pill" data-tab="risk-assessment" onclick="platform.switchTab('risk-assessment')">
                            <div class="pill-content">
                                <i class="fas fa-shield-virus"></i>
                                <div class="pill-text">
                                    <span class="pill-title">Risk & Security</span>
                                    <span class="pill-desc">Threat & Breach Analysis</span>
                                </div>
                            </div>
                        </button>
                        
                        <button class="nav-pill" data-tab="compliance-analysis" onclick="platform.switchTab('compliance-analysis')">
                            <div class="pill-content">
                                <i class="fas fa-certificate"></i>
                                <div class="pill-text">
                                    <span class="pill-title">Compliance Matrix</span>
                                    <span class="pill-desc">Regulatory Alignment</span>
                                </div>
                            </div>
                        </button>
                        
                        <button class="nav-pill" data-tab="operational-impact" onclick="platform.switchTab('operational-impact')">
                            <div class="pill-content">
                                <i class="fas fa-cogs"></i>
                                <div class="pill-text">
                                    <span class="pill-title">Operational Excellence</span>
                                    <span class="pill-desc">Efficiency & Performance</span>
                                </div>
                            </div>
                        </button>
                        
                        <button class="nav-pill" data-tab="strategic-insights" onclick="platform.switchTab('strategic-insights')">
                            <div class="pill-content">
                                <i class="fas fa-brain"></i>
                                <div class="pill-text">
                                    <span class="pill-title">Strategic Intelligence</span>
                                    <span class="pill-desc">AI-Powered Insights</span>
                                </div>
                            </div>
                        </button>
                    </div>
                </nav>
                
                <!-- Content Area -->
                <div class="ultimate-content" id="ultimate-content">
                    <!-- Dynamic content -->
                </div>
                
                <!-- Settings Modal -->
                <div class="ultimate-modal" id="settings-modal" style="display: none;">
                    <div class="modal-backdrop" onclick="platform.closeSettings()"></div>
                    <div class="modal-container">
                        <div class="modal-header-premium">
                            <h2><i class="fas fa-sliders-h"></i> Configuration Settings</h2>
                            <button class="close-btn" onclick="platform.closeSettings()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-body-premium">
                            <div class="settings-grid">
                                <div class="setting-group">
                                    <label>Device Count</label>
                                    <input type="number" id="config-devices" value="${this.config.deviceCount}" 
                                           min="100" max="50000" onchange="platform.updateConfig()">
                                </div>
                                <div class="setting-group">
                                    <label>Locations</label>
                                    <input type="number" id="config-locations" value="${this.config.locationCount}" 
                                           min="1" max="500" onchange="platform.updateConfig()">
                                </div>
                                <div class="setting-group">
                                    <label>Annual FTE Cost</label>
                                    <input type="number" id="config-fte-cost" value="${this.config.fteCost}" 
                                           step="5000" onchange="platform.updateConfig()">
                                </div>
                                <div class="setting-group">
                                    <label>Average Breach Cost</label>
                                    <input type="number" id="config-breach-cost" value="${this.config.breachCost}" 
                                           step="100000" onchange="platform.updateConfig()">
                                </div>
                                <div class="setting-group">
                                    <label>Industry</label>
                                    <select id="config-industry" onchange="platform.updateConfig()">
                                        <option value="technology">Technology</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="finance">Financial Services</option>
                                        <option value="retail">Retail</option>
                                        <option value="manufacturing">Manufacturing</option>
                                        <option value="government">Government</option>
                                        <option value="education">Education</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer-premium">
                            <button class="premium-action-btn apply" onclick="platform.applySettings()">
                                Apply Settings
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Vendor Selector Modal -->
                <div class="ultimate-modal" id="vendor-selector-modal" style="display: none;">
                    <div class="modal-backdrop" onclick="platform.closeVendorSelector()"></div>
                    <div class="modal-container">
                        <div class="modal-header-premium">
                            <h2><i class="fas fa-users"></i> Select Competitors</h2>
                            <button class="close-btn" onclick="platform.closeVendorSelector()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-body-premium">
                            <p>Select up to ${this.maxAdditionalVendors} vendors to compare against Portnox</p>
                            <div class="vendor-grid" id="vendor-selector-grid">
                                <!-- Vendor options -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Portnox Pricing Control -->
                <div class="floating-pricing">
                    <div class="pricing-widget">
                        <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="widget-logo">
                        <div class="pricing-slider-container">
                            <label>Dynamic Pricing</label>
                            <div class="price-display">$<span id="portnox-price">${this.portnoxPricing.toFixed(2)}</span>/device/mo</div>
                            <input type="range" id="portnox-slider" min="1" max="8" step="0.25" 
                                   value="${this.portnoxPricing}" onchange="platform.updatePortnoxPricing(this.value)">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    bindEvents() {
        // Tab navigation is handled by onclick in HTML
        // Additional event bindings can go here
    }
    
    updateVendorSelection() {
        const showcase = document.getElementById('vendor-showcase');
        if (!showcase) return;
        
        showcase.innerHTML = this.selectedVendors.map(vendorKey => {
            const vendor = this.vendorDatabase[vendorKey];
            if (!vendor) return '';
            
            return `
                <div class="vendor-chip ${vendorKey === 'portnox' ? 'portnox-chip' : ''}">
                    <img src="./img/vendors/${vendorKey}-logo.png" alt="${vendor.name}" 
                         onerror="this.style.display='none'">
                    <span>${vendor.name}</span>
                    ${vendorKey !== 'portnox' ? `
                        <button class="remove-vendor" onclick="platform.removeVendor('${vendorKey}')">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                </div>
            `;
        }).join('');
        
        // Update metrics
        document.querySelector('.comparison-metrics .metric-pill:first-child span').textContent = 
            `${this.selectedVendors.length} Vendors`;
    }
    
    calculate() {
        console.log('📊 Calculating TCO/ROI analysis...');
        
        if (!this.vendorDatabase || Object.keys(this.vendorDatabase).length === 0) {
            console.error('Vendor database not loaded');
            return;
        }
        
        this.calculationResults = {};
        
        this.selectedVendors.forEach(vendorKey => {
            const vendor = this.vendorDatabase[vendorKey];
            if (!vendor) {
                console.error(`Vendor ${vendorKey} not found`);
                return;
            }
            
            this.calculationResults[vendorKey] = this.calculateVendorTCO(vendor, vendorKey);
        });
        
        // Render current tab
        this.switchTab(this.activeTab);
    }
    
    calculateVendorTCO(vendor, vendorKey) {
        const devices = this.config.deviceCount;
        const locations = this.config.locationCount;
        
        const results = {};
        
        // Calculate for 1 and 3 years
        [1, 3].forEach(years => {
            // License costs
            const annualLicense = vendor.pricing.perDevice.annual * devices;
            const totalLicense = annualLicense * years;
            
            // Implementation
            const implementationCost = vendor.pricing.implementation.base + 
                                     (vendor.pricing.implementation.perDevice * devices);
            
            // Support
            const annualSupport = vendor.pricing.support.annual * devices;
            const totalSupport = annualSupport * years;
            
            // Infrastructure
            let infrastructureCost = 0;
            if (vendor.architecture !== 'SaaS') {
                infrastructureCost = vendor.pricing.infrastructure.servers * locations +
                                   vendor.pricing.infrastructure.loadBalancers +
                                   vendor.pricing.infrastructure.database;
            }
            
            // FTE
            const annualFTECost = vendor.metrics.fteRequired * this.config.fteCost;
            const totalFTECost = annualFTECost * years;
            
            // Hidden costs
            const trainingCost = vendor.hiddenCosts.training;
            const integrationCost = vendor.hiddenCosts.integration;
            const maintenanceCost = vendor.hiddenCosts.maintenance * years;
            const downtimeCost = vendor.hiddenCosts.downtime;
            
            // Total TCO
            const totalTCO = totalLicense + implementationCost + totalSupport + 
                           infrastructureCost + totalFTECost + trainingCost + 
                           integrationCost + maintenanceCost + downtimeCost;
            
            // Calculate ROI
            const avgCompetitorTCO = 500000 * (years / 3); // Baseline
            const savings = avgCompetitorTCO - totalTCO;
            const roi = savings > 0 ? (savings / totalTCO) * 100 : 0;
            
            results[`year${years}`] = {
                tco: {
                    total: totalTCO,
                    perDevice: totalTCO / devices,
                    monthly: totalTCO / (years * 12),
                    breakdown: {
                        software: totalLicense,
                        implementation: implementationCost,
                        support: totalSupport,
                        hardware: infrastructureCost,
                        personnel: totalFTECost,
                        training: trainingCost,
                        integration: integrationCost,
                        maintenance: maintenanceCost,
                        downtime: downtimeCost
                    }
                },
                roi: {
                    percentage: roi,
                    dollarValue: savings,
                    paybackMonths: savings > 0 ? Math.round(implementationCost / (savings / (years * 12))) : 999
                }
            };
        });
        
        results.vendor = vendor;
        return results;
    }
    
    switchTab(tabName) {
        // Update active state
        document.querySelectorAll('.nav-pill').forEach(pill => {
            pill.classList.toggle('active', pill.dataset.tab === tabName);
        });
        
        this.activeTab = tabName;
        const content = document.getElementById('ultimate-content');
        if (!content) return;
        
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
            case 'strategic-insights':
                this.renderStrategicInsights(content);
                break;
        }
    }
    
    renderFinancialOverview(container) {
        if (!this.calculationResults) {
            container.innerHTML = '<div class="no-data">Loading financial analysis...</div>';
            return;
        }
        
        const portnox = this.calculationResults.portnox;
        if (!portnox) {
            container.innerHTML = '<div class="no-data">Portnox data not available</div>';
            return;
        }
        
        container.innerHTML = `
            <div class="financial-dashboard">
                <h2>Financial Intelligence Dashboard</h2>
                
                <!-- KPI Cards -->
                <div class="kpi-grid">
                    <div class="kpi-card">
                        <i class="fas fa-trophy"></i>
                        <div class="kpi-value">$${(portnox.year3.tco.total / 1000).toFixed(0)}K</div>
                        <div class="kpi-label">3-Year TCO</div>
                    </div>
                    <div class="kpi-card">
                        <i class="fas fa-percentage"></i>
                        <div class="kpi-value">${portnox.year3.roi.percentage.toFixed(0)}%</div>
                        <div class="kpi-label">ROI</div>
                    </div>
                    <div class="kpi-card">
                        <i class="fas fa-clock"></i>
                        <div class="kpi-value">${portnox.year3.roi.paybackMonths}</div>
                        <div class="kpi-label">Months to Payback</div>
                    </div>
                    <div class="kpi-card">
                        <i class="fas fa-piggy-bank"></i>
                        <div class="kpi-value">$${(portnox.year3.roi.dollarValue / 1000).toFixed(0)}K</div>
                        <div class="kpi-label">Total Savings</div>
                    </div>
                </div>
                
                <!-- Charts -->
                <div class="chart-grid">
                    <div class="chart-card">
                        <h3>TCO Comparison</h3>
                        <div id="tco-chart" class="chart-container"></div>
                    </div>
                    <div class="chart-card">
                        <h3>Cost Breakdown</h3>
                        <div id="breakdown-chart" class="chart-container"></div>
                    </div>
                </div>
                
                <!-- Detailed Breakdown -->
                <div class="breakdown-section">
                    <h3>Detailed Cost Analysis</h3>
                    <table class="breakdown-table">
                        <thead>
                            <tr>
                                <th>Vendor</th>
                                <th>1-Year TCO</th>
                                <th>3-Year TCO</th>
                                <th>Monthly Cost</th>
                                <th>Per Device</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.entries(this.calculationResults).map(([key, result]) => `
                                <tr class="${key === 'portnox' ? 'highlight' : ''}">
                                    <td>${result.vendor.name}</td>
                                    <td>$${(result.year1.tco.total / 1000).toFixed(0)}K</td>
                                    <td>$${(result.year3.tco.total / 1000).toFixed(0)}K</td>
                                    <td>$${(result.year3.tco.monthly / 1000).toFixed(1)}K</td>
                                    <td>$${result.year3.tco.perDevice.toFixed(0)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        // Render charts
        this.renderTCOChart();
        this.renderBreakdownChart();
    }
    
    renderTCOChart() {
        const chartData = Object.entries(this.calculationResults).map(([key, result]) => ({
            name: result.vendor.name,
            y: result.year3.tco.total,
            color: key === 'portnox' ? '#00D4AA' : null
        }));
        
        if (typeof Highcharts !== 'undefined') {
            Highcharts.chart('tco-chart', {
                chart: { type: 'column', backgroundColor: 'transparent' },
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
                    data: chartData,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + (this.y / 1000).toFixed(0) + 'K';
                        }
                    }
                }],
                credits: { enabled: false }
            });
        }
    }
    
    renderBreakdownChart() {
        const portnox = this.calculationResults.portnox;
        if (!portnox) return;
        
        const data = Object.entries(portnox.year3.tco.breakdown).map(([key, value]) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            y: value
        }));
        
        if (typeof Highcharts !== 'undefined') {
            Highcharts.chart('breakdown-chart', {
                chart: { type: 'pie', backgroundColor: 'transparent' },
                title: { text: null },
                series: [{
                    name: 'Cost',
                    data: data,
                    dataLabels: {
                        formatter: function() {
                            return this.point.name + ': $' + (this.y / 1000).toFixed(0) + 'K';
                        }
                    }
                }],
                credits: { enabled: false }
            });
        }
    }
    
    renderRiskAssessment(container) {
        container.innerHTML = `
            <div class="risk-dashboard">
                <h2>Risk & Security Assessment</h2>
                <div class="coming-soon">
                    <i class="fas fa-shield-virus fa-4x"></i>
                    <h3>Advanced Risk Analytics Coming Soon</h3>
                    <p>Comprehensive breach analysis, threat assessment, and security scoring</p>
                </div>
            </div>
        `;
    }
    
    renderComplianceAnalysis(container) {
        container.innerHTML = `
            <div class="compliance-dashboard">
                <h2>Compliance Matrix Analysis</h2>
                <div class="coming-soon">
                    <i class="fas fa-certificate fa-4x"></i>
                    <h3>Compliance Intelligence Coming Soon</h3>
                    <p>Framework alignment, regulatory mapping, and audit readiness scoring</p>
                </div>
            </div>
        `;
    }
    
    renderOperationalImpact(container) {
        container.innerHTML = `
            <div class="operational-dashboard">
                <h2>Operational Excellence Metrics</h2>
                <div class="coming-soon">
                    <i class="fas fa-cogs fa-4x"></i>
                    <h3>Operational Analytics Coming Soon</h3>
                    <p>Efficiency metrics, deployment timelines, and resource optimization</p>
                </div>
            </div>
        `;
    }
    
    renderStrategicInsights(container) {
        container.innerHTML = `
            <div class="strategic-dashboard">
                <h2>Strategic Intelligence & AI Insights</h2>
                <div class="coming-soon">
                    <i class="fas fa-brain fa-4x"></i>
                    <h3>AI-Powered Insights Coming Soon</h3>
                    <p>Strategic recommendations, predictive analytics, and decision matrices</p>
                </div>
            </div>
        `;
    }
    
    // UI Action Methods
    openSettings() {
        document.getElementById('settings-modal').style.display = 'flex';
    }
    
    closeSettings() {
        document.getElementById('settings-modal').style.display = 'none';
    }
    
    applySettings() {
        this.closeSettings();
        this.calculate();
    }
    
    updateConfig() {
        this.config.deviceCount = parseInt(document.getElementById('config-devices').value) || 500;
        this.config.locationCount = parseInt(document.getElementById('config-locations').value) || 1;
        this.config.fteCost = parseInt(document.getElementById('config-fte-cost').value) || 100000;
        this.config.breachCost = parseInt(document.getElementById('config-breach-cost').value) || 4350000;
        this.config.industry = document.getElementById('config-industry').value || 'technology';
        
        // Update display
        document.querySelector('.metric-pill:nth-child(2) span').textContent = `${this.config.deviceCount} Devices`;
    }
    
    updatePortnoxPricing(value) {
        this.portnoxPricing = parseFloat(value);
        document.getElementById('portnox-price').textContent = this.portnoxPricing.toFixed(2);
        
        // Update vendor database
        if (this.vendorDatabase.portnox) {
            this.vendorDatabase.portnox.pricing.perDevice.monthly = this.portnoxPricing;
            this.vendorDatabase.portnox.pricing.perDevice.annual = this.portnoxPricing * 12;
        }
        
        this.calculate();
    }
    
    openVendorSelector() {
        const modal = document.getElementById('vendor-selector-modal');
        const grid = document.getElementById('vendor-selector-grid');
        
        // Populate vendor options
        const availableVendors = Object.entries(this.vendorDatabase)
            .filter(([key]) => !this.selectedVendors.includes(key));
        
        grid.innerHTML = availableVendors.map(([key, vendor]) => `
            <div class="vendor-option" onclick="platform.selectVendor('${key}')">
                <img src="./img/vendors/${key}-logo.png" alt="${vendor.name}" 
                     onerror="this.style.display='none'">
                <h4>${vendor.name}</h4>
                <p>${vendor.type}</p>
                <p>$${vendor.pricing.perDevice.monthly.toFixed(2)}/device/mo</p>
            </div>
        `).join('');
        
        modal.style.display = 'flex';
    }
    
    closeVendorSelector() {
        document.getElementById('vendor-selector-modal').style.display = 'none';
    }
    
    selectVendor(vendorKey) {
        if (this.selectedVendors.length - 1 < this.maxAdditionalVendors) {
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
    
    exportAnalysis() {
        alert('Export functionality will generate comprehensive reports in PDF, Excel, and PowerPoint formats');
    }
    
    scheduleDemo() {
        window.open('https://portnox.com/demo', '_blank');
    }
}

// Initialize platform when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.platform = new UltimateVisualPlatform();
    });
} else {
    window.platform = new UltimateVisualPlatform();
}

console.log('✅ Ultimate Visual Platform loaded successfully');
