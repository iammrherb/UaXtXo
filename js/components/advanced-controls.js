/**
 * Advanced Cost Controls Component
 * Provides granular control over all cost factors
 */

class AdvancedCostControls {
    constructor(platform) {
        this.platform = platform;
        this.settings = {
            devices: {
                base: 2500,
                growth: {
                    enabled: false,
                    annual: 10,
                    compound: true
                },
                distribution: {
                    corporate: 60,
                    byod: 25,
                    iot: 15
                }
            },
            
            costs: {
                inflation: {
                    enabled: true,
                    rate: 3
                },
                exchange: {
                    enabled: false,
                    rate: 1
                },
                discount: {
                    enabled: false,
                    rate: 0
                }
            },
            
            operations: {
                fteCoSt: 120000,
                contractorRate: 150,
                trainingCostPerHour: 100,
                downtimeCostPerHour: 10000
            },
            
            infrastructure: {
                powerPerRack: 5000,
                coolingMultiplier: 1.5,
                rackSpaceCost: 1000,
                bandwidthPerGb: 50
            },
            
            perDevice: {
                portnox: {
                    base: 4.00,
                    volume: 'auto',
                    term: 'annual'
                },
                cisco: {
                    perpetual: 150,
                    maintenance: 30
                },
                aruba: {
                    perpetual: 120,
                    maintenance: 22
                },
                forescout: {
                    perpetual: 100,
                    maintenance: 20
                },
                fortinet: {
                    perpetual: 85,
                    maintenance: 17
                },
                extreme: {
                    perpetual: 90,
                    maintenance: 18
                },
                juniper: {
                    monthly: 8,
                    annual: 84
                },
                arista: {
                    monthly: 7,
                    annual: 72
                },
                microsoft: {
                    perDevice: 0.50
                },
                packetfence: {
                    support: 2,
                    implementation: 60000
                },
                pulsesecure: {
                    perpetual: 95,
                    maintenance: 19
                },
                securew2: {
                    monthly: 3,
                    annual: 30
                },
                foxpass: {
                    monthly: 2.50,
                    annual: 24
                },
                radiusaas: {
                    monthly: 2,
                    annual: 18
                }
            }
        };
    }
    
    render() {
        return `
            <div class="advanced-controls-panel glass-morphism">
                <h3 class="controls-title">
                    <i class="fas fa-sliders-h"></i>
                    Advanced Cost Controls
                </h3>
                
                <div class="controls-tabs">
                    <button class="control-tab active" data-tab="devices">Device Settings</button>
                    <button class="control-tab" data-tab="costs">Cost Factors</button>
                    <button class="control-tab" data-tab="vendor">Vendor Pricing</button>
                    <button class="control-tab" data-tab="scenarios">Scenarios</button>
                </div>
                
                <div class="control-panels">
                    <!-- Device Settings Panel -->
                    <div class="control-panel active" id="devices-panel">
                        <h4>Device Configuration</h4>
                        
                        <div class="control-group">
                            <label>Base Device Count</label>
                            <input type="number" id="base-devices" value="${this.settings.devices.base}" min="50" max="100000" step="50">
                            <span class="control-help">Starting number of devices</span>
                        </div>
                        
                        <div class="control-group">
                            <label>
                                <input type="checkbox" id="device-growth" ${this.settings.devices.growth.enabled ? 'checked' : ''}>
                                Enable Device Growth
                            </label>
                            <div class="sub-controls ${this.settings.devices.growth.enabled ? '' : 'disabled'}">
                                <label>Annual Growth Rate (%)</label>
                                <input type="range" id="growth-rate" min="0" max="50" value="${this.settings.devices.growth.annual}" step="5">
                                <span class="range-value">${this.settings.devices.growth.annual}%</span>
                            </div>
                        </div>
                        
                        <div class="control-group">
                            <h5>Device Type Distribution</h5>
                            <div class="distribution-controls">
                                <div class="dist-item">
                                    <label>Corporate Devices</label>
                                    <input type="range" class="dist-slider" data-type="corporate" min="0" max="100" value="${this.settings.devices.distribution.corporate}">
                                    <span class="dist-value">${this.settings.devices.distribution.corporate}%</span>
                                </div>
                                <div class="dist-item">
                                    <label>BYOD</label>
                                    <input type="range" class="dist-slider" data-type="byod" min="0" max="100" value="${this.settings.devices.distribution.byod}">
                                    <span class="dist-value">${this.settings.devices.distribution.byod}%</span>
                                </div>
                                <div class="dist-item">
                                    <label>IoT Devices</label>
                                    <input type="range" class="dist-slider" data-type="iot" min="0" max="100" value="${this.settings.devices.distribution.iot}">
                                    <span class="dist-value">${this.settings.devices.distribution.iot}%</span>
                                </div>
                            </div>
                            <div class="distribution-total">Total: <span id="dist-total">100%</span></div>
                        </div>
                    </div>
                    
                    <!-- Cost Factors Panel -->
                    <div class="control-panel" id="costs-panel">
                        <h4>Economic Factors</h4>
                        
                        <div class="control-group">
                            <label>
                                <input type="checkbox" id="inflation" ${this.settings.costs.inflation.enabled ? 'checked' : ''}>
                                Include Inflation
                            </label>
                            <div class="sub-controls ${this.settings.costs.inflation.enabled ? '' : 'disabled'}">
                                <label>Annual Inflation Rate (%)</label>
                                <input type="range" id="inflation-rate" min="0" max="10" value="${this.settings.costs.inflation.rate}" step="0.5">
                                <span class="range-value">${this.settings.costs.inflation.rate}%</span>
                            </div>
                        </div>
                        
                        <div class="control-group">
                            <h5>Operational Costs</h5>
                            <div class="cost-inputs">
                                <div class="cost-item">
                                    <label>Average FTE Salary</label>
                                    <input type="number" id="fte-cost" value="${this.settings.operations.fteCost}" step="5000">
                                </div>
                                <div class="cost-item">
                                    <label>Contractor Rate ($/hr)</label>
                                    <input type="number" id="contractor-rate" value="${this.settings.operations.contractorRate}" step="10">
                                </div>
                                <div class="cost-item">
                                    <label>Training Cost ($/hr)</label>
                                    <input type="number" id="training-cost" value="${this.settings.operations.trainingCostPerHour}" step="10">
                                </div>
                                <div class="cost-item">
                                    <label>Downtime Cost ($/hr)</label>
                                    <input type="number" id="downtime-cost" value="${this.settings.operations.downtimeCostPerHour}" step="100">
                                </div>
                            </div>
                        </div>
                        
                        <div class="control-group">
                            <h5>Infrastructure Costs</h5>
                            <div class="cost-inputs">
                                <div class="cost-item">
                                    <label>Power per Rack ($/yr)</label>
                                    <input type="number" id="power-cost" value="${this.settings.infrastructure.powerPerRack}" step="100">
                                </div>
                                <div class="cost-item">
                                    <label>Cooling Multiplier</label>
                                    <input type="number" id="cooling-mult" value="${this.settings.infrastructure.coolingMultiplier}" step="0.1" min="1" max="3">
                                </div>
                                <div class="cost-item">
                                    <label>Rack Space ($/mo)</label>
                                    <input type="number" id="rack-cost" value="${this.settings.infrastructure.rackSpaceCost}" step="50">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Vendor Pricing Panel -->
                    <div class="control-panel" id="vendor-panel">
                        <h4>Per-Device Pricing Override</h4>
                        <p class="panel-description">Customize vendor pricing for your specific negotiations</p>
                        
                        ${this.renderVendorPricingControls()}
                    </div>
                    
                    <!-- Scenarios Panel -->
                    <div class="control-panel" id="scenarios-panel">
                        <h4>What-If Scenarios</h4>
                        
                        <div class="scenario-presets">
                            <button class="scenario-btn" data-scenario="rapid-growth">
                                <i class="fas fa-rocket"></i>
                                <span>Rapid Growth</span>
                                <small>30% annual growth</small>
                            </button>
                            <button class="scenario-btn" data-scenario="budget-constraint">
                                <i class="fas fa-dollar-sign"></i>
                                <span>Budget Constraint</span>
                                <small>Max $10/device/month</small>
                            </button>
                            <button class="scenario-btn" data-scenario="high-security">
                                <i class="fas fa-shield-alt"></i>
                                <span>High Security</span>
                                <small>Max risk reduction</small>
                            </button>
                            <button class="scenario-btn" data-scenario="m-and-a">
                                <i class="fas fa-building"></i>
                                <span>M&A Activity</span>
                                <small>Double devices in Y2</small>
                            </button>
                            <button class="scenario-btn" data-scenario="cloud-first">
                                <i class="fas fa-cloud"></i>
                                <span>Cloud First</span>
                                <small>No on-prem allowed</small>
                            </button>
                            <button class="scenario-btn" data-scenario="compliance-driven">
                                <i class="fas fa-certificate"></i>
                                <span>Compliance Driven</span>
                                <small>All frameworks required</small>
                            </button>
                        </div>
                        
                        <div class="custom-scenario">
                            <h5>Custom Scenario Builder</h5>
                            <button class="btn btn-secondary" onclick="platform.openScenarioBuilder()">
                                <i class="fas fa-plus"></i> Create Custom Scenario
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="controls-footer">
                    <button class="btn btn-secondary" onclick="platform.resetControls()">
                        <i class="fas fa-undo"></i> Reset to Defaults
                    </button>
                    <button class="btn btn-primary" onclick="platform.applyControls()">
                        <i class="fas fa-check"></i> Apply Changes
                    </button>
                </div>
            </div>
        `;
    }
    
    renderVendorPricingControls() {
        const vendors = this.platform.selectedVendors;
        
        return vendors.map(vendorId => {
            const vendor = window.ComprehensiveVendorDatabase[vendorId];
            const pricing = this.settings.perDevice[vendorId];
            
            return `
                <div class="vendor-pricing-group">
                    <h5>
                        <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-logo-tiny">
                        ${vendor.name}
                    </h5>
                    <div class="pricing-inputs">
                        ${vendor.pricing.model === 'subscription' ? `
                            <div class="price-input">
                                <label>Monthly ($/device)</label>
                                <input type="number" class="vendor-price" 
                                    data-vendor="${vendorId}" 
                                    data-type="monthly" 
                                    value="${pricing.monthly || pricing.base || 0}" 
                                    step="0.10" min="0">
                            </div>
                            <div class="price-input">
                                <label>Annual ($/device)</label>
                                <input type="number" class="vendor-price" 
                                    data-vendor="${vendorId}" 
                                    data-type="annual" 
                                    value="${pricing.annual || (pricing.monthly * 12 * 0.85) || 0}" 
                                    step="0.10" min="0">
                            </div>
                        ` : vendor.pricing.model === 'perpetual' ? `
                            <div class="price-input">
                                <label>Perpetual ($/device)</label>
                                <input type="number" class="vendor-price" 
                                    data-vendor="${vendorId}" 
                                    data-type="perpetual" 
                                    value="${pricing.perpetual || 0}" 
                                    step="1" min="0">
                            </div>
                            <div class="price-input">
                                <label>Maintenance ($/device/yr)</label>
                                <input type="number" class="vendor-price" 
                                    data-vendor="${vendorId}" 
                                    data-type="maintenance" 
                                    value="${pricing.maintenance || 0}" 
                                    step="1" min="0">
                            </div>
                        ` : `
                            <div class="price-input">
                                <label>Cost ($/device/mo)</label>
                                <input type="number" class="vendor-price" 
                                    data-vendor="${vendorId}" 
                                    data-type="other" 
                                    value="${pricing.perDevice || pricing.support || 0}" 
                                    step="0.10" min="0">
                            </div>
                        `}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    attachEventListeners() {
        // Tab switching
        document.querySelectorAll('.control-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.control-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.control-panel').forEach(p => p.classList.remove('active'));
                
                e.target.classList.add('active');
                const panelId = e.target.dataset.tab + '-panel';
                document.getElementById(panelId)?.classList.add('active');
            });
        });
        
        // Device distribution sliders
        document.querySelectorAll('.dist-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                this.updateDistribution(e.target);
            });
        });
        
        // Scenario buttons
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.applyScenario(e.currentTarget.dataset.scenario);
            });
        });
        
        // Real-time updates for ranges
        document.querySelectorAll('input[type="range"]').forEach(range => {
            range.addEventListener('input', (e) => {
                const valueSpan = e.target.parentElement.querySelector('.range-value');
                if (valueSpan) {
                    valueSpan.textContent = e.target.value + '%';
                }
            });
        });
    }
    
    updateDistribution(changedSlider) {
        const sliders = document.querySelectorAll('.dist-slider');
        const values = {};
        let total = 0;
        
        sliders.forEach(slider => {
            values[slider.dataset.type] = parseInt(slider.value);
            total += parseInt(slider.value);
        });
        
        // Normalize to 100%
        if (total !== 100) {
            const diff = 100 - total;
            const others = Array.from(sliders).filter(s => s !== changedSlider);
            const adjustment = diff / others.length;
            
            others.forEach(slider => {
                const newValue = Math.max(0, Math.min(100, parseInt(slider.value) + adjustment));
                slider.value = newValue;
                slider.parentElement.querySelector('.dist-value').textContent = newValue + '%';
            });
        }
        
        // Update display
        sliders.forEach(slider => {
            slider.parentElement.querySelector('.dist-value').textContent = slider.value + '%';
        });
        
        document.getElementById('dist-total').textContent = '100%';
    }
    
    applyScenario(scenario) {
        const scenarios = {
            'rapid-growth': {
                devices: { growth: { enabled: true, annual: 30 } },
                message: 'Applied: 30% annual device growth scenario'
            },
            'budget-constraint': {
                maxBudget: 10,
                message: 'Applied: Maximum $10/device/month budget constraint'
            },
            'high-security': {
                requireZeroTrust: true,
                minSecurityScore: 90,
                message: 'Applied: Maximum security requirements'
            },
            'm-and-a': {
                devices: { year2Multiplier: 2 },
                message: 'Applied: M&A scenario - devices double in year 2'
            },
            'cloud-first': {
                excludeOnPrem: true,
                message: 'Applied: Cloud-only vendors filter'
            },
            'compliance-driven': {
                requireAllCompliance: true,
                message: 'Applied: All compliance frameworks required'
            }
        };
        
        const selectedScenario = scenarios[scenario];
        if (selectedScenario) {
            // Apply scenario settings
            Object.assign(this.settings, selectedScenario);
            
            // Show notification
            this.showNotification(selectedScenario.message, 'success');
            
            // Trigger recalculation
            this.platform.applyControls();
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type} animated-slide-in`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
    
    getSettings() {
        // Collect all current settings from UI
        const settings = {
            devices: {
                base: parseInt(document.getElementById('base-devices')?.value || 2500),
                growth: {
                    enabled: document.getElementById('device-growth')?.checked || false,
                    annual: parseInt(document.getElementById('growth-rate')?.value || 10)
                }
            },
            costs: {
                inflation: {
                    enabled: document.getElementById('inflation')?.checked || false,
                    rate: parseFloat(document.getElementById('inflation-rate')?.value || 3)
                }
            },
            operations: {
                fteCost: parseInt(document.getElementById('fte-cost')?.value || 120000),
                contractorRate: parseInt(document.getElementById('contractor-rate')?.value || 150),
                trainingCostPerHour: parseInt(document.getElementById('training-cost')?.value || 100),
                downtimeCostPerHour: parseInt(document.getElementById('downtime-cost')?.value || 10000)
            }
        };
        
        // Collect vendor pricing overrides
        document.querySelectorAll('.vendor-price').forEach(input => {
            const vendor = input.dataset.vendor;
            const type = input.dataset.type;
            const value = parseFloat(input.value);
            
            if (!settings.perDevice) settings.perDevice = {};
            if (!settings.perDevice[vendor]) settings.perDevice[vendor] = {};
            settings.perDevice[vendor][type] = value;
        });
        
        return settings;
    }
}

window.AdvancedCostControls = AdvancedCostControls;
console.log('✅ Advanced Cost Controls loaded');
