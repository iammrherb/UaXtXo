/**
 * Executive Platform Module
 * Complete UI overhaul with modern design
 */

ModuleLoader.register('ExecutivePlatform', ['ConfigManager', 'EventSystem', 'VendorDataManager'], function(configManager, eventSystem, vendorDataManager) {
    
    class ExecutivePlatform {
        constructor() {
            this.configManager = configManager;
            this.eventSystem = eventSystem;
            this.vendorDataManager = vendorDataManager;
            
            // State
            this.selectedVendors = ['portnox'];
            this.maxVendors = 4;
            this.activeTab = 'executive-dashboard';
            this.portnoxPricing = 7.00;
            this.deviceCount = 2500;
            
            // Get vendor database
            this.vendorDatabase = window.ComprehensiveVendorDatabase || {};
            
            // Analysis modules
            this.modules = {};
            
            // Chart instances
            this.charts = {};
        }
        
        init() {
            console.log('🚀 Initializing Executive Platform...');
            
            // Initialize UI
            this.initializeUI();
            
            // Load analysis modules
            this.loadAnalysisModules();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initial calculation
            setTimeout(() => {
                this.calculate();
            }, 100);
        }
        
        initializeUI() {
            const container = document.getElementById('app') || document.body;
            
            container.innerHTML = `
                <div class="executive-platform">
                    <!-- Header -->
                    <header class="platform-header">
                        <div class="header-content">
                            <div class="brand-section">
                                <img src="img/vendors/portnox-logo.png" alt="Portnox" class="logo" 
                                     onerror="this.style.display='none'">
                                <div class="platform-info">
                                    <h1 class="platform-title">Executive Decision Platform</h1>
                                    <p class="platform-subtitle">Zero Trust NAC Investment Analysis & Risk Assessment</p>
                                </div>
                            </div>
                            
                            <div class="header-controls">
                                <select class="device-selector" id="device-selector">
                                    <option value="500">Small (500 devices)</option>
                                    <option value="2500" selected>Medium (2,500 devices)</option>
                                    <option value="5000">Large (5,000 devices)</option>
                                    <option value="10000">Enterprise (10,000 devices)</option>
                                    <option value="25000">Global (25,000 devices)</option>
                                </select>
                                
                                <button class="control-button" id="settings-btn">
                                    <i class="fas fa-cog"></i>
                                    <span>Settings</span>
                                </button>
                                
                                <button class="control-button" id="recalculate-btn">
                                    <i class="fas fa-calculator"></i>
                                    <span>Recalculate</span>
                                </button>
                                
                                <div class="export-menu">
                                    <button class="control-button primary">
                                        <i class="fas fa-download"></i>
                                        <span>Export</span>
                                    </button>
                                    <div class="export-dropdown">
                                        <div class="export-option" data-format="pdf">
                                            <i class="fas fa-file-pdf"></i>
                                            <span>Export to PDF</span>
                                        </div>
                                        <div class="export-option" data-format="excel">
                                            <i class="fas fa-file-excel"></i>
                                            <span>Export to Excel</span>
                                        </div>
                                        <div class="export-option" data-format="powerpoint">
                                            <i class="fas fa-file-powerpoint"></i>
                                            <span>Export to PowerPoint</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    
                    <!-- Tab Navigation -->
                    <nav class="tab-navigation">
                        <div class="tab-container">
                            <button class="tab-button active" data-tab="executive-dashboard">
                                <i class="fas fa-crown tab-icon"></i>
                                <span class="tab-label">Executive Dashboard</span>
                                <span class="tab-subtitle">Complete Analysis</span>
                            </button>
                            
                            <button class="tab-button" data-tab="vendor-selection">
                                <i class="fas fa-th-large tab-icon"></i>
                                <span class="tab-label">Vendor Selection</span>
                                <span class="tab-subtitle">Compare Solutions</span>
                            </button>
                            
                            <button class="tab-button" data-tab="financial-overview">
                                <i class="fas fa-chart-line tab-icon"></i>
                                <span class="tab-label">Financial Overview</span>
                                <span class="tab-subtitle">TCO & ROI Analysis</span>
                            </button>
                            
                            <button class="tab-button" data-tab="risk-security">
                                <i class="fas fa-shield-alt tab-icon"></i>
                                <span class="tab-label">Risk & Security</span>
                                <span class="tab-subtitle">Breach & Incident Impact</span>
                            </button>
                            
                            <button class="tab-button" data-tab="compliance">
                                <i class="fas fa-clipboard-check tab-icon"></i>
                                <span class="tab-label">Compliance</span>
                                <span class="tab-subtitle">Regulatory Alignment</span>
                            </button>
                            
                            <button class="tab-button" data-tab="operational">
                                <i class="fas fa-cogs tab-icon"></i>
                                <span class="tab-label">Operational</span>
                                <span class="tab-subtitle">Efficiency & Timeline</span>
                            </button>
                            
                            <button class="tab-button" data-tab="strategic-insights">
                                <i class="fas fa-lightbulb tab-icon"></i>
                                <span class="tab-label">Strategic Insights</span>
                                <span class="tab-subtitle">Recommendations</span>
                            </button>
                        </div>
                    </nav>
                    
                    <!-- Main Content -->
                    <main class="main-content" id="main-content">
                        <!-- Dynamic content loaded here -->
                    </main>
                    
                    <!-- Pricing Control Bar -->
                    <div class="pricing-control-bar">
                        <div class="pricing-control-content">
                            <div class="pricing-label-section">
                                <img src="img/vendors/portnox-logo.png" alt="Portnox" 
                                     onerror="this.style.display='none'">
                                <span>Portnox Pricing Adjustment</span>
                            </div>
                            
                            <div class="pricing-slider-section">
                                <div class="price-display">
                                    $<span id="price-value">7.00</span>/device/month
                                </div>
                                
                                <div class="slider-container">
                                    <input type="range" class="price-slider" id="price-slider"
                                           min="1" max="8" step="0.25" value="7">
                                    <div class="price-range-labels">
                                        <span>$1.00</span>
                                        <span>$8.00</span>
                                    </div>
                                </div>
                                
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">
                                    Portnox Price/Device: <strong style="color: var(--accent-primary);">
                                    $<span id="annual-price">84.00</span>/year</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        loadAnalysisModules() {
            // Load all analysis modules
            Promise.all([
                this.loadModule('RiskSecurityAnalysis'),
                this.loadModule('ComplianceAnalysis'),
                this.loadModule('OperationalImpact'),
                this.loadModule('StrategicInsights')
            ]).then(() => {
                console.log('✅ All analysis modules loaded');
            });
        }
        
        async loadModule(moduleName) {
            try {
                if (window[moduleName]) {
                    this.modules[moduleName] = window[moduleName];
                    return;
                }
                
                const module = await ModuleLoader.load(moduleName);
                this.modules[moduleName] = module;
            } catch (error) {
                console.warn(`Module ${moduleName} not available:`, error);
            }
        }
        
        setupEventListeners() {
            // Tab navigation
            document.addEventListener('click', (e) => {
                if (e.target.closest('.tab-button')) {
                    const tab = e.target.closest('.tab-button');
                    this.switchTab(tab.dataset.tab);
                }
                
                // Export options
                if (e.target.closest('.export-option')) {
                    const format = e.target.closest('.export-option').dataset.format;
                    this.exportReport(format);
                }
            });
            
            // Device selector
            document.getElementById('device-selector')?.addEventListener('change', (e) => {
                this.deviceCount = parseInt(e.target.value);
                this.updateConfig();
                this.calculate();
            });
            
            // Price slider
            const priceSlider = document.getElementById('price-slider');
            if (priceSlider) {
                priceSlider.addEventListener('input', (e) => {
                    this.portnoxPricing = parseFloat(e.target.value);
                    document.getElementById('price-value').textContent = this.portnoxPricing.toFixed(2);
                    document.getElementById('annual-price').textContent = (this.portnoxPricing * 12).toFixed(2);
                    
                    // Update vendor database
                    if (this.vendorDatabase.portnox) {
                        this.vendorDatabase.portnox.pricing.perDevice.monthly = this.portnoxPricing;
                        this.vendorDatabase.portnox.pricing.perDevice.annual = this.portnoxPricing * 12;
                    }
                    
                    this.calculate();
                });
            }
            
            // Recalculate button
            document.getElementById('recalculate-btn')?.addEventListener('click', () => {
                this.calculate();
            });
        }
        
        switchTab(tabName) {
            // Update active tab
            document.querySelectorAll('.tab-button').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.tab === tabName);
            });
            
            this.activeTab = tabName;
            
            // Load tab content
            const content = document.getElementById('main-content');
            
            switch(tabName) {
                case 'executive-dashboard':
                    this.renderExecutiveDashboard(content);
                    break;
                case 'vendor-selection':
                    this.renderVendorSelection(content);
                    break;
                case 'financial-overview':
                    this.renderFinancialOverview(content);
                    break;
                case 'risk-security':
                    this.renderRiskSecurity(content);
                    break;
                case 'compliance':
                    this.renderCompliance(content);
                    break;
                case 'operational':
                    this.renderOperational(content);
                    break;
                case 'strategic-insights':
                    this.renderStrategicInsights(content);
                    break;
            }
        }
        
        calculate() {
            console.log('📊 Calculating analysis...');
            
            const config = this.getConfig();
            this.calculationResults = {};
            
            this.selectedVendors.forEach(vendorKey => {
                const vendor = this.vendorDatabase[vendorKey] || this.vendorDataManager.getVendor(vendorKey);
                if (!vendor) return;
                
                this.calculationResults[vendorKey] = this.calculateVendorMetrics(vendor, vendorKey, config);
            });
            
            // Emit calculation complete
            this.eventSystem.emit('calculation:complete', this.calculationResults);
            
            // Update current view
            this.switchTab(this.activeTab);
        }
        
        calculateVendorMetrics(vendor, vendorKey, config) {
            const devices = config.deviceCount;
            const years = 3;
            
            // Calculate costs
            const monthlyPerDevice = vendor.pricing?.perDevice?.monthly || 5;
            const annualLicense = monthlyPerDevice * 12 * devices;
            const totalLicense = annualLicense * years;
            
            // Implementation costs
            const baseImplementation = vendorKey === 'portnox' ? 5000 : 25000;
            const implementationCost = baseImplementation + (devices * 5);
            
            // Operational costs
            const fteRequired = vendorKey === 'portnox' ? 0.25 : 1.5;
            const fteCost = fteRequired * config.fteCost * years;
            
            // Risk costs
            const breachRisk = config.breachCost * config.annualBreachProbability * 
                              (vendorKey === 'portnox' ? 0.35 : 1) * years;
            
            // Total TCO
            const totalTCO = totalLicense + implementationCost + fteCost + breachRisk;
            
            // ROI calculation
            const industryAvg = devices * 10 * 12 * years;
            const savings = industryAvg - totalTCO;
            const roi = totalTCO > 0 ? (savings / totalTCO) * 100 : 0;
            
            return {
                vendor: vendor,
                tco: {
                    total: Math.round(totalTCO),
                    annual: Math.round(totalTCO / years),
                    perDevice: Math.round(totalTCO / devices),
                    perDeviceMonthly: Math.round(totalTCO / devices / (years * 12))
                },
                roi: {
                    percentage: Math.round(roi),
                    dollarValue: Math.round(savings),
                    paybackMonths: Math.round(implementationCost / (savings / (years * 12)))
                },
                metrics: {
                    implementationDays: vendor.metrics?.deploymentDays || 90,
                    fteRequired: fteRequired,
                    securityScore: vendor.metrics?.securityScore || 70,
                    automationLevel: vendor.metrics?.automationLevel || 50
                }
            };
        }
        
        renderExecutiveDashboard(container) {
            const portnox = this.calculationResults.portnox;
            if (!portnox) {
                container.innerHTML = '<div class="text-center text-muted">Calculating...</div>';
                return;
            }
            
            container.innerHTML = `
                <div class="executive-dashboard fade-in">
                    <!-- KPI Section -->
                    <section class="kpi-section">
                        <div class="kpi-grid">
                            <div class="kpi-card">
                                <div class="kpi-header">
                                    <div class="kpi-icon">
                                        <i class="fas fa-dollar-sign"></i>
                                    </div>
                                    <div class="kpi-trend positive">
                                        <i class="fas fa-arrow-up"></i>
                                        <span>${portnox.roi.percentage}%</span>
                                    </div>
                                </div>
                                <div class="kpi-content">
                                    <div class="kpi-label">3-Year ROI</div>
                                    <div class="kpi-value">$${Math.round(portnox.roi.dollarValue / 1000)}K</div>
                                </div>
                                <div class="kpi-comparison">
                                    vs. industry average
                                </div>
                            </div>
                            
                            <div class="kpi-card">
                                <div class="kpi-header">
                                    <div class="kpi-icon">
                                        <i class="fas fa-clock"></i>
                                    </div>
                                    <div class="kpi-trend positive">
                                        <i class="fas fa-arrow-down"></i>
                                        <span>-83%</span>
                                    </div>
                                </div>
                                <div class="kpi-content">
                                    <div class="kpi-label">Time to Deploy</div>
                                    <div class="kpi-value">${portnox.metrics.implementationDays} days</div>
                                </div>
                                <div class="kpi-comparison">
                                    vs. 90 days average
                                </div>
                            </div>
                            
                            <div class="kpi-card">
                                <div class="kpi-header">
                                    <div class="kpi-icon">
                                        <i class="fas fa-shield-alt"></i>
                                    </div>
                                    <div class="kpi-trend positive">
                                        <i class="fas fa-arrow-down"></i>
                                        <span>-65%</span>
                                    </div>
                                </div>
                                <div class="kpi-content">
                                    <div class="kpi-label">Risk Reduction</div>
                                    <div class="kpi-value">${portnox.metrics.securityScore}%</div>
                                </div>
                                <div class="kpi-comparison">
                                    Security effectiveness score
                                </div>
                            </div>
                            
                            <div class="kpi-card">
                                <div class="kpi-header">
                                    <div class="kpi-icon">
                                        <i class="fas fa-chart-bar"></i>
                                    </div>
                                    <div class="kpi-trend positive">
                                        <i class="fas fa-arrow-up"></i>
                                        <span>+${portnox.metrics.automationLevel}%</span>
                                    </div>
                                </div>
                                <div class="kpi-content">
                                    <div class="kpi-label">Automation Level</div>
                                    <div class="kpi-value">${portnox.metrics.automationLevel}%</div>
                                </div>
                                <div class="kpi-comparison">
                                    Process automation capability
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <!-- Chart Section -->
                    <section class="chart-section">
                        <div class="chart-grid">
                            <div class="chart-container">
                                <div class="chart-header">
                                    <h3 class="chart-title">Total Cost of Ownership</h3>
                                    <div class="chart-controls">
                                        <button class="chart-control active">3 Year</button>
                                        <button class="chart-control">Annual</button>
                                    </div>
                                </div>
                                <div id="tco-comparison-chart" style="height: 350px;"></div>
                            </div>
                            
                            <div class="chart-container">
                                <div class="chart-header">
                                    <h3 class="chart-title">ROI Timeline</h3>
                                </div>
                                <div id="roi-timeline-chart" style="height: 350px;"></div>
                            </div>
                        </div>
                    </section>
                    
                    <!-- Quick Actions -->
                    <section class="quick-actions mt-4">
                        <div class="chart-container">
                            <h3 class="mb-3">Quick Actions</h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                                <button class="control-button" onclick="window.open('https://portnox.com/demo', '_blank')">
                                    <i class="fas fa-calendar-check"></i>
                                    <span>Schedule Demo</span>
                                </button>
                                <button class="control-button" onclick="platform.exportReport('pdf')">
                                    <i class="fas fa-file-pdf"></i>
                                    <span>Download Report</span>
                                </button>
                                <button class="control-button" onclick="platform.switchTab('vendor-selection')">
                                    <i class="fas fa-plus"></i>
                                    <span>Add Competitors</span>
                                </button>
                                <button class="control-button" onclick="platform.switchTab('strategic-insights')">
                                    <i class="fas fa-lightbulb"></i>
                                    <span>View Recommendations</span>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            `;
            
            // Render charts
            setTimeout(() => {
                this.renderTCOChart();
                this.renderROIChart();
            }, 100);
        }
        
        renderVendorSelection(container) {
            container.innerHTML = `
                <div class="vendor-selection-content fade-in">
                    <!-- Selected Vendors -->
                    <section class="selected-vendors-section">
                        <div class="section-header">
                            <h2 class="section-title">Selected Vendors</h2>
                            <span class="text-muted">${this.selectedVendors.length} of ${this.maxVendors} vendors selected</span>
                        </div>
                        
                        <div class="selected-vendors-grid">
                            ${this.selectedVendors.map(vendorKey => {
                                const vendor = this.vendorDatabase[vendorKey] || this.vendorDataManager.getVendor(vendorKey);
                                if (!vendor) return '';
                                
                                return `
                                    <div class="vendor-card ${vendorKey === 'portnox' ? 'portnox' : ''}">
                                        ${vendorKey === 'portnox' ? '<div class="vendor-badge">RECOMMENDED</div>' : ''}
                                        <img src="img/vendors/${vendorKey}-logo.png" alt="${vendor.name}" 
                                             class="vendor-logo" onerror="this.style.display='none'">
                                        <div class="vendor-info">
                                            <div class="vendor-name">${vendor.name}</div>
                                            <div class="vendor-type">${vendor.type || 'NAC Solution'}</div>
                                        </div>
                                        ${vendorKey !== 'portnox' ? `
                                            <button class="remove-vendor" onclick="platform.removeVendor('${vendorKey}')">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        ` : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </section>
                    
                    <!-- Available Vendors -->
                    <section class="available-vendors-section">
                        <div class="section-header">
                            <h2 class="section-title">Add Competitors</h2>
                        </div>
                        
                        <div class="vendor-filters">
                            <button class="filter-button active">All</button>
                            <button class="filter-button">Traditional</button>
                            <button class="filter-button">Cloud-Native</button>
                            <button class="filter-button">Open Source</button>
                        </div>
                        
                        <div class="available-vendors-grid">
                            ${Object.entries(this.vendorDatabase).filter(([key]) => 
                                !this.selectedVendors.includes(key)
                            ).map(([key, vendor]) => `
                                <div class="available-vendor-card" onclick="platform.addVendor('${key}')">
                                    <h4>${vendor.name}</h4>
                                    <p class="text-muted mb-2">${vendor.type || 'NAC Solution'}</p>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span class="text-primary font-bold">
                                            $${vendor.pricing?.perDevice?.monthly || '?'}/device/mo
                                        </span>
                                        <button class="control-button" style="padding: 0.5rem 1rem;">
                                            <i class="fas fa-plus"></i>
                                            Add
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                </div>
            `;
        }
        
        renderFinancialOverview(container) {
            if (this.modules.FinancialAnalysis) {
                const analysis = new this.modules.FinancialAnalysis(this);
                analysis.render(container);
            } else {
                // Fallback rendering
                const portnox = this.calculationResults.portnox;
                if (!portnox) return;
                
                container.innerHTML = `
                    <div class="financial-overview fade-in">
                        <h2 class="mb-4">Financial Overview</h2>
                        
                        <div class="kpi-grid mb-4">
                            <div class="kpi-card">
                                <div class="kpi-icon"><i class="fas fa-coins"></i></div>
                                <div class="kpi-label">3-Year TCO</div>
                                <div class="kpi-value">$${Math.round(portnox.tco.total / 1000)}K</div>
                                <div class="kpi-comparison">Total investment required</div>
                            </div>
                            
                            <div class="kpi-card">
                                <div class="kpi-icon"><i class="fas fa-chart-line"></i></div>
                                <div class="kpi-label">Annual Savings</div>
                                <div class="kpi-value">$${Math.round(portnox.roi.dollarValue / 3 / 1000)}K</div>
                                <div class="kpi-comparison">vs. industry average</div>
                            </div>
                            
                            <div class="kpi-card">
                                <div class="kpi-icon"><i class="fas fa-percentage"></i></div>
                                <div class="kpi-label">ROI</div>
                                <div class="kpi-value">${portnox.roi.percentage}%</div>
                                <div class="kpi-comparison">Return on investment</div>
                            </div>
                            
                            <div class="kpi-card">
                                <div class="kpi-icon"><i class="fas fa-calendar-alt"></i></div>
                                <div class="kpi-label">Payback Period</div>
                                <div class="kpi-value">${portnox.roi.paybackMonths} mo</div>
                                <div class="kpi-comparison">Time to break even</div>
                            </div>
                        </div>
                        
                        <div class="chart-grid">
                            <div class="chart-container">
                                <h3 class="chart-title">Cost Breakdown</h3>
                                <div id="cost-breakdown-chart" style="height: 400px;"></div>
                            </div>
                            
                            <div class="chart-container">
                                <h3 class="chart-title">5-Year Projection</h3>
                                <div id="projection-chart" style="height: 400px;"></div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Render charts
                setTimeout(() => {
                    this.renderCostBreakdownChart();
                    this.renderProjectionChart();
                }, 100);
            }
        }
        
        renderRiskSecurity(container) {
            if (this.modules.RiskSecurityAnalysis) {
                const analysis = new this.modules.RiskSecurityAnalysis(this);
                analysis.render(container);
            } else {
                container.innerHTML = `
                    <div class="risk-security fade-in">
                        <h2>Risk & Security Analysis</h2>
                        <p class="text-muted">Comprehensive security assessment coming soon...</p>
                    </div>
                `;
            }
        }
        
        renderCompliance(container) {
            if (this.modules.ComplianceAnalysis) {
                const analysis = new this.modules.ComplianceAnalysis(this);
                analysis.render(container);
            } else {
                container.innerHTML = `
                    <div class="compliance fade-in">
                        <h2>Compliance Analysis</h2>
                        <p class="text-muted">Regulatory alignment assessment coming soon...</p>
                    </div>
                `;
            }
        }
        
        renderOperational(container) {
            if (this.modules.OperationalImpact) {
                const analysis = new this.modules.OperationalImpact(this);
                analysis.render(container);
            } else {
                container.innerHTML = `
                    <div class="operational fade-in">
                        <h2>Operational Impact</h2>
                        <p class="text-muted">Efficiency analysis coming soon...</p>
                    </div>
                `;
            }
        }
        
        renderStrategicInsights(container) {
            if (this.modules.StrategicInsights) {
                const analysis = new this.modules.StrategicInsights(this);
                analysis.render(container);
            } else {
                container.innerHTML = `
                    <div class="strategic-insights fade-in">
                        <h2>Strategic Insights</h2>
                        <div class="chart-container">
                            <h3>Executive Recommendations</h3>
                            <div class="mt-3">
                                <div class="kpi-card mb-3">
                                    <h4 class="text-primary mb-2">
                                        <i class="fas fa-trophy"></i> Recommended Solution: Portnox CLEAR
                                    </h4>
                                    <p>Based on comprehensive analysis, Portnox CLEAR provides the best value with:</p>
                                    <ul style="list-style: none; padding: 0; margin-top: 1rem;">
                                        <li class="mb-2"><i class="fas fa-check text-primary"></i> Lowest 3-year TCO</li>
                                        <li class="mb-2"><i class="fas fa-check text-primary"></i> Fastest deployment (7 days)</li>
                                        <li class="mb-2"><i class="fas fa-check text-primary"></i> Highest automation (92%)</li>
                                        <li class="mb-2"><i class="fas fa-check text-primary"></i> Best security score (95%)</li>
                                    </ul>
                                </div>
                                
                                <button class="control-button primary" style="width: 100%;" 
                                        onclick="window.open('https://portnox.com/demo', '_blank')">
                                    <i class="fas fa-calendar-check"></i>
                                    Schedule Executive Briefing
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        
        // Chart rendering methods
        renderTCOChart() {
            const container = document.getElementById('tco-comparison-chart');
            if (!container || typeof Highcharts === 'undefined') return;
            
            const data = Object.entries(this.calculationResults).map(([key, result]) => ({
                name: result.vendor?.name || key,
                y: result.tco.total,
                color: key === 'portnox' ? '#00d4aa' : '#667eea'
            }));
            
            Highcharts.chart(container, {
                chart: {
                    type: 'column',
                    backgroundColor: 'transparent'
                },
                title: { text: null },
                xAxis: {
                    type: 'category',
                    labels: { style: { color: '#a0aec0' } }
                },
                yAxis: {
                    title: { text: 'Total Cost ($)', style: { color: '#a0aec0' } },
                    labels: { 
                        style: { color: '#a0aec0' },
                        formatter: function() { return '$' + (this.value / 1000) + 'K'; }
                    }
                },
                legend: { enabled: false },
                plotOptions: {
                    column: {
                        borderRadius: 8,
                        dataLabels: {
                            enabled: true,
                            formatter: function() { return '$' + Math.round(this.y / 1000) + 'K'; },
                            style: { color: '#ffffff', textOutline: '2px #2a3142' }
                        }
                    }
                },
                series: [{ data: data }],
                credits: { enabled: false }
            });
        }
        
        renderROIChart() {
            const container = document.getElementById('roi-timeline-chart');
            if (!container || typeof Highcharts === 'undefined') return;
            
            const series = Object.entries(this.calculationResults).map(([key, result]) => {
                const monthlyBenefit = result.roi.dollarValue / 36;
                const data = [];
                let cumulative = -result.tco.total * 0.1; // Initial investment
                
                for (let month = 0; month <= 36; month++) {
                    if (month > 0) cumulative += monthlyBenefit;
                    data.push([month, Math.round(cumulative)]);
                }
                
                return {
                    name: result.vendor?.name || key,
                    data: data,
                    color: key === 'portnox' ? '#00d4aa' : '#667eea'
                };
            });
            
            Highcharts.chart(container, {
                chart: {
                    type: 'line',
                    backgroundColor: 'transparent'
                },
                title: { text: null },
                xAxis: {
                    title: { text: 'Months', style: { color: '#a0aec0' } },
                    labels: { style: { color: '#a0aec0' } }
                },
                yAxis: {
                    title: { text: 'Cumulative Value ($)', style: { color: '#a0aec0' } },
                    labels: { 
                        style: { color: '#a0aec0' },
                        formatter: function() { return '$' + Math.round(this.value / 1000) + 'K'; }
                    },
                    plotLines: [{
                        value: 0,
                        color: '#718096',
                        width: 2,
                        dashStyle: 'dash'
                    }]
                },
                legend: {
                    itemStyle: { color: '#a0aec0' }
                },
                plotOptions: {
                    line: { marker: { enabled: false }, lineWidth: 3 }
                },
                series: series,
                credits: { enabled: false }
            });
        }
        
        renderCostBreakdownChart() {
            const container = document.getElementById('cost-breakdown-chart');
            if (!container || typeof Highcharts === 'undefined') return;
            
            const portnox = this.calculationResults.portnox;
            if (!portnox) return;
            
            const data = [
                { name: 'Licensing', y: portnox.tco.annual * 0.4, color: '#00d4aa' },
                { name: 'Implementation', y: portnox.tco.annual * 0.2, color: '#667eea' },
                { name: 'Operations', y: portnox.tco.annual * 0.25, color: '#3b82f6' },
                { name: 'Risk Mitigation', y: portnox.tco.annual * 0.15, color: '#10b981' }
            ];
            
            Highcharts.chart(container, {
                chart: {
                    type: 'pie',
                    backgroundColor: 'transparent'
                },
                title: { text: null },
                plotOptions: {
                    pie: {
                        innerSize: '60%',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: ${point.y:,.0f}',
                            style: { color: '#ffffff', textOutline: '2px #2a3142' }
                        }
                    }
                },
                series: [{ data: data }],
                credits: { enabled: false }
            });
        }
        
        renderProjectionChart() {
            const container = document.getElementById('projection-chart');
            if (!container || typeof Highcharts === 'undefined') return;
            
            const years = [1, 2, 3, 4, 5];
            const portnox = this.calculationResults.portnox;
            if (!portnox) return;
            
            const portnoxData = years.map(year => portnox.tco.annual * year);
            const industryData = years.map(year => portnox.tco.annual * year * 1.5);
            
            Highcharts.chart(container, {
                chart: {
                    type: 'area',
                    backgroundColor: 'transparent'
                },
                title: { text: null },
                xAxis: {
                    categories: years.map(y => 'Year ' + y),
                    labels: { style: { color: '#a0aec0' } }
                },
                yAxis: {
                    title: { text: 'Cumulative Cost ($)', style: { color: '#a0aec0' } },
                    labels: { 
                        style: { color: '#a0aec0' },
                        formatter: function() { return '$' + Math.round(this.value / 1000) + 'K'; }
                    }
                },
                legend: {
                    itemStyle: { color: '#a0aec0' }
                },
                plotOptions: {
                    area: {
                        fillOpacity: 0.3,
                        marker: { enabled: false }
                    }
                },
                series: [
                    {
                        name: 'Portnox CLEAR',
                        data: portnoxData,
                        color: '#00d4aa'
                    },
                    {
                        name: 'Industry Average',
                        data: industryData,
                        color: '#667eea'
                    }
                ],
                credits: { enabled: false }
            });
        }
        
        // Vendor management
        addVendor(vendorKey) {
            if (this.selectedVendors.length >= this.maxVendors) {
                alert(`Maximum ${this.maxVendors} vendors allowed`);
                return;
            }
            
            if (!this.selectedVendors.includes(vendorKey)) {
                this.selectedVendors.push(vendorKey);
                this.calculate();
                this.switchTab('vendor-selection');
            }
        }
        
        removeVendor(vendorKey) {
            if (vendorKey === 'portnox') return;
            
            this.selectedVendors = this.selectedVendors.filter(v => v !== vendorKey);
            this.calculate();
            this.switchTab('vendor-selection');
        }
        
        // Configuration
        getConfig() {
            return {
                deviceCount: this.deviceCount,
                locationCount: Math.ceil(this.deviceCount / 500),
                fteCost: 75000,
                breachCost: 250000,
                annualBreachProbability: 0.15,
                downtimeCostPerHour: 5000,
                compliancePenaltyRisk: 100000,
                industry: 'technology'
            };
        }
        
        updateConfig() {
            const config = this.getConfig();
            this.configManager.updateConfig(config);
            this.eventSystem.emit('config:changed', config);
        }
        
        // Export functionality
        exportReport(format) {
            console.log(`Exporting report as ${format}...`);
            window.open(`https://portnox.com/tco-report?format=${format}`, '_blank');
        }
    }
    
    return ExecutivePlatform;
});

console.log('✅ Executive Platform module registered');
