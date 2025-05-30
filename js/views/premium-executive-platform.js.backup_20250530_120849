/**
 * Premium Executive Platform
 * Advanced TCO/ROI Analysis with Deep Financial Insights
 */

class PremiumExecutivePlatform {
    constructor() {
        // Portnox selected by default + up to 3 others
        this.selectedVendors = ['portnox'];  // Portnox always selected
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
            annualBreachProbability: 0.23,  // Industry average 23%
            complianceAuditFrequency: 2,    // Audits per year
            acceptableDowntimeHours: 4,     // Per year
            
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
        console.log('🚀 Initializing Premium Executive Platform');
        this.setupPremiumUI();
        this.bindEvents();
        this.updateVendorSelection();
        this.calculate(); // Auto-calculate with Portnox
    }
    
    setupPremiumUI() {
        const app = document.getElementById('app-container') || document.body;
        app.innerHTML = `
            <div class="premium-platform">
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
                            <button class="control-btn demo" onclick="platform.scheduleDemo()">
                                <i class="fas fa-calendar-check"></i>
                                <span>Schedule Demo</span>
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
                        <button class="nav-tab" data-tab="strategic-insights">
                            <i class="fas fa-lightbulb"></i>
                            <span>Strategic Insights</span>
                            <span class="tab-subtitle">Recommendations</span>
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
                                <!-- Basic Configuration -->
                                <div class="settings-section">
                                    <h3><i class="fas fa-building"></i> Organization Profile</h3>
                                    <div class="setting-group">
                                        <label>
                                            Number of Devices
                                            <span class="info-tip" title="Total devices requiring NAC management">ⓘ</span>
                                        </label>
                                        <input type="range" id="devices-slider" min="100" max="10000" value="500" step="100">
                                        <input type="number" id="devices-input" value="500" min="100" max="10000">
                                    </div>
                                    <div class="setting-group">
                                        <label>
                                            Number of Locations
                                            <span class="info-tip" title="Physical sites requiring deployment">ⓘ</span>
                                        </label>
                                        <input type="range" id="locations-slider" min="1" max="100" value="1">
                                        <input type="number" id="locations-input" value="1" min="1" max="100">
                                    </div>
                                    <div class="setting-group">
                                        <label>
                                            Industry
                                            <span class="info-tip" title="Your industry affects risk and compliance requirements">ⓘ</span>
                                        </label>
                                        <select id="industry-select">
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
                                
                                <!-- Financial Parameters -->
                                <div class="settings-section">
                                    <h3><i class="fas fa-dollar-sign"></i> Financial Parameters</h3>
                                    <div class="setting-group">
                                        <label>
                                            Annual FTE Cost
                                            <span class="info-tip" title="Fully loaded cost per IT staff member">ⓘ</span>
                                        </label>
                                        <div class="currency-input">
                                            <span>$</span>
                                            <input type="number" id="fte-cost-input" value="100000" step="5000">
                                        </div>
                                    </div>
                                    <div class="setting-group">
                                        <label>
                                            Average Breach Cost
                                            <span class="info-tip" title="Estimated cost of a security breach">ⓘ</span>
                                        </label>
                                        <div class="currency-input">
                                            <span>$</span>
                                            <input type="number" id="breach-cost-input" value="4350000" step="100000">
                                        </div>
                                    </div>
                                    <div class="setting-group">
                                        <label>
                                            Downtime Cost per Hour
                                            <span class="info-tip" title="Business impact of system unavailability">ⓘ</span>
                                        </label>
                                        <div class="currency-input">
                                            <span>$</span>
                                            <input type="number" id="downtime-cost-input" value="5000" step="500">
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Risk & Compliance -->
                                <div class="settings-section">
                                    <h3><i class="fas fa-exclamation-triangle"></i> Risk Profile</h3>
                                    <div class="setting-group">
                                        <label>
                                            Annual Breach Probability
                                            <span class="info-tip" title="Industry average is 23%">ⓘ</span>
                                        </label>
                                        <input type="range" id="breach-prob-slider" min="0" max="50" value="23">
                                        <span class="value-display">23%</span>
                                    </div>
                                    <div class="setting-group">
                                        <label>
                                            Compliance Frameworks
                                            <span class="info-tip" title="Select all that apply">ⓘ</span>
                                        </label>
                                        <div class="checkbox-group">
                                            <label><input type="checkbox" value="sox" checked> SOX</label>
                                            <label><input type="checkbox" value="gdpr" checked> GDPR</label>
                                            <label><input type="checkbox" value="hipaa"> HIPAA</label>
                                            <label><input type="checkbox" value="pci-dss"> PCI DSS</label>
                                            <label><input type="checkbox" value="iso27001" checked> ISO 27001</label>
                                            <label><input type="checkbox" value="nist-csf"> NIST CSF</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Operational Factors -->
                                <div class="settings-section">
                                    <h3><i class="fas fa-sliders-h"></i> Operational Factors</h3>
                                    <div class="setting-group">
                                        <label>
                                            Team Training Efficiency
                                            <span class="info-tip" title="How quickly your team adopts new tech">ⓘ</span>
                                        </label>
                                        <select id="training-efficiency">
                                            <option value="0.5">Highly Efficient (-50% time)</option>
                                            <option value="1.0" selected>Average</option>
                                            <option value="1.5">Below Average (+50% time)</option>
                                            <option value="2.0">Challenging (+100% time)</option>
                                        </select>
                                    </div>
                                    <div class="setting-group">
                                        <label>
                                            Integration Complexity
                                            <span class="info-tip" title="Your IT environment complexity">ⓘ</span>
                                        </label>
                                        <select id="integration-complexity">
                                            <option value="0.7">Simple (-30% cost)</option>
                                            <option value="1.0" selected>Average</option>
                                            <option value="1.5">Complex (+50% cost)</option>
                                            <option value="2.0">Very Complex (+100% cost)</option>
                                        </select>
                                    </div>
                                    <div class="setting-group">
                                        <label>
                                            Existing Infrastructure
                                            <span class="info-tip" title="Reusable infrastructure reduces costs">ⓘ</span>
                                        </label>
                                        <select id="existing-infra">
                                            <option value="none" selected>None (Greenfield)</option>
                                            <option value="partial">Some Reusable (30% savings)</option>
                                            <option value="substantial">Significant (60% savings)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn-primary" onclick="platform.applySettings()">
                                Apply Settings
                            </button>
                            <button class="btn-secondary" onclick="platform.resetSettings()">
                                Reset to Defaults
                            </button>
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
                            <p class="selector-hint">Select up to ${this.maxAdditionalVendors} vendors to compare against Portnox</p>
                            <div class="vendor-selector-grid" id="vendor-selector-grid">
                                <!-- Vendor options will be rendered here -->
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn-primary" onclick="platform.applyVendorSelection()">
                                Update Comparison
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Portnox Pricing Control (Always Visible) -->
                <div class="portnox-pricing-bar">
                    <div class="pricing-container">
                        <div class="pricing-label">
                            <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="inline-logo">
                            <span>Pricing Adjustment</span>
                        </div>
                        <div class="pricing-control">
                            <span class="price-label">$<span id="portnox-price-display">3.50</span>/device/month</span>
                            <input type="range" id="portnox-pricing-slider" 
                                   min="1" max="8" step="0.25" value="3.50">
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
    
    bindEvents() {
        // Tab navigation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-tab')) {
                const tab = e.target.closest('.nav-tab');
                this.switchTab(tab.dataset.tab);
            }
        });
        
        // Portnox pricing slider
        const portnoxSlider = document.getElementById('portnox-pricing-slider');
        portnoxSlider?.addEventListener('input', (e) => {
            this.portnoxPricing = parseFloat(e.target.value);
            document.getElementById('portnox-price-display').textContent = this.portnoxPricing.toFixed(2);
            
            if (this.vendorDatabase.portnox) {
                this.vendorDatabase.portnox.pricing.perDevice.monthly = this.portnoxPricing;
                this.vendorDatabase.portnox.pricing.perDevice.annual = this.portnoxPricing * 12;
            }
            
            this.calculate();
        });
        
        // Settings modal controls
        this.bindSettingsControls();
    }
    
    bindSettingsControls() {
        // Sync sliders with inputs
        const syncPairs = [
            ['devices-slider', 'devices-input'],
            ['locations-slider', 'locations-input']
        ];
        
        syncPairs.forEach(([sliderId, inputId]) => {
            const slider = document.getElementById(sliderId);
            const input = document.getElementById(inputId);
            
            if (slider && input) {
                slider.addEventListener('input', () => {
                    input.value = slider.value;
                });
                
                input.addEventListener('change', () => {
                    slider.value = input.value;
                });
            }
        });
        
        // Breach probability display
        const breachSlider = document.getElementById('breach-prob-slider');
        if (breachSlider) {
            breachSlider.addEventListener('input', (e) => {
                e.target.nextElementSibling.textContent = e.target.value + '%';
            });
        }
    }
    
    openSettings() {
        document.getElementById('settings-modal').style.display = 'flex';
        this.settingsModalOpen = true;
        this.loadCurrentSettings();
    }
    
    closeSettings() {
        document.getElementById('settings-modal').style.display = 'none';
        this.settingsModalOpen = false;
    }
    
    loadCurrentSettings() {
        // Load current values into settings modal
        document.getElementById('devices-slider').value = this.config.deviceCount;
        document.getElementById('devices-input').value = this.config.deviceCount;
        document.getElementById('locations-slider').value = this.config.locationCount;
        document.getElementById('locations-input').value = this.config.locationCount;
        document.getElementById('industry-select').value = this.config.industry;
        document.getElementById('fte-cost-input').value = this.config.fteCost;
        document.getElementById('breach-cost-input').value = this.config.breachCost;
        document.getElementById('downtime-cost-input').value = this.config.downtimeCostPerHour;
        document.getElementById('breach-prob-slider').value = this.config.annualBreachProbability * 100;
        document.getElementById('training-efficiency').value = this.config.trainingEfficiency;
        document.getElementById('integration-complexity').value = this.config.integrationComplexity;
        document.getElementById('existing-infra').value = this.config.existingInfrastructure;
    }
    
    applySettings() {
        // Update configuration from modal
        this.config.deviceCount = parseInt(document.getElementById('devices-input').value);
        this.config.locationCount = parseInt(document.getElementById('locations-input').value);
        this.config.industry = document.getElementById('industry-select').value;
        this.config.fteCost = parseInt(document.getElementById('fte-cost-input').value);
        this.config.breachCost = parseInt(document.getElementById('breach-cost-input').value);
        this.config.downtimeCostPerHour = parseInt(document.getElementById('downtime-cost-input').value);
        this.config.annualBreachProbability = parseInt(document.getElementById('breach-prob-slider').value) / 100;
        this.config.trainingEfficiency = parseFloat(document.getElementById('training-efficiency').value);
        this.config.integrationComplexity = parseFloat(document.getElementById('integration-complexity').value);
        this.config.existingInfrastructure = document.getElementById('existing-infra').value;
        
        // Get selected compliance frameworks
        const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
        this.config.complianceFrameworks = Array.from(checkboxes).map(cb => cb.value);
        
        this.closeSettings();
        this.calculate();
    }
    
    resetSettings() {
        // Reset to defaults
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
            complianceFrameworks: ['sox', 'gdpr', 'iso27001'],
            includeOpportunityLoss: true,
            includeProductivityGains: true,
            includeInsuranceSavings: true
        };
        
        this.loadCurrentSettings();
        this.calculate();
    }
    
    updateVendorSelection() {
        const display = document.getElementById('selected-vendors-display');
        
        display.innerHTML = this.selectedVendors.map(vendorKey => {
            const vendor = this.vendorDatabase[vendorKey];
            const isPortnox = vendorKey === 'portnox';
            
            return `
                <div class="selected-vendor-chip ${isPortnox ? 'portnox-chip' : ''}">
                    <img src="./img/vendors/${vendorKey}-logo.png" alt="${vendor?.name}" 
                         onerror="this.style.display='none'">
                    <span>${vendor?.name || vendorKey}</span>
                    ${!isPortnox ? `
                        <button class="remove-vendor" onclick="platform.removeVendor('${vendorKey}')">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                </div>
            `;
        }).join('');
        
        // Update add button state
        const addBtn = document.querySelector('.add-vendor-btn');
        const additionalVendors = this.selectedVendors.length - 1; // Minus Portnox
        
        if (additionalVendors >= this.maxAdditionalVendors) {
            addBtn.disabled = true;
            addBtn.innerHTML = '<i class="fas fa-check"></i> Maximum Reached';
        } else {
            addBtn.disabled = false;
            addBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Add Competitor';
        }
    }
    
    openVendorSelector() {
        const modal = document.getElementById('vendor-selector-modal');
        const grid = document.getElementById('vendor-selector-grid');
        
        // Render available vendors (excluding Portnox and already selected)
        const availableVendors = Object.entries(this.vendorDatabase)
            .filter(([key]) => !this.selectedVendors.includes(key));
        
        grid.innerHTML = availableVendors.map(([key, vendor]) => `
            <div class="vendor-option ${this.tempSelectedVendors?.includes(key) ? 'selected' : ''}" 
                 data-vendor="${key}" onclick="platform.toggleVendorOption('${key}')">
                <div class="vendor-option-header">
                    <h4>${vendor.name}</h4>
                    <span class="vendor-type">${vendor.type}</span>
                </div>
                <div class="vendor-option-metrics">
                    <div class="metric">
                        <i class="fas fa-dollar-sign"></i>
                        <span>$${vendor.pricing.perDevice.monthly.toFixed(2)}/device</span>
                    </div>
                    <div class="metric">
                        <i class="fas fa-shield-alt"></i>
                        <span>${vendor.metrics.securityScore}/100</span>
                    </div>
                    <div class="metric">
                        <i class="fas fa-clock"></i>
                        <span>${vendor.metrics.deploymentDays}d deploy</span>
                    </div>
                </div>
                <div class="selection-indicator">
                    <i class="fas fa-check-circle"></i>
                </div>
            </div>
        `).join('');
        
        this.tempSelectedVendors = [];
        modal.style.display = 'flex';
    }
    
    closeVendorSelector() {
        document.getElementById('vendor-selector-modal').style.display = 'none';
        this.tempSelectedVendors = [];
    }
    
    toggleVendorOption(vendorKey) {
        if (!this.tempSelectedVendors) this.tempSelectedVendors = [];
        
        const index = this.tempSelectedVendors.indexOf(vendorKey);
        const maxSelectable = this.maxAdditionalVendors - (this.selectedVendors.length - 1);
        
        if (index > -1) {
            this.tempSelectedVendors.splice(index, 1);
        } else if (this.tempSelectedVendors.length < maxSelectable) {
            this.tempSelectedVendors.push(vendorKey);
        }
        
        // Update UI
        document.querySelectorAll('.vendor-option').forEach(el => {
            const vendor = el.dataset.vendor;
            el.classList.toggle('selected', this.tempSelectedVendors.includes(vendor));
        });
    }
    
    applyVendorSelection() {
        // Remove non-Portnox vendors
        this.selectedVendors = ['portnox'];
        
        // Add newly selected vendors
        this.selectedVendors.push(...this.tempSelectedVendors);
        
        this.updateVendorSelection();
        this.closeVendorSelector();
        this.calculate();
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
        
        // Always show financial overview after calculation
        this.switchTab('financial-overview');
    }
    
    calculateComprehensiveTCO(vendor, vendorKey) {
        const devices = this.config.deviceCount;
        const locations = this.config.locationCount;
        
        // Calculate for both 1 year and 3 years
        const results = {};
        
        [1, 3].forEach(years => {
            // Software/Licensing Costs
            const annualLicense = vendor.pricing.perDevice.annual * devices;
            const totalLicense = annualLicense * years;
            
            // Implementation Costs (one-time)
            const baseImplementation = vendor.pricing.implementation.base + 
                                      (vendor.pricing.implementation.perDevice * devices);
            const implementationCost = baseImplementation * this.config.integrationComplexity;
            
            // Support Costs
            const annualSupport = vendor.pricing.support.annual * devices;
            const totalSupport = annualSupport * years;
            
            // Hardware/Infrastructure Costs
            let infrastructureCost = 0;
            if (vendor.architecture !== 'SaaS') {
                const baseInfra = vendor.pricing.infrastructure.servers * locations +
                                 vendor.pricing.infrastructure.loadBalancers +
                                 vendor.pricing.infrastructure.database;
                
                const infraReduction = this.config.existingInfrastructure === 'partial' ? 0.3 :
                                      this.config.existingInfrastructure === 'substantial' ? 0.6 : 0;
                
                infrastructureCost = baseInfra * (1 - infraReduction);
            }
            
            // FTE/Operational Costs
            const annualFTECost = vendor.metrics.fteRequired * this.config.fteCost;
            const totalFTECost = annualFTECost * years;
            
            // Training Costs
            const trainingCost = vendor.hiddenCosts.training * this.config.trainingEfficiency;
            
            // Integration & Customization
            const integrationCost = vendor.hiddenCosts.integration * this.config.integrationComplexity;
            const customizationCost = vendor.hiddenCosts.customization;
            
            // Maintenance & Upgrades
            const annualMaintenance = vendor.hiddenCosts.maintenance * this.config.maintenanceEfficiency;
            const totalMaintenance = annualMaintenance * years;
            const upgradeCost = vendor.hiddenCosts.upgrades * Math.ceil(years / 2); // Every 2 years
            
            // Downtime Costs
            const estimatedDowntimeHours = (100 - vendor.metrics.scalabilityScore) * 0.5 * years;
            const downtimeCost = estimatedDowntimeHours * this.config.downtimeCostPerHour;
            
            // Total Direct Costs
            const totalDirectCosts = totalLicense + implementationCost + totalSupport + 
                                   infrastructureCost + totalFTECost + trainingCost + 
                                   integrationCost + customizationCost + totalMaintenance + 
                                   upgradeCost + downtimeCost;
            
            // Risk-Adjusted Costs
            const breachRiskCost = this.config.breachCost * 
                                  (this.config.annualBreachProbability * years) * 
                                  ((100 - vendor.metrics.securityScore) / 100);
            
            const complianceRiskCost = this.config.compliancePenaltyRisk * 
                                      (vendor.riskFactors.complianceRisk / 100) * years;
            
            // Opportunity Costs
            const delayedDeploymentCost = (vendor.metrics.deploymentDays / 365) * 
                                         this.config.downtimeCostPerHour * 24 * 
                                         (vendor.metrics.deploymentDays > 30 ? 1 : 0.5);
            
            // Productivity Loss (if low automation)
            const productivityLoss = (100 - vendor.metrics.automationLevel) * 1000 * devices * (years / 3);
            
            // Insurance Premium Impact
            const insuranceImpact = vendor.metrics.securityScore >= 90 ? 
                                   -(this.config.cyberInsurancePremium * 0.15 * years) : // 15% discount
                                   vendor.metrics.securityScore <= 70 ?
                                   (this.config.cyberInsurancePremium * 0.10 * years) : 0; // 10% increase
            
            // Total TCO
            const totalTCO = totalDirectCosts + breachRiskCost + complianceRiskCost + 
                           delayedDeploymentCost + productivityLoss + insuranceImpact;
            
            // Calculate ROI (compared to industry average)
            const industryAvgTCO = this.calculateIndustryAverage(years);
            const savings = industryAvgTCO - totalTCO;
            const roi = industryAvgTCO > 0 ? (savings / totalTCO) * 100 : 0;
            
            // Payback period (months)
            const monthlyBenefit = savings / (years * 12);
            const paybackMonths = monthlyBenefit > 0 ? implementationCost / monthlyBenefit : 999;
            
            results[`year${years}`] = {
                tco: {
                    total: totalTCO,
                    perDevice: totalTCO / devices,
                    perMonth: totalTCO / (years * 12),
                    
                    breakdown: {
                        software: totalLicense,
                        implementation: implementationCost,
                        support: totalSupport,
                        hardware: infrastructureCost,
                        personnel: totalFTECost,
                        training: trainingCost,
                        integration: integrationCost,
                        customization: customizationCost,
                        maintenance: totalMaintenance,
                        upgrades: upgradeCost,
                        downtime: downtimeCost
                    },
                    
                    riskCosts: {
                        breachRisk: breachRiskCost,
                        complianceRisk: complianceRiskCost,
                        opportunityLoss: delayedDeploymentCost,
                        productivityLoss: productivityLoss,
                        insuranceImpact: insuranceImpact
                    }
                },
                
                roi: {
                    percentage: roi,
                    dollarValue: savings,
                    paybackMonths: paybackMonths,
                    breakEvenMonth: paybackMonths < 999 ? Math.ceil(paybackMonths) : null
                },
                
                comparison: {
                    vsIndustryAvg: ((industryAvgTCO - totalTCO) / industryAvgTCO) * 100,
                    ranking: null // Set after all calculations
                }
            };
        });
        
        // Additional metrics
        results.vendor = vendor;
        results.scores = {
            security: vendor.metrics.securityScore,
            automation: vendor.metrics.automationLevel,
            zeroTrust: vendor.metrics.zeroTrustScore,
            scalability: vendor.metrics.scalabilityScore,
            userExperience: vendor.metrics.userExperienceScore,
            overall: this.calculateOverallScore(vendor)
        };
        
        results.timeline = {
            implementation: vendor.metrics.deploymentDays,
            timeToValue: vendor.metrics.deploymentDays + 30, // 30 days to full productivity
            breakEven: results.year3.roi.breakEvenMonth,
            fullROI: results.year3.roi.breakEvenMonth ? results.year3.roi.breakEvenMonth + 12 : null
        };
        
        return results;
    }
    
    calculateIndustryAverage(years) {
        // Industry benchmarks for TCO
        const industryBenchmarks = {
            technology: 85000,
            healthcare: 95000,
            finance: 110000,
            retail: 75000,
            manufacturing: 80000,
            government: 90000,
            education: 70000
        };
        
        const basePerDevice = industryBenchmarks[this.config.industry] || 85000;
        return (basePerDevice / 3) * years * this.config.deviceCount; // Per device over 3 years
    }
    
    calculateOverallScore(vendor) {
        // Weighted scoring
        const weights = {
            security: 0.25,
            automation: 0.20,
            zeroTrust: 0.20,
            scalability: 0.15,
            userExperience: 0.10,
            cost: 0.10
        };
        
        const costScore = 100 - (vendor.pricing.perDevice.monthly / 10) * 100; // Inverse cost score
        
        return Math.round(
            vendor.metrics.securityScore * weights.security +
            vendor.metrics.automationLevel * weights.automation +
            vendor.metrics.zeroTrustScore * weights.zeroTrust +
            vendor.metrics.scalabilityScore * weights.scalability +
            vendor.metrics.userExperienceScore * weights.userExperience +
            costScore * weights.cost
        );
    }
    
    switchTab(tabName) {
        // Update active tab
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
            case 'strategic-insights':
                this.renderStrategicInsights(content);
                break;
        }
    }
    
    renderFinancialOverview(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            container.innerHTML = '<div class="no-data">Calculating financial analysis...</div>';
            return;
        }
        
        const portnoxResult = this.calculationResults.portnox;
        const competitors = Object.entries(this.calculationResults).filter(([k]) => k !== 'portnox');
        
        container.innerHTML = `
            <div class="financial-overview">
                <!-- Executive Financial Summary -->
                <div class="executive-summary-card">
                    <h2>Executive Financial Summary</h2>
                    <div class="summary-grid">
                        <div class="summary-item highlight">
                            <h3>Portnox Advantage</h3>
                            <div class="value">${this.calculatePortnoxAdvantage()}%</div>
                            <p>Lower TCO vs. competitors</p>
                        </div>
                        <div class="summary-item">
                            <h3>1-Year Analysis</h3>
                            <div class="value">$${(portnoxResult.year1.tco.total / 1000).toFixed(0)}K</div>
                            <p>Total investment</p>
                        </div>
                        <div class="summary-item">
                            <h3>3-Year TCO</h3>
                            <div class="value">$${(portnoxResult.year3.tco.total / 1000).toFixed(0)}K</div>
                            <p>Complete ownership cost</p>
                        </div>
                        <div class="summary-item">
                            <h3>ROI Achievement</h3>
                            <div class="value">${portnoxResult.year3.roi.percentage.toFixed(0)}%</div>
                            <p>3-year return</p>
                        </div>
                    </div>
                </div>
                
                <!-- TCO Comparison Charts -->
                <div class="chart-section">
                    <h3>Total Cost of Ownership Comparison</h3>
                    <div class="chart-grid">
                        <div class="chart-container">
                            <h4>1-Year TCO Analysis</h4>
                            <div id="tco-1year-chart" style="height: 400px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>3-Year TCO Analysis</h4>
                            <div id="tco-3year-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Cost Breakdown Analysis -->
                <div class="chart-section">
                    <h3>Comprehensive Cost Breakdown</h3>
                    <div class="cost-breakdown-grid">
                        ${Object.entries(this.calculationResults).map(([vendorKey, result]) => `
                            <div class="cost-breakdown-card ${vendorKey === 'portnox' ? 'portnox-highlight' : ''}">
                                <h4>${this.vendorDatabase[vendorKey]?.name}</h4>
                                <div class="cost-categories">
                                    <div class="cost-category">
                                        <span class="label">Software/Licensing</span>
                                        <span class="value">$${(result.year3.tco.breakdown.software / 1000).toFixed(0)}K</span>
                                        <div class="bar">
                                            <div class="fill" style="width: ${this.getPercentage(result.year3.tco.breakdown.software, result.year3.tco.total)}%"></div>
                                        </div>
                                    </div>
                                    <div class="cost-category">
                                        <span class="label">Implementation</span>
                                        <span class="value">$${(result.year3.tco.breakdown.implementation / 1000).toFixed(0)}K</span>
                                        <div class="bar">
                                            <div class="fill" style="width: ${this.getPercentage(result.year3.tco.breakdown.implementation, result.year3.tco.total)}%"></div>
                                        </div>
                                    </div>
                                    <div class="cost-category">
                                        <span class="label">Personnel (FTE)</span>
                                        <span class="value">$${(result.year3.tco.breakdown.personnel / 1000).toFixed(0)}K</span>
                                        <div class="bar">
                                            <div class="fill" style="width: ${this.getPercentage(result.year3.tco.breakdown.personnel, result.year3.tco.total)}%"></div>
                                        </div>
                                    </div>
                                    <div class="cost-category">
                                        <span class="label">Hardware/Infrastructure</span>
                                        <span class="value">$${(result.year3.tco.breakdown.hardware / 1000).toFixed(0)}K</span>
                                        <div class="bar">
                                            <div class="fill" style="width: ${this.getPercentage(result.year3.tco.breakdown.hardware, result.year3.tco.total)}%"></div>
                                        </div>
                                    </div>
                                    <div class="cost-category">
                                        <span class="label">Support & Maintenance</span>
                                        <span class="value">$${((result.year3.tco.breakdown.support + result.year3.tco.breakdown.maintenance) / 1000).toFixed(0)}K</span>
                                        <div class="bar">
                                            <div class="fill" style="width: ${this.getPercentage(result.year3.tco.breakdown.support + result.year3.tco.breakdown.maintenance, result.year3.tco.total)}%"></div>
                                        </div>
                                    </div>
                                    <div class="cost-category">
                                        <span class="label">Other Operational</span>
                                        <span class="value">$${((result.year3.tco.breakdown.training + result.year3.tco.breakdown.integration + result.year3.tco.breakdown.customization + result.year3.tco.breakdown.downtime) / 1000).toFixed(0)}K</span>
                                        <div class="bar">
                                            <div class="fill" style="width: ${this.getPercentage(result.year3.tco.breakdown.training + result.year3.tco.breakdown.integration + result.year3.tco.breakdown.customization + result.year3.tco.breakdown.downtime, result.year3.tco.total)}%"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="total-cost">
                                    <span>3-Year Total</span>
                                    <strong>$${(result.year3.tco.total / 1000).toFixed(0)}K</strong>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- ROI Timeline -->
                <div class="chart-section">
                    <h3>Return on Investment Timeline</h3>
                    <div id="roi-timeline-chart" style="height: 400px;"></div>
                    <div class="roi-insights">
                        <div class="insight">
                            <i class="fas fa-calendar-check"></i>
                            <div>
                                <h4>Break-Even Point</h4>
                                <p>Portnox achieves ROI in ${portnoxResult.year3.roi.breakEvenMonth || 'N/A'} months</p>
                            </div>
                        </div>
                        <div class="insight">
                            <i class="fas fa-chart-line"></i>
                            <div>
                                <h4>3-Year Savings</h4>
                                <p>$${(portnoxResult.year3.roi.dollarValue / 1000).toFixed(0)}K total savings with Portnox</p>
                            </div>
                        </div>
                        <div class="insight">
                            <i class="fas fa-percentage"></i>
                            <div>
                                <h4>Cost Efficiency</h4>
                                <p>${portnoxResult.year3.comparison.vsIndustryAvg.toFixed(0)}% below industry average</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Financial Recommendations -->
                <div class="recommendations-section">
                    <h3>Key Financial Recommendations</h3>
                    <div class="recommendation-cards">
                        ${this.generateFinancialRecommendations()}
                    </div>
                </div>
            </div>
        `;
        
        // Render all charts
        setTimeout(() => {
            this.renderTCOCharts();
            this.renderROITimeline();
        }, 100);
    }
    
    renderTCOCharts() {
        // 1-Year TCO Chart
        const year1Data = Object.entries(this.calculationResults).map(([key, result]) => ({
            name: this.vendorDatabase[key]?.name || key,
            y: result.year1.tco.total,
            color: key === 'portnox' ? '#28a745' : null
        }));
        
        Highcharts.chart('tco-1year-chart', {
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
            plotOptions: {
                column: {
                    borderRadius: 8,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + (this.y / 1000).toFixed(0) + 'K';
                        }
                    }
                }
            },
            series: [{
                name: '1-Year TCO',
                data: year1Data
            }],
            credits: { enabled: false }
        });
        
        // 3-Year TCO Chart
        const year3Data = Object.entries(this.calculationResults).map(([key, result]) => ({
            name: this.vendorDatabase[key]?.name || key,
            y: result.year3.tco.total,
            color: key === 'portnox' ? '#28a745' : null
        }));
        
        Highcharts.chart('tco-3year-chart', {
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
            plotOptions: {
                column: {
                    borderRadius: 8,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + (this.y / 1000).toFixed(0) + 'K';
                        }
                    }
                }
            },
            series: [{
                name: '3-Year TCO',
                data: year3Data
            }],
            credits: { enabled: false }
        });
    }
    
    renderROITimeline() {
        const months = [];
        const series = [];
        
        // Generate monthly cumulative savings data
        Object.entries(this.calculationResults).forEach(([vendorKey, result]) => {
            const monthlyData = [];
            const monthlySavings = result.year3.roi.dollarValue / 36; // 3-year savings distributed
            const implementationCost = result.year3.tco.breakdown.implementation;
            
            for (let month = 1; month <= 36; month++) {
                if (month === 1) {
                    monthlyData.push(-implementationCost); // Initial investment
                } else {
                    monthlyData.push(monthlyData[month - 2] + monthlySavings);
                }
            }
            
            series.push({
                name: this.vendorDatabase[vendorKey]?.name || vendorKey,
                data: monthlyData,
                marker: { enabled: false }
            });
        });
        
        // Generate month labels
        for (let i = 1; i <= 36; i++) {
            months.push(`Month ${i}`);
        }
        
        Highcharts.chart('roi-timeline-chart', {
            chart: { type: 'line', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: {
                categories: months,
                labels: {
                    step: 6 // Show every 6 months
                }
            },
            yAxis: {
                title: { text: 'Cumulative Value ($)' },
                labels: {
                    formatter: function() {
                        return '$' + (this.value / 1000) + 'K';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: '#666',
                    dashStyle: 'dash'
                }]
            },
            tooltip: {
                shared: true,
                formatter: function() {
                    let s = '<b>' + this.x + '</b><br/>';
                    this.points.forEach(point => {
                        s += point.series.name + ': $' + (point.y / 1000).toFixed(0) + 'K<br/>';
                    });
                    return s;
                }
            },
            series: series,
            credits: { enabled: false }
        });
    }
    
    calculatePortnoxAdvantage() {
        const portnoxTCO = this.calculationResults.portnox?.year3.tco.total || 0;
        const avgCompetitorTCO = Object.entries(this.calculationResults)
            .filter(([k]) => k !== 'portnox')
            .reduce((sum, [, result]) => sum + result.year3.tco.total, 0) / 
            (this.selectedVendors.length - 1);
        
        return Math.round(((avgCompetitorTCO - portnoxTCO) / avgCompetitorTCO) * 100);
    }
    
    getPercentage(value, total) {
        return Math.round((value / total) * 100);
    }
    
    generateFinancialRecommendations() {
        const portnox = this.calculationResults.portnox;
        const advantage = this.calculatePortnoxAdvantage();
        
        const recommendations = [
            {
                icon: 'fas fa-rocket',
                title: 'Immediate Implementation',
                desc: `With ${portnox.year3.roi.breakEvenMonth || 12} month payback, delaying costs $${Math.round(portnox.year3.roi.dollarValue / 36)}K monthly in lost savings.`
            },
            {
                icon: 'fas fa-piggy-bank',
                title: 'Budget Reallocation',
                desc: `${advantage}% TCO reduction frees up $${(portnox.year3.roi.dollarValue / 1000).toFixed(0)}K for strategic initiatives over 3 years.`
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Executive Approval',
                desc: `${portnox.year3.roi.percentage.toFixed(0)}% ROI exceeds typical IT investments by 3-4x, warranting expedited approval.`
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Risk Mitigation Value',
                desc: `Reduced breach risk saves $${(portnox.year3.tco.riskCosts.breachRisk / 1000).toFixed(0)}K in potential incident costs.`
            }
        ];
        
        return recommendations.map(rec => `
            <div class="recommendation-card">
                <i class="${rec.icon}"></i>
                <h4>${rec.title}</h4>
                <p>${rec.desc}</p>
            </div>
        `).join('');
    }
    
    renderRiskAssessment(container) {
        container.innerHTML = `
            <div class="risk-assessment">
                <h2>Risk & Security Impact Analysis</h2>
                <p>Comprehensive breach, incident, and business impact assessment</p>
                <!-- Implementation continues... -->
            </div>
        `;
    }
    
    renderComplianceAnalysis(container) {
        container.innerHTML = `
            <div class="compliance-analysis">
                <h2>Compliance & Regulatory Analysis</h2>
                <p>Framework alignment and audit readiness assessment</p>
                <!-- Implementation continues... -->
            </div>
        `;
    }
    
    renderOperationalImpact(container) {
        container.innerHTML = `
            <div class="operational-impact">
                <h2>Operational Efficiency Analysis</h2>
                <p>Timeline, resource requirements, and productivity impact</p>
                <!-- Implementation continues... -->
            </div>
        `;
    }
    
    renderStrategicInsights(container) {
        container.innerHTML = `
            <div class="strategic-insights">
                <h2>Strategic Recommendations</h2>
                <p>Executive insights and Portnox competitive advantages</p>
                <!-- Implementation continues... -->
            </div>
        `;
    }
    
    exportAnalysis() {
        console.log('Exporting comprehensive analysis...');
        // Export implementation
    }
    
    scheduleDemo() {
        window.open('https://portnox.com/demo', '_blank');
    }
}

// Initialize platform
window.platform = new PremiumExecutivePlatform();

console.log('✅ Premium Executive Platform initialized');
