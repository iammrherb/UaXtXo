// Platform Controller - Manages all views and data
class PlatformController {
    constructor() {
        this.vendors = window.VendorDataComplete ? window.VendorDataComplete.vendors : {};
        this.selectedVendors = ['portnox', 'cisco_ise', 'aruba_clearpass'];
        this.organizationSize = 1000;
        this.industryType = 'enterprise';
        this.views = {};
    }
    
    init() {
        console.log('🚀 Initializing Platform Controller...');
        
        // Initialize views
        this.initializeViews();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Calculate initial results
        this.calculate();
    }
    
    initializeViews() {
        // Map of view names to their constructors
        const viewMap = {
            executive: 'ExecutiveDashboard',
            financial: 'FinancialAnalysis',
            features: 'FeatureMatrix',
            compliance: 'RiskCompliance'
        };
        
        Object.entries(viewMap).forEach(([key, className]) => {
            if (window[className]) {
                try {
                    this.views[key] = new window[className]();
                    console.log(`✅ ${className} view initialized`);
                } catch (error) {
                    console.error(`❌ Error initializing ${className}:`, error);
                }
            }
        });
    }
    
    setupEventListeners() {
        // Organization size slider
        const sizeSlider = document.getElementById('org-size');
        const sizeValue = document.getElementById('org-size-value');
        
        if (sizeSlider) {
            sizeSlider.addEventListener('input', (e) => {
                this.organizationSize = parseInt(e.target.value);
                if (sizeValue) {
                    sizeValue.textContent = this.organizationSize.toLocaleString();
                }
                this.calculate();
            });
        }
        
        // Industry selector
        const industrySelect = document.getElementById('industry-type');
        if (industrySelect) {
            industrySelect.addEventListener('change', (e) => {
                this.industryType = e.target.value;
                this.calculate();
            });
        }
        
        // Vendor checkboxes
        const vendorCheckboxes = document.querySelectorAll('.vendor-checkbox');
        vendorCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateSelectedVendors();
                this.calculate();
            });
        });
    }
    
    updateSelectedVendors() {
        const checkboxes = document.querySelectorAll('.vendor-checkbox:checked');
        this.selectedVendors = Array.from(checkboxes).map(cb => cb.value);
        
        // Ensure at least Portnox is selected for comparison
        if (!this.selectedVendors.includes('portnox')) {
            this.selectedVendors.push('portnox');
            const portnoxCheckbox = document.querySelector('.vendor-checkbox[value="portnox"]');
            if (portnoxCheckbox) {
                portnoxCheckbox.checked = true;
            }
        }
    }
    
    calculate() {
        console.log('📊 Calculating results for selected vendors...');
        
        // Get calculation data
        const data = this.getCalculationData();
        
        // Update all views with new data
        Object.values(this.views).forEach(view => {
            if (view && typeof view.update === 'function') {
                try {
                    view.update(data);
                } catch (error) {
                    console.error('Error updating view:', error);
                }
            }
        });
        
        // Update summary cards
        this.updateSummaryCards(data);
    }
    
    getCalculationData() {
        const results = {};
        
        this.selectedVendors.forEach(vendorId => {
            const vendor = this.vendors[vendorId];
            if (!vendor) return;
            
            const devices = this.organizationSize;
            const years = 5;
            
            // Calculate costs
            const licenseCost = vendor.pricing.basePrice * devices;
            const implementationCost = vendor.pricing.implementation || 0;
            const hardwareCost = vendor.pricing.hardware || 0;
            const trainingCost = vendor.pricing.training || 0;
            const annualSupport = licenseCost * (vendor.pricing.support || 0.15);
            
            // Apply volume discounts
            let discount = 0;
            if (vendor.pricing.volume_discounts) {
                Object.entries(vendor.pricing.volume_discounts).forEach(([threshold, rate]) => {
                    if (devices >= parseInt(threshold)) {
                        discount = Math.max(discount, rate);
                    }
                });
            }
            
            const discountedLicense = licenseCost * (1 - discount);
            
            // Calculate TCO
            const firstYearCost = discountedLicense + implementationCost + hardwareCost + trainingCost + annualSupport;
            const recurringCost = discountedLicense + annualSupport;
            const fiveYearTCO = firstYearCost + (recurringCost * (years - 1));
            
            // Calculate operational costs
            const fteCost = (vendor.deployment.fte_required || 1) * 150000; // Average IT salary
            const operationalCost = fteCost * years;
            
            results[vendorId] = {
                vendor: vendor,
                licenseCost: discountedLicense,
                implementationCost: implementationCost,
                hardwareCost: hardwareCost,
                trainingCost: trainingCost,
                supportCost: annualSupport,
                firstYearCost: firstYearCost,
                recurringCost: recurringCost,
                fiveYearTCO: fiveYearTCO,
                operationalCost: operationalCost,
                totalTCO: fiveYearTCO + operationalCost,
                deploymentDays: vendor.deployment.time_days,
                fteRequired: vendor.deployment.fte_required,
                complianceScore: vendor.compliance.automation || 0,
                features: vendor.features
            };
        });
        
        return {
            vendors: results,
            organizationSize: this.organizationSize,
            industryType: this.industryType,
            portnoxSavings: this.calculatePortnoxSavings(results)
        };
    }
    
    calculatePortnoxSavings(results) {
        if (!results.portnox) return null;
        
        const portnoxTCO = results.portnox.totalTCO;
        const savings = {};
        
        Object.entries(results).forEach(([vendorId, data]) => {
            if (vendorId !== 'portnox') {
                savings[vendorId] = {
                    amount: data.totalTCO - portnoxTCO,
                    percentage: ((data.totalTCO - portnoxTCO) / data.totalTCO * 100).toFixed(1)
                };
            }
        });
        
        return savings;
    }
    
    updateSummaryCards(data) {
        // Update TCO savings card
        const savingsCard = document.getElementById('tco-savings');
        if (savingsCard && data.portnoxSavings) {
            const avgSavings = Object.values(data.portnoxSavings)
                .reduce((sum, s) => sum + parseFloat(s.percentage), 0) / Object.keys(data.portnoxSavings).length;
            savingsCard.textContent = avgSavings.toFixed(0) + '%';
        }
        
        // Update deployment time card
        const deploymentCard = document.getElementById('deployment-time');
        if (deploymentCard && data.vendors.portnox) {
            deploymentCard.textContent = data.vendors.portnox.deploymentDays + ' days';
        }
        
        // Update compliance score card
        const complianceCard = document.getElementById('compliance-score');
        if (complianceCard && data.vendors.portnox) {
            complianceCard.textContent = (data.vendors.portnox.complianceScore * 100).toFixed(0) + '%';
        }
        
        // Update FTE requirement card
        const fteCard = document.getElementById('fte-requirement');
        if (fteCard && data.vendors.portnox) {
            fteCard.textContent = data.vendors.portnox.fteRequired + ' FTE';
        }
    }
}

// Export for global use
window.PlatformController = PlatformController;

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.platform = new PlatformController();
        window.platform.init();
    });
} else {
    window.platform = new PlatformController();
    window.platform.init();
}
