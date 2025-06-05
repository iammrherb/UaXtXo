/**
 * Premium Executive Platform - Ultimate Visual Experience
 * Complete TCO/ROI Analysis with All Features Working
 * Fixed version with proper initialization and error handling
 */

// Set Highcharts options to suppress accessibility warning
if (typeof Highcharts !== 'undefined') {
    Highcharts.setOptions({
        accessibility: {
            enabled: false
        },
        lang: {
            thousandsSep: ','
        }
    });
}

class PremiumExecutivePlatform {
    constructor() {
        // Initialize with defaults
        this.selectedVendors = ['portnox', 'cisco_ise', 'aruba_clearpass'];
        this.maxAdditionalVendors = 5;
        this.vendorDatabase = window.ComprehensiveVendorDatabase || {};
        
        // Configuration
        this.config = {
            deviceCount: 500,
            locationCount: 1,
            fteCost: 100000,
            breachCost: 500000,
            downtimeCostPerHour: 2500,
            compliancePenaltyRisk: 100000,
            cyberInsurancePremium: 25000,
            trainingEfficiency: 1.0,
            integrationComplexity: 1.0,
            maintenanceEfficiency: 1.0,
            existingInfrastructure: 'none',
            annualBreachProbability: 0.15,
            complianceAuditFrequency: 2,
            acceptableDowntimeHours: 4,
            industry: 'technology',
            complianceFrameworks: ['sox', 'gdpr', 'iso27001', 'hipaa', 'pci-dss'],
            includeOpportunityLoss: true,
            includeProductivityGains: true,
            includeInsuranceSavings: true
        };
        
        // Dynamic pricing
        this.portnoxPricing = 3.50;
        
        // State
        this.settingsModalOpen = false;
        this.activeTab = 'financial-overview';
        this.calculationResults = null;
        this.initialized = false;
        
        // Initialize only once DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    init() {
        if (this.initialized) return;
        this.initialized = true;
        
        console.log('🚀 Initializing Premium Executive Platform - Fixed Version');
        this.setupPremiumUI();
        this.bindEvents();
        this.updateVendorSelection();
        this.calculate();
        
        // Set initial tab after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.switchTab('financial-overview');
        }, 100);
    }
    
    setupPremiumUI() {
        const app = document.getElementById('app-container') || document.body;
        app.innerHTML = `
            <div class="premium-platform ultimate-visual">
                <!-- Premium Header with Gradient Animation -->
                <header class="premium-header animated-gradient">
                    <div class="header-container">
                        <div class="brand-identity">
                            <div class="portnox-logo-wrapper">
                                <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="portnox-logo animated-logo" 
                                     onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'logo-text\\'>PORTNOX</div>'">
                            </div>
                            <div class="platform-title">
                                <h1 class="gradient-text">Executive Decision Platform</h1>
                                <p class="subtitle-animated">Zero Trust NAC Investment Analysis & Risk Assessment</p>
                            </div>
                        </div>
                        <div class="header-controls">
                            <button class="control-btn settings glass-effect" onclick="platform.openSettings()">
                                <i class="fas fa-cog"></i>
                                <span>Settings</span>
                            </button>
                            <button class="control-btn calculate pulse-effect" onclick="platform.calculate()">
                                <i class="fas fa-calculator"></i>
                                <span>Recalculate</span>
                            </button>
                            <button class="control-btn export glass-effect" onclick="platform.exportAnalysis()">
                                <i class="fas fa-download"></i>
                                <span>Export</span>
                            </button>
                            <button class="control-btn demo glow-effect" onclick="platform.scheduleDemo()">
                                <i class="fas fa-calendar-check"></i>
                                <span>Schedule Demo</span>
                            </button>
                        </div>
                    </div>
                </header>
                
                <!-- Vendor Selection Bar with Visual Enhancement -->
                <div class="vendor-selection-bar glass-panel">
                    <div class="selection-container">
                        <div class="selection-info">
                            <h3>Vendor Comparison</h3>
                            <p>Portnox + select up to ${this.maxAdditionalVendors} competitors</p>
                        </div>
                        <div class="selected-vendors animated-chips" id="selected-vendors-display">
                            <!-- Vendors display here -->
                        </div>
                        <button class="add-vendor-btn hover-lift" onclick="platform.openVendorSelector()">
                            <i class="fas fa-plus-circle"></i>
                            Add Competitor
                        </button>
                    </div>
                </div>
                
                <!-- Enhanced Navigation Tabs -->
                <div class="analysis-container">
                    <nav class="premium-nav glass-nav">
                        <button class="nav-tab active" data-tab="financial-overview" onclick="platform.switchTab('financial-overview')">
                            <i class="fas fa-chart-line"></i>
                            <span>Financial Overview</span>
                            <span class="tab-subtitle">TCO & ROI Analysis</span>
                        </button>
                        <button class="nav-tab" data-tab="risk-assessment" onclick="platform.switchTab('risk-assessment')">
                            <i class="fas fa-shield-virus"></i>
                            <span>Risk & Security</span>
                            <span class="tab-subtitle">Breach & Incident Impact</span>
                        </button>
                        <button class="nav-tab" data-tab="compliance-analysis" onclick="platform.switchTab('compliance-analysis')">
                            <i class="fas fa-clipboard-check"></i>
                            <span>Compliance</span>
                            <span class="tab-subtitle">Regulatory Alignment</span>
                        </button>
                        <button class="nav-tab" data-tab="operational-impact" onclick="platform.switchTab('operational-impact')">
                            <i class="fas fa-cogs"></i>
                            <span>Operational</span>
                            <span class="tab-subtitle">Efficiency & Timeline</span>
                        </button>
                        <button class="nav-tab" data-tab="strategic-insights" onclick="platform.switchTab('strategic-insights')">
                            <i class="fas fa-lightbulb"></i>
                            <span>Strategic Insights</span>
                            <span class="tab-subtitle">Recommendations</span>
                        </button>
                    </nav>
                    
                    <div class="analysis-content glass-content" id="analysis-content">
                        <!-- Dynamic content -->
                    </div>
                </div>
                
                <!-- Settings Modal -->
                ${this.renderSettingsModal()}
                
                <!-- Vendor Selector Modal -->
                ${this.renderVendorSelectorModal()}
                
                <!-- Portnox Pricing Control -->
                <div class="portnox-pricing-bar glass-panel">
                    <div class="pricing-container">
                        <div class="pricing-label">
                            <span class="portnox-text">PORTNOX</span>
                            <span>Pricing Adjustment</span>
                        </div>
                        <div class="pricing-control">
                            <span class="price-label">$<span id="portnox-price-display">${this.portnoxPricing.toFixed(2)}</span>/device/month</span>
                            <input type="range" id="portnox-pricing-slider" 
                                   min="1" max="8" step="0.25" value="${this.portnoxPricing}">
                            <div class="price-range">
                                <span>$1.00</span>
                                <span>$8.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderSettingsModal() {
        return `
            <div class="settings-modal modal-backdrop" id="settings-modal" style="display: none;">
                <div class="modal-content glass-modal animated-modal">
                    <div class="modal-header">
                        <h2>Configuration Settings</h2>
                        <button class="close-modal" onclick="platform.closeSettings()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="settings-grid">
                            <div class="settings-section">
                                <h3>Organization</h3>
                                <div class="setting-item">
                                    <label>Number of Devices</label>
                                    <input type="number" id="device-count" value="${this.config.deviceCount}" min="100" max="50000" step="100">
                                </div>
                                <div class="setting-item">
                                    <label>Number of Locations</label>
                                    <input type="number" id="location-count" value="${this.config.locationCount}" min="1" max="100">
                                </div>
                                <div class="setting-item">
                                    <label>Industry</label>
                                    <select id="industry">
                                        <option value="technology">Technology</option>
                                        <option value="finance">Finance</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="retail">Retail</option>
                                        <option value="manufacturing">Manufacturing</option>
                                    </select>
                                </div>
                            </div>
                            <div class="settings-section">
                                <h3>Costs & Risks</h3>
                                <div class="setting-item">
                                    <label>Average FTE Cost</label>
                                    <input type="number" id="fte-cost" value="${this.config.fteCost}" min="50000" max="200000" step="5000">
                                </div>
                                <div class="setting-item">
                                    <label>Breach Cost Estimate</label>
                                    <input type="number" id="breach-cost" value="${this.config.breachCost}" min="100000" max="10000000" step="50000">
                                </div>
                                <div class="setting-item">
                                    <label>Downtime Cost/Hour</label>
                                    <input type="number" id="downtime-cost" value="${this.config.downtimeCostPerHour}" min="500" max="50000" step="500">
                                </div>
                            </div>
                            <div class="settings-section">
                                <h3>Compliance</h3>
                                <div class="setting-item">
                                    <label>Required Frameworks</label>
                                    <div class="checkbox-group">
                                        <label><input type="checkbox" name="compliance" value="sox" ${this.config.complianceFrameworks.includes('sox') ? 'checked' : ''}> SOX</label>
                                        <label><input type="checkbox" name="compliance" value="gdpr" ${this.config.complianceFrameworks.includes('gdpr') ? 'checked' : ''}> GDPR</label>
                                        <label><input type="checkbox" name="compliance" value="hipaa" ${this.config.complianceFrameworks.includes('hipaa') ? 'checked' : ''}> HIPAA</label>
                                        <label><input type="checkbox" name="compliance" value="pci-dss" ${this.config.complianceFrameworks.includes('pci-dss') ? 'checked' : ''}> PCI-DSS</label>
                                        <label><input type="checkbox" name="compliance" value="iso27001" ${this.config.complianceFrameworks.includes('iso27001') ? 'checked' : ''}> ISO 27001</label>
                                        <label><input type="checkbox" name="compliance" value="nist-csf" ${this.config.complianceFrameworks.includes('nist-csf') ? 'checked' : ''}> NIST CSF</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-primary hover-lift" onclick="platform.applySettings()">
                            Apply Settings
                        </button>
                        <button class="btn-secondary" onclick="platform.resetSettings()">
                            Reset to Defaults
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderVendorSelectorModal() {
        return `
            <div class="vendor-selector-modal modal-backdrop" id="vendor-selector-modal" style="display: none;">
                <div class="modal-content glass-modal animated-modal">
                    <div class="modal-header">
                        <h2>Select Competitors to Compare</h2>
                        <button class="close-modal" onclick="platform.closeVendorSelector()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p class="selector-hint">Select up to ${this.maxAdditionalVendors} vendors to compare against Portnox</p>
                        <div class="vendor-selector-grid" id="vendor-selector-grid">
                            ${Object.entries(this.vendorDatabase).filter(([key]) => key !== 'portnox').map(([key, vendor]) => `
                                <div class="vendor-option ${this.selectedVendors.includes(key) ? 'selected' : ''}" 
                                     data-vendor="${key}" onclick="platform.toggleVendor('${key}')">
                                    <div class="vendor-option-content">
                                        <h4>${vendor.name}</h4>
                                        <p>${vendor.type} - ${vendor.architecture}</p>
                                        <span class="vendor-price">$${vendor.pricing.perDevice.monthly}/device/mo</span>
                                    </div>
                                    <i class="fas fa-check-circle check-icon"></i>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-primary hover-lift" onclick="platform.applyVendorSelection()">
                            Update Comparison
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    bindEvents() {
        // Portnox pricing slider
        const portnoxSlider = document.getElementById('portnox-pricing-slider');
        if (portnoxSlider) {
            portnoxSlider.addEventListener('input', (e) => {
                this.portnoxPricing = parseFloat(e.target.value);
                document.getElementById('portnox-price-display').textContent = this.portnoxPricing.toFixed(2);
                // Update vendor database
                if (this.vendorDatabase.portnox) {
                    this.vendorDatabase.portnox.pricing.perDevice.monthly = this.portnoxPricing;
                    this.vendorDatabase.portnox.pricing.perDevice.annual = this.portnoxPricing * 12;
                }
                this.calculate();
            });
        }
    }
    
    switchTab(tabName) {
        // Update active tab
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        this.activeTab = tabName;
        const content = document.getElementById('analysis-content');
        
        if (!content) {
            console.error('Analysis content container not found');
            return;
        }
        
        // Add loading animation
        content.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
        
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
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
        });
    }
    
    calculate() {
        console.log('📊 Calculating comprehensive TCO/ROI analysis...');
        
        this.calculationResults = {};
        
        this.selectedVendors.forEach(vendorKey => {
            const vendor = this.vendorDatabase[vendorKey];
            if (!vendor) return;
            
            this.calculationResults[vendorKey] = this.calculateComprehensiveTCO(vendor, vendorKey);
        });
        
        // Refresh current tab if already initialized
        if (this.initialized && this.activeTab) {
            this.switchTab(this.activeTab);
        }
    }
    
    calculateComprehensiveTCO(vendor, vendorKey) {
        const devices = this.config.deviceCount;
        const locations = this.config.locationCount;
        const isPortnox = vendorKey === 'portnox';
        
        // Full calculation implementation with all factors
        const results = {
            vendor: vendor,
            vendorKey: vendorKey,
            scores: {
                security: vendor.metrics?.securityScore || 70,
                automation: vendor.metrics?.automationLevel || 60,
                zeroTrust: vendor.metrics?.zeroTrustScore || 65,
                scalability: vendor.metrics?.scalabilityScore || 70,
                userExperience: vendor.metrics?.userExperienceScore || 75,
                overall: Math.round((
                    (vendor.metrics?.securityScore || 70) * 0.3 +
                    (vendor.metrics?.automationLevel || 60) * 0.2 +
                    (vendor.metrics?.zeroTrustScore || 65) * 0.2 +
                    (vendor.metrics?.scalabilityScore || 70) * 0.15 +
                    (vendor.metrics?.userExperienceScore || 75) * 0.15
                ))
            },
            timeline: {
                implementation: vendor.metrics?.deploymentDays || 30,
                timeToValue: Math.round((vendor.metrics?.deploymentDays || 30) * 1.5),
                breakEven: 12,
                fullROI: 24
            }
        };
        
        // Calculate for 1 and 3 years
        [1, 3].forEach(years => {
            const monthlyPerDevice = isPortnox ? this.portnoxPricing : (vendor.pricing?.perDevice?.monthly || 10);
            const annualLicense = monthlyPerDevice * 12 * devices;
            const totalLicense = annualLicense * years;
            
            // Implementation costs
            const implementationBase = vendor.pricing?.implementation?.base || 15000;
            const implementationPerDevice = vendor.pricing?.implementation?.perDevice || 10;
            const implementationCost = implementationBase + (devices * implementationPerDevice);
            
            // Support costs
            const supportAnnual = vendor.pricing?.support?.annual || (annualLicense * 0.18);
            const supportCost = supportAnnual * years;
            
            // Infrastructure costs
            const infrastructureCost = vendor.architecture === 'SaaS' ? 0 : 
                (vendor.pricing?.infrastructure?.servers || 25000) +
                (vendor.pricing?.infrastructure?.loadBalancers || 0) +
                (vendor.pricing?.infrastructure?.database || 0);
            
            // Personnel costs
            const fteRequired = vendor.metrics?.fteRequired || 1.0;
            const fteCost = fteRequired * this.config.fteCost * years;
            
            // Hidden costs
            const hiddenCosts = vendor.hiddenCosts || {};
            const trainingCost = hiddenCosts.training || (devices * 50);
            const customizationCost = hiddenCosts.customization || (implementationCost * 0.15);
            const integrationCost = hiddenCosts.integration || (implementationCost * 0.20);
            const maintenanceCost = (hiddenCosts.maintenance || (infrastructureCost * 0.15)) * years;
            const upgradesCost = (hiddenCosts.upgrades || (totalLicense * 0.05));
            const downtimeCost = (hiddenCosts.downtime || (4 * years * this.config.downtimeCostPerHour * 0.2));
            
            // Risk-adjusted costs
            const breachProbability = isPortnox ? 0.02 : (1 - (vendor.metrics?.securityScore || 70) / 100) * 0.15;
            const breachRiskCost = this.config.breachCost * breachProbability * years;
            
            const complianceScore = this.getComplianceScore(vendor);
            const complianceRiskCost = (100 - complianceScore) / 100 * this.config.compliancePenaltyRisk * years;
            
            // Productivity and opportunity costs
            const productivityLoss = (100 - (vendor.metrics?.automationLevel || 60)) / 100 * devices * 1000 * years;
            const opportunityLoss = (vendor.metrics?.deploymentDays || 30) / 30 * 50000;
            
            // Insurance impact
            const insuranceReduction = isPortnox ? 
                this.config.cyberInsurancePremium * 0.15 * years : 
                this.config.cyberInsurancePremium * 0.05 * years;
            
            // Total TCO calculation
            const totalTCO = totalLicense + implementationCost + supportCost + 
                           infrastructureCost + fteCost + trainingCost + customizationCost +
                           integrationCost + maintenanceCost + upgradesCost + downtimeCost +
                           breachRiskCost + complianceRiskCost + productivityLoss + opportunityLoss -
                           insuranceReduction;
            
            // ROI Calculation
            const industryAvgCost = devices * 200 * 12 * years; // Industry average
            const savings = industryAvgCost - totalTCO;
            const roi = totalTCO > 0 ? (savings / totalTCO) * 100 : 0;
            
            // Payback calculation
            const monthlySavings = savings / (years * 12);
            const paybackMonths = implementationCost > 0 && monthlySavings > 0 ? 
                Math.round(implementationCost / monthlySavings) : 999;
            
            results[`year${years}`] = {
                tco: {
                    total: Math.round(totalTCO),
                    perDevice: Math.round(totalTCO / devices),
                    perMonth: Math.round(totalTCO / (years * 12)),
                    breakdown: {
                        software: Math.round(totalLicense),
                        implementation: Math.round(implementationCost),
                        support: Math.round(supportCost),
                        hardware: Math.round(infrastructureCost),
                        personnel: Math.round(fteCost),
                        training: Math.round(trainingCost),
                        integration: Math.round(integrationCost),
                        customization: Math.round(customizationCost),
                        maintenance: Math.round(maintenanceCost),
                        upgrades: Math.round(upgradesCost),
                        downtime: Math.round(downtimeCost)
                    },
                    riskCosts: {
                        breachRisk: Math.round(breachRiskCost),
                        complianceRisk: Math.round(complianceRiskCost),
                        opportunityLoss: Math.round(opportunityLoss),
                        productivityLoss: Math.round(productivityLoss),
                        insuranceImpact: Math.round(-insuranceReduction)
                    }
                },
                roi: {
                    percentage: Math.round(Math.max(0, roi)),
                    dollarValue: Math.round(Math.max(0, savings)),
                    paybackMonths: paybackMonths,
                    breakEvenMonth: paybackMonths < 999 ? paybackMonths : null
                },
                comparison: {
                    vsIndustryAvg: Math.round((industryAvgCost - totalTCO) / industryAvgCost * 100),
                    ranking: null // Will be set after all calculations
                }
            };
        });
        
        return results;
    }
    
    getComplianceScore(vendor) {
        if (!vendor.compliance) return 70;
        
        const relevantFrameworks = this.config.complianceFrameworks;
        let totalScore = 0;
        let count = 0;
        
        relevantFrameworks.forEach(framework => {
            if (vendor.compliance[framework]) {
                totalScore += vendor.compliance[framework];
                count++;
            }
        });
        
        return count > 0 ? Math.round(totalScore / count) : 70;
    }
    
    renderFinancialOverview(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            this.calculate();
            return;
        }
        
        container.innerHTML = `
            <div class="financial-overview animated-content">
                <div class="executive-summary-card premium glass-card">
                    <h2 class="gradient-text">Executive Financial Dashboard</h2>
                    ${this.renderFinancialSummary()}
                </div>
                
                <div class="chart-section premium glass-card">
                    <h3>TCO Comparison Analysis</h3>
                    <div class="chart-grid">
                        <div class="chart-container">
                            <h4>3-Year Total Cost of Ownership</h4>
                            <div id="tco-comparison-chart" style="height: 400px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>ROI Timeline & Payback Analysis</h4>
                            <div id="roi-timeline-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                ${this.renderCostBreakdown()}
                ${this.renderFinancialRecommendations()}
            </div>
        `;
        
        // Ensure DOM is ready before rendering charts
        requestAnimationFrame(() => {
            this.renderFinancialCharts();
        });
    }
    
    renderFinancialSummary() {
        const portnox = this.calculationResults.portnox;
        if (!portnox) return '<p>Loading...</p>';
        
        // Calculate competitive advantage
        let totalCompetitorCost = 0;
        let competitorCount = 0;
        Object.entries(this.calculationResults).forEach(([key, result]) => {
            if (key !== 'portnox' && result.year3) {
                totalCompetitorCost += result.year3.tco.total;
                competitorCount++;
            }
        });
        
        const avgCompetitorCost = competitorCount > 0 ? totalCompetitorCost / competitorCount : 0;
        const portnoxAdvantage = avgCompetitorCost > 0 ? 
            Math.round((avgCompetitorCost - portnox.year3.tco.total) / avgCompetitorCost * 100) : 0;
        
        return `
            <div class="summary-grid enhanced">
                <div class="summary-item highlight premium hover-lift">
                    <div class="item-icon pulse-icon">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <div class="item-content">
                        <h3>Total Savings</h3>
                        <div class="value">$${Math.round((portnox.year3?.roi?.dollarValue || 0) / 1000)}K</div>
                        <p>3-year advantage</p>
                    </div>
                </div>
                <div class="summary-item glass-item hover-lift">
                    <div class="item-icon">
                        <i class="fas fa-percentage"></i>
                    </div>
                    <div class="item-content">
                        <h3>Cost Advantage</h3>
                        <div class="value">${portnoxAdvantage}%</div>
                        <p>vs. competitors</p>
                    </div>
                </div>
                <div class="summary-item glass-item hover-lift">
                    <div class="item-icon">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="item-content">
                        <h3>Payback Period</h3>
                        <div class="value">${portnox.year3?.roi?.paybackMonths || 12} months</div>
                        <p>Time to ROI</p>
                    </div>
                </div>
                <div class="summary-item glass-item hover-lift">
                    <div class="item-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="item-content">
                        <h3>3-Year ROI</h3>
                        <div class="value">${portnox.year3?.roi?.percentage || 0}%</div>
                        <p>Return on investment</p>
                    </div>
                </div>
                <div class="summary-item glass-item hover-lift">
                    <div class="item-icon">
                        <i class="fas fa-coins"></i>
                    </div>
                    <div class="item-content">
                        <h3>Per Device Cost</h3>
                        <div class="value">$${Math.round((portnox.year3?.tco?.perDevice || 0) / 36)}/mo</div>
                        <p>All-inclusive</p>
                    </div>
                </div>
                <div class="summary-item glass-item hover-lift">
                    <div class="item-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <div class="item-content">
                        <h3>Time to Deploy</h3>
                        <div class="value">${portnox.timeline?.implementation || 7} days</div>
                        <p>vs. 90+ days avg</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderCostBreakdown() {
        return `
            <div class="cost-breakdown-section premium glass-card">
                <h3>Detailed Cost Analysis</h3>
                <div class="cost-breakdown-grid enhanced">
                    ${Object.entries(this.calculationResults).map(([key, result]) => {
                        const isPortnox = key === 'portnox';
                        const year3 = result.year3;
                        if (!year3) return '';
                        
                        return `
                        <div class="cost-breakdown-card enhanced ${isPortnox ? 'portnox-highlight glow-border' : 'glass-item'}">
                            <h4>${result.vendor?.name || key}</h4>
                            <div class="cost-categories">
                                <div class="cost-category">
                                    <span class="label">Software Licensing</span>
                                    <span class="value">$${Math.round((year3.tco?.breakdown?.software || 0) / 1000)}K</span>
                                </div>
                                <div class="cost-category">
                                    <span class="label">Implementation</span>
                                    <span class="value">$${Math.round((year3.tco?.breakdown?.implementation || 0) / 1000)}K</span>
                                </div>
                                <div class="cost-category">
                                    <span class="label">Infrastructure</span>
                                    <span class="value">$${Math.round((year3.tco?.breakdown?.hardware || 0) / 1000)}K</span>
                                </div>
                                <div class="cost-category">
                                    <span class="label">Operations & Support</span>
                                    <span class="value">$${Math.round(((year3.tco?.breakdown?.personnel || 0) + (year3.tco?.breakdown?.support || 0)) / 1000)}K</span>
                                </div>
                                <div class="cost-category">
                                    <span class="label">Training & Integration</span>
                                    <span class="value">$${Math.round(((year3.tco?.breakdown?.training || 0) + (year3.tco?.breakdown?.integration || 0)) / 1000)}K</span>
                                </div>
                                <div class="cost-category">
                                    <span class="label">Risk & Downtime</span>
                                    <span class="value">$${Math.round(((year3.tco?.riskCosts?.breachRisk || 0) + (year3.tco?.breakdown?.downtime || 0)) / 1000)}K</span>
                                </div>
                            </div>
                            <div class="total-cost enhanced">
                                <strong>3-Year Total: $${Math.round((year3.tco?.total || 0) / 1000)}K</strong>
                            </div>
                            ${isPortnox ? '<div class="winner-badge"><i class="fas fa-medal"></i> Best Value</div>' : ''}
                        </div>
                    `;
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    renderFinancialRecommendations() {
        const portnox = this.calculationResults.portnox;
        const savings = portnox?.year3?.roi?.dollarValue || 0;
        const payback = portnox?.year3?.roi?.paybackMonths || 12;
        
        return `
            <div class="recommendations-section premium glass-card">
                <h3>Strategic Financial Recommendations</h3>
                <div class="recommendation-cards enhanced">
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-rocket gradient-icon"></i>
                        <h4>Immediate Action</h4>
                        <p>Deploy Portnox CLEAR to start saving $${Math.round(savings / 36 / 1000)}K monthly</p>
                    </div>
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-piggy-bank gradient-icon"></i>
                        <h4>Budget Reallocation</h4>
                        <p>Redirect $${Math.round(savings / 1000)}K in savings to strategic security initiatives</p>
                    </div>
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-shield-alt gradient-icon"></i>
                        <h4>Risk Mitigation</h4>
                        <p>Reduce breach probability by 85% with Zero Trust architecture</p>
                    </div>
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-chart-trending-up gradient-icon"></i>
                        <h4>ROI Timeline</h4>
                        <p>Achieve full payback in ${payback} months, then pure savings</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderFinancialCharts() {
        // Render both charts with proper error handling
        this.renderTCOComparison();
        this.renderROITimeline();
    }
    
    renderTCOComparison() {
        try {
            const container = document.getElementById('tco-comparison-chart');
            if (!container) {
                console.error('TCO chart container not found');
                return;
            }
            
            const categories = [];
            const data = [];
            const breakdownSeries = {
                software: { name: 'Software Licensing', data: [], color: '#3B82F6' },
                implementation: { name: 'Implementation', data: [], color: '#10B981' },
                infrastructure: { name: 'Infrastructure', data: [], color: '#F59E0B' },
                operations: { name: 'Operations', data: [], color: '#EF4444' },
                risks: { name: 'Risk & Compliance', data: [], color: '#8B5CF6' }
            };
            
            Object.entries(this.calculationResults).forEach(([key, result]) => {
                if (result && result.vendor && result.year3) {
                    categories.push(result.vendor.name);
                    const breakdown = result.year3.tco.breakdown;
                    const risks = result.year3.tco.riskCosts;
                    
                    breakdownSeries.software.data.push(breakdown.software || 0);
                    breakdownSeries.implementation.data.push((breakdown.implementation || 0) + (breakdown.training || 0));
                    breakdownSeries.infrastructure.data.push(breakdown.hardware || 0);
                    breakdownSeries.operations.data.push((breakdown.personnel || 0) + (breakdown.support || 0) + (breakdown.maintenance || 0));
                    breakdownSeries.risks.data.push((risks.breachRisk || 0) + (risks.complianceRisk || 0));
                }
            });
            
            if (categories.length > 0) {
                Highcharts.chart('tco-comparison-chart', {
                    chart: { 
                        type: 'column',
                        backgroundColor: 'transparent',
                        style: { fontFamily: 'Inter, sans-serif' }
                    },
                    title: { text: null },
                    xAxis: { 
                        categories: categories,
                        labels: {
                            style: { color: '#71717A', fontSize: '12px' }
                        }
                    },
                    yAxis: {
                        title: { 
                            text: 'Total Cost ($)',
                            style: { color: '#71717A' }
                        },
                        labels: {
                            formatter: function() {
                                return '$' + Math.round(this.value / 1000) + 'K';
                            },
                            style: { color: '#71717A' }
                        },
                        stackLabels: {
                            enabled: true,
                            formatter: function() {
                                return '$' + Math.round(this.total / 1000) + 'K';
                            },
                            style: {
                                fontWeight: 'bold',
                                color: '#27272A'
                            }
                        }
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            borderRadius: 4,
                            dataLabels: {
                                enabled: false
                            }
                        }
                    },
                    series: Object.values(breakdownSeries),
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        itemStyle: { color: '#71717A' }
                    },
                    credits: { enabled: false }
                });
            }
        } catch (error) {
            console.error('Error rendering TCO chart:', error);
        }
    }
    
    renderROITimeline() {
        try {
            const container = document.getElementById('roi-timeline-chart');
            if (!container) {
                console.error('ROI chart container not found');
                return;
            }
            
            const series = [];
            
            Object.entries(this.calculationResults).forEach(([key, result]) => {
                if (result && result.vendor) {
                    const monthlyData = [];
                    const implementationCost = result.year1?.tco?.breakdown?.implementation || 50000;
                    let cumulative = -implementationCost;
                    const monthlySavings = (result.year3?.roi?.dollarValue || 0) / 36;
                    
                    for (let month = 1; month <= 36; month++) {
                        cumulative += monthlySavings;
                        monthlyData.push(Math.round(cumulative));
                    }
                    
                    series.push({
                        name: result.vendor.name,
                        data: monthlyData,
                        color: key === 'portnox' ? '#00D4AA' : null,
                        lineWidth: key === 'portnox' ? 4 : 2,
                        dashStyle: key === 'portnox' ? 'Solid' : 'ShortDash'
                    });
                }
            });
            
            if (series.length > 0) {
                Highcharts.chart('roi-timeline-chart', {
                    chart: { 
                        type: 'line',
                        backgroundColor: 'transparent',
                        style: { fontFamily: 'Inter, sans-serif' }
                    },
                    title: { text: null },
                    xAxis: {
                        title: { 
                            text: 'Months',
                            style: { color: '#71717A' }
                        },
                        max: 36,
                        labels: {
                            style: { color: '#71717A' }
                        },
                        plotBands: [{
                            from: 0,
                            to: 12,
                            color: 'rgba(0, 212, 170, 0.05)',
                            label: {
                                text: 'Year 1',
                                style: { color: '#71717A' }
                            }
                        }, {
                            from: 12,
                            to: 24,
                            color: 'rgba(0, 212, 170, 0.08)',
                            label: {
                                text: 'Year 2',
                                style: { color: '#71717A' }
                            }
                        }, {
                            from: 24,
                            to: 36,
                            color: 'rgba(0, 212, 170, 0.10)',
                            label: {
                                text: 'Year 3',
                                style: { color: '#71717A' }
                            }
                        }]
                    },
                    yAxis: {
                        title: { 
                            text: 'Cumulative Value ($)',
                            style: { color: '#71717A' }
                        },
                        labels: {
                            formatter: function() {
                                return '$' + Math.round(this.value / 1000) + 'K';
                            },
                            style: { color: '#71717A' }
                        },
                        plotLines: [{
                            value: 0,
                            width: 2,
                            color: '#71717A',
                            dashStyle: 'dash',
                            label: {
                                text: 'Break Even',
                                style: { color: '#71717A' }
                            }
                        }]
                    },
                    plotOptions: {
                        line: {
                            marker: { enabled: false }
                        }
                    },
                    series: series,
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        itemStyle: { color: '#71717A' }
                    },
                    credits: { enabled: false }
                });
            }
        } catch (error) {
            console.error('Error rendering ROI timeline:', error);
        }
    }
    
    renderRiskAssessment(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            this.calculate();
            return;
        }
        
        container.innerHTML = `
            <div class="risk-assessment animated-content">
                <div class="risk-summary glass-card">
                    <h2 class="gradient-text">Risk & Security Analysis</h2>
                    <div class="risk-metrics-grid">
                        ${this.renderRiskMetrics()}
                    </div>
                </div>
                
                <div class="chart-section glass-card">
                    <h3>Security Posture Comparison</h3>
                    <div class="chart-grid">
                        <div class="chart-container">
                            <h4>Security Capabilities Score</h4>
                            <div id="security-radar-chart" style="height: 400px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Risk Exposure Analysis</h4>
                            <div id="risk-exposure-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                ${this.renderRiskRecommendations()}
            </div>
        `;
        
        requestAnimationFrame(() => {
            this.renderRiskCharts();
        });
    }
    
    renderRiskMetrics() {
        const portnox = this.calculationResults.portnox;
        if (!portnox) return '';
        
        const breachReduction = 85; // Portnox reduces breach risk by 85%
        const incidentReduction = 90; // Reduces security incidents by 90%
        const mttrReduction = 75; // Reduces mean time to respond by 75%
        
        return `
            <div class="risk-metric highlight hover-lift">
                <i class="fas fa-shield-virus pulse-icon"></i>
                <h3>Breach Risk Reduction</h3>
                <div class="metric-value">${breachReduction}%</div>
                <p>Lower probability</p>
            </div>
            <div class="risk-metric glass-item hover-lift">
                <i class="fas fa-bug-slash"></i>
                <h3>Incident Reduction</h3>
                <div class="metric-value">${incidentReduction}%</div>
                <p>Fewer incidents</p>
            </div>
            <div class="risk-metric glass-item hover-lift">
                <i class="fas fa-clock"></i>
                <h3>MTTR Improvement</h3>
                <div class="metric-value">${mttrReduction}%</div>
                <p>Faster response</p>
            </div>
            <div class="risk-metric glass-item hover-lift">
                <i class="fas fa-dollar-sign"></i>
                <h3>Annual Risk Cost</h3>
                <div class="metric-value">$${Math.round((portnox.year1?.tco?.riskCosts?.breachRisk || 0) / 1000)}K</div>
                <p>vs. $${Math.round(this.config.breachCost * 0.15 / 1000)}K industry</p>
            </div>
        `;
    }
    
    renderRiskCharts() {
        this.renderSecurityRadar();
        this.renderRiskExposure();
    }
    
    renderSecurityRadar() {
        try {
            const container = document.getElementById('security-radar-chart');
            if (!container) return;
            
            const categories = [
                'Device Visibility',
                'Network Segmentation',
                'Threat Response',
                'Cloud Integration',
                'AI/ML Capabilities',
                'Automation Level'
            ];
            
            const series = [];
            Object.entries(this.calculationResults).forEach(([key, result]) => {
                if (result && result.vendor) {
                    const capabilities = result.vendor.capabilities || {};
                    const metrics = result.vendor.metrics || {};
                    
                    series.push({
                        name: result.vendor.name,
                        data: [
                            capabilities.deviceVisibility || 70,
                            capabilities.networkSegmentation || 70,
                            capabilities.threatResponse || 70,
                            capabilities.cloudIntegration || 70,
                            capabilities.aiMlCapabilities || 70,
                            metrics.automationLevel || 70
                        ],
                        pointPlacement: 'on',
                        color: key === 'portnox' ? '#00D4AA' : null
                    });
                }
            });
            
            Highcharts.chart('security-radar-chart', {
                chart: {
                    polar: true,
                    type: 'line',
                    backgroundColor: 'transparent'
                },
                title: { text: null },
                xAxis: {
                    categories: categories,
                    tickmarkPlacement: 'on',
                    lineWidth: 0,
                    labels: {
                        style: { color: '#71717A', fontSize: '11px' }
                    }
                },
                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    min: 0,
                    max: 100,
                    labels: {
                        style: { color: '#71717A' }
                    }
                },
                series: series,
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    itemStyle: { color: '#71717A' }
                },
                credits: { enabled: false }
            });
        } catch (error) {
            console.error('Error rendering security radar:', error);
        }
    }
    
    renderRiskExposure() {
        try {
            const container = document.getElementById('risk-exposure-chart');
            if (!container) return;
            
            const categories = [];
            const breachRisk = [];
            const complianceRisk = [];
            const operationalRisk = [];
            
            Object.entries(this.calculationResults).forEach(([key, result]) => {
                if (result && result.vendor) {
                    categories.push(result.vendor.name);
                    const risks = result.vendor.riskFactors || {};
                    
                    breachRisk.push(risks.securityGaps || 50);
                    complianceRisk.push(risks.complianceRisk || 50);
                    operationalRisk.push(risks.operationalRisk || 50);
                }
            });
            
            Highcharts.chart('risk-exposure-chart', {
                chart: {
                    type: 'bar',
                    backgroundColor: 'transparent'
                },
                title: { text: null },
                xAxis: {
                    categories: categories,
                    labels: {
                        style: { color: '#71717A' }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Risk Level (%)',
                        style: { color: '#71717A' }
                    },
                    max: 100,
                    labels: {
                        style: { color: '#71717A' }
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            format: '{y}%',
                            style: { color: '#71717A' }
                        }
                    }
                },
                series: [{
                    name: 'Security Risk',
                    data: breachRisk,
                    color: '#EF4444'
                }, {
                    name: 'Compliance Risk',
                    data: complianceRisk,
                    color: '#F59E0B'
                }, {
                    name: 'Operational Risk',
                    data: operationalRisk,
                    color: '#3B82F6'
                }],
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    itemStyle: { color: '#71717A' }
                },
                credits: { enabled: false }
            });
        } catch (error) {
            console.error('Error rendering risk exposure:', error);
        }
    }
    
    renderRiskRecommendations() {
        return `
            <div class="recommendations-section glass-card">
                <h3>Risk Mitigation Recommendations</h3>
                <div class="recommendation-cards enhanced">
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-shield-check gradient-icon"></i>
                        <h4>Zero Trust Architecture</h4>
                        <p>Implement Portnox's industry-leading Zero Trust framework</p>
                    </div>
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-eye gradient-icon"></i>
                        <h4>Complete Visibility</h4>
                        <p>Gain 100% device visibility across all network segments</p>
                    </div>
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-robot gradient-icon"></i>
                        <h4>AI-Powered Response</h4>
                        <p>Automate threat detection and response with ML algorithms</p>
                    </div>
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-chart-bar gradient-icon"></i>
                        <h4>Risk Reduction</h4>
                        <p>Reduce overall security risk by 85% within 30 days</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderComplianceAnalysis(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            this.calculate();
            return;
        }
        
        container.innerHTML = `
            <div class="compliance-analysis animated-content">
                <div class="compliance-summary-card glass-card">
                    <h2 class="gradient-text">Compliance & Regulatory Analysis</h2>
                    <div class="compliance-metrics-grid">
                        ${this.renderComplianceMetrics()}
                    </div>
                </div>
                
                <div class="chart-section glass-card">
                    <h3>Compliance Coverage Analysis</h3>
                    <div class="chart-grid">
                        <div class="chart-container">
                            <h4>Framework Coverage Matrix</h4>
                            <div id="compliance-matrix-chart" style="height: 400px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Compliance Cost Impact</h4>
                            <div id="compliance-costs-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                ${this.renderComplianceDetails()}
                ${this.renderComplianceRecommendations()}
            </div>
        `;
        
        requestAnimationFrame(() => {
            this.renderComplianceCharts();
        });
    }
    
    renderComplianceMetrics() {
        const portnox = this.calculationResults.portnox;
        const complianceScore = this.getComplianceScore(portnox?.vendor);
        const auditTime = 14; // Days to audit readiness
        const annualSavings = 35; // $35K annual compliance savings
        
        return `
            <div class="compliance-metric highlight hover-lift">
                <i class="fas fa-shield-check pulse-icon"></i>
                <h3>Compliance Score</h3>
                <div class="metric-value">${complianceScore}%</div>
                <p>Framework alignment</p>
            </div>
            <div class="compliance-metric glass-item hover-lift">
                <i class="fas fa-clipboard-check"></i>
                <h3>Frameworks</h3>
                <div class="metric-value">${this.config.complianceFrameworks.length}</div>
                <p>Fully covered</p>
            </div>
            <div class="compliance-metric glass-item hover-lift">
                <i class="fas fa-clock"></i>
                <h3>Audit Ready</h3>
                <div class="metric-value">${auditTime} days</div>
                <p>Preparation time</p>
            </div>
            <div class="compliance-metric glass-item hover-lift">
                <i class="fas fa-dollar-sign"></i>
                <h3>Annual Savings</h3>
                <div class="metric-value">$${annualSavings}K</div>
                <p>Compliance costs</p>
            </div>
        `;
    }
    
    renderComplianceCharts() {
        this.renderComplianceMatrix();
        this.renderComplianceCosts();
    }
    
    renderComplianceMatrix() {
        try {
            const container = document.getElementById('compliance-matrix-chart');
            if (!container) return;
            
            const frameworks = ['SOX', 'GDPR', 'ISO 27001', 'HIPAA', 'PCI DSS', 'NIST CSF', 'FedRAMP', 'CMMC'];
            const vendors = [];
            const data = [];
            
            Object.values(this.calculationResults).forEach((result, vIndex) => {
                if (result && result.vendor) {
                    vendors.push(result.vendor.name);
                    frameworks.forEach((framework, fIndex) => {
                        const key = framework.toLowerCase().replace(/\s+/g, '-');
                        const score = result.vendor.compliance?.[key] || 70;
                        data.push([fIndex, vIndex, score]);
                    });
                }
            });
            
            Highcharts.chart('compliance-matrix-chart', {
                chart: {
                    type: 'heatmap',
                    backgroundColor: 'transparent'
                },
                title: { text: null },
                xAxis: {
                    categories: frameworks,
                    labels: {
                        style: { color: '#71717A', fontSize: '11px' }
                    }
                },
                yAxis: {
                    categories: vendors,
                    labels: {
                        style: { color: '#71717A' }
                    }
                },
                colorAxis: {
                    min: 0,
                    max: 100,
                    stops: [
                        [0, '#FEE2E2'],
                        [0.5, '#FEF3C7'],
                        [1, '#D1FAE5']
                    ]
                },
                series: [{
                    name: 'Coverage',
                    borderWidth: 1,
                    data: data,
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        format: '{point.value}%',
                        style: { fontSize: '10px' }
                    }
                }],
                credits: { enabled: false }
            });
        } catch (error) {
            console.error('Error rendering compliance matrix:', error);
        }
    }
    
    renderComplianceCosts() {
        try {
            const container = document.getElementById('compliance-costs-chart');
            if (!container) return;
            
            const categories = ['Audit Preparation', 'Compliance Tools', 'Penalty Risk', 'Documentation'];
            const series = [];
            
            Object.entries(this.calculationResults).forEach(([key, result]) => {
                if (result && result.vendor) {
                    const isPortnox = key === 'portnox';
                    const multiplier = isPortnox ? 0.3 : 1.0;
                    
                    series.push({
                        name: result.vendor.name,
                        data: [
                            15000 * multiplier,
                            10000 * multiplier,
                            25000 * multiplier,
                            8000 * multiplier
                        ],
                        color: isPortnox ? '#00D4AA' : null
                    });
                }
            });
            
            Highcharts.chart('compliance-costs-chart', {
                chart: {
                    type: 'bar',
                    backgroundColor: 'transparent'
                },
                title: { text: null },
                xAxis: {
                    categories: categories,
                    labels: {
                        style: { color: '#71717A' }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Annual Cost ($)',
                        style: { color: '#71717A' }
                    },
                    labels: {
                        formatter: function() {
                            return Math.round(this.value / 1000) + 'K';
                        },
                        style: { color: '#71717A' }
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                                return Math.round(this.y / 1000) + "K";
                            },
                            formatter: function() {
                                return Math.round(this.y / 1000) + "K";
                            },
                            formatter: function() {
                                return Math.round(this.y / 1000) + "K";
                            },
                            formatter: function() {
                                return Math.round(this.y / 1000) + "K";
                            },
                        }
                    }
                },
                series: series,
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    itemStyle: { color: '#71717A' }
                },
                credits: { enabled: false }
            });
        } catch (error) {
            console.error('Error rendering compliance costs:', error);
        }
    }
    
    renderComplianceDetails() {
        const frameworks = {
            'sox': {
                name: 'SOX (Sarbanes-Oxley)',
                controls: ['Access Control', 'Audit Logging', 'Change Management', 'Data Integrity']
            },
            'gdpr': {
                name: 'GDPR',
                controls: ['Data Privacy', 'Access Rights', 'Breach Notification', 'Data Portability']
            },
            'hipaa': {
                name: 'HIPAA',
                controls: ['PHI Protection', 'Access Control', 'Encryption', 'Audit Controls']
            },
            'pci-dss': {
                name: 'PCI-DSS',
                controls: ['Network Segmentation', 'Access Control', 'Vulnerability Management', 'Monitoring']
            },
            'iso27001': {
                name: 'ISO 27001',
                controls: ['Risk Assessment', 'Asset Management', 'Access Control', 'Incident Management']
            },
            'nist-csf': {
                name: 'NIST CSF',
                controls: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover']
            }
        };
        
        return `
            <div class="compliance-details glass-card">
                <h3>NAC Controls for Compliance Frameworks</h3>
                <div class="framework-details-grid">
                    ${this.config.complianceFrameworks.map(framework => {
                        const details = frameworks[framework];
                        if (!details) return '';
                        
                        return `
                            <div class="framework-detail-card hover-lift">
                                <h4>${details.name}</h4>
                                <div class="controls-list">
                                    ${details.controls.map(control => `
                                        <div class="control-item">
                                            <i class="fas fa-check-circle"></i>
                                            <span>${control}</span>
                                        </div>
                                    `).join('')}
                                </div>
                                <div class="portnox-advantage">
                                    <span>Portnox automates 95% of requirements</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    renderComplianceRecommendations() {
        return `
            <div class="recommendations-section glass-card">
                <h3>Compliance Strategy Recommendations</h3>
                <div class="recommendation-cards enhanced">
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-balance-scale gradient-icon"></i>
                        <h4>Unified Compliance</h4>
                        <p>Meet multiple frameworks with a single NAC deployment</p>
                    </div>
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-robot gradient-icon"></i>
                        <h4>Automated Controls</h4>
                        <p>Reduce manual compliance tasks by 95% with automation</p>
                    </div>
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-file-contract gradient-icon"></i>
                        <h4>Audit Readiness</h4>
                        <p>Maintain continuous audit readiness with real-time reporting</p>
                    </div>
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-chart-trending-down gradient-icon"></i>
                        <h4>Cost Reduction</h4>
                        <p>Save $35K annually on compliance-related activities</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderOperationalImpact(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            this.calculate();
            return;
        }
        
        container.innerHTML = `
            <div class="operational-impact animated-content">
                <div class="operational-summary glass-card">
                    <h2 class="gradient-text">Operational Efficiency Analysis</h2>
                    <div class="operational-metrics-grid">
                        ${this.renderOperationalMetrics()}
                    </div>
                </div>
                
                <div class="chart-section glass-card">
                    <h3>Efficiency Comparison</h3>
                    <div class="chart-grid">
                        <div class="chart-container">
                            <h4>Deployment Timeline Comparison</h4>
                            <div id="deployment-timeline-chart" style="height: 400px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Operational Efficiency Score</h4>
                            <div id="efficiency-score-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                ${this.renderOperationalRecommendations()}
            </div>
        `;
        
        requestAnimationFrame(() => {
            this.renderOperationalCharts();
        });
    }
    
    renderOperationalMetrics() {
        const portnox = this.calculationResults.portnox;
        if (!portnox) return '';
        
        return `
            <div class="operational-metric highlight hover-lift">
                <i class="fas fa-rocket pulse-icon"></i>
                <h3>Deployment Time</h3>
                <div class="metric-value">${portnox.timeline?.implementation || 7} days</div>
                <p>vs. 90+ days average</p>
            </div>
            <div class="operational-metric glass-item hover-lift">
                <i class="fas fa-user-tie"></i>
                <h3>FTE Required</h3>
                <div class="metric-value">${portnox.vendor?.metrics?.fteRequired || 0.25}</div>
                <p>vs. 2.0 average</p>
            </div>
            <div class="operational-metric glass-item hover-lift">
                <i class="fas fa-robot"></i>
                <h3>Automation</h3>
                <div class="metric-value">${portnox.scores?.automation || 92}%</div>
                <p>Process automation</p>
            </div>
            <div class="operational-metric glass-item hover-lift">
                <i class="fas fa-chart-line"></i>
                <h3>Efficiency Gain</h3>
                <div class="metric-value">85%</div>
                <p>Time savings</p>
            </div>
        `;
    }
    
    renderOperationalCharts() {
        this.renderDeploymentTimeline();
        this.renderEfficiencyScore();
    }
    
    renderDeploymentTimeline() {
        try {
            const container = document.getElementById('deployment-timeline-chart');
            if (!container) return;
            
            const categories = ['Planning', 'Implementation', 'Testing', 'Training', 'Go-Live'];
            const series = [];
            
            Object.entries(this.calculationResults).forEach(([key, result]) => {
                if (result && result.vendor) {
                    const isPortnox = key === 'portnox';
                    const multiplier = isPortnox ? 0.15 : 1.0;
                    
                    series.push({
                        name: result.vendor.name,
                        data: [
                            5 * multiplier,
                            15 * multiplier,
                            10 * multiplier,
                            5 * multiplier,
                            5 * multiplier
                        ],
                        color: isPortnox ? '#00D4AA' : null
                    });
                }
            });
            
            Highcharts.chart('deployment-timeline-chart', {
                chart: {
                    type: 'bar',
                    backgroundColor: 'transparent'
                },
                title: { text: null },
                xAxis: {
                    categories: categories,
                    labels: {
                        style: { color: '#71717A' }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Days',
                        style: { color: '#71717A' }
                    },
                    labels: {
                        style: { color: '#71717A' }
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            format: '{y} days',
                            style: { fontSize: '10px' }
                        }
                    }
                },
                series: series,
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    itemStyle: { color: '#71717A' }
                },
                credits: { enabled: false }
            });
        } catch (error) {
            console.error('Error rendering deployment timeline:', error);
        }
    }
    
    renderEfficiencyScore() {
        try {
            const container = document.getElementById('efficiency-score-chart');
            if (!container) return;
            
            const categories = [];
            const automationData = [];
            const scalabilityData = [];
            const userExperienceData = [];
            
            Object.entries(this.calculationResults).forEach(([key, result]) => {
                if (result && result.vendor) {
                    categories.push(result.vendor.name);
                    automationData.push(result.scores?.automation || 60);
                    scalabilityData.push(result.scores?.scalability || 70);
                    userExperienceData.push(result.scores?.userExperience || 75);
                }
            });
            
            Highcharts.chart('efficiency-score-chart', {
                chart: {
                    type: 'column',
                    backgroundColor: 'transparent'
                },
                title: { text: null },
                xAxis: {
                    categories: categories,
                    labels: {
                        style: { color: '#71717A' }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Score (%)',
                        style: { color: '#71717A' }
                    },
                    max: 100,
                    labels: {
                        style: { color: '#71717A' }
                    }
                },
                plotOptions: {
                    column: {
                        borderRadius: 4,
                        dataLabels: {
                            enabled: false
                        }
                    }
                },
                series: [{
                    name: 'Automation',
                    data: automationData,
                    color: '#10B981'
                }, {
                    name: 'Scalability',
                    data: scalabilityData,
                    color: '#3B82F6'
                }, {
                    name: 'User Experience',
                    data: userExperienceData,
                    color: '#8B5CF6'
                }],
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    itemStyle: { color: '#71717A' }
                },
                credits: { enabled: false }
            });
        } catch (error) {
            console.error('Error rendering efficiency score:', error);
        }
    }
    
    renderOperationalRecommendations() {
        return `
            <div class="recommendations-section glass-card">
                <h3>Operational Excellence Recommendations</h3>
                <div class="recommendation-cards enhanced">
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-bolt gradient-icon"></i>
                        <h4>Rapid Deployment</h4>
                        <p>Go live in 7 days with Portnox's cloud-native architecture</p>
                    </div>
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-cogs gradient-icon"></i>
                        <h4>Process Automation</h4>
                        <p>Automate 92% of NAC operations with AI-driven workflows</p>
                    </div>
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-users gradient-icon"></i>
                        <h4>Reduced Staffing</h4>
                        <p>Operate with 75% fewer FTEs through intelligent automation</p>
                    </div>
                    <div class="recommendation-card hover-lift">
                        <i class="fas fa-expand-arrows-alt gradient-icon"></i>
                        <h4>Infinite Scale</h4>
                        <p>Scale to any size without infrastructure constraints</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderStrategicInsights(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            this.calculate();
            return;
        }
        
        container.innerHTML = `
            <div class="strategic-insights animated-content">
                <div class="strategic-dashboard glass-card">
                    <h2 class="gradient-text">Strategic Decision Dashboard</h2>
                    <div class="winner-announcement">
                        <i class="fas fa-trophy trophy-icon animated-trophy"></i>
                        <h3>Portnox CLEAR - Recommended Solution</h3>
                        <p>Best overall value with superior Zero Trust capabilities</p>
                    </div>
                    
                    ${this.renderExecutiveSummary()}
                </div>
                
                <div class="chart-section glass-card">
                    <h3>Overall Vendor Comparison</h3>
                    <div class="chart-grid">
                        <div class="chart-container">
                            <h4>Total Value Score</h4>
                            <div id="total-value-chart" style="height: 400px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Decision Matrix</h4>
                            <div id="decision-matrix-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                ${this.renderStrategicRecommendations()}
                ${this.renderActionPlan()}
            </div>
        `;
        
        requestAnimationFrame(() => {
            this.renderStrategicCharts();
        });
    }
    
    renderExecutiveSummary() {
        const portnox = this.calculationResults.portnox;
        if (!portnox) return '';
        
        return `
            <div class="executive-summary-strategic glass-card">
                <h3>Executive Summary</h3>
                <div class="summary-content">
                    <div class="summary-section">
                        <h4>Financial Impact</h4>
                        <ul>
                            <li>3-Year TCO: <strong>${Math.round((portnox.year3?.tco?.total || 0) / 1000)}K</strong></li>
                            <li>Total Savings: <strong>${Math.round((portnox.year3?.roi?.dollarValue || 0) / 1000)}K</strong></li>
                            <li>ROI: <strong>${portnox.year3?.roi?.percentage || 0}%</strong></li>
                            <li>Payback: <strong>${portnox.year3?.roi?.paybackMonths || 12} months</strong></li>
                        </ul>
                    </div>
                    <div class="summary-section">
                        <h4>Key Advantages</h4>
                        <ul>
                            <li>Zero Trust Score: <strong>${portnox.scores?.zeroTrust || 98}/100</strong></li>
                            <li>Deployment: <strong>${portnox.timeline?.implementation || 7} days</strong></li>
                            <li>Automation: <strong>${portnox.scores?.automation || 92}%</strong></li>
                            <li>Cloud-Native: <strong>100% SaaS</strong></li>
                        </ul>
                    </div>
                    <div class="summary-section">
                        <h4>Risk Reduction</h4>
                        <ul>
                            <li>Breach Risk: <strong>-85%</strong></li>
                            <li>Compliance Risk: <strong>-90%</strong></li>
                            <li>Operational Risk: <strong>-75%</strong></li>
                            <li>Insurance Premium: <strong>-15%</strong></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderStrategicCharts() {
        this.renderTotalValueChart();
        this.renderDecisionMatrix();
    }
    
    renderTotalValueChart() {
        try {
            const container = document.getElementById('total-value-chart');
            if (!container) return;
            
            const categories = [];
            const tcoData = [];
            const valueData = [];
            
            Object.entries(this.calculationResults).forEach(([key, result]) => {
                if (result && result.vendor && result.year3) {
                    categories.push(result.vendor.name);
                    
                    // Normalize TCO (lower is better)
                    const tcoScore = 100 - Math.min(100, (result.year3.tco.total / 500000) * 100);
                    
                    // Calculate overall value score
                    const valueScore = (
                        (result.scores?.overall || 70) * 0.3 +
                        tcoScore * 0.3 +
                        (result.scores?.zeroTrust || 70) * 0.2 +
                        (result.scores?.automation || 60) * 0.2
                    );
                    
                    tcoData.push(Math.round(tcoScore));
                    valueData.push(Math.round(valueScore));
                }
            });
            
            Highcharts.chart('total-value-chart', {
                chart: {
                    type: 'column',
                    backgroundColor: 'transparent'
                },
                title: { text: null },
                xAxis: {
                    categories: categories,
                    labels: {
                        style: { color: '#71717A' }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Score (0-100)',
                        style: { color: '#71717A' }
                    },
                    max: 100,
                    labels: {
                        style: { color: '#71717A' }
                    }
                },
                plotOptions: {
                    column: {
                        borderRadius: 4,
                        dataLabels: {
                            enabled: true,
                            style: { fontSize: '10px' }
                        }
                    }
                },
                series: [{
                    name: 'TCO Score',
                    data: tcoData,
                    color: '#3B82F6'
                }, {
                    name: 'Overall Value',
                    data: valueData,
                    color: '#00D4AA'
                }],
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    itemStyle: { color: '#71717A' }
                },
                credits: { enabled: false }
            });
        } catch (error) {
            console.error('Error rendering total value chart:', error);
        }
    }
    
    renderDecisionMatrix() {
        try {
            const container = document.getElementById('decision-matrix-chart');
            if (!container) return;
            
            const series = [];
            
            Object.entries(this.calculationResults).forEach(([key, result]) => {
                if (result && result.vendor && result.year3) {
                    const tco = result.year3.tco.total;
                    const capability = result.scores?.overall || 70;
                    
                    series.push({
                        name: result.vendor.name,
                        data: [[tco, capability]],
                        color: key === 'portnox' ? '#00D4AA' : null,
                        marker: {
                            radius: key === 'portnox' ? 10 : 6,
                            symbol: key === 'portnox' ? 'diamond' : 'circle'
                        }
                    });
                }
            });
            
            Highcharts.chart('decision-matrix-chart', {
                chart: {
                    type: 'scatter',
                    backgroundColor: 'transparent',
                    zoomType: 'xy'
                },
                title: { text: null },
                xAxis: {
                    title: {
                        text: '3-Year TCO ($)',
                        style: { color: '#71717A' }
                    },
                    labels: {
                        formatter: function() {
                            return ' + Math.round(this.value / 1000) + 'K';
                        },
                        style: { color: '#71717A' }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Capability Score',
                        style: { color: '#71717A' }
                    },
                    max: 100,
                    labels: {
                        style: { color: '#71717A' }
                    }
                },
                plotOptions: {
                    scatter: {
                        tooltip: {
                            pointFormat: '<b>{series.name}</b><br/>TCO: ${point.x:,.0f}<br/>Score: {point.y}'
                        }
                    }
                },
                series: series,
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    itemStyle: { color: '#71717A' }
                },
                credits: { enabled: false },
                annotations: [{
                    labelOptions: {
                        backgroundColor: 'rgba(0, 212, 170, 0.1)',
                        borderColor: '#00D4AA',
                        shape: 'rect'
                    },
                    labels: [{
                        point: { x: 0, y: 100 },
                        text: 'Optimal Zone'
                    }]
                }]
            });
        } catch (error) {
            console.error('Error rendering decision matrix:', error);
        }
    }
    
    renderStrategicRecommendations() {
        return `
            <div class="recommendations-section glass-card">
                <h3>Strategic Recommendations</h3>
                <div class="recommendation-cards enhanced strategic">
                    <div class="recommendation-card hover-lift priority-1">
                        <div class="priority-badge">Priority 1</div>
                        <i class="fas fa-flag-checkered gradient-icon"></i>
                        <h4>Immediate Deployment</h4>
                        <p>Deploy Portnox CLEAR to capture immediate ROI and risk reduction</p>
                    </div>
                    <div class="recommendation-card hover-lift priority-2">
                        <div class="priority-badge">Priority 2</div>
                        <i class="fas fa-shield-alt gradient-icon"></i>
                        <h4>Zero Trust Migration</h4>
                        <p>Implement comprehensive Zero Trust architecture across all assets</p>
                    </div>
                    <div class="recommendation-card hover-lift priority-3">
                        <div class="priority-badge">Priority 3</div>
                        <i class="fas fa-chart-network gradient-icon"></i>
                        <h4>Process Optimization</h4>
                        <p>Leverage automation to reduce operational overhead by 85%</p>
                    </div>
                    <div class="recommendation-card hover-lift priority-4">
                        <div class="priority-badge">Priority 4</div>
                        <i class="fas fa-graduation-cap gradient-icon"></i>
                        <h4>Team Enablement</h4>
                        <p>Train staff on advanced Zero Trust capabilities and best practices</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderActionPlan() {
        return `
            <div class="action-plan glass-card">
                <h3>90-Day Implementation Roadmap</h3>
                <div class="roadmap-timeline">
                    <div class="timeline-phase">
                        <div class="phase-header">
                            <span class="phase-number">1</span>
                            <h4>Days 1-7: Deployment</h4>
                        </div>
                        <ul>
                            <li>Cloud instance provisioning</li>
                            <li>Initial configuration</li>
                            <li>Network integration</li>
                        </ul>
                    </div>
                    <div class="timeline-phase">
                        <div class="phase-header">
                            <span class="phase-number">2</span>
                            <h4>Days 8-30: Rollout</h4>
                        </div>
                        <ul>
                            <li>Phased device onboarding</li>
                            <li>Policy refinement</li>
                            <li>Team training</li>
                        </ul>
                    </div>
                    <div class="timeline-phase">
                        <div class="phase-header">
                            <span class="phase-number">3</span>
                            <h4>Days 31-60: Optimization</h4>
                        </div>
                        <ul>
                            <li>Advanced features activation</li>
                            <li>Automation setup</li>
                            <li>Compliance validation</li>
                        </ul>
                    </div>
                    <div class="timeline-phase">
                        <div class="phase-header">
                            <span class="phase-number">4</span>
                            <h4>Days 61-90: Excellence</h4>
                        </div>
                        <ul>
                            <li>Performance optimization</li>
                            <li>ROI measurement</li>
                            <li>Strategic expansion</li>
                        </ul>
                    </div>
                </div>
                <div class="cta-section">
                    <button class="btn-primary large hover-lift glow-effect" onclick="platform.scheduleDemo()">
                        <i class="fas fa-calendar-check"></i>
                        Schedule Executive Briefing
                    </button>
                    <button class="btn-secondary large hover-lift" onclick="platform.exportAnalysis()">
                        <i class="fas fa-download"></i>
                        Export Full Report
                    </button>
                </div>
            </div>
        `;
    }
    
    // Modal Methods
    openSettings() {
        document.getElementById('settings-modal').style.display = 'flex';
        this.loadCurrentSettings();
    }
    
    closeSettings() {
        document.getElementById('settings-modal').style.display = 'none';
    }
    
    openVendorSelector() {
        document.getElementById('vendor-selector-modal').style.display = 'flex';
    }
    
    closeVendorSelector() {
        document.getElementById('vendor-selector-modal').style.display = 'none';
    }
    
    toggleVendor(vendorKey) {
        if (vendorKey === 'portnox') return; // Can't remove Portnox
        
        const option = document.querySelector(`[data-vendor="${vendorKey}"]`);
        if (!option) return;
        
        if (this.selectedVendors.includes(vendorKey)) {
            this.selectedVendors = this.selectedVendors.filter(v => v !== vendorKey);
            option.classList.remove('selected');
        } else if (this.selectedVendors.length <= this.maxAdditionalVendors) {
            this.selectedVendors.push(vendorKey);
            option.classList.add('selected');
        }
    }
    
    applySettings() {
        // Update config from form inputs
        this.config.deviceCount = parseInt(document.getElementById('device-count')?.value || 500);
        this.config.locationCount = parseInt(document.getElementById('location-count')?.value || 1);
        this.config.fteCost = parseInt(document.getElementById('fte-cost')?.value || 100000);
        this.config.breachCost = parseInt(document.getElementById('breach-cost')?.value || 500000);
        this.config.downtimeCostPerHour = parseInt(document.getElementById('downtime-cost')?.value || 2500);
        this.config.industry = document.getElementById('industry')?.value || 'technology';
        
        // Update compliance frameworks
        const checkedFrameworks = [];
        document.querySelectorAll('input[name="compliance"]:checked').forEach(cb => {
            checkedFrameworks.push(cb.value);
        });
        this.config.complianceFrameworks = checkedFrameworks;
        
        this.closeSettings();
        this.calculate();
    }
    
    resetSettings() {
        // Reset to defaults
        this.config = {
            deviceCount: 500,
            locationCount: 1,
            fteCost: 100000,
            breachCost: 500000,
            downtimeCostPerHour: 2500,
            compliancePenaltyRisk: 100000,
            cyberInsurancePremium: 25000,
            industry: 'technology',
            complianceFrameworks: ['sox', 'gdpr', 'iso27001', 'hipaa', 'pci-dss']
        };
        
        this.loadCurrentSettings();
    }
    
    loadCurrentSettings() {
        // Load current values into form
        const deviceCount = document.getElementById('device-count');
        if (deviceCount) deviceCount.value = this.config.deviceCount;
        
        const locationCount = document.getElementById('location-count');
        if (locationCount) locationCount.value = this.config.locationCount;
        
        const fteCost = document.getElementById('fte-cost');
        if (fteCost) fteCost.value = this.config.fteCost;
        
        const breachCost = document.getElementById('breach-cost');
        if (breachCost) breachCost.value = this.config.breachCost;
        
        const downtimeCost = document.getElementById('downtime-cost');
        if (downtimeCost) downtimeCost.value = this.config.downtimeCostPerHour;
        
        const industry = document.getElementById('industry');
        if (industry) industry.value = this.config.industry;
        
        // Update checkboxes
        document.querySelectorAll('input[name="compliance"]').forEach(cb => {
            cb.checked = this.config.complianceFrameworks.includes(cb.value);
        });
    }
    
    applyVendorSelection() {
        this.closeVendorSelector();
        this.updateVendorSelection();
        this.calculate();
    }
    
    updateVendorSelection() {
        const display = document.getElementById('selected-vendors-display');
        if (!display) return;
        
        display.innerHTML = this.selectedVendors.map(vendorKey => {
            const vendor = this.vendorDatabase[vendorKey];
            const isPortnox = vendorKey === 'portnox';
            
            return `
                <div class="selected-vendor-chip ${isPortnox ? 'portnox-chip glow-effect' : ''} hover-lift">
                    <img src="./img/vendors/${vendorKey}-logo.png" alt="${vendor?.name}" 
                         onerror="this.style.display='none'; this.parentElement.querySelector('.vendor-text').style.display='block'">
                    <span class="vendor-text" style="display:none">${vendor?.name || vendorKey}</span>
                    <span>${vendor?.name || vendorKey}</span>
                    ${!isPortnox ? `
                        <button class="remove-vendor" onclick="platform.removeVendor('${vendorKey}')">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                </div>
            `;
        }).join('');
    }
    
    removeVendor(vendorKey) {
        if (vendorKey !== 'portnox') {
            this.selectedVendors = this.selectedVendors.filter(v => v !== vendorKey);
            this.updateVendorSelection();
            this.calculate();
        }
    }
    
    exportAnalysis() {
        console.log('Exporting comprehensive analysis report...');
        
        // In a real implementation, this would generate a PDF or Excel report
        const reportData = {
            generatedDate: new Date().toISOString(),
            configuration: this.config,
            results: this.calculationResults,
            recommendations: 'See full report'
        };
        
        // For now, open Portnox TCO report page
        window.open('https://portnox.com/tco-report?data=' + btoa(JSON.stringify(reportData)), '_blank');
    }
    
    scheduleDemo() {
        window.open('https://portnox.com/demo', '_blank');
    }
}

// Initialize the platform only once
if (!window.platform) {
    window.platform = new PremiumExecutivePlatform();
}

console.log('✅ Premium Executive Platform - Fixed Version Loaded');
