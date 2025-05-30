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
        // Update default configuration to more realistic values
        this.config = {
            // Basic Settings
            deviceCount: 500,
            locationCount: 1,
            
            // Financial Settings (more realistic)
            fteCost: 100000,
            breachCost: 500000,      // Reduced from 4.35M to 500K (more realistic for mid-market)
            downtimeCostPerHour: 2500,  // Reduced from 5000
            compliancePenaltyRisk: 100000,  // Reduced from 250K
            cyberInsurancePremium: 25000,   // Reduced from 50K
            
            // Operational Factors
            trainingEfficiency: 1.0,
            integrationComplexity: 1.0,
            maintenanceEfficiency: 1.0,
            existingInfrastructure: 'none',
            
            // Risk Profile
            annualBreachProbability: 0.15,  // Reduced from 0.23 to 15%
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
        // Update default configuration to more realistic values
        this.config = {
            // Basic Settings
            deviceCount: 500,
            locationCount: 1,
            
            // Financial Settings (more realistic)
            fteCost: 100000,
            breachCost: 500000,      // Reduced from 4.35M to 500K (more realistic for mid-market)
            downtimeCostPerHour: 2500,  // Reduced from 5000
            compliancePenaltyRisk: 100000,  // Reduced from 250K
            cyberInsurancePremium: 25000,   // Reduced from 50K
            
            // Operational Factors
            trainingEfficiency: 1.0,
            integrationComplexity: 1.0,
            maintenanceEfficiency: 1.0,
            existingInfrastructure: 'none',
            
            // Risk Profile
            annualBreachProbability: 0.15,  // Reduced from 0.23 to 15%
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
            // Software/Licensing Costs (realistic)
            const monthlyPerDevice = vendor.pricing.perDevice.monthly;
            const annualLicense = monthlyPerDevice * 12 * devices;
            const totalLicense = annualLicense * years;
            
            // Implementation Costs (one-time, more realistic)
            const baseImplementation = vendor.pricing.implementation.base;
            const perDeviceImpl = vendor.pricing.implementation.perDevice * devices;
            const implementationCost = (baseImplementation + perDeviceImpl) * this.config.integrationComplexity;
            
            // Support Costs (15-20% of license typically)
            const annualSupport = annualLicense * 0.18;
            const totalSupport = annualSupport * years;
            
            // Hardware/Infrastructure Costs (only for on-premise)
            let infrastructureCost = 0;
            if (vendor.architecture !== 'SaaS') {
                const baseInfra = 25000 * locations; // More realistic hardware costs
                const infraReduction = this.config.existingInfrastructure === 'partial' ? 0.3 :
                                      this.config.existingInfrastructure === 'substantial' ? 0.6 : 0;
                infrastructureCost = baseInfra * (1 - infraReduction);
            }
            
            // FTE/Operational Costs (partial FTE, not full)
            const fteHours = vendor.metrics.fteRequired * 0.25; // Assume 25% of FTE time
            const annualFTECost = fteHours * this.config.fteCost;
            const totalFTECost = annualFTECost * years;
            
            // Training Costs (realistic)
            const trainingCost = devices * 50 * this.config.trainingEfficiency; // $50 per device
            
            // Integration & Customization (10-15% of implementation)
            const integrationCost = implementationCost * 0.15;
            const customizationCost = implementationCost * 0.10;
            
            // Maintenance & Upgrades
            const annualMaintenance = infrastructureCost * 0.15; // 15% of hardware
            const totalMaintenance = annualMaintenance * years;
            const upgradeCost = totalLicense * 0.05 * Math.floor(years / 2); // 5% every 2 years
            
            // Downtime Costs (more realistic)
            const avgDowntimeHours = 4 * years; // 4 hours per year average
            const downtimeImpact = (100 - vendor.metrics.scalabilityScore) / 100;
            const downtimeCost = avgDowntimeHours * this.config.downtimeCostPerHour * downtimeImpact;
            
            // Total Direct Costs
            const totalDirectCosts = totalLicense + implementationCost + totalSupport + 
                                   infrastructureCost + totalFTECost + trainingCost + 
                                   integrationCost + customizationCost + totalMaintenance + 
                                   upgradeCost + downtimeCost;
            
            // Risk-Adjusted Costs (more realistic)
            // Breach risk based on actual probability and vendor security
            const vendorBreachProb = (100 - vendor.metrics.securityScore) / 100 * 0.15; // 15% base risk
            const breachRiskCost = this.config.breachCost * vendorBreachProb * years * 0.1; // 10% of full cost
            
            // Compliance risk (smaller, more realistic)
            const complianceRiskCost = 50000 * (vendor.riskFactors.complianceRisk / 100) * years;
            
            // Opportunity Costs (minimal)
            const delayedDeploymentCost = vendor.metrics.deploymentDays > 60 ? 
                                         (vendor.metrics.deploymentDays - 30) * 1000 : 0;
            
            // Productivity Impact (small)
            const productivityLoss = (100 - vendor.metrics.automationLevel) * 50 * devices * (years / 3);
            
            // Insurance Premium Impact (realistic)
            const baseInsuranceSaving = 10000 * years; // $10K annual premium base
            const insuranceImpact = vendor.metrics.securityScore >= 85 ? 
                                   -(baseInsuranceSaving * 0.15) : // 15% discount
                                   vendor.metrics.securityScore <= 70 ?
                                   (baseInsuranceSaving * 0.10) : 0; // 10% increase
            
            // Total TCO
            const totalTCO = totalDirectCosts + breachRiskCost + complianceRiskCost + 
                           delayedDeploymentCost + productivityLoss + insuranceImpact;
            
            // Calculate more realistic ROI
            const industryAvgCost = devices * 150 * 12 * years; // $150/device/month industry avg
            const savings = industryAvgCost - totalTCO;
            const roi = totalTCO > 0 ? (savings / totalTCO) * 100 : 0;
            
            // Payback period (months)
            const monthlyBenefit = savings > 0 ? savings / (years * 12) : 0;
            const paybackMonths = monthlyBenefit > 0 ? implementationCost / monthlyBenefit : 999;
            
            results[`year${years}`] = {
                tco: {
                    total: Math.round(totalTCO),
                    perDevice: Math.round(totalTCO / devices),
                    perMonth: Math.round(totalTCO / (years * 12)),
                    
                    breakdown: {
                        software: Math.round(totalLicense),
                        implementation: Math.round(implementationCost),
                        support: Math.round(totalSupport),
                        hardware: Math.round(infrastructureCost),
                        personnel: Math.round(totalFTECost),
                        training: Math.round(trainingCost),
                        integration: Math.round(integrationCost),
                        customization: Math.round(customizationCost),
                        maintenance: Math.round(totalMaintenance),
                        upgrades: Math.round(upgradeCost),
                        downtime: Math.round(downtimeCost)
                    },
                    
                    riskCosts: {
                        breachRisk: Math.round(breachRiskCost),
                        complianceRisk: Math.round(complianceRiskCost),
                        opportunityLoss: Math.round(delayedDeploymentCost),
                        productivityLoss: Math.round(productivityLoss),
                        insuranceImpact: Math.round(insuranceImpact)
                    }
                },
                
                roi: {
                    percentage: Math.round(roi),
                    dollarValue: Math.round(savings),
                    paybackMonths: Math.round(paybackMonths),
                    breakEvenMonth: paybackMonths < 999 ? Math.ceil(paybackMonths) : null
                },
                
                comparison: {
                    vsIndustryAvg: Math.round(((industryAvgCost - totalTCO) / industryAvgCost) * 100),
                    ranking: null
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
            timeToValue: vendor.metrics.deploymentDays + 30,
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
            name: result.vendor.name,
            y: result.year1.tco.total,
            color: key === 'portnox' ? '#00D4AA' : null
        }));
        
        Highcharts.chart('tco-1year-chart', {
            chart: { type: 'column', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: { 
                type: 'category',
                labels: { rotation: -45, style: { fontSize: '11px' } }
            },
            yAxis: {
                title: { text: 'Total Cost ($)' },
                labels: {
                    formatter: function() {
                        return '$' + Math.round(this.value / 1000) + 'K';
                    }
                }
            },
            tooltip: {
                pointFormat: 'TCO: <b>${point.y:,.0f}</b>'
            },
            plotOptions: {
                column: {
                    borderRadius: 8,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + Math.round(this.y / 1000) + 'K';
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
            name: result.vendor.name,
            y: result.year3.tco.total,
            color: key === 'portnox' ? '#00D4AA' : null
        }));
        
        Highcharts.chart('tco-3year-chart', {
            chart: { type: 'column', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: { 
                type: 'category',
                labels: { rotation: -45, style: { fontSize: '11px' } }
            },
            yAxis: {
                title: { text: 'Total Cost ($)' },
                labels: {
                    formatter: function() {
                        return '$' + Math.round(this.value / 1000) + 'K';
                    }
                }
            },
            tooltip: {
                pointFormat: 'TCO: <b>${point.y:,.0f}</b>'
            },
            plotOptions: {
                column: {
                    borderRadius: 8,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + Math.round(this.y / 1000) + 'K';
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
        const series = [];
        
        Object.entries(this.calculationResults).forEach(([vendorKey, result]) => {
            const monthlyData = [];
            const implementationCost = result.year1.tco.breakdown.implementation;
            const monthlySavings = result.year3.roi.dollarValue / 36;
            
            let cumulative = -implementationCost;
            
            for (let month = 1; month <= 36; month++) {
                cumulative += monthlySavings;
                monthlyData.push(Math.round(cumulative));
            }
            
            series.push({
                name: result.vendor.name,
                data: monthlyData,
                marker: { enabled: false },
                color: vendorKey === 'portnox' ? '#00D4AA' : null
            });
        });
        
        Highcharts.chart('roi-timeline-chart', {
            chart: { type: 'line', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: {
                categories: Array.from({length: 36}, (_, i) => `Month ${i + 1}`),
                labels: { step: 6 }
            },
            yAxis: {
                title: { text: 'Cumulative Value ($)' },
                labels: {
                    formatter: function() {
                        return '$' + Math.round(this.value / 1000) + 'K';
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
                        s += point.series.name + ': $' + Math.round(point.y / 1000) + 'K<br/>';
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
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            container.innerHTML = '<div class="no-data">Calculating compliance analysis...</div>';
            return;
        }
        
        container.innerHTML = `
            <div class="compliance-analysis">
                <!-- Compliance Executive Summary -->
                <div class="compliance-summary-card">
                    <h2>Compliance & Regulatory Executive Summary</h2>
                    <div class="compliance-metrics-grid">
                        <div class="compliance-metric highlight">
                            <i class="fas fa-shield-check"></i>
                            <h3>Compliance Score</h3>
                            <div class="metric-value">${this.getPortnoxComplianceScore()}%</div>
                            <p>Framework alignment</p>
                        </div>
                        <div class="compliance-metric">
                            <i class="fas fa-clipboard-check"></i>
                            <h3>Frameworks Covered</h3>
                            <div class="metric-value">${this.getFrameworkCoverage()}</div>
                            <p>Out of ${this.config.complianceFrameworks.length} required</p>
                        </div>
                        <div class="compliance-metric">
                            <i class="fas fa-clock"></i>
                            <h3>Audit Readiness</h3>
                            <div class="metric-value">${this.getAuditReadinessDays()} days</div>
                            <p>Faster audit preparation</p>
                        </div>
                        <div class="compliance-metric">
                            <i class="fas fa-dollar-sign"></i>
                            <h3>Compliance Savings</h3>
                            <div class="metric-value">$${this.getComplianceSavings()}K</div>
                            <p>Annual cost reduction</p>
                        </div>
                    </div>
                </div>
                
                <!-- Framework Coverage Matrix -->
                <div class="chart-section">
                    <h3>Regulatory Framework Coverage Analysis</h3>
                    <div id="compliance-matrix-chart" style="height: 500px;"></div>
                </div>
                
                <!-- Compliance Cost Comparison -->
                <div class="chart-section">
                    <h3>Compliance Cost & Risk Analysis</h3>
                    <div class="chart-grid">
                        <div class="chart-container">
                            <h4>Annual Compliance Costs</h4>
                            <div id="compliance-costs-chart" style="height: 400px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Audit Efficiency Comparison</h4>
                            <div id="audit-efficiency-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Framework Details -->
                <div class="framework-details-section">
                    <h3>Detailed Framework Analysis</h3>
                    <div class="framework-cards">
                        ${this.generateFrameworkCards()}
                    </div>
                </div>
                
                <!-- Compliance Recommendations -->
                <div class="recommendations-section">
                    <h3>Compliance Strategy Recommendations</h3>
                    <div class="recommendation-cards">
                        ${this.generateComplianceRecommendations()}
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            this.renderComplianceMatrixChart();
            this.renderComplianceCostsChart();
            this.renderAuditEfficiencyChart();
        }, 100);
    }
    
    getPortnoxComplianceScore() {
        const portnox = this.calculationResults.portnox?.vendor;
        if (!portnox) return 0;
        
        // Calculate based on certifications and compliance features
        const certScore = portnox.certifications.length * 10;
        const complianceScore = 100 - portnox.riskFactors.complianceRisk;
        return Math.min(95, Math.round((certScore + complianceScore) / 2));
    }
    
    getFrameworkCoverage() {
        const portnox = this.calculationResults.portnox?.vendor;
        if (!portnox) return 0;
        
        // Count how many required frameworks Portnox covers
        const covered = this.config.complianceFrameworks.filter(framework => {
            if (framework === 'sox' && portnox.certifications.includes('SOC2')) return true;
            if (framework === 'gdpr' && portnox.capabilities.includes('Data privacy')) return true;
            if (framework === 'hipaa' && portnox.certifications.includes('HIPAA')) return true;
            if (framework === 'iso27001' && portnox.certifications.includes('ISO27001')) return true;
            return portnox.capabilities.includes('Compliance reporting');
        });
        
        return covered.length;
    }
    
    getAuditReadinessDays() {
        return 14; // Portnox reduces audit prep from 30 to 14 days
    }
    
    getComplianceSavings() {
        const baseCost = 100000; // Annual compliance cost
        const reduction = 0.35; // 35% reduction with Portnox
        return Math.round(baseCost * reduction / 1000);
    }
    
    generateFrameworkCards() {
        const frameworks = {
            sox: { name: 'SOX', icon: 'fas fa-balance-scale', coverage: 95 },
            gdpr: { name: 'GDPR', icon: 'fas fa-user-shield', coverage: 92 },
            hipaa: { name: 'HIPAA', icon: 'fas fa-hospital', coverage: 88 },
            'pci-dss': { name: 'PCI DSS', icon: 'fas fa-credit-card', coverage: 90 },
            iso27001: { name: 'ISO 27001', icon: 'fas fa-certificate', coverage: 94 },
            'nist-csf': { name: 'NIST CSF', icon: 'fas fa-shield-alt', coverage: 91 }
        };
        
        return this.config.complianceFrameworks.map(framework => {
            const fw = frameworks[framework];
            if (!fw) return '';
            
            return `
                <div class="framework-card">
                    <div class="framework-header">
                        <i class="${fw.icon}"></i>
                        <h4>${fw.name}</h4>
                    </div>
                    <div class="coverage-bar">
                        <div class="coverage-fill" style="width: ${fw.coverage}%"></div>
                    </div>
                    <div class="coverage-info">
                        <span class="coverage-percent">${fw.coverage}%</span>
                        <span class="coverage-label">Coverage</span>
                    </div>
                    <div class="framework-features">
                        <div class="feature"><i class="fas fa-check"></i> Automated reporting</div>
                        <div class="feature"><i class="fas fa-check"></i> Real-time monitoring</div>
                        <div class="feature"><i class="fas fa-check"></i> Audit trails</div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    generateComplianceRecommendations() {
        const savings = this.getComplianceSavings();
        const coverage = this.getFrameworkCoverage();
        
        return [
            {
                icon: 'fas fa-tasks',
                title: 'Automated Compliance',
                desc: `Reduce manual compliance tasks by 70% with automated policy enforcement and reporting.`
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Cost Optimization',
                desc: `Save $${savings}K annually through streamlined audit processes and reduced compliance overhead.`
            },
            {
                icon: 'fas fa-shield-check',
                title: 'Framework Consolidation',
                desc: `${coverage} frameworks covered by single platform reduces tool sprawl and training costs.`
            },
            {
                icon: 'fas fa-tachometer-alt',
                title: 'Rapid Deployment',
                desc: `Pre-configured compliance templates enable ${this.getAuditReadinessDays()}-day audit readiness.`
            }
        ].map(rec => `
            <div class="recommendation-card">
                <i class="${rec.icon}"></i>
                <h4>${rec.title}</h4>
                <p>${rec.desc}</p>
            </div>
        `).join('');
    }
    
    renderComplianceMatrixChart() {
        const frameworks = ['SOX', 'GDPR', 'HIPAA', 'PCI DSS', 'ISO 27001', 'NIST CSF'];
        const capabilities = ['Access Control', 'Audit Logs', 'Data Privacy', 'Network Security', 'Identity Mgmt', 'Reporting'];
        
        const data = [];
        this.selectedVendors.forEach((vendorKey, vIndex) => {
            capabilities.forEach((cap, cIndex) => {
                const vendor = this.vendorDatabase[vendorKey];
                let score = 70; // Base score
                
                if (vendor.capabilities.includes('Compliance reporting')) score += 15;
                if (vendor.certifications.length > 3) score += 10;
                if (vendorKey === 'portnox') score = Math.min(95, score + 20);
                
                data.push([cIndex, vIndex, score]);
            });
        });
        
        Highcharts.chart('compliance-matrix-chart', {
            chart: { type: 'heatmap', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: { categories: capabilities },
            yAxis: { categories: this.selectedVendors.map(v => this.vendorDatabase[v]?.name) },
            colorAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0, '#FFEBEE'],
                    [0.5, '#FFF9C4'],
                    [1, '#C8E6C9']
                ]
            },
            series: [{
                name: 'Compliance Coverage',
                borderWidth: 1,
                data: data,
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    format: '{point.value}%'
                }
            }],
            credits: { enabled: false }
        });
    }
    
    renderComplianceCostsChart() {
        const data = Object.entries(this.calculationResults).map(([key, result]) => {
            const complianceCost = result.year1.tco.riskCosts.complianceRisk;
            const auditCost = 25000; // Base audit cost
            const penaltyRisk = complianceCost * 0.5;
            
            return {
                name: result.vendor.name,
                data: [complianceCost, auditCost, penaltyRisk]
            };
        });
        
        Highcharts.chart('compliance-costs-chart', {
            chart: { type: 'bar', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: { categories: ['Compliance Risk', 'Audit Costs', 'Penalty Risk'] },
            yAxis: {
                title: { text: 'Annual Cost ($)' },
                labels: {
                    formatter: function() {
                        return '$' + Math.round(this.value / 1000) + 'K';
                    }
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + Math.round(this.y / 1000) + 'K';
                        }
                    }
                }
            },
            series: data.map((item, index) => ({
                name: item.name,
                data: item.data,
                color: item.name.includes('Portnox') ? '#00D4AA' : null
            })),
            credits: { enabled: false }
        });
    }
    
    renderAuditEfficiencyChart() {
        const vendors = this.selectedVendors.map(v => this.vendorDatabase[v]?.name);
        const prepDays = this.selectedVendors.map(v => v === 'portnox' ? 14 : 30);
        const auditDays = this.selectedVendors.map(v => v === 'portnox' ? 5 : 10);
        
        Highcharts.chart('audit-efficiency-chart', {
            chart: { type: 'column', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: { categories: vendors },
            yAxis: { title: { text: 'Days Required' } },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        format: '{y} days'
                    }
                }
            },
            series: [{
                name: 'Preparation Time',
                data: prepDays,
                color: '#FFB74D'
            }, {
                name: 'Audit Duration',
                data: auditDays,
                color: '#4FC3F7'
            }],
            credits: { enabled: false }
        });
    }
    
    renderOperationalImpact(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            container.innerHTML = '<div class="no-data">Calculating operational analysis...</div>';
            return;
        }
        
        container.innerHTML = `
            <div class="operational-impact">
                <!-- Operational Executive Summary -->
                <div class="operational-summary-card">
                    <h2>Operational Efficiency Executive Summary</h2>
                    <div class="operational-metrics-grid">
                        <div class="operational-metric highlight">
                            <i class="fas fa-rocket"></i>
                            <h3>Deployment Speed</h3>
                            <div class="metric-value">${this.getPortnoxDeploymentDays()} days</div>
                            <p>Time to full deployment</p>
                        </div>
                        <div class="operational-metric">
                            <i class="fas fa-users"></i>
                            <h3>FTE Efficiency</h3>
                            <div class="metric-value">${this.getFTESavings()}%</div>
                            <p>Staff time reduction</p>
                        </div>
                        <div class="operational-metric">
                            <i class="fas fa-robot"></i>
                            <h3>Automation Level</h3>
                            <div class="metric-value">${this.getPortnoxAutomation()}%</div>
                            <p>Process automation</p>
                        </div>
                        <div class="operational-metric">
                            <i class="fas fa-chart-line"></i>
                            <h3>Productivity Gain</h3>
                            <div class="metric-value">$${this.getProductivityGains()}K</div>
                            <p>Annual value added</p>
                        </div>
                    </div>
                </div>
                
                <!-- Deployment Timeline Comparison -->
                <div class="chart-section">
                    <h3>Implementation Timeline Analysis</h3>
                    <div id="deployment-timeline-chart" style="height: 400px;"></div>
                </div>
                
                <!-- Operational Efficiency Charts -->
                <div class="chart-section">
                    <h3>Operational Efficiency Metrics</h3>
                    <div class="chart-grid">
                        <div class="chart-container">
                            <h4>Automation Capabilities</h4>
                            <div id="automation-comparison-chart" style="height: 350px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Resource Requirements</h4>
                            <div id="resource-requirements-chart" style="height: 350px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Process Improvement Analysis -->
                <div class="process-improvement-section">
                    <h3>Key Process Improvements with Portnox</h3>
                    <div class="process-cards">
                        ${this.generateProcessImprovementCards()}
                    </div>
                </div>
                
                <!-- Operational Recommendations -->
                <div class="recommendations-section">
                    <h3>Operational Excellence Recommendations</h3>
                    <div class="recommendation-cards">
                        ${this.generateOperationalRecommendations()}
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            this.renderDeploymentTimelineChart();
            this.renderAutomationComparisonChart();
            this.renderResourceRequirementsChart();
        }, 100);
    }
    
    getPortnoxDeploymentDays() {
        return this.calculationResults.portnox?.vendor.metrics.deploymentDays || 30;
    }
    
    getFTESavings() {
        const portnoxFTE = this.calculationResults.portnox?.vendor.metrics.fteRequired || 0.5;
        const avgCompetitorFTE = 1.5; // Industry average
        return Math.round(((avgCompetitorFTE - portnoxFTE) / avgCompetitorFTE) * 100);
    }
    
    getPortnoxAutomation() {
        return this.calculationResults.portnox?.vendor.metrics.automationLevel || 85;
    }
    
    getProductivityGains() {
        const devices = this.config.deviceCount;
        const hoursPerDevice = 2; // Hours saved per device per year
        const hourlyValue = 75; // Value per hour
        return Math.round(devices * hoursPerDevice * hourlyValue / 1000);
    }
    
    generateProcessImprovementCards() {
        const improvements = [
            {
                icon: 'fas fa-magic',
                title: 'Auto-Discovery',
                current: '2 weeks manual',
                improved: '2 hours automated',
                impact: '99% faster'
            },
            {
                icon: 'fas fa-user-check',
                title: 'User Onboarding',
                current: '45 min/user',
                improved: '5 min/user',
                impact: '89% reduction'
            },
            {
                icon: 'fas fa-shield-virus',
                title: 'Threat Response',
                current: '15 minutes',
                improved: 'Real-time',
                impact: 'Instant protection'
            },
            {
                icon: 'fas fa-sync',
                title: 'Policy Updates',
                current: '4 hours',
                improved: '5 minutes',
                impact: '95% faster'
            }
        ];
        
        return improvements.map(imp => `
            <div class="process-card">
                <i class="${imp.icon}"></i>
                <h4>${imp.title}</h4>
                <div class="process-comparison">
                    <div class="current">
                        <span class="label">Current:</span>
                        <span class="value">${imp.current}</span>
                    </div>
                    <div class="arrow">→</div>
                    <div class="improved">
                        <span class="label">With Portnox:</span>
                        <span class="value">${imp.improved}</span>
                    </div>
                </div>
                <div class="impact-badge">${imp.impact}</div>
            </div>
        `).join('');
    }
    
    generateOperationalRecommendations() {
        return [
            {
                icon: 'fas fa-calendar-check',
                title: 'Phased Deployment',
                desc: `Deploy Portnox in ${this.getPortnoxDeploymentDays()} days using proven methodology for minimal disruption.`
            },
            {
                icon: 'fas fa-graduation-cap',
                title: 'Training Optimization',
                desc: `Leverage ${this.getPortnoxAutomation()}% automation to reduce training needs by 60%.`
            },
            {
                icon: 'fas fa-cogs',
                title: 'Process Automation',
                desc: `Automate ${Math.round(this.getPortnoxAutomation() * 0.8)}% of routine NAC tasks, freeing IT for strategic initiatives.`
            },
            {
                icon: 'fas fa-chart-pie',
                title: 'Resource Reallocation',
                desc: `Redeploy ${this.getFTESavings()}% of NAC management time to higher-value security projects.`
            }
        ].map(rec => `
            <div class="recommendation-card">
                <i class="${rec.icon}"></i>
                <h4>${rec.title}</h4>
                <p>${rec.desc}</p>
            </div>
        `).join('');
    }
    
    renderDeploymentTimelineChart() {
        const phases = ['Planning', 'Pilot', 'Deployment', 'Integration', 'Optimization'];
        const series = [];
        
        Object.entries(this.calculationResults).forEach(([key, result]) => {
            const vendor = result.vendor;
            const totalDays = vendor.metrics.deploymentDays;
            
            // Distribute days across phases
            const data = [
                totalDays * 0.15,  // Planning
                totalDays * 0.20,  // Pilot
                totalDays * 0.35,  // Deployment
                totalDays * 0.20,  // Integration
                totalDays * 0.10   // Optimization
            ].map(Math.round);
            
            series.push({
                name: vendor.name,
                data: data,
                color: key === 'portnox' ? '#00D4AA' : null
            });
        });
        
        Highcharts.chart('deployment-timeline-chart', {
            chart: { type: 'bar', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: { categories: phases },
            yAxis: {
                title: { text: 'Days' },
                stackLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.total + ' days';
                    }
                }
            },
            plotOptions: {
                bar: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        format: '{y}d'
                    }
                }
            },
            series: series,
            credits: { enabled: false }
        });
    }
    
    renderAutomationComparisonChart() {
        const categories = ['Device Discovery', 'Policy Enforcement', 'Threat Response', 
                          'Compliance Reporting', 'User Management', 'Network Segmentation'];
        
        const portnoxData = [95, 90, 95, 85, 88, 92];
        const competitorAvg = [60, 70, 65, 60, 55, 70];
        
        Highcharts.chart('automation-comparison-chart', {
            chart: { type: 'radar', backgroundColor: 'transparent' },
            title: { text: null },
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
            series: [{
                name: 'Portnox',
                data: portnoxData,
                pointPlacement: 'on',
                color: '#00D4AA'
            }, {
                name: 'Industry Average',
                data: competitorAvg,
                pointPlacement: 'on',
                color: '#9CA3AF'
            }],
            credits: { enabled: false }
        });
    }
    
    renderResourceRequirementsChart() {
        const categories = this.selectedVendors.map(v => this.vendorDatabase[v]?.name);
        const fteData = this.selectedVendors.map(v => 
            this.calculationResults[v]?.vendor.metrics.fteRequired || 1
        );
        const trainingDays = this.selectedVendors.map(v => 
            v === 'portnox' ? 3 : 7
        );
        
        Highcharts.chart('resource-requirements-chart', {
            chart: { type: 'column', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: { categories: categories },
            yAxis: [
                { title: { text: 'FTE Required' }, min: 0, max: 2 },
                { title: { text: 'Training Days' }, opposite: true, min: 0, max: 10 }
            ],
            series: [{
                name: 'FTE Required',
                data: fteData,
                yAxis: 0,
                color: '#3B82F6'
            }, {
                name: 'Training Days',
                data: trainingDays,
                yAxis: 1,
                color: '#F59E0B'
            }],
            credits: { enabled: false }
        });
    }
    
    renderStrategicInsights(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            container.innerHTML = '<div class="no-data">Generating strategic insights...</div>';
            return;
        }
        
        const portnoxAdvantage = this.calculatePortnoxAdvantage();
        const totalSavings = Math.round(this.calculationResults.portnox?.year3.roi.dollarValue / 1000) || 0;
        
        container.innerHTML = `
            <div class="strategic-insights">
                <!-- Strategic Executive Dashboard -->
                <div class="strategic-dashboard">
                    <h2>Strategic Decision Dashboard</h2>
                    <div class="decision-grid">
                        <div class="decision-metric winner">
                            <div class="metric-header">
                                <i class="fas fa-trophy"></i>
                                <h3>Recommended Solution</h3>
                            </div>
                            <div class="vendor-winner">
                                <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="winner-logo">
                                <div class="winner-details">
                                    <h4>Portnox CLEAR</h4>
                                    <p>Best overall value & capabilities</p>
                                </div>
                            </div>
                            <div class="advantage-score">
                                <span class="score">${portnoxAdvantage}%</span>
                                <span class="label">TCO Advantage</span>
                            </div>
                        </div>
                        <div class="decision-metric">
                            <i class="fas fa-piggy-bank"></i>
                            <h3>3-Year Savings</h3>
                            <div class="metric-value">$${totalSavings}K</div>
                            <p>vs. competitor average</p>
                        </div>
                        <div class="decision-metric">
                            <i class="fas fa-calendar-alt"></i>
                            <h3>Time to Value</h3>
                            <div class="metric-value">${this.calculationResults.portnox?.timeline.timeToValue || 60} days</div>
                            <p>Full operational capability</p>
                        </div>
                        <div class="decision-metric">
                            <i class="fas fa-award"></i>
                            <h3>Strategic Fit</h3>
                            <div class="metric-value">${this.calculateStrategicFitScore()}%</div>
                            <p>Alignment score</p>
                        </div>
                    </div>
                </div>
                
                <!-- Competitive Advantages -->
                <div class="advantages-section">
                    <h3>Portnox Competitive Advantages</h3>
                    <div class="advantages-grid">
                        ${this.generateCompetitiveAdvantages()}
                    </div>
                </div>
                
                <!-- Decision Matrix -->
                <div class="chart-section">
                    <h3>Comprehensive Decision Matrix</h3>
                    <div id="decision-matrix-chart" style="height: 500px;"></div>
                </div>
                
                <!-- Executive Recommendations -->
                <div class="executive-recommendations">
                    <h3>Executive Action Plan</h3>
                    <div class="action-timeline">
                        ${this.generateActionPlan()}
                    </div>
                </div>
                
                <!-- Next Steps -->
                <div class="next-steps-section">
                    <h3>Recommended Next Steps</h3>
                    <div class="steps-grid">
                        ${this.generateNextSteps()}
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            this.renderDecisionMatrixChart();
        }, 100);
    }
    
    calculateStrategicFitScore() {
        const portnox = this.calculationResults.portnox;
        if (!portnox) return 0;
        
        // Weighted scoring based on strategic factors
        const scores = {
            security: portnox.scores.security * 0.25,
            cost: (100 - (portnox.year3.tco.perDevice / 5)) * 0.20,
            automation: portnox.scores.automation * 0.20,
            scalability: portnox.scores.scalability * 0.15,
            compliance: this.getPortnoxComplianceScore() * 0.20
        };
        
        return Math.round(Object.values(scores).reduce((a, b) => a + b, 0));
    }
    
    generateCompetitiveAdvantages() {
        const advantages = [
            {
                icon: 'fas fa-cloud',
                title: 'Cloud-Native Architecture',
                desc: 'SaaS deployment eliminates infrastructure costs and complexity'
            },
            {
                icon: 'fas fa-infinity',
                title: 'Unlimited Scalability',
                desc: 'No appliance limitations - scale from 100 to 100,000+ devices'
            },
            {
                icon: 'fas fa-brain',
                title: 'AI-Powered Security',
                desc: 'Machine learning for zero-day threat detection and response'
            },
            {
                icon: 'fas fa-puzzle-piece',
                title: 'Seamless Integration',
                desc: '150+ out-of-box integrations with existing security stack'
            },
            {
                icon: 'fas fa-user-friends',
                title: 'Superior User Experience',
                desc: '${this.calculationResults.portnox?.scores.userExperience || 88}% user satisfaction score'
            },
            {
                icon: 'fas fa-dollar-sign',
                title: 'Predictable Pricing',
                desc: 'Simple per-device model with no hidden costs'
            }
        ];
        
        return advantages.map(adv => `
            <div class="advantage-card">
                <i class="${adv.icon}"></i>
                <h4>${adv.title}</h4>
                <p>${adv.desc}</p>
            </div>
        `).join('');
    }
    
    generateActionPlan() {
        const timeline = [
            { week: 'Week 1-2', action: 'Executive approval & budget allocation', owner: 'CIO/CFO' },
            { week: 'Week 3-4', action: 'Technical proof of concept', owner: 'Security Team' },
            { week: 'Week 5-6', action: 'Contract negotiation & procurement', owner: 'Procurement' },
            { week: 'Week 7-8', action: 'Pilot deployment (10% of devices)', owner: 'IT Team' },
            { week: 'Week 9-12', action: 'Full rollout & training', owner: 'IT/Security' },
            { week: 'Week 13-16', action: 'Optimization & integration', owner: 'Operations' }
        ];
        
        return timeline.map((item, index) => `
            <div class="timeline-item ${index === 0 ? 'active' : ''}">
                <div class="timeline-marker">${index + 1}</div>
                <div class="timeline-content">
                    <h4>${item.week}</h4>
                    <p>${item.action}</p>
                    <span class="owner">Owner: ${item.owner}</span>
                </div>
            </div>
        `).join('');
    }
    
    generateNextSteps() {
        return [
            {
                icon: 'fas fa-phone',
                title: 'Schedule Executive Briefing',
                desc: 'Book a 30-minute call with Portnox leadership',
                cta: 'Schedule Now'
            },
            {
                icon: 'fas fa-desktop',
                title: 'Request Live Demo',
                desc: 'See Portnox CLEAR in action with your use cases',
                cta: 'Book Demo'
            },
            {
                icon: 'fas fa-flask',
                title: 'Start Free Trial',
                desc: '30-day proof of concept in your environment',
                cta: 'Start Trial'
            },
            {
                icon: 'fas fa-file-contract',
                title: 'Get Custom Pricing',
                desc: 'Receive detailed proposal for your requirements',
                cta: 'Get Quote'
            }
        ].map(step => `
            <div class="next-step-card">
                <i class="${step.icon}"></i>
                <h4>${step.title}</h4>
                <p>${step.desc}</p>
                <button class="cta-button" onclick="platform.scheduleDemo()">
                    ${step.cta} <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `).join('');
    }
    
    renderDecisionMatrixChart() {
        const criteria = ['Total Cost', 'Security', 'Deployment Speed', 'Automation', 
                         'Scalability', 'User Experience', 'Compliance', 'Support'];
        
        const series = Object.entries(this.calculationResults).map(([key, result]) => {
            const vendor = result.vendor;
            const scores = [
                100 - (result.year3.tco.perDevice / 10), // Cost (inverted)
                vendor.metrics.securityScore,
                100 - (vendor.metrics.deploymentDays / 2), // Speed (inverted)
                vendor.metrics.automationLevel,
                vendor.metrics.scalabilityScore,
                vendor.metrics.userExperienceScore,
                100 - vendor.riskFactors.complianceRisk,
                85 // Support score (estimated)
            ];
            
            return {
                name: vendor.name,
                data: scores.map(s => Math.round(s)),
                pointPlacement: 'on',
                color: key === 'portnox' ? '#00D4AA' : null
            };
        });
        
        Highcharts.chart('decision-matrix-chart', {
            chart: { polar: true, type: 'line', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: {
                categories: criteria,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max: 100
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y}</b><br/>'
            },
            series: series,
            credits: { enabled: false }
        });
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
