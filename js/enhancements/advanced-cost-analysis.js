/**
 * Advanced Cost Analysis Enhancement
 * Adds comprehensive cost configuration and calculation capabilities
 */

class AdvancedCostAnalysis {
    constructor() {
        this.initialized = false;
        this.costFactors = this.initializeCostFactors();
        this.pricingModels = this.initializePricingModels();
    }

    initializeCostFactors() {
        return {
            deviceTypes: {
                'desktop': { name: 'Desktop Computers', multiplier: 1.0, avgCost: 65 },
                'laptop': { name: 'Laptops', multiplier: 1.1, avgCost: 70 },
                'mobile': { name: 'Mobile Devices', multiplier: 0.8, avgCost: 50 },
                'tablet': { name: 'Tablets', multiplier: 0.9, avgCost: 55 },
                'iot': { name: 'IoT Devices', multiplier: 0.6, avgCost: 35 },
                'server': { name: 'Servers', multiplier: 2.5, avgCost: 150 },
                'network': { name: 'Network Equipment', multiplier: 1.8, avgCost: 120 },
                'printer': { name: 'Printers/Peripherals', multiplier: 0.7, avgCost: 45 }
            },
            implementationFactors: {
                'complexity_low': { name: 'Low Complexity', multiplier: 0.8 },
                'complexity_medium': { name: 'Medium Complexity', multiplier: 1.0 },
                'complexity_high': { name: 'High Complexity', multiplier: 1.4 },
                'complexity_very_high': { name: 'Very High Complexity', multiplier: 1.8 }
            },
            geographicFactors: {
                'tier1_cities': { name: 'Tier 1 Cities', multiplier: 1.3 },
                'tier2_cities': { name: 'Tier 2 Cities', multiplier: 1.1 },
                'tier3_cities': { name: 'Tier 3 Cities', multiplier: 0.9 },
                'rural': { name: 'Rural Areas', multiplier: 0.8 }
            }
        };
    }

    initializePricingModels() {
        return {
            'per_device': {
                name: 'Per Device Pricing',
                description: 'Cost calculated per managed device',
                baseCalculation: (devices, pricePerDevice) => devices * pricePerDevice
            },
            'per_user': {
                name: 'Per User Pricing',
                description: 'Cost calculated per user account',
                baseCalculation: (users, pricePerUser) => users * pricePerUser
            },
            'tiered': {
                name: 'Tiered Pricing',
                description: 'Volume-based pricing tiers',
                tiers: [
                    { min: 1, max: 100, pricePerDevice: 75 },
                    { min: 101, max: 500, pricePerDevice: 65 },
                    { min: 501, max: 1000, pricePerDevice: 55 },
                    { min: 1001, max: 5000, pricePerDevice: 45 },
                    { min: 5001, max: Infinity, pricePerDevice: 35 }
                ]
            },
            'enterprise': {
                name: 'Enterprise Licensing',
                description: 'Flat rate for unlimited devices',
                baseCalculation: (devices) => Math.max(50000, devices * 0.8)
            }
        };
    }

    createAdvancedCostControls() {
        console.log("🔧 Creating advanced cost analysis controls...");
        
        const existingContainer = document.getElementById('cost-analysis-container');
        if (!existingContainer) {
            console.warn("⚠️ Cost analysis container not found");
            return;
        }

        // Enhance existing controls without replacing
        const enhancedControls = document.createElement('div');
        enhancedControls.className = 'advanced-cost-controls';
        enhancedControls.innerHTML = `
            <div class="cost-enhancement-section">
                <h4><i class="fas fa-cogs"></i> Advanced Cost Configuration</h4>
                
                <div class="controls-grid">
                    <div class="control-group">
                        <label for="avg-device-price">Average Price Per Device ($)</label>
                        <input type="range" id="avg-device-price" min="20" max="200" value="65" step="5">
                        <span class="control-value" id="avg-device-price-value">$65</span>
                    </div>
                    
                    <div class="control-group">
                        <label for="organization-size">Organization Size</label>
                        <select id="organization-size" class="control-value">
                            <option value="startup">Startup (1-50 employees)</option>
                            <option value="small">Small Business (51-250)</option>
                            <option value="medium" selected>Medium Enterprise (251-1000)</option>
                            <option value="large">Large Enterprise (1001-5000)</option>
                            <option value="enterprise">Global Enterprise (5000+)</option>
                        </select>
                    </div>
                    
                    <div class="control-group">
                        <label for="geographic-region">Geographic Region</label>
                        <select id="geographic-region" class="control-value">
                            <option value="north_america" selected>North America</option>
                            <option value="europe">Europe</option>
                            <option value="asia_pacific">Asia Pacific</option>
                            <option value="latin_america">Latin America</option>
                            <option value="middle_east_africa">Middle East & Africa</option>
                        </select>
                    </div>
                    
                    <div class="control-group">
                        <label for="deployment-model">Deployment Strategy</label>
                        <select id="deployment-model" class="control-value">
                            <option value="cloud_first" selected>Cloud-First</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="on_premises">On-Premises</option>
                            <option value="multi_cloud">Multi-Cloud</option>
                        </select>
                    </div>
                    
                    <div class="control-group">
                        <label for="implementation-complexity">Implementation Complexity</label>
                        <select id="implementation-complexity" class="control-value">
                            <option value="complexity_low">Low Complexity</option>
                            <option value="complexity_medium" selected>Medium Complexity</option>
                            <option value="complexity_high">High Complexity</option>
                            <option value="complexity_very_high">Very High Complexity</option>
                        </select>
                    </div>
                    
                    <div class="control-group">
                        <label for="pricing-model">Pricing Model</label>
                        <select id="pricing-model" class="control-value">
                            <option value="per_device" selected>Per Device</option>
                            <option value="per_user">Per User</option>
                            <option value="tiered">Tiered Pricing</option>
                            <option value="enterprise">Enterprise License</option>
                        </select>
                    </div>
                </div>
                
                <div class="cost-breakdown-preview">
                    <h5><i class="fas fa-calculator"></i> Cost Calculation Preview</h5>
                    <div class="cost-preview-grid">
                        <div class="cost-item">
                            <span class="cost-label">Base Cost:</span>
                            <span class="cost-value" id="preview-base-cost">$65,000</span>
                        </div>
                        <div class="cost-item">
                            <span class="cost-label">Adjustments:</span>
                            <span class="cost-value" id="preview-adjustments">+$5,200</span>
                        </div>
                        <div class="cost-item">
                            <span class="cost-label">Total Estimated:</span>
                            <span class="cost-value highlight-positive" id="preview-total">$70,200</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        existingContainer.appendChild(enhancedControls);
        this.bindAdvancedCostControls();
        console.log("✅ Advanced cost controls created successfully");
    }

    bindAdvancedCostControls() {
        console.log("🔗 Binding advanced cost control event listeners...");
        
        // Average device price
        const devicePriceSlider = document.getElementById('avg-device-price');
        if (devicePriceSlider) {
            devicePriceSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                document.getElementById('avg-device-price-value').textContent = `$${value}`;
                this.updateCostPreview();
                console.log(`💰 Device price updated: $${value}`);
            });
        }

        // Organization size
        const orgSizeSelect = document.getElementById('organization-size');
        if (orgSizeSelect) {
            orgSizeSelect.addEventListener('change', (e) => {
                this.updateCostPreview();
                console.log(`🏢 Organization size changed: ${e.target.value}`);
            });
        }

        // Geographic region
        const regionSelect = document.getElementById('geographic-region');
        if (regionSelect) {
            regionSelect.addEventListener('change', (e) => {
                this.updateCostPreview();
                console.log(`🌍 Region changed: ${e.target.value}`);
            });
        }

        // Deployment model
        const deploymentSelect = document.getElementById('deployment-model');
        if (deploymentSelect) {
            deploymentSelect.addEventListener('change', (e) => {
                this.updateCostPreview();
                console.log(`☁️ Deployment model changed: ${e.target.value}`);
            });
        }

        // Implementation complexity
        const complexitySelect = document.getElementById('implementation-complexity');
        if (complexitySelect) {
            complexitySelect.addEventListener('change', (e) => {
                this.updateCostPreview();
                console.log(`⚙️ Complexity changed: ${e.target.value}`);
            });
        }

        // Pricing model
        const pricingSelect = document.getElementById('pricing-model');
        if (pricingSelect) {
            pricingSelect.addEventListener('change', (e) => {
                this.updateCostPreview();
                console.log(`💳 Pricing model changed: ${e.target.value}`);
            });
        }

        console.log("✅ Advanced cost control bindings completed");
    }

    updateCostPreview() {
        try {
            console.log("📊 Updating cost preview calculations...");
            
            const deviceCount = parseInt(document.getElementById('device-count-slider')?.value || 1000);
            const devicePrice = parseInt(document.getElementById('avg-device-price')?.value || 65);
            const orgSize = document.getElementById('organization-size')?.value || 'medium';
            const region = document.getElementById('geographic-region')?.value || 'north_america';
            const deployment = document.getElementById('deployment-model')?.value || 'cloud_first';
            const complexity = document.getElementById('implementation-complexity')?.value || 'complexity_medium';

            // Calculate base cost
            let baseCost = deviceCount * devicePrice;

            // Apply organization size multiplier
            if (window.organizationSettings?.sizes[orgSize]) {
                baseCost *= window.organizationSettings.sizes[orgSize].deviceMultiplier;
            }

            // Apply regional multiplier
            if (window.organizationSettings?.regions[region]) {
                baseCost *= window.organizationSettings.regions[region].costMultiplier;
            }

            // Apply deployment model adjustments
            let deploymentAdjustment = 0;
            if (window.organizationSettings?.deploymentModels[deployment]) {
                deploymentAdjustment = baseCost * window.organizationSettings.deploymentModels[deployment].costReduction;
            }

            // Apply complexity multiplier
            let complexityMultiplier = 1.0;
            if (this.costFactors.implementationFactors[complexity]) {
                complexityMultiplier = this.costFactors.implementationFactors[complexity].multiplier;
            }

            const finalBaseCost = baseCost * complexityMultiplier;
            const totalCost = finalBaseCost - deploymentAdjustment;

            // Update preview display
            document.getElementById('preview-base-cost').textContent = `$${Math.round(finalBaseCost).toLocaleString()}`;
            document.getElementById('preview-adjustments').textContent = `-$${Math.round(deploymentAdjustment).toLocaleString()}`;
            document.getElementById('preview-total').textContent = `$${Math.round(totalCost).toLocaleString()}`;

            console.log(`💰 Cost preview updated - Total: $${Math.round(totalCost).toLocaleString()}`);
            
            // Trigger global update if platform exists
            if (window.zeroTrustExecutivePlatform) {
                window.zeroTrustExecutivePlatform.refreshKPIs();
            }

        } catch (error) {
            console.error("❌ Error updating cost preview:", error);
        }
    }

    init() {
        if (this.initialized) return;
        
        console.log("🚀 Initializing Advanced Cost Analysis...");
        
        // Wait for main platform to be ready
        setTimeout(() => {
            this.createAdvancedCostControls();
            this.initialized = true;
            console.log("✅ Advanced Cost Analysis initialized successfully");
        }, 2000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (!window.advancedCostAnalysis) {
            window.advancedCostAnalysis = new AdvancedCostAnalysis();
            window.advancedCostAnalysis.init();
        }
    }, 1500);
});

window.AdvancedCostAnalysis = AdvancedCostAnalysis;
