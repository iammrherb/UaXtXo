/**
 * Enhanced Zero Trust Executive Dashboard
 * With advanced cost controls and improved UI/UX
 */

class EnhancedZeroTrustDashboard {
    constructor() {
        this.selectedVendors = [];
        this.vendorDatabase = window.ComprehensiveVendorDatabase || {};
        
        // Enhanced configuration with advanced controls
        this.config = {
            // Basic Settings
            deviceCount: 500,
            locationCount: 1,
            analysisPeriod: 3,
            companySize: 'small',
            
            // Advanced Cost Controls
            fteCost: 100000,
            breachCost: 4350000,
            downtimeCostPerHour: 5000,
            compliancePenaltyRisk: 100000,
            
            // Hidden Cost Multipliers
            trainingEfficiency: 1.0,  // 1.0 = standard, 0.5 = highly efficient, 2.0 = challenging
            integrationComplexity: 1.0,
            maintenanceEfficiency: 1.0,
            
            // Risk Adjustments
            securityRiskTolerance: 'medium',  // low, medium, high
            breachProbability: 0.1,  // 10% annual probability
            
            // Operational Factors
            existingInfrastructure: 'none',  // none, partial, substantial
            cloudReadiness: 'medium',
            staffSkillLevel: 'medium',
            
            // Industry & Compliance
            industry: null,
            complianceRequirements: [],
            cyberInsuranceDiscount: 0  // % discount for better security
        };
        
        // Dynamic Portnox pricing
        this.portnoxPricing = 3.50;
        
        // UI State
        this.settingsCollapsed = true;
        this.activeTab = 'executive-summary';
        
        this.init();
    }
    
    init() {
        console.log('🚀 Initializing Enhanced Zero Trust Dashboard');
        this.setupEnhancedUI();
        this.bindEnhancedEvents();
        this.updateVendorGrid();
    }
    
    setupEnhancedUI() {
        const app = document.getElementById('app-container') || document.body;
        app.innerHTML = `
            <div class="zt-dashboard-enhanced">
                <!-- Premium Header -->
                <header class="zt-header-premium">
                    <div class="header-content">
                        <div class="brand-section">
                            <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="brand-logo">
                            <div class="brand-text">
                                <h1>Zero Trust Intelligence Platform</h1>
                                <p>Enterprise NAC TCO Analysis & Strategic Planning Suite</p>
                            </div>
                        </div>
                        <div class="header-actions">
                            <button class="action-btn calculate" onclick="ztDashboard.calculate()">
                                <i class="fas fa-calculator"></i>
                                <span>Calculate TCO</span>
                            </button>
                            <button class="action-btn export" onclick="ztDashboard.showExportOptions()">
                                <i class="fas fa-download"></i>
                                <span>Export</span>
                            </button>
                            <button class="action-btn demo" onclick="ztDashboard.scheduleDemo()">
                                <i class="fas fa-video"></i>
                                <span>Live Demo</span>
                            </button>
                        </div>
                    </div>
                </header>
                
                <!-- Collapsible Configuration Panel -->
                <div class="config-panel-wrapper">
                    <div class="config-toggle" onclick="ztDashboard.toggleSettings()">
                        <i class="fas fa-cog"></i>
                        <span>Configuration Settings</span>
                        <i class="fas fa-chevron-${this.settingsCollapsed ? 'down' : 'up'} toggle-icon"></i>
                    </div>
                    
                    <div class="config-panel ${this.settingsCollapsed ? 'collapsed' : ''}">
                        <!-- Basic Settings -->
                        <div class="config-section basic">
                            <h3><i class="fas fa-sliders-h"></i> Basic Configuration</h3>
                            <div class="config-grid">
                                <div class="config-item">
                                    <label>
                                        Device Count
                                        <span class="help-icon" title="Total number of devices to be managed by the NAC solution">
                                            <i class="fas fa-question-circle"></i>
                                        </span>
                                    </label>
                                    <input type="number" id="zt-devices" value="500" min="50" max="100000">
                                    <span class="field-desc">Affects licensing costs linearly</span>
                                </div>
                                
                                <div class="config-item">
                                    <label>
                                        Locations
                                        <span class="help-icon" title="Number of physical sites requiring NAC deployment">
                                            <i class="fas fa-question-circle"></i>
                                        </span>
                                    </label>
                                    <input type="number" id="zt-locations" value="1" min="1" max="1000">
                                    <span class="field-desc">Impacts infrastructure & deployment costs</span>
                                </div>
                                
                                <div class="config-item">
                                    <label>
                                        Analysis Period
                                        <span class="help-icon" title="Time horizon for TCO/ROI calculations">
                                            <i class="fas fa-question-circle"></i>
                                        </span>
                                    </label>
                                    <select id="zt-period">
                                        <option value="1">1 Year</option>
                                        <option value="2">2 Years</option>
                                        <option value="3" selected>3 Years</option>
                                        <option value="5">5 Years</option>
                                    </select>
                                    <span class="field-desc">Longer periods show full ROI impact</span>
                                </div>
                                
                                <div class="config-item">
                                    <label>
                                        Company Size
                                        <span class="help-icon" title="Organization size affects complexity and support needs">
                                            <i class="fas fa-question-circle"></i>
                                        </span>
                                    </label>
                                    <select id="zt-company-size">
                                        <option value="startup">Startup (1-50)</option>
                                        <option value="small" selected>Small (51-250)</option>
                                        <option value="medium">Medium (251-1000)</option>
                                        <option value="large">Large (1001-5000)</option>
                                        <option value="enterprise">Enterprise (5000+)</option>
                                    </select>
                                    <span class="field-desc">Affects complexity multipliers</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Advanced Cost Controls -->
                        <div class="config-section advanced">
                            <h3><i class="fas fa-coins"></i> Advanced Cost Controls</h3>
                            <div class="config-grid">
                                <div class="config-item">
                                    <label>
                                        FTE Annual Cost
                                        <span class="help-icon" title="Fully loaded cost per IT staff member per year">
                                            <i class="fas fa-question-circle"></i>
                                        </span>
                                    </label>
                                    <input type="number" id="zt-fte-cost" value="100000" min="50000" max="300000">
                                    <span class="field-desc">Multiplied by FTE requirements for each vendor</span>
                                </div>
                                
                                <div class="config-item">
                                    <label>
                                        Average Breach Cost
                                        <span class="help-icon" title="Estimated cost of a security breach for your organization">
                                            <i class="fas fa-question-circle"></i>
                                        </span>
                                    </label>
                                    <input type="number" id="zt-breach-cost" value="4350000" min="100000" max="50000000">
                                    <span class="field-desc">Used for risk-adjusted calculations</span>
                                </div>
                                
                                <div class="config-item">
                                    <label>
                                        Downtime Cost/Hour
                                        <span class="help-icon" title="Business impact cost per hour of system downtime">
                                            <i class="fas fa-question-circle"></i>
                                        </span>
                                    </label>
                                    <input type="number" id="zt-downtime-cost" value="5000" min="1000" max="100000">
                                    <span class="field-desc">Factors into reliability comparisons</span>
                                </div>
                                
                                <div class="config-item">
                                    <label>
                                        Compliance Penalty Risk
                                        <span class="help-icon" title="Potential annual compliance violation penalties">
                                            <i class="fas fa-question-circle"></i>
                                        </span>
                                    </label>
                                    <input type="number" id="zt-compliance-penalty" value="100000" min="10000" max="10000000">
                                    <span class="field-desc">Weighted by vendor compliance scores</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Operational Factors -->
                        <div class="config-section operational">
                            <h3><i class="fas fa-cogs"></i> Operational Factors</h3>
                            <div class="config-grid">
                                <div class="config-item">
                                    <label>
                                        Training Efficiency
                                        <span class="help-icon" title="How quickly your team adopts new technologies">
                                            <i class="fas fa-question-circle"></i>
                                        </span>
                                    </label>
                                    <select id="zt-training-efficiency">
                                        <option value="0.5">Highly Efficient (-50% time)</option>
                                        <option value="1.0" selected>Standard</option>
                                        <option value="1.5">Below Average (+50% time)</option>
                                        <option value="2.0">Challenging (+100% time)</option>
                                    </select>
                                    <span class="field-desc">Adjusts training cost estimates</span>
                                </div>
                                
                                <div class="config-item">
                                    <label>
                                        Integration Complexity
                                        <span class="help-icon" title="Complexity of your existing IT environment">
                                            <i class="fas fa-question-circle"></i>
                                        </span>
                                    </label>
                                    <select id="zt-integration-complexity">
                                        <option value="0.7">Simple Environment (-30%)</option>
                                        <option value="1.0" selected>Average Complexity</option>
                                        <option value="1.5">Complex (+50%)</option>
                                        <option value="2.0">Highly Complex (+100%)</option>
                                    </select>
                                    <span class="field-desc">Modifies integration costs</span>
                                </div>
                                
                                <div class="config-item">
                                    <label>
                                        Existing Infrastructure
                                        <span class="help-icon" title="Reusable infrastructure reduces costs">
                                            <i class="fas fa-question-circle"></i>
                                        </span>
                                    </label>
                                    <select id="zt-existing-infra">
                                        <option value="none" selected>None (Greenfield)</option>
                                        <option value="partial">Partial (30% reusable)</option>
                                        <option value="substantial">Substantial (60% reusable)</option>
                                    </select>
                                    <span class="field-desc">Reduces infrastructure requirements</span>
                                </div>
                                
                                <div class="config-item">
                                    <label>
                                        Cyber Insurance Discount
                                        <span class="help-icon" title="Insurance premium reduction for better security">
                                            <i class="fas fa-question-circle"></i>
                                        </span>
                                    </label>
                                    <input type="range" id="zt-insurance-discount" min="0" max="30" value="0">
                                    <span class="slider-value">0%</span>
                                    <span class="field-desc">Based on security posture improvement</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Portnox Dynamic Pricing -->
                <div class="portnox-pricing-section">
                    <div class="pricing-header">
                        <h3><i class="fas fa-tag"></i> Portnox Dynamic Pricing</h3>
                        <p>Adjust pricing to match your negotiated rate</p>
                    </div>
                    <div class="pricing-control">
                        <label>Price per Device/Month: <span id="portnox-price-display">$3.50</span></label>
                        <input type="range" id="portnox-price-slider" 
                               min="1" max="8" step="0.25" value="3.50"
                               class="premium-slider">
                        <div class="slider-labels">
                            <span>$1.00</span>
                            <span>$4.50</span>
                            <span>$8.00</span>
                        </div>
                        <p class="pricing-note">This directly updates all Portnox TCO calculations in real-time</p>
                    </div>
                </div>
                
                <!-- Enhanced Vendor Selection -->
                <div class="vendor-selection-section">
                    <div class="section-header">
                        <h2>Select Vendors for Comparison</h2>
                        <p>Choose up to 8 vendors to analyze. Hover over any vendor for detailed cost breakdown.</p>
                    </div>
                    <div id="vendor-grid" class="enhanced-vendor-grid">
                        <!-- Vendor cards will be rendered here -->
                    </div>
                </div>
                
                <!-- Results Section -->
                <div id="results-section" class="results-container" style="display: none;">
                    <!-- Premium Tab Navigation -->
                    <div class="premium-tabs">
                        <button class="premium-tab active" data-tab="executive-summary">
                            <i class="fas fa-chart-line"></i>
                            <span>Executive Summary</span>
                        </button>
                        <button class="premium-tab" data-tab="financial-analysis">
                            <i class="fas fa-dollar-sign"></i>
                            <span>Financial Analysis</span>
                        </button>
                        <button class="premium-tab" data-tab="risk-security">
                            <i class="fas fa-shield-alt"></i>
                            <span>Risk & Security</span>
                        </button>
                        <button class="premium-tab" data-tab="compliance-matrix">
                            <i class="fas fa-clipboard-check"></i>
                            <span>Compliance</span>
                        </button>
                        <button class="premium-tab" data-tab="feature-comparison">
                            <i class="fas fa-th"></i>
                            <span>Features</span>
                        </button>
                        <button class="premium-tab" data-tab="hidden-costs">
                            <i class="fas fa-eye-slash"></i>
                            <span>Hidden Costs</span>
                        </button>
                        <button class="premium-tab" data-tab="recommendations">
                            <i class="fas fa-lightbulb"></i>
                            <span>Insights</span>
                        </button>
                    </div>
                    
                    <!-- Tab Content Area -->
                    <div id="tab-content" class="premium-tab-content">
                        <!-- Dynamic content -->
                    </div>
                </div>
            </div>
        `;
    }
    
    bindEnhancedEvents() {
        // Basic configuration
        document.getElementById('zt-devices').addEventListener('change', () => this.updateConfig());
        document.getElementById('zt-locations').addEventListener('change', () => this.updateConfig());
        document.getElementById('zt-period').addEventListener('change', () => this.updateConfig());
        document.getElementById('zt-company-size').addEventListener('change', () => this.updateConfig());
        
        // Advanced cost controls
        document.getElementById('zt-fte-cost').addEventListener('change', () => this.updateConfig());
        document.getElementById('zt-breach-cost').addEventListener('change', () => this.updateConfig());
        document.getElementById('zt-downtime-cost').addEventListener('change', () => this.updateConfig());
        document.getElementById('zt-compliance-penalty').addEventListener('change', () => this.updateConfig());
        
        // Operational factors
        document.getElementById('zt-training-efficiency').addEventListener('change', () => this.updateConfig());
        document.getElementById('zt-integration-complexity').addEventListener('change', () => this.updateConfig());
        document.getElementById('zt-existing-infra').addEventListener('change', () => this.updateConfig());
        
        // Insurance discount slider
        const insuranceSlider = document.getElementById('zt-insurance-discount');
        insuranceSlider.addEventListener('input', (e) => {
            e.target.nextElementSibling.textContent = e.target.value + '%';
            this.updateConfig();
        });
        
        // Portnox pricing slider
        const portnoxSlider = document.getElementById('portnox-price-slider');
        portnoxSlider.addEventListener('input', (e) => {
            this.portnoxPricing = parseFloat(e.target.value);
            document.getElementById('portnox-price-display').textContent = `$${this.portnoxPricing.toFixed(2)}`;
            
            if (this.vendorDatabase.portnox) {
                this.vendorDatabase.portnox.pricing.perDevice.monthly = this.portnoxPricing;
                this.vendorDatabase.portnox.pricing.perDevice.annual = this.portnoxPricing * 12;
            }
            
            if (this.selectedVendors.length > 0) {
                this.calculate();
            }
        });
        
        // Tab navigation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.premium-tab')) {
                const tab = e.target.closest('.premium-tab');
                this.switchTab(tab.dataset.tab);
            }
        });
    }
    
    toggleSettings() {
        this.settingsCollapsed = !this.settingsCollapsed;
        const panel = document.querySelector('.config-panel');
        const icon = document.querySelector('.toggle-icon');
        
        panel.classList.toggle('collapsed');
        icon.className = `fas fa-chevron-${this.settingsCollapsed ? 'down' : 'up'} toggle-icon`;
    }
    
    updateConfig() {
        this.config = {
            deviceCount: parseInt(document.getElementById('zt-devices').value),
            locationCount: parseInt(document.getElementById('zt-locations').value),
            analysisPeriod: parseInt(document.getElementById('zt-period').value),
            companySize: document.getElementById('zt-company-size').value,
            fteCost: parseInt(document.getElementById('zt-fte-cost').value),
            breachCost: parseInt(document.getElementById('zt-breach-cost').value),
            downtimeCostPerHour: parseInt(document.getElementById('zt-downtime-cost').value),
            compliancePenaltyRisk: parseInt(document.getElementById('zt-compliance-penalty').value),
            trainingEfficiency: parseFloat(document.getElementById('zt-training-efficiency').value),
            integrationComplexity: parseFloat(document.getElementById('zt-integration-complexity').value),
            existingInfrastructure: document.getElementById('zt-existing-infra').value,
            cyberInsuranceDiscount: parseInt(document.getElementById('zt-insurance-discount').value) / 100
        };
        
        if (this.selectedVendors.length > 0) {
            this.calculate();
        }
    }
    
    updateVendorGrid() {
        const grid = document.getElementById('vendor-grid');
        const vendors = Object.entries(this.vendorDatabase);
        
        grid.innerHTML = vendors.map(([key, vendor]) => `
            <div class="enhanced-vendor-card ${this.selectedVendors.includes(key) ? 'selected' : ''} ${key === 'portnox' ? 'portnox-card' : ''}" 
                 data-vendor="${key}">
                <div class="vendor-header">
                    <div class="vendor-title">
                        <h4>${vendor.name}</h4>
                        <span class="vendor-badge ${vendor.type.toLowerCase().replace(/\s+/g, '-')}">${vendor.type}</span>
                    </div>
                    ${key === 'portnox' ? '<span class="recommended-badge">RECOMMENDED</span>' : ''}
                </div>
                
                <div class="vendor-metrics">
                    <div class="metric">
                        <i class="fas fa-dollar-sign"></i>
                        <div>
                            <strong>$${vendor.pricing.perDevice.monthly.toFixed(2)}</strong>
                            <span>per device/month</span>
                        </div>
                    </div>
                    <div class="metric">
                        <i class="fas fa-rocket"></i>
                        <div>
                            <strong>${vendor.metrics.deploymentDays} days</strong>
                            <span>deployment</span>
                        </div>
                    </div>
                    <div class="metric">
                        <i class="fas fa-user-tie"></i>
                        <div>
                            <strong>${vendor.metrics.fteRequired} FTE</strong>
                            <span>required</span>
                        </div>
                    </div>
                </div>
                
                <div class="vendor-scores">
                    <div class="score-item">
                        <div class="score-label">Security</div>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${vendor.metrics.securityScore}%"></div>
                        </div>
                        <span class="score-value">${vendor.metrics.securityScore}</span>
                    </div>
                    <div class="score-item">
                        <div class="score-label">Automation</div>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${vendor.metrics.automationLevel}%"></div>
                        </div>
                        <span class="score-value">${vendor.metrics.automationLevel}</span>
                    </div>
                    <div class="score-item">
                        <div class="score-label">Zero Trust</div>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${vendor.metrics.zeroTrustScore}%"></div>
                        </div>
                        <span class="score-value">${vendor.metrics.zeroTrustScore}</span>
                    </div>
                </div>
                
                <div class="vendor-cost-preview">
                    <h5>Cost Breakdown (Annual)</h5>
                    <div class="cost-items">
                        <div class="cost-item">
                            <span>Licensing:</span>
                            <strong>$${((vendor.pricing.perDevice.annual * 500) / 1000).toFixed(0)}K</strong>
                        </div>
                        <div class="cost-item">
                            <span>Implementation:</span>
                            <strong>$${(vendor.pricing.implementation.base / 1000).toFixed(0)}K</strong>
                        </div>
                        <div class="cost-item">
                            <span>Hidden Costs:</span>
                            <strong>$${(Object.values(vendor.hiddenCosts).reduce((a, b) => a + b, 0) / 1000).toFixed(0)}K</strong>
                        </div>
                    </div>
                </div>
                
                <button class="select-vendor-btn ${this.selectedVendors.includes(key) ? 'selected' : ''}" 
                        onclick="ztDashboard.toggleVendor('${key}')">
                    ${this.selectedVendors.includes(key) ? 
                        '<i class="fas fa-check-circle"></i> Selected' : 
                        '<i class="fas fa-plus-circle"></i> Select for Comparison'}
                </button>
                
                <div class="vendor-details-hover">
                    <h4>${vendor.name} - Detailed Costs</h4>
                    <div class="detail-section">
                        <h5>Implementation Costs</h5>
                        <p>Base: $${vendor.pricing.implementation.base.toLocaleString()}</p>
                        <p>Per Device: $${vendor.pricing.implementation.perDevice}</p>
                        <p>Complexity: ${vendor.pricing.implementation.complexity}</p>
                    </div>
                    <div class="detail-section">
                        <h5>Hidden Costs</h5>
                        ${Object.entries(vendor.hiddenCosts).map(([key, value]) => 
                            `<p>${key.charAt(0).toUpperCase() + key.slice(1)}: $${value.toLocaleString()}</p>`
                        ).join('')}
                    </div>
                    <div class="detail-section">
                        <h5>Risk Factors</h5>
                        ${Object.entries(vendor.riskFactors).map(([key, value]) => 
                            `<p>${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}%</p>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    renderExecutiveSummary(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            container.innerHTML = '<p class="no-data">Please select vendors and calculate TCO first.</p>';
            return;
        }
        
        const vendors = Object.entries(this.calculationResults);
        const bestTCO = vendors.reduce((min, [key, result]) => 
            result.tco.total < min.tco.total ? {key, ...result} : min, 
            {tco: {total: Infinity}}
        );
        
        container.innerHTML = `
            <div class="executive-summary-enhanced">
                <div class="summary-header">
                    <h2>Executive Summary</h2>
                    <p>Strategic analysis for ${this.config.deviceCount.toLocaleString()} devices across ${this.config.locationCount} location${this.config.locationCount > 1 ? 's' : ''}</p>
                </div>
                
                <!-- Winner Spotlight -->
                <div class="winner-spotlight">
                    <div class="spotlight-content">
                        <div class="winner-badge">
                            <i class="fas fa-trophy"></i>
                            <span>BEST VALUE</span>
                        </div>
                        <h3>${this.vendorDatabase[bestTCO.key]?.name}</h3>
                        <div class="winner-metrics">
                            <div class="metric">
                                <span>Total TCO</span>
                                <strong>$${(bestTCO.tco.total / 1000).toFixed(0)}K</strong>
                            </div>
                            <div class="metric">
                                <span>Monthly Cost</span>
                                <strong>$${(bestTCO.tco.monthly / 1000).toFixed(1)}K</strong>
                            </div>
                            <div class="metric">
                                <span>Per Device</span>
                                <strong>$${(bestTCO.tco.perDevice).toFixed(0)}</strong>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Key Insights Grid -->
                <div class="insights-grid">
                    <div class="insight-card cost-savings">
                        <i class="fas fa-piggy-bank"></i>
                        <h4>Maximum Savings</h4>
                        <p class="insight-value">$${this.calculateMaxSavings()}K</p>
                        <p class="insight-desc">Potential ${this.config.analysisPeriod}-year savings</p>
                    </div>
                    
                    <div class="insight-card deployment">
                        <i class="fas fa-clock"></i>
                        <h4>Fastest Deployment</h4>
                        <p class="insight-value">${this.findFastestDeploymentDays()} days</p>
                        <p class="insight-desc">${this.findFastestDeployment()}</p>
                    </div>
                    
                    <div class="insight-card security">
                        <i class="fas fa-shield-alt"></i>
                        <h4>Highest Security</h4>
                        <p class="insight-value">${this.findHighestSecurityScore()}/100</p>
                        <p class="insight-desc">${this.findMostSecure()}</p>
                    </div>
                    
                    <div class="insight-card efficiency">
                        <i class="fas fa-users-cog"></i>
                        <h4>Lowest FTE Need</h4>
                        <p class="insight-value">${this.findLowestFTE()} FTE</p>
                        <p class="insight-desc">${this.findMostEfficient()}</p>
                    </div>
                </div>
                
                <!-- Comprehensive Comparison Charts -->
                <div class="chart-grid">
                    <div class="chart-container">
                        <h3>Total Cost of Ownership</h3>
                        <div id="tco-comparison-chart" style="height: 400px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Cost Breakdown by Component</h3>
                        <div id="cost-breakdown-chart" style="height: 400px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Year-over-Year Cost Projection</h3>
                        <div id="yearly-projection-chart" style="height: 400px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Vendor Score Comparison</h3>
                        <div id="vendor-scores-chart" style="height: 400px;"></div>
                    </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="quick-actions">
                    <button class="action-btn primary" onclick="ztDashboard.switchTab('financial-analysis')">
                        <i class="fas fa-chart-line"></i> View Detailed Financial Analysis
                    </button>
                    <button class="action-btn secondary" onclick="ztDashboard.showExportOptions()">
                        <i class="fas fa-file-export"></i> Export Executive Report
                    </button>
                </div>
            </div>
        `;
        
        // Render all charts
        this.renderAllCharts();
    }
    
    renderAllCharts() {
        setTimeout(() => {
            this.renderTCOComparisonChart();
            this.renderCostBreakdownChart();
            this.renderYearlyProjectionChart();
            this.renderVendorScoresChart();
        }, 100);
    }
    
    renderTCOComparisonChart() {
        const chartData = Object.entries(this.calculationResults).map(([key, result]) => ({
            name: this.vendorDatabase[key]?.name || key,
            y: result.tco.total,
            color: key === 'portnox' ? '#28a745' : null
        }));
        
        Highcharts.chart('tco-comparison-chart', {
            chart: { 
                type: 'column',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: { 
                type: 'category',
                labels: {
                    style: { fontSize: '12px' }
                }
            },
            yAxis: {
                title: { text: 'Total Cost ($)' },
                labels: {
                    formatter: function() {
                        return '$' + (this.value / 1000) + 'K';
                    }
                }
            },
            colors: ['#2E7EE5', '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444'],
            plotOptions: {
                column: {
                    borderRadius: 8,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + (this.y / 1000).toFixed(0) + 'K';
                        },
                        style: { fontSize: '11px' }
                    }
                }
            },
            series: [{
                name: 'TCO',
                data: chartData
            }],
            credits: { enabled: false }
        });
    }
    
    renderCostBreakdownChart() {
        const series = [];
        const categories = [];
        
        // Prepare stacked data
        const components = ['license', 'implementation', 'support', 'infrastructure', 'fte', 'hidden'];
        const componentNames = {
            license: 'Licensing',
            implementation: 'Implementation',
            support: 'Support',
            infrastructure: 'Infrastructure',
            fte: 'FTE Costs',
            hidden: 'Hidden Costs'
        };
        
        Object.entries(this.calculationResults).forEach(([key, result]) => {
            categories.push(this.vendorDatabase[key]?.name || key);
        });
        
        components.forEach(component => {
            series.push({
                name: componentNames[component],
                data: Object.entries(this.calculationResults).map(([key, result]) => 
                    result.tco.breakdown[component] || 0
                )
            });
        });
        
        Highcharts.chart('cost-breakdown-chart', {
            chart: {
                type: 'bar',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: categories
            },
            yAxis: {
                title: { text: 'Cost ($)' },
                labels: {
                    formatter: function() {
                        return '$' + (this.value / 1000) + 'K';
                    }
                }
            },
            plotOptions: {
                bar: {
                    stacking: 'normal',
                    borderRadius: 4,
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: series,
            credits: { enabled: false }
        });
    }
    
    renderYearlyProjectionChart() {
        const series = Object.entries(this.calculationResults).map(([key, result]) => {
            const data = [
                result.tco.byYear.year1,
                result.tco.byYear.year1 + result.tco.byYear.year2,
                result.tco.byYear.year1 + result.tco.byYear.year2 + result.tco.byYear.year3
            ];
            
            if (this.config.analysisPeriod >= 5 && result.tco.byYear.year5) {
                data.push(
                    data[2] + result.tco.byYear.year3,
                    data[2] + result.tco.byYear.year3 + result.tco.byYear.year5
                );
            }
            
            return {
                name: this.vendorDatabase[key]?.name || key,
                data: data,
                marker: { enabled: true }
            };
        });
        
        const categories = ['Year 1', 'Year 2', 'Year 3'];
        if (this.config.analysisPeriod >= 5) {
            categories.push('Year 4', 'Year 5');
        }
        
        Highcharts.chart('yearly-projection-chart', {
            chart: {
                type: 'line',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: categories
            },
            yAxis: {
                title: { text: 'Cumulative Cost ($)' },
                labels: {
                    formatter: function() {
                        return '$' + (this.value / 1000) + 'K';
                    }
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: series,
            credits: { enabled: false }
        });
    }
    
    renderVendorScoresChart() {
        const vendors = Object.keys(this.calculationResults);
        const metrics = ['securityScore', 'automationLevel', 'zeroTrustScore', 'scalabilityScore'];
        
        const series = metrics.map(metric => ({
            name: metric.replace(/([A-Z])/g, ' $1').replace('Score', '').trim(),
            data: vendors.map(key => this.vendorDatabase[key]?.metrics[metric] || 0)
        }));
        
        Highcharts.chart('vendor-scores-chart', {
            chart: {
                type: 'radar',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: vendors.map(key => this.vendorDatabase[key]?.name || key),
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
    
    // Additional helper methods
    calculateMaxSavings() {
        const tcos = Object.values(this.calculationResults).map(r => r.tco.total);
        const min = Math.min(...tcos);
        const max = Math.max(...tcos);
        return ((max - min) / 1000).toFixed(0);
    }
    
    findLowestFTE() {
        return Math.min(...Object.values(this.calculationResults)
            .map(r => r.operational.fteRequired));
    }
    
    findMostEfficient() {
        const mostEfficient = Object.entries(this.calculationResults)
            .reduce((min, [key, result]) => 
                result.operational.fteRequired < min.fte ?
                {key, fte: result.operational.fteRequired} : min,
                {fte: Infinity}
            );
        return this.vendorDatabase[mostEfficient.key]?.name || 'Unknown';
    }
    
    toggleVendor(vendorKey) {
        const index = this.selectedVendors.indexOf(vendorKey);
        if (index > -1) {
            this.selectedVendors.splice(index, 1);
        } else {
            if (this.selectedVendors.length < 8) {
                this.selectedVendors.push(vendorKey);
            } else {
                this.showNotification('Maximum 8 vendors can be selected', 'warning');
                return;
            }
        }
        
        this.updateVendorGrid();
        
        const resultsSection = document.getElementById('results-section');
        if (this.selectedVendors.length > 0) {
            this.calculate();
            resultsSection.style.display = 'block';
        } else {
            resultsSection.style.display = 'none';
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                           type === 'warning' ? 'exclamation-triangle' : 
                           'info-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    calculate() {
        if (this.selectedVendors.length === 0) {
            this.showNotification('Please select at least one vendor', 'warning');
            return;
        }
        
        console.log('📊 Calculating with advanced cost controls...');
        
        this.calculationResults = {};
        
        this.selectedVendors.forEach(vendorKey => {
            const vendor = this.vendorDatabase[vendorKey];
            if (!vendor) return;
            
            this.calculationResults[vendorKey] = this.calculateVendorTCO(vendor, vendorKey);
        });
        
        this.switchTab('executive-summary');
    }
    
    calculateVendorTCO(vendor, vendorKey) {
        const devices = this.config.deviceCount;
        const locations = this.config.locationCount;
        const years = this.config.analysisPeriod;
        
        // Apply advanced cost controls
        
        // License costs (unchanged by controls)
        const annualLicense = vendor.pricing.perDevice.annual * devices;
        const totalLicense = annualLicense * years;
        
        // Implementation costs (affected by complexity)
        const baseImplementation = vendor.pricing.implementation.base + 
                                  (vendor.pricing.implementation.perDevice * devices);
        const implementationCost = baseImplementation * this.config.integrationComplexity;
        
        // Support costs
        const annualSupport = vendor.pricing.support.annual * devices;
        const totalSupport = annualSupport * years;
        
        // Infrastructure costs (reduced by existing infrastructure)
        let infrastructureCost = 0;
        if (vendor.architecture !== 'SaaS') {
            const baseInfra = vendor.pricing.infrastructure.servers * locations +
                             vendor.pricing.infrastructure.loadBalancers +
                             vendor.pricing.infrastructure.database;
            
            const infraReduction = this.config.existingInfrastructure === 'partial' ? 0.3 :
                                  this.config.existingInfrastructure === 'substantial' ? 0.6 : 0;
            
            infrastructureCost = baseInfra * (1 - infraReduction);
        }
        
        // FTE costs (using configured FTE cost)
        const annualFTECost = vendor.metrics.fteRequired * this.config.fteCost;
        const totalFTECost = annualFTECost * years;
        
        // Hidden costs (affected by efficiency factors)
        const hiddenCosts = {
            training: vendor.hiddenCosts.training * this.config.trainingEfficiency,
            customization: vendor.hiddenCosts.customization,
            integration: vendor.hiddenCosts.integration * this.config.integrationComplexity,
            maintenance: vendor.hiddenCosts.maintenance * this.config.maintenanceEfficiency,
            upgrades: vendor.hiddenCosts.upgrades,
            downtime: vendor.hiddenCosts.downtime
        };
        const totalHiddenCosts = Object.values(hiddenCosts).reduce((a, b) => a + b, 0);
        
        // Total TCO
        const totalTCO = totalLicense + implementationCost + totalSupport + 
                        infrastructureCost + totalFTECost + totalHiddenCosts;
        
        // Risk-adjusted costs
        const breachRiskCost = (this.config.breachCost * (100 - vendor.metrics.securityScore) / 100) * 
                              this.config.breachProbability * years;
        
        const complianceRiskCost = (this.config.compliancePenaltyRisk * 
                                   (vendor.riskFactors.complianceRisk / 100)) * years;
        
        // Downtime costs
        const estimatedDowntimeHours = (100 - vendor.metrics.scalabilityScore) * 0.5; // hours per year
        const downtimeCost = estimatedDowntimeHours * this.config.downtimeCostPerHour * years;
        
        // Insurance savings (better security = lower premiums)
        const insuranceSavings = vendor.metrics.securityScore >= 90 ? 
            (this.config.cyberInsuranceDiscount * 50000 * years) : 0;
        
        // Adjusted total TCO
        const adjustedTCO = totalTCO + breachRiskCost + complianceRiskCost + downtimeCost - insuranceSavings;
        
        // Calculate ROI
        const avgCompetitorTCO = this.calculateAverageCompetitorTCO(vendorKey);
        const savings = avgCompetitorTCO - adjustedTCO;
        const roi = avgCompetitorTCO > 0 ? (savings / avgCompetitorTCO) * 100 : 0;
        const paybackMonths = savings > 0 ? (adjustedTCO / (savings / (years * 12))) : 999;
        
        return {
            tco: {
                total: adjustedTCO,
                monthly: adjustedTCO / (years * 12),
                perDevice: adjustedTCO / devices,
                perLocation: adjustedTCO / locations,
                
                breakdown: {
                    license: totalLicense,
                    implementation: implementationCost,
                    support: totalSupport,
                    infrastructure: infrastructureCost,
                    fte: totalFTECost,
                    hidden: totalHiddenCosts
                },
                
                adjustments: {
                    breachRisk: breachRiskCost,
                    complianceRisk: complianceRiskCost,
                    downtime: downtimeCost,
                    insuranceSavings: insuranceSavings
                },
                
                byYear: {
                    year1: annualLicense + implementationCost + annualSupport + infrastructureCost + 
                           annualFTECost + (totalHiddenCosts / years),
                    year2: annualLicense + annualSupport + annualFTECost + (totalHiddenCosts / years),
                    year3: annualLicense + annualSupport + annualFTECost + (totalHiddenCosts / years),
                    year5: years >= 5 ? (annualLicense + annualSupport + annualFTECost + 
                           (totalHiddenCosts / years)) : null
                }
            },
            
            roi: {
                percentage: roi,
                savings: savings,
                paybackMonths: paybackMonths,
                annualSavings: savings / years
            },
            
            risk: {
                breachRiskCost: breachRiskCost,
                complianceRiskCost: complianceRiskCost,
                downtimeCost: downtimeCost,
                totalRiskCost: breachRiskCost + complianceRiskCost + downtimeCost,
                riskScore: vendor.riskFactors.operationalRisk
            },
            
            operational: {
                fteRequired: vendor.metrics.fteRequired,
                deploymentDays: vendor.metrics.deploymentDays,
                automationLevel: vendor.metrics.automationLevel,
                scalabilityScore: vendor.metrics.scalabilityScore
            },
            
            vendor: vendor
        };
    }
    
    // Existing helper methods remain the same...
    calculateAverageCompetitorTCO(excludeVendor) {
        const competitors = this.selectedVendors.filter(v => v !== excludeVendor);
        if (competitors.length === 0) return 0;
        
        const totalTCO = competitors.reduce((sum, vendorKey) => {
            const result = this.calculationResults[vendorKey];
            return sum + (result ? result.tco.total : 0);
        }, 0);
        
        return totalTCO / competitors.length;
    }
    
    switchTab(tabName) {
        document.querySelectorAll('.premium-tab').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        
        const content = document.getElementById('tab-content');
        this.activeTab = tabName;
        
        switch(tabName) {
            case 'executive-summary':
                this.renderExecutiveSummary(content);
                break;
            case 'financial-analysis':
                this.renderFinancialAnalysis(content);
                break;
            case 'risk-security':
                this.renderRiskSecurity(content);
                break;
            case 'compliance-matrix':
                this.renderComplianceMatrix(content);
                break;
            case 'feature-comparison':
                this.renderFeatureComparison(content);
                break;
            case 'hidden-costs':
                this.renderHiddenCosts(content);
                break;
            case 'recommendations':
                this.renderRecommendations(content);
                break;
        }
    }
    
    findFastestDeployment() {
        const fastest = Object.entries(this.calculationResults)
            .reduce((min, [key, result]) => 
                result.operational.deploymentDays < min.days ? 
                {key, days: result.operational.deploymentDays} : min,
                {days: Infinity}
            );
        return this.vendorDatabase[fastest.key]?.name || 'Unknown';
    }
    
    findFastestDeploymentDays() {
        return Math.min(...Object.values(this.calculationResults)
            .map(r => r.operational.deploymentDays));
    }
    
    findMostSecure() {
        const mostSecure = Object.entries(this.calculationResults)
            .reduce((max, [key, result]) => 
                result.vendor.metrics.securityScore > max.score ?
                {key, score: result.vendor.metrics.securityScore} : max,
                {score: 0}
            );
        return this.vendorDatabase[mostSecure.key]?.name || 'Unknown';
    }
    
    findHighestSecurityScore() {
        return Math.max(...Object.values(this.calculationResults)
            .map(r => r.vendor.metrics.securityScore));
    }
    
    showExportOptions() {
        // Export implementation
        this.showNotification('Export options coming soon!', 'info');
    }
    
    scheduleDemo() {
        window.open('https://portnox.com/demo', '_blank');
    }
}

// Replace the global instance
window.ztDashboard = new EnhancedZeroTrustDashboard();

console.log('✅ Enhanced Zero Trust Dashboard initialized');
