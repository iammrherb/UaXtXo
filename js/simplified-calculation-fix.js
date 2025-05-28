// Simplified calculation fix
(function() {
    console.log('🔧 Applying simplified calculation fix...');
    
    // Wait for all components
    function applyFix() {
        // Check if we need to create vendor calculator
        if (!window.vendorCalculator && window.EnhancedVendorCalculator) {
            window.vendorCalculator = new window.EnhancedVendorCalculator();
            console.log('✅ Created vendor calculator');
        }
        
        if (!window.dashboard || !window.vendorCalculator) {
            setTimeout(applyFix, 100);
            return;
        }
        
        // Override the calculation method
        const originalGenerate = window.vendorCalculator.generateVendorComparison;
        
        window.vendorCalculator.generateVendorComparison = function(config) {
            console.log('🎯 Generating vendor comparison with config:', config);
            
            // Ensure config has all required fields
            config = {
                deviceCount: parseInt(config.deviceCount) || 1000,
                locationCount: parseInt(config.locationCount) || 3,
                companySize: config.companySize || 'medium',
                analysisPeriod: parseInt(config.analysisPeriod) || 3,
                fteCost: parseInt(config.fteCost) || 100000,
                breachCost: parseInt(config.breachCost) || 4350000,
                industry: config.industry || 'technology',
                compliance: config.compliance || 'nist-csf'
            };
            
            let result;
            
            // Call original method if it exists
            if (originalGenerate) {
                result = originalGenerate.call(this, config);
            } else {
                // Fallback calculation
                console.warn('⚠️ Using fallback calculation');
                result = this.calculateVendorData(config);
            }
            
            // Ensure all vendors have proper TCO structure
            Object.keys(result).forEach(vendorKey => {
                const vendor = result[vendorKey];
                
                // Ensure TCO exists
                if (!vendor.tco) {
                    vendor.tco = {
                        tco: 0,
                        year1: 0,
                        year2: 0,
                        year3: 0,
                        monthly: 0,
                        breakdown: {}
                    };
                }
                
                // Calculate TCO if missing
                if (vendor.tco.tco === 0 && vendor.costs) {
                    const deviceCost = (vendor.costs.perDevice || 0) * config.deviceCount;
                    const monthlyLicense = deviceCost;
                    const implementationCost = (vendor.costs.implementation || 50000);
                    const fteCost = (vendor.metrics?.fteRequired || 1) * config.fteCost;
                    
                    vendor.tco.year1 = implementationCost + (monthlyLicense * 12) + fteCost;
                    vendor.tco.year2 = (monthlyLicense * 12) + fteCost;
                    vendor.tco.year3 = (monthlyLicense * 12) + fteCost;
                    vendor.tco.tco = vendor.tco.year1 + vendor.tco.year2 + vendor.tco.year3;
                    vendor.tco.monthly = monthlyLicense + (fteCost / 12);
                    
                    console.log(`Calculated TCO for ${vendor.name}: $${(vendor.tco.tco / 1000).toFixed(0)}K`);
                }
            });
            
            return result;
        };
        
        // Fix dashboard render to show values
        const originalRender = window.dashboard.render;
        window.dashboard.render = function() {
            console.log('🎨 Rendering with vendor data:', this.vendorData ? Object.keys(this.vendorData) : 'none');
            
            if (!this.vendorData) {
                this.refreshVendorData();
            }
            
            if (originalRender) {
                originalRender.call(this);
            }
            
            // Ensure KPIs are updated
            this.updateKPIs();
            
            // Add help icons
            if (this.addHelpToKPIs) {
                this.addHelpToKPIs();
            }
        };
        
        // Initial calculation and render
        window.dashboard.config = window.dashboard.loadConfiguration();
        window.dashboard.refreshVendorData();
        
        setTimeout(() => {
            window.dashboard.render();
            console.log('✅ Initial render complete');
        }, 500);
    }
    
    // Start the fix
    applyFix();
})();
